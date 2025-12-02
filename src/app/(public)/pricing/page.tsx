import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, ArrowRight } from 'lucide-react'

const plans = [
  {
    name: 'フリー',
    price: '0',
    description: 'AI開発を検討中の方に',
    features: [
      '要件定義AI（月3回まで）',
      '相場検索（基本情報のみ）',
      'ベンダー一覧閲覧',
      '事例閲覧',
    ],
    cta: '無料で始める',
    ctaLink: '/register',
    popular: false,
  },
  {
    name: 'スタンダード',
    price: '9,800',
    description: '本格的にAI導入を進めたい方に',
    features: [
      '要件定義AI（無制限）',
      '相場検索（詳細レポート）',
      'ベンダー詳細・比較',
      '事例詳細閲覧',
      'マッチング機能',
      '仕様書のPDF出力',
      'メールサポート',
    ],
    cta: '14日間無料トライアル',
    ctaLink: '/register',
    popular: true,
  },
  {
    name: 'エンタープライズ',
    price: '要相談',
    description: '大規模導入・複数案件の方に',
    features: [
      'スタンダードの全機能',
      '専任サポート',
      'カスタムレポート',
      'API連携',
      'SLA保証',
      '請求書払い対応',
      'オンボーディング支援',
    ],
    cta: 'お問い合わせ',
    ctaLink: '/contact',
    popular: false,
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">料金プラン</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            AIAIOは、AI開発を検討中の方から本格導入を進める企業まで、
            様々なニーズに対応したプランをご用意しています。
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative ${
                  plan.popular ? 'border-blue-600 border-2 shadow-lg' : ''
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600">
                    おすすめ
                  </Badge>
                )}
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <p className="text-sm text-gray-500">{plan.description}</p>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="mb-6">
                    {plan.price === '要相談' ? (
                      <span className="text-3xl font-bold">{plan.price}</span>
                    ) : (
                      <>
                        <span className="text-3xl font-bold">
                          ¥{plan.price}
                        </span>
                        <span className="text-gray-500">/月</span>
                      </>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8 text-left">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${
                      plan.popular
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : ''
                    }`}
                    variant={plan.popular ? 'default' : 'outline'}
                    asChild
                  >
                    <Link href={plan.ctaLink}>{plan.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12">よくある質問</h2>
          <div className="max-w-2xl mx-auto space-y-6">
            <div>
              <h3 className="font-semibold mb-2">無料プランでも相場は調べられますか？</h3>
              <p className="text-gray-600 text-sm">
                はい、基本的な相場情報は無料プランでもご覧いただけます。
                詳細なレポートや分析機能はスタンダードプラン以上でご利用いただけます。
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">トライアル期間中に解約できますか？</h3>
              <p className="text-gray-600 text-sm">
                はい、14日間のトライアル期間中はいつでも解約可能です。
                トライアル中に解約された場合、料金は発生しません。
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">ベンダーへの問い合わせに費用はかかりますか？</h3>
              <p className="text-gray-600 text-sm">
                いいえ、ベンダーへの問い合わせ自体は無料です。
                ただし、詳細な仕様書の送付やマッチング機能はスタンダードプラン以上が必要です。
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">支払い方法は何がありますか？</h3>
              <p className="text-gray-600 text-sm">
                クレジットカード（VISA, Mastercard, AMEX）に対応しています。
                エンタープライズプランでは請求書払いも可能です。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            まずは無料で試してみませんか？
          </h2>
          <p className="text-blue-100 mb-8">
            14日間の無料トライアルで、すべての機能をお試しいただけます
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/register">
              無料トライアルを開始
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
