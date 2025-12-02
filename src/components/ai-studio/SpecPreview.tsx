'use client'

import { useState } from 'react'
import { FileText, Download, Edit2, CheckCircle2, Circle, AlertCircle, ChevronRight, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { SpecDocument } from '@/types/ai-studio'

type SpecPreviewProps = {
  spec: SpecDocument | null
  onEdit?: (sectionId: string) => void
  onDownload?: () => void
}

export function SpecPreview({ spec, onEdit, onDownload }: SpecPreviewProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  if (!spec) {
    return (
      <div className="h-full bg-white flex flex-col">
        <div className="px-4 py-3 border-b">
          <div className="flex items-center gap-2 text-gray-700">
            <FileText className="h-5 w-5 text-purple-600" />
            <span className="font-semibold">仕様書プレビュー</span>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center text-gray-400">
            <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">要件が確定すると</p>
            <p className="text-sm">仕様書が自動生成されます</p>
          </div>
        </div>
      </div>
    )
  }

  const statusIcons = {
    complete: <CheckCircle2 className="h-4 w-4 text-green-500" />,
    draft: <AlertCircle className="h-4 w-4 text-yellow-500" />,
    empty: <Circle className="h-4 w-4 text-gray-300" />,
  }

  const statusLabels = {
    complete: '完了',
    draft: '下書き',
    empty: '未入力',
  }

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-700">
          <FileText className="h-5 w-5 text-purple-600" />
          <span className="font-semibold">仕様書プレビュー</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onDownload}
          className="text-gray-500 hover:text-gray-700"
        >
          <Download className="h-4 w-4 mr-1" />
          DL
        </Button>
      </div>

      {/* Progress */}
      <div className="px-4 py-3 border-b bg-purple-50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">完成度</span>
          <span className="text-sm font-bold text-purple-600">{spec.completionRate}%</span>
        </div>
        <div className="h-2 bg-purple-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-500"
            style={{ width: `${spec.completionRate}%` }}
          />
        </div>
      </div>

      {/* Project Name */}
      <div className="px-4 py-3 border-b">
        <p className="text-xs text-gray-500 mb-1">プロジェクト名</p>
        <p className="font-medium text-gray-900">{spec.projectName || '(未設定)'}</p>
      </div>

      {/* Sections */}
      <div className="flex-1 overflow-y-auto">
        <div className="divide-y">
          {spec.sections.map((section) => (
            <div key={section.id} className="p-4">
              <button
                onClick={() => setExpandedSection(
                  expandedSection === section.id ? null : section.id
                )}
                className="w-full flex items-center justify-between group"
              >
                <div className="flex items-center gap-2">
                  {statusIcons[section.status]}
                  <span className="font-medium text-gray-700">{section.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={cn(
                    'text-xs px-2 py-0.5 rounded',
                    section.status === 'complete' && 'bg-green-100 text-green-700',
                    section.status === 'draft' && 'bg-yellow-100 text-yellow-700',
                    section.status === 'empty' && 'bg-gray-100 text-gray-500',
                  )}>
                    {statusLabels[section.status]}
                  </span>
                  <ChevronRight className={cn(
                    'h-4 w-4 text-gray-400 transition-transform',
                    expandedSection === section.id && 'rotate-90'
                  )} />
                </div>
              </button>

              {expandedSection === section.id && (
                <div className="mt-3 pl-6">
                  {section.content ? (
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">
                        {section.content}
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400 italic">
                      この項目はまだ入力されていません
                    </p>
                  )}

                  {onEdit && (
                    <button
                      onClick={() => onEdit(section.id)}
                      className="mt-2 flex items-center gap-1 text-xs text-purple-600 hover:text-purple-700"
                    >
                      <Edit2 className="h-3 w-3" />
                      編集する
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 border-t bg-gray-50">
        <Button
          variant="outline"
          className="w-full"
          onClick={onDownload}
        >
          <Eye className="h-4 w-4 mr-2" />
          仕様書を確認・ダウンロード
        </Button>
      </div>
    </div>
  )
}
