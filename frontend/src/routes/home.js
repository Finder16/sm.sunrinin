import React, { useRef, useEffect } from 'react';
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

    return <primitive object={particlesMesh} />;
};

const Sun = () => {
    const sunRef = useRef();
    const LightRef = useRef();

    const textureLoader = new THREE.TextureLoader();
    const imageUrl = '/img/sunTexture.png';
    const texture = textureLoader.load(imageUrl);

    const material = new THREE.MeshStandardMaterial({ map: texture });


    const geometry = new THREE.SphereGeometry(0.5, 32, 32); //반지름 , 부드러운 정도

    useFrame(() => {
        sunRef.current.rotation.x += 0.0005; //회전
        sunRef.current.rotation.y += 0.0005;
        sunRef.current.rotation.z += 0.0005;
    });

    return (
        <>
            <mesh geometry={geometry} ref={sunRef} material={material} position={[0,0,0]} >
                {/* <meshStandardMaterial color={'orange'}/> */}
            </mesh>
            <ambientLight
            ref={LightRef}
            position={[10, 100, 100]}
            intensity={0.9}
            color={'white'}
            />
        </>
    
    );
};

const Mercury = () => {
    const MerRef = useRef();
    const radius = 1.5; //태양과 떨어진 거리
    const speed = 0.1;
    
    const MerGeometry = new THREE.SphereGeometry(0.1, 32, 32);

    const textureLoader = new THREE.TextureLoader();
    const imageUrl = '/img/mercuryTexture.png';
    const texture = textureLoader.load(imageUrl);

    const material = new THREE.MeshStandardMaterial({ map: texture });


    useFrame((state, delta) => {
        const t = state.clock.getElapsedTime(); // 경과 시간
        const angle = t * speed; // 현재 시간에 해당하는 각도
        const x = radius * Math.cos(angle); // x좌표 계산
        const z = radius * Math.sin(angle); // z좌표 계산
        MerRef.current.position.set(x, 0, z); // 해당 위치로 이동
        MerRef.current.rotation.y += 0.005; // 공전방향과 속도

    });

    return (
        <>
        <mesh geometry={MerGeometry} ref={MerRef} material={material} position={[-2,0,0]}>
            {/* <meshStandardMaterial color={'grey'}/> */}
        </mesh>
        </>
    )
}

const Venus = () => {
    const VenRef = useRef();
    const radius = 2;
    const speed = 0.05;
    
    const VenGeometry = new THREE.SphereGeometry(0.15, 32, 32);

    const textureLoader = new THREE.TextureLoader();
    const imageUrl = '/img/venTexture.png';
    const texture = textureLoader.load(imageUrl);

    const material = new THREE.MeshStandardMaterial({ map: texture });

    useFrame((state, delta) => {
        const t = state.clock.getElapsedTime(); // 경과 시간
        const angle = t * speed; // 현재 시간에 해당하는 각도
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);
        VenRef.current.position.set(x, 0, z); // 해당 위치로 이동
        VenRef.current.rotation.y += 0.002; // 공전과 동시에 회전
    });

    return (
        <>
        <mesh geometry={VenGeometry} ref={VenRef} material={material} position={[-1.5,0,0]}>
            {/* <meshStandardMaterial color={'gold'}/> */}
        </mesh>
        </>
    )
}

const Earth = () => {
    const EarthRef = useRef();
    const radius = 2.5;
    const speed = 0.07;

    const EarthGeometry = new THREE.SphereGeometry(0.2, 32, 32);

    const textureLoader = new THREE.TextureLoader();
    const imageUrl = '/img/earthTexture.png';
    const texture = textureLoader.load(imageUrl);

    const material = new THREE.MeshStandardMaterial({ map: texture });

    useFrame((state, delta) => {
        const t = state.clock.getElapsedTime(); // 경과 시간
        const angle = t * speed; // 현재 시간에 해당하는 각도
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);
        EarthRef.current.position.set(x, 0, z); // 해당 위치로 이동

        EarthRef.current.rotation.y += 0.005
    });

    const earthInfo = () => {
        console.log('Earth clicked');
    }

    return (
        <>
        <mesh 
        geometry={EarthGeometry} ref={EarthRef} material={material} position={[-1,0,0]}
        onClick={earthInfo}>
            {/* <meshStandardMaterial color={'blue'}/> */}
        </mesh>
        </>
    )
}

