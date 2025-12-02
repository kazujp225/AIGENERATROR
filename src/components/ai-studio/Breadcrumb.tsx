'use client'

import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { FileNode } from '@/types/ai-studio'

type BreadcrumbProps = {
  file: FileNode | null
  onNavigate?: (path: string) => void
}

export function Breadcrumb({ file, onNavigate }: BreadcrumbProps) {
  if (!file) return null

  const parts = file.path.split('/').filter(Boolean)

  return (
    <div className="flex items-center gap-1 px-3 py-1.5 bg-gray-800/30 border-b border-gray-800 text-xs text-gray-400 overflow-x-auto">
      <button
        onClick={() => onNavigate?.('/')}
        className="flex items-center gap-1 hover:text-gray-200 transition-colors flex-shrink-0"
      >
        <Home className="h-3 w-3" />
      </button>

      {parts.map((part, index) => {
        const path = '/' + parts.slice(0, index + 1).join('/')
        const isLast = index === parts.length - 1

        return (
          <div key={path} className="flex items-center gap-1 flex-shrink-0">
            <ChevronRight className="h-3 w-3 text-gray-600" />
            <button
              onClick={() => onNavigate?.(path)}
              className={cn(
                'hover:text-gray-200 transition-colors',
                isLast && 'text-gray-200'
              )}
            >
              {part}
            </button>
          </div>
        )
      })}
    </div>
  )
}
