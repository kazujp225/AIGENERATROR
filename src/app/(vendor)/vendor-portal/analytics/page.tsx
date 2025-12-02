'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import {
  ArrowLeft,
  Eye,
  MessageSquare,
  FileText,
  TrendingUp,
  TrendingDown,
  Star,
  Clock,
  CheckCircle2,
  Users,
} from 'lucide-react'
import { mockVendorAnalytics, mockLeads } from '@/mocks'

export default function AnalyticsPage() {
  const stats = mockVendorAnalytics.monthlyStats

  // 業界別リード分布を計算
  const industryDistribution = mockLeads.reduce((acc, lead) => {
    acc[lead.industry] = (acc[lead.industry] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const totalLeads = mockLeads.length
  const industryData = Object.entries(industryDistribution).map(([industry, count]) => ({
    industry,
    count,
    percentage: Math.round((count / totalLeads) * 100),
  }))

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
          <h1 className="text-2xl font-bold text-gray-900">分析レポート</h1>
          <p className="text-gray-600">パフォーマンスを分析して改善ポイントを見つけましょう</p>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-500">プロフィール閲覧</div>
                  <div className="text-2xl font-bold">{stats.profileViews}</div>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  {stats.profileViewsChange >= 0 ? (
                    <>
                      <TrendingUp className="h-4 w-4 text-emerald-600" />
                      <span className="text-emerald-600">+{stats.profileViewsChange}%</span>
                    </>
                  ) : (
                    <>
                      <TrendingDown className="h-4 w-4 text-red-600" />
                      <span className="text-red-600">{stats.profileViewsChange}%</span>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-500">問い合わせ数</div>
                  <div className="text-2xl font-bold">{stats.inquiries}</div>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  {stats.inquiriesChange >= 0 ? (
                    <>
                      <TrendingUp className="h-4 w-4 text-emerald-600" />
                      <span className="text-emerald-600">+{stats.inquiriesChange}%</span>
                    </>
                  ) : (
                    <>
                      <TrendingDown className="h-4 w-4 text-red-600" />
                      <span className="text-red-600">{stats.inquiriesChange}%</span>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-500">見積提出数</div>
                  <div className="text-2xl font-bold">{stats.quotes}</div>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  {stats.quotesChange >= 0 ? (
                    <>
                      <TrendingUp className="h-4 w-4 text-emerald-600" />
                      <span className="text-emerald-600">+{stats.quotesChange}%</span>
                    </>
                  ) : (
                    <>
                      <TrendingDown className="h-4 w-4 text-red-600" />
                      <span className="text-red-600">{stats.quotesChange}%</span>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-500">成約数</div>
                  <div className="text-2xl font-bold">{stats.deals}</div>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  {stats.dealsChange >= 0 ? (
                    <>
                      <TrendingUp className="h-4 w-4 text-emerald-600" />
                      <span className="text-emerald-600">+{stats.dealsChange}%</span>
                    </>
                  ) : (
                    <>
                      <TrendingDown className="h-4 w-4 text-red-600" />
                      <span className="text-red-600">{stats.dealsChange}%</span>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Views Chart (Simplified) */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Eye className="h-5 w-5 text-blue-600" />
                  プロフィール閲覧数推移
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end gap-1">
                  {mockVendorAnalytics.profileViews.map((data, index) => (
                    <div
                      key={index}
                      className="flex-1 bg-blue-600 rounded-t hover:bg-blue-700 transition-colors"
                      style={{
                        height: `${(data.count / 100) * 100}%`,
                        minHeight: '10px',
                      }}
                      title={`${data.date}: ${data.count}件`}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>11/1</span>
                  <span>11/7</span>
                  <span>11/14</span>
                </div>
              </CardContent>
            </Card>

            {/* Conversion Funnel */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-emerald-600" />
                  コンバージョンファネル
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">プロフィール閲覧</span>
                      <span className="text-sm font-medium">{stats.profileViews}</span>
                    </div>
                    <Progress value={100} className="h-3" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">問い合わせ</span>
                      <span className="text-sm font-medium">
                        {stats.inquiries} ({Math.round((stats.inquiries / stats.profileViews) * 100)}%)
                      </span>
                    </div>
                    <Progress
                      value={(stats.inquiries / stats.profileViews) * 100}
                      className="h-3"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">見積提出</span>
                      <span className="text-sm font-medium">
                        {stats.quotes} ({Math.round((stats.quotes / stats.inquiries) * 100)}%)
                      </span>
                    </div>
                    <Progress
                      value={(stats.quotes / stats.profileViews) * 100}
                      className="h-3"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">成約</span>
                      <span className="text-sm font-medium">
                        {stats.deals} ({Math.round((stats.deals / stats.quotes) * 100)}%)
                      </span>
                    </div>
                    <Progress
                      value={(stats.deals / stats.profileViews) * 100}
                      className="h-3"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Industry Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-600" />
                  業界別リード分布
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {industryData.map((data) => (
                    <div key={data.industry}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">{data.industry}</span>
                        <span className="text-sm font-medium">
                          {data.count}件 ({data.percentage}%)
                        </span>
                      </div>
                      <Progress value={data.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Key Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">主要指標</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    <span className="text-sm">成約率</span>
                  </div>
                  <span className="font-semibold">
                    {mockVendorAnalytics.conversionRate}%
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <span className="text-sm">平均レス時間</span>
                  </div>
                  <span className="font-semibold">
                    {mockVendorAnalytics.avgResponseTime}時間
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-600" />
                    <span className="text-sm">評価</span>
                  </div>
                  <span className="font-semibold">
                    {mockVendorAnalytics.rating}/5.0
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Industry Comparison */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">業界平均との比較</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">成約率</span>
                    <span>
                      <span className="font-semibold text-emerald-600">
                        {mockVendorAnalytics.conversionRate}%
                      </span>
                      <span className="text-gray-400 mx-1">vs</span>
                      <span className="text-gray-500">25%</span>
                    </span>
                  </div>
                  <div className="text-xs text-emerald-600">業界平均+7%</div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">平均レス時間</span>
                    <span>
                      <span className="font-semibold text-emerald-600">
                        {mockVendorAnalytics.avgResponseTime}h
                      </span>
                      <span className="text-gray-400 mx-1">vs</span>
                      <span className="text-gray-500">6.2h</span>
                    </span>
                  </div>
                  <div className="text-xs text-emerald-600">業界平均より63%速い</div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">評価スコア</span>
                    <span>
                      <span className="font-semibold text-emerald-600">
                        {mockVendorAnalytics.rating}
                      </span>
                      <span className="text-gray-400 mx-1">vs</span>
                      <span className="text-gray-500">3.8</span>
                    </span>
                  </div>
                  <div className="text-xs text-emerald-600">業界平均+0.7</div>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-blue-900 mb-2">改善ポイント</h4>
                <ul className="text-sm text-blue-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>レスポンス時間が速く、高評価です</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MessageSquare className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>見積提出率を上げると成約数が増加します</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FileText className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>実績を追加するとPV数が向上します</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
