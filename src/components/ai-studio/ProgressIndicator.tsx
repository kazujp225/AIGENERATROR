'use client'

import { CheckCircle2, Circle, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ProgressStep } from '@/types/ai-studio'

type ProgressIndicatorProps = {
  steps: ProgressStep[]
  className?: string
}

export function ProgressIndicator({ steps, className }: ProgressIndicatorProps) {
  const completedCount = steps.filter(s => s.status === 'completed').length
  const totalCount = steps.length
  const progressPercent = (completedCount / totalCount) * 100

  return (
    <div className={cn('bg-white border rounded-xl p-4', className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">進捗状況</h3>
        <span className="text-sm text-gray-500">
          {completedCount}/{totalCount} 完了
        </span>
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Steps */}
      <div className="relative">
        {/* Connecting Line */}
        <div className="absolute left-[15px] top-8 bottom-4 w-0.5 bg-gray-200" />

        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-start gap-3 relative">
              {/* Step Indicator */}
              <div className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10',
                step.status === 'completed' && 'bg-green-500',
                step.status === 'active' && 'bg-blue-500',
                step.status === 'pending' && 'bg-gray-200',
              )}>
                {step.status === 'completed' && (
                  <CheckCircle2 className="h-5 w-5 text-white" />
                )}
                {step.status === 'active' && (
                  <Loader2 className="h-4 w-4 text-white animate-spin" />
                )}
                {step.status === 'pending' && (
                  <Circle className="h-4 w-4 text-gray-400" />
                )}
              </div>

              {/* Step Content */}
              <div className="flex-1 pt-1">
                <p className={cn(
                  'font-medium text-sm',
                  step.status === 'completed' && 'text-gray-700',
                  step.status === 'active' && 'text-blue-600',
                  step.status === 'pending' && 'text-gray-400',
                )}>
                  {step.label}
                </p>
                <p className={cn(
                  'text-xs mt-0.5',
                  step.status === 'pending' ? 'text-gray-300' : 'text-gray-500',
                )}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
