'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  MessageSquare,
  BarChart3,
  Building2,
  ArrowRight,
  Star,
  Clock,
  CheckCircle2,
  Users,
} from 'lucide-react'
import { mockVendors, mockCases, industries, useCases } from '@/mocks'

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-blue-50 via-white to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              AI開発、もう迷わない
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              仕様書を自動作成、相場がわかる、最適なベンダーが見つかる
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8" asChild>
                <Link href="/aladdin">
                  無料で要件定義を始める
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8" asChild>
                <Link href="/market">相場を調べる</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">対話するだけで仕様書完成</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  AIとの対話で要件を整理。専門知識不要で標準フォーマットの仕様書を自動生成します。
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-emerald-100 flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-emerald-600" />
                </div>
                <CardTitle className="text-xl">相場が一目でわかる</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  業界×ユースケース別の価格レンジを可視化。見積もりの妥当性を即座に判断できます。
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                  <Building2 className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-xl">最適なベンダーを発見</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  強み・実績・評価で比較。あなたの案件にマッチする開発会社を提案します。
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">利用の流れ</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: 1, title: '要件を整理', desc: 'AIと対話して仕様書を作成' },
              { step: 2, title: '相場を確認', desc: '類似案件の価格帯を確認' },
              { step: 3, title: 'ベンダー選定', desc: '評価・実績で最適な会社を選ぶ' },
            ].map((item, index) => (
              <div key={item.step} className="text-center relative">
                <div className="h-16 w-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
                {index < 2 && (
                  <ArrowRight className="hidden md:block absolute top-8 -right-4 h-6 w-6 text-gray-400" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-blue-100">登録ベンダー数</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1,200+</div>
              <div className="text-blue-100">仕様書生成数</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">150+</div>
              <div className="text-blue-100">相場データ</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">3日</div>
              <div className="text-blue-100">平均マッチング</div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Market Search Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">今すぐ相場を調べる</h2>
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      業界
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="業界を選択" />
                      </SelectTrigger>
                      <SelectContent>
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
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="ユースケースを選択" />
                      </SelectTrigger>
                      <SelectContent>
                        {useCases.map((useCase) => (
                          <SelectItem key={useCase} value={useCase}>
                            {useCase}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                  <Link href="/market">相場を検索</Link>
                </Button>
                <p className="text-center text-sm text-gray-500 mt-4">
                  例：製造業×外観検査：300〜600万円
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Cases Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">導入事例</h2>
            <Button variant="outline" asChild>
              <Link href="/cases">すべて見る</Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {mockCases.slice(0, 3).map((caseStudy) => (
              <Card key={caseStudy.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex gap-2 mb-2">
                    <Badge variant="secondary">{caseStudy.industry}</Badge>
                    <Badge variant="outline">{caseStudy.technology}</Badge>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{caseStudy.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm text-gray-600 mb-4">
                    <span>費用: {(caseStudy.cost / 10000).toLocaleString()}万円</span>
                    <span>期間: {caseStudy.duration}</span>
                  </div>
                  <Button variant="link" className="p-0" asChild>
                    <Link href={`/cases/${caseStudy.id}`}>
                      詳しく見る <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Vendors Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold">信頼できるAI開発会社が集結</h2>
              <p className="text-gray-600 mt-2">厳選されたパートナー企業をご紹介</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/vendors">すべて見る</Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {mockVendors.filter(v => v.featured).slice(0, 3).map((vendor) => (
              <Card key={vendor.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center font-bold text-gray-600">
                        {vendor.name.charAt(0)}
                      </div>
                      <div>
                        <CardTitle className="text-base">{vendor.name}</CardTitle>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{vendor.rating}</span>
                          <span>({vendor.reviewCount}件)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {vendor.industries.slice(0, 3).map((industry) => (
                      <Badge key={industry} variant="secondary" className="text-xs">
                        {industry}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{vendor.metrics.avgResponseTime}h</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>{Math.round(vendor.metrics.onTimeDeliveryRate * 100)}%</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`/vendors/${vendor.id}`}>詳細を見る</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA for Both Sides */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-blue-600 text-white border-0">
              <CardHeader>
                <CardTitle className="text-2xl">AI開発を検討中の方へ</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5" />
                    無料で仕様書作成
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5" />
                    相場感を把握
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5" />
                    最適なベンダーを発見
                  </li>
                </ul>
                <Button size="lg" variant="secondary" className="w-full" asChild>
                  <Link href="/aladdin">要件定義を始める</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 text-white border-0">
              <CardHeader>
                <CardTitle className="text-2xl">AI開発会社の方へ</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    案件獲得チャネルを増やす
                  </li>
                  <li className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    質の高いリードを獲得
                  </li>
                  <li className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    明確な仕様で受注
                  </li>
                </ul>
                <Button size="lg" variant="secondary" className="w-full" asChild>
                  <Link href="/register?type=vendor">パートナー登録</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">よくある質問</h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>利用料金はかかりますか？</AccordionTrigger>
                <AccordionContent>
                  要件定義AIの利用、相場検索、ベンダー一覧の閲覧は無料です。ベンダーとのマッチングが成立した場合のみ、成約手数料が発生します。
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>どんな案件が対象ですか？</AccordionTrigger>
                <AccordionContent>
                  AI・機械学習を活用したシステム開発全般が対象です。チャットボット、画像認識、需要予測、自然言語処理など、幅広いユースケースに対応しています。
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>相場データはどこから取得していますか？</AccordionTrigger>
                <AccordionContent>
                  プラットフォーム経由の成約案件データ、提携ベンダーからの匿名化された実績情報、公開されている導入事例などを元に算出しています。
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>ベンダー登録の条件は？</AccordionTrigger>
                <AccordionContent>
                  AI開発の実績があり、品質基準を満たす開発会社であれば登録可能です。審査の上、掲載を決定しています。
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            AI開発の第一歩を、今日から
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            まずは無料で要件定義を始めてみませんか？
          </p>
          <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
            <Link href="/aladdin">
              無料で始める
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
