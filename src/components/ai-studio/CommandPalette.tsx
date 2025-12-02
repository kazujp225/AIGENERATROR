'use client'

import { useState, useEffect, useRef } from 'react'
import {
  Search,
  File,
  Settings,
  Play,
  GitBranch,
  Terminal,
  Bot,
  FolderOpen,
  Save,
  RotateCcw,
} from 'lucide-react'
import { cn } from '@/lib/utils'

type Command = {
  id: string
  label: string
  shortcut?: string
  icon: React.ReactNode
  category: string
  action: () => void
}

type CommandPaletteProps = {
  isOpen: boolean
  onClose: () => void
  commands?: Command[]
}

const defaultCommands: Omit<Command, 'action'>[] = [
  { id: 'open-file', label: 'Open File...', shortcut: '⌘P', icon: <File className="h-4 w-4" />, category: 'File' },
  { id: 'open-folder', label: 'Open Folder...', shortcut: '⌘O', icon: <FolderOpen className="h-4 w-4" />, category: 'File' },
  { id: 'save', label: 'Save', shortcut: '⌘S', icon: <Save className="h-4 w-4" />, category: 'File' },
  { id: 'run-agent', label: 'Start AI Agent', shortcut: '⌘⏎', icon: <Bot className="h-4 w-4" />, category: 'Agent' },
  { id: 'stop-agent', label: 'Stop AI Agent', shortcut: '⌘.', icon: <Bot className="h-4 w-4" />, category: 'Agent' },
  { id: 'open-terminal', label: 'Open Terminal', shortcut: '⌘`', icon: <Terminal className="h-4 w-4" />, category: 'View' },
  { id: 'git-commit', label: 'Git: Commit', icon: <GitBranch className="h-4 w-4" />, category: 'Git' },
  { id: 'git-push', label: 'Git: Push', icon: <GitBranch className="h-4 w-4" />, category: 'Git' },
  { id: 'run-build', label: 'Run Build', shortcut: '⌘B', icon: <Play className="h-4 w-4" />, category: 'Build' },
  { id: 'settings', label: 'Open Settings', shortcut: '⌘,', icon: <Settings className="h-4 w-4" />, category: 'Settings' },
  { id: 'reload', label: 'Reload Window', shortcut: '⌘R', icon: <RotateCcw className="h-4 w-4" />, category: 'View' },
]

export function CommandPalette({ isOpen, onClose, commands = [] }: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const allCommands = [
    ...defaultCommands.map(c => ({ ...c, action: () => console.log(c.id) })),
    ...commands,
  ]

  const filteredCommands = allCommands.filter(cmd =>
    cmd.label.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  )

  const groupedCommands = filteredCommands.reduce((acc, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = []
    acc[cmd.category].push(cmd)
    return acc
  }, {} as Record<string, Command[]>)

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
      setQuery('')
      setSelectedIndex(0)
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex(prev => Math.min(prev + 1, filteredCommands.length - 1))
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex(prev => Math.max(prev - 1, 0))
          break
        case 'Enter':
          e.preventDefault()
          if (filteredCommands[selectedIndex]) {
            filteredCommands[selectedIndex].action()
            onClose()
          }
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, filteredCommands, selectedIndex, onClose])

  // Scroll selected item into view
  useEffect(() => {
    const selectedElement = listRef.current?.querySelector('[data-selected="true"]')
    selectedElement?.scrollIntoView({ block: 'nearest' })
  }, [selectedIndex])

  if (!isOpen) return null

  let itemIndex = 0

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Palette */}
      <div className="relative w-full max-w-xl bg-gray-900 rounded-lg shadow-2xl border border-gray-700 overflow-hidden">
        {/* Search input */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-700">
          <Search className="h-5 w-5 text-gray-500" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0) }}
            placeholder="Type a command or search..."
            className="flex-1 bg-transparent text-gray-200 placeholder-gray-500 focus:outline-none text-sm"
          />
          <kbd className="px-1.5 py-0.5 bg-gray-800 text-gray-500 text-xs rounded">ESC</kbd>
        </div>

        {/* Commands list */}
        <div ref={listRef} className="max-h-80 overflow-auto py-2">
          {Object.entries(groupedCommands).map(([category, cmds]) => (
            <div key={category}>
              <div className="px-4 py-1 text-xs text-gray-500 font-medium">
                {category}
              </div>
              {cmds.map((cmd) => {
                const currentIndex = itemIndex++
                const isSelected = currentIndex === selectedIndex
                return (
                  <button
                    key={cmd.id}
                    data-selected={isSelected}
                    onClick={() => { cmd.action(); onClose() }}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors',
                      isSelected ? 'bg-blue-600/30 text-white' : 'text-gray-300 hover:bg-gray-800'
                    )}
                  >
                    <span className="text-gray-400">{cmd.icon}</span>
                    <span className="flex-1 text-left">{cmd.label}</span>
                    {cmd.shortcut && (
                      <kbd className="px-1.5 py-0.5 bg-gray-800 text-gray-500 text-xs rounded font-mono">
                        {cmd.shortcut}
                      </kbd>
                    )}
                  </button>
                )
              })}
            </div>
          ))}

          {filteredCommands.length === 0 && (
            <div className="px-4 py-8 text-center text-gray-500">
              No commands found
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
