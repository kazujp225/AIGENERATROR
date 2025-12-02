'use client'

import { useState } from 'react'
import { Building2, Star, ChevronRight, BadgeCheck, ExternalLink, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { VendorMatch } from '@/types/ai-studio'

type VendorRecommendationProps = {
  vendors: VendorMatch[]
  onViewVendor?: (vendorId: string) => void
  onContactVendor?: (vendorId: string) => void
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

export function VendorRecommendation({ vendors, onViewVendor, onContactVendor }: VendorRecommendationProps) {
  const [selectedVendor, setSelectedVendor] = useState<string | null>(null)

  if (vendors.length === 0) {
    return (
      <div className="h-full bg-white flex flex-col">
        <div className="px-4 py-3 border-b">
          <div className="flex items-center gap-2 text-gray-700">
            <Building2 className="h-5 w-5 text-orange-600" />
            <span className="font-semibold">おすすめベンダー</span>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center text-gray-400">
            <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">要件に基づいて</p>
            <p className="text-sm">最適なベンダーをご提案します</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-700">
            <Building2 className="h-5 w-5 text-orange-600" />
            <span className="font-semibold">おすすめベンダー</span>
          </div>
          <span className="text-xs text-gray-500">マッチ度順</span>
        </div>
      </div>

      {/* Vendor List */}
      <div className="flex-1 overflow-y-auto divide-y">
        {vendors.map((vendor, index) => (
          <div
            key={vendor.id}
            className={cn(
              'p-4 transition-colors cursor-pointer',
              selectedVendor === vendor.id ? 'bg-orange-50' : 'hover:bg-gray-50'
            )}
            onClick={() => setSelectedVendor(
              selectedVendor === vendor.id ? null : vendor.id
            )}
          >
            {/* Vendor Header */}
            <div className="flex items-start gap-3">
              {/* Rank Badge */}
              <div className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold',
                index === 0 ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white' :
                index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-white' :
                index === 2 ? 'bg-gradient-to-br from-amber-600 to-amber-700 text-white' :
                'bg-gray-200 text-gray-600'
              )}>
                {index + 1}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-gray-900 truncate">{vendor.name}</h3>
                  {vendor.matchScore >= 90 && (
                    <BadgeCheck className="h-4 w-4 text-orange-500 flex-shrink-0" />
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={cn(
                          'h-3 w-3',
                          star <= Math.round(vendor.rating)
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">
                    {vendor.rating} ({vendor.reviewCount}件)
                  </span>
                </div>

                {/* Match Score */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        'h-full rounded-full transition-all',
                        vendor.matchScore >= 80 ? 'bg-gradient-to-r from-green-400 to-green-600' :
                        vendor.matchScore >= 60 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                        'bg-gradient-to-r from-gray-400 to-gray-600'
                      )}
                      style={{ width: `${vendor.matchScore}%` }}
                    />
                  </div>
                  <span className={cn(
                    'text-sm font-bold',
                    vendor.matchScore >= 80 ? 'text-green-600' :
                    vendor.matchScore >= 60 ? 'text-yellow-600' :
                    'text-gray-600'
                  )}>
                    {vendor.matchScore}%
                  </span>
                </div>
              </div>

              <ChevronRight className={cn(
                'h-5 w-5 text-gray-400 transition-transform',
                selectedVendor === vendor.id && 'rotate-90'
              )} />
            </div>

            {/* Expanded Details */}
            {selectedVendor === vendor.id && (
              <div className="mt-4 pl-11 space-y-3">
                {/* Strengths */}
                <div>
                  <p className="text-xs text-gray-500 mb-1">強み</p>
                  <div className="flex flex-wrap gap-1">
                    {vendor.strengths.map((strength) => (
                      <span
                        key={strength}
                        className="px-2 py-1 text-xs bg-orange-100 text-orange-700 rounded"
                      >
                        {strength}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Specialties */}
                <div>
                  <p className="text-xs text-gray-500 mb-1">得意分野</p>
                  <div className="flex flex-wrap gap-1">
                    {vendor.specialties.map((specialty) => (
                      <span
                        key={specialty}
                        className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <p className="text-xs text-gray-500 mb-1">想定費用レンジ</p>
                  <p className="text-sm font-medium text-gray-900">
                    {formatPrice(vendor.priceRange.min)} 〜 {formatPrice(vendor.priceRange.max)}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={(e) => {
                      e.stopPropagation()
                      onViewVendor?.(vendor.id)
                    }}
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    詳細を見る
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-orange-600 hover:bg-orange-700"
                    onClick={(e) => {
                      e.stopPropagation()
                      onContactVendor?.(vendor.id)
                    }}
                  >
                    問い合わせ
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t bg-gray-50">
        <Button variant="outline" className="w-full">
          すべてのベンダーを見る
        </Button>
      </div>
    </div>
  )
}
