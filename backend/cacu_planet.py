from datetime import datetime
import ephem

planet_name = ['Mercury' , 'Venus' ,'Mars' , 'Jupiter' , 'Saturn' , 'Uranus' , 'Neptune']

infor = [
    {
        "name" : "Mercury",  #행성 이름 
        "mass" : "0.330(10 ^ 24kg)" , #행성 질량
        "diameter" : "4879km" , # 행성 지름
        "gravity" : "3.7(m/s^2)" ,  # 행성 중력
        "temperature"  : "167(C)" ,  # 표면 온도 
        "orbital_velocity" : "47.4(km/s)" # 공전 속도
    } , 
    {
        "name" : "Venus",  #행성 이름 
        "mass" : "4.87(10 ^ 24kg)" , #행성 질량
        "diameter" : "12,104km" , # 행성 지름
        "gravity" : "8.9(m/s^2)" ,  # 행성 중력
        "temperature"  : "464(C)" ,  # 표면 온도 
        "orbital_velocity" : "35.0(km/s)" # 공전 속도
    } , 
    {
        "name" : "Mars",  #행성 이름 
        "mass" : "0.642(10 ^ 24kg)" , #행성 질량
        "diameter" : "6792km" , # 행성 지름
        "gravity" : "3.7(m/s^2)" ,  # 행성 중력
        "temperature"  : "-65(C)" ,  # 표면 온도 
        "orbital_velocity" : "24.1(km/s)" # 공전 속도
    } , 
    {
        "name" : "Jupiter",  #행성 이름 
        "mass" : "1898(10 ^ 24kg)" , #행성 질량
        "diameter" : "142,984km" , # 행성 지름
        "gravity" : "23.1(m/s^2)" ,  # 행성 중력
        "temperature"  : "-110(C)" ,  # 표면 온도 
        "orbital_velocity" : "13.1(km/s)" # 공전 속도
    } , 
    {
        "name" : "Saturn",  #행성 이름 
        "mass" : "568(10 ^ 24kg)" , #행성 질량
        "diameter" : "120,536km" , # 행성 지름
        "gravity" : "9.0(m/s^2)" ,  # 행성 중력
        "temperature"  : "-140(C)" ,  # 표면 온도 
        "orbital_velocity" : "9.7(km/s)" # 공전 속도
    } , 
    {
        "name" : "Uranus",  #행성 이름 
        "mass" : "86.8(10 ^ 24kg)" , #행성 질량
        "diameter" : "51,118km" , # 행성 지름
        "gravity" : "8.7(m/s^2)" ,  # 행성 중력
        "temperature"  : "167(C)" ,  # 표면 온도 
        "orbital_velocity" : "47.4(km/s)" # 공전 속도
    } , 
    {
        "name" : "Neptune",  #행성 이름 
        "mass" : "102(10 ^ 24kg)" , #행성 질량
        "diameter" : "49,528km" , # 행성 지름
        "gravity" : "11.0(m/s^2)" ,  # 행성 중력
        "temperature"  : "-200(C)" ,  # 표면 온도 
        "orbital_velocity" : "5.4(km/s)" # 공전 속도
    } 
]

def select_planet(planet):
    if planet == "Mercury": return ephem.Mercury()
    if planet == "Venus": return ephem.Venus()
    if planet == "Mars": return ephem.Mars()
    if planet == "Jupiter": return ephem.Jupiter()
    if planet == "Saturn": return ephem.Saturn()
    if planet == "Uranus": return ephem.Uranus()
    if planet == "Neptune": return ephem.Neptune()


def au_to_km(num):
    return num * 149597870.7

class planet:
    def __init__(self,number,name,lat,long):
        
        date = datetime.now().replace(microsecond=0,minute=0,second=0,hour=0)
        celestial_body_name = name
        observer = ephem.Observer()
        
        observer.lat = '37.5665' # observer.lat = str(lat)
        observer.long = '126.9780' # observer.long = str(long)
        observer.date = date # 관측 시간 설정
        
        celestial_body = getattr(ephem, celestial_body_name)() # PyEphem 천체 객체 생성
        celestial_body.compute(observer) # 천체 정보 계산

        infor[number]["latitude_deg"] = latitude_deg = ephem.degrees(celestial_body.alt)  # 위도 (라디안을 도로 변환)
        infor[number]["longitude_deg"] = longitude_deg = ephem.degrees(celestial_body.az)  # 경도 (라디안을 도로 변환)
        infor[number]["declination"] = declination = ephem.degrees(celestial_body.dec)  # 적위
        infor[number]["right_ascension"] = right_ascension = ephem.degrees(celestial_body.ra) # 적경

        planet_type = select_planet(name)
        planet_type.compute(observer)
        
        distance = round( au_to_km(planet_type.earth_distance) , 3)

        infor[number][f"earth-distance"]  = distance# 지구와의 거리

        # print(f'위도 : {latitude_deg}')
        # print(f'경도 : {longitude_deg}')
        # print(f'적위 : {declination}')
        # print(f'적경 : {right_ascension}')
        # print(f'지구와의 거리 : {distance}')



    
#for key , value in infor[0].items():
  #  print(f'{key} : {value}')

for i in range(0,7):  
    planet(i,planet_name[i], 0 , 0)
#     print(planet_name[i]) 
#     print("=" * 20)