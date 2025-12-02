'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  MessageSquare,
  FileText,
  Clock,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react'

export default function AladdinPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="h-16 w-16 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto mb-6">
              <MessageSquare className="h-8 w-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              対話するだけで、AI開発の仕様書が完成
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              10〜15の質問に答えるだけ。専門知識は不要です。
            </p>
            <div className="flex items-center justify-center gap-2 text-gray-500 mb-8">
              <Clock className="h-5 w-5" />
              <span>所要時間：約5〜10分</span>
            </div>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8" asChild>
              <Link href="/aladdin/start">
                無料で始める
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">対話形式で簡単</h3>
                <p className="text-gray-600 text-sm">
                  AIとの自然な対話で要件を整理。難しい専門用語は不要です。
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-lg bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">標準フォーマット</h3>
                <p className="text-gray-600 text-sm">
                  どの開発会社にも通用する標準的な仕様書を自動生成します。
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">相場も同時に</h3>
                <p className="text-gray-600 text-sm">
                  仕様書と一緒に、相場レンジと推奨ベンダーも提示します。
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sample Spec Preview */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">生成される仕様書のイメージ</h2>
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="space-y-4 text-sm">
                  <div>
                    <h4 className="font-semibold text-gray-900">1. プロジェクト概要</h4>
                    <p className="text-gray-600 ml-4">業界、ユースケース、想定予算、希望納期</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">2. 現状課題</h4>
                    <p className="text-gray-600 ml-4">対象業務、現状の処理方法、解決したい課題</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">3. ゴール定義</h4>
                    <p className="text-gray-600 ml-4">定量目標、定性目標、KPI</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">4. データ要件</h4>
                    <p className="text-gray-600 ml-4">入力データ、教師データ、データ品質</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">5. システム要件</h4>
                    <p className="text-gray-600 ml-4">連携システム、インフラ制約、セキュリティ</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">6. 概算見積もり</h4>
                    <p className="text-gray-600 ml-4">相場レンジ、期間レンジ、推奨ベンダー</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">さっそく始めましょう</h2>
          <p className="text-gray-600 mb-8">無料で仕様書を作成できます</p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8" asChild>
            <Link href="/aladdin/start">
              要件定義を始める
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
