'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, HelpCircle, Sparkles, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Message, AladdinQuestion, QuestionOption } from '@/types/ai-studio'

type AladdinChatProps = {
  messages: Message[]
  onAnswer: (questionId: string, answer: string | string[]) => void
  onOpenGlossary: (term: string) => void
  isLoading?: boolean
}

export function AladdinChat({ messages, onAnswer, onOpenGlossary, isLoading }: AladdinChatProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [textInput, setTextInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const currentQuestion = messages[messages.length - 1]?.question

  const handleOptionClick = (option: QuestionOption) => {
    if (!currentQuestion) return

    if (currentQuestion.type === 'multiple') {
      setSelectedOptions(prev =>
        prev.includes(option.id)
          ? prev.filter(id => id !== option.id)
          : [...prev, option.id]
      )
    } else {
      onAnswer(currentQuestion.id, option.id)
      setSelectedOptions([])
    }
  }

  const handleSubmitMultiple = () => {
    if (currentQuestion && selectedOptions.length > 0) {
      onAnswer(currentQuestion.id, selectedOptions)
      setSelectedOptions([])
    }
  }

  const handleSubmitText = () => {
    if (currentQuestion && textInput.trim()) {
      onAnswer(currentQuestion.id, textInput.trim())
      setTextInput('')
    }
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="px-6 py-4 border-b bg-white/80 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-gray-900">アラジン</h2>
            <p className="text-xs text-gray-500">AI開発の発注をサポートします</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((message) => (
          <div key={message.id} className="space-y-4">
            {/* Message Bubble */}
            <div
              className={cn(
                'max-w-[85%] rounded-2xl px-5 py-4',
                message.role === 'assistant'
                  ? 'bg-white shadow-sm border'
                  : 'bg-blue-600 text-white ml-auto'
              )}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {message.content}
              </p>

              {/* Glossary Terms */}
              {message.question?.glossaryTerms && message.question.glossaryTerms.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {message.question.glossaryTerms.map((term) => (
                    <button
                      key={term}
                      onClick={() => onOpenGlossary(term)}
                      className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors"
                    >
                      <HelpCircle className="h-3 w-3" />
                      {term}とは？
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Question Options */}
            {message.question && message.id === messages[messages.length - 1].id && (
              <div className="space-y-3 pl-4">
                {message.question.helpText && (
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <HelpCircle className="h-3 w-3" />
                    {message.question.helpText}
                  </p>
                )}

                {message.question.type === 'text' ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      placeholder="入力してください..."
                      className="flex-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onKeyDown={(e) => e.key === 'Enter' && handleSubmitText()}
                    />
                    <Button
                      onClick={handleSubmitText}
                      disabled={!textInput.trim()}
                      className="rounded-xl"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {message.question.options?.map((option) => {
                      const isSelected = selectedOptions.includes(option.id)
                      return (
                        <button
                          key={option.id}
                          onClick={() => handleOptionClick(option)}
                          className={cn(
                            'flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all',
                            'hover:border-blue-400 hover:shadow-md',
                            isSelected
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 bg-white'
                          )}
                        >
                          {option.icon && (
                            <span className="text-2xl flex-shrink-0">{option.icon}</span>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-gray-900">{option.label}</span>
                              {isSelected && (
                                <CheckCircle2 className="h-4 w-4 text-blue-500" />
                              )}
                            </div>
                            {option.description && (
                              <p className="text-xs text-gray-500 mt-0.5">{option.description}</p>
                            )}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                )}

                {/* Submit button for multiple selection */}
                {message.question.type === 'multiple' && selectedOptions.length > 0 && (
                  <div className="flex justify-end pt-2">
                    <Button onClick={handleSubmitMultiple} className="rounded-xl">
                      {selectedOptions.length}件選択して次へ
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {isLoading && (
          <div className="flex items-center gap-2 text-gray-500">
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span className="text-sm">アラジンが考えています...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}
