import React from 'react'
import { cn } from '../../lib/utils'

export function Avatar({ className, ...props }) {
  return (
    <div
      data-slot="avatar"
      className={cn('relative flex size-8 shrink-0 overflow-hidden rounded-full', className)}
      {...props}
    />
  )
}

export function AvatarImage({ className, src, alt, onError, ...props }) {
  return (
    <img
      data-slot="avatar-image"
      className={cn('aspect-square size-full object-cover', className)}
      src={src}
      alt={alt}
      onError={onError}
      {...props}
    />
  )
}

export function AvatarFallback({ className, ...props }) {
  return (
    <div
      data-slot="avatar-fallback"
      className={cn('bg-muted text-muted-foreground flex size-full items-center justify-center rounded-full text-sm font-medium', className)}
      {...props}
    />
  )
}
