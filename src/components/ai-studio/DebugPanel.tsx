'use client'

import { useState } from 'react'
import {
  Play,
  Pause,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  RotateCcw,
  ChevronDown,
  ChevronRight,
  Circle,
  Bug,
  Code2,
  Layers,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Breakpoint = {
  id: string
  file: string
  line: number
  enabled: boolean
}

type Variable = {
  name: string
  value: string
  type: string
}

type CallStackFrame = {
  id: string
  name: string
  file: string
  line: number
}

const mockBreakpoints: Breakpoint[] = [
  { id: 'bp1', file: '/src/app/page.tsx', line: 12, enabled: true },
  { id: 'bp2', file: '/src/lib/auth.ts', line: 25, enabled: true },
  { id: 'bp3', file: '/src/components/auth/LoginForm.tsx', line: 18, enabled: false },
]

const mockVariables: Variable[] = [
  { name: 'email', value: '"user@example.com"', type: 'string' },
  { name: 'password', value: '"********"', type: 'string' },
  { name: 'loading', value: 'false', type: 'boolean' },
  { name: 'error', value: 'null', type: 'null' },
]

const mockCallStack: CallStackFrame[] = [
  { id: 'cs1', name: 'handleSubmit', file: '/src/components/auth/LoginForm.tsx', line: 18 },
  { id: 'cs2', name: 'signIn', file: '/src/lib/auth.ts', line: 25 },
  { id: 'cs3', name: 'anonymous', file: '/src/app/page.tsx', line: 12 },
]

export function DebugPanel() {
  const [isDebugging, setIsDebugging] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [expandedSections, setExpandedSections] = useState({
    variables: true,
    callStack: true,
    breakpoints: true,
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  return (
    <div className="h-full bg-gray-900 text-gray-300 flex flex-col">
      {/* Header */}
      <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bug className="h-4 w-4" />
          <span>Debug</span>
        </div>
      </div>

      {/* Debug Controls */}
      <div className="p-2 border-b border-gray-700 flex items-center gap-1">
        {!isDebugging ? (
          <Button
            size="sm"
            onClick={() => { setIsDebugging(true); setIsPaused(true) }}
            className="flex-1 bg-green-600 hover:bg-green-700 h-7"
          >
            <Play className="h-3.5 w-3.5 mr-1" />
            Start
          </Button>
        ) : (
          <>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsPaused(!isPaused)}
              className="h-7 w-7 p-0 hover:bg-gray-700"
              title={isPaused ? 'Continue' : 'Pause'}
            >
              {isPaused ? <Play className="h-3.5 w-3.5 text-green-400" /> : <Pause className="h-3.5 w-3.5" />}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-7 w-7 p-0 hover:bg-gray-700"
              title="Step Over"
              disabled={!isPaused}
            >
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-7 w-7 p-0 hover:bg-gray-700"
              title="Step Into"
              disabled={!isPaused}
            >
              <ArrowDown className="h-3.5 w-3.5" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-7 w-7 p-0 hover:bg-gray-700"
              title="Step Out"
              disabled={!isPaused}
            >
              <ArrowUp className="h-3.5 w-3.5" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-7 w-7 p-0 hover:bg-gray-700"
              title="Restart"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => { setIsDebugging(false); setIsPaused(false) }}
              className="h-7 ml-auto"
            >
              Stop
            </Button>
          </>
        )}
      </div>

      {/* Debug Content */}
      <div className="flex-1 overflow-auto">
        {/* Variables */}
        <div className="border-b border-gray-800">
          <button
            onClick={() => toggleSection('variables')}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-400 hover:bg-gray-800"
          >
            {expandedSections.variables ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
            <Code2 className="h-4 w-4" />
            <span>Variables</span>
          </button>

          {expandedSections.variables && isDebugging && (
            <div className="px-3 pb-2">
              {mockVariables.map((variable) => (
                <div key={variable.name} className="flex items-center gap-2 py-1 text-xs">
                  <span className="text-blue-400">{variable.name}</span>
                  <span className="text-gray-600">=</span>
                  <span className={cn(
                    variable.type === 'string' && 'text-green-400',
                    variable.type === 'boolean' && 'text-purple-400',
                    variable.type === 'null' && 'text-gray-500',
                  )}>
                    {variable.value}
                  </span>
                </div>
              ))}
            </div>
          )}

          {expandedSections.variables && !isDebugging && (
            <div className="px-3 pb-2 text-xs text-gray-600">
              Not debugging
            </div>
          )}
        </div>

        {/* Call Stack */}
        <div className="border-b border-gray-800">
          <button
            onClick={() => toggleSection('callStack')}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-400 hover:bg-gray-800"
          >
            {expandedSections.callStack ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
            <Layers className="h-4 w-4" />
            <span>Call Stack</span>
          </button>

          {expandedSections.callStack && isDebugging && (
            <div className="pb-2">
              {mockCallStack.map((frame, idx) => (
                <button
                  key={frame.id}
                  className={cn(
                    'w-full text-left px-4 py-1 text-xs hover:bg-gray-800',
                    idx === 0 && 'bg-yellow-500/10'
                  )}
                >
                  <div className="text-gray-300">{frame.name}</div>
                  <div className="text-gray-600 text-[10px]">
                    {frame.file}:{frame.line}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Breakpoints */}
        <div>
          <button
            onClick={() => toggleSection('breakpoints')}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-400 hover:bg-gray-800"
          >
            {expandedSections.breakpoints ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
            <Circle className="h-4 w-4 text-red-500" />
            <span>Breakpoints</span>
            <span className="ml-auto text-gray-600">{mockBreakpoints.length}</span>
          </button>

          {expandedSections.breakpoints && (
            <div className="pb-2">
              {mockBreakpoints.map((bp) => (
                <div
                  key={bp.id}
                  className="flex items-center gap-2 px-4 py-1 text-xs hover:bg-gray-800 group"
                >
                  <input
                    type="checkbox"
                    checked={bp.enabled}
                    onChange={() => {}}
                    className="accent-red-500"
                  />
                  <Circle className={cn(
                    'h-2.5 w-2.5',
                    bp.enabled ? 'fill-red-500 text-red-500' : 'text-gray-600'
                  )} />
                  <span className="text-gray-400 truncate">
                    {bp.file.split('/').pop()}
                  </span>
                  <span className="text-gray-600">:{bp.line}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
