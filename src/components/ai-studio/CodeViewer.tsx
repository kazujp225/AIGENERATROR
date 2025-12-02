'use client'

import { X, Code2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { FileNode } from '@/types/ai-studio'

type CodeViewerProps = {
  file: FileNode | null
  content: string
  onClose: () => void
}

export function CodeViewer({ file, content, onClose }: CodeViewerProps) {
  if (!file) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-900 text-gray-500">
        <div className="text-center">
          <Code2 className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p className="text-sm">ファイルを選択してください</p>
        </div>
      </div>
    )
  }

  const lines = content.split('\n')

  const getLanguageLabel = (language?: string) => {
    const labels: Record<string, string> = {
      typescript: 'TypeScript',
      javascript: 'JavaScript',
      json: 'JSON',
      markdown: 'Markdown',
    }
    return labels[language || ''] || 'Plain Text'
  }

  return (
    <div className="h-full flex flex-col bg-gray-900">
      {/* Tab bar */}
      <div className="flex items-center border-b border-gray-700 bg-gray-800/50">
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-900 border-r border-gray-700">
          <span className="text-sm text-gray-300">{file.name}</span>
          <button
            onClick={onClose}
            className="p-0.5 hover:bg-gray-700 rounded transition-colors"
          >
            <X className="h-3.5 w-3.5 text-gray-500 hover:text-gray-300" />
          </button>
        </div>
        <div className="flex-1" />
        <div className="px-3 text-xs text-gray-500">
          {getLanguageLabel(file.language)}
        </div>
      </div>

      {/* Code content */}
      <div className="flex-1 overflow-auto">
        <div className="flex min-h-full">
          {/* Line numbers */}
          <div className="flex-shrink-0 px-3 py-2 bg-gray-800/30 text-right select-none border-r border-gray-800">
            {lines.map((_, index) => (
              <div
                key={index}
                className="text-xs text-gray-600 font-mono leading-5"
              >
                {index + 1}
              </div>
            ))}
          </div>

          {/* Code */}
          <div className="flex-1 p-2 overflow-x-auto">
            <pre className="font-mono text-sm leading-5">
              {lines.map((line, index) => (
                <div key={index} className="hover:bg-gray-800/30">
                  <code className={cn(
                    'text-gray-300',
                    // Basic syntax highlighting
                    line.includes('import') && 'text-purple-400',
                    line.includes('export') && 'text-purple-400',
                    line.includes('function') && 'text-blue-400',
                    line.includes('const ') && 'text-blue-400',
                    line.includes('return') && 'text-purple-400',
                    line.trimStart().startsWith('//') && 'text-gray-500 italic',
                  )}>
                    {highlightCode(line)}
                  </code>
                </div>
              ))}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}

// Simple syntax highlighting
function highlightCode(line: string): React.ReactNode {
  // String literals
  const stringPattern = /(["'`])(?:(?!\1)[^\\]|\\.)*\1/g
  // Keywords
  const keywordPattern = /\b(import|export|from|const|let|var|function|return|if|else|async|await|try|catch|finally|throw|new|class|extends|implements|interface|type|enum|public|private|protected|static|readonly)\b/g

  const parts: React.ReactNode[] = []
  let lastIndex = 0

  // Find and replace strings
  const result = line.replace(stringPattern, (match, _quote, offset) => {
    if (offset > lastIndex) {
      parts.push(line.slice(lastIndex, offset))
    }
    parts.push(
      <span key={offset} className="text-green-400">
        {match}
      </span>
    )
    lastIndex = offset + match.length
    return ''
  })

  if (parts.length === 0) {
    // No strings found, check for keywords
    return line.replace(keywordPattern, (match) => {
      return match // The highlighting is done via className above
    })
  }

  if (lastIndex < line.length) {
    parts.push(line.slice(lastIndex))
  }

  return parts.length > 0 ? <>{parts}</> : line
}
