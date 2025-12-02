'use client'

import { useState, useRef, useEffect } from 'react'
import { HelpCircle, Sparkles, CheckCircle2, User, Bot, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Message, AladdinQuestion, QuestionOption } from '@/types/ai-studio'

type EnhancedChatProps = {
  messages: Message[]
  onAnswer: (questionId: string, answer: string | string[]) => void
  onOpenGlossary: (term: string) => void
  isLoading?: boolean
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-3 p-4">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center flex-shrink-0">
        <Bot className="h-4 w-4 text-white" />
      </div>
      <div className="flex items-center gap-1 px-4 py-3 bg-white rounded-2xl rounded-tl-md shadow-sm">
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  )
}

function MessageBubble({ message, isLatest }: { message: Message; isLatest: boolean }) {
  const isUser = message.role === 'user'

  return (
    <div
      className={cn(
        'flex gap-3 p-4 animate-fadeIn',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      {/* Avatar */}
      <div className={cn(
        'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
        isUser
          ? 'bg-gray-200'
          : 'bg-gradient-to-br from-purple-500 to-blue-600'
      )}>
        {isUser ? (
          <User className="h-4 w-4 text-gray-600" />
        ) : (
          <Bot className="h-4 w-4 text-white" />
        )}
      </div>

      {/* Content */}
      <div className={cn(
        'max-w-[80%] space-y-2',
        isUser ? 'items-end' : 'items-start'
      )}>
        {/* Message Bubble */}
        <div
          className={cn(
            'px-4 py-3 rounded-2xl shadow-sm',
            isUser
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-tr-md'
              : 'bg-white text-gray-800 rounded-tl-md'
          )}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
        </div>

        {/* Glossary Terms */}
        {!isUser && message.question?.glossaryTerms && message.question.glossaryTerms.length > 0 && (
          <div className="flex flex-wrap gap-2 pl-1">
            {message.question.glossaryTerms.map((term) => (
              <button
                key={term}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs bg-purple-50 text-purple-600 rounded-full hover:bg-purple-100 transition-colors border border-purple-200"
              >
                <HelpCircle className="h-3 w-3" />
                {term}とは？
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function QuestionOptions({
  question,
  selectedOptions,
  onSelect,
  onSubmit,
}: {
  question: AladdinQuestion
  selectedOptions: string[]
  onSelect: (option: QuestionOption) => void
  onSubmit: () => void
}) {
  const isMultiple = question.type === 'multiple'

  return (
    <div className="p-4 space-y-4 animate-fadeIn">
      {/* Help Text */}
      {question.helpText && (
        <div className="flex items-start gap-2 px-3 py-2 bg-blue-50 rounded-xl border border-blue-100">
          <Sparkles className="h-4 w-4 text-blue-500 mt-0.5" />
          <p className="text-sm text-blue-700">{question.helpText}</p>
        </div>
      )}

      {/* Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {question.options?.map((option, idx) => {
          const isSelected = selectedOptions.includes(option.id)
          return (
            <button
              key={option.id}
              onClick={() => onSelect(option)}
              className={cn(
                'group relative p-4 rounded-2xl border-2 text-left transition-all duration-200',
                'hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]',
                isSelected
                  ? 'border-purple-500 bg-purple-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-purple-300'
              )}
              style={{
                animationDelay: `${idx * 50}ms`,
              }}
            >
              {/* Selected Indicator */}
              {isSelected && (
                <div className="absolute top-3 right-3">
                  <CheckCircle2 className="h-5 w-5 text-purple-500" />
                </div>
              )}

              {/* Icon */}
              {option.icon && (
                <span className="text-3xl mb-2 block">{option.icon}</span>
              )}

              {/* Label */}
              <h4 className={cn(
                'font-semibold mb-1 transition-colors',
                isSelected ? 'text-purple-700' : 'text-gray-800'
              )}>
                {option.label}
              </h4>

              {/* Description */}
              {option.description && (
                <p className="text-sm text-gray-500">{option.description}</p>
              )}

              {/* Hover Arrow */}
              <ChevronRight className={cn(
                'absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300',
                'transition-all duration-200 opacity-0 group-hover:opacity-100 group-hover:translate-x-1',
                isSelected && 'opacity-0'
              )} />
            </button>
          )
        })}
      </div>

      {/* Submit Button for Multiple Selection */}
      {isMultiple && selectedOptions.length > 0 && (
        <div className="flex justify-end pt-2">
          <Button
            onClick={onSubmit}
            className="rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-lg"
          >
            {selectedOptions.length}件選択して次へ
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  )
}

export function EnhancedChat({ messages, onAnswer, onOpenGlossary, isLoading }: EnhancedChatProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
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

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="px-4 py-3 border-b bg-white/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-lg">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
          </div>
          <div>
            <h2 className="font-bold text-gray-900">アラジン</h2>
            <p className="text-xs text-green-600">オンライン</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        {messages.map((message, idx) => (
          <div key={message.id}>
            <MessageBubble
              message={message}
              isLatest={idx === messages.length - 1}
            />

            {/* Question Options */}
            {message.question && message.id === messages[messages.length - 1].id && !isLoading && (
              <QuestionOptions
                question={message.question}
                selectedOptions={selectedOptions}
                onSelect={handleOptionClick}
                onSubmit={handleSubmitMultiple}
              />
            )}
          </div>
        ))}

        {/* Typing Indicator */}
        {isLoading && <TypingIndicator />}

        <div ref={messagesEndRef} />
      </div>

      {/* CSS for animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
