import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Target,
  Users,
  Lightbulb,
  Shield,
  ArrowRight,
} from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            AI開発の発注を、もっとシンプルに
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            AIAIOは、AI開発の発注における情報格差を解消し、
            企業とAI開発会社を最適につなぐプラットフォームです。
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">ミッション</h2>
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-8 text-center">
                <p className="text-xl text-blue-900 font-medium">
                  「何を、どこに、いくらで頼めばいいかわからない」
                  <br />
                  という課題を解決し、
                  <br />
                  日本のAI導入を加速させる
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12">私たちの価値観</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">透明性</h3>
                <p className="text-sm text-gray-600">
                  相場や評価を可視化し、正しい意思決定をサポート
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="h-12 w-12 rounded-lg bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="font-semibold mb-2">中立性</h3>
                <p className="text-sm text-gray-600">
                  特定のベンダーに偏らない、公平なマッチング
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">効率化</h3>
                <p className="text-sm text-gray-600">
                  AIを活用し、要件定義から選定までを効率化
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="font-semibold mb-2">信頼性</h3>
                <p className="text-sm text-gray-600">
                  厳格な審査を経た、信頼できるベンダーのみ掲載
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12">運営チーム</h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gray-600 mb-8">
              AIAIOは、AI開発・DX推進の経験豊富なメンバーが運営しています。
              大手企業でのAI導入支援、スタートアップでの開発経験を持つメンバーが、
              AI発注の課題を解決するために集まりました。
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="h-24 w-24 rounded-full bg-gray-200 mx-auto mb-4" />
                <div className="font-semibold">代表取締役</div>
                <div className="text-sm text-gray-500">AI事業部出身</div>
              </div>
              <div className="text-center">
                <div className="h-24 w-24 rounded-full bg-gray-200 mx-auto mb-4" />
                <div className="font-semibold">CTO</div>
                <div className="text-sm text-gray-500">MLエンジニア出身</div>
              </div>
              <div className="text-center">
                <div className="h-24 w-24 rounded-full bg-gray-200 mx-auto mb-4" />
                <div className="font-semibold">COO</div>
                <div className="text-sm text-gray-500">コンサル出身</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            AI開発の発注を始めましょう
          </h2>
          <p className="text-blue-100 mb-8">
            無料で要件定義AIを利用できます
          </p>
          <Button size="lg" variant="secondary" asChild>
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
