'use client'

import { useState } from 'react'
import {
  Code2,
  Eye,
  FileText,
  Copy,
  Check,
  Download,
  ChevronRight,
  Sparkles,
  MessageSquare,
  Lightbulb,
  X,
  Send,
  Maximize2,
  Minimize2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Artifact, ArtifactFile, CodeExplanation } from '@/types/ai-studio'

type ViewMode = 'preview' | 'code'

type ArtifactPanelProps = {
  artifact: Artifact | null
  explanations?: CodeExplanation[]
  onModificationRequest?: (request: string, targetFile?: string) => void
  isGenerating?: boolean
}

function CodeBlock({
  content,
  language,
  explanations,
  showExplanations,
}: {
  content: string
  language: string
  explanations?: CodeExplanation[]
  showExplanations: boolean
}) {
  const [copiedLine, setCopiedLine] = useState<number | null>(null)
  const [hoveredExplanation, setHoveredExplanation] = useState<CodeExplanation | null>(null)
  const lines = content.split('\n')

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
    <div className="relative font-mono text-sm">
      {/* Explanation Tooltip */}
      {hoveredExplanation && showExplanations && (
        <div className="absolute left-0 right-0 top-0 z-10 p-3 bg-blue-50 border-b border-blue-200 flex items-start gap-2">
          <Lightbulb className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-800">{hoveredExplanation.explanation}</p>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <tbody>
            {lines.map((line, idx) => {
              const lineNum = idx + 1
              const explanation = getExplanationForLine(lineNum)
              const isHighlighted = explanation && showExplanations

              return (
                <tr
                  key={idx}
                  className={cn(
                    'group hover:bg-gray-100/50 transition-colors',
                    isHighlighted && 'bg-blue-50/50'
                  )}
                  onMouseEnter={() => explanation && setHoveredExplanation(explanation)}
                  onMouseLeave={() => setHoveredExplanation(null)}
                >
                  {/* Line Number */}
                  <td className="w-12 text-right pr-4 text-gray-400 select-none align-top py-0.5">
                    {lineNum}
                  </td>

                  {/* Explanation Indicator */}
                  {showExplanations && (
                    <td className="w-6 align-top py-0.5">
                      {explanation && (
                        <Lightbulb className="h-3 w-3 text-blue-500" />
                      )}
                    </td>
                  )}

                  {/* Code */}
                  <td className="whitespace-pre py-0.5 text-gray-800">
                    {line || ' '}
                  </td>

                  {/* Copy Button */}
                  <td className="w-10 align-top py-0.5">
                    <button
                      onClick={() => copyLine(lineNum, line)}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded transition-all"
                    >
                      {copiedLine === lineNum ? (
                        <Check className="h-3 w-3 text-green-600" />
                      ) : (
                        <Copy className="h-3 w-3 text-gray-400" />
                      )}
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function ModificationChat({
  onSend,
  isOpen,
  onClose,
}: {
  onSend: (message: string) => void
  isOpen: boolean
  onClose: () => void
}) {
  const [message, setMessage] = useState('')

  if (!isOpen) return null

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim())
      setMessage('')
    }
  }

  const suggestions = [
    '予算を増やして、より高精度なAIにしてください',
    'スケジュールを2ヶ月短縮できますか？',
    'リアルタイム通知機能を追加してください',
    'セキュリティ要件を強化してください',
  ]

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t shadow-lg">
      <div className="p-3 border-b flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <MessageSquare className="h-4 w-4" />
          修正をリクエスト
        </div>
        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
          <X className="h-4 w-4 text-gray-400" />
        </button>
      </div>

      {/* Suggestions */}
      <div className="p-3 border-b">
        <p className="text-xs text-gray-500 mb-2">よく使われる修正リクエスト:</p>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion, idx) => (
            <button
              key={idx}
              onClick={() => setMessage(suggestion)}
              className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-3 flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="変更したい内容を入力..."
          className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <Button onClick={handleSend} disabled={!message.trim()} size="sm">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export function ArtifactPanel({
  artifact,
  explanations,
  onModificationRequest,
  isGenerating,
}: ArtifactPanelProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('preview')
  const [selectedFile, setSelectedFile] = useState<ArtifactFile | null>(null)
  const [showExplanations, setShowExplanations] = useState(true)
  const [isModificationOpen, setIsModificationOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  // Set first file as selected when artifact loads
  if (artifact && !selectedFile && artifact.files.length > 0) {
    setSelectedFile(artifact.files[0])
  }

  if (!artifact) {
    return (
      <div className="h-full bg-white flex flex-col">
        <div className="px-4 py-3 border-b">
          <div className="flex items-center gap-2 text-gray-700">
            <Code2 className="h-5 w-5 text-indigo-600" />
            <span className="font-semibold">生成物</span>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center text-gray-400">
            <Sparkles className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">要件に基づいて</p>
            <p className="text-sm">仕様書やコードが生成されます</p>
          </div>
        </div>
      </div>
    )
  }

  const copyAllCode = () => {
    if (selectedFile) {
      navigator.clipboard.writeText(selectedFile.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const downloadFile = () => {
    if (selectedFile) {
      const blob = new Blob([selectedFile.content], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = selectedFile.name
      a.click()
      URL.revokeObjectURL(url)
    }
  }

  return (
    <div className={cn(
      'bg-white flex flex-col',
      isExpanded ? 'fixed inset-4 z-50 rounded-xl shadow-2xl' : 'h-full'
    )}>
      {/* Header */}
      <div className="px-4 py-3 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-gray-700">
            <Code2 className="h-5 w-5 text-indigo-600" />
            <span className="font-semibold">{artifact.title}</span>
          </div>
          {isGenerating && (
            <span className="flex items-center gap-1 text-xs text-blue-600 animate-pulse">
              <Sparkles className="h-3 w-3" />
              生成中...
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-0.5">
            <button
              onClick={() => setViewMode('preview')}
              className={cn(
                'px-3 py-1 text-xs rounded-md transition-all',
                viewMode === 'preview'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              )}
            >
              <Eye className="h-3 w-3 inline mr-1" />
              プレビュー
            </button>
            <button
              onClick={() => setViewMode('code')}
              className={cn(
                'px-3 py-1 text-xs rounded-md transition-all',
                viewMode === 'code'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              )}
            >
              <Code2 className="h-3 w-3 inline mr-1" />
              コード
            </button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-8 w-8 p-0"
          >
            {isExpanded ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* File Tabs */}
      <div className="flex border-b bg-gray-50 overflow-x-auto">
        {artifact.files.map((file) => (
          <button
            key={file.id}
            onClick={() => setSelectedFile(file)}
            className={cn(
              'flex items-center gap-2 px-4 py-2 text-sm border-b-2 transition-colors whitespace-nowrap',
              selectedFile?.id === file.id
                ? 'border-indigo-600 text-indigo-600 bg-white'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            )}
          >
            <FileText className="h-3.5 w-3.5" />
            {file.name}
          </button>
        ))}
      </div>

      {/* Toolbar */}
      {viewMode === 'code' && selectedFile && (
        <div className="flex items-center justify-between px-4 py-2 border-b bg-gray-50">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                checked={showExplanations}
                onChange={(e) => setShowExplanations(e.target.checked)}
                className="rounded"
              />
              <Lightbulb className="h-3 w-3" />
              解説を表示
            </label>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={copyAllCode}>
              {copied ? (
                <>
                  <Check className="h-3 w-3 mr-1 text-green-600" />
                  コピー済み
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3 mr-1" />
                  コピー
                </>
              )}
            </Button>
            <Button variant="ghost" size="sm" onClick={downloadFile}>
              <Download className="h-3 w-3 mr-1" />
              ダウンロード
            </Button>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-auto relative">
        {viewMode === 'preview' && selectedFile && (
          <div className="p-6">
            {/* File Explanation */}
            {selectedFile.explanation && (
              <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex items-start gap-2">
                  <Lightbulb className="h-4 w-4 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">このファイルについて</p>
                    <p className="text-sm text-blue-700 mt-1">{selectedFile.explanation}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Rendered Preview */}
            <div className="prose prose-sm max-w-none">
              {selectedFile.language === 'markdown' ? (
                <div className="whitespace-pre-wrap">{selectedFile.content}</div>
              ) : (
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-gray-100 text-sm">
                    <code>{selectedFile.content}</code>
                  </pre>
                </div>
              )}
            </div>
          </div>
        )}

        {viewMode === 'code' && selectedFile && (
          <CodeBlock
            content={selectedFile.content}
            language={selectedFile.language}
            explanations={explanations}
            showExplanations={showExplanations}
          />
        )}

        {/* Modification Chat */}
        <ModificationChat
          isOpen={isModificationOpen}
          onClose={() => setIsModificationOpen(false)}
          onSend={(msg) => {
            onModificationRequest?.(msg, selectedFile?.path)
            setIsModificationOpen(false)
          }}
        />
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t bg-gray-50 flex items-center justify-between">
        <div className="text-xs text-gray-500">
          バージョン {artifact.version} • 最終更新: {artifact.updatedAt.toLocaleString('ja-JP')}
        </div>

        <Button
          size="sm"
          onClick={() => setIsModificationOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          <MessageSquare className="h-3.5 w-3.5 mr-1" />
          修正をリクエスト
        </Button>
      </div>
    </div>
  )
}
