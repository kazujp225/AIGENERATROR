'use client'

import { useState } from 'react'
import { TrendingUp, Info, ChevronDown, ChevronUp, AlertCircle, BarChart3 } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { CostEstimate } from '@/types/ai-studio'

type CostEstimatorProps = {
  estimate: CostEstimate | null
  isCalculating?: boolean
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

export function CostEstimator({ estimate, isCalculating }: CostEstimatorProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  if (!estimate && !isCalculating) {
    return (
      <div className="h-full bg-white border-l flex flex-col">
        <div className="px-4 py-3 border-b">
          <div className="flex items-center gap-2 text-gray-700">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <span className="font-semibold">概算見積もり</span>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center text-gray-400">
            <BarChart3 className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">質問に回答すると</p>
            <p className="text-sm">概算費用が表示されます</p>
          </div>
        </div>
      </div>
    )
  }

  if (isCalculating) {
    return (
      <div className="h-full bg-white border-l flex flex-col">
        <div className="px-4 py-3 border-b">
          <div className="flex items-center gap-2 text-gray-700">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <span className="font-semibold">概算見積もり</span>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-gray-500">計算中...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full bg-white border-l flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b">
        <div className="flex items-center gap-2 text-gray-700">
          <TrendingUp className="h-5 w-5 text-green-600" />
          <span className="font-semibold">概算見積もり</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Total Estimate */}
        <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-b">
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-1">概算費用レンジ</p>
            <div className="flex items-center justify-center gap-2 text-2xl font-bold text-gray-900">
              <span>{formatPrice(estimate!.totalMin)}</span>
              <span className="text-gray-400">〜</span>
              <span>{formatPrice(estimate!.totalMax)}</span>
            </div>

            {/* Confidence indicator */}
            <div className="mt-3 flex items-center justify-center gap-2">
              <div className="h-2 w-32 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 transition-all"
                  style={{ width: `${estimate!.confidenceLevel}%` }}
                />
              </div>
              <span className="text-xs text-gray-500">精度 {estimate!.confidenceLevel}%</span>
            </div>
            <p className="text-xs text-gray-400 mt-2 flex items-center justify-center gap-1">
              <Info className="h-3 w-3" />
              質問に回答するほど精度が上がります
            </p>
          </div>
        </div>

        {/* Breakdown */}
        <div className="p-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-between text-sm font-medium text-gray-700 mb-3"
          >
            <span>内訳</span>
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>

          {isExpanded && (
            <div className="space-y-3">
              {estimate!.breakdown.map((item) => (
                <div key={item.category} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{item.label}</span>
                    <span className="text-sm text-gray-600">
                      {formatPrice(item.minCost)}〜{formatPrice(item.maxCost)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">{item.description}</p>

                  {/* Visual bar */}
                  <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                      style={{
                        width: `${(item.maxCost / estimate!.totalMax) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Industry Comparison */}
        <div className="p-4 border-t">
          <h4 className="text-sm font-medium text-gray-700 mb-3">業界比較</h4>
          <div className="space-y-2">
            {estimate!.comparisons.map((comp) => (
              <div key={comp.industry} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <span className="text-sm text-gray-600">{comp.industry}</span>
                <span className="text-sm font-medium text-gray-900">
                  {formatPrice(comp.avgCost)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Notice */}
        <div className="p-4">
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex gap-2">
              <AlertCircle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-amber-800">
                <p className="font-medium mb-1">この見積もりについて</p>
                <p>
                  実際の費用は要件の詳細によって変動します。
                  正確なお見積もりはベンダーにご相談ください。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
