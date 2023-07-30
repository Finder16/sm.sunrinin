import React, { useRef, useEffect } from 'react';
import * as THREE from "three";
import {Canvas, useFrame, useThree} from 'react-three-fiber';
import { OrbitControls } from '@react-three/drei';

// const Particles = () => {
//     const particlesCnt = 2000;
//     const posArray = new Float32Array(particlesCnt * 3);

//     for (let i = 0; i < particlesCnt * 3; i++) {
//         posArray[i] = (Math.random() - 0.5) * Math.random() * 5;
//     }
    
//     const canvas = document.createElement("canvas");
//     canvas.width = 512;
//     canvas.height = 512;
//     const ctx = canvas.getContext("2d");
//     ctx.beginPath();
//     ctx.arc(256, 256, 128, 0, Math.PI * 2, false);
//     ctx.fillStyle = "white";
//     ctx.fill();
//     ctx.closePath();

//     return (
//         <points>
//             <bufferGeometry attach="geometry">
//                 <bufferAttribute
//                 attachObject={["attributes", "position"]}
//                 array={posArray}
//                 itemSize={3}
//                 />
//             </bufferGeometry>
//             <pointsMaterial
//                 attach="material"
//                 size={0.01}
//                 sizeAttenuation={false}
//                 color="yellow"
//                 transparent={true}
//             />

//         </points>
//     );
// };

function OrthographicCamera(props) {
    const {
        gl: { domElement },
        size: { width, height },
    } = useThree()

    const aspect = width / height

    return <orthographicCamera {...props} aspect={aspect} zoom={10} />
}

const Sun = () => {
    const sunRef = useRef();
    const LightRef = useRef();

    const textureLoader = new THREE.TextureLoader();
    const imageUrl = '/img/sunTexture.png';
    const texture = textureLoader.load(imageUrl);

    const material = new THREE.MeshStandardMaterial({ map: texture });


    const geometry = new THREE.SphereGeometry(0.8, 32, 32);

    useFrame(() => {
        sunRef.current.rotation.x += 0.0005;
        sunRef.current.rotation.y += 0.0005;
        sunRef.current.rotation.z += 0.0005;
    });

    return (
        <>
            <mesh geometry={geometry} ref={sunRef} material={material} position={[0,0,0]}  >
                {/* <meshStandardMaterial color={'orange'}/> */}
            </mesh>
            <ambientLight
            ref={LightRef}
            position={[10, 100, 100]}
            intensity={0.8}
            color={'white'}
            />
        </>
    
    );
};

const Mercury = () => {
    const MerRef = useRef();
    const radius = 1.5;
    const speed = 0.1;
    
    const MerGeometry = new THREE.SphereGeometry(0.05, 32, 32);

    const textureLoader = new THREE.TextureLoader();
    const imageUrl = '/img/mercuryTexture.png';
    const texture = textureLoader.load(imageUrl);

    const material = new THREE.MeshStandardMaterial({ map: texture });


    useFrame((state, delta) => {
        const t = state.clock.getElapsedTime(); // 경과 시간
        const angle = t * speed; // 현재 시간에 해당하는 각도
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);
        MerRef.current.position.set(x, 0, z); // 해당 위치로 이동
        MerRef.current.rotation.y += 0.005;

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
    
    const VenGeometry = new THREE.SphereGeometry(0.095, 32, 32);

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

    const EarthGeometry = new THREE.SphereGeometry(0.1, 32, 32);

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

    return (
        <>
        <mesh geometry={EarthGeometry} ref={EarthRef} material={material} position={[-1,0,0]}>
            {/* <meshStandardMaterial color={'blue'}/> */}
        </mesh>
        </>
    )
}

const Mars = () => {
    const MarsRef = useRef();
    const radius = 3;
    const speed = 0.04;

    const MarsGeometry = new THREE.SphereGeometry(0.0532, 32, 32);

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
    const radius = 3.5;
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
    const radius = 4.5;
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
    const radius = 4.5;
    const speed = 0.02;

    const RingGeometry = new THREE.TorusGeometry(1, 0.2, 2, 50);
    RingGeometry.rotateX(-Math.PI / 2);

    const textureLoader = new THREE.TextureLoader();
    const imageUrl = '/img/SatRing.png';
    const texture = textureLoader.load(imageUrl);

    const material = new THREE.MeshStandardMaterial({ map: texture });

    useFrame((state, delta) => {
        const t = state.clock.getElapsedTime(); // 경과 시간
        const angle = t * speed; // 현재 시간에 해당하는 각도
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);
        RingRef.current.position.set(x, 0, z); // 해당 위치로 이동
        // RingRef.current.rotation.y += 0.01
    });

    const saturnRing = useRef()
    useEffect(() => {
        if (saturnRing.current && saturnRing.current.geometry) {
            saturnRing.current.geometry.parameters.radius = 0.3
        }
    }, [])

    return (
        <>
        <mesh geometry={RingGeometry}  material={material} ref={(mesh) => { RingRef.current = mesh }} scale={[0.4,0.4,0.4]} position={[1, 0, 0]}>
            {/* <meshStandardMaterial color={'orange'} ref={saturnRing} /> */}
        </mesh>
        </>
    )
}


const Uranus = () => {
    const UraRef = useRef();
    const radius = 5.5;
    const speed = 0.03;

    const UraGeometry = new THREE.SphereGeometry(0.08, 32, 32);

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
    const radius = 6.3;
    const speed = 0.02;

    const NepGeometry = new THREE.SphereGeometry(0.08, 32, 32);

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

const App = () => {

    return (
        <div>
        <Canvas style={{ width: "100vw", height: "100vh", backgroundColor: "#011224"}}>
            <OrthographicCamera position={[0,0, 100]} />
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
            <OrbitControls />
            {/* <Particles /> */}
        </Canvas>
        </div>
    );
    
};

const Info = () => {

    return (
        <>
            <p style={{whiteSpace: "pre", position: "absolute"}}>
            Distance between Planets : Mars : 227.9 million km <br></br> {/*지구와의 거리*/}
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