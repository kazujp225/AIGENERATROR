'use client'

import { useState } from 'react'
import { HelpCircle, ChevronDown, ChevronUp, MessageCircle, Phone, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

type HelpTopic = {
  id: string
  title: string
  content: string
}

type HelpPanelProps = {
  topics: HelpTopic[]
  onOpenChat?: () => void
}

export function HelpPanel({ topics, onOpenChat }: HelpPanelProps) {
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null)

  return (
    <div className="bg-white border rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b flex items-center gap-2">
        <HelpCircle className="h-5 w-5 text-blue-500" />
        <h3 className="font-semibold text-gray-900">よくある質問</h3>
      </div>

      {/* Topics */}
      <div className="divide-y">
        {topics.map((topic) => (
          <div key={topic.id}>
            <button
              onClick={() => setExpandedTopic(
                expandedTopic === topic.id ? null : topic.id
              )}
              className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm font-medium text-gray-700">{topic.title}</span>
              {expandedTopic === topic.id ? (
                <ChevronUp className="h-4 w-4 text-gray-400" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-400" />
              )}
            </button>
            {expandedTopic === topic.id && (
              <div className="px-4 pb-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-700">{topic.content}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Contact Options */}
      <div className="p-4 border-t bg-gray-50">
        <p className="text-xs text-gray-500 text-center mb-3">
          わからないことがあれば、お気軽にご相談ください
        </p>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={onOpenChat}
          >
            <MessageCircle className="h-3 w-3 mr-1" />
            チャット相談
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-xs"
          >
            <Mail className="h-3 w-3 mr-1" />
            メール相談
          </Button>
        </div>
      </div>
    </div>
  )
}
