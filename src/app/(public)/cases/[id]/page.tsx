'use client'

import { use } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Clock,
  Wallet,
  ArrowRight,
} from 'lucide-react'
import { mockCases, mockVendors } from '@/mocks'

type Props = {
  params: Promise<{ id: string }>
}

export default function CaseDetailPage({ params }: Props) {
  const { id } = use(params)
  const caseStudy = mockCases.find((c) => c.id === id)
  const vendor = mockVendors.find((v) => v.id === caseStudy?.vendorId)

  if (!caseStudy) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="text-center p-8">
          <h2 className="text-xl font-semibold mb-2">事例が見つかりません</h2>
          <Button asChild>
            <Link href="/cases">一覧に戻る</Link>
          </Button>
        </Card>
      </div>
    )
  }

  const relatedCases = mockCases
    .filter((c) => c.id !== id && c.industry === caseStudy.industry)
    .slice(0, 2)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b py-8">
        <div className="container mx-auto px-4">
          <Link
            href="/cases"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            事例一覧に戻る
          </Link>

          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary">{caseStudy.industry}</Badge>
            <Badge variant="outline">{caseStudy.useCase}</Badge>
            <Badge variant="outline">{caseStudy.technology}</Badge>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {caseStudy.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              <span>{caseStudy.company}</span>
            </div>
            <div className="flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              <span>{(caseStudy.cost / 10000).toLocaleString()}万円</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{caseStudy.duration}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Challenge */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">課題</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 whitespace-pre-line">{caseStudy.challenge}</p>
              </CardContent>
            </Card>

            {/* Solution */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">解決策</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 whitespace-pre-line">{caseStudy.solution}</p>
              </CardContent>
            </Card>

            {/* Results */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">成果</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {caseStudy.results.map((result, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{result}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Success Factors & Warnings */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-emerald-50 border-emerald-200">
                <CardHeader>
                  <CardTitle className="text-lg text-emerald-900">成功のポイント</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {caseStudy.successFactors.map((factor, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span className="text-emerald-800">{factor}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-amber-50 border-amber-200">
                <CardHeader>
                  <CardTitle className="text-lg text-amber-900">注意点</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {caseStudy.warnings.map((warning, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                        <span className="text-amber-800">{warning}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">プロジェクト情報</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">業界</span>
                  <span className="font-medium">{caseStudy.industry}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-gray-600">ユースケース</span>
                  <span className="font-medium">{caseStudy.useCase}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-gray-600">技術</span>
                  <span className="font-medium">{caseStudy.technology}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-gray-600">費用</span>
                  <span className="font-medium">{(caseStudy.cost / 10000).toLocaleString()}万円</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-gray-600">期間</span>
                  <span className="font-medium">{caseStudy.duration}</span>
                </div>
              </CardContent>
            </Card>

            {/* Vendor Info */}
            {vendor && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">担当ベンダー</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center font-bold text-gray-600">
                      {vendor.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium">{vendor.name}</div>
                      <div className="text-sm text-gray-500">{vendor.location}</div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`/vendors/${vendor.id}`}>
                      ベンダー詳細を見る
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* CTA */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4 text-center">
                <h4 className="font-semibold text-blue-900 mb-2">
                  同様の案件を検討中ですか？
                </h4>
                <p className="text-sm text-blue-700 mb-4">
                  AIと対話して、あなたの要件を整理しましょう
                </p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                  <Link href="/aladdin">要件定義を始める</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Cases */}
        {relatedCases.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold mb-6">関連する事例</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedCases.map((relatedCase) => (
                <Card key={relatedCase.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex gap-2 mb-2">
                      <Badge variant="secondary">{relatedCase.industry}</Badge>
                      <Badge variant="outline">{relatedCase.technology}</Badge>
                    </div>
                    <CardTitle className="text-lg">{relatedCase.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        {(relatedCase.cost / 10000).toLocaleString()}万円 / {relatedCase.duration}
                      </span>
                      <Button variant="link" className="p-0" asChild>
                        <Link href={`/cases/${relatedCase.id}`}>
                          詳しく <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
