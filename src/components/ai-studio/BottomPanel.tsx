'use client'

import { useState } from 'react'
import { Terminal, AlertTriangle, FileText, Bug } from 'lucide-react'
import { cn } from '@/lib/utils'
import { TerminalPanel } from './TerminalPanel'
import { ProblemsPanel } from './ProblemsPanel'
import type { TerminalOutput } from '@/types/ai-studio'

type Tab = 'terminal' | 'problems' | 'output' | 'debug-console'

type BottomPanelProps = {
  terminalOutputs: TerminalOutput[]
  problemCount?: number
  onProblemClick?: (file: string, line: number) => void
}

export function BottomPanel({ terminalOutputs, problemCount = 3, onProblemClick }: BottomPanelProps) {
  const [activeTab, setActiveTab] = useState<Tab>('terminal')

  const tabs = [
    { id: 'problems' as const, label: 'Problems', icon: AlertTriangle, badge: problemCount },
    { id: 'output' as const, label: 'Output', icon: FileText },
    { id: 'terminal' as const, label: 'Terminal', icon: Terminal },
    { id: 'debug-console' as const, label: 'Debug Console', icon: Bug },
  ]

  return (
    <div className="h-full flex flex-col bg-gray-900">
      {/* Tab bar */}
      <div className="flex items-center border-b border-gray-700 bg-gray-800/50">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 text-xs border-b-2 transition-colors',
                isActive
                  ? 'text-white border-blue-500 bg-gray-900'
                  : 'text-gray-500 border-transparent hover:text-gray-300'
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{tab.label}</span>
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className={cn(
                  'px-1.5 py-0.5 rounded-full text-[10px] font-medium',
                  tab.id === 'problems' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-gray-700'
                )}>
                  {tab.badge}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'terminal' && (
          <TerminalPanel outputs={terminalOutputs} />
        )}
        {activeTab === 'problems' && (
          <ProblemsPanel onProblemClick={onProblemClick} />
        )}
        {activeTab === 'output' && (
          <div className="h-full p-3 font-mono text-xs text-gray-400">
            <div>[2024-11-20 10:00:00] Starting development server...</div>
            <div>[2024-11-20 10:00:01] Compiling...</div>
            <div className="text-green-400">[2024-11-20 10:00:02] Compiled successfully</div>
            <div>[2024-11-20 10:00:02] Ready on http://localhost:3000</div>
          </div>
        )}
        {activeTab === 'debug-console' && (
          <div className="h-full p-3 text-gray-500 text-sm">
            Debug console is inactive. Start debugging to use the console.
          </div>
        )}
      </div>
    </div>
  )
}
