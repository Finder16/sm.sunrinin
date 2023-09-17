from pydantic import BaseModel

class UserBase(BaseModel):
    username: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    introduce: str | None = None
    profile_file: str | None = None

    class Config:
        orm_mode = True

class Token (BaseModel):
    access_token: str
