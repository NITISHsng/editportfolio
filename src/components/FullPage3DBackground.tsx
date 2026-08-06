import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const FullPage3DBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08080a, 0.025);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 15);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Main 3D World Group
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // 1. Floating 16:9 Video Frame Wireframes (Video Editing Canvas Bounds)
    const videoFrames: THREE.Mesh[] = [];
    const frameGeo = new THREE.PlaneGeometry(3.2, 1.8);
    const frameMat = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      wireframe: true,
      transparent: true,
      opacity: 0.25
    });

    for (let i = 0; i < 12; i++) {
      const frame = new THREE.Mesh(frameGeo, frameMat);
      frame.position.set(
        (Math.random() - 0.5) * 22,
        (Math.random() - 0.5) * 35,
        (Math.random() - 0.5) * 12
      );
      frame.rotation.set(
        (Math.random() - 0.5) * 0.4,
        (Math.random() - 0.5) * 0.6,
        (Math.random() - 0.5) * 0.2
      );
      worldGroup.add(frame);
      videoFrames.push(frame);
    }

    // 2. Video Editing Timeline Track Ribbons (Horizontal Timeline Audio/Video Blocks)
    const timelineTracks: THREE.Mesh[] = [];
    const trackGeo = new THREE.BoxGeometry(4, 0.2, 0.05);
    const trackMatCyan = new THREE.MeshStandardMaterial({
      color: 0x00f2fe,
      emissive: 0x00f2fe,
      emissiveIntensity: 0.3,
      metalness: 0.8,
      roughness: 0.2
    });
    const trackMatPurple = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      emissive: 0xa855f7,
      emissiveIntensity: 0.2,
      metalness: 0.8,
      roughness: 0.2
    });

    for (let i = 0; i < 18; i++) {
      const mat = i % 2 === 0 ? trackMatCyan : trackMatPurple;
      const track = new THREE.Mesh(trackGeo, mat);
      track.scale.x = 0.5 + Math.random() * 1.5;
      track.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 38,
        (Math.random() - 0.5) * 10
      );
      worldGroup.add(track);
      timelineTracks.push(track);
    }

    // 3. Film Sprocket / Film Strip Segment
    const filmStripGroup = new THREE.Group();
    const stripGeo = new THREE.PlaneGeometry(12, 1.2);
    const stripMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      side: THREE.DoubleSide,
      metalness: 0.9,
      roughness: 0.3
    });
    const filmStrip = new THREE.Mesh(stripGeo, stripMat);
    filmStripGroup.add(filmStrip);

    // Film strip border lines
    const lineGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-6, 0.6, 0.01),
      new THREE.Vector3(6, 0.6, 0.01),
      new THREE.Vector3(-6, -0.6, 0.01),
      new THREE.Vector3(6, -0.6, 0.01)
    ]);
    const lineMat = new THREE.LineBasicMaterial({ color: 0x00f2fe });
    const lineSegments = new THREE.LineSegments(lineGeo, lineMat);
    filmStripGroup.add(lineSegments);

    filmStripGroup.position.set(-2, 2, -4);
    filmStripGroup.rotation.set(0.2, -0.4, 0.1);
    worldGroup.add(filmStripGroup);

    // 4. Subtle Particle Starfield
    const particleCount = 600;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 50;
      positions[i + 1] = (Math.random() - 0.5) * 70;
      positions[i + 2] = (Math.random() - 0.5) * 30;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x94a3b8,
      size: 0.06,
      transparent: true,
      opacity: 0.4
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x00f2fe, 2, 30);
    cyanLight.position.set(10, 10, 10);
    scene.add(cyanLight);

    // Scroll Tracking
    let scrollY = 0;
    let targetScrollY = 0;

    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = (performance.now() - startTime) / 1000;

      // Smooth scroll interpolation
      targetScrollY += (scrollY - targetScrollY) * 0.05;
      const scrollPercent = targetScrollY / (document.body.scrollHeight || 1);

      // Scroll-driven camera and scene transformations
      camera.position.y = -targetScrollY * 0.012;
      camera.position.z = 15 + Math.sin(scrollPercent * Math.PI * 2) * 3;
      camera.rotation.z = Math.sin(scrollPercent * Math.PI) * 0.1;

      worldGroup.rotation.y = elapsedTime * 0.05 + scrollPercent * Math.PI * 0.5;
      filmStripGroup.rotation.z = Math.sin(elapsedTime * 0.3) * 0.1;

      // Animate floating video wireframes
      videoFrames.forEach((frame, idx) => {
        frame.rotation.y += 0.005 * (idx % 2 === 0 ? 1 : -1);
        frame.position.y += Math.sin(elapsedTime + idx) * 0.002;
      });

      // Animate floating timeline tracks
      timelineTracks.forEach((track, idx) => {
        track.rotation.z = Math.sin(elapsedTime * 0.5 + idx) * 0.05;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-70"
    />
  );
};
