import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface JointHotspot {
  id: string;
  name: string;
  pos: [number, number, number];
  color: number;
  condition: string;
}

const HOTSPOTS: JointHotspot[] = [
  { id: 'neck', name: 'Cervical Spine', pos: [0, 2.3, 0], color: 0x0284c7, condition: 'Tech-Neck & Disc Decompression' },
  { id: 'shoulder-r', name: 'Right Shoulder', pos: [-1.2, 1.8, 0], color: 0x0d9488, condition: 'Rotator Cuff & Impingement' },
  { id: 'shoulder-l', name: 'Left Shoulder', pos: [1.2, 1.8, 0], color: 0x0d9488, condition: 'Throwing Scapular Rhythm' },
  { id: 'spine', name: 'L4-L5 Lumbar Spine', pos: [0, 0.4, 0], color: 0x0f766e, condition: 'Sciatica & Herniation Relief' },
  { id: 'hip-r', name: 'Right Hip & Groin', pos: [-0.6, -0.2, 0], color: 0x0284c7, condition: 'Adductor & FAI Stability' },
  { id: 'hip-l', name: 'Left Hip & Groin', pos: [0.6, -0.2, 0], color: 0x0284c7, condition: 'Gluteal Kinetic Firing' },
  { id: 'knee-r', name: 'Right Knee Joint', pos: [-0.7, -1.5, 0.1], color: 0x0d9488, condition: 'ACL Reconstruction & Meniscus' },
  { id: 'knee-l', name: 'Left Knee Joint', pos: [0.7, -1.5, 0.1], color: 0x0d9488, condition: 'Patellofemoral Mechanics' },
  { id: 'ankle-r', name: 'Right Achilles / Ankle', pos: [-0.7, -2.8, 0], color: 0x0284c7, condition: 'Achilles Tendinopathy Load' },
  { id: 'ankle-l', name: 'Left Achilles / Ankle', pos: [0.7, -2.8, 0], color: 0x0284c7, condition: 'Inversion Sprain Stability' },
];

