'use client'

import { useState } from 'react'
import {
  AlertTriangle,
  AlertCircle,
  Info,
  ChevronDown,
  ChevronRight,
  File,
} from 'lucide-react'
import { cn } from '@/lib/utils'

type Severity = 'error' | 'warning' | 'info'

type Problem = {
  id: string
  severity: Severity
  message: string
  file: string
  line: number
  column: number
  source: string
}

const mockProblems: Problem[] = [
  {
    id: 'p1',
    severity: 'error',
    message: "Property 'email' does not exist on type '{}'",
    file: '/src/components/auth/LoginForm.tsx',
    line: 15,
    column: 12,
    source: 'typescript',
  },
  {
    id: 'p2',
    severity: 'warning',
    message: "'password' is assigned a value but never used",
    file: '/src/components/auth/LoginForm.tsx',
    line: 16,
    column: 9,
    source: 'eslint',
  },
  {
    id: 'p3',
    severity: 'warning',
    message: "Missing return type on function",
    file: '/src/lib/utils.ts',
    line: 8,
    column: 1,
    source: 'typescript',
  },
  {
    id: 'p4',
    severity: 'info',
    message: "Consider using optional chaining",
    file: '/src/app/page.tsx',
    line: 42,
    column: 5,
    source: 'eslint',
  },
]

type ProblemsPanelProps = {
  onProblemClick?: (file: string, line: number) => void
}

export function ProblemsPanel({ onProblemClick }: ProblemsPanelProps) {
  const [filter, setFilter] = useState<Severity | 'all'>('all')
  const [expandedFiles, setExpandedFiles] = useState<Set<string>>(
    new Set(mockProblems.map(p => p.file))
  )

  const filteredProblems = filter === 'all'
    ? mockProblems
    : mockProblems.filter(p => p.severity === filter)

  const groupedProblems = filteredProblems.reduce((acc, problem) => {
    if (!acc[problem.file]) acc[problem.file] = []
    acc[problem.file].push(problem)
    return acc
  }, {} as Record<string, Problem[]>)

  const toggleFile = (file: string) => {
    const newExpanded = new Set(expandedFiles)
    if (newExpanded.has(file)) {
      newExpanded.delete(file)
    } else {
      newExpanded.add(file)
    }
    setExpandedFiles(newExpanded)
  }

  const getSeverityIcon = (severity: Severity) => {
    switch (severity) {
      case 'error':
        return <AlertCircle className="h-3.5 w-3.5 text-red-500" />
      case 'warning':
        return <AlertTriangle className="h-3.5 w-3.5 text-yellow-500" />
      case 'info':
        return <Info className="h-3.5 w-3.5 text-blue-500" />
    }
  }

  const errorCount = mockProblems.filter(p => p.severity === 'error').length
  const warningCount = mockProblems.filter(p => p.severity === 'warning').length
  const infoCount = mockProblems.filter(p => p.severity === 'info').length

  return (
    <div className="h-full bg-gray-900 text-gray-300 flex flex-col">
      {/* Header */}
      <div className="px-3 py-2 border-b border-gray-700 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
          <AlertTriangle className="h-4 w-4" />
          <span>Problems</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setFilter(filter === 'error' ? 'all' : 'error')}
            className={cn(
              'flex items-center gap-1 px-1.5 py-0.5 rounded',
              filter === 'error' ? 'bg-red-500/20' : 'hover:bg-gray-800'
            )}
          >
            <AlertCircle className="h-3 w-3 text-red-500" />
            <span>{errorCount}</span>
          </button>
          <button
            onClick={() => setFilter(filter === 'warning' ? 'all' : 'warning')}
            className={cn(
              'flex items-center gap-1 px-1.5 py-0.5 rounded',
              filter === 'warning' ? 'bg-yellow-500/20' : 'hover:bg-gray-800'
            )}
          >
            <AlertTriangle className="h-3 w-3 text-yellow-500" />
            <span>{warningCount}</span>
          </button>
          <button
            onClick={() => setFilter(filter === 'info' ? 'all' : 'info')}
            className={cn(
              'flex items-center gap-1 px-1.5 py-0.5 rounded',
              filter === 'info' ? 'bg-blue-500/20' : 'hover:bg-gray-800'
            )}
          >
            <Info className="h-3 w-3 text-blue-500" />
            <span>{infoCount}</span>
          </button>
        </div>
      </div>

      {/* Problems list */}
      <div className="flex-1 overflow-auto">
        {Object.entries(groupedProblems).map(([file, problems]) => (
          <div key={file}>
            <button
              onClick={() => toggleFile(file)}
              className="w-full flex items-center gap-1 px-2 py-1 text-xs hover:bg-gray-800 transition-colors"
            >
              {expandedFiles.has(file) ? (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-500" />
              )}
              <File className="h-3.5 w-3.5 text-gray-400" />
              <span className="text-gray-300 truncate">{file.split('/').pop()}</span>
              <span className="text-gray-600 ml-auto">{problems.length}</span>
            </button>

            {expandedFiles.has(file) && (
              <div className="ml-4 border-l border-gray-800">
                {problems.map((problem) => (
                  <button
                    key={problem.id}
                    onClick={() => onProblemClick?.(problem.file, problem.line)}
                    className="w-full text-left px-3 py-1 text-xs hover:bg-gray-800 flex items-start gap-2"
                  >
                    {getSeverityIcon(problem.severity)}
                    <div className="flex-1 min-w-0">
                      <div className="text-gray-300 truncate">{problem.message}</div>
                      <div className="text-gray-600">
                        [{problem.source}] Ln {problem.line}, Col {problem.column}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {filteredProblems.length === 0 && (
          <div className="p-4 text-center text-gray-500 text-sm">
            No problems found
          </div>
        )}
      </div>
    </div>
  )
}
