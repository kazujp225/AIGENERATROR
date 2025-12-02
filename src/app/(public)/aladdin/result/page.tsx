'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  FileText,
  Download,
  Edit,
  Save,
  Star,
  Clock,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react'
import { sampleSpecification, mockVendors, mockMarketData } from '@/mocks'

export default function AladdinResultPage() {
  const spec = sampleSpecification
  const marketData = mockMarketData[0] // 製造業×外観検査のデータ
  const recommendedVendors = mockVendors.filter((v) => v.featured).slice(0, 3)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="h-8 w-8 text-emerald-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              仕様書が完成しました
            </h1>
            <p className="text-gray-600">
              以下の内容をご確認ください。編集や保存も可能です。
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content - Specification */}
            <div className="lg:col-span-2 space-y-6">
              {/* Specification Card */}
              <Card className="shadow-lg">
                <CardHeader className="border-b bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <CardTitle>AI開発 要件定義書</CardTitle>
                    </div>
                    <Badge variant="secondary">自動生成</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  {/* Project Overview */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="h-6 w-6 rounded bg-blue-100 text-blue-600 flex items-center justify-center text-sm">1</span>
                      プロジェクト概要
                    </h3>
                    <div className="ml-8 grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">プロジェクト名：</span>
                        <span className="text-gray-900">{spec.projectName}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">業界：</span>
                        <span className="text-gray-900">{spec.industry}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">ユースケース：</span>
                        <span className="text-gray-900">{spec.useCase}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">希望納期：</span>
                        <span className="text-gray-900">{spec.timeline}</span>
                      </div>
                    </div>
                  </div>

                  {/* Current Issues */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="h-6 w-6 rounded bg-blue-100 text-blue-600 flex items-center justify-center text-sm">2</span>
                      現状課題
                    </h3>
                    <div className="ml-8 text-sm text-gray-700 whitespace-pre-line">
                      {spec.currentIssues}
                    </div>
                  </div>

                  {/* Goals */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="h-6 w-6 rounded bg-blue-100 text-blue-600 flex items-center justify-center text-sm">3</span>
                      ゴール定義
                    </h3>
                    <ul className="ml-8 space-y-2 text-sm">
                      {spec.goals.map((goal, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5" />
                          <span className="text-gray-700">{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Data Requirements */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="h-6 w-6 rounded bg-blue-100 text-blue-600 flex items-center justify-center text-sm">4</span>
                      データ要件
                    </h3>
                    <div className="ml-8 text-sm text-gray-700 whitespace-pre-line">
                      {spec.dataRequirements}
                    </div>
                  </div>

                  {/* System Requirements */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="h-6 w-6 rounded bg-blue-100 text-blue-600 flex items-center justify-center text-sm">5</span>
                      システム要件
                    </h3>
                    <div className="ml-8 text-sm text-gray-700 whitespace-pre-line">
                      {spec.systemRequirements}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <Button variant="outline" className="flex-1">
                  <Download className="mr-2 h-4 w-4" />
                  PDFダウンロード
                </Button>
                <Button variant="outline" className="flex-1">
                  <Edit className="mr-2 h-4 w-4" />
                  編集する
                </Button>
                <Button variant="outline" className="flex-1">
                  <Save className="mr-2 h-4 w-4" />
                  保存する
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Market Price */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">この要件の相場</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-blue-600">
                      {(marketData.priceRange.min / 10000).toLocaleString()}〜
                      {(marketData.priceRange.max / 10000).toLocaleString()}万円
                    </div>
                    <div className="text-sm text-gray-500">
                      中央値: {(marketData.priceRange.median / 10000).toLocaleString()}万円
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">期間</span>
                      <span>{marketData.durationRange.min}〜{marketData.durationRange.max}ヶ月</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">類似案件数</span>
                      <span>{marketData.sampleCount}件</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">成功率</span>
                      <span>{Math.round(marketData.successRate * 100)}%</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4" asChild>
                    <Link href="/market">詳細を見る</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Recommended Vendors */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">おすすめの開発会社</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recommendedVendors.map((vendor, index) => (
                    <div key={vendor.id} className="p-3 border rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded bg-gray-100 flex items-center justify-center font-bold text-gray-600 text-sm">
                          {vendor.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm truncate">{vendor.name}</div>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span>{vendor.rating}</span>
                          </div>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          マッチ度{92 - index * 7}%
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        <span>レス{vendor.metrics.avgResponseTime}h</span>
                        <CheckCircle2 className="h-3 w-3 ml-2" />
                        <span>納期遵守{Math.round(vendor.metrics.onTimeDeliveryRate * 100)}%</span>
                      </div>
                    </div>
                  ))}
                  <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                    <Link href="/vendors">
                      すべてのベンダーを見る
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Next Actions */}
              <Card className="shadow-lg bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-blue-900 mb-3">次のステップ</h4>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li className="flex items-start gap-2">
                      <span className="font-medium">1.</span>
                      <span>ベンダーに相談する</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-medium">2.</span>
                      <span>見積もりを比較する</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-medium">3.</span>
                      <span>プロジェクトを開始</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
