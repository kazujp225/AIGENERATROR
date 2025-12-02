'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Loader2, CheckCircle, AlertCircle, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Message, ToolCall } from '@/types/ai-studio'

type ChatPanelProps = {
  messages: Message[]
  onSendMessage: (content: string) => void
  isLoading?: boolean
}

function ToolCallItem({ toolCall }: { toolCall: ToolCall }) {
  const statusIcon = {
    pending: <Loader2 className="h-3 w-3 animate-spin text-gray-400" />,
    running: <Play className="h-3 w-3 text-blue-400" />,
    complete: <CheckCircle className="h-3 w-3 text-green-400" />,
    error: <AlertCircle className="h-3 w-3 text-red-400" />,
  }

  return (
    <div className="mt-2 p-2 bg-gray-800/50 rounded border border-gray-700 text-xs">
      <div className="flex items-center gap-2 mb-1">
        {statusIcon[toolCall.status]}
        <span className="font-mono text-blue-300">{toolCall.name}</span>
      </div>
      {toolCall.input && (
        <div className="text-gray-400 font-mono truncate">
          {toolCall.input}
        </div>
      )}
      {toolCall.output && (
        <div className="mt-1 text-gray-300">
          {toolCall.output}
        </div>
      )}
    </div>
  )
}

function MessageItem({ message }: { message: Message }) {
  const isUser = message.role === 'user'
  const isSystem = message.role === 'system'

  return (
    <div className={cn(
      'px-4 py-3',
      isUser ? 'bg-gray-800/30' : 'bg-gray-900/50'
    )}>
      <div className="flex gap-3 max-w-3xl mx-auto">
        <div className={cn(
          'w-8 h-8 rounded flex items-center justify-center flex-shrink-0',
          isUser ? 'bg-blue-600' : isSystem ? 'bg-gray-600' : 'bg-purple-600'
        )}>
          {isUser ? (
            <User className="h-5 w-5 text-white" />
          ) : (
            <Bot className="h-5 w-5 text-white" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-gray-300">
              {isUser ? 'You' : isSystem ? 'System' : 'AI Assistant'}
            </span>
            <span className="text-xs text-gray-500">
              {message.timestamp.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}
            </span>
            {message.status === 'streaming' && (
              <Loader2 className="h-3 w-3 animate-spin text-blue-400" />
            )}
          </div>
          <div className="text-gray-200 text-sm whitespace-pre-wrap">
            {message.content}
          </div>
          {message.toolCalls && message.toolCalls.length > 0 && (
            <div className="mt-2 space-y-2">
              {message.toolCalls.map((toolCall) => (
                <ToolCallItem key={toolCall.id} toolCall={toolCall} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function ChatPanel({ messages, onSendMessage, isLoading }: ChatPanelProps) {
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim())
      setInput('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="h-full flex flex-col bg-gray-900">
      {/* Header */}
      <div className="px-4 py-2 border-b border-gray-700 flex items-center gap-2">
        <Bot className="h-5 w-5 text-purple-400" />
        <span className="text-sm font-medium text-gray-300">AI Assistant</span>
        {isLoading && (
          <span className="text-xs text-gray-500 flex items-center gap-1">
            <Loader2 className="h-3 w-3 animate-spin" />
            処理中...
          </span>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-auto">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-500">
            <div className="text-center">
              <Bot className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm">AIアシスタントにメッセージを送信してください</p>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-gray-800">
            {messages.map((message) => (
              <MessageItem key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-700">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="メッセージを入力... (Shift+Enterで改行)"
            className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={1}
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim() || isLoading}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
