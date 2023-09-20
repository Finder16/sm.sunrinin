import React, { useRef, useEffect, useState } from 'react';
import * as THREE from "three";
import { Canvas, useFrame } from 'react-three-fiber';
import { OrbitControls } from '@react-three/drei';
// import { planets } from '../api';

const Particles = () => {
    const particlesGeometry = new THREE.SphereGeometry();
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.06,
        color: "white",
        transparent: true,
    });

    const particlesCnt = 2000; //개수
    const posArray = new Float32Array(particlesCnt * 3);
    //실수값으로 각 별의 위치배열

    for (let i = 0; i < particlesCnt * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 50;
    } //초기위치를 랜덤으로 설정하고 50을 곱해서 적당한 거리로

    particlesGeometry.setAttribute(
        'position',
        new THREE.BufferAttribute(posArray, 3)
    ); //위치 속성

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);

    useFrame(() => {
        particlesMesh.rotation.x += 0.0002;
        particlesMesh.rotation.y += 0.0002;
        particlesMesh.rotation.z += 0.0002;
    }); //회전

    const LightRef = useRef();

    return (
        <>
        <primitive object={particlesMesh} />;
        <ambientLight
            ref={LightRef}
            position={[10, 100, 100]}
            intensity={1}
            color={'white'}
        />
        </>
    );
};

const createPlanets = (radius) => {
    return new THREE.SphereGeometry(radius, 32, 32);
}; // 행성 도형 만들기

const createMaterials = (textureURL) => {
    const texture = new THREE.TextureLoader().load(textureURL);
    return new THREE.MeshStandardMaterial({ map: texture });
}; // 행성 재질 추가

const Planets = ({ radius, distance, rotationSpeed, orbitSpeed, textureURL, onClick}) => {
    const planetRef = useRef();
    const geometry = createPlanets(radius);
    const material = createMaterials(textureURL);

    useFrame(({clock})=> {
        const t = clock.getElapsedTime(); //경과시간

        //공전
        const angle = t * orbitSpeed;
        const x = distance * Math.cos(angle);
        const z = distance * Math.sin(angle);
        // 좌표계산 : 경과한 시간에 공전속도를 곱한 값의 삼각함수 값을 태양으로부터 거리와 곱한다.
        planetRef.current.position.set(x, 0, z); // 해당 위치로 이동

        planetRef.current.rotation.y += rotationSpeed; //자전
    });

    const handleMouseEnter = () => {
        document.body.style.cursor = "pointer";
    };
    const handleMouseLeave = () => {
        document.body.style.cursor = "auto";
    };

    return (
        <>
        <mesh geometry={geometry} material={material} ref={planetRef} onClick={onClick} onPointerEnter={handleMouseEnter} onPointerLeave={handleMouseLeave}/>
        </>
        
    );
};

const SaturnRing = () => {
    const RingRef = useRef();
    const radius = 4.8; //태양과의 거리는 토성과 동일
    const speed = 0.02;

    const RingGeometry = new THREE.TorusGeometry(1, 0.2, 2, 50);
    // 고리 크기, 두께, 세분화 수, 의 세분화 수
    RingGeometry.rotateX(-Math.PI / 2); // 고리 수평 배치

    useFrame(({clock}) => {
        const t = clock.getElapsedTime(); // 경과 시간
        const angle = t * speed; // 현재 시간에 해당하는 각도
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);
        // 좌표계산 : 현재시간에 해당하는 각도의 삼각함수 값을 태양과의 거리와 곱한다.

        RingRef.current.position.set(x, 0, z); // 해당 위치로 이동
    });

    const saturnRing = useRef()
    useEffect(() => {
        if (saturnRing.current && saturnRing.current.geometry) {
            saturnRing.current.geometry.parameters.radius = 0.3 // 고리 반지름 설정
        }
    }, [])

    return (
        <>
        <mesh geometry={RingGeometry} ref={(mesh) => { RingRef.current = mesh }} scale={[0.4,0.4,0.4]} position={[1, 0, 0]}>
            <meshStandardMaterial color={'wheat'} ref={saturnRing} />
        </mesh>
        </>
    )
}

