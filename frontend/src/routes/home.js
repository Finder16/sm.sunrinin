import React, { useRef, useEffect, useState } from 'react';
import * as THREE from "three";
import { Canvas, useFrame } from 'react-three-fiber';
import { OrbitControls } from '@react-three/drei';

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
    const handlePlanetClick = (planetName) => {
        setSelectedPlanet(planetName);
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
    let distance, temp, ra, dec, az, alt;

    if(selectedPlanet === 'Mercury') {distance = 127.117444215; temp = 179; ra = '160:23:17.0'; dec = '8:15:11.6'; az = '46:24:07.1'; alt = '123:00:38.2';}

    return (
        <>
            <p style={{whiteSpace: "pre", position: "absolute"}}> 지구로부터의 거리 : {selectedPlanet} : {distance} million km <br></br> {/*지구와의 거리*/}
            표면 온도 : {selectedPlanet} : {temp}°C <br></br> {/*표면 온도*/}
            적경 / 적위 : {selectedPlanet} : {ra} / {dec} <br></br> {/*적경 및 적위*/}
            위도 / 경도 : {selectedPlanet} : {az}° / {alt}°<br></br> {/*수평 좌표계*/}</p>
        </>
    )
    //이름, 지름, 질량, 중력, 위도, 경도, 적위, 적경, 표면 온도, 공전 궤도의 속도
}

const Home = () => {
    return (
        <div style={{ position: "relative" }}>
            <App />
        </div>
    )
}

export default Home;