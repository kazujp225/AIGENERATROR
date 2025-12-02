'use client'

import { X, Circle } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { FileNode } from '@/types/ai-studio'

type EditorTabsProps = {
  openFiles: FileNode[]
  activeFile: FileNode | null
  onSelectFile: (file: FileNode) => void
  onCloseFile: (file: FileNode) => void
  modifiedFiles?: Set<string>
}

export function EditorTabs({
  openFiles,
  activeFile,
  onSelectFile,
  onCloseFile,
  modifiedFiles = new Set(),
}: EditorTabsProps) {
  if (openFiles.length === 0) return null

  const getFileIcon = (language?: string) => {
    switch (language) {
      case 'typescript':
        return <span className="text-blue-400 text-xs font-bold">TS</span>
      case 'javascript':
        return <span className="text-yellow-400 text-xs font-bold">JS</span>
      case 'json':
        return <span className="text-yellow-600 text-xs">{'{}'}</span>
      case 'markdown':
        return <span className="text-gray-400 text-xs">MD</span>
      default:
        return <span className="text-gray-400 text-xs">F</span>
    }
  }

  return (
    <div className="flex items-center bg-gray-800/50 border-b border-gray-700 overflow-x-auto">
      {openFiles.map((file) => {
        const isActive = activeFile?.id === file.id
        const isModified = modifiedFiles.has(file.path)

        return (
          <div
            key={file.id}
            className={cn(
              'group flex items-center gap-2 px-3 py-2 text-sm border-r border-gray-700 cursor-pointer min-w-0',
              isActive
                ? 'bg-gray-900 text-gray-200'
                : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800/50'
            )}
            onClick={() => onSelectFile(file)}
          >
            {/* File icon */}
            <span className="flex-shrink-0">{getFileIcon(file.language)}</span>

            {/* File name */}
            <span className="truncate max-w-32">{file.name}</span>

            {/* Modified indicator or close button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                onCloseFile(file)
              }}
              className={cn(
                'flex-shrink-0 p-0.5 rounded transition-colors',
                isModified && !isActive ? 'visible' : 'invisible group-hover:visible',
                'hover:bg-gray-600'
              )}
            >
              {isModified ? (
                <Circle className="h-2.5 w-2.5 fill-current text-white" />
              ) : (
                <X className="h-3.5 w-3.5" />
              )}
            </button>
          </div>
        )
      })}
    </div>
  )
}
