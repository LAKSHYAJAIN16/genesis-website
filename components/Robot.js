'use client';
import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function Eye({ position, mousePosition }) {
  const eyeRef = useRef();
  const pupilRef = useRef();
  const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 });
  
  useFrame(() => {
    if (!mousePosition || !eyeRef.current || !pupilRef.current) return;
    
    // Eye center in screen space (simplified)
    const eyeCenter = new THREE.Vector3(position[0], position[1], 0.5);
    
    // Convert mouse position to 3D space (simplified)
    const targetX = mousePosition.x * 2; // Scale to make effect more visible
    const targetY = mousePosition.y * 2;
    
    // Calculate vector from eye center to cursor
    let dx = targetX - eyeCenter.x;
    let dy = targetY - eyeCenter.y;
    
    // Calculate distance and limit to max pupil movement (0.05)
    const maxDist = 0.05;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance > maxDist) {
      dx = (dx / distance) * maxDist;
      dy = (dy / distance) * maxDist;
    }
    
    // Smooth movement
    const smoothFactor = 0.2;
    const newX = pupilPos.x + (dx - pupilPos.x) * smoothFactor;
    const newY = pupilPos.y + (dy - pupilPos.y) * smoothFactor;
    
    setPupilPos({ x: newX, y: newY });
    
    // Update pupil position
    if (pupilRef.current) {
      pupilRef.current.position.x = position[0] + newX;
      pupilRef.current.position.y = position[1] + newY;
    }
  });
  
  return (
    <group>
      <mesh position={position} ref={eyeRef}>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh 
        position={[position[0], position[1], 0.51]} 
        ref={pupilRef}
      >
        <sphereGeometry args={[0.05, 32, 32]} />
        <meshStandardMaterial color="black" />
      </mesh>
    </group>
  );
}

function RobotHead({ mousePosition }) {
  const headRef = useRef();
  
  useFrame(() => {
    if (headRef.current && mousePosition) {
      // Head follows cursor with some delay
      headRef.current.rotation.y = mousePosition.x * 0.5;
      headRef.current.rotation.x = -mousePosition.y * 0.3;
    }
  });

  return (
    <group ref={headRef} position={[0, 1.5, 0]}>
      {/* Head */}
      <mesh castShadow>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial color="#4a90e2" />
      </mesh>
      
      {/* Eyes */}
      <Eye position={[0.3, 0.1, 0.41]} mousePosition={mousePosition} />
      <Eye position={[-0.3, 0.1, 0.41]} mousePosition={mousePosition} />
    </group>
  );
}

function Robot() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (event) => {
    // Normalize mouse position to -1 to 1 range
    setMousePosition({
      x: (event.clientX / window.innerWidth) * 2 - 1,
      y: -(event.clientY / window.innerHeight) * 2 + 1,
    });
  };

  return (
    <div 
      style={{ width: '100vw', height: '100vh' }}
      onMouseMove={handleMouseMove}
    >
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 1, 5]} />
        <OrbitControls enableZoom={false} />
        
        {/* Lights */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} castShadow />
        
        {/* Robot */}
        <group>
          {/* Body */}
          <mesh position={[0, 0, 0]} castShadow>
            <boxGeometry args={[1.2, 1.2, 0.8]} />
            <meshStandardMaterial color="#4a90e2" />
          </mesh>
          
          {/* Head */}
          <RobotHead mousePosition={mousePosition} />
          
          {/* Arms */}
          <mesh position={[1.1, 0, 0]} castShadow>
            <boxGeometry args={[0.3, 1.5, 0.6]} />
            <meshStandardMaterial color="#4a90e2" />
          </mesh>
          <mesh position={[-1.1, 0, 0]} castShadow>
            <boxGeometry args={[0.3, 1.5, 0.6]} />
            <meshStandardMaterial color="#4a90e2" />
          </mesh>
          
          {/* Legs */}
          <mesh position={[0.4, -1.4, 0]} castShadow>
            <boxGeometry args={[0.4, 1, 0.6]} />
            <meshStandardMaterial color="#4a90e2" />
          </mesh>
          <mesh position={[-0.4, -1.4, 0]} castShadow>
            <boxGeometry args={[0.4, 1, 0.6]} />
            <meshStandardMaterial color="#4a90e2" />
          </mesh>
        </group>
        
        {/* Floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial color="#f0f0f0" />
        </mesh>
      </Canvas>
    </div>
  );
}

export default Robot;
