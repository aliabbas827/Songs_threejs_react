import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment } from "@react-three/drei";

function Model(props) {
  const { nodes, materials } = useGLTF("/monster/monster.gltf");
  return (
    <group {...props} dispose={null}>
      <group
        position={[0, 1.307, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={1.171}
      >
        <mesh geometry={nodes.Body.geometry} material={materials.lambert2} />
        <mesh
          geometry={nodes.Body_fur.geometry}
          material={materials.Material}
          
        />
        <mesh
          geometry={nodes.eyes.geometry}
          material={materials.lambert2}
          position={[0, 0, 1.113]}
          scale={0.038}
        />
        <mesh
          geometry={nodes.Teeth.geometry}
          material={materials.lambert2}
          position={[0, 0, 1.113]}
          scale={0.038}
        />
        <mesh
          geometry={nodes.Top_Hair.geometry}
          material={materials.lambert2}
          position={[0, 0, 1.113]}
          scale={0.038}
        />
      </group>
    </group>
  );
}
function Model2(props) {
  const { nodes, materials } = useGLTF("/professor/professor.gltf");
  return (
    <group {...props} dispose={null}>
      <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        <mesh geometry={nodes.beard_geo.geometry} material={materials.Hair} />
        <mesh geometry={nodes.Body_geo.geometry} material={materials.Body} />
        <mesh geometry={nodes.Bowtie_geo.geometry} material={materials.Coat} />
        <mesh geometry={nodes.Coat_geo.geometry} material={materials.Coat} />
        <mesh geometry={nodes.Eye_geo.geometry} material={materials.Eyes} />
        <mesh geometry={nodes.Eyebrow_geo.geometry} material={materials.Hair} />
        <mesh geometry={nodes.Hair_geo.geometry} material={materials.Hair} />
        <mesh
          geometry={nodes.Pant_geo.geometry}
          material={materials.PAntandshirt}
        />
        <mesh
          geometry={nodes.Shirt_geo.geometry}
          material={materials.PAntandshirt}
        />
        <mesh geometry={nodes.Shoes_geo.geometry} material={materials.Shoe} />
        <mesh
          geometry={nodes.Specs_frame_geo.geometry}
          material={materials.Specs}
        />
        <mesh
          geometry={nodes.Specs_glass_geo.geometry}
          material={materials.Specs}
        />
        <mesh geometry={nodes.Teeth_geo.geometry} material={materials.Teeth} />
        <mesh
          geometry={nodes.Waistcoat_geo.geometry}
          material={materials.Coat}
        />
      </group>
    </group>
  );
}
function Home() {
  // const [selectedCharacter, setSelectedCharacter] = useState(null);

  // const handleCharacterSelection = (character) => {
  //   setSelectedCharacter(character);
  // };

  const [selectedDiv, setSelectedDiv] = useState(null);  // This will track the selected div

  // Function to handle selection
  const toggleSelection = (divId) => {
    if (selectedDiv === divId) {
      setSelectedDiv(null);  // If it's already selected, deselect it
    } else {
      setSelectedDiv(divId);  // Else select the new div
    }
  };

  return (
    <div className="p-3 bg-[#234795] bg-opacity-90 lg:h-[90vh] h-[190vh]">
      <h1 className="text-2xl font-bold mb-4 text-center text-white py-8">
        Choose Your Character
      </h1>

      <div className="">
        {/* <div className="flex items-center">
          <input
            type="checkbox"
            id="character1"
            name="character"
            value="character1"
            checked={selectedCharacter === "character1"}
            onChange={() => handleCharacterSelection("character1")}
            className="mr-2"
          />
          <label htmlFor="character1">
            <img src="character1.png" alt="Character 1" className="w-16 h-16" />
          </label>
        </div> */}

        {/* <div className="flex items-center">
          <input
            type="checkbox"
            id="character2"
            name="character"
            value="character2"
            checked={selectedCharacter === "character2"}
            onChange={() => handleCharacterSelection("character2")}
            className="mr-2"
          />
          <label htmlFor="character2">
            <img src="character2.png" alt="Character 2" className="w-16 h-16" />
          </label>
        </div> */}
      </div>
      <div className="flex justify-evenly items-center flex-wrap gap-10">
        <div  className={`divWithCanvas ${selectedDiv === 'div1' ? 'selected' : ''}`}
          onClick={() => toggleSelection('div1')}>
          <Canvas
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
            }}
            className="responsive-canvas"
          >
            <Suspense fallback={null}>
              {/* <directionalLight /> */}
              <spotLight
                intensity={0.9}
                angle={0.1}
                penumbra={1}
                position={[10, 15, 10]}
                castShadow
              />
              <Model scale={[1.5, 1.5, 1.5]} position={[0,-2, 0]} /> {/* Adjust scale as needed */}
              <OrbitControls
                enablePan={true}
                enableZoom={false}
                enableRotate={true}
                minPolarAngle={Math.PI / 2.1}
                maxPolarAngle={Math.PI / 2.1}
              />
              <Environment preset="sunset" />
            </Suspense>
          </Canvas>
        </div>
        <div className={`divWithCanvas ${selectedDiv === 'div2' ? 'selected' : ''}`}
          onClick={() => toggleSelection('div2')}>
          <Canvas
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="responsive-canvas"
          >
            <Suspense fallback={null}>
              <directionalLight />
              <spotLight
                intensity={0.9}
                angle={0.1}
                penumbra={1}
                position={[10, 15, 10]}
                castShadow
              />
              <Model2 scale={[3.5, 3.5, 3.5]} position={[0,-2.4, 0]} />
              <OrbitControls
                enablePan={true}
                enableZoom={false}
                enableRotate={true}
                minPolarAngle={Math.PI / 2.1}
                maxPolarAngle={Math.PI / 2.1}
              />
              <Environment preset="sunset" />
            </Suspense>
          </Canvas>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="mt-4 btn text-white font-bold py-2 px-4 rounded mx-auto"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Home;
