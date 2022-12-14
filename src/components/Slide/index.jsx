import React, { Suspense, useRef } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useState } from "react";
import { useEffect } from "react";
import { MathUtils, Matrix4 } from "three";
import { degToRad } from "../../constants/functions";
import Annotation from "../Annotation";

const Slide = ({
  imgData,
  positionZ,
  refCenter,
  setRefCenter,
  opacity,
  composite,
}) => {
  const [texture, setTexture] = useState();
  const [mat1, setMat1] = useState();
  const [mat2, setMat2] = useState();
  const [position, setPosition] = useState([0, 0]);
  const mesh = useRef();
  const width = useRef();
  const height = useRef();

  useTexture(`${window.location.origin}${imgData.url}`, (tex) => {
    setTexture(tex);
    width.current = tex.image.width;
    height.current = tex.image.height;
  });

  useEffect(() => {
    if (!texture) return;

    if (imgData.reference && !refCenter) {
      const center = {
        x: width.current / 2,
        y: height.current / 2,
      };
      setRefCenter(center);
    }

    if (!imgData.reference) {
      setPosition([width.current / 2, -height.current / 2]);
      const matrix = new Matrix4();
      const matrix2 = new Matrix4();

      matrix.multiply(
        new Matrix4().makeTranslation(-refCenter?.x, refCenter?.y, 0)
      );

      matrix.multiply(new Matrix4().makeRotationZ(degToRad(-imgData.tilt)));

      matrix.multiply(
        new Matrix4().makeShear(imgData.x_skew, 0, imgData.y_skew, 0, 0, 0)
      );

      matrix.multiply(
        new Matrix4().makeScale(imgData.x_scale, imgData.y_scale, 1)
      );

      console.log(matrix, imgData);

      matrix2.multiply(
        new Matrix4().makeTranslation(imgData.x_disp, -imgData.y_disp, 0)
      );

      setMat1(matrix);
      setMat2(matrix2);
    }
  }, [texture, refCenter]);

  return (
    <Suspense fallback={null}>
      <group matrixAutoUpdate={false} matrix={mat2}>
        <group matrixAutoUpdate={false} matrix={mat1}>
          <mesh ref={mesh} position={[...position, positionZ]}>
            <planeBufferGeometry
              attach="geometry"
              args={[width.current, height.current]}
            />
            <meshBasicMaterial
              attach="material"
              map={texture}
              side={THREE.DoubleSide}
              transparent={true}
              toneMapped={false}
              opacity={opacity / 100}
            />
            <Annotation
              img={imgData}
              width={width.current}
              height={height.current}
              composite={composite}
            />
          </mesh>
        </group>
      </group>
    </Suspense>
  );
};

export default Slide;
