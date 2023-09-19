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
    __tablename__ = 'planet'
    id = Column(Integer, primary_key=True)

    Name = Column(String(20), nullable=True) #질량
    Mass = Column(String(20), nullable=True) #질량
    Diameter = Column(String(20), nullable=True) #지름
    Gravity = Column(String(20), nullable=True) #행성에서의 중력
    Temperature = Column(String(40), nullable=True) # 행성의 표면온도
    Orbital_velocity = Column(String(40), nullable=True) #행성의 공전 궤도 속도 
    Earth_latitude = Column(String(40), nullable=True) # 행성의 위도
    Earth_longitude = Column(String(40), nullable=True) # 행성의 경도
    Declination = Column(String(40), nullable=True) # 행성의 적위
    Right_ascension = Column(String(40), nullable=True) # 행성의 적경
    Earth_from_distance = Column(String(40), nullable=True) # 행성과 지구와의 거리



# class Post(Base):
#     id = Column(Integer, primary_key=True)
#     username = Column(String(20), unique=True)
#     title = Column(String(100), nullable=False)