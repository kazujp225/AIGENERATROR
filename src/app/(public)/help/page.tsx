'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Search,
  MessageSquare,
  FileText,
  Building2,
  TrendingUp,
  Settings,
  HelpCircle,
} from 'lucide-react'

const categories = [
  {
    id: 'getting-started',
    name: 'はじめに',
    icon: HelpCircle,
    faqs: [
      {
        question: 'AIAIOとは何ですか？',
        answer:
          'AIAIOは、AI開発の発注を支援するプラットフォームです。要件定義の作成、相場の確認、最適なベンダーの選定までをサポートします。',
      },
      {
        question: '利用料金はかかりますか？',
        answer:
          '基本的な機能は無料でご利用いただけます。より高度な機能（詳細な相場レポート、マッチング機能など）はスタンダードプラン以上で利用可能です。料金の詳細は料金ページをご確認ください。',
      },
      {
        question: 'アカウント登録は必須ですか？',
        answer:
          '相場検索やベンダー一覧の閲覧は登録なしでも可能ですが、要件定義AIの利用やベンダーへの問い合わせには登録が必要です。',
      },
    ],
  },
  {
    id: 'aladdin',
    name: '要件定義AI（アラジン）',
    icon: MessageSquare,
    faqs: [
      {
        question: '要件定義AIとは何ですか？',
        answer:
          'AIとの対話を通じて、AI開発の要件を整理し、標準化された仕様書を自動生成する機能です。専門知識がなくても、簡単な質問に答えるだけで仕様書が作成できます。',
      },
      {
        question: '作成した仕様書は編集できますか？',
        answer:
          'はい、生成された仕様書は後から編集・修正が可能です。ダッシュボードの仕様書管理から編集できます。',
      },
      {
        question: '仕様書をPDFでダウンロードできますか？',
        answer:
          'スタンダードプラン以上で、仕様書のPDFダウンロードが可能です。フリープランでは画面上での閲覧のみとなります。',
      },
    ],
  },
  {
    id: 'market',
    name: '相場検索',
    icon: TrendingUp,
    faqs: [
      {
        question: '相場データはどこから来ていますか？',
        answer:
          '登録ベンダーからの情報提供、実際の案件データ、業界調査などから収集・分析したデータを使用しています。定期的に更新されています。',
      },
      {
        question: '相場はあくまで目安ですか？',
        answer:
          'はい、表示される相場は業界平均的な価格レンジを示したものです。実際の見積もりは、具体的な要件によって変動します。',
      },
      {
        question: '相場の精度を上げるにはどうすればよいですか？',
        answer:
          '要件定義AIで仕様書を作成すると、その内容に基づいたより精度の高い相場が表示されます。',
      },
    ],
  },
  {
    id: 'vendors',
    name: 'ベンダー検索',
    icon: Building2,
    faqs: [
      {
        question: '掲載されているベンダーは審査済みですか？',
        answer:
          'はい、すべてのベンダーは当社の審査を経て掲載されています。会社情報、実績、技術力などを確認しています。',
      },
      {
        question: 'ベンダーへの問い合わせに費用はかかりますか？',
        answer:
          '問い合わせ自体は無料です。実際のプロジェクト契約はベンダーとの直接契約となり、当社は仲介手数料を頂きません。',
      },
      {
        question: '複数のベンダーを比較できますか？',
        answer:
          'はい、ベンダー比較機能で最大4社まで同時に比較できます。技術力、価格帯、評価などを一覧で確認できます。',
      },
    ],
  },
  {
    id: 'specs',
    name: '仕様書管理',
    icon: FileText,
    faqs: [
      {
        question: '仕様書は何件まで保存できますか？',
        answer:
          'フリープランでは3件まで、スタンダードプラン以上では無制限に保存できます。',
      },
      {
        question: '仕様書を複製できますか？',
        answer:
          'はい、既存の仕様書を複製して新しい仕様書を作成できます。類似案件の要件定義に便利です。',
      },
      {
        question: '仕様書を削除するとどうなりますか？',
        answer:
          '削除された仕様書は復元できません。削除前に必要な情報はダウンロードしておくことをおすすめします。',
      },
    ],
  },
  {
    id: 'account',
    name: 'アカウント設定',
    icon: Settings,
    faqs: [
      {
        question: 'パスワードを忘れました',
        answer:
          'ログイン画面の「パスワードを忘れた方」からパスワードリセットが可能です。登録メールアドレスにリセットリンクが送信されます。',
      },
      {
        question: 'メールアドレスを変更できますか？',
        answer:
          'はい、ダッシュボードの設定画面からメールアドレスを変更できます。変更後は確認メールが送信されます。',
      },
      {
        question: 'アカウントを削除したい',
        answer:
          'ダッシュボードの設定画面から退会手続きが可能です。削除されたアカウントと関連データは復元できませんのでご注意ください。',
      },
    ],
  },
]

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('getting-started')

  const filteredCategories = categories.map((category) => ({
    ...category,
    faqs: category.faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  }))

  const currentCategory = searchQuery
    ? filteredCategories
    : [categories.find((c) => c.id === selectedCategory)!]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">ヘルプセンター</h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            AIAIOの使い方やよくある質問を確認できます。
            お探しの情報が見つからない場合は、お問い合わせください。
          </p>
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="search"
              placeholder="キーワードで検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {/* Sidebar */}
            {!searchQuery && (
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle className="text-lg">カテゴリ</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <nav className="space-y-1">
                      {categories.map((category) => {
                        const Icon = category.icon
                        return (
                          <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                              selectedCategory === category.id
                                ? 'bg-blue-50 text-blue-700 border-l-2 border-blue-600'
                                : 'hover:bg-gray-50'
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                            {category.name}
                          </button>
                        )
                      })}
                    </nav>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Content */}
            <div className={searchQuery ? 'lg:col-span-4' : 'lg:col-span-3'}>
              {currentCategory.map((category) =>
                category && category.faqs.length > 0 ? (
                  <div key={category.id} className="mb-8">
                    {searchQuery && (
                      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <category.icon className="h-5 w-5" />
                        {category.name}
                      </h2>
                    )}
                    <Card>
                      <CardContent className="p-0">
                        <Accordion type="single" collapsible>
                          {category.faqs.map((faq, index) => (
                            <AccordionItem
                              key={index}
                              value={`${category.id}-${index}`}
                            >
                              <AccordionTrigger className="px-6">
                                {faq.question}
                              </AccordionTrigger>
                              <AccordionContent className="px-6 pb-4 text-gray-600">
                                {faq.answer}
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </CardContent>
                    </Card>
                  </div>
                ) : null
              )}

              {searchQuery &&
                filteredCategories.every((c) => c.faqs.length === 0) && (
                  <Card className="text-center py-12">
                    <CardContent>
                      <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">
                        該当する質問が見つかりませんでした
                      </h3>
                      <p className="text-gray-600 mb-4">
                        別のキーワードで検索するか、お問い合わせください
                      </p>
                      <Button asChild>
                        <Link href="/contact">お問い合わせ</Link>
                      </Button>
                    </CardContent>
                  </Card>
                )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-white border-t">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">お探しの情報は見つかりましたか？</h2>
          <p className="text-gray-600 mb-8">
            解決しない場合は、お気軽にお問い合わせください。
            担当者が迅速に対応いたします。
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
            <Link href="/contact">お問い合わせ</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
