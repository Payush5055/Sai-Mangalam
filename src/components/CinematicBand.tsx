import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default function CinematicBand() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const W = container.offsetWidth
    const H = container.offsetHeight

    // ── RENDERER ──────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.5

    // ── SCENE ─────────────────────────────────────────
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x030508)
    scene.fog = new THREE.FogExp2(0x030508, 0.055)

    // ── CAMERA ────────────────────────────────────────
    const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 100)
    camera.position.set(0, 1.0, 7.0)
    camera.lookAt(0, 0, 0)

    // ── LIGHTS ────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0x111133, 0.5))

    const keyLight = new THREE.DirectionalLight(0xffffff, 0.8)
    keyLight.position.set(5, 10, 5)
    keyLight.castShadow = true
    scene.add(keyLight)

    const innerGlow = new THREE.PointLight(0x00aaff, 8, 6)
    innerGlow.position.set(0, 0, 0)
    scene.add(innerGlow)

    const innerGlow2 = new THREE.PointLight(0x0066ff, 5, 4)
    innerGlow2.position.set(0, 0.5, 0.3)
    scene.add(innerGlow2)

    const rim1 = new THREE.PointLight(0x4488ff, 3, 12)
    rim1.position.set(-5, 3, 2)
    scene.add(rim1)

    const rim2 = new THREE.PointLight(0x0044ff, 2, 10)
    rim2.position.set(4, -2, -3)
    scene.add(rim2)

    const topLight = new THREE.SpotLight(0xaaddff, 2, 15, Math.PI * 0.25)
    topLight.position.set(0, 8, 1)
    scene.add(topLight)

    const electricGlow = new THREE.PointLight(0x4499ff, 2.5, 5)
    electricGlow.position.set(0, 1.5, 0)
    scene.add(electricGlow)

    // ── MATERIALS ─────────────────────────────────────
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xaaddff,
      metalness: 0.0,
      roughness: 0.0,
      transmission: 0.85,
      thickness: 2.5,
      transparent: true,
      opacity: 0.45,
      clearcoat: 1.0,
      clearcoatRoughness: 0.0,
      ior: 1.5,
      reflectivity: 1.0,
      side: THREE.DoubleSide,
      envMapIntensity: 3.0,
    })

    const glassDark = new THREE.MeshPhysicalMaterial({
      color: 0x5599ee,
      metalness: 0.0,
      roughness: 0.05,
      transmission: 0.8,
      thickness: 3.0,
      transparent: true,
      opacity: 0.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.0,
      ior: 1.55,
      reflectivity: 1.0,
      side: THREE.DoubleSide,
      envMapIntensity: 2.5,
    })

    const glassEdge = new THREE.MeshPhysicalMaterial({
      color: 0xeef5ff,
      metalness: 0.0,
      roughness: 0.0,
      transmission: 0.6,
      transparent: true,
      opacity: 0.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.0,
      ior: 1.5,
      envMapIntensity: 4.0,
      side: THREE.DoubleSide,
    })

    const glassFin = new THREE.MeshPhysicalMaterial({
      color: 0x88bbff,
      metalness: 0.0,
      roughness: 0.02,
      transmission: 0.78,
      thickness: 0.8,
      transparent: true,
      opacity: 0.55,
      clearcoat: 1.0,
      clearcoatRoughness: 0.0,
      ior: 1.48,
      envMapIntensity: 3.0,
      side: THREE.DoubleSide,
    })

    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x0044ff,
      emissive: new THREE.Color(0x0055ff),
      emissiveIntensity: 3.0,
      transparent: true,
      opacity: 0.15,
    })

    const crackMat = new THREE.LineBasicMaterial({
      color: 0x44aaff,
      transparent: true,
      opacity: 0.9,
    })

    // ── TRANSFORMER GROUP ─────────────────────────────
    const group = new THREE.Group()
    scene.add(group)

    // Main body
    const body = new THREE.Mesh(new THREE.BoxGeometry(1.6, 2.2, 1.0), glassMat)
    body.castShadow = true
    group.add(body)

    // Emissive core
    group.add(new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.8, 0.6), coreMat))

    // Edge strips
    ;[[-0.82, -0.52], [-0.82, 0.52], [0.82, -0.52], [0.82, 0.52]].forEach(([ex, ez]) => {
      const e = new THREE.Mesh(new THREE.BoxGeometry(0.065, 2.26, 0.065), glassEdge)
      e.position.set(ex, 0, ez)
      group.add(e)
    })

    // Cooling fins
    for (const side of [-1, 1]) {
      for (let i = 0; i < 8; i++) {
        const fin = new THREE.Mesh(new THREE.BoxGeometry(0.04, 1.55, 0.82), glassFin)
        fin.position.set(side * (0.86 + i * 0.085), -0.1, 0)
        group.add(fin)
      }
    }

    // Horizontal bands
    ;[-0.65, 0, 0.65].forEach(by => {
      const band = new THREE.Mesh(new THREE.BoxGeometry(1.65, 0.055, 1.05), glassEdge)
      band.position.set(0, by, 0)
      group.add(band)
    })

    // Base + wheels
    const base = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.12, 1.3), glassDark)
    base.position.set(0, -1.18, 0)
    group.add(base)

    ;[-0.7, 0.7].forEach(wx => {
      ;[-0.45, 0.45].forEach(wz => {
        const w = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.08, 16), glassDark)
        w.rotation.z = Math.PI / 2
        w.position.set(wx, -1.26, wz)
        group.add(w)
      })
    })

    // Bushings
    const tipMat = new THREE.MeshBasicMaterial({ color: 0x88ddff, transparent: true, opacity: 0.9 })
    ;[-0.5, 0, 0.5].forEach(bx => {
      const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.085, 1.0, 16), glassEdge)
      shaft.position.set(bx, 1.6, 0.1)
      group.add(shaft)

      for (let ri = 0; ri < 6; ri++) {
        const ring = new THREE.Mesh(new THREE.TorusGeometry(0.095, 0.018, 8, 24), glassEdge)
        ring.position.set(bx, 1.18 + ri * 0.14, 0.1)
        group.add(ring)
      }

      const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.15, 12), glassEdge)
      cap.position.set(bx, 2.02, 0.1)
      group.add(cap)

      const tip = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 8), tipMat.clone())
      tip.position.set(bx, 2.12, 0.1)
      group.add(tip)
    })

    // Cables
    ;[-0.5, 0].forEach(cx => {
      const pts: THREE.Vector3[] = []
      for (let i = 0; i <= 20; i++) {
        const tt = i / 20
        pts.push(new THREE.Vector3(cx + tt * 0.5, 2.15 - Math.sin(tt * Math.PI) * 0.18, 0.1))
      }
      const tube = new THREE.Mesh(
        new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 20, 0.016, 8, false),
        glassEdge
      )
      group.add(tube)
    })

    // Conservator
    const cons = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.85, 20), glassMat)
    cons.rotation.z = Math.PI / 2
    cons.position.set(0.4, 1.42, 0)
    group.add(cons)

    // ── ELECTRIC CRACK LINES ──────────────────────────
    type Crack = { line: THREE.Line; life: number; maxLife: number; mat: THREE.LineBasicMaterial }
    const cracks: Crack[] = []

    function makeCrack(): Crack {
      const pts: THREE.Vector3[] = []
      let x = (Math.random() - 0.5) * 1.4
      let y = (Math.random() - 0.5) * 1.8
      let z = (Math.random() - 0.5) * 0.8
      pts.push(new THREE.Vector3(x, y, z))
      const steps = 4 + Math.floor(Math.random() * 5)
      for (let i = 0; i < steps; i++) {
        x += (Math.random() - 0.5) * 0.4
        y += (Math.random() - 0.5) * 0.3
        z += (Math.random() - 0.5) * 0.2
        x = Math.max(-0.75, Math.min(0.75, x))
        y = Math.max(-1.0, Math.min(1.0, y))
        pts.push(new THREE.Vector3(x, y, z))
      }
      const geo = new THREE.BufferGeometry().setFromPoints(pts)
      const mat = crackMat.clone()
      mat.opacity = 0.9
      const line = new THREE.Line(geo, mat)
      group.add(line)
      const maxLife = 60 + Math.random() * 80
      return { line, life: maxLife, maxLife, mat }
    }

    for (let i = 0; i < 18; i++) cracks.push(makeCrack())

    // ── ORBIT RINGS ───────────────────────────────────
    ;[1.9, 2.6, 3.4].forEach((r, i) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(r, 0.005, 4, 80),
        new THREE.MeshBasicMaterial({
          color: [0x2244ff, 0x4488ff, 0x66aaff][i],
          transparent: true,
          opacity: 0.08 - i * 0.02,
        })
      )
      ring.rotation.x = Math.PI / 2 + i * 0.4
      ring.rotation.z = i * 0.7
      group.add(ring)
    })

    // ── PARTICLES ─────────────────────────────────────
    const pCount = 350
    const pPos = new Float32Array(pCount * 3)
    const pCol = new Float32Array(pCount * 3)
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 14
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 10
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 10
      const c = new THREE.Color().setHSL(0.55 + Math.random() * 0.12, 0.9, 0.7)
      pCol[i * 3] = c.r; pCol[i * 3 + 1] = c.g; pCol[i * 3 + 2] = c.b
    }
    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
    pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3))
    const pMesh = new THREE.Points(pGeo, new THREE.PointsMaterial({
      size: 0.035, transparent: true, opacity: 0.55, vertexColors: true, sizeAttenuation: true,
    }))
    scene.add(pMesh)

    // ── REFLECTIVE GROUND ─────────────────────────────
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(30, 30),
      new THREE.MeshStandardMaterial({ color: 0x020408, metalness: 0.9, roughness: 0.1 })
    )
    ground.rotation.x = -Math.PI / 2
    ground.position.y = -2.5
    ground.receiveShadow = true
    scene.add(ground)

    // Ice shards
    for (let i = 0; i < 12; i++) {
      const sg = new THREE.OctahedronGeometry(0.06 + Math.random() * 0.12, 0)
      const sm = glassMat.clone()
      sm.opacity = 0.4 + Math.random() * 0.3
      const shard = new THREE.Mesh(sg, sm)
      const ang = Math.random() * Math.PI * 2
      const dist = 1.5 + Math.random() * 2.5
      shard.position.set(Math.cos(ang) * dist, -2.44, Math.sin(ang) * dist)
      shard.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI)
      scene.add(shard)
    }

    // ── SCROLL-DRIVEN ANIMATION ───────────────────────
    group.position.y = -4
    group.scale.setScalar(0.8)
    const scrollObj = { progress: 0 }

    ScrollTrigger.create({
      trigger: container,
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: 1.5,
      onUpdate: (self) => {
        scrollObj.progress = self.progress
        const p = self.progress
        if (p < 0.3) {
          const t = p / 0.3
          group.position.y = -4 + t * 4
          group.scale.setScalar(0.8 + t * 0.2)
          if (scene.fog) (scene.fog as THREE.FogExp2).density = 0.12 - t * 0.065
          camera.position.z = 9 - t * 2
        } else if (p < 0.7) {
          group.position.y = 0
          group.scale.setScalar(1.0)
          if (scene.fog) (scene.fog as THREE.FogExp2).density = 0.055
          camera.position.z = 7.0
        } else {
          const t = (p - 0.7) / 0.3
          group.position.y = -t * 3.5
          group.scale.setScalar(1.0 - t * 0.15)
          if (scene.fog) (scene.fog as THREE.FogExp2).density = 0.055 + t * 0.1
          camera.position.z = 7.0 + t * 2.5
          innerGlow.intensity = 8 * (1 - t * 0.7)
          innerGlow2.intensity = 5 * (1 - t * 0.7)
        }
        camera.lookAt(0, 0, 0)
      },
    })

    // ── MOUSE PARALLAX ────────────────────────────────
    const mouse = { x: 0, y: 0 }
    const onMouseMove = (e: MouseEvent) => {
      const r = container.getBoundingClientRect()
      mouse.x = (e.clientX - r.left) / r.width * 2 - 1
      mouse.y = -((e.clientY - r.top) / r.height * 2 - 1)
    }
    container.addEventListener('mousemove', onMouseMove)

    // ── DRAG TO ROTATE ────────────────────────────────
    let dragging = false
    let prevM = { x: 0, y: 0 }
    let tRotY = 0.3, tRotX = 0.06
    let cRotY = 0.3, cRotX = 0.06
    let autoRot = true

    const onMouseDown = (e: MouseEvent) => {
      dragging = true; autoRot = false; prevM = { x: e.clientX, y: e.clientY }
    }
    const onMouseUp = () => { dragging = false }
    const onDrag = (e: MouseEvent) => {
      if (!dragging) return
      tRotY += (e.clientX - prevM.x) * 0.007
      tRotX += (e.clientY - prevM.y) * 0.005
      tRotX = Math.max(-0.55, Math.min(0.55, tRotX))
      prevM = { x: e.clientX, y: e.clientY }
    }
    container.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    container.addEventListener('mousemove', onDrag)

    // ── ANIMATION LOOP ────────────────────────────────
    let t = 0
    let rafId: number

    const animate = () => {
      rafId = requestAnimationFrame(animate)
      t += 0.01

      if (autoRot) tRotY += 0.003
      cRotY += (tRotY - cRotY) * 0.05
      cRotX += (tRotX - cRotX) * 0.05

      group.rotation.y = cRotY
      group.rotation.x = cRotX

      if (scrollObj.progress > 0.3 && scrollObj.progress < 0.7) {
        group.position.y += Math.sin(t * 0.5) * 0.001
      }

      if (!dragging) {
        camera.position.x += (mouse.x * 0.8 - camera.position.x) * 0.05
        camera.position.y += (1.0 + mouse.y * 0.4 - camera.position.y) * 0.05
        camera.lookAt(0, 0, 0)
      }

      const pulse = 1 + Math.sin(t * 1.8) * 0.4
      innerGlow.intensity = 7 * pulse
      innerGlow2.intensity = 4 * pulse
      coreMat.emissiveIntensity = 2.5 + Math.sin(t * 2.1) * 1.0

      cracks.forEach((c, i) => {
        c.life -= 0.8
        c.mat.opacity = (c.life / c.maxLife) * 0.9
        if (c.life <= 0) {
          group.remove(c.line)
          c.line.geometry.dispose()
          cracks[i] = makeCrack()
        }
      })

      group.children.forEach(child => {
        if (
          child instanceof THREE.Mesh &&
          child.geometry instanceof THREE.TorusGeometry &&
          (child.material as THREE.MeshBasicMaterial).opacity < 0.1
        ) {
          child.rotation.z += 0.004
          child.rotation.x += 0.0015
        }
        if (child instanceof THREE.Mesh && child.geometry instanceof THREE.SphereGeometry) {
          const m = child.material as THREE.MeshBasicMaterial
          m.opacity = 0.6 + Math.sin(t * 3 + child.position.x * 6) * 0.3
          m.color.setHSL((0.55 + t * 0.02) % 1, 1, 0.8)
        }
      })

      rim1.position.x = -5 + Math.sin(t * 0.25) * 1.5
      rim1.position.z = 2 + Math.cos(t * 0.25) * 1.5
      rim2.position.x = 4 + Math.cos(t * 0.2) * 1.5

      pMesh.rotation.y += 0.0002
      renderer.render(scene, camera)
    }

    animate()

    // ── RESIZE ────────────────────────────────────────
    const onResize = () => {
      const nw = container.offsetWidth
      const nh = container.offsetHeight
      camera.aspect = nw / nh
      camera.updateProjectionMatrix()
      renderer.setSize(nw, nh)
    }
    window.addEventListener('resize', onResize)

    // ── CLEANUP ───────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('resize', onResize)
      container.removeEventListener('mousemove', onMouseMove)
      container.removeEventListener('mousedown', onMouseDown)
      container.removeEventListener('mousemove', onDrag)
      ScrollTrigger.getAll().forEach(st => st.kill())
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', cursor: 'grab', background: '#030508' }}
    >
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0 }} />

      {/* Cream fade from stats above */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 80,
        background: 'linear-gradient(to bottom, #f4f1eb, transparent)',
        pointerEvents: 'none', zIndex: 2,
      }} />

      {/* Cream fade to split sections below */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 80,
        background: 'linear-gradient(to top, #f4f1eb, transparent)',
        pointerEvents: 'none', zIndex: 2,
      }} />

      {/* Text overlay */}
      <div style={{ position: 'absolute', bottom: 40, left: 40, zIndex: 3, pointerEvents: 'none' }}>
        <div style={{
          fontSize: 9, color: 'rgba(255,255,255,0.3)',
          letterSpacing: '0.3em', textTransform: 'uppercase',
          marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <span style={{ width: 14, height: 0.5, background: 'rgba(255,255,255,0.2)', display: 'inline-block' }} />
          SaiMangalam · Est. 1985
        </div>
        <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 32, color: 'white', fontWeight: 400, lineHeight: 1.1 }}>
          Engineering<br />
          <em style={{ color: 'rgba(255,255,255,0.35)', fontStyle: 'italic' }}>the future</em>
        </div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 8, maxWidth: 280, lineHeight: 1.7 }}>
          Precision-built transformers powering utilities, industry and renewables across India.
        </div>
      </div>

      {/* Drag hint */}
      <div style={{
        position: 'absolute', bottom: 20, right: 28,
        fontSize: 9, color: 'rgba(255,255,255,0.18)',
        letterSpacing: '0.15em', textTransform: 'uppercase',
        zIndex: 3, pointerEvents: 'none',
      }}>
        Drag to rotate
      </div>
    </div>
  )
}
