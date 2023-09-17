from fastapi import FastAPI, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from db import SessionLocal, engine
from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware

import schemas
import model
import hashlib

ACCESS_TOKEN_EXPIRE_DAYS = 1
JWT_SECRET_KEY = "secret"
ALGORITHM = "HS256"

def create_access_token(subject: str):
    to_encode = {"sub": subject}
    expire = datetime.utcnow() + timedelta(days=ACCESS_TOKEN_EXPIRE_DAYS)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

class JWTBearer(HTTPBearer):
    def __init__(self, auto_error: bool = True):
        super(JWTBearer, self).__init__(auto_error=auto_error)

    async def __call__(self, request: Request):
        credentials: HTTPAuthorizationCredentials = await super(JWTBearer, self).__call__(request)
        if credentials:
            if not credentials.scheme == "Bearer":
                raise HTTPException(status_code=403, detail="Invalid authentication scheme.")
            if not self.verify_jwt(credentials.credentials):
                raise HTTPException(status_code=403, detail="Invalid token or expired token.")
            return credentials.credentials
        else:
            raise HTTPException(status_code=403, detail="Invalid authorization code.")

    def verify_jwt(self, jwtoken: str) -> bool:
        try:
            payload = jwt.decode(jwtoken, JWT_SECRET_KEY, algorithms=[ALGORITHM])
            username: str = payload.get("sub")
            if username is None:
                return None
        except:
            payload = None
        return username

model.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def sha256(str):
    return hashlib.sha256(str.encode()).hexdigest()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/signup")
async def singup(user: schemas.UserCreate, db: Session = Depends(get_db)):
    check_user = db.query(model.User).filter_by(username=user.username).first()

    if check_user:
        raise HTTPException(status_code=400, detail="Username already registered")

    new_user = model.User(username=user.username, password=sha256(user.password))
    db.add(new_user)
    db.commit()
    
    return {"message": "User created successfully"}


@app.post("/login", response_model=schemas.Token)
async def login(user: schemas.UserCreate, db: Session = Depends(get_db)):
    check_user = db.query(model.User).filter_by(username=user.username).first()

    if not check_user:
        raise HTTPException(status_code=400, detail="Username not registered")

    if check_user.password != sha256(user.password):
        raise HTTPException(status_code=400, detail="Wrong password")

    return {"access_token": create_access_token(user.username)}


@app.get("/me", dependencies=[Depends(JWTBearer())], response_model=schemas.User)
async def me(token: str = Depends(JWTBearer()), db: Session = Depends(get_db)):
    user = JWTBearer().verify_jwt(token)
    return db.query(model.User).filter_by(username=user).first()