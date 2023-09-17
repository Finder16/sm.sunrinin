from sqlalchemy import Column, Integer, String
from db import Base

class User(Base):
    __tablename__ = 'User'
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(20), unique=True)
    password = Column(String(60))
    profile_file = Column(String(20), nullable=True)
    introduce = Column(String(100) , nullable=True)
    

class Planet(Base):
    __tablename__ = 'P:anet'
    id = Column(Integer, primary_key=True)
     
    Diameter = Column(String(20), unique=True) #지름
    Mass  = Column(String(20), unique=True) #질량
    Gravity   = Column(String(20), unique=True) #중력



# class Post(Base):
#     id = Column(Integer, primary_key=True)
#     username = Column(String(20), unique=True)
#     title = Column(String(100), nullable=False)