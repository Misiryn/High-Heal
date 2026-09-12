import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface JointMetric {
  m1Label: string;
  m1Val: string;
  m2Label: string;
  m2Val: string;
  m3Label: string;
  m3Val: string;
}

export interface JointHotspot {
  id: string;
  label: string;
  name: string;
  pos: [number, number, number];
  camPos: [number, number, number];
  condition: string;
  metrics: JointMetric;
}

const HOTSPOTS: JointHotspot[] = [
  {
    id: 'overview',
    label: 'Full Body',
    name: 'Full Kinetic Biomechanical Chain',
    pos: [0, -0.1, 0],
    camPos: [0, -0.1, 10.4],
    condition: 'Global Musculoskeletal Kinetic Alignment & Force Distribution',
    metrics: {
      m1Label: 'GLOBAL TORQUE',
      m1Val: '412 N·m',
      m2Label: 'LSI SYMMETRY',
      m2Val: '96.4%',
      m3Label: 'VALGUS',
      m3Val: '2.8°',
    },
  },
  {
    id: 'cervical',
    label: 'Neck / Cervical',
    name: 'Cervical Spine (C1-C7)',
    pos: [0, 2.3, 0],
    camPos: [0, 2.3, 3.4],
    condition: 'Tech-Neck, Cervicogenic Headaches & Disc Decompression',
    metrics: {
      m1Label: 'CRANIAL ANGLE',
      m1Val: '52.4°',
      m2Label: 'C2-C7 LORDOSIS',
      m2Val: '32°',
      m3Label: 'NEURAL TENSION',
      m3Val: 'Normal',
    },
  },
  {
    id: 'shoulder-r',
    label: 'R Shoulder',
    name: 'Right Rotator Cuff & Scapula',
    pos: [-1.2, 1.8, 0],
    camPos: [-0.9, 1.8, 3.2],
    condition: 'Rotator Cuff Tear, Impingement & Throwing Scapular Rhythm',
    metrics: {
      m1Label: 'SCAPULAR RHYTHM',
      m1Val: '2.1 : 1',
      m2Label: 'INTERNAL ROT.',
      m2Val: '68°',
      m3Label: 'PEAK VELOCITY',
      m3Val: '840°/s',
    },
  },
  {
    id: 'lumbar',
    label: 'Lumbar Spine',
    name: 'L4-L5 Lumbar Spine & Core',
    pos: [0, 0.4, 0],
    camPos: [0, 0.4, 3.3],
    condition: 'Sciatica, Disc Herniation Relief & Core Kinetic Transfer',
    metrics: {
      m1Label: 'AXIAL LOAD',
      m1Val: '1.8 kN',
      m2Label: 'PELVIC TILT',
      m2Val: '11.2°',
      m3Label: 'MULTIFIDUS',
      m3Val: 'Symmetric',
    },
  },
  {
    id: 'hip-r',
    label: 'R Hip',
    name: 'Right Hip & Femoroacetabular Joint',
    pos: [-0.6, -0.2, 0],
    camPos: [-0.5, -0.2, 3.2],
    condition: 'Adductor Strain, FAI Stability & Gluteal Firing Mechanics',
    metrics: {
      m1Label: 'HIP ABDUCTION',
      m1Val: '44°',
      m2Label: 'GLUTE FIRING',
      m2Val: '92%',
      m3Label: 'FAI CLEARANCE',
      m3Val: 'Optimal',
    },
  },
  {
    id: 'knee-r',
    label: 'R Knee',
    name: 'Right Knee Joint (ACL / Meniscus)',
    pos: [-0.7, -1.5, 0.1],
    camPos: [-0.6, -1.5, 3.0],
    condition: 'ACL Reconstruction, Meniscus Repair & Dynamic Valgus Correction',
    metrics: {
      m1Label: 'QUAD FORCE',
      m1Val: '485 N·m',
      m2Label: 'HAM/QUAD RATIO',
      m2Val: '0.68',
      m3Label: 'DYNAMIC VALGUS',
      m3Val: '3.1°',
    },
  },
  {
    id: 'ankle-r',
    label: 'R Ankle',
    name: 'Right Ankle & Achilles Complex',
    pos: [-0.7, -2.8, 0],
    camPos: [-0.6, -2.7, 3.0],
    condition: 'Achilles Tendinopathy Heavy Loading & Inversion Sprain Stability',
    metrics: {
      m1Label: 'DORSIFLEXION',
      m1Val: '38°',
      m2Label: 'PEAK GRF',
      m2Val: '2.4 BW',
      m3Label: 'TIBIAL ROTATION',
      m3Val: 'Normal',
    },
  },
];

