import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeHeroCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0b0c10, 0.035);

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 0, 12);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for 3D film objects
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. 3D Film Reel Ring 1
    const ringGeo1 = new THREE.TorusGeometry(3.5, 0.12, 16, 100);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0x00f2fe,
      emissive: 0x00f2fe,
      emissiveIntensity: 0.35,
      wireframe: true,
      roughness: 0.2
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    mainGroup.add(ring1);

    // 2. 3D Film Reel Ring 2 (Outer Orbit)
    const ringGeo2 = new THREE.TorusGeometry(5.2, 0.08, 16, 80);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x9d4edd,
      wireframe: true
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    mainGroup.add(ring2);

    // 3. Central Glowing Lens Element (Camera Iris)
    const irisGeo = new THREE.CylinderGeometry(1.8, 1.8, 0.4, 32);
    const irisMat = new THREE.MeshStandardMaterial({
      color: 0x111625,
      metalness: 0.9,
      roughness: 0.1
    });
    const iris = new THREE.Mesh(irisGeo, irisMat);
    iris.rotation.x = Math.PI / 2;
    mainGroup.add(iris);

    // Glowing Lens Core
    const coreGeo = new THREE.SphereGeometry(1.0, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      transparent: true,
      opacity: 0.8
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(core);

    // 4. Floating 3D Keyframe Diamonds
    const keyframesGroup = new THREE.Group();
    const octaGeo = new THREE.OctahedronGeometry(0.35, 0);
    const octaMat = new THREE.MeshStandardMaterial({
      color: 0xffd166,
      emissive: 0xffa000,
      emissiveIntensity: 0.5,
      roughness: 0.1
    });

    for (let i = 0; i < 12; i++) {
      const octa = new THREE.Mesh(octaGeo, octaMat);
      const angle = (i / 12) * Math.PI * 2;
      const radius = 4.5 + Math.random() * 1.5;
      octa.position.x = Math.cos(angle) * radius;
      octa.position.y = (Math.random() - 0.5) * 3;
      octa.position.z = Math.sin(angle) * radius;
      keyframesGroup.add(octa);
    }
    mainGroup.add(keyframesGroup);

    // 5. Particle Field
    const particleCount = 400;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 35;
      particlePositions[i + 1] = (Math.random() - 0.5) * 35;
      particlePositions[i + 2] = (Math.random() - 0.5) * 20;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x00f2fe,
      size: 0.08,
      transparent: true,
      opacity: 0.6
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00f2fe, 3, 20);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x9d4edd, 2, 20);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      mouseX = (x / rect.width) * 2;
      mouseY = -(y / rect.height) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth Mouse Rotation
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      mainGroup.rotation.y = elapsedTime * 0.15 + targetX * 0.5;
      mainGroup.rotation.x = Math.sin(elapsedTime * 0.1) * 0.2 + targetY * 0.3;

      ring1.rotation.z = elapsedTime * 0.2;
      ring2.rotation.z = -elapsedTime * 0.15;
      keyframesGroup.rotation.y = -elapsedTime * 0.25;

      // Pulse Lens Core
      const pulse = 1 + Math.sin(elapsedTime * 3) * 0.08;
      core.scale.set(pulse, pulse, pulse);

      // Rotate Particles slowly
      particles.rotation.y = elapsedTime * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[450px] overflow-hidden rounded-2xl bg-gradient-to-b from-[#0b0c10]/90 to-[#121624]/90 border border-cyan-500/20 shadow-2xl">
      <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-auto cursor-grab active:cursor-grabbing" />
      
      {/* 3D Visual Overlay UI Badges */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-cyan-500/30 text-xs font-mono text-cyan-300">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        <span>3D CANVAS INTERACTIVE ENVIRONMENT</span>
      </div>

      <div className="absolute bottom-4 right-4 z-10 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-purple-500/30 text-xs font-mono text-purple-300">
        <span>INTERACTIVE SHADER & KEYFRAME ENGINE</span>
      </div>
    </div>
  );
};
