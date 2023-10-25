import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Acros = ({ isMobile }) => {

  const Acro = useGLTF("./acro.glb");

  return (
    <mesh>
      <hemisphereLight intensity={0.1} groundColor='black' />
      <spotLight
        position={[20, 50, -10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={0.1} />
      <primitive
        object={Acro.scene}
        scale={isMobile ? 0.1 : 0.15}
        position={isMobile ? [0, 0, 0] : [0, 0, 0]}
        rotation={[1.85, 0.5, -2.1]}
      />
    </mesh>
  );
};

const AcrosCanvas = () => {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop='demand'
      shadows={true}
      dpr={[1, 2]}
      camera={{ position: [20, -3, -3], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          // enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Acros isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default AcrosCanvas;