export default function KineticModel3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeJoint, setActiveJoint] = useState<JointHotspot>(HOTSPOTS[0]); // Default to Overview (Full Body)
  const activeJointRef = useRef<JointHotspot>(HOTSPOTS[0]);

  const selectJoint = (hotspot: JointHotspot) => {
    setActiveJoint(hotspot);
    activeJointRef.current = hotspot;
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 560;

    const getOverviewDist = (w: number) => (w < 640 ? 11.8 : 10.4);

    // 1. Scene & Camera with safe initial overview framing
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    const initialZ = getOverviewDist(width);
    camera.position.set(0, -0.1, initialZ);
    camera.lookAt(0, -0.1, 0);

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 3. Kinetic Human Biomechanical Skeleton Group
    const bodyGroup = new THREE.Group();
    scene.add(bodyGroup);

    // Materials
    const jointMaterial = new THREE.MeshBasicMaterial({
      color: 0x0f766e,
    });

    const boneLineMaterial = new THREE.LineBasicMaterial({
      color: 0x0284c7,
      transparent: true,
      opacity: 0.75,
      linewidth: 2,
    });

    const glowRingMaterial = new THREE.MeshBasicMaterial({
      color: 0x0d9488,
      transparent: true,
      opacity: 0.55,
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
      spineLow: new THREE.Vector3(0, 0.4, 0),
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

    // Kinetic Rib Rings
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

    // Clinical Particle Cloud
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

    // Clean Medical Ground Grid
    const grid = new THREE.GridHelper(8, 16, 0x0d9488, 0xcbd5e1);
    grid.position.y = -3.2;
    grid.material.opacity = 0.35;
    grid.material.transparent = true;
    scene.add(grid);

    // 4. Glowing 3D Target Reticle for Joint Zoom
    const reticleGroup = new THREE.Group();
    const ring1Geo = new THREE.RingGeometry(0.22, 0.25, 32);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x0d9488,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
    });
    const reticleRing1 = new THREE.Mesh(ring1Geo, ring1Mat);
    reticleGroup.add(reticleRing1);

    const ring2Geo = new THREE.RingGeometry(0.12, 0.14, 24);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x0284c7,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.75,
    });
    const reticleRing2 = new THREE.Mesh(ring2Geo, ring2Mat);
    reticleGroup.add(reticleRing2);

    bodyGroup.add(reticleGroup);
    reticleGroup.visible = false;

    // 5. Invisible Hit Spheres for Direct 3D Raycast Clicking on Joints
    const hitSpheres: THREE.Mesh[] = [];
    const hitGeo = new THREE.SphereGeometry(0.32, 12, 12);
    const hitMat = new THREE.MeshBasicMaterial({ visible: false });

    HOTSPOTS.filter((h) => h.id !== 'overview').forEach((h) => {
      const hitMesh = new THREE.Mesh(hitGeo, hitMat);
      hitMesh.position.set(h.pos[0], h.pos[1], h.pos[2]);
      hitMesh.userData = { hotspotId: h.id };
      bodyGroup.add(hitMesh);
      hitSpheres.push(hitMesh);
    });

    // 6. Interactive Mouse & Scroll
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

    // Direct Raycast Click on 3D Joints
    const raycaster = new THREE.Raycaster();
    const mouseVec = new THREE.Vector2();

    const handleCanvasClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseVec.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseVec.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouseVec, camera);

      const intersects = raycaster.intersectObjects(hitSpheres);
      if (intersects.length > 0) {
        const hitId = intersects[0].object.userData.hotspotId;
        const target = HOTSPOTS.find((h) => h.id === hitId);
        if (target) {
          selectJoint(target);
        }
      }
    };

    const handleCanvasPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseVec.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseVec.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouseVec, camera);
      const intersects = raycaster.intersectObjects(hitSpheres);
      container.style.cursor = intersects.length > 0 ? 'pointer' : 'default';
    };

    container.addEventListener('click', handleCanvasClick);
    container.addEventListener('mousemove', handleCanvasPointerMove);

    // Scroll-Driven 3D Interaction Listener
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = Math.min(Math.max(scrollY / (docHeight || 1), 0), 1);

      targetRotationY = scrollProgress * Math.PI * 3;
      targetRotationX = Math.sin(scrollProgress * Math.PI * 2) * 0.25;
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

    // 7. Dynamic Camera & Target Lerp Vectors
    const targetCamPos = new THREE.Vector3(0, -0.1, initialZ);
    const targetLookAt = new THREE.Vector3(0, -0.1, 0);
    const currentCamPos = targetCamPos.clone();
    const currentLookAt = targetLookAt.clone();

    // 8. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      const currentTarget = activeJointRef.current;
      const isOverview = currentTarget.id === 'overview';

      if (isOverview) {
        const ovDist = getOverviewDist(container.clientWidth);
        targetCamPos.set(0, -0.1, ovDist);
        targetLookAt.set(0, -0.1, 0);

        bodyGroup.rotation.y += (targetRotationY + mouseX - bodyGroup.rotation.y) * 0.05;
        bodyGroup.rotation.x += (targetRotationX - mouseY - bodyGroup.rotation.x) * 0.05;
        bodyGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.04;
        reticleGroup.visible = false;
      } else {
        // Zoom in to specific joint position
        targetCamPos.set(currentTarget.camPos[0], currentTarget.camPos[1], currentTarget.camPos[2]);
        targetLookAt.set(currentTarget.pos[0], currentTarget.pos[1], currentTarget.pos[2]);

        // Keep body aligned towards camera with subtle parallax
        bodyGroup.rotation.y += (0 + mouseX * 0.25 - bodyGroup.rotation.y) * 0.06;
        bodyGroup.rotation.x += (0 - mouseY * 0.25 - bodyGroup.rotation.x) * 0.06;
        bodyGroup.position.y = 0;

        // Position and pulse reticle around active joint
        reticleGroup.visible = true;
        reticleGroup.position.set(currentTarget.pos[0], currentTarget.pos[1], currentTarget.pos[2]);
        reticleRing1.rotation.z = elapsedTime * 2;
        reticleRing2.rotation.z = -elapsedTime * 2.5;
        const pulse = 1 + Math.sin(elapsedTime * 5) * 0.08;
        reticleGroup.scale.set(pulse, pulse, pulse);
      }

      // Smooth camera interpolation
      currentCamPos.lerp(targetCamPos, 0.06);
      camera.position.copy(currentCamPos);

      currentLookAt.lerp(targetLookAt, 0.06);
      camera.lookAt(currentLookAt);

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
      container.removeEventListener('click', handleCanvasClick);
      container.removeEventListener('mousemove', handleCanvasPointerMove);
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
          <span>{activeJoint.metrics.m1Label}: <strong className="text-slate-900">{activeJoint.metrics.m1Val}</strong></span>
          <span>{activeJoint.metrics.m2Label}: <strong className="text-teal-700">{activeJoint.metrics.m2Val}</strong></span>
          <span>{activeJoint.metrics.m3Label}: <strong className="text-sky-700">{activeJoint.metrics.m3Val}</strong></span>
        </div>
      </div>

      {/* The WebGL 3D Canvas Mounting Container */}
      <div 
        ref={mountRef} 
        className="w-full h-[480px] sm:h-[580px] lg:h-[640px] relative z-10"
        title="Click joints to zoom in • Scroll to rotate • Move mouse to tilt in 3D"
      />

      {/* Interactive Hotspot Zone Selector (Bottom Controls) */}
      <div className="absolute bottom-4 left-4 right-4 z-20 pointer-events-auto">
        <div className="bg-white/95 backdrop-blur-xl p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          
          <div className="space-y-1 max-w-lg">
            <div className="flex items-center gap-2">
              <span className="badge-medical text-[10px] font-mono px-2 py-0.5 rounded uppercase">
                {activeJoint.id === 'overview' ? 'Global Analysis' : 'Target Joint Selected'}
              </span>
              <strong className="text-sm font-bold text-slate-900 tracking-tight">{activeJoint.name}</strong>
            </div>
            <p className="text-xs text-slate-600">
              {activeJoint.condition} — Dynamic clinical kinematic capture.
            </p>
          </div>

          {/* Hotspot Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {HOTSPOTS.map((hotspot) => (
              <button
                key={hotspot.id}
                onClick={() => selectJoint(hotspot)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition border cursor-pointer ${
                  activeJoint.id === hotspot.id
                    ? 'bg-teal-600 text-white font-bold border-teal-600 shadow-sm'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:border-teal-500 hover:text-teal-900'
                }`}
              >
                {hotspot.label}
              </button>
            ))}
            <a
              href="/services"
              className="px-3 py-1.5 rounded-xl text-xs font-mono bg-slate-100 text-slate-800 hover:bg-slate-200 transition border border-slate-200 font-semibold"
            >
              All Protocols →
            </a>
          </div>

        </div>
      </div>

      {/* Floating Scroll / Zoom State Hint */}
      <div className="absolute top-1/2 right-4 -translate-y-1/2 hidden lg:flex flex-col items-center gap-2 text-[10px] font-mono text-slate-400 pointer-events-none z-10">
        <span className="rotate-90 origin-center tracking-widest uppercase font-semibold">
          {activeJoint.id === 'overview' ? 'Scroll / Tilt 3D' : 'Zoom Active'}
        </span>
        <div className="w-0.5 h-12 bg-gradient-to-b from-teal-500 to-transparent mt-8 animate-pulse"></div>
      </div>

    </div>
  );
}