const Mars = () => {
    const MarsRef = useRef();
    const radius = 3;
    const speed = 0.04;

    const MarsGeometry = new THREE.SphereGeometry(0.1532, 32, 32);

    const textureLoader = new THREE.TextureLoader();
    const imageUrl = '/img/marsTexture.png';
    const texture = textureLoader.load(imageUrl);

    const material = new THREE.MeshStandardMaterial({ map: texture });

    useFrame((state, delta) => {
        const t = state.clock.getElapsedTime(); // 경과 시간
        const angle = t * speed; // 현재 시간에 해당하는 각도
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);
        MarsRef.current.position.set(x, 0, z); // 해당 위치로 이동

        MarsRef.current.rotation.y += 0.0025
    });

    return (
        <>
        <mesh geometry={MarsGeometry} ref={MarsRef} material={material} position={[-0.5,0,0]}>
            {/* <meshStandardMaterial color={'red'}/> */}
        </mesh>
        </>
    )
}

const Jupiter = () => {
    const JupRef = useRef();
    const radius = 3.8;
    const speed = 0.01;

    const JupGeometry = new THREE.SphereGeometry(0.3,32,32);

    const textureLoader = new THREE.TextureLoader();
    const imageUrl = '/img/jupTexture.png';
    const texture = textureLoader.load(imageUrl);

    const material = new THREE.MeshStandardMaterial({ map: texture });

    useFrame((state, delta) => {
        const t = state.clock.getElapsedTime(); // 경과 시간
        const angle = t * speed; // 현재 시간에 해당하는 각도
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);
        JupRef.current.position.set(x, 0, z); // 해당 위치로 이동

        JupRef.current.rotation.y += 0.015
    });

    return (
        <>
        <mesh geometry={JupGeometry} ref={JupRef} material={material} position={[0,0,0]}>
            {/* <meshStandardMaterial color={'#856945'}/> */}
        </mesh>
        </>
    )
}

const Saturn = () => {
    const SatRef = useRef();
    const radius = 4.8;
    const speed = 0.02;

    const SatGeometry = new THREE.SphereGeometry(0.25,32,32);

    const textureLoader = new THREE.TextureLoader();
    const imageUrl = '/img/satTexture.png';
    const texture = textureLoader.load(imageUrl);

    const material = new THREE.MeshStandardMaterial({ map: texture });

    useFrame((state, delta) => {
        const t = state.clock.getElapsedTime(); // 경과 시간
        const angle = t * speed; // 현재 시간에 해당하는 각도
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);
        SatRef.current.position.set(x, 0, z); // 해당 위치로 이동

        //SatRef.current.rotation.x += 0.1
        SatRef.current.rotation.y += 0.01
        //SatRef.current.rotation.z += 0.1
    });

    return (
        <>
        <mesh geometry={SatGeometry} ref={SatRef} material={material} position={[1,0,0]}>
            {/* <meshStandardMaterial color={'#8c5f26'}/> */}
        </mesh>
        </>
    )
}

const SaturnRing = () => {
    const RingRef = useRef();
    const radius = 4.8; //태양과의 거리는 토성과 동일
    const speed = 0.02;

    const RingGeometry = new THREE.TorusGeometry(1, 0.2, 2, 50);
    // 고리 크기, 두께, 세분화 수, 의 세분화 수
    RingGeometry.rotateX(-Math.PI / 2); // 고리 수평 배치

    useFrame((state, delta) => {
        const t = state.clock.getElapsedTime(); // 경과 시간
        const angle = t * speed; // 현재 시간에 해당하는 각도
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);
        // 좌표계산 : 현재시간에 해당하는 각도의 삼각함수 값을 반지름과 곱한다.

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
        <mesh geometry={RingGeometry}  /*material={material}*/ ref={(mesh) => { RingRef.current = mesh }} scale={[0.4,0.4,0.4]} position={[1, 0, 0]}>
            <meshStandardMaterial color={'wheat'} ref={saturnRing} />
        </mesh>
        </>
    )
}

