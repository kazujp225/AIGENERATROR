'use client'

import { Lightbulb, Clock, Coins, ChevronRight, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { SimilarCase } from '@/types/ai-studio'

type SimilarCasesPanelProps = {
  cases: SimilarCase[]
  onViewCase?: (caseId: string) => void
}

function formatPrice(price: number): string {
  if (price >= 10000000) {
    return `${(price / 10000000).toFixed(1)}千万円`
  }
  if (price >= 10000) {
    return `${Math.round(price / 10000)}万円`
  }
  return `${price.toLocaleString()}円`
}

export function SimilarCasesPanel({ cases, onViewCase }: SimilarCasesPanelProps) {
  if (cases.length === 0) {
    return (
      <div className="bg-white border rounded-xl p-4">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          <h3 className="font-semibold text-gray-900">類似事例</h3>
        </div>
        <div className="text-center text-gray-400 py-8">
          <Lightbulb className="h-10 w-10 mx-auto mb-2 opacity-50" />
          <p className="text-sm">要件に合った事例が表示されます</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white border rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b flex items-center gap-2">
        <Lightbulb className="h-5 w-5 text-yellow-500" />
        <h3 className="font-semibold text-gray-900">類似事例</h3>
        <span className="text-xs text-gray-500 ml-auto">参考になる実績</span>
      </div>

      {/* Cases List */}
      <div className="divide-y">
        {cases.map((caseItem) => (
          <button
            key={caseItem.id}
            onClick={() => onViewCase?.(caseItem.id)}
            className="w-full p-4 text-left hover:bg-gray-50 transition-colors group"
          >
            <div className="flex gap-4">
              {/* Thumbnail */}
              <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                {caseItem.thumbnail ? (
                  <img
                    src={caseItem.thumbnail}
                    alt={caseItem.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <Lightbulb className="h-8 w-8" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {caseItem.title}
                    </h4>
                    <span className="text-xs text-gray-500">{caseItem.industry}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 flex-shrink-0" />
                </div>

                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {caseItem.description}
                </p>

                {/* Metadata */}
                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Coins className="h-3 w-3" />
                    {formatPrice(caseItem.cost)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {caseItem.duration}
                  </span>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1 mt-2">
                  {caseItem.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {caseItem.technologies.length > 3 && (
                    <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-500 rounded">
                      +{caseItem.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t bg-gray-50">
        <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 flex items-center justify-center gap-1">
          すべての事例を見る
          <ExternalLink className="h-3 w-3" />
        </button>
      </div>
    </div>
  )
}
