'use client'

import { useRef, useEffect } from 'react'
import { Terminal, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { TerminalOutput } from '@/types/ai-studio'

type TerminalPanelProps = {
  outputs: TerminalOutput[]
}

function OutputLine({ output }: { output: TerminalOutput }) {
  const typeStyles = {
    command: 'text-green-400',
    output: 'text-gray-300',
    error: 'text-red-400',
    info: 'text-blue-400',
  }

  return (
    <div className={cn('font-mono text-sm', typeStyles[output.type])}>
      {output.type === 'command' ? (
        <div className="flex items-start gap-2">
          <ChevronRight className="h-4 w-4 mt-0.5 text-green-500 flex-shrink-0" />
          <span className="whitespace-pre-wrap break-all">{output.content}</span>
        </div>
      ) : (
        <div className="pl-6 whitespace-pre-wrap break-all">{output.content}</div>
      )}
    </div>
  )
}

export function TerminalPanel({ outputs }: TerminalPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [outputs])

  return (
    <div className="h-full flex flex-col bg-gray-950">
      {/* Header */}
      <div className="px-3 py-2 border-b border-gray-700 flex items-center gap-2 bg-gray-900">
        <Terminal className="h-4 w-4 text-gray-400" />
        <span className="text-xs font-medium text-gray-400">Terminal</span>
      </div>

      {/* Output */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-auto p-3 space-y-1"
      >
        {outputs.length === 0 ? (
          <div className="text-gray-600 text-sm font-mono">
            # Terminal output will appear here...
          </div>
        ) : (
          outputs.map((output) => (
            <OutputLine key={output.id} output={output} />
          ))
        )}
      </div>
    </div>
  )
}
