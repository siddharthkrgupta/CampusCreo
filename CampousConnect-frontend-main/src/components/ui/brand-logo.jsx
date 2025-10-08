import React from 'react'
import { cn } from '../../lib/utils'

/* Simple textual brand logo for CampusCreo.
   If you later add an SVG asset, replace the inner span with an <img /> and keep accessible labeling.
*/
export function BrandLogo({ className, size = 'lg', showTagline = false, glow = true, variant = 'split' }) {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl md:text-5xl',
    xl: 'text-5xl md:text-7xl'
  }[size]

  // Variants allow future brand experiments without touching all call sites.
  const renderWordmark = () => {
    if (variant === 'mono') {
      return <span className={cn('relative font-extrabold tracking-tight font-sans text-slate-900 dark:text-white drop-shadow-sm', sizeClasses)}>CampusCreo</span>
    }
    if (variant === 'hero') {
      // Hardcoded dark colors to bypass CSS issues
      return (
        <span className={cn('relative font-extrabold tracking-tight font-sans leading-none', sizeClasses)} style={{ color: '#000000' }}>
          <span className="pr-1" style={{ color: '#000000', textShadow: '0 3px 6px rgba(0,0,0,0.4)' }}>Campus</span>
          <span className="relative inline-block">
            <span style={{ color: '#000000', textShadow: '0 3px 6px rgba(0,0,0,0.4)' }}>Creo</span>
            {/* Hardcoded black underline */}
            <span
              className="absolute left-0 -bottom-1 rounded-full"
              style={{
                height: '5px',
                width: '100%',
                backgroundColor: '#000000',
                boxShadow: '0 0 8px rgba(0,0,0,0.6)'
              }}
              aria-hidden="true"
            />
            {/* Hardcoded black accent dot */}
            <span
              className="absolute -right-5 top-1/2 -translate-y-1/2 rounded-full ring-2"
              style={{
                width: '14px',
                height: '14px',
                backgroundColor: '#000000',
                ringColor: '#ffffff',
                boxShadow: '0 0 6px rgba(0,0,0,0.5), 0 0 0 2px #ffffff'
              }}
              aria-hidden="true"
            />
          </span>
        </span>
      )
    }
    // default split
    return (
      <span className={cn('relative font-extrabold tracking-tight font-sans', sizeClasses)}>
        <span className="pr-1 text-slate-900 dark:text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]">Campus</span>
        <span className="relative inline-block align-baseline">
          <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)]">Creo</span>
          <span className="absolute -right-5 top-1/2 -translate-y-1/2 flex items-center justify-center" aria-hidden="true">
            <span className="relative inline-flex">
              <span className="w-3 h-3 rounded-full bg-lime-400 shadow-[0_0_0_3px_rgba(255,255,255,0.6)] animate-pulse" />
              <span className="absolute inset-0 rounded-full bg-lime-300 animate-ping opacity-40" />
            </span>
          </span>
        </span>
      </span>
    )
  }

  return (
    <div className={cn('relative inline-flex flex-col items-center select-none', className)} aria-label="CampusCreo logo">
      {glow && variant !== 'hero' && (
        <div className="pointer-events-none absolute -inset-x-8 -inset-y-4 opacity-30 blur-2xl">
          <div className="w-full h-full bg-gradient-to-r from-emerald-400/25 via-teal-300/15 to-indigo-500/25 rounded-full" />
        </div>
      )}
      {renderWordmark()}
      {showTagline && (
        <span className={cn(
          'mt-3 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.22em] rounded-full px-4 py-1.5',
          variant === 'hero'
            ? ''
            : 'backdrop-blur-sm bg-white/60 text-slate-700/80 ring-1 ring-black/5'
        )}
          style={variant === 'hero' ? {
            backgroundColor: '#ffffff',
            color: '#000000',
            border: '1px solid #9ca3af',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
          } : {}}>
          Accelerating Campus Placements
        </span>
      )}
    </div>
  )
}
