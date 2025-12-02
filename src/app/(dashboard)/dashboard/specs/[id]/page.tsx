'use client'

import { use } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  ArrowLeft,
  Download,
  Edit,
  Send,
  FileText,
  Building2,
  Wallet,
  Clock,
  CheckCircle2,
  AlertCircle,
  Database,
  Link2,
} from 'lucide-react'
import { mockSpecifications, mockVendors } from '@/mocks'

type Props = {
  params: Promise<{ id: string }>
}

export default function SpecDetailPage({ params }: Props) {
  const { id } = use(params)
  const spec = mockSpecifications.find((s) => s.id === id)

  if (!spec) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="text-center p-8">
          <h2 className="text-xl font-semibold mb-2">仕様書が見つかりません</h2>
          <Button asChild>
            <Link href="/dashboard/specs">一覧に戻る</Link>
          </Button>
        </Card>
      </div>
    )
  }

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

  // 推奨ベンダー（仮）
  const recommendedVendors = mockVendors.slice(0, 3)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard/specs"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            仕様書一覧に戻る
          </Link>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-2xl font-bold text-gray-900">{spec.projectName}</h1>
                {getStatusBadge(spec.status)}
              </div>
              <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                <Badge variant="outline">{spec.industry}</Badge>
                <Badge variant="outline">{spec.useCase}</Badge>
                <span>作成日: {spec.createdAt}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                PDF
              </Button>
              <Button variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                編集
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Send className="mr-2 h-4 w-4" />
                ベンダーに送付
              </Button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* 概要 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  プロジェクト概要
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">業界</div>
                    <div className="font-medium">{spec.industry}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">ユースケース</div>
                    <div className="font-medium">{spec.useCase}</div>
                  </div>
                </div>
                <Separator />
                <div>
                  <div className="text-sm text-gray-500 mb-2">期待される成果</div>
                  <p className="text-gray-700">{spec.expectedOutcome}</p>
                </div>
              </CardContent>
            </Card>

            {/* 現状課題 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                  現状課題
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 whitespace-pre-line">{spec.currentSituation}</p>
              </CardContent>
            </Card>

            {/* 要件 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  要件
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {spec.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* 技術要件 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">技術要件</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Database className={`h-5 w-5 ${spec.hasExistingData ? 'text-emerald-600' : 'text-gray-400'}`} />
                    <div>
                      <div className="font-medium">既存データ</div>
                      <div className="text-sm text-gray-500">
                        {spec.hasExistingData ? 'あり' : 'なし'}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Link2 className={`h-5 w-5 ${spec.needsIntegration ? 'text-blue-600' : 'text-gray-400'}`} />
                    <div>
                      <div className="font-medium">システム連携</div>
                      <div className="text-sm text-gray-500">
                        {spec.needsIntegration ? '必要' : '不要'}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* 予算・期間 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">予算・期間</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                    <Wallet className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">予算</div>
                    <div className="font-semibold">
                      {spec.budget.min / 10000}〜{spec.budget.max / 10000}万円
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">希望期間</div>
                    <div className="font-semibold">{spec.timeline}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 相場レンジ */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">この要件の相場</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <span>300万円</span>
                    <span>600万円</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full relative">
                    <div
                      className="absolute h-full bg-blue-600 rounded-full"
                      style={{ width: '60%' }}
                    />
                    <div
                      className="absolute top-1/2 -translate-y-1/2 h-4 w-4 bg-blue-600 rounded-full border-2 border-white shadow"
                      style={{ left: '60%', marginLeft: '-8px' }}
                    />
                  </div>
                  <div className="text-center mt-2 font-semibold text-blue-600">
                    中央値: 450万円
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  類似案件: 23件 | 期間: 2〜4ヶ月
                </div>
              </CardContent>
            </Card>

            {/* 推奨ベンダー */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">おすすめベンダー</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recommendedVendors.map((vendor, index) => (
                  <div key={vendor.id} className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center font-bold text-blue-600">
                      {vendor.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">{vendor.name}</div>
                      <div className="text-xs text-gray-500">
                        マッチ度: {92 - index * 7}%
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/vendors/${vendor.id}`}>
                        <Building2 className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                ))}
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/vendors">すべてのベンダーを見る</Link>
                </Button>
              </CardContent>
            </Card>

            {/* アクション */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-blue-900 mb-2">次のステップ</h4>
                <p className="text-sm text-blue-700 mb-4">
                  仕様書の内容を確認し、ベンダーに問い合わせましょう
                </p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Send className="mr-2 h-4 w-4" />
                  ベンダーに相談する
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