const Uranus = () => {
    const UraRef = useRef();
    const radius = 5.8;
    const speed = 0.03;

    const UraGeometry = new THREE.SphereGeometry(0.13, 32, 32);

    const textureLoader = new THREE.TextureLoader();
    const imageUrl = '/img/uraTexture.png';
    const texture = textureLoader.load(imageUrl);

    const material = new THREE.MeshStandardMaterial({ map: texture });

    useFrame((state, delta) => {
        const t = state.clock.getElapsedTime(); // 경과 시간
        const angle = t * speed; // 현재 시간에 해당하는 각도
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);
        UraRef.current.position.set(x, 0, z); // 해당 위치로 이동

        UraRef.current.rotation.x += 0.003
        //UraRef.current.rotation.y += 0.03
        //UraRef.current.rotation.z += 0.03
    });

    return (
        <>
        <mesh geometry={UraGeometry} ref={UraRef} material={material} position={[2, 0, 0]}>
            {/* <meshStandardMaterial color={'#26598c'}/> */}
        </mesh>
        </>
    )
}

const Neptune = () => {
    const NepRef = useRef();
    const radius = 6.6;
    const speed = 0.02;

    const NepGeometry = new THREE.SphereGeometry(0.13, 32, 32);

    const textureLoader = new THREE.TextureLoader();
    const imageUrl = '/img/nepTexture.png';
    const texture = textureLoader.load(imageUrl);

    const material = new THREE.MeshStandardMaterial({ map: texture });

    useFrame((state, delta) => {
        const t = state.clock.getElapsedTime(); // 경과 시간
        const angle = t * speed; // 현재 시간에 해당하는 각도
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);
        NepRef.current.position.set(x, 0, z); // 해당 위치로 이동

        //NepRef.current.rotation.x += 0.03
        NepRef.current.rotation.y += 0.003
        //NepRef.current.rotation.z += 0.03
    });

    return (
        <>
        <mesh geometry={NepGeometry} ref={NepRef} material={material} position={[2.5, 0, 0]}>
            {/* <meshStandardMaterial color={'#1b73cc'} /> */}
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

    return (
        <div>
        <Canvas style={{ width: "100vw", height: "100vh"}}>
            <Particles />
            <Sun />
            <Mercury/>
            <Venus />
            <Earth />
            <Mars />
            <Jupiter />
            <Saturn />
            <SaturnRing />
            <Uranus />
            <Neptune />
            <Orbit radius={1.5} /> {/* Mercury */}
            <Orbit radius={2} /> {/* Venus */}
            <Orbit radius={2.5} /> {/* Earth */}
            <Orbit radius={3} /> {/* Mars */}
            <Orbit radius={3.8} /> {/* Jupiter */}
            <Orbit radius={4.8} /> {/* Saturn */}
            <Orbit radius={5.8} /> {/* Uranus */}
            <Orbit radius={6.6} /> {/* Neptune */}
            <OrbitControls />
        </Canvas>
        </div>
    );
    
};

const Info = () => {

    // const detail = {
    //     'distance': 227.9,
    //     'temperature': -63
    // }

    return (
        <>
            <p style={{whiteSpace: "pre", position: "absolute"}}> Distance between Planets : Mars : 227.9 million km <br></br> {/*지구와의 거리*/}
            Surface temperatures of Planets (Relative to Earth) : Mars : -63°C <br></br> {/*표면 온도*/}
            Ra / Dec : Mars : 2h 22m 25s / 15° 46° 41° <br></br> {/*적경 및 적위*/}
            Az / Alt : Mars : 148° / 18°<br></br> {/*수평 좌표계*/}
            Visibility : Mars : Visible in the evening sky </p> {/*눈에 보이는 시간*/}
        </>
    )
}

const Home = () => {
    return (
        <div style={{ position: "relative" }}>
            <App />
            <div style={{ position: "absolute", top: 0, color: "white", marginLeft: "10px" }}>
                <Info />
            </div>
        </div>
    )
}

export default Home;