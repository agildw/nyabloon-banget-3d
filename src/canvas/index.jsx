import { Canvas } from "@react-three/fiber";
import { Environment, Center, Stage } from "@react-three/drei";

import Shirt from "./Shirt";
import Backdrop from "./Backdrop";
import CameraRig from "./CameraRig";
import { Suspense } from "react";

const CanvasModel = () => {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 0], fov: 25 }} // fov = field of view
      gl={{ preserveDrawingBuffer: true }}
      className="w-full max-w-full h-full transition-all ease-in"
    >
      <ambientLight intensity={0.5} />
      {/* <Suspense fallback={null}> */}
      {/* <Environment preset="city" background /> */}
      {/* potsdamer_platz_1k.hdr */}
      <Environment files={"/public/potsdamer_platz_1k.hdr"} background />

      {/* </Suspense> */}
      <CameraRig>
        <Backdrop />
        <Center>
          <Shirt />
        </Center>
      </CameraRig>
    </Canvas>
  );
};

export default CanvasModel;