const Orbit = ({ radius }) => {
    const orbitRef = useRef();

    const points = [];
    for (let i = 0; i <= 360; i += 5) { //0도부터 360도까지 5도 간격으로 점 생성
        const x = radius * Math.cos((i * Math.PI) / 180); 
        const z = radius * Math.sin((i * Math.PI) / 180);
        //좌표계산 : 현재 각도(i)를 라디안(반지름 길이와 호의 길이의 비율)로 변환하고 각 삼각함수값에 넘겨준 후 반지름과 곱한다.
        
        points.push(new THREE.Vector3(x, 0, z)); //3d 점으로 변환 후 배열에 추가
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points); //기하 정보 참조
    const material = new THREE.LineBasicMaterial({ color: 0xffffff });

    return (
        <line ref={orbitRef}>
            <bufferGeometry attach="geometry" {...geometry} />
            <lineBasicMaterial attach="material" {...material} />
        </line>
    );
};

const App = () => {

    const [selectedPlanet, setSelectedPlanet] = useState(null);

    const handlePlanetClick = (selectedPlanet) => {
        setSelectedPlanet(selectedPlanet);
        window.history.pushState({}, '', `/${selectedPlanet.toLowerCase()}`);
    }

    return (
        <div>
            <Canvas style={{ width: "100vw", height: "100vh"}}>
                <Particles />

                {/* {sun} */}
                <Planets radius={0.5} distance={0} rotationSpeed={0} orbitSpeed={0} 
                textureURL={'/img/sunTexture.png'}/>
            
                <Orbit radius={1.5} /> {/* Mercury */}
                <Planets radius={0.1} distance={1.5} rotationSpeed={0.005} orbitSpeed={0.1} 
                textureURL={'/img/mercuryTexture.png'} onClick={()=>handlePlanetClick('Mercury')}/>

                <Orbit radius={2} /> {/* Venus */}
                <Planets radius={0.15} distance={2} rotationSpeed={0.002} orbitSpeed={0.05} 
                textureURL={'/img/venTexture.png'} onClick={()=>handlePlanetClick('Venus')}/>

                <Orbit radius={2.5} /> {/* Earth */}
                <Planets radius={0.2} distance={2.5} rotationSpeed={0.005} orbitSpeed={0.07} 
                textureURL={'/img/earthTexture.png'} onClick={()=>handlePlanetClick('Earth')}/>

                <Orbit radius={3} /> {/* Mars */}
                <Planets radius={0.1532} distance={3} rotationSpeed={0.0025} orbitSpeed={0.04} 
                textureURL={'/img/marsTexture.png'} onClick={()=>handlePlanetClick('Mars')}/>

                <Orbit radius={3.8} /> {/* Jupiter */}
                <Planets radius={0.3} distance={3.8} rotationSpeed={0.015} orbitSpeed={0.01} 
                textureURL={'/img/jupTexture.png'} onClick={()=>handlePlanetClick('Jupiter')}/>

                <Orbit radius={4.8} /> {/* Saturn */}
                <Planets radius={0.25} distance={4.8} rotationSpeed={0.01} orbitSpeed={0.02} 
                textureURL={'/img/satTexture.png'} onClick={()=>handlePlanetClick('Saturn')}/>
                <SaturnRing />

                <Orbit radius={5.8} /> {/* Uranus */}
                <Planets radius={0.13} distance={5.8} rotationSpeed={0.003} orbitSpeed={0.03} 
                textureURL={'/img/uraTexture.png'} onClick={()=>handlePlanetClick('Uranus')}/>

                <Orbit radius={6.6} /> {/* Neptune */}
                <Planets radius={0.13} distance={6.6} rotationSpeed={0.003} orbitSpeed={0.02} 
                textureURL={'/img/nepTexture.png'} onClick={()=>handlePlanetClick('Neptune')}/>
                <OrbitControls />
            </Canvas>
            <div style={{ position: "absolute", top: 0, color: "white", marginLeft: "10px" }}>
                <Info selectedPlanet={selectedPlanet}/>
            </div>
        </div>
    );
    
};

