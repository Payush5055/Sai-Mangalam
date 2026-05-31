import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

interface IntroScreenProps {
  onComplete: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvasContainer = canvasRef.current;
    if (!container || !canvasContainer) return;

    // ── Three.js scene ──────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0908);
    scene.fog = new THREE.FogExp2(0x0a0908, 0.045);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasContainer.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0x4ade80, 2, 20);
    pointLight.position.set(3, 4, 5);
    scene.add(pointLight);
    const pointLight2 = new THREE.PointLight(0x86efac, 1.5, 15);
    pointLight2.position.set(-4, -2, 3);
    scene.add(pointLight2);

    // Transformer wireframe
    const transformerGroup = new THREE.Group();
    const wireMat  = new THREE.MeshBasicMaterial({ color: 0x4ade80, wireframe: true });
    const wireMat2 = new THREE.MeshBasicMaterial({ color: 0x86efac, wireframe: true });
    const wireMat3 = new THREE.MeshBasicMaterial({ color: 0xa3f7bf, wireframe: true });

    const tank = new THREE.Mesh(new THREE.BoxGeometry(2, 2.5, 1.2), wireMat);
    transformerGroup.add(tank);

    for (let i = -2; i <= 2; i++) {
      const fin = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.8, 0.6), wireMat2);
      fin.position.set(i * 0.28, 0, 0.85);
      transformerGroup.add(fin);
    }

    const lid = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.12, 1.4), wireMat3);
    lid.position.y = 1.3;
    transformerGroup.add(lid);

    const bush1 = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.18, 1.2, 8), wireMat);
    bush1.position.set(-0.5, 2.0, 0);
    transformerGroup.add(bush1);

    const bush2 = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.18, 1.2, 8), wireMat);
    bush2.position.set(0.5, 2.0, 0);
    transformerGroup.add(bush2);

    const torusMat = new THREE.MeshBasicMaterial({ color: 0xbbf7d0, wireframe: true });
    for (let y = 0.1; y < 1.1; y += 0.3) {
      const ring1 = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.03, 6, 16), torusMat);
      ring1.position.set(-0.5, 1.5 + y, 0);
      ring1.rotation.x = Math.PI / 2;
      transformerGroup.add(ring1);
      const ring2 = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.03, 6, 16), torusMat);
      ring2.position.set(0.5, 1.5 + y, 0);
      ring2.rotation.x = Math.PI / 2;
      transformerGroup.add(ring2);
    }

    const base = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.2, 1.6), wireMat2);
    base.position.y = -1.35;
    transformerGroup.add(base);

    for (let i = -1; i <= 1; i += 2) {
      for (let j = -1; j <= 1; j += 2) {
        const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.1, 8), wireMat3);
        wheel.position.set(i * 0.9, -1.52, j * 0.6);
        wheel.rotation.z = Math.PI / 2;
        transformerGroup.add(wheel);
      }
    }

    transformerGroup.position.set(0, -0.3, 0);
    scene.add(transformerGroup);

    // Particles
    const particleCount = 300;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3 + Math.random() * 4;
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const pMat = new THREE.PointsMaterial({ color: 0x4ade80, size: 0.04, transparent: true, opacity: 0.7 });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // Electric arcs
    const arcGroup = new THREE.Group();
    const arcMat = new THREE.LineBasicMaterial({ color: 0xbbf7d0, transparent: true, opacity: 0.6 });
    for (let a = 0; a < 6; a++) {
      const pts: THREE.Vector3[] = [];
      const startY = 2.6 + Math.random() * 0.4;
      const startX = (Math.random() - 0.5) * 0.4;
      for (let k = 0; k < 8; k++) {
        pts.push(new THREE.Vector3(
          startX + (Math.random() - 0.5) * 0.5 * k * 0.3,
          startY + k * 0.25,
          (Math.random() - 0.5) * 0.3
        ));
      }
      arcGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), arcMat));
    }
    scene.add(arcGroup);

    // Mouse parallax
    const mouse = { x: 0, y: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation loop
    let animId: number;
    const clock = new THREE.Clock();
    let elapsed = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      elapsed += delta;
      transformerGroup.rotation.y = elapsed * 0.3 + Math.sin(elapsed * 0.5) * 0.2;
      transformerGroup.position.y = -0.3 + Math.sin(elapsed * 0.8) * 0.08;
      particles.rotation.y = elapsed * 0.05;
      particles.rotation.x = elapsed * 0.02;
      arcGroup.children.forEach((line, i) => {
        const mat = (line as THREE.Line).material as THREE.LineBasicMaterial;
        mat.opacity = 0.3 + Math.abs(Math.sin(elapsed * 8 + i)) * 0.7;
        line.visible = (elapsed * 10 + i) % 3 > 1;
      });
      camera.position.x += (mouse.x * 1.5 - camera.position.x) * 0.05;
      camera.position.y += (mouse.y * 1.0 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };
    animate();

    // HTML overlay text animation
    const overlay = overlayRef.current;
    if (overlay) {
      const nameEl = overlay.querySelector<HTMLDivElement>('.intro-name');
      const subEl = overlay.querySelector<HTMLDivElement>('.intro-sub');
      const tagEl = overlay.querySelector<HTMLDivElement>('.intro-tag');
      const progressEl = overlay.querySelector<HTMLDivElement>('.intro-progress-fill');
      const lineWrap = overlay.querySelector<HTMLDivElement>('.intro-progress-wrap');

      if (nameEl) setTimeout(() => { nameEl.style.opacity = '1'; nameEl.style.transform = 'translateY(0)'; }, 400);
      if (subEl)  setTimeout(() => { subEl.style.opacity  = '1'; subEl.style.transform  = 'translateY(0)'; }, 900);
      if (tagEl)  setTimeout(() => { tagEl.style.opacity  = '1'; }, 1400);
      if (progressEl) {
        setTimeout(() => {
          progressEl.style.transition = 'width 3s linear';
          progressEl.style.width = '100%';
        }, 200);
      }

      // ── GSAP cinematic exit — fires after progress bar completes ───────────
      const exitTimer = setTimeout(() => {
        if (!container) return;

        const els: HTMLElement[] = [];
        if (nameEl) els.push(nameEl);
        if (subEl)  els.push(subEl);
        if (tagEl)  els.push(tagEl);

        const tl = gsap.timeline();

        // Step 2: texts drift up and fade
        if (els.length) {
          tl.to(els, { y: -24, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power2.in' });
        }

        // Step 3: progress line shrinks
        if (lineWrap) {
          tl.to(lineWrap, { opacity: 0, duration: 0.4, ease: 'power2.in' }, '-=0.5');
        }

        // Step 4: canvas scales up and fades — feels like camera pushing in
        tl.to(canvasContainer, { scale: 1.08, opacity: 0, duration: 0.8, ease: 'power2.in' }, '-=0.3');

        // Step 5: container bg transitions to cream
        tl.to(container, { backgroundColor: '#f4f1eb', duration: 0.5, ease: 'none' }, '-=0.4');

        // Step 6: container opacity to 0, then call onComplete
        tl.to(container, {
          opacity: 0,
          duration: 0.4,
          ease: 'power1.in',
          onComplete: () => {
            container.style.display = 'none';
            onComplete();
          },
        });

      }, 3500); // fires after progress bar completes (~3200ms) + small pause

      return () => clearTimeout(exitTimer);
    }

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (canvasContainer.contains(renderer.domElement)) {
        canvasContainer.removeChild(renderer.domElement);
      }
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      style={{ position: 'fixed', inset: 0, zIndex: 9999, backgroundColor: '#0a0908', overflow: 'hidden' }}
    >
      <div ref={canvasRef} style={{ position: 'absolute', inset: 0 }} />

      <div
        ref={overlayRef}
        style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'flex-end',
          paddingBottom: '12%', pointerEvents: 'none',
        }}
      >
        <div
          className="intro-name"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 'clamp(28px, 5vw, 64px)',
            fontWeight: 400,
            letterSpacing: '0.22em',
            color: '#f0fdf4',
            lineHeight: 1,
            opacity: 0,
            transform: 'translateY(24px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
            textShadow: '0 0 40px rgba(74,222,128,0.4)',
          }}
        >
          SAIMANGALAM
        </div>
        <div
          className="intro-sub"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 'clamp(9px, 1.2vw, 15px)',
            fontWeight: 400,
            letterSpacing: '0.5em',
            color: 'rgba(187,247,208,0.7)',
            marginTop: 10,
            opacity: 0,
            transform: 'translateY(12px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          ELECTRICAL &amp; ENGINEERINGS
        </div>
        <div
          className="intro-tag"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontStyle: 'italic',
            fontSize: 13,
            color: 'rgba(134,239,172,0.5)',
            letterSpacing: '0.15em',
            marginTop: 20,
            opacity: 0,
            transition: 'opacity 0.8s ease',
          }}
        >
          Powering India Since 1985
        </div>

        <div
          className="intro-progress-wrap"
          style={{ marginTop: 32, width: 120, height: 1, backgroundColor: 'rgba(74,222,128,0.15)', overflow: 'hidden', borderRadius: 1 }}
        >
          <div
            className="intro-progress-fill"
            style={{ height: '100%', backgroundColor: '#4ade80', opacity: 0.6, width: '0%' }}
          />
        </div>
      </div>
    </div>
  );
};

export default IntroScreen;
