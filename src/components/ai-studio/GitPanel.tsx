'use client'

import { useState } from 'react'
import {
  GitBranch,
  GitCommit,
  Plus,
  Minus,
  RotateCcw,
  Check,
  ChevronDown,
  ChevronRight,
  FileEdit,
  FilePlus,
  FileX,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

type FileChange = {
  path: string
  status: 'modified' | 'added' | 'deleted' | 'renamed'
  staged: boolean
}

const mockChanges: FileChange[] = [
  { path: 'src/app/page.tsx', status: 'modified', staged: true },
  { path: 'src/components/Header.tsx', status: 'modified', staged: false },
  { path: 'src/lib/utils.ts', status: 'added', staged: false },
  { path: 'src/styles/old.css', status: 'deleted', staged: false },
]

export function GitPanel() {
  const [commitMessage, setCommitMessage] = useState('')
  const [expandedSections, setExpandedSections] = useState({
    staged: true,
    changes: true,
  })

  const stagedChanges = mockChanges.filter(c => c.staged)
  const unstagedChanges = mockChanges.filter(c => !c.staged)

  const toggleSection = (section: 'staged' | 'changes') => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const getStatusIcon = (status: FileChange['status']) => {
    switch (status) {
      case 'modified':
        return <FileEdit className="h-4 w-4 text-yellow-500" />
      case 'added':
        return <FilePlus className="h-4 w-4 text-green-500" />
      case 'deleted':
        return <FileX className="h-4 w-4 text-red-500" />
      default:
        return <FileEdit className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusLabel = (status: FileChange['status']) => {
    switch (status) {
      case 'modified':
        return 'M'
      case 'added':
        return 'A'
      case 'deleted':
        return 'D'
      case 'renamed':
        return 'R'
      default:
        return '?'
    }
  }

  return (
    <div className="h-full bg-gray-900 text-gray-300 flex flex-col">
      {/* Header */}
      <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-700 flex items-center justify-between">
        <span>Source Control</span>
        <div className="flex items-center gap-1">
          <button className="p-1 hover:bg-gray-700 rounded" title="Refresh">
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Branch info */}
      <div className="px-3 py-2 border-b border-gray-700 flex items-center gap-2 text-sm">
        <GitBranch className="h-4 w-4 text-gray-400" />
        <span className="text-gray-300">main</span>
        <span className="text-gray-600">↑2 ↓0</span>
      </div>

      {/* Commit message input */}
      <div className="p-2 border-b border-gray-700">
        <Input
          value={commitMessage}
          onChange={(e) => setCommitMessage(e.target.value)}
          placeholder="Message (Ctrl+Enter to commit)"
          className="h-8 bg-gray-800 border-gray-700 text-sm"
        />
        <Button
          size="sm"
          className="w-full mt-2 bg-blue-600 hover:bg-blue-700"
          disabled={!commitMessage.trim() || stagedChanges.length === 0}
        >
          <Check className="h-4 w-4 mr-2" />
          Commit
        </Button>
      </div>

      {/* Changes list */}
      <div className="flex-1 overflow-auto">
        {/* Staged changes */}
        {stagedChanges.length > 0 && (
          <div>
            <button
              onClick={() => toggleSection('staged')}
              className="w-full flex items-center gap-1 px-2 py-1.5 text-xs font-medium text-gray-400 hover:bg-gray-800"
            >
              {expandedSections.staged ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
              <span>Staged Changes</span>
              <span className="ml-auto text-gray-600">{stagedChanges.length}</span>
            </button>

            {expandedSections.staged && (
              <div>
                {stagedChanges.map((change) => (
                  <div
                    key={change.path}
                    className="flex items-center gap-2 px-4 py-1 text-sm hover:bg-gray-800 group"
                  >
                    {getStatusIcon(change.status)}
                    <span className="flex-1 truncate text-gray-300">
                      {change.path.split('/').pop()}
                    </span>
                    <span className={cn(
                      'text-xs font-mono',
                      change.status === 'modified' && 'text-yellow-500',
                      change.status === 'added' && 'text-green-500',
                      change.status === 'deleted' && 'text-red-500',
                    )}>
                      {getStatusLabel(change.status)}
                    </span>
                    <button
                      className="p-1 opacity-0 group-hover:opacity-100 hover:bg-gray-700 rounded"
                      title="Unstage"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Unstaged changes */}
        {unstagedChanges.length > 0 && (
          <div>
            <button
              onClick={() => toggleSection('changes')}
              className="w-full flex items-center gap-1 px-2 py-1.5 text-xs font-medium text-gray-400 hover:bg-gray-800"
            >
              {expandedSections.changes ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
              <span>Changes</span>
              <span className="ml-auto text-gray-600">{unstagedChanges.length}</span>
            </button>

            {expandedSections.changes && (
              <div>
                {unstagedChanges.map((change) => (
                  <div
                    key={change.path}
                    className="flex items-center gap-2 px-4 py-1 text-sm hover:bg-gray-800 group"
                  >
                    {getStatusIcon(change.status)}
                    <span className="flex-1 truncate text-gray-300">
                      {change.path.split('/').pop()}
                    </span>
                    <span className={cn(
                      'text-xs font-mono',
                      change.status === 'modified' && 'text-yellow-500',
                      change.status === 'added' && 'text-green-500',
                      change.status === 'deleted' && 'text-red-500',
                    )}>
                      {getStatusLabel(change.status)}
                    </span>
                    <button
                      className="p-1 opacity-0 group-hover:opacity-100 hover:bg-gray-700 rounded"
                      title="Stage"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {stagedChanges.length === 0 && unstagedChanges.length === 0 && (
          <div className="p-4 text-center text-gray-500 text-sm">
            変更はありません
          </div>
        )}
      </div>
    </div>
  )
}
