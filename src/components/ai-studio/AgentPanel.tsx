'use client'

import { useState } from 'react'
import {
  Bot,
  Play,
  Square,
  Settings,
  ChevronDown,
  Cpu,
  Zap,
  Clock,
  DollarSign,
  AlertTriangle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { AgentStatus } from '@/types/ai-studio'

type AgentConfig = {
  model: string
  maxTokens: number
  temperature: number
  autoApprove: boolean
}

type AgentPanelProps = {
  status: AgentStatus
  onStart?: () => void
  onStop?: () => void
}

const models = [
  { id: 'claude-3-opus', name: 'Claude 3 Opus', speed: 'slow', quality: 'best' },
  { id: 'claude-3-sonnet', name: 'Claude 3 Sonnet', speed: 'fast', quality: 'great' },
  { id: 'claude-3-haiku', name: 'Claude 3 Haiku', speed: 'fastest', quality: 'good' },
  { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', speed: 'medium', quality: 'great' },
]

export function AgentPanel({ status, onStart, onStop }: AgentPanelProps) {
  const [config, setConfig] = useState<AgentConfig>({
    model: 'claude-3-opus',
    maxTokens: 4096,
    temperature: 0.7,
    autoApprove: false,
  })
  const [expandedSections, setExpandedSections] = useState({
    model: true,
    settings: false,
    stats: true,
  })

  const selectedModel = models.find(m => m.id === config.model)

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const stats = {
    tokensUsed: 12453,
    requestCount: 24,
    avgResponseTime: 2.3,
    estimatedCost: 0.45,
  }

  return (
    <div className="h-full bg-gray-900 text-gray-300 flex flex-col">
      {/* Header */}
      <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="h-4 w-4" />
          <span>AI Agent</span>
        </div>
        <div className={cn(
          'w-2 h-2 rounded-full',
          status === 'idle' && 'bg-gray-500',
          status === 'thinking' && 'bg-yellow-500 animate-pulse',
          status === 'executing' && 'bg-blue-500 animate-pulse',
          status === 'waiting' && 'bg-purple-500',
        )} />
      </div>

      {/* Agent controls */}
      <div className="p-3 border-b border-gray-700 flex gap-2">
        {status === 'idle' ? (
          <Button
            size="sm"
            onClick={onStart}
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            <Play className="h-4 w-4 mr-2" />
            Start Agent
          </Button>
        ) : (
          <Button
            size="sm"
            onClick={onStop}
            variant="destructive"
            className="flex-1"
          >
            <Square className="h-4 w-4 mr-2" />
            Stop Agent
          </Button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {/* Model selection */}
        <div className="border-b border-gray-800">
          <button
            onClick={() => toggleSection('model')}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-400 hover:bg-gray-800"
          >
            <ChevronDown className={cn(
              'h-4 w-4 transition-transform',
              !expandedSections.model && '-rotate-90'
            )} />
            <Cpu className="h-4 w-4" />
            <span>Model</span>
          </button>

          {expandedSections.model && (
            <div className="px-3 pb-3 space-y-1">
              {models.map((model) => (
                <button
                  key={model.id}
                  onClick={() => setConfig(prev => ({ ...prev, model: model.id }))}
                  className={cn(
                    'w-full flex items-center justify-between p-2 rounded text-sm transition-colors',
                    config.model === model.id
                      ? 'bg-blue-600/20 text-blue-300 border border-blue-600/50'
                      : 'hover:bg-gray-800 text-gray-400'
                  )}
                >
                  <span>{model.name}</span>
                  <div className="flex items-center gap-2 text-xs">
                    <span className={cn(
                      model.speed === 'fastest' && 'text-green-400',
                      model.speed === 'fast' && 'text-blue-400',
                      model.speed === 'medium' && 'text-yellow-400',
                      model.speed === 'slow' && 'text-orange-400',
                    )}>
                      {model.speed}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Settings */}
        <div className="border-b border-gray-800">
          <button
            onClick={() => toggleSection('settings')}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-400 hover:bg-gray-800"
          >
            <ChevronDown className={cn(
              'h-4 w-4 transition-transform',
              !expandedSections.settings && '-rotate-90'
            )} />
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </button>

          {expandedSections.settings && (
            <div className="px-3 pb-3 space-y-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Max Tokens</label>
                <input
                  type="range"
                  min="1024"
                  max="8192"
                  step="1024"
                  value={config.maxTokens}
                  onChange={(e) => setConfig(prev => ({ ...prev, maxTokens: Number(e.target.value) }))}
                  className="w-full accent-blue-500"
                />
                <div className="text-xs text-gray-400 mt-1">{config.maxTokens}</div>
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-1 block">Temperature</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={config.temperature}
                  onChange={(e) => setConfig(prev => ({ ...prev, temperature: Number(e.target.value) }))}
                  className="w-full accent-blue-500"
                />
                <div className="text-xs text-gray-400 mt-1">{config.temperature}</div>
              </div>

              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.autoApprove}
                  onChange={(e) => setConfig(prev => ({ ...prev, autoApprove: e.target.checked }))}
                  className="accent-blue-500"
                />
                <span className="text-gray-400">Auto-approve changes</span>
              </label>

              {config.autoApprove && (
                <div className="flex items-start gap-2 p-2 bg-yellow-500/10 border border-yellow-500/30 rounded text-xs text-yellow-400">
                  <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span>自動承認を有効にすると、AIが自動的にファイルを変更します</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Stats */}
        <div>
          <button
            onClick={() => toggleSection('stats')}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-400 hover:bg-gray-800"
          >
            <ChevronDown className={cn(
              'h-4 w-4 transition-transform',
              !expandedSections.stats && '-rotate-90'
            )} />
            <Zap className="h-4 w-4" />
            <span>Session Stats</span>
          </button>

          {expandedSections.stats && (
            <div className="px-3 pb-3 grid grid-cols-2 gap-2">
              <div className="p-2 bg-gray-800/50 rounded">
                <div className="text-xs text-gray-500 mb-0.5">Tokens Used</div>
                <div className="text-sm font-mono text-gray-300">{stats.tokensUsed.toLocaleString()}</div>
              </div>
              <div className="p-2 bg-gray-800/50 rounded">
                <div className="text-xs text-gray-500 mb-0.5">Requests</div>
                <div className="text-sm font-mono text-gray-300">{stats.requestCount}</div>
              </div>
              <div className="p-2 bg-gray-800/50 rounded">
                <div className="text-xs text-gray-500 mb-0.5 flex items-center gap-1">
                  <Clock className="h-3 w-3" /> Avg Time
                </div>
                <div className="text-sm font-mono text-gray-300">{stats.avgResponseTime}s</div>
              </div>
              <div className="p-2 bg-gray-800/50 rounded">
                <div className="text-xs text-gray-500 mb-0.5 flex items-center gap-1">
                  <DollarSign className="h-3 w-3" /> Est. Cost
                </div>
                <div className="text-sm font-mono text-gray-300">${stats.estimatedCost.toFixed(2)}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
