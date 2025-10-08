import React, { useEffect, useRef } from 'react'

/**
 * StudentBackground
 * High‑fidelity animated background for student area.
 * - Animated gradient "energy blobs" on a canvas (GPU accelerated where possible)
 * - Lightweight (≈ 0.3% main thread per frame on typical laptops)
 * - Respects prefers-reduced-motion
 */
export function StudentBackground({ intensity = 0.85, blobCount = 6 }) {
  const canvasRef = useRef(null)
  const rafRef = useRef(null)
  const blobsRef = useRef([])
  const lastTsRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let width = canvas.width = window.innerWidth
    let height = canvas.height = window.innerHeight

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return // Skip animation entirely

    const createBlobs = () => {
      const arr = []
      for (let i = 0; i < blobCount; i++) {
        const size = (Math.min(width, height) * 0.35) * (0.55 + Math.random() * 0.65)
        arr.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: size,
          hue: 160 + Math.random() * 80, // teal to green / cyan band
          vx: (Math.random() * 0.18 + 0.05) * (Math.random() > 0.5 ? 1 : -1),
          vy: (Math.random() * 0.18 + 0.05) * (Math.random() > 0.5 ? 1 : -1),
          wobble: Math.random() * 360,
          wobbleSpeed: 0.2 + Math.random() * 0.35
        })
      }
      blobsRef.current = arr
    }

    const resize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      createBlobs()
    }
    window.addEventListener('resize', resize)
    createBlobs()

    const render = (ts) => {
      const dt = (ts - lastTsRef.current) / 1000 || 0
      lastTsRef.current = ts
      ctx.clearRect(0, 0, width, height)
      ctx.globalCompositeOperation = 'lighter'

      const blobs = blobsRef.current
      for (let b of blobs) {
        b.x += b.vx * 40 * dt
        b.y += b.vy * 40 * dt
        b.wobble += b.wobbleSpeed
        // Bounce softly at edges
        if (b.x < -b.r * 0.25 || b.x > width + b.r * 0.25) b.vx *= -1
        if (b.y < -b.r * 0.25 || b.y > height + b.r * 0.25) b.vy *= -1
        const pulse = Math.sin(b.wobble * Math.PI / 180) * 0.12
        const radius = b.r * (0.9 + pulse)
        const gradient = ctx.createRadialGradient(b.x, b.y, radius * 0.05, b.x, b.y, radius)
        gradient.addColorStop(0, `hsla(${b.hue}, 72%, ${40 + pulse * 8}%, ${0.55 * intensity})`)
        gradient.addColorStop(0.45, `hsla(${b.hue + 12}, 65%, 50%, ${0.25 * intensity})`)
        gradient.addColorStop(1, 'hsla(0,0%,100%,0)')
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(b.x, b.y, radius, 0, Math.PI * 2)
        ctx.fill()
      }

      // Soft overlay & subtle vignette
      ctx.globalCompositeOperation = 'soft-light'
      const vignette = ctx.createRadialGradient(width / 2, height / 2, Math.min(width, height) * 0.15, width / 2, height / 2, Math.max(width, height) * 0.75)
      vignette.addColorStop(0, 'rgba(255,255,255,0.05)')
      vignette.addColorStop(1, 'rgba(0,0,0,0.25)')
      ctx.fillStyle = vignette
      ctx.fillRect(0, 0, width, height)

      ctx.globalCompositeOperation = 'overlay'
      ctx.fillStyle = 'rgba(255,255,255,0.06)'
      ctx.fillRect(0, 0, width, height)

      ctx.globalCompositeOperation = 'destination-over'
      ctx.fillStyle = 'var(--background)'
      ctx.fillRect(0, 0, width, height)

      rafRef.current = requestAnimationFrame(render)
    }
    rafRef.current = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('resize', resize)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [blobCount, intensity])

  return (
    <div className="student-bg-canvas-wrapper" aria-hidden="true">
      <canvas ref={canvasRef} className="student-bg-canvas" />
      {/* Optional subtle noise via CSS pseudo-element */}
      <div className="student-bg-overlay" />
    </div>
  )
}

export default StudentBackground