'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  FileText,
  Building2,
  MessageSquare,
  Bookmark,
  Plus,
  ArrowRight,
  Clock,
  CheckCircle2,
} from 'lucide-react'

// モックデータ
const dashboardData = {
  stats: {
    activeProjects: 2,
    specifications: 5,
    inquiries: 3,
    savedVendors: 8,
  },
  recentActivities: [
    {
      id: 1,
      type: 'spec',
      title: '外観検査自動化プロジェクト',
      description: '仕様書を作成しました',
      time: '2時間前',
    },
    {
      id: 2,
      type: 'message',
      title: '株式会社AIソリューションズ',
      description: '見積もり回答が届きました',
      time: '5時間前',
    },
    {
      id: 3,
      type: 'project',
      title: 'チャットボット導入',
      description: '開発フェーズに進みました',
      time: '1日前',
    },
  ],
  specifications: [
    {
      id: 's1',
      title: '外観検査自動化プロジェクト',
      status: 'complete',
      createdAt: '2024-11-15',
      budget: '300〜500万円',
    },
    {
      id: 's2',
      title: 'RAGチャットボット構築',
      status: 'draft',
      createdAt: '2024-11-10',
      budget: '未設定',
    },
  ],
}

export default function DashboardPage() {
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
          <h1 className="text-2xl font-bold text-gray-900">ダッシュボード</h1>
          <p className="text-gray-600">ようこそ、山田さん</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{dashboardData.stats.activeProjects}</div>
                  <div className="text-sm text-gray-500">進行中プロジェクト</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{dashboardData.stats.specifications}</div>
                  <div className="text-sm text-gray-500">作成した仕様書</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{dashboardData.stats.inquiries}</div>
                  <div className="text-sm text-gray-500">問い合わせ中</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center">
                  <Bookmark className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{dashboardData.stats.savedVendors}</div>
                  <div className="text-sm text-gray-500">保存したベンダー</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Specifications */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">仕様書</CardTitle>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700" asChild>
                  <Link href="/aladdin">
                    <Plus className="mr-1 h-4 w-4" />
                    新規作成
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.specifications.map((spec) => (
                    <div
                      key={spec.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded bg-gray-100 flex items-center justify-center">
                          <FileText className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <div className="font-medium">{spec.title}</div>
                          <div className="text-sm text-gray-500">
                            作成日: {spec.createdAt} | 予算: {spec.budget}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {getStatusBadge(spec.status)}
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/dashboard/specs/${spec.id}`}>
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </Button>
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
                  <Link href="/aladdin" className="block">
                    <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mx-auto mb-3">
                      <MessageSquare className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="font-medium">新しい仕様書を作成</div>
                    <div className="text-sm text-gray-500">AIと対話して要件整理</div>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <Link href="/market" className="block">
                    <div className="h-12 w-12 rounded-lg bg-emerald-100 flex items-center justify-center mx-auto mb-3">
                      <Building2 className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div className="font-medium">相場を調べる</div>
                    <div className="text-sm text-gray-500">価格レンジを確認</div>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <Link href="/vendors" className="block">
                    <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center mx-auto mb-3">
                      <Bookmark className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="font-medium">ベンダーを探す</div>
                    <div className="text-sm text-gray-500">最適な会社を発見</div>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">最近のアクティビティ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.recentActivities.map((activity) => (
                    <div key={activity.id} className="flex gap-3">
                      <div className="flex-shrink-0">
                        <div
                          className={`h-8 w-8 rounded-full flex items-center justify-center ${
                            activity.type === 'spec'
                              ? 'bg-emerald-100'
                              : activity.type === 'message'
                              ? 'bg-blue-100'
                              : 'bg-purple-100'
                          }`}
                        >
                          {activity.type === 'spec' && (
                            <FileText className="h-4 w-4 text-emerald-600" />
                          )}
                          {activity.type === 'message' && (
                            <MessageSquare className="h-4 w-4 text-blue-600" />
                          )}
                          {activity.type === 'project' && (
                            <CheckCircle2 className="h-4 w-4 text-purple-600" />
                          )}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate">{activity.title}</div>
                        <div className="text-sm text-gray-500">{activity.description}</div>
                        <div className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                          <Clock className="h-3 w-3" />
                          {activity.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Help Card */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-blue-900 mb-2">サポートが必要ですか？</h4>
                <p className="text-sm text-blue-700 mb-4">
                  使い方がわからない場合は、ヘルプセンターをご覧ください
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/help">ヘルプを見る</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
