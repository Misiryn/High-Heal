import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

export type ModelMode = 'athletic' | 'skeletal' | 'muscular';

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
  bilateralSpan?: number;
  condition: string;
  metrics: {
    athletic: JointMetric;
    skeletal: JointMetric;
    muscular: JointMetric;
  };
}

const HOTSPOTS: JointHotspot[] = [
  {
    id: 'overview',
    label: 'Full Body',
    name: 'Full Kinetic Biomechanical Chain',
    pos: [0, 0, 0],
    camPos: [0, 0, 10.4],
    condition: 'Global Musculoskeletal Kinetic Alignment & Force Transmission',
    metrics: {
      athletic: {
        m1Label: 'GLOBAL TORQUE',
        m1Val: '412 N·m',
        m2Label: 'LSI SYMMETRY',
        m2Val: '96.4%',
        m3Label: 'VALGUS ANGLE',
        m3Val: '2.8°',
      },
      skeletal: {
        m1Label: 'AXIAL LOAD',
        m1Val: '1.85 kN',
        m2Label: 'POSTURAL ALIGN',
        m2Val: '0.4° Deviation',
        m3Label: 'JOINT SPACING',
        m3Val: 'Normal Symmetrical',
      },
      muscular: {
        m1Label: 'MYOFASCIAL TENSION',
        m1Val: '124 kPa',
        m2Label: 'HAM/QUAD RATIO',
        m2Val: '0.68 (Ideal)',
        m3Label: 'KINETIC TRANSFER',
        m3Val: '94.2% Efficiency',
      },
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
      athletic: {
        m1Label: 'CRANIAL ANGLE',
        m1Val: '52.4°',
        m2Label: 'ROTATION VELOCITY',
        m2Val: '420°/s',
        m3Label: 'NEURAL TENSION',
        m3Val: 'Normal',
      },
      skeletal: {
        m1Label: 'C2-C7 LORDOSIS',
        m1Val: '32° Normal',
        m2Label: 'FORAMINAL GAP',
        m2Val: '4.2 mm',
        m3Label: 'FACET IMPINGE',
        m3Val: 'None Detected',
      },
      muscular: {
        m1Label: 'TRAPEZIUS TONE',
        m1Val: '+18% Hypertonic',
        m2Label: 'LEVATOR SCAPULAE',
        m2Val: '85 N Strain',
        m3Label: 'SCM SYMMETRY',
        m3Val: '98% Balanced',
      },
    },
  },
  {
    id: 'shoulders',
    label: 'Shoulders',
    name: 'Shoulders (Bilateral Rotator Cuff & Scapula)',
    pos: [0, 1.75, 0],
    camPos: [0, 1.75, 3.6],
    bilateralSpan: 1.15,
    condition: 'Rotator Cuff Tear, Impingement & Bilateral Scapular Rhythm',
    metrics: {
      athletic: {
        m1Label: 'SCAPULAR RHYTHM',
        m1Val: '2.1 : 1',
        m2Label: 'BILATERAL ROM',
        m2Val: '175° Normal',
        m3Label: 'PEAK VELOCITY',
        m3Val: '840°/s',
      },
      skeletal: {
        m1Label: 'SUBACROMIAL GAP',
        m1Val: '8.4 mm',
        m2Label: 'GLENOID TILT',
        m2Val: '4° Superior',
        m3Label: 'LABRAL INTEGRITY',
        m3Val: 'Intact Grade 0',
      },
      muscular: {
        m1Label: 'SUPRASPINATUS',
        m1Val: '94% Recruitment',
        m2Label: 'INFRASPINATUS',
        m2Val: '88% EMG Peak',
        m3Label: 'SERRATUS ANTERIOR',
        m3Val: '91% Active Stabil.',
      },
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
      athletic: {
        m1Label: 'AXIAL LOAD',
        m1Val: '1.8 kN',
        m2Label: 'PELVIC TILT',
        m2Val: '11.2°',
        m3Label: 'CORE STIFFNESS',
        m3Val: 'Optimal 94%',
      },
      skeletal: {
        m1Label: 'L4-L5 DISC HEIGHT',
        m1Val: '10.2 mm',
        m2Label: 'LUMBAR LORDOSIS',
        m2Val: '44° Normal',
        m3Label: 'CANAL CLEARANCE',
        m3Val: 'Symmetric',
      },
      muscular: {
        m1Label: 'MULTIFIDUS FIRING',
        m1Val: '94% Symmetric',
        m2Label: 'TRANSVERSE ABD.',
        m2Val: '96% Firing Rate',
        m3Label: 'ERECTOR SPINAE',
        m3Val: '1.04 Ratio',
      },
    },
  },
  {
    id: 'hips',
    label: 'Hips',
    name: 'Hips & Pelvic Complex (Bilateral)',
    pos: [0, -0.25, 0],
    camPos: [0, -0.25, 3.4],
    bilateralSpan: 0.55,
    condition: 'Adductor Strain, FAI Stability & Bilateral Gluteal Firing Mechanics',
    metrics: {
      athletic: {
        m1Label: 'HIP ABDUCTION',
        m1Val: '44°',
        m2Label: 'GLUTE FIRING',
        m2Val: '92%',
        m3Label: 'TRIPLE EXTENSION',
        m3Val: '340 N·m',
      },
      skeletal: {
        m1Label: 'ALPHA ANGLE',
        m1Val: '48° Normal',
        m2Label: 'ACETABULAR COVER',
        m2Val: '86%',
        m3Label: 'JOINT SPACE',
        m3Val: '4.1 mm',
      },
      muscular: {
        m1Label: 'GLUTEUS MEDIUS',
        m1Val: '92% Force Output',
        m2Label: 'ILIOPSOAS TENSION',
        m2Val: 'Normal Flexible',
        m3Label: 'ADDUCTOR RATIO',
        m3Val: '0.94 Balanced',
      },
    },
  },
  {
    id: 'knees',
    label: 'Knees',
    name: 'Knees (Bilateral ACL, Meniscus & Patella)',
    pos: [0, -1.5, 0.05],
    camPos: [0, -1.5, 3.3],
    bilateralSpan: 0.65,
    condition: 'ACL Reconstruction, Meniscus Repair & Bilateral Valgus Correction',
    metrics: {
      athletic: {
        m1Label: 'QUAD FORCE',
        m1Val: '485 N·m',
        m2Label: 'DYNAMIC VALGUS',
        m2Val: '2.8° Corrected',
        m3Label: 'LANDING IMPACT',
        m3Val: '2.9 BW (Safe)',
      },
      skeletal: {
        m1Label: 'TIBIOFEMORAL ANG.',
        m1Val: '5.6° Normal',
        m2Label: 'INSALL-SALVATI',
        m2Val: '1.02 Centered',
        m3Label: 'CARTILAGE HEALTH',
        m3Val: 'Grade 0 Clear',
      },
      muscular: {
        m1Label: 'VMO RECRUITMENT',
        m1Val: '98% Synchronized',
        m2Label: 'HAM/QUAD BALANCE',
        m2Val: '0.68',
        m3Label: 'POPLITEUS STABILITY',
        m3Val: 'High Dynamic',
      },
    },
  },
  {
    id: 'ankles',
    label: 'Ankles',
    name: 'Ankles & Achilles Complex (Bilateral)',
    pos: [0, -2.75, 0],
    camPos: [0, -2.75, 3.1],
    bilateralSpan: 0.65,
    condition: 'Achilles Tendinopathy Heavy Loading & Inversion Sprain Stability',
    metrics: {
      athletic: {
        m1Label: 'DORSIFLEXION',
        m1Val: '38° WBLT',
        m2Label: 'PEAK GRF',
        m2Val: '2.4 BW',
        m3Label: 'PLANTAR POWER',
        m3Val: '1.2 kW',
      },
      skeletal: {
        m1Label: 'TALOCRURAL ANGLE',
        m1Val: '82° Anatomical',
        m2Label: 'MORTISE ALIGN',
        m2Val: 'Centered Normal',
        m3Label: 'CALCANEAL PITCH',
        m3Val: '24° Optimal',
      },
      muscular: {
        m1Label: 'ACHILLES STIFFNESS',
        m1Val: '48 N/mm',
        m2Label: 'SOLEUS REACTION',
        m2Val: '42 ms (Fast)',
        m3Label: 'PERONEAL TONE',
        m3Val: '95% Reflexive',
      },
    },
  },
];

