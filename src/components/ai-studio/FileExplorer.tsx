'use client'

import { useState } from 'react'
import { ChevronRight, ChevronDown, File, Folder, FolderOpen } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { FileNode } from '@/types/ai-studio'

type FileExplorerProps = {
  files: FileNode[]
  onFileSelect: (file: FileNode) => void
  selectedPath?: string
}

type FileTreeItemProps = {
  node: FileNode
  level: number
  onFileSelect: (file: FileNode) => void
  selectedPath?: string
}

function FileTreeItem({ node, level, onFileSelect, selectedPath }: FileTreeItemProps) {
  const [isExpanded, setIsExpanded] = useState(level < 2)
  const isSelected = selectedPath === node.path
  const isFolder = node.type === 'folder'

  const handleClick = () => {
    if (isFolder) {
      setIsExpanded(!isExpanded)
    } else {
      onFileSelect(node)
    }
  }

  const getFileIcon = (language?: string) => {
    const iconClass = 'h-4 w-4 flex-shrink-0'
    switch (language) {
      case 'typescript':
        return <span className={cn(iconClass, 'text-blue-500')}>TS</span>
      case 'javascript':
        return <span className={cn(iconClass, 'text-yellow-500')}>JS</span>
      case 'json':
        return <span className={cn(iconClass, 'text-yellow-600')}>{'{}'}</span>
      case 'markdown':
        return <span className={cn(iconClass, 'text-gray-500')}>MD</span>
      default:
        return <File className={cn(iconClass, 'text-gray-400')} />
    }
  }

  return (
    <div>
      <button
        onClick={handleClick}
        className={cn(
          'w-full flex items-center gap-1 px-2 py-1 text-sm hover:bg-gray-700/50 transition-colors',
          isSelected && 'bg-blue-600/30 text-blue-300'
        )}
        style={{ paddingLeft: `${level * 12 + 8}px` }}
      >
        {isFolder ? (
          <>
            {isExpanded ? (
              <ChevronDown className="h-4 w-4 flex-shrink-0 text-gray-400" />
            ) : (
              <ChevronRight className="h-4 w-4 flex-shrink-0 text-gray-400" />
            )}
            {isExpanded ? (
              <FolderOpen className="h-4 w-4 flex-shrink-0 text-yellow-500" />
            ) : (
              <Folder className="h-4 w-4 flex-shrink-0 text-yellow-500" />
            )}
          </>
        ) : (
          <>
            <span className="w-4" />
            {getFileIcon(node.language)}
          </>
        )}
        <span className="truncate">{node.name}</span>
      </button>

      {isFolder && isExpanded && node.children && (
        <div>
          {node.children.map((child) => (
            <FileTreeItem
              key={child.id}
              node={child}
              level={level + 1}
              onFileSelect={onFileSelect}
              selectedPath={selectedPath}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function FileExplorer({ files, onFileSelect, selectedPath }: FileExplorerProps) {
  return (
    <div className="h-full bg-gray-900 text-gray-300 overflow-auto">
      <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-700">
        Explorer
      </div>
      <div className="py-1">
        {files.map((file) => (
          <FileTreeItem
            key={file.id}
            node={file}
            level={0}
            onFileSelect={onFileSelect}
            selectedPath={selectedPath}
          />
        ))}
      </div>
    </div>
  )
}
