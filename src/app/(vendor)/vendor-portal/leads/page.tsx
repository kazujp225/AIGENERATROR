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
  ArrowLeft,
  FileText,
  MessageSquare,
  Clock,
  Filter,
  ArrowRight,
  Building2,
  Wallet,
  Calendar,
} from 'lucide-react'
import { mockLeads } from '@/mocks'

export default function LeadsPage() {
  const [statusFilter, setStatusFilter] = useState<string>('')

  const filteredLeads = mockLeads.filter((lead) => {
    if (statusFilter && lead.status !== statusFilter) return false
    return true
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge className="bg-blue-100 text-blue-700">新着</Badge>
      case 'reviewing':
        return <Badge className="bg-yellow-100 text-yellow-700">検討中</Badge>
      case 'quoted':
        return <Badge className="bg-purple-100 text-purple-700">見積済</Badge>
      case 'negotiating':
        return <Badge className="bg-orange-100 text-orange-700">商談中</Badge>
      case 'won':
        return <Badge className="bg-emerald-100 text-emerald-700">成約</Badge>
      case 'lost':
        return <Badge className="bg-gray-100 text-gray-700">見送り</Badge>
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
            href="/vendor-portal"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            ポータルに戻る
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">リード管理</h1>
          <p className="text-gray-600">問い合わせの対応・進捗管理ができます</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{mockLeads.length}</div>
              <div className="text-sm text-gray-500">すべて</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {mockLeads.filter((l) => l.status === 'new').length}
              </div>
              <div className="text-sm text-gray-500">新着</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {mockLeads.filter((l) => l.status === 'reviewing').length}
              </div>
              <div className="text-sm text-gray-500">検討中</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {mockLeads.filter((l) => l.status === 'negotiating').length}
              </div>
              <div className="text-sm text-gray-500">商談中</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-emerald-600">
                {mockLeads.filter((l) => l.status === 'won').length}
              </div>
              <div className="text-sm text-gray-500">成約</div>
            </CardContent>
          </Card>
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
                  <SelectItem value="new">新着</SelectItem>
                  <SelectItem value="reviewing">検討中</SelectItem>
                  <SelectItem value="quoted">見積済</SelectItem>
                  <SelectItem value="negotiating">商談中</SelectItem>
                  <SelectItem value="won">成約</SelectItem>
                  <SelectItem value="lost">見送り</SelectItem>
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

        {/* Leads List */}
        <div className="space-y-4">
          {filteredLeads.map((lead) => (
            <Card key={lead.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Main Info */}
                  <div className="flex items-start gap-4 flex-1">
                    <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg truncate">
                          {lead.projectName}
                        </h3>
                        {getStatusBadge(lead.status)}
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-2">
                        <span className="flex items-center gap-1">
                          <Building2 className="h-3 w-3" />
                          {lead.companyName}
                        </span>
                        <Badge variant="outline">{lead.industry}</Badge>
                        <Badge variant="outline">{lead.useCase}</Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Wallet className="h-3 w-3" />
                          {lead.budget.min / 10000}〜{lead.budget.max / 10000}万円
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {lead.timeline}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          受信: {lead.receivedAt}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Match Score & Actions */}
                  <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-3">
                    <div className="text-right">
                      <div className="text-sm text-gray-500">マッチ度</div>
                      <div
                        className={`text-2xl font-bold ${
                          lead.matchScore >= 90
                            ? 'text-emerald-600'
                            : lead.matchScore >= 80
                            ? 'text-blue-600'
                            : 'text-yellow-600'
                        }`}
                      >
                        {lead.matchScore}%
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-1" />
                        仕様書
                      </Button>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        返信
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Status Change Buttons */}
                {(lead.status === 'new' || lead.status === 'reviewing') && (
                  <div className="mt-4 pt-4 border-t flex flex-wrap gap-2">
                    <span className="text-sm text-gray-500 mr-2">ステータス変更:</span>
                    {lead.status === 'new' && (
                      <Button variant="outline" size="sm">
                        検討中にする
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      見積を提出
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                    >
                      見送り
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredLeads.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">リードがありません</h3>
              <p className="text-gray-600">
                条件に一致するリードは見つかりませんでした
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
