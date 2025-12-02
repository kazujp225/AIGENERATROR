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
  BarChart3,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
} from 'lucide-react'
import { mockMarketData, industries, useCases, technologies } from '@/mocks'

export default function MarketPage() {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('')
  const [selectedUseCase, setSelectedUseCase] = useState<string>('')
  const [selectedTech, setSelectedTech] = useState<string>('')

  const filteredData = mockMarketData.filter((data) => {
    if (selectedIndustry && data.industry !== selectedIndustry) return false
    if (selectedUseCase && data.useCase !== selectedUseCase) return false
    if (selectedTech && data.technology !== selectedTech) return false
    return true
  })

  const getConfidenceBadge = (confidence: string) => {
    switch (confidence) {
      case 'high':
        return <Badge className="bg-emerald-100 text-emerald-700">信頼度：高</Badge>
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-700">信頼度：中</Badge>
      case 'low':
        return <Badge className="bg-red-100 text-red-700">信頼度：低</Badge>
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-emerald-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">AI開発 相場検索</h1>
          </div>
          <p className="text-gray-600">
            業界・ユースケース・技術で絞り込んで、AI開発の相場を調べることができます。
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
                    業界
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
                    ユースケース
                  </label>
                  <Select value={selectedUseCase} onValueChange={setSelectedUseCase}>
                    <SelectTrigger>
                      <SelectValue placeholder="すべて" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">すべて</SelectItem>
                      {useCases.map((useCase) => (
                        <SelectItem key={useCase} value={useCase}>
                          {useCase}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    技術
                  </label>
                  <Select value={selectedTech} onValueChange={setSelectedTech}>
                    <SelectTrigger>
                      <SelectValue placeholder="すべて" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">すべて</SelectItem>
                      {technologies.map((tech) => (
                        <SelectItem key={tech} value={tech}>
                          {tech}
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
                    setSelectedUseCase('')
                    setSelectedTech('')
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
                {filteredData.length}件の相場データが見つかりました
              </p>
            </div>

            <div className="space-y-4">
              {filteredData.map((data) => (
                <Card key={data.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <Badge variant="secondary">{data.industry}</Badge>
                          <Badge variant="outline">{data.useCase}</Badge>
                          <Badge variant="outline">{data.technology}</Badge>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {data.industry} × {data.useCase}
                        </h3>
                      </div>
                      {getConfidenceBadge(data.confidence)}
                    </div>

                    {/* Price Range Visualization */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <div className="text-center mb-3">
                        <div className="text-3xl font-bold text-blue-600">
                          {(data.priceRange.min / 10000).toLocaleString()}〜
                          {(data.priceRange.max / 10000).toLocaleString()}万円
                        </div>
                        <div className="text-sm text-gray-500">
                          中央値: {(data.priceRange.median / 10000).toLocaleString()}万円
                        </div>
                      </div>

                      {/* Simple bar visualization */}
                      <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="absolute h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                          style={{
                            left: '10%',
                            right: '10%',
                          }}
                        />
                        <div
                          className="absolute h-full w-1 bg-blue-800"
                          style={{ left: '50%', transform: 'translateX(-50%)' }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>下限</span>
                        <span>中央値</span>
                        <span>上限</span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">期間：</span>
                        <span className="font-medium">
                          {data.durationRange.min}〜{data.durationRange.max}ヶ月
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">成功率：</span>
                        <span className="font-medium">
                          {Math.round(data.successRate * 100)}%
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">サンプル：</span>
                        <span className="font-medium">{data.sampleCount}件</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">規模：</span>
                        <span className="font-medium">
                          {data.scale === 'small' ? '小規模' : data.scale === 'medium' ? '中規模' : '大規模'}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end mt-4 pt-4 border-t">
                      <Button variant="outline" asChild>
                        <Link href={`/vendors?industry=${data.industry}&useCase=${data.useCase}`}>
                          この条件でベンダーを探す
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredData.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    該当する相場データがありません
                  </h3>
                  <p className="text-gray-600 mb-4">
                    条件を変更して再度検索してください
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedIndustry('')
                      setSelectedUseCase('')
                      setSelectedTech('')
                    }}
                  >
                    条件をクリア
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