// Helper: Determine if a bone node matches the active joint (bilateral)
function isBoneMatchingJoint(boneName: string, jointId: string): boolean {
  const n = boneName.toLowerCase();
  switch (jointId) {
    case 'lumbar':
      return n.includes('lumbar') || n.includes('l1') || n.includes('l2') || n.includes('l3') || n.includes('l4') || n.includes('l5') || n.includes('sacrum') || n.includes('coccyx');
    case 'cervical':
      return n.includes('cervical') || n.includes('atlas') || n.includes('axis') || n.includes('c1') || n.includes('c2') || n.includes('c3') || n.includes('c4') || n.includes('c5') || n.includes('c6') || n.includes('c7');
    case 'shoulders':
      return n.includes('clavicle') || n.includes('scapula') || n.includes('humerus');
    case 'hips':
      return n.includes('hip') || n.includes('pelvis') || n.includes('ilium') || n.includes('ischium') || n.includes('pubis') || (n.includes('femur') && !n.includes('distal') && !n.includes('condyle'));
    case 'knees':
      return n.includes('patella') || n.includes('tibia') || n.includes('fibula') || n.includes('femur');
    case 'ankles':
      return n.includes('talus') || n.includes('calcaneus') || n.includes('navicular') || n.includes('cuneiform') || n.includes('cuboid') || n.includes('metatarsal') || (n.includes('tibia') && n.includes('distal'));
    default:
      return false;
  }
}

// Helper: Determine if an anatomical muscle matches the active joint (bilateral)
function isMuscleMatchingJoint(muscleName: string, jointId: string): boolean {
  const n = muscleName.toLowerCase();
  switch (jointId) {
    case 'lumbar':
      return /multifidus|quadratus lumborum|latissimus|psoas|rectus abdominis|abdominal oblique|erector spinae/i.test(n);
    case 'cervical':
      return /trapezius|multifidus colli|sternocleido|splenius|levator scapulae|scalen/i.test(n);
    case 'shoulders':
      return /deltoid|supraspinatus|infraspinatus|subscapularis|teres|pectoralis|biceps brachii/i.test(n);
    case 'hips':
      return /gluteus|piriformis|tensor fasciae|iliacus|obturator internus|gemellus/i.test(n);
    case 'knees':
      return /rectus femoris|vastus|biceps femoris|semitendinosus|semimembranosus|popliteus/i.test(n);
    case 'ankles':
      return /tibialis|soleus|fibularis|gastrocnemius/i.test(n);
    default:
      return false;
  }
}