const Info = ({selectedPlanet}) => {
    let planetName, mass, diameter, gravity, temperature, orbital_velocity, latitude_deg, longtitude_deg, declination, right_ascension, earth_distance;
    
    if(selectedPlanet === 'Mercury'){
        planetName = 'Mercury';
        mass = '0.330(10 ^ 24kg)';
        diameter = "4879km";
        gravity = "3.7(m/s^2)";
        temperature = "167(C)";
        orbital_velocity = "47.4(km/s)";
        latitude_deg = 0.814387857913971;
        longtitude_deg = 2.1529502868652344;
        declination = 0.1446301061310849;
        right_ascension = 2.810336996387151;
        earth_distance = 131163685.937;
    }else if(selectedPlanet === 'Venus'){
        planetName = 'Venus';
        mass = '4.87(10 ^ 24kg)';
        diameter = "12,104km";
        gravity = '8.9(m/s^2)';
        temperature = '464(C)';
        orbital_velocity = '35.0(km/s)';
        latitude_deg =  1.0773226022720337;
        longtitude_deg = 2.694779872894287;
        declination = 0.19951981780878816;
        right_ascension = 2.40268229693035;
        earth_distance = 66643736.099;
    } else if(selectedPlanet === 'Mars'){
        planetName = 'Mars';
        mass = '0.642(10 ^ 24kg)';
        diameter = '6792km';
        gravity = '3.7(m/s^2)';
        temperature = '-65(C)';
        orbital_velocity = '24.1(km/s)';
        latitude_deg =  0.2320287972688675;
        longtitude_deg = 1.8823902606964111;
        declination = -0.09719248768744253;
        right_ascension = 3.3893488427015717;
        earth_distance = 378136496.879;
    } else if(selectedPlanet === 'Jupiter'){
        planetName = 'Jupiter';
        mass = '1898(10 ^ 24kg)';
        diameter = '142,984km';
        gravity = '23.1(m/s^2)';
        temperature = '-110(C)';
        orbital_velocity = '13.1(km/s)';
        latitude_deg =  0.26284730434417725;
        longtitude_deg = 4.846377372741699;
        declination = 0.26311780019476144;
        right_ascension = 0.7528474578751454;
        earth_distance = 634880516.885;
    } else if(selectedPlanet === 'Saturn'){
        planetName = 'Saturn';
        mass = '568(10 ^ 24kg)';
        diameter = '120,536km';
        gravity = '9.0(m/s^2)';
        temperature = '-140(C)';
        orbital_velocity = '9.7(km/s)';
        latitude_deg =  -0.9387574195861816;
        longtitude_deg = 5.3463134765625;
        declination = -0.21621452976324568;
        right_ascension = 5.842903523069215;
        earth_distance = 1323211610.415;
    } else if(selectedPlanet === 'Uranus'){
        planetName = 'Uranus';
        mass = '86.8(10 ^ 24kg)';
        diameter = '51,118km';
        gravity = '8.7(m/s^2)';
        temperature = '167(C)';
        orbital_velocity = '47.4(km/s)';
        latitude_deg = 0.3954291045665741;
        longtitude_deg =  4.818577766418457;
        declination = 0.31732842481850987;
        right_ascension = 0.8824945970207181;
        earth_distance = 2850063596.242;
    } else if(selectedPlanet === 'Neptune'){
        planetName = 'Uranus';
        mass = '102(10 ^ 24kg)';
        diameter = '49,528km';
        gravity = '11.0(m/s^2)';
        temperature = '-200(C)';
        orbital_velocity = '5.4(km/s)';
        latitude_deg = -0.5486772656440735;
        longtitude_deg =  5.125638961791992;
        declination = -0.04640872434718615;
        right_ascension = 6.232091607024048;
        earth_distance = 4323684856.269;
    } 

    return (
        <>
        <p>행성 이름 : {planetName}<br></br>
        질량 : {mass}<br></br>
        지름 : {diameter}<br></br>
        중력 : {gravity}<br></br>
        표면 온도 : {temperature}<br></br>
        공전 속도 : {orbital_velocity}<br></br>
        위도 : {latitude_deg}<br></br>
        경도 : {longtitude_deg}<br></br>
        적위 : {declination}<br></br>
        적경 : {right_ascension}<br></br>
        지구와의 거리 : {earth_distance}<br></br>
        </p>
        </>
    );
}

const Home = () => {
    return (
        <div style={{ position: "relative" }}>
            <App />
        </div>
    )
}

export default Home;
