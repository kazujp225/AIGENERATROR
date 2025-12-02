'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Building2,
  Star,
  Clock,
  CheckCircle2,
  MapPin,
  Users,
} from 'lucide-react'
import { mockVendors, industries } from '@/mocks'

const techOptions = ['LLM/RAG', '画像認識', '時系列予測', '最適化']
const priceRanges = ['〜300万円', '300〜1000万円', '1000万円〜']

export default function VendorsPage() {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('')
  const [selectedTech, setSelectedTech] = useState<string>('')
  const [selectedPrice, setSelectedPrice] = useState<string>('')
  const [sortBy, setSortBy] = useState<string>('rating')

  const filteredVendors = mockVendors
    .filter((vendor) => {
      if (selectedIndustry && !vendor.industries.includes(selectedIndustry)) return false
      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating
        case 'reviews':
          return b.reviewCount - a.reviewCount
        case 'response':
          return a.metrics.avgResponseTime - b.metrics.avgResponseTime
        default:
          return 0
      }
    })

  const renderTechRating = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`h-2 w-4 rounded-sm ${
              i <= rating ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <Building2 className="h-5 w-5 text-purple-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">AI開発会社を探す</h1>
          </div>
          <p className="text-gray-600">
            あなたの案件にマッチする開発会社を見つけましょう
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">絞り込み条件</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    得意業界
                  </label>
                  <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                    <SelectTrigger>
                      <SelectValue placeholder="すべて" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">すべて</SelectItem>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    技術スタック
                  </label>
                  <Select value={selectedTech} onValueChange={setSelectedTech}>
                    <SelectTrigger>
                      <SelectValue placeholder="すべて" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">すべて</SelectItem>
                      {techOptions.map((tech) => (
                        <SelectItem key={tech} value={tech}>
                          {tech}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    価格帯
                  </label>
                  <Select value={selectedPrice} onValueChange={setSelectedPrice}>
                    <SelectTrigger>
                      <SelectValue placeholder="すべて" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">すべて</SelectItem>
                      {priceRanges.map((range) => (
                        <SelectItem key={range} value={range}>
                          {range}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSelectedIndustry('')
                    setSelectedTech('')
                    setSelectedPrice('')
                  }}
                >
                  条件をクリア
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                {filteredVendors.length}社が見つかりました
              </p>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="並び替え" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">評価が高い順</SelectItem>
                  <SelectItem value="reviews">レビューが多い順</SelectItem>
                  <SelectItem value="response">レスポンスが速い順</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              {filteredVendors.map((vendor) => (
                <Card key={vendor.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Logo & Basic Info */}
                      <div className="flex-shrink-0">
                        <div className="h-16 w-16 rounded-lg bg-gray-100 flex items-center justify-center font-bold text-2xl text-gray-600">
                          {vendor.name.charAt(0)}
                        </div>
                      </div>

                      {/* Main Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {vendor.name}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span>{vendor.rating}</span>
                                <span>({vendor.reviewCount}件)</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                <span>{vendor.location}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                <span>{vendor.employeeCount}名</span>
                              </div>
                            </div>
                          </div>
                          {vendor.featured && (
                            <Badge className="bg-blue-100 text-blue-700">注目</Badge>
                          )}
                        </div>

                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                          {vendor.description}
                        </p>

                        {/* Industries */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {vendor.industries.map((industry) => (
                            <Badge key={industry} variant="secondary" className="text-xs">
                              {industry}
                            </Badge>
                          ))}
                        </div>

                        {/* Tech Stack */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                          <div className="text-xs">
                            <span className="text-gray-500">LLM/RAG</span>
                            {renderTechRating(vendor.techStack.llm)}
                          </div>
                          <div className="text-xs">
                            <span className="text-gray-500">画像認識</span>
                            {renderTechRating(vendor.techStack.imageRecognition)}
                          </div>
                          <div className="text-xs">
                            <span className="text-gray-500">時系列</span>
                            {renderTechRating(vendor.techStack.timeSeries)}
                          </div>
                          <div className="text-xs">
                            <span className="text-gray-500">最適化</span>
                            {renderTechRating(vendor.techStack.optimization)}
                          </div>
                        </div>

                        {/* Metrics & Price */}
                        <div className="flex flex-wrap items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600">平均レス:</span>
                            <span className="font-medium">{vendor.metrics.avgResponseTime}時間</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <CheckCircle2 className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600">納期遵守:</span>
                            <span className="font-medium">
                              {Math.round(vendor.metrics.onTimeDeliveryRate * 100)}%
                            </span>
                          </div>
                          <div className="text-gray-600">
                            価格帯:
                            <span className="font-medium ml-1">
                              {(vendor.priceRange.min / 10000).toLocaleString()}〜
                              {(vendor.priceRange.max / 10000).toLocaleString()}万円
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-2 md:w-32">
                        <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                          <Link href={`/vendors/${vendor.id}`}>詳細を見る</Link>
                        </Button>
                        <Button variant="outline">比較に追加</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
