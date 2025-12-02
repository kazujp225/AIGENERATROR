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
  FileText,
  Plus,
  Download,
  Edit,
  Trash2,
  ArrowRight,
  Clock,
  Filter,
} from 'lucide-react'
import { mockSpecifications } from '@/mocks'

export default function AladdinHistoryPage() {
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [industryFilter, setIndustryFilter] = useState<string>('')

  const filteredSpecs = mockSpecifications.filter((spec) => {
    if (statusFilter && spec.status !== statusFilter) return false
    if (industryFilter && spec.industry !== industryFilter) return false
    return true
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'complete':
        return <Badge className="bg-emerald-100 text-emerald-700">完成</Badge>
      case 'draft':
        return <Badge variant="secondary">下書き</Badge>
      case 'sent':
        return <Badge className="bg-blue-100 text-blue-700">送付済み</Badge>
      default:
        return null
    }
  }

  const industries = [...new Set(mockSpecifications.map((s) => s.industry))]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">仕様書履歴</h1>
              <p className="text-gray-600">
                過去に作成した仕様書を確認・編集できます
              </p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700" asChild>
              <Link href="/aladdin/start">
                <Plus className="mr-2 h-4 w-4" />
                新規作成
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">絞り込み:</span>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="ステータス" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">すべて</SelectItem>
                  <SelectItem value="draft">下書き</SelectItem>
                  <SelectItem value="complete">完成</SelectItem>
                  <SelectItem value="sent">送付済み</SelectItem>
                </SelectContent>
              </Select>
              <Select value={industryFilter} onValueChange={setIndustryFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="業界" />
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
              {(statusFilter || industryFilter) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setStatusFilter('')
                    setIndustryFilter('')
                  }}
                >
                  クリア
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Results count */}
        <p className="text-sm text-gray-600 mb-4">
          {filteredSpecs.length}件の仕様書
        </p>

        {/* Specifications List */}
        <div className="space-y-4">
          {filteredSpecs.map((spec) => (
            <Card key={spec.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Icon and Title */}
                  <div className="flex items-start gap-4 flex-1">
                    <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg truncate">
                          {spec.projectName}
                        </h3>
                        {getStatusBadge(spec.status)}
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                        <Badge variant="outline">{spec.industry}</Badge>
                        <Badge variant="outline">{spec.useCase}</Badge>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          作成日: {spec.createdAt}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                        {spec.currentSituation}
                      </p>
                    </div>
                  </div>

                  {/* Budget and Actions */}
                  <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-3">
                    <div className="text-right">
                      <div className="text-sm text-gray-500">予算</div>
                      <div className="font-semibold">
                        {spec.budget.min / 10000}〜{spec.budget.max / 10000}万円
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700" asChild>
                        <Link href={`/dashboard/specs/${spec.id}`}>
                          詳細
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSpecs.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">仕様書がありません</h3>
              <p className="text-gray-600 mb-4">
                まずはAIとの対話で仕様書を作成してみましょう
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                <Link href="/aladdin/start">
                  <Plus className="mr-2 h-4 w-4" />
                  新規作成
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
