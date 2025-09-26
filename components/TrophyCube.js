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
    
    // Get canvas dimensions - fixed size
    const canvasWidth = 400;
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
      antialias: true,
      powerPreference: 'high-performance',
      precision: 'highp'
    });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize(canvasWidth, canvasHeight);
    renderer.setClearColor(0x000000, 0);

    // Enhanced trophy lighting setup
    // Soft ambient light for base illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);
    
    // Main key light - bright golden from top-right
    const keyLight = new THREE.DirectionalLight(0xfff4d6, 1.5);
    keyLight.position.set(8, 15, 10);
    keyLight.castShadow = true;
    scene.add(keyLight);
    
    // Fill light - soft white from opposite side
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
    fillLight.position.set(-8, 5, 5);
    scene.add(fillLight);
    
    // Rim light - creates highlight on edges
    const rimLight = new THREE.DirectionalLight(0xffffff, 1);
    rimLight.position.set(0, 5, -15);
    scene.add(rimLight);
    
    // Accent lights for sparkle
    const accentLight1 = new THREE.PointLight(0xffdd88, 2, 15);
    accentLight1.position.set(10, 10, 5);
    scene.add(accentLight1);
    
    const accentLight2 = new THREE.PointLight(0x88aaff, 1.5, 15);
    accentLight2.position.set(-10, 5, -5);
    scene.add(accentLight2);
    
    // Helper to visualize lights (uncomment for debugging)
    // const helper1 = new THREE.DirectionalLightHelper(keyLight, 1);
    // scene.add(helper1);

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
        
        // Scale and position the model - increased scale for larger trophy
        model.scale.set(1, 1, 1);
        model.position.y = -0.5; // Slightly lower the model
        // Apply golden material to all meshes
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.material = new THREE.MeshPhongMaterial({
              color: 0xffd700, // Golden base color
              emissive: 0x332200, // Warm emissive for inner glow
              specular: 0xffdd55, // Bright golden specular
              shininess: 100, // High shininess for metallic look
              metalness: 0.9, // Enhanced metal reflection
              roughness: 0.3, // Slight roughness for realism
              transparent: true,
              opacity: 0.98,
              flatShading: false // Smooth shading for better reflections
            });
          }
        });
        
        scene.add(model);

      });
    }, undefined, (error) => {

    });
    
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
    <div className="relative w-[400px] h-[400px]">
      <div 
        ref={mountRef} 
        className="w-full h-full"
      />
    </div>
  );
}