export default function KineticModel3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [modelMode, setModelMode] = useState<ModelMode>('athletic');
  const modelModeRef = useRef<ModelMode>('athletic');
  const [activeJoint, setActiveJoint] = useState<JointHotspot>(HOTSPOTS[0]);
  const activeJointRef = useRef<JointHotspot>(HOTSPOTS[0]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const selectJoint = (hotspot: JointHotspot) => {
    setActiveJoint(hotspot);
    activeJointRef.current = hotspot;
  };

  const changeMode = (mode: ModelMode) => {
    setModelMode(mode);
    modelModeRef.current = mode;
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const isMobileInitial = width < 768;
    const height = container.clientHeight || (isMobileInitial ? 400 : 620);

    const getOverviewDist = (w: number) => (w < 768 ? 9.2 : 10.4);

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    const initialZ = getOverviewDist(width);
    camera.position.set(0, 0.0, initialZ);
    camera.lookAt(0, 0.0, 0);

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 3. Clinical Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(5, 8, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x0284c7, 1.4);
    fillLight.position.set(-5, 3, -4);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x0d9488, 2.2);
    rimLight.position.set(0, -4, -6);
    scene.add(rimLight);

    // 4. Main Root Group (rotated by user interaction)
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Mode-specific groups
    const athleticGroup = new THREE.Group();
    const skeletalGroup = new THREE.Group();
    const muscularGroup = new THREE.Group();

    rootGroup.add(athleticGroup);
    rootGroup.add(skeletalGroup);
    rootGroup.add(muscularGroup);

    // Dynamic Materials for Highlighting & Slow Pulse
    const defaultBoneMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.6,
      metalness: 0.05,
      side: THREE.DoubleSide,
    });

    const activeBoneHighlightMat = new THREE.MeshStandardMaterial({
      color: 0x0d9488, // Primary Teal
      emissive: 0x14b8a6,
      emissiveIntensity: 1.2,
      roughness: 0.25,
      metalness: 0.15,
      side: THREE.DoubleSide,
    });

    // Authentic Anatomical Muscular Materials
    const defaultMuscleMat = new THREE.MeshStandardMaterial({
      color: 0x881337, // Deep anatomical myoglobin crimson
      roughness: 0.55,
      metalness: 0.08,
      side: THREE.DoubleSide,
    });

    const defaultConnectiveMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0, // Fibrous fascia/bursae
      roughness: 0.45,
      metalness: 0.1,
      side: THREE.DoubleSide,
    });

    const activeMuscleHighlightMat = new THREE.MeshStandardMaterial({
      color: 0x0d9488, // Primary Teal
      emissive: 0x14b8a6,
      emissiveIntensity: 1.2,
      roughness: 0.25,
      metalness: 0.15,
      side: THREE.DoubleSide,
    });

    // Athletic Biomechanical Mannequin Material (Solid Sleek Slate with Medical Teal Rim)
    const athleticSilhouetteMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b, // Deep athletic slate
      emissive: 0x0d9488, // Medical teal Fresnel rim glow
      emissiveIntensity: 0.22,
      roughness: 0.35,
      metalness: 0.2,
      side: THREE.DoubleSide,
    });

    const defaultJointRingMat = new THREE.MeshBasicMaterial({
      color: 0x0d9488,
      transparent: true,
      opacity: 0.45,
      side: THREE.DoubleSide,
    });

    const activeJointRingMat = new THREE.MeshBasicMaterial({
      color: 0x14b8a6,
      transparent: true,
      opacity: 0.95,
      side: THREE.DoubleSide,
    });

    // Helper: Normalize any 3D model to exact human scale & bounding box (height 5.7, bottom at -2.9)
    const fitModelToFrame = (object: THREE.Object3D, targetHeight = 5.7, targetBottom = -2.9) => {
      const box = new THREE.Box3().setFromObject(object);
      const size = new THREE.Vector3();
      box.getSize(size);
      if (size.y > 0) {
        const s = targetHeight / size.y;
        object.scale.set(s, s, s);
        const scaledBox = new THREE.Box3().setFromObject(object);
        object.position.y = targetBottom - scaledBox.min.y;
        const center = scaledBox.getCenter(new THREE.Vector3());
        object.position.x = -center.x;
        object.position.z = -center.z;
      }
    };

    // Loaders
    const gltfLoader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/');
    gltfLoader.setDRACOLoader(dracoLoader);

    // Meshes and rings tracking for highlighting
    const athleticAccentRings: { id: string; mesh: THREE.Mesh }[] = [];
    const skeletalMeshes: THREE.Mesh[] = [];
    const muscularMeshes: { mesh: THREE.Mesh; isMuscle: boolean; name: string }[] = [];
    const kineticTubes: { id: string; mesh: THREE.Mesh }[] = [];

    // =========================================================================
    // BUILD 1: ATHLETIC BIOMECHANICAL SHELL & KINETIC RINGS
    // =========================================================================
    gltfLoader.load(
      '/models/human-surface.glb',
      (gltf) => {
        const model = gltf.scene;
        fitModelToFrame(model, 5.7, -2.9);

        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.material = athleticSilhouetteMat;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
          }
        });

        athleticGroup.add(model);
        setIsLoading(false);
      },
      undefined,
      (err) => {
        console.warn('Athletic surface GLB fallback:', err);
        setIsLoading(false);
      }
    );

    // Accent Articulation Rings & Biomechanical Nodes for Athletic Model
    const addAthleticJointRing = (id: string, x: number, y: number, z: number, r: number) => {
      const ringGeo = new THREE.RingGeometry(r, r + 0.05, 32);
      const ring = new THREE.Mesh(ringGeo, defaultJointRingMat.clone());
      ring.position.set(x, y, z);
      ring.rotation.x = Math.PI / 2;
      athleticGroup.add(ring);
      athleticAccentRings.push({ id, mesh: ring });
    };

    addAthleticJointRing('cervical', 0, 2.3, 0, 0.22);
    addAthleticJointRing('shoulders', -1.15, 1.75, 0, 0.22);
    addAthleticJointRing('shoulders', 1.15, 1.75, 0, 0.22);
    addAthleticJointRing('lumbar', 0, 0.4, 0, 0.38);
    addAthleticJointRing('hips', -0.55, -0.25, 0, 0.24);
    addAthleticJointRing('hips', 0.55, -0.25, 0, 0.24);
    addAthleticJointRing('knees', -0.65, -1.5, 0.05, 0.22);
    addAthleticJointRing('knees', 0.65, -1.5, 0.05, 0.22);
    addAthleticJointRing('ankles', -0.65, -2.75, 0, 0.2);
    addAthleticJointRing('ankles', 0.65, -2.75, 0, 0.2);

    // Kinetic Articulation Center Nodes on Athletic Model (mapped to joints)
    const athleticJointNodeGeo = new THREE.SphereGeometry(0.065, 16, 16);
    const athleticJointNodeMat = new THREE.MeshStandardMaterial({
      color: 0x0d9488,
      emissive: 0x14b8a6,
      emissiveIntensity: 0.9,
      roughness: 0.2,
      metalness: 0.3,
    });
    const athleticJointNodes: { id: string; mesh: THREE.Mesh }[] = [];
    const addAthleticJointNode = (id: string, jx: number, jy: number, jz: number) => {
      const nodeMesh = new THREE.Mesh(athleticJointNodeGeo, athleticJointNodeMat.clone());
      nodeMesh.position.set(jx, jy, jz);
      athleticGroup.add(nodeMesh);
      athleticJointNodes.push({ id, mesh: nodeMesh });
    };

    addAthleticJointNode('cervical', 0, 2.3, 0);
    addAthleticJointNode('shoulders', -1.15, 1.75, 0);
    addAthleticJointNode('shoulders', 1.15, 1.75, 0);
    addAthleticJointNode('elbows', -1.35, 0.9, -0.05);
    addAthleticJointNode('elbows', 1.35, 0.9, -0.05);
    addAthleticJointNode('wrists', -1.4, 0.05, 0);
    addAthleticJointNode('wrists', 1.4, 0.05, 0);
    addAthleticJointNode('lumbar', 0, 0.4, 0);
    addAthleticJointNode('hips', -0.55, -0.25, 0);
    addAthleticJointNode('hips', 0.55, -0.25, 0);
    addAthleticJointNode('knees', -0.65, -1.5, 0.05);
    addAthleticJointNode('knees', 0.65, -1.5, 0.05);
    addAthleticJointNode('ankles', -0.65, -2.75, 0);
    addAthleticJointNode('ankles', 0.65, -2.75, 0);

    // =========================================================================
    // BUILD 2: SKELETAL ANATOMY (FULL BILATERAL MEDICAL SKELETON)
    // =========================================================================
    gltfLoader.load(
      '/models/skeletal-anatomy.glb',
      (gltf) => {
        const model = gltf.scene;

        // Mirror Bones_right and Cartilages_right across X=0 for bilateral symmetry
        const bonesRight = model.getObjectByName('Bones_right');
        if (bonesRight) {
          const bonesLeft = bonesRight.clone(true);
          bonesLeft.name = 'Bones_left';
          bonesLeft.scale.x = -1;
          model.add(bonesLeft);
        }

        const cartRight = model.getObjectByName('Cartilages_right');
        if (cartRight) {
          const cartLeft = cartRight.clone(true);
          cartLeft.name = 'Cartilages_left';
          cartLeft.scale.x = -1;
          model.add(cartLeft);
        }

        fitModelToFrame(model, 5.7, -2.9);

        // Populate Skeletal Anatomy Tab
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.material = defaultBoneMat;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            skeletalMeshes.push(mesh);
          }
        });
        skeletalGroup.add(model);
      },
      undefined,
      (err) => {
        console.warn('Skeletal GLB load error:', err);
      }
    );

    // =========================================================================
    // BUILD 3: MUSCULAR ANATOMY (AUTHENTIC 440-MUSCLE ANATOMICAL SYSTEM)
    // =========================================================================
    gltfLoader.load(
      '/models/body.glb',
      (gltf) => {
        const model = gltf.scene;
        fitModelToFrame(model, 5.7, -2.9);

        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            const isMuscle = child.userData?.type === 'muscle' || /muscle|rectus|oblique|deltoid|trapezius|gluteus|vastus|biceps|triceps|pectoralis|multifidus|psoas|gastrocnemius|soleus|tibialis/i.test(mesh.name);
            const isBone = child.userData?.type === 'bone' || /bone|spine|vertebra|femur|tibia|fibula|scapula|clavicle|pelvis|humerus|radius|ulna/i.test(mesh.name);

            if (isMuscle) {
              mesh.material = defaultMuscleMat;
              muscularMeshes.push({ mesh, isMuscle: true, name: mesh.name });
            } else if (isBone) {
              mesh.material = defaultBoneMat;
              muscularMeshes.push({ mesh, isMuscle: false, name: mesh.name });
            } else {
              mesh.material = defaultConnectiveMat;
              muscularMeshes.push({ mesh, isMuscle: false, name: mesh.name });
            }
          }
        });

        muscularGroup.add(model);
      },
      undefined,
      (err) => {
        console.warn('Muscular GLB load error:', err);
      }
    );

    // Kinetic Myofascial Force Vector Lines
    const createKineticLine = (id: string, points: THREE.Vector3[], colorHex: number) => {
      const curve = new THREE.CatmullRomCurve3(points);
      const tubeGeo = new THREE.TubeGeometry(curve, 32, 0.04, 8, false);
      const tubeMat = new THREE.MeshBasicMaterial({
        color: colorHex,
        transparent: true,
        opacity: 0.85,
      });
      const tube = new THREE.Mesh(tubeGeo, tubeMat);
      muscularGroup.add(tube);
      kineticTubes.push({ id, mesh: tube });
    };

    // Bilateral Kinetic Chain Lines mapped to Hotspots
    createKineticLine('lumbar', [
      new THREE.Vector3(-0.5, -0.2, 0.15),
      new THREE.Vector3(0, 0.4, 0.18),
      new THREE.Vector3(0.5, -0.2, 0.15),
    ], 0x0d9488); // Lumbar pelvic corset

    createKineticLine('cervical', [
      new THREE.Vector3(0, 2.7, 0.1),
      new THREE.Vector3(0, 2.3, 0.14),
      new THREE.Vector3(-0.6, 1.8, 0.1),
      new THREE.Vector3(0.6, 1.8, 0.1),
    ], 0x0d9488); // Cervical trapezius sling

    // Bilateral Shoulders Rotator Cuff Chain
    createKineticLine('shoulders', [
      new THREE.Vector3(0, 1.8, 0.12),
      new THREE.Vector3(-0.8, 1.85, 0.15),
      new THREE.Vector3(-1.3, 1.8, 0.1),
    ], 0x06b6d4);
    createKineticLine('shoulders', [
      new THREE.Vector3(0, 1.8, 0.12),
      new THREE.Vector3(0.8, 1.85, 0.15),
      new THREE.Vector3(1.3, 1.8, 0.1),
    ], 0x06b6d4);

    // Bilateral Knees Quad-Patellar Chain
    createKineticLine('knees', [
      new THREE.Vector3(-0.6, -0.2, 0.15),
      new THREE.Vector3(-0.65, -1.5, 0.2),
      new THREE.Vector3(-0.65, -2.8, 0.15),
    ], 0x0d9488);
    createKineticLine('knees', [
      new THREE.Vector3(0.6, -0.2, 0.15),
      new THREE.Vector3(0.65, -1.5, 0.2),
      new THREE.Vector3(0.65, -2.8, 0.15),
    ], 0x0d9488);

    // Bilateral Hips Gluteus-Pelvis Chain
    createKineticLine('hips', [
      new THREE.Vector3(0, 0.2, 0.12),
      new THREE.Vector3(-0.6, -0.2, 0.18),
      new THREE.Vector3(-0.65, -0.9, 0.15),
    ], 0xf59e0b);
    createKineticLine('hips', [
      new THREE.Vector3(0, 0.2, 0.12),
      new THREE.Vector3(0.6, -0.2, 0.18),
      new THREE.Vector3(0.65, -0.9, 0.15),
    ], 0xf59e0b);

    // Bilateral Ankles Achilles-Plantar Chain
    createKineticLine('ankles', [
      new THREE.Vector3(-0.65, -1.8, 0.12),
      new THREE.Vector3(-0.65, -2.75, 0.18),
      new THREE.Vector3(-0.65, -2.9, 0.35),
    ], 0x10b981);
    createKineticLine('ankles', [
      new THREE.Vector3(0.65, -1.8, 0.12),
      new THREE.Vector3(0.65, -2.75, 0.18),
      new THREE.Vector3(0.65, -2.9, 0.35),
    ], 0x10b981);

    // 5. Clinical Floor Force-Grid
    const grid = new THREE.GridHelper(8, 16, 0x0d9488, 0xcbd5e1);
    grid.position.y = -3.2;
    grid.material.opacity = 0.35;
    grid.material.transparent = true;
    scene.add(grid);

    // 6. Glowing Target Reticles for Joint Focusing (Bilateral Pair)
    const createReticle = () => {
      const g = new THREE.Group();
      const ring1 = new THREE.Mesh(
        new THREE.RingGeometry(0.24, 0.27, 32),
        new THREE.MeshBasicMaterial({ color: 0x0d9488, side: THREE.DoubleSide, transparent: true, opacity: 0.85 })
      );
      const ring2 = new THREE.Mesh(
        new THREE.RingGeometry(0.14, 0.16, 24),
        new THREE.MeshBasicMaterial({ color: 0x0284c7, side: THREE.DoubleSide, transparent: true, opacity: 0.75 })
      );
      g.add(ring1);
      g.add(ring2);
      g.visible = false;
      rootGroup.add(g);
      return { group: g, ring1, ring2 };
    };

    const reticleRight = createReticle();
    const reticleLeft = createReticle();

    // 7. Clickable Raycast Hit Targets (Bilateral for Pairs)
    const hitSpheres: THREE.Mesh[] = [];
    const hitGeo = new THREE.SphereGeometry(0.42, 12, 12);
    const hitMat = new THREE.MeshBasicMaterial({ visible: false });

    HOTSPOTS.filter((h) => h.id !== 'overview').forEach((h) => {
      const span = h.bilateralSpan || 0;
      if (span > 0) {
        // Right side hit target
        const hitR = new THREE.Mesh(hitGeo, hitMat);
        hitR.position.set(-span, h.pos[1], h.pos[2]);
        hitR.userData = { hotspotId: h.id };
        rootGroup.add(hitR);
        hitSpheres.push(hitR);

        // Left side hit target
        const hitL = new THREE.Mesh(hitGeo, hitMat);
        hitL.position.set(span, h.pos[1], h.pos[2]);
        hitL.userData = { hotspotId: h.id };
        rootGroup.add(hitL);
        hitSpheres.push(hitL);
      } else {
        const hitMesh = new THREE.Mesh(hitGeo, hitMat);
        hitMesh.position.set(h.pos[0], h.pos[1], h.pos[2]);
        hitMesh.userData = { hotspotId: h.id };
        rootGroup.add(hitMesh);
        hitSpheres.push(hitMesh);
      }
    });

    // 8. Interactive Click-and-Drag Rotation & Touch Controls
    let isPointerDown = false;
    let pointerStartX = 0;
    let pointerStartY = 0;
    let totalMoved = 0;

    let userRotY = 0;
    let userRotX = 0;
    let targetUserRotY = 0;
    let targetUserRotX = 0;

    let mouseX = 0;
    let mouseY = 0;
    let scrollRotY = 0;
    let scrollRotX = 0;

    const raycaster = new THREE.Raycaster();
    const mouseVec = new THREE.Vector2();

    const checkRaycastHit = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      mouseVec.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouseVec.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouseVec, camera);
      const intersects = raycaster.intersectObjects(hitSpheres);
      if (intersects.length > 0) {
        const hitId = intersects[0].object.userData.hotspotId;
        const target = HOTSPOTS.find((h) => h.id === hitId);
        if (target) {
          selectJoint(target);
          return true;
        }
      }
      return false;
    };

    const handleMouseDown = (e: MouseEvent) => {
      isPointerDown = true;
      pointerStartX = e.clientX;
      pointerStartY = e.clientY;
      totalMoved = 0;
      container.style.cursor = 'grabbing';
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX = nx * 0.6;
      mouseY = ny * 0.4;

      if (!isPointerDown) {
        mouseVec.x = nx * 2;
        mouseVec.y = -ny * 2;
        raycaster.setFromCamera(mouseVec, camera);
        const intersects = raycaster.intersectObjects(hitSpheres);
        container.style.cursor = intersects.length > 0 ? 'pointer' : 'grab';
        return;
      }

      const dx = e.clientX - pointerStartX;
      const dy = e.clientY - pointerStartY;
      totalMoved += Math.abs(dx) + Math.abs(dy);
      pointerStartX = e.clientX;
      pointerStartY = e.clientY;

      targetUserRotY += dx * 0.01;
      targetUserRotX = Math.max(-0.6, Math.min(0.6, targetUserRotX + dy * 0.008));
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (!isPointerDown) return;
      isPointerDown = false;
      container.style.cursor = 'grab';

      if (totalMoved < 6) {
        checkRaycastHit(e.clientX, e.clientY);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      isPointerDown = true;
      pointerStartX = e.touches[0].clientX;
      pointerStartY = e.touches[0].clientY;
      totalMoved = 0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isPointerDown || e.touches.length !== 1) return;
      const touchX = e.touches[0].clientX;
      const touchY = e.touches[0].clientY;
      const dx = touchX - pointerStartX;
      const dy = touchY - pointerStartY;
      totalMoved += Math.abs(dx) + Math.abs(dy);
      pointerStartX = touchX;
      pointerStartY = touchY;

      if (totalMoved > 5) {
        e.preventDefault();
      }

      targetUserRotY += dx * 0.012;
      targetUserRotX = Math.max(-0.6, Math.min(0.6, targetUserRotX + dy * 0.01));
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!isPointerDown) return;
      isPointerDown = false;

      if (totalMoved < 8 && e.changedTouches.length === 1) {
        checkRaycastHit(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
      }
    };

    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      scrollRotY = scrollY * 0.0006;
      scrollRotX = Math.sin(scrollY * 0.001) * 0.04;
    };

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const isMob = w < 768;
      const h = container.clientHeight || (isMob ? 400 : 620);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    // 9. Camera Smoothing & Animation Loop
    const targetCamPos = new THREE.Vector3(0, 0, initialZ);
    const currentCamPos = new THREE.Vector3(0, 0, initialZ);
    const targetLookAt = new THREE.Vector3(0, 0, 0);
    const currentLookAt = new THREE.Vector3(0, 0, 0);

    let animationFrameId: number;
    let clock = new THREE.Clock();
    let lastHighlightedJointId = '';

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth interactive rotation damping
      userRotY += (targetUserRotY - userRotY) * 0.1;
      userRotX += (targetUserRotX - userRotX) * 0.1;

      // Mode visibility management
      const currentMode = modelModeRef.current;
      athleticGroup.visible = currentMode === 'athletic';
      skeletalGroup.visible = currentMode === 'skeletal';
      muscularGroup.visible = currentMode === 'muscular';

      // =======================================================================
      // SLOW RHYTHMIC PULSE IN PRIMARY COLOR (~2.2s per breath)
      // =======================================================================
      const slowPulse = 0.5 + 0.5 * Math.sin(elapsedTime * 2.8);
      activeBoneHighlightMat.emissiveIntensity = 0.5 + 1.4 * slowPulse;
      activeMuscleHighlightMat.emissiveIntensity = 0.5 + 1.4 * slowPulse;

      const currentTarget = activeJointRef.current;
      const currentJointId = currentTarget.id;

      // Update highlighted meshes whenever selected joint changes
      if (lastHighlightedJointId !== currentJointId) {
        lastHighlightedJointId = currentJointId;

        // 1. Skeletal Tab Meshes
        skeletalMeshes.forEach((mesh) => {
          if (currentJointId === 'overview') {
            mesh.material = defaultBoneMat;
          } else if (isBoneMatchingJoint(mesh.name, currentJointId)) {
            mesh.material = activeBoneHighlightMat;
          } else {
            mesh.material = defaultBoneMat;
          }
        });

        // 2. Muscular Tab Meshes (Authentic 440 Muscles)
        muscularMeshes.forEach(({ mesh, isMuscle, name }) => {
          if (currentJointId === 'overview') {
            mesh.material = isMuscle ? defaultMuscleMat : defaultBoneMat;
          } else if (isMuscle && isMuscleMatchingJoint(name, currentJointId)) {
            mesh.material = activeMuscleHighlightMat;
          } else if (isMuscle) {
            mesh.material = defaultMuscleMat;
          } else {
            mesh.material = defaultBoneMat;
          }
        });

      }

      // Athletic mode accent rings & joint center nodes pulsing (both Left & Right)
      if (athleticGroup.visible) {
        athleticAccentRings.forEach(({ id, mesh }) => {
          const isSelected = currentJointId === id;
          const mat = mesh.material as THREE.MeshBasicMaterial;
          if (isSelected) {
            mat.color.setHex(0x14b8a6);
            mat.opacity = 0.6 + 0.4 * slowPulse;
            const s = 1 + 0.08 * slowPulse;
            mesh.scale.set(s, s, s);
          } else {
            mat.color.setHex(0x0d9488);
            mat.opacity = currentJointId === 'overview' ? 0.35 : 0.15;
            mesh.scale.set(1, 1, 1);
          }
        });

        athleticJointNodes.forEach(({ id, mesh }) => {
          const isSelected = currentJointId === id;
          const mat = mesh.material as THREE.MeshStandardMaterial;
          if (isSelected) {
            mat.emissive.setHex(0x14b8a6);
            mat.emissiveIntensity = 1.2 + 0.8 * slowPulse;
            const s = 1.15 + 0.1 * slowPulse;
            mesh.scale.set(s, s, s);
          } else {
            mat.emissive.setHex(0x0d9488);
            mat.emissiveIntensity = currentJointId === 'overview' ? 0.9 : 0.4;
            mesh.scale.set(1, 1, 1);
          }
        });
      }

      // Muscular mode kinetic tubes pulsing (both Left & Right)
      if (muscularGroup.visible) {
        kineticTubes.forEach(({ id, mesh }) => {
          const isSelected = currentJointId === id || currentJointId === 'overview';
          const mat = mesh.material as THREE.MeshBasicMaterial;
          mat.opacity = isSelected ? 0.6 + 0.38 * slowPulse : 0.2;
        });
      }

      const isMobile = container.clientWidth < 768;

      if (currentTarget.id === 'overview') {
        const dist = getOverviewDist(container.clientWidth);
        targetCamPos.set(0, 0.0, dist);
        targetLookAt.set(0, 0.0, 0);

        rootGroup.rotation.y = userRotY + scrollRotY + mouseX;
        rootGroup.rotation.x = userRotX + scrollRotX - mouseY;
        rootGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.03;
        reticleRight.group.visible = false;
        reticleLeft.group.visible = false;
      } else {
        const zoomZ = isMobile ? currentTarget.camPos[2] + 1.8 : currentTarget.camPos[2];
        targetCamPos.set(0, currentTarget.pos[1], zoomZ);
        targetLookAt.set(0, currentTarget.pos[1], currentTarget.pos[2]);

        rootGroup.rotation.y = userRotY + mouseX * 0.25;
        rootGroup.rotation.x = userRotX - mouseY * 0.25;
        rootGroup.position.y = 0;

        const span = currentTarget.bilateralSpan || 0;
        const pulse = 1 + Math.sin(elapsedTime * 5) * 0.08;

        if (span > 0) {
          // Bilateral Reticles: Both Right & Left targeting reticles rotate and pulse synchronously
          reticleRight.group.visible = true;
          reticleRight.group.position.set(-span, currentTarget.pos[1], currentTarget.pos[2]);
          reticleRight.ring1.rotation.z = elapsedTime * 2;
          reticleRight.ring2.rotation.z = -elapsedTime * 2.5;
          reticleRight.group.scale.set(pulse, pulse, pulse);

          reticleLeft.group.visible = true;
          reticleLeft.group.position.set(span, currentTarget.pos[1], currentTarget.pos[2]);
          reticleLeft.ring1.rotation.z = -elapsedTime * 2;
          reticleLeft.ring2.rotation.z = elapsedTime * 2.5;
          reticleLeft.group.scale.set(pulse, pulse, pulse);
        } else {
          // Midline (Cervical / Lumbar): Single centered reticle
          reticleRight.group.visible = true;
          reticleRight.group.position.set(0, currentTarget.pos[1], currentTarget.pos[2]);
          reticleRight.ring1.rotation.z = elapsedTime * 2;
          reticleRight.ring2.rotation.z = -elapsedTime * 2.5;
          reticleRight.group.scale.set(pulse, pulse, pulse);

          reticleLeft.group.visible = false;
        }
      }

      currentCamPos.lerp(targetCamPos, 0.065);
      camera.position.copy(currentCamPos);

      currentLookAt.lerp(targetLookAt, 0.065);
      camera.lookAt(currentLookAt);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      dracoLoader.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const activeMetrics = activeJoint.metrics[modelMode];

  return (
    <div className="w-full">
      
      {/* 3D VIEWPORT CONTAINER */}
      <div className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-b from-white via-slate-50 to-teal-50/40 border border-slate-200/90 shadow-xl">
        
        {/* TOP CONTROLS BAR: Mode Tabs & Clinical Telemetry */}
        <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 z-20 flex flex-col sm:flex-row items-center justify-between gap-3 pointer-events-auto">
          
          {/* 3 ANATOMICAL MODE TABS */}
          <div className="flex items-center gap-1 p-1 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-sm">
            <button
              onClick={() => changeMode('athletic')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition cursor-pointer ${
                modelMode === 'athletic'
                  ? 'bg-teal-600 text-white shadow-sm font-bold'
                  : 'text-slate-600 hover:text-teal-800 hover:bg-slate-100'
              }`}
            >
              <span>🏃</span>
              <span>Athletic Kinetic</span>
            </button>

            <button
              onClick={() => changeMode('skeletal')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition cursor-pointer ${
                modelMode === 'skeletal'
                  ? 'bg-sky-600 text-white shadow-sm font-bold'
                  : 'text-slate-600 hover:text-sky-800 hover:bg-slate-100'
              }`}
            >
              <span>🦴</span>
              <span>Skeletal Anatomy</span>
            </button>

            <button
              onClick={() => changeMode('muscular')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition cursor-pointer ${
                modelMode === 'muscular'
                  ? 'bg-rose-600 text-white shadow-sm font-bold'
                  : 'text-slate-600 hover:text-rose-800 hover:bg-slate-100'
              }`}
            >
              <span>⚡</span>
              <span>Muscular Chain</span>
            </button>
          </div>

          {/* DYNAMIC TELEMETRY HUD (Reflects current mode & selected joint) */}
          <div className="flex items-center gap-2 sm:gap-3 bg-white/95 backdrop-blur-md px-3 py-1 sm:px-4 sm:py-1.5 rounded-full border border-slate-200 text-[9px] sm:text-[10px] font-mono text-slate-600 shadow-sm pointer-events-none">
            <span>{activeMetrics.m1Label}: <strong className="text-slate-900">{activeMetrics.m1Val}</strong></span>
            <span className="hidden sm:inline">{activeMetrics.m2Label}: <strong className="text-teal-700">{activeMetrics.m2Val}</strong></span>
            <span className="hidden md:inline">{activeMetrics.m3Label}: <strong className="text-sky-700">{activeMetrics.m3Val}</strong></span>
          </div>

        </div>

        {/* LOADING INDICATOR */}
        {isLoading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm pointer-events-none">
            <div className="w-8 h-8 border-3 border-teal-600 border-t-transparent rounded-full animate-spin mb-2"></div>
            <span className="text-xs font-mono text-teal-800">Calibrating 3D Biomechanical Mesh...</span>
          </div>
        )}

        {/* WEBGL CANVAS CONTAINER */}
        <div 
          ref={mountRef} 
          className="w-full h-[400px] sm:h-[480px] md:h-[600px] lg:h-[660px] relative z-10 touch-none cursor-grab active:cursor-grabbing select-none"
          title="Drag to rotate in 3D • Tap joints to zoom"
        />

        {/* FLOATING MOBILE INTERACTION HINT */}
        <div className="absolute bottom-2.5 left-0 right-0 md:hidden flex items-center justify-center pointer-events-none z-20">
          <span className="bg-slate-900/75 text-white backdrop-blur-md text-[10px] font-mono px-3 py-1 rounded-full shadow-sm flex items-center gap-2">
            <span>🔄 Drag to rotate 3D</span>
            <span>•</span>
            <span>🎯 Tap joints to zoom & glow</span>
          </span>
        </div>

        {/* FLOATING DESKTOP ROTATION HINT */}
        <div className="absolute top-1/2 right-4 -translate-y-1/2 hidden lg:flex flex-col items-center gap-2 text-[10px] font-mono text-slate-400 pointer-events-none z-10">
          <span className="rotate-90 origin-center tracking-widest uppercase font-semibold">
            {activeJoint.id === 'overview' ? 'Drag / Scroll 3D' : 'Target Glowing'}
          </span>
          <div className="w-0.5 h-12 bg-gradient-to-b from-teal-500 to-transparent mt-8 animate-pulse"></div>
        </div>

        {/* DESKTOP ONLY: Docked Joint Selection & Clinical Overview */}
        <div className="hidden md:block absolute bottom-4 left-4 right-4 z-20 pointer-events-auto">
          <div className="bg-white/95 backdrop-blur-xl p-5 rounded-2xl border border-slate-200 shadow-lg flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            
            <div className="space-y-1 max-w-lg">
              <div className="flex items-center gap-2">
                <span className="badge-medical text-[10px] font-mono px-2 py-0.5 rounded uppercase">
                  {modelMode === 'athletic' && '🏃 Athletic Movement'}
                  {modelMode === 'skeletal' && '🦴 Skeletal Alignment'}
                  {modelMode === 'muscular' && '⚡ Myofascial Tension'}
                </span>
                <strong className="text-sm font-bold text-slate-900 tracking-tight">{activeJoint.name}</strong>
              </div>
              <p className="text-xs text-slate-600">
                {activeJoint.condition} — Dynamic anatomical pulse mode active.
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

      </div>

      {/* MOBILE ONLY: Joint Selection & Detail Box */}
      <div className="block md:hidden mt-3.5 bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm">
        <div className="space-y-1.5 mb-3">
          <div className="flex items-center justify-between gap-2">
            <span className="badge-medical text-[10px] font-mono px-2 py-0.5 rounded uppercase">
              {modelMode === 'athletic' && '🏃 Athletic Movement'}
              {modelMode === 'skeletal' && '🦴 Skeletal Alignment'}
              {modelMode === 'muscular' && '⚡ Myofascial Tension'}
            </span>
            <span className="text-[10px] font-mono text-teal-700 font-semibold">
              {activeMetrics.m1Label}: {activeMetrics.m1Val}
            </span>
          </div>
          <h4 className="text-sm font-bold text-slate-900 tracking-tight">{activeJoint.name}</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            {activeJoint.condition} — Dynamic anatomical pulse mode active.
          </p>
        </div>

        {/* Hotspot Pills for Mobile */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
          {HOTSPOTS.map((hotspot) => (
            <button
              key={hotspot.id}
              onClick={() => selectJoint(hotspot)}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-mono transition border cursor-pointer ${
                activeJoint.id === hotspot.id
                  ? 'bg-teal-600 text-white font-bold border-teal-600 shadow-sm'
                  : 'bg-slate-100 text-slate-700 border-slate-200 active:bg-teal-50 active:text-teal-900'
              }`}
            >
              {hotspot.label}
            </button>
          ))}
          <a
            href="/services"
            className="px-2.5 py-1.5 rounded-xl text-xs font-mono bg-slate-100 text-slate-800 transition border border-slate-200 font-semibold"
          >
            All Protocols →
          </a>
        </div>
      </div>

    </div>
  );
}
