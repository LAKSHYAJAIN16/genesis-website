'use client';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

export default function TrophyCube() {
  const mountRef = useRef(null);
  const modelRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const animationIdRef = useRef(null);
  const autoRotateSpeed = 10; // Increased rotation speed

  // Initialize Three.js scene
  useEffect(() => {
    if (!mountRef.current) return;
    
    const container = mountRef.current.parentElement;
    if (!container) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = null;
    sceneRef.current = scene;
    
    // Camera setup - positioned to accommodate the trophy
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0.5, 6);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    
    // Key light
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(5, 5, 5);
    keyLight.castShadow = true;
    scene.add(keyLight);
    
    // Fill light
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
    fillLight.position.set(-5, 3, -5);
    scene.add(fillLight);
    
    // Back light
    const backLight = new THREE.DirectionalLight(0xffffff, 0.8);
    backLight.position.set(-3, -2, -5);
    scene.add(backLight);
    
    // Hemisphere light
    const hemiLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.5);
    scene.add(hemiLight);
    
    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;
    controls.enablePan = false;
    controls.enableRotate = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = autoRotateSpeed;
    
    // Mount renderer
    mountRef.current.appendChild(renderer.domElement);
    
    // Load trophy model
    const mtlLoader = new MTLLoader();
    const objLoader = new OBJLoader();
    
    mtlLoader.load(
      '/model.mtl',
      (materials) => {
        materials.preload();
        objLoader.setMaterials(materials);
        
        objLoader.load(
          '/model.obj',
          (object) => {
            object.traverse((child) => {
              if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                
                if (child.material) {
                  const goldMaterial = new THREE.MeshStandardMaterial({
                    color: 0xFFD700,
                    metalness: 0.7,
                    roughness: 0.3,
                    emissive: 0x000000,
                    emissiveIntensity: 0.1,
                    envMapIntensity: 1.5
                  });
                  
                  child.material = goldMaterial;
                }
              }
            });
            
            // Center and scale the model
            const box = new THREE.Box3().setFromObject(object);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 2.5 / maxDim;
            
            object.scale.set(scale, scale, scale);
            object.position.y = -1;
            
            scene.add(object);
            modelRef.current = object;
          },
          undefined,
          (error) => {
            console.error('Error loading model:', error);
          }
        );
      },
      undefined,
      (error) => {
        console.error('Error loading materials:', error);
      }
    );
    
    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      
      if (controls) {
        controls.update();
      }
      
      renderer.render(scene, camera);
    };
    
    // Start animation
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      
      window.removeEventListener('resize', handleResize);
      
      if (renderer?.domElement?.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      if (controls) {
        controls.dispose();
      }
      
      if (renderer) {
        renderer.dispose();
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <div 
        ref={mountRef} 
        className="w-full h-full select-none"
        style={{ cursor: 'grab' }}
      />
    </div>
  );
}
