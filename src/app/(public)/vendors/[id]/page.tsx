'use client'

import { use } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import {
  Star,
  Clock,
  CheckCircle2,
  MapPin,
  Users,
  Calendar,
  Award,
  MessageSquare,
  ArrowLeft,
  Building2,
} from 'lucide-react'
import { mockVendors, mockReviews, mockCases } from '@/mocks'

type Props = {
  params: Promise<{ id: string }>
}

export default function VendorDetailPage({ params }: Props) {
  const { id } = use(params)
  const vendor = mockVendors.find((v) => v.id === id)
  const reviews = mockReviews.filter((r) => r.vendorId === id)
  const cases = mockCases.filter((c) => c.vendorId === id)

  if (!vendor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="text-center p-8">
          <h2 className="text-xl font-semibold mb-2">ベンダーが見つかりません</h2>
          <Button asChild>
            <Link href="/vendors">一覧に戻る</Link>
          </Button>
        </Card>
      </div>
    )
  }

  const renderTechRating = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`h-3 w-5 rounded ${
              i <= rating ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b py-8">
        <div className="container mx-auto px-4">
          <Link
            href="/vendors"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            ベンダー一覧に戻る
          </Link>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Logo */}
            <div className="flex-shrink-0">
              <div className="h-24 w-24 rounded-xl bg-gray-100 flex items-center justify-center font-bold text-4xl text-gray-600">
                {vendor.name.charAt(0)}
              </div>
            </div>

            {/* Main Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {vendor.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-lg">{vendor.rating}</span>
                      <span>({vendor.reviewCount}件のレビュー)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {vendor.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {vendor.employeeCount}名
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {vendor.foundedYear}年設立
                    </div>
                  </div>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700" size="lg">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  問い合わせる
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList>
                <TabsTrigger value="overview">概要</TabsTrigger>
                <TabsTrigger value="skills">専門性</TabsTrigger>
                <TabsTrigger value="cases">実績</TabsTrigger>
                <TabsTrigger value="reviews">レビュー</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <Card>
                  <CardHeader>
                    <CardTitle>会社概要</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-gray-600">{vendor.description}</p>

                    <Separator />

                    <div>
                      <h4 className="font-semibold mb-3">認定・資格</h4>
                      <div className="flex flex-wrap gap-2">
                        {vendor.certifications.map((cert) => (
                          <Badge key={cert} variant="outline" className="flex items-center gap-1">
                            <Award className="h-3 w-3" />
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-semibold mb-3">得意業界</h4>
                      <div className="flex flex-wrap gap-2">
                        {vendor.industries.map((industry) => (
                          <Badge key={industry} variant="secondary">
                            {industry}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="skills">
                <Card>
                  <CardHeader>
                    <CardTitle>技術スタック</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">LLM/RAG</span>
                        {renderTechRating(vendor.techStack.llm)}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">画像認識</span>
                        {renderTechRating(vendor.techStack.imageRecognition)}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">時系列予測</span>
                        {renderTechRating(vendor.techStack.timeSeries)}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">最適化</span>
                        {renderTechRating(vendor.techStack.optimization)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="cases">
                <div className="space-y-4">
                  {cases.length > 0 ? (
                    cases.map((caseStudy) => (
                      <Card key={caseStudy.id}>
                        <CardContent className="p-6">
                          <div className="flex gap-2 mb-2">
                            <Badge variant="secondary">{caseStudy.industry}</Badge>
                            <Badge variant="outline">{caseStudy.technology}</Badge>
                          </div>
                          <h4 className="font-semibold mb-2">{caseStudy.title}</h4>
                          <div className="flex gap-4 text-sm text-gray-600">
                            <span>費用: {(caseStudy.cost / 10000).toLocaleString()}万円</span>
                            <span>期間: {caseStudy.duration}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <Card className="text-center py-12">
                      <CardContent>
                        <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">公開中の実績はありません</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="reviews">
                <div className="space-y-4">
                  {reviews.length > 0 ? (
                    reviews.map((review) => (
                      <Card key={review.id}>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="font-semibold">
                                {review.reviewerName}様 / {review.reviewerCompany}
                              </div>
                              <div className="text-sm text-gray-500">{review.projectType}</div>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-medium">{review.rating}</span>
                            </div>
                          </div>
                          <p className="text-gray-600">{review.comment}</p>
                          <div className="text-sm text-gray-400 mt-3">{review.createdAt}</div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <Card className="text-center py-12">
                      <CardContent>
                        <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">レビューはまだありません</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">信頼性指標</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">納期遵守率</span>
                  <span className="font-semibold">
                    {Math.round(vendor.metrics.onTimeDeliveryRate * 100)}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">品質スコア</span>
                  <span className="font-semibold">{vendor.metrics.qualityScore}/5.0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">リピート率</span>
                  <span className="font-semibold">
                    {Math.round(vendor.metrics.repeatRate * 100)}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">平均初回レス</span>
                  <span className="font-semibold">{vendor.metrics.avgResponseTime}時間</span>
                </div>
              </CardContent>
            </Card>

            {/* Price */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">価格情報</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">最低受注額</span>
                  <span className="font-semibold">
                    {(vendor.priceRange.min / 10000).toLocaleString()}万円
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">主戦場</span>
                  <span className="font-semibold">
                    {(vendor.priceRange.min / 10000).toLocaleString()}〜
                    {(vendor.priceRange.max / 10000).toLocaleString()}万円
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Availability */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">稼働状況</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">着手可能：</span>
                  <span className="font-semibold">{vendor.availableFrom}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">月間キャパ：</span>
                  <span className="font-semibold">{vendor.monthlyCapacity}案件</span>
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4 text-center">
                <h4 className="font-semibold text-blue-900 mb-2">
                  この会社に相談する
                </h4>
                <p className="text-sm text-blue-700 mb-4">
                  仕様書を添えて問い合わせると、より正確な見積もりが得られます
                </p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  問い合わせる
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
