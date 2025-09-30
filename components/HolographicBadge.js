'use client';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';

export default function HolographicBadge() {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const composerRef = useRef(null);
  const badgeRef = useRef(null);
  const particlesRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });

  // Initialize Three.js scene
  useEffect(() => {
    if (!mountRef.current) return;
    
    const container = mountRef.current.parentElement;
    if (!container) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = null;
    scene.fog = new THREE.Fog(0x000000, 1, 10);
    sceneRef.current = scene;
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    rendererRef.current = renderer;
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0x00a8ff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0x00a8ff, 1, 10);
    pointLight.position.set(2, 2, 2);
    scene.add(pointLight);
    
    // Create badge geometry
    const createBadge = () => {
      const group = new THREE.Group();
      
      // Main badge shape
      const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
      const material = new THREE.MeshPhongMaterial({
        color: 0x00a8ff,
        emissive: 0x0044ff,
        emissiveIntensity: 0.5,
        transparent: true,
        opacity: 0.8,
        wireframe: false,
        shininess: 100,
      });
      
      const badge = new THREE.Mesh(geometry, material);
      badge.rotation.x = Math.PI / 2;
      group.add(badge);
      
      // Inner glow
      const innerGeometry = new THREE.SphereGeometry(0.6, 32, 32);
      const innerMaterial = new THREE.MeshBasicMaterial({
        color: 0x00a8ff,
        transparent: true,
        opacity: 0.3,
      });
      const innerSphere = new THREE.Mesh(innerGeometry, innerMaterial);
      group.add(innerSphere);
      
      return group;
    };
    
    // Create particles
    const createParticles = () => {
      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = 1000;
      
      const posArray = new Float32Array(particlesCount * 3);
      
      for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 5;
      }
      
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      
      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.01,
        color: 0x00a8ff,
        transparent: true,
        opacity: 0.8,
      });
      
      const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
      return particlesMesh;
    };
    
    // Create scene objects
    badgeRef.current = createBadge();
    particlesRef.current = createParticles();
    scene.add(badgeRef.current);
    scene.add(particlesRef.current);
    
    // Post-processing
    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,  // strength
      0.4,  // radius
      0.85  // threshold
    );
    
    const fxaaPass = new ShaderPass(FXAAShader);
    fxaaPass.material.uniforms['resolution'].value.set(
      1 / (container.clientWidth * window.devicePixelRatio),
      1 / (container.clientHeight * window.devicePixelRatio)
    );
    
    const composer = new EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);
    composer.addPass(fxaaPass);
    composerRef.current = composer;
    
    // Mouse move handler
    const handleMouseMove = (event) => {
      mouse.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      };
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Update rotation based on mouse position
      targetRotation.current = {
        x: mouse.current.y * 0.2,
        y: mouse.current.x * 0.2
      };
      
      // Smooth rotation
      currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 0.05;
      currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 0.05;
      
      if (badgeRef.current) {
        badgeRef.current.rotation.x = currentRotation.current.x;
        badgeRef.current.rotation.y = currentRotation.current.y;
        badgeRef.current.rotation.z += 0.003;
      }
      
      if (particlesRef.current) {
        particlesRef.current.rotation.x += 0.0005;
        particlesRef.current.rotation.y += 0.0005;
      }
      
      // Render scene
      composer.render();
    };
    
    // Initial render
    mountRef.current.appendChild(renderer.domElement);
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (!container || !camera || !renderer || !composer) return;
      
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      
      renderer.setSize(container.clientWidth, container.clientHeight);
      composer.setSize(container.clientWidth, container.clientHeight);
      
      fxaaPass.material.uniforms['resolution'].value.set(
        1 / (container.clientWidth * window.devicePixelRatio),
        1 / (container.clientHeight * window.devicePixelRatio)
      );
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      
      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose of Three.js objects
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      
      if (composer) {
        composer.passes.forEach(pass => {
          if (pass.dispose) pass.dispose();
        });
        composer.dispose();
      }
      
      if (renderer) {
        renderer.dispose();
      }
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="w-full h-full absolute inset-0 pointer-events-none"
      style={{
        background: 'radial-gradient(circle at center, rgba(0, 40, 83, 0.2) 0%, rgba(0, 0, 0, 0) 70%)',
      }}
    />
  );
}
