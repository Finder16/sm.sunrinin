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

class Planet(BaseModel):
    id: int
    Name: str | None = None
    Mass: float | None = None
    Diameter: float | None = None
    Gravity: float | None = None
    Temperature: float | None = None
    Orbital_velocity: float | None = None
    Earth_latitude: float | None = None
    Earth_longitude: float | None = None
    Declination: float | None = None
    Right_ascension: float | None = None
    Earth_from_distance: float | None = None

    class Config:
        orm_mode = True