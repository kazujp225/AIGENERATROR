'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  ArrowLeft,
  FileText,
  Plus,
  Download,
  Edit,
  Copy,
  Trash2,
  ArrowRight,
  Clock,
  Filter,
  MoreVertical,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { mockSpecifications } from '@/mocks'

export default function SpecsManagementPage() {
  const [statusFilter, setStatusFilter] = useState<string>('')

  const filteredSpecs = mockSpecifications.filter((spec) => {
    if (statusFilter && spec.status !== statusFilter) return false
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            ダッシュボードに戻る
          </Link>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">仕様書管理</h1>
              <p className="text-gray-600">作成した仕様書を確認・編集できます</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700" asChild>
              <Link href="/aladdin/start">
                <Plus className="mr-2 h-4 w-4" />
                新規作成
              </Link>
            </Button>
          </div>
        </div>

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
              {statusFilter && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setStatusFilter('')}
                >
                  クリア
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{mockSpecifications.length}</div>
              <div className="text-sm text-gray-500">すべて</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-600">
                {mockSpecifications.filter((s) => s.status === 'draft').length}
              </div>
              <div className="text-sm text-gray-500">下書き</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-emerald-600">
                {mockSpecifications.filter((s) => s.status === 'complete').length}
              </div>
              <div className="text-sm text-gray-500">完成</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {mockSpecifications.filter((s) => s.status === 'sent').length}
              </div>
              <div className="text-sm text-gray-500">送付済み</div>
            </CardContent>
          </Card>
        </div>

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
                      <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-2">
                        <Badge variant="outline">{spec.industry}</Badge>
                        <Badge variant="outline">{spec.useCase}</Badge>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {spec.createdAt}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-1">
                        予算: {spec.budget.min / 10000}〜{spec.budget.max / 10000}万円
                        {' | '}
                        期間: {spec.timeline}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/dashboard/specs/${spec.id}`}>
                        詳細
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          PDFダウンロード
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          編集
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="mr-2 h-4 w-4" />
                          複製
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          削除
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
