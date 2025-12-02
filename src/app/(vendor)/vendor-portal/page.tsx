'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Users,
  Briefcase,
  TrendingUp,
  Eye,
  MessageSquare,
  FileText,
  Star,
  ArrowRight,
  Bell,
  Clock,
} from 'lucide-react'
import { mockLeads, mockVendorAnalytics, mockProjects } from '@/mocks'

export default function VendorPortalPage() {
  const newLeads = mockLeads.filter((l) => l.status === 'new').length
  const activeProjects = mockProjects.length

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">ベンダーポータル</h1>
          <p className="text-gray-600">ようこそ、株式会社AIソリューションズ様</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{newLeads}</div>
                  <div className="text-sm text-gray-500">新着リード</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <Briefcase className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{activeProjects}</div>
                  <div className="text-sm text-gray-500">進行中案件</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Eye className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {mockVendorAnalytics.monthlyStats.profileViews}
                  </div>
                  <div className="text-sm text-gray-500">
                    今月のPV
                    <span className="text-emerald-600 ml-1">
                      +{mockVendorAnalytics.monthlyStats.profileViewsChange}%
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-yellow-100 flex items-center justify-center">
                  <Star className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {mockVendorAnalytics.rating}
                  </div>
                  <div className="text-sm text-gray-500">
                    評価 ({mockVendorAnalytics.reviewCount}件)
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* New Leads */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">新着リード</CardTitle>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/vendor-portal/leads">
                    すべて見る
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockLeads.slice(0, 3).map((lead) => (
                    <div
                      key={lead.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium">{lead.projectName}</div>
                          <div className="text-sm text-gray-500">
                            {lead.companyName} | {lead.industry}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="text-sm font-medium">
                            {lead.budget.min / 10000}〜{lead.budget.max / 10000}万円
                          </div>
                          <div className="text-xs text-gray-500">
                            マッチ度: {lead.matchScore}%
                          </div>
                        </div>
                        <Badge
                          className={
                            lead.status === 'new'
                              ? 'bg-blue-100 text-blue-700'
                              : lead.status === 'reviewing'
                              ? 'bg-yellow-100 text-yellow-700'
                              : lead.status === 'quoted'
                              ? 'bg-purple-100 text-purple-700'
                              : lead.status === 'negotiating'
                              ? 'bg-orange-100 text-orange-700'
                              : lead.status === 'won'
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-gray-100 text-gray-700'
                          }
                        >
                          {lead.status === 'new'
                            ? '新着'
                            : lead.status === 'reviewing'
                            ? '検討中'
                            : lead.status === 'quoted'
                            ? '見積済'
                            : lead.status === 'negotiating'
                            ? '商談中'
                            : lead.status === 'won'
                            ? '成約'
                            : '見送り'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <Link href="/vendor-portal/profile" className="block">
                    <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mx-auto mb-3">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="font-medium">プロフィール編集</div>
                    <div className="text-sm text-gray-500">会社情報を更新</div>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <Link href="/vendor-portal/leads" className="block">
                    <div className="h-12 w-12 rounded-lg bg-emerald-100 flex items-center justify-center mx-auto mb-3">
                      <MessageSquare className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div className="font-medium">リード管理</div>
                    <div className="text-sm text-gray-500">問い合わせ対応</div>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <Link href="/vendor-portal/analytics" className="block">
                    <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center mx-auto mb-3">
                      <TrendingUp className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="font-medium">分析レポート</div>
                    <div className="text-sm text-gray-500">パフォーマンス確認</div>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  通知
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <FileText className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">新規問い合わせ</div>
                      <div className="text-sm text-gray-500">
                        大手精密機器メーカーから外観検査AIの案件
                      </div>
                      <div className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3" />
                        1時間前
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                      <Star className="h-4 w-4 text-yellow-600" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">新しいレビュー</div>
                      <div className="text-sm text-gray-500">
                        株式会社〇〇様から★4.5の評価
                      </div>
                      <div className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3" />
                        3時間前
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">メッセージ受信</div>
                      <div className="text-sm text-gray-500">
                        地方銀行様から追加質問
                      </div>
                      <div className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3" />
                        5時間前
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">今月のパフォーマンス</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">問い合わせ数</span>
                  <div className="text-right">
                    <span className="font-semibold">
                      {mockVendorAnalytics.monthlyStats.inquiries}
                    </span>
                    <span className="text-emerald-600 text-sm ml-1">
                      +{mockVendorAnalytics.monthlyStats.inquiriesChange}%
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">見積提出数</span>
                  <div className="text-right">
                    <span className="font-semibold">
                      {mockVendorAnalytics.monthlyStats.quotes}
                    </span>
                    <span className="text-red-600 text-sm ml-1">
                      {mockVendorAnalytics.monthlyStats.quotesChange}%
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">成約数</span>
                  <div className="text-right">
                    <span className="font-semibold">
                      {mockVendorAnalytics.monthlyStats.deals}
                    </span>
                    <span className="text-emerald-600 text-sm ml-1">
                      +{mockVendorAnalytics.monthlyStats.dealsChange}%
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">成約率</span>
                  <span className="font-semibold">
                    {mockVendorAnalytics.conversionRate}%
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Help Card */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-blue-900 mb-2">リード獲得のコツ</h4>
                <p className="text-sm text-blue-700 mb-4">
                  プロフィールを充実させることで、問い合わせ率が向上します
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/vendor-portal/profile">プロフィールを編集</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
