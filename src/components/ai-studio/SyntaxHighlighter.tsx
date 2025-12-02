'use client'

import { useState } from 'react'
import { Copy, Check, Lightbulb } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { CodeExplanation } from '@/types/ai-studio'

type SyntaxHighlighterProps = {
  code: string
  language: string
  explanations?: CodeExplanation[]
  showLineNumbers?: boolean
  showExplanations?: boolean
}

// Simple syntax highlighting for YAML, Markdown, and JSON
function highlightSyntax(line: string, language: string): React.ReactNode {
  if (language === 'yaml') {
    // Comments
    if (line.trim().startsWith('#')) {
      return <span className="text-gray-500 italic">{line}</span>
    }

    // Key-value pairs
    const keyMatch = line.match(/^(\s*)([a-zA-Z_-]+)(:)(.*)$/)
    if (keyMatch) {
      const [, indent, key, colon, value] = keyMatch
      return (
        <>
          {indent}
          <span className="text-purple-600 font-medium">{key}</span>
          <span className="text-gray-500">{colon}</span>
          {highlightValue(value, language)}
        </>
      )
    }

    // List items
    if (line.trim().startsWith('-')) {
      const match = line.match(/^(\s*)(-)(.*)$/)
      if (match) {
        const [, indent, dash, rest] = match
        return (
          <>
            {indent}
            <span className="text-orange-500">{dash}</span>
            {highlightValue(rest, language)}
          </>
        )
      }
    }
  }

  if (language === 'markdown') {
    // Headers
    if (line.startsWith('#')) {
      return <span className="text-blue-600 font-bold">{line}</span>
    }
    // Code blocks
    if (line.startsWith('```')) {
      return <span className="text-gray-500">{line}</span>
    }
    // Bold
    if (line.includes('**')) {
      return <span className="font-semibold">{line}</span>
    }
    // List items
    if (line.trim().startsWith('-') || line.trim().startsWith('*')) {
      return <span className="text-gray-700">{line}</span>
    }
    // Table
    if (line.includes('|')) {
      return <span className="text-teal-600">{line}</span>
    }
  }

  return line
}

function highlightValue(value: string, language: string): React.ReactNode {
  if (!value.trim()) return value

  // Strings
  if (value.includes('"')) {
    return <span className="text-green-600">{value}</span>
  }

  // Numbers
  if (/^\s*\d+/.test(value)) {
    return <span className="text-blue-500">{value}</span>
  }

  // Booleans
  if (/^\s*(true|false)/.test(value)) {
    return <span className="text-orange-500">{value}</span>
  }

  return <span className="text-gray-700">{value}</span>
}

export function SyntaxHighlighter({
  code,
  language,
  explanations,
  showLineNumbers = true,
  showExplanations = true,
}: SyntaxHighlighterProps) {
  const [copiedLine, setCopiedLine] = useState<number | null>(null)
  const [hoveredExplanation, setHoveredExplanation] = useState<CodeExplanation | null>(null)
  const lines = code.split('\n')

  const copyLine = (lineNum: number, text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedLine(lineNum)
    setTimeout(() => setCopiedLine(null), 2000)
  }

  const getExplanationForLine = (lineNum: number) => {
    return explanations?.find(
      exp => lineNum >= exp.lineStart && lineNum <= exp.lineEnd
    )
  }

  return (
    <div className="relative bg-gray-50 rounded-lg overflow-hidden">
      {/* Floating Explanation */}
      {hoveredExplanation && showExplanations && (
        <div className="sticky top-0 z-10 p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg">
          <div className="flex items-start gap-2">
            <Lightbulb className="h-4 w-4 flex-shrink-0 mt-0.5" />
            <p className="text-sm">{hoveredExplanation.explanation}</p>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <pre className="p-4">
          <code className="text-sm leading-relaxed">
            {lines.map((line, idx) => {
              const lineNum = idx + 1
              const explanation = getExplanationForLine(lineNum)
              const isHighlighted = explanation && showExplanations
              const isExplanationStart = explanation && lineNum === explanation.lineStart

              return (
                <div
                  key={idx}
                  className={cn(
                    'group flex hover:bg-white/50 transition-colors rounded',
                    isHighlighted && 'bg-blue-50/50'
                  )}
                  onMouseEnter={() => explanation && setHoveredExplanation(explanation)}
                  onMouseLeave={() => setHoveredExplanation(null)}
                >
                  {/* Line Number */}
                  {showLineNumbers && (
                    <span className="w-12 text-right pr-4 text-gray-400 select-none flex-shrink-0 border-r border-gray-200 mr-4">
                      {lineNum}
                    </span>
                  )}

                  {/* Explanation Indicator */}
                  {showExplanations && (
                    <span className="w-6 flex-shrink-0">
                      {isExplanationStart && (
                        <Lightbulb className="h-4 w-4 text-blue-500" />
                      )}
                    </span>
                  )}

                  {/* Code */}
                  <span className="flex-1 whitespace-pre">
                    {highlightSyntax(line, language) || ' '}
                  </span>

                  {/* Copy Button */}
                  <button
                    onClick={() => copyLine(lineNum, line)}
                    className="opacity-0 group-hover:opacity-100 px-2 transition-opacity"
                  >
                    {copiedLine === lineNum ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              )
            })}
          </code>
        </pre>
      </div>
    </div>
  )
}
