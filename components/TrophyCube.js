'use client';

import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function TrophyCube() {
  const mountRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    
    // Get canvas dimensions - half screen width
    const canvasWidth = window.innerWidth / 2;
    const canvasHeight = 400;
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      canvasWidth / canvasHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    renderer.setSize(canvasWidth, canvasHeight);
    renderer.setClearColor(0x000000, 0);

    // Create cube geometry
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    
    // Create materials for each face with different colors
    const materials = [
      new THREE.MeshBasicMaterial({ color: 0xffd700, transparent: true, opacity: 0.8 }),
      new THREE.MeshBasicMaterial({ color: 0xffed4e, transparent: true, opacity: 0.8 }),
      new THREE.MeshBasicMaterial({ color: 0xffc107, transparent: true, opacity: 0.8 }),
      new THREE.MeshBasicMaterial({ color: 0xffb300, transparent: true, opacity: 0.8 }),
      new THREE.MeshBasicMaterial({ color: 0xffd700, transparent: true, opacity: 0.8 }),
      new THREE.MeshBasicMaterial({ color: 0xffed4e, transparent: true, opacity: 0.8 }),
    ];

    // Create cube mesh
    const cube = new THREE.Mesh(geometry, materials);
    cube.position.set(0, 0, 0); // Center the cube at origin
    scene.add(cube);

    // Add wireframe
    const wireframeGeometry = new THREE.EdgesGeometry(geometry);
    const wireframeMaterial = new THREE.LineBasicMaterial({ 
      color: 0xffffff, 
      transparent: true, 
      opacity: 0.3 
    });
    const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
    cube.add(wireframe);

    // Add OrbitControls for interaction
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = false;

    // Mount renderer
    mountRef.current.appendChild(renderer.domElement);

    // Mouse hover handlers
    const handleMouseEnter = () => {
      setIsHovering(true);
      renderer.domElement.style.cursor = 'grab';
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      renderer.domElement.style.cursor = 'default';
    };

    const handleMouseDown = () => {
      renderer.domElement.style.cursor = 'grabbing';
    };

    const handleMouseUp = () => {
      renderer.domElement.style.cursor = 'grab';
    };

    // Add event listeners
    renderer.domElement.addEventListener('mouseenter', handleMouseEnter);
    renderer.domElement.addEventListener('mouseleave', handleMouseLeave);
    renderer.domElement.addEventListener('mousedown', handleMouseDown);
    renderer.domElement.addEventListener('mouseup', handleMouseUp);

    // Animation loop with auto-rotation
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      // Auto-rotate on multiple axes when not hovering
      if (!isHovering && cube) {
        cube.rotation.x += 0.005;
        cube.rotation.y += 0.01;
        cube.rotation.z += 0.003;
      }
      
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup function
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      if (renderer.domElement) {
        renderer.domElement.removeEventListener('mouseenter', handleMouseEnter);
        renderer.domElement.removeEventListener('mouseleave', handleMouseLeave);
        renderer.domElement.removeEventListener('mousedown', handleMouseDown);
        renderer.domElement.removeEventListener('mouseup', handleMouseUp);
      }
      controls.dispose();
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <div className="relative w-1/2 h-[400px]">
      <div 
        ref={mountRef} 
        className="w-full h-full"
      />
    </div>
  );
}
