'use client'

import { useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

type MinimapProps = {
  content: string
  viewportTop?: number
  viewportHeight?: number
  onScroll?: (position: number) => void
  className?: string
}

export function Minimap({
  content,
  viewportTop = 0,
  viewportHeight = 30,
  onScroll,
  className,
}: MinimapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const lines = content.split('\n')
  const totalLines = lines.length
  const lineHeight = 2 // pixels per line in minimap

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height

    // Clear canvas
    ctx.fillStyle = '#1a1a1a'
    ctx.fillRect(0, 0, width, height)

    // Draw lines
    lines.forEach((line, index) => {
      const y = index * lineHeight
      if (y > height) return

      // Simple syntax coloring based on content
      let color = '#4a4a4a' // default gray
      const trimmedLine = line.trim()

      if (trimmedLine.startsWith('//') || trimmedLine.startsWith('#')) {
        color = '#3a5a3a' // green for comments
      } else if (trimmedLine.startsWith('import') || trimmedLine.startsWith('export')) {
        color = '#5a4a6a' // purple for imports
      } else if (trimmedLine.includes('function') || trimmedLine.includes('=>')) {
        color = '#4a5a6a' // blue for functions
      } else if (trimmedLine.startsWith('const') || trimmedLine.startsWith('let')) {
        color = '#5a5a4a' // yellow for declarations
      }

      // Draw line representation
      const lineLength = Math.min(line.length, 80)
      const barWidth = (lineLength / 80) * (width - 4)
      const indent = Math.min(line.search(/\S/) || 0, 20) / 2

      ctx.fillStyle = color
      ctx.fillRect(2 + indent, y, Math.max(barWidth - indent, 2), lineHeight - 1)
    })
  }, [content, lines])

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const y = e.clientY - rect.top
    const clickedLine = Math.floor(y / lineHeight)
    const position = clickedLine / totalLines
    onScroll?.(position)
  }

  const viewportY = (viewportTop / 100) * (totalLines * lineHeight)
  const viewportH = Math.max((viewportHeight / 100) * (totalLines * lineHeight), 20)

  return (
    <div
      ref={containerRef}
      className={cn('relative w-16 bg-gray-900 cursor-pointer', className)}
      onClick={handleClick}
    >
      <canvas
        ref={canvasRef}
        width={60}
        height={Math.min(totalLines * lineHeight, 500)}
        className="w-full"
      />

      {/* Viewport indicator */}
      <div
        className="absolute left-0 right-0 bg-gray-500/20 border border-gray-500/40 pointer-events-none"
        style={{
          top: viewportY,
          height: viewportH,
        }}
      />
    </div>
  )
}
