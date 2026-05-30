import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  angle: number
  length: number
  branches: { angle: number; length: number }[]
}

export default function ElectricCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const prevMouseRef = useRef({ x: 0, y: 0 })
  const particlesRef = useRef<Particle[]>([])
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if ('ontouchstart' in window) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const spawnParticle = (x: number, y: number, dx: number, dy: number) => {
      const baseAngle = Math.atan2(dy, dx)
      const spread = (Math.random() - 0.5) * Math.PI * 1.2
      const angle = baseAngle + spread

      const branchCount = Math.floor(Math.random() * 3) + 1
      const branches = Array.from({ length: branchCount }, () => ({
        angle: angle + (Math.random() - 0.5) * 1.2,
        length: Math.random() * 12 + 4,
      }))

      const maxLife = Math.random() * 18 + 10
      particlesRef.current.push({
        x, y,
        vx: Math.cos(angle) * (Math.random() * 3 + 1),
        vy: Math.sin(angle) * (Math.random() * 3 + 1),
        life: maxLife,
        maxLife,
        size: Math.random() * 1.5 + 0.5,
        angle,
        length: Math.random() * 16 + 6,
        branches,
      })
    }

    const onMouseMove = (e: MouseEvent) => {
      prevMouseRef.current = { ...mouseRef.current }
      mouseRef.current = { x: e.clientX, y: e.clientY }

      const dx = e.clientX - prevMouseRef.current.x
      const dy = e.clientY - prevMouseRef.current.y
      const speed = Math.sqrt(dx * dx + dy * dy)

      if (speed > 2) {
        const count = Math.min(Math.floor(speed / 4) + 1, 5)
        for (let i = 0; i < count; i++) {
          spawnParticle(e.clientX, e.clientY, dx, dy)
        }
      }
    }

    window.addEventListener('mousemove', onMouseMove)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particlesRef.current = particlesRef.current.filter(p => p.life > 0)

      for (const p of particlesRef.current) {
        const progress = p.life / p.maxLife
        const alpha = progress * 0.65

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.angle)

        // Main bolt
        ctx.beginPath()
        ctx.moveTo(0, 0)
        const segments = 3
        const segLen = p.length / segments
        let cx = 0
        for (let i = 0; i < segments; i++) {
          cx += segLen
          ctx.lineTo(cx, (Math.random() - 0.5) * 6 * progress)
        }
        ctx.strokeStyle = `rgba(120, 180, 255, ${alpha})`
        ctx.lineWidth = p.size * progress
        ctx.shadowColor = 'rgba(80, 140, 255, 0.8)'
        ctx.shadowBlur = 6 * progress
        ctx.stroke()

        // Branches
        for (const branch of p.branches) {
          ctx.save()
          ctx.translate(p.length * 0.3, 0)
          ctx.rotate(branch.angle - p.angle)
          ctx.beginPath()
          ctx.moveTo(0, 0)
          const bSegLen = branch.length / 2
          let bx = 0
          for (let i = 0; i < 2; i++) {
            bx += bSegLen
            ctx.lineTo(bx, (Math.random() - 0.5) * 4 * progress)
          }
          ctx.strokeStyle = `rgba(160, 200, 255, ${alpha * 0.6})`
          ctx.lineWidth = p.size * 0.5 * progress
          ctx.shadowColor = 'rgba(100, 160, 255, 0.6)'
          ctx.shadowBlur = 4 * progress
          ctx.stroke()
          ctx.restore()
        }

        ctx.restore()

        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.88
        p.vy *= 0.88
        p.vy += 0.05
        p.life -= 1.2
        p.angle += (Math.random() - 0.5) * 0.3
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', top: 0, left: 0,
        width: '100vw', height: '100vh',
        pointerEvents: 'none', zIndex: 9999,
      }}
    />
  )
}
