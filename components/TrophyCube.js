'use client';

import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function TrophyCube() {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cubeRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previousMousePosition, setPreviousMousePosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Get canvas dimensions
    const canvasWidth = window.innerWidth;
    const canvasHeight = 500;
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      canvasWidth / canvasHeight, // aspect ratio for full width container
      0.1,
      1000
    );
    camera.position.z = 3;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    renderer.setSize(canvasWidth, canvasHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    rendererRef.current = renderer;

    // Create cube geometry
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    
    // Create materials for each face with different colors
    const materials = [
      new THREE.MeshBasicMaterial({ color: 0xffd700, transparent: true, opacity: 0.8 }), // Gold
      new THREE.MeshBasicMaterial({ color: 0xffed4e, transparent: true, opacity: 0.8 }), // Light gold
      new THREE.MeshBasicMaterial({ color: 0xffc107, transparent: true, opacity: 0.8 }), // Amber
      new THREE.MeshBasicMaterial({ color: 0xffb300, transparent: true, opacity: 0.8 }), // Orange gold
      new THREE.MeshBasicMaterial({ color: 0xffd700, transparent: true, opacity: 0.8 }), // Gold
      new THREE.MeshBasicMaterial({ color: 0xffed4e, transparent: true, opacity: 0.8 }), // Light gold
    ];

    // Create cube mesh
    const cube = new THREE.Mesh(geometry, materials);
    cubeRef.current = cube;
    scene.add(cube);

    // Add wireframe for extra detail
    const wireframeGeometry = new THREE.EdgesGeometry(geometry);
    const wireframeMaterial = new THREE.LineBasicMaterial({ 
      color: 0xffffff, 
      transparent: true, 
      opacity: 0.3 
    });
    const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
    cube.add(wireframe);

    // Mount renderer
    mountRef.current.appendChild(renderer.domElement);

    // Mouse event handlers - using a more direct approach
    let isMouseDown = false;
    let lastMouseX = 0;
    let lastMouseY = 0;

    const onMouseDown = (event) => {
      isMouseDown = true;
      lastMouseX = event.clientX;
      lastMouseY = event.clientY;
      setIsDragging(true);
      renderer.domElement.style.cursor = 'grabbing';
      event.preventDefault();
    };

    const onMouseMove = (event) => {
      if (!isMouseDown || !cubeRef.current) return;
      
      const deltaX = event.clientX - lastMouseX;
      const deltaY = event.clientY - lastMouseY;
      
      // Apply rotation directly to the cube
      cubeRef.current.rotation.y += deltaX * 0.01;
      cubeRef.current.rotation.x += deltaY * 0.01;
      
      lastMouseX = event.clientX;
      lastMouseY = event.clientY;
      event.preventDefault();
    };

    const onMouseUp = () => {
      isMouseDown = false;
      setIsDragging(false);
      renderer.domElement.style.cursor = 'grab';
    };

    // Mouse hover handlers
    const handleMouseEnter = () => {
      setIsHovering(true);
      renderer.domElement.style.cursor = 'grab';
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      renderer.domElement.style.cursor = 'default';
    };

    // Add event listeners
    renderer.domElement.addEventListener('mousedown', onMouseDown);
    renderer.domElement.addEventListener('mouseenter', handleMouseEnter);
    renderer.domElement.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    // Animation loop - no auto rotation, just rendering
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup function
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      if (renderer.domElement) {
        renderer.domElement.removeEventListener('mousedown', onMouseDown);
        renderer.domElement.removeEventListener('mouseenter', handleMouseEnter);
        renderer.domElement.removeEventListener('mouseleave', handleMouseLeave);
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      if (sceneRef.current) {
        sceneRef.current.clear();
      }
    };
  }, [isDragging, rotation]);

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center">
      <div 
        ref={mountRef} 
        className="w-full h-full"
      />
      {isHovering && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-3 py-1 rounded-md text-sm pointer-events-none z-10">
          grab to rotate
        </div>
      )}
    </div>
  );
}
