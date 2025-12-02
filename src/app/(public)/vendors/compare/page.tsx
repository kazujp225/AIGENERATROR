'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  ArrowLeft,
  Star,
  X,
  Plus,
  CheckCircle2,
  Clock,
  TrendingUp,
  Building2,
} from 'lucide-react'
import { mockVendors } from '@/mocks'

export default function VendorComparePage() {
  const [selectedVendors, setSelectedVendors] = useState<string[]>(['v1', 'v2', 'v3'])

  const vendors = mockVendors.filter((v) => selectedVendors.includes(v.id))
  const availableVendors = mockVendors.filter((v) => !selectedVendors.includes(v.id))

  const addVendor = (vendorId: string) => {
    if (selectedVendors.length < 4) {
      setSelectedVendors([...selectedVendors, vendorId])
    }
  }

  const removeVendor = (vendorId: string) => {
    setSelectedVendors(selectedVendors.filter((id) => id !== vendorId))
  }

  const renderTechBar = (level: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`h-2 w-4 rounded ${
              i <= level ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b py-6">
        <div className="container mx-auto px-4">
          <Link
            href="/vendors"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            ベンダー一覧に戻る
          </Link>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">ベンダー比較</h1>
              <p className="text-gray-600">
                最大4社まで比較できます（現在{selectedVendors.length}社選択中）
              </p>
            </div>
            {availableVendors.length > 0 && selectedVendors.length < 4 && (
              <Select onValueChange={addVendor}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="ベンダーを追加" />
                </SelectTrigger>
                <SelectContent>
                  {availableVendors.map((vendor) => (
                    <SelectItem key={vendor.id} value={vendor.id}>
                      {vendor.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {vendors.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">比較するベンダーを選択してください</h3>
              <p className="text-gray-600 mb-4">
                ベンダー一覧から比較したい会社を選択してください
              </p>
              <Button asChild>
                <Link href="/vendors">ベンダー一覧へ</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              {/* Header Row with Vendor Names */}
              <thead>
                <tr>
                  <th className="text-left p-4 bg-gray-100 font-semibold w-48">
                    比較項目
                  </th>
                  {vendors.map((vendor) => (
                    <th key={vendor.id} className="p-4 bg-white border-l">
                      <Card className="relative">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full bg-gray-100 hover:bg-gray-200"
                          onClick={() => removeVendor(vendor.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                        <CardContent className="p-4 text-center">
                          <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mx-auto mb-2 font-bold text-blue-600">
                            {vendor.name.charAt(0)}
                          </div>
                          <h3 className="font-semibold text-sm mb-1">{vendor.name}</h3>
                          <div className="flex items-center justify-center gap-1 text-sm">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>{vendor.rating}</span>
                            <span className="text-gray-500">({vendor.reviewCount}件)</span>
                          </div>
                        </CardContent>
                      </Card>
                    </th>
                  ))}
                  {selectedVendors.length < 4 && (
                    <th className="p-4 bg-white border-l w-48">
                      <Card className="border-dashed border-2 bg-gray-50">
                        <CardContent className="p-4 text-center">
                          <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center mx-auto mb-2">
                            <Plus className="h-6 w-6 text-gray-400" />
                          </div>
                          <p className="text-sm text-gray-500">追加</p>
                        </CardContent>
                      </Card>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {/* 総合評価 */}
                <tr className="border-t">
                  <td className="p-4 bg-gray-50 font-medium">総合評価</td>
                  {vendors.map((vendor) => (
                    <td key={vendor.id} className="p-4 text-center border-l">
                      <div className="flex items-center justify-center gap-1">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="text-xl font-bold">{vendor.rating}</span>
                      </div>
                    </td>
                  ))}
                  {selectedVendors.length < 4 && <td className="p-4 border-l" />}
                </tr>

                {/* 得意業界 */}
                <tr className="border-t">
                  <td className="p-4 bg-gray-50 font-medium">得意業界</td>
                  {vendors.map((vendor) => (
                    <td key={vendor.id} className="p-4 text-center border-l">
                      <div className="flex flex-wrap justify-center gap-1">
                        {vendor.industries.slice(0, 3).map((industry) => (
                          <Badge key={industry} variant="secondary" className="text-xs">
                            {industry}
                          </Badge>
                        ))}
                      </div>
                    </td>
                  ))}
                  {selectedVendors.length < 4 && <td className="p-4 border-l" />}
                </tr>

                {/* 技術力: LLM */}
                <tr className="border-t">
                  <td className="p-4 bg-gray-50 font-medium">技術力（LLM）</td>
                  {vendors.map((vendor) => (
                    <td key={vendor.id} className="p-4 border-l">
                      <div className="flex justify-center">
                        {renderTechBar(vendor.techStack.llm)}
                      </div>
                    </td>
                  ))}
                  {selectedVendors.length < 4 && <td className="p-4 border-l" />}
                </tr>

                {/* 技術力: 画像認識 */}
                <tr className="border-t">
                  <td className="p-4 bg-gray-50 font-medium">技術力（画像認識）</td>
                  {vendors.map((vendor) => (
                    <td key={vendor.id} className="p-4 border-l">
                      <div className="flex justify-center">
                        {renderTechBar(vendor.techStack.imageRecognition)}
                      </div>
                    </td>
                  ))}
                  {selectedVendors.length < 4 && <td className="p-4 border-l" />}
                </tr>

                {/* 技術力: 時系列予測 */}
                <tr className="border-t">
                  <td className="p-4 bg-gray-50 font-medium">技術力（時系列予測）</td>
                  {vendors.map((vendor) => (
                    <td key={vendor.id} className="p-4 border-l">
                      <div className="flex justify-center">
                        {renderTechBar(vendor.techStack.timeSeries)}
                      </div>
                    </td>
                  ))}
                  {selectedVendors.length < 4 && <td className="p-4 border-l" />}
                </tr>

                {/* 価格帯 */}
                <tr className="border-t">
                  <td className="p-4 bg-gray-50 font-medium">価格帯</td>
                  {vendors.map((vendor) => (
                    <td key={vendor.id} className="p-4 text-center border-l">
                      <span className="font-semibold">
                        {(vendor.priceRange.min / 10000).toLocaleString()}〜
                        {(vendor.priceRange.max / 10000).toLocaleString()}万円
                      </span>
                    </td>
                  ))}
                  {selectedVendors.length < 4 && <td className="p-4 border-l" />}
                </tr>

                {/* 納期遵守率 */}
                <tr className="border-t">
                  <td className="p-4 bg-gray-50 font-medium">
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      納期遵守率
                    </div>
                  </td>
                  {vendors.map((vendor) => (
                    <td key={vendor.id} className="p-4 text-center border-l">
                      <span className={`font-semibold ${
                        vendor.metrics.onTimeDeliveryRate >= 0.9
                          ? 'text-emerald-600'
                          : vendor.metrics.onTimeDeliveryRate >= 0.8
                          ? 'text-yellow-600'
                          : 'text-red-600'
                      }`}>
                        {Math.round(vendor.metrics.onTimeDeliveryRate * 100)}%
                      </span>
                    </td>
                  ))}
                  {selectedVendors.length < 4 && <td className="p-4 border-l" />}
                </tr>

                {/* 品質スコア */}
                <tr className="border-t">
                  <td className="p-4 bg-gray-50 font-medium">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                      品質スコア
                    </div>
                  </td>
                  {vendors.map((vendor) => (
                    <td key={vendor.id} className="p-4 text-center border-l">
                      <span className="font-semibold">{vendor.metrics.qualityScore}/5.0</span>
                    </td>
                  ))}
                  {selectedVendors.length < 4 && <td className="p-4 border-l" />}
                </tr>

                {/* 平均レス時間 */}
                <tr className="border-t">
                  <td className="p-4 bg-gray-50 font-medium">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-purple-600" />
                      平均レス時間
                    </div>
                  </td>
                  {vendors.map((vendor) => (
                    <td key={vendor.id} className="p-4 text-center border-l">
                      <span className="font-semibold">{vendor.metrics.avgResponseTime}時間</span>
                    </td>
                  ))}
                  {selectedVendors.length < 4 && <td className="p-4 border-l" />}
                </tr>

                {/* リピート率 */}
                <tr className="border-t">
                  <td className="p-4 bg-gray-50 font-medium">リピート率</td>
                  {vendors.map((vendor) => (
                    <td key={vendor.id} className="p-4 text-center border-l">
                      <span className="font-semibold">
                        {Math.round(vendor.metrics.repeatRate * 100)}%
                      </span>
                    </td>
                  ))}
                  {selectedVendors.length < 4 && <td className="p-4 border-l" />}
                </tr>

                {/* 所在地 */}
                <tr className="border-t">
                  <td className="p-4 bg-gray-50 font-medium">所在地</td>
                  {vendors.map((vendor) => (
                    <td key={vendor.id} className="p-4 text-center border-l">
                      {vendor.location}
                    </td>
                  ))}
                  {selectedVendors.length < 4 && <td className="p-4 border-l" />}
                </tr>

                {/* 従業員数 */}
                <tr className="border-t">
                  <td className="p-4 bg-gray-50 font-medium">従業員数</td>
                  {vendors.map((vendor) => (
                    <td key={vendor.id} className="p-4 text-center border-l">
                      {vendor.employeeCount}名
                    </td>
                  ))}
                  {selectedVendors.length < 4 && <td className="p-4 border-l" />}
                </tr>

                {/* アクション */}
                <tr className="border-t">
                  <td className="p-4 bg-gray-50 font-medium">詳細</td>
                  {vendors.map((vendor) => (
                    <td key={vendor.id} className="p-4 text-center border-l">
                      <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                        <Link href={`/vendors/${vendor.id}`}>
                          詳細を見る
                        </Link>
                      </Button>
                    </td>
                  ))}
                  {selectedVendors.length < 4 && <td className="p-4 border-l" />}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