export default function KineticModel3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeJoint, setActiveJoint] = useState<JointHotspot>(HOTSPOTS[6]); // Default to Right Knee
  const [telemetry, setTelemetry] = useState({
    torque: 412,
    symmetry: 96.4,
    cadence: 178,
    valgus: 2.8,
  });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 560;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.2);

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 3. Kinetic Human Biomechanical Skeleton Group
    const bodyGroup = new THREE.Group();
    scene.add(bodyGroup);

    // Clinical Medical Materials (Sapphire, Medical Teal, Clean Slate)
    const jointMaterial = new THREE.MeshBasicMaterial({
      color: 0x0f766e,
      wireframe: false,
    });

    const boneLineMaterial = new THREE.LineBasicMaterial({
      color: 0x0284c7,
      transparent: true,
      opacity: 0.7,
      linewidth: 2,
    });

    const glowRingMaterial = new THREE.MeshBasicMaterial({
      color: 0x0d9488,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide,
    });

    // Helper: Add Joint Sphere
    const sphereGeo = new THREE.SphereGeometry(0.09, 16, 16);
    const headGeo = new THREE.SphereGeometry(0.38, 20, 20);
    const headMesh = new THREE.Mesh(headGeo, new THREE.MeshBasicMaterial({ color: 0x0369a1, wireframe: true, transparent: true, opacity: 0.5 }));
    headMesh.position.set(0, 2.9, 0);
    bodyGroup.add(headMesh);

    // Build Interconnected Kinetic Skeleton
    const joints: Record<string, THREE.Vector3> = {
      head: new THREE.Vector3(0, 2.8, 0),
      neck: new THREE.Vector3(0, 2.3, 0),
      spineHigh: new THREE.Vector3(0, 1.7, 0),
      spineMid: new THREE.Vector3(0, 1.0, 0),
      spineLow: new THREE.Vector3(0, 0.3, 0),
      pelvis: new THREE.Vector3(0, -0.1, 0),
      hipR: new THREE.Vector3(-0.6, -0.2, 0),
      hipL: new THREE.Vector3(0.6, -0.2, 0),
      kneeR: new THREE.Vector3(-0.7, -1.5, 0.1),
      kneeL: new THREE.Vector3(0.7, -1.5, 0.1),
      ankleR: new THREE.Vector3(-0.7, -2.8, 0),
      ankleL: new THREE.Vector3(0.7, -2.8, 0),
      footR: new THREE.Vector3(-0.7, -2.9, 0.4),
      footL: new THREE.Vector3(0.7, -2.9, 0.4),
      shoulderR: new THREE.Vector3(-1.2, 1.8, 0),
      shoulderL: new THREE.Vector3(1.2, 1.8, 0),
      elbowR: new THREE.Vector3(-1.5, 0.8, -0.1),
      elbowL: new THREE.Vector3(1.5, 0.8, -0.1),
      wristR: new THREE.Vector3(-1.6, -0.1, 0),
      wristL: new THREE.Vector3(1.6, -0.1, 0),
    };

    // Add spheres at each joint
    Object.values(joints).forEach((v) => {
      const mesh = new THREE.Mesh(sphereGeo, jointMaterial);
      mesh.position.copy(v);
      bodyGroup.add(mesh);
    });

    // Vertebrae chain along spine
    for (let y = 0.4; y <= 2.2; y += 0.22) {
      const ringGeo = new THREE.RingGeometry(0.12, 0.16, 16);
      const ringMesh = new THREE.Mesh(ringGeo, glowRingMaterial);
      ringMesh.rotation.x = Math.PI / 2;
      ringMesh.position.set(0, y, 0);
      bodyGroup.add(ringMesh);
    }

    // Connect joints with kinetic lines
    const bonePairs = [
      ['neck', 'spineHigh'],
      ['spineHigh', 'spineMid'],
      ['spineMid', 'spineLow'],
      ['spineLow', 'pelvis'],
      ['neck', 'shoulderR'],
      ['neck', 'shoulderL'],
      ['shoulderR', 'elbowR'],
      ['elbowR', 'wristR'],
      ['shoulderL', 'elbowL'],
      ['elbowL', 'wristL'],
      ['pelvis', 'hipR'],
      ['pelvis', 'hipL'],
      ['hipR', 'kneeR'],
      ['kneeR', 'ankleR'],
      ['ankleR', 'footR'],
      ['hipL', 'kneeL'],
      ['kneeL', 'ankleL'],
      ['ankleL', 'footL'],
    ];

    bonePairs.forEach(([j1, j2]) => {
      const lineGeo = new THREE.BufferGeometry().setFromPoints([joints[j1], joints[j2]]);
      const line = new THREE.Line(lineGeo, boneLineMaterial);
      bodyGroup.add(line);
    });

    // 4. Kinetic Rib Rings
    const ribCageRings: THREE.Mesh[] = [];
    for (let i = 0; i < 4; i++) {
      const r = 0.55 - i * 0.04;
      const ringGeo = new THREE.RingGeometry(r - 0.02, r, 32);
      const ring = new THREE.Mesh(ringGeo, glowRingMaterial);
      ring.rotation.x = Math.PI / 2;
      ring.position.set(0, 1.1 + i * 0.22, 0);
      bodyGroup.add(ring);
      ribCageRings.push(ring);
    }

    // 5. Clinical Particle Cloud
    const particleCount = 140;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 3.5;
      particlePositions[i + 1] = (Math.random() - 0.5) * 6.5;
      particlePositions[i + 2] = (Math.random() - 0.5) * 2.5;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x0284c7,
      size: 0.035,
      transparent: true,
      opacity: 0.45,
    });
    const particleCloud = new THREE.Points(particleGeo, particleMat);
    bodyGroup.add(particleCloud);

    // 6. Clean Medical Ground Grid
    const grid = new THREE.GridHelper(8, 16, 0x0d9488, 0xcbd5e1);
    grid.position.y = -3.2;
    grid.material.opacity = 0.35;
    grid.material.transparent = true;
    scene.add(grid);

    // 7. Interactive Mouse Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationY = 0;
    let targetRotationX = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX = x * 1.5;
      mouseY = y * 0.8;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 8. Scroll-Driven 3D Interaction Listener
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = Math.min(Math.max(scrollY / (docHeight || 1), 0), 1);

      targetRotationY = scrollProgress * Math.PI * 3;
      targetRotationX = Math.sin(scrollProgress * Math.PI * 2) * 0.25;

      camera.position.z = 7.2 + Math.sin(scrollProgress * Math.PI * 4) * 0.8;
      bodyGroup.position.y = Math.sin(scrollProgress * Math.PI * 2) * 0.3;

      setTelemetry({
        torque: Math.round(380 + Math.sin(scrollProgress * 10) * 45),
        symmetry: +(94 + Math.cos(scrollProgress * 8) * 3.5).toFixed(1),
        cadence: Math.round(172 + Math.sin(scrollProgress * 12) * 8),
        valgus: +(2.0 + Math.abs(Math.sin(scrollProgress * 6)) * 1.8).toFixed(1),
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight || 560;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    // 10. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      bodyGroup.rotation.y += (targetRotationY + mouseX - bodyGroup.rotation.y) * 0.05;
      bodyGroup.rotation.x += (targetRotationX - mouseY - bodyGroup.rotation.x) * 0.05;
      bodyGroup.position.y += Math.sin(elapsedTime * 1.5) * 0.0015;

      ribCageRings.forEach((ring, idx) => {
        const s = 1 + Math.sin(elapsedTime * 3 + idx) * 0.04;
        ring.scale.set(s, s, s);
      });

      particleCloud.rotation.y = elapsedTime * 0.08;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-b from-white via-slate-50 to-teal-50/40 border border-slate-200/90 shadow-xl">
      
      {/* Clinical Telemetry HUD Top Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-teal-200 text-[11px] font-mono text-teal-800 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping"></span>
          <span>CLINICAL KINETIC BIOMECHANICS • LIVE TELEMETRY</span>
        </div>

        <div className="hidden sm:flex items-center gap-4 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full border border-slate-200 text-[10px] font-mono text-slate-600 shadow-sm">
          <span>TORQUE: <strong className="text-slate-900">{telemetry.torque} N·m</strong></span>
          <span>LSI SYMMETRY: <strong className="text-teal-700">{telemetry.symmetry}%</strong></span>
          <span>VALGUS: <strong className="text-sky-700">{telemetry.valgus}°</strong></span>
        </div>
      </div>

      {/* The WebGL 3D Canvas Mounting Container */}
      <div 
        ref={mountRef} 
        className="w-full h-[480px] sm:h-[580px] lg:h-[640px] cursor-grab active:cursor-grabbing relative z-10"
        title="Scroll to rotate • Move mouse to tilt in 3D"
      />

      {/* Interactive Hotspot Zone Selector (Bottom Controls) */}
      <div className="absolute bottom-4 left-4 right-4 z-20 pointer-events-auto">
        <div className="bg-white/95 backdrop-blur-xl p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="badge-medical text-[10px] font-mono px-2 py-0.5 rounded uppercase">Target Joint Selected</span>
              <strong className="text-sm font-bold text-slate-900 tracking-tight">{activeJoint.name}</strong>
            </div>
            <p className="text-xs text-slate-600">
              {activeJoint.condition} — Evaluated under dynamic clinical kinematic capture.
            </p>
          </div>

          {/* Hotspot Pills */}
          <div className="flex flex-wrap gap-1.5">
            {HOTSPOTS.slice(0, 5).map((hotspot) => (
              <button
                key={hotspot.id}
                onClick={() => setActiveJoint(hotspot)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition border ${
                  activeJoint.id === hotspot.id
                    ? 'bg-teal-600 text-white font-bold border-teal-600 shadow-sm'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:border-teal-500 hover:text-teal-900'
                }`}
              >
                {hotspot.name.split(' ')[0]}
              </button>
            ))}
            <a
              href="/services"
              className="px-3 py-1.5 rounded-xl text-xs font-mono bg-slate-100 text-slate-800 hover:bg-slate-200 transition border border-slate-200"
            >
              All Protocols →
            </a>
          </div>

        </div>
      </div>

      {/* Floating Scroll Hint Overlay */}
      <div className="absolute top-1/2 right-4 -translate-y-1/2 hidden lg:flex flex-col items-center gap-2 text-[10px] font-mono text-slate-400 pointer-events-none z-10">
        <span className="rotate-90 origin-center tracking-widest uppercase font-semibold">Scroll to Transform</span>
        <div className="w-0.5 h-12 bg-gradient-to-b from-teal-500 to-transparent mt-8 animate-pulse"></div>
      </div>

    </div>
  );
}
