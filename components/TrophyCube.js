'use client';

import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

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
    camera.position.set(0, 0, 1.5);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    renderer.setSize(canvasWidth, canvasHeight);
    renderer.setClearColor(0x000000, 0);

    // Add lighting for better model visibility
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    scene.add(directionalLight);

    // Variable to store the loaded model
    let model = null;

    // Load the 3D model
    const mtlLoader = new MTLLoader();
    mtlLoader.load('/model.mtl', (materials) => {
      materials.preload();
      
      const objLoader = new OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.load('/model.obj', (object) => {
        model = object;
        
        // Scale and position the model
        model.scale.set(0.1, 0.1, 0.1);
        model.position.set(0, 0, 0);
        
        // Apply golden material to all meshes
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.material = new THREE.MeshPhongMaterial({
              color: 0xffd700,
              shininess: 100,
              transparent: true,
              opacity: 0.9
            });
          }
        });
        
        scene.add(model);
      }, undefined, (error) => {
        console.error('Error loading OBJ model:', error);
        // Fallback to cube if model fails to load
        createFallbackCube();
      });
    }, undefined, (error) => {
      console.error('Error loading MTL materials:', error);
      // Fallback to cube if materials fail to load
      createFallbackCube();
    });

    // Fallback cube function
    const createFallbackCube = () => {
      const geometry = new THREE.BoxGeometry(2, 2, 2);
      const material = new THREE.MeshPhongMaterial({ 
        color: 0xffd700, 
        transparent: true, 
        opacity: 0.8 
      });
      model = new THREE.Mesh(geometry, material);
      model.position.set(0, 0, 0);
      scene.add(model);
    };

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
      
      // Auto-rotate on Y-axis only when not hovering (natural side-to-side rotation)
      if (!isHovering && model) {
        model.rotation.y += 0.01;
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
