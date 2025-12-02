'use client'

import { useState } from 'react'
import { BookOpen, Search, X, ExternalLink, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { GlossaryTerm } from '@/types/ai-studio'

type GlossaryPanelProps = {
  terms: GlossaryTerm[]
  isOpen: boolean
  onClose: () => void
  highlightTerm?: string
}

export function GlossaryPanel({ terms, isOpen, onClose, highlightTerm }: GlossaryPanelProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTerm, setSelectedTerm] = useState<string | null>(highlightTerm || null)

  const filteredTerms = terms.filter(term =>
    term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
    term.definition.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const selectedTermData = terms.find(t => t.term === selectedTerm)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative w-full max-w-2xl max-h-[80vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-600" />
            <h2 className="font-bold text-gray-900">用語集</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Search */}
        <div className="px-6 py-3 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="用語を検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex">
          {/* Term List */}
          <div className="w-1/3 border-r overflow-y-auto">
            {filteredTerms.map((term) => (
              <button
                key={term.term}
                onClick={() => setSelectedTerm(term.term)}
                className={cn(
                  'w-full px-4 py-3 text-left border-b transition-colors flex items-center justify-between',
                  selectedTerm === term.term
                    ? 'bg-blue-50 border-l-2 border-l-blue-600'
                    : 'hover:bg-gray-50'
                )}
              >
                <div>
                  <p className="font-medium text-gray-900">{term.term}</p>
                  {term.reading && (
                    <p className="text-xs text-gray-500">{term.reading}</p>
                  )}
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </button>
            ))}

            {filteredTerms.length === 0 && (
              <div className="p-4 text-center text-gray-400">
                <p className="text-sm">該当する用語がありません</p>
              </div>
            )}
          </div>

          {/* Term Detail */}
          <div className="flex-1 overflow-y-auto p-6">
            {selectedTermData ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {selectedTermData.term}
                  </h3>
                  {selectedTermData.reading && (
                    <p className="text-gray-500 mt-1">{selectedTermData.reading}</p>
                  )}
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    意味
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedTermData.definition}
                  </p>
                </div>

                {selectedTermData.example && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      具体例
                    </h4>
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <p className="text-gray-700">{selectedTermData.example}</p>
                    </div>
                  </div>
                )}

                {selectedTermData.relatedTerms && selectedTermData.relatedTerms.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      関連用語
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedTermData.relatedTerms.map((related) => (
                        <button
                          key={related}
                          onClick={() => {
                            const term = terms.find(t => t.term === related)
                            if (term) setSelectedTerm(related)
                          }}
                          className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors flex items-center gap-1"
                        >
                          {related}
                          <ExternalLink className="h-3 w-3" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>左から用語を選択してください</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
