'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Slider } from '@/components/ui/slider'
import {
  ArrowLeft,
  Building2,
  Globe,
  MapPin,
  Users,
  Calendar,
  Save,
  Plus,
  X,
} from 'lucide-react'

export default function VendorProfilePage() {
  const [profileData, setProfileData] = useState({
    name: '株式会社AIソリューションズ',
    description:
      '製造業向けAIソリューションを専門とする開発会社です。外観検査、予知保全、最適化など、現場の課題をAIで解決します。',
    website: 'https://ai-solutions.example.com',
    location: '東京都渋谷区',
    foundedYear: '2018',
    employeeCount: '25',
    minBudget: 150,
    maxBudget: 800,
  })

  const [industries, setIndustries] = useState(['製造業', '小売業', '金融'])
  const [techStack, setTechStack] = useState({
    llm: 5,
    imageRecognition: 4,
    timeSeries: 3,
    optimization: 2,
  })

  const allIndustries = [
    '製造業',
    '小売・流通',
    '金融・保険',
    '医療・ヘルスケア',
    '物流',
    'サービス業',
    '不動産',
    'IT・通信',
  ]

  const toggleIndustry = (industry: string) => {
    if (industries.includes(industry)) {
      setIndustries(industries.filter((i) => i !== industry))
    } else {
      setIndustries([...industries, industry])
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/vendor-portal"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            ポータルに戻る
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">プロフィール編集</h1>
          <p className="text-gray-600">会社情報を更新して、リード獲得率を向上させましょう</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-blue-600" />
                  基本情報
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="h-24 w-24 rounded-lg bg-blue-100 flex items-center justify-center text-3xl font-bold text-blue-600">
                    A
                  </div>
                  <div>
                    <Button variant="outline" size="sm">
                      ロゴを変更
                    </Button>
                    <p className="text-xs text-gray-500 mt-1">
                      JPG, PNG (200x200px以上推奨)
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    会社名
                  </label>
                  <Input
                    value={profileData.name}
                    onChange={(e) =>
                      setProfileData({ ...profileData, name: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    会社紹介
                  </label>
                  <Textarea
                    value={profileData.description}
                    onChange={(e) =>
                      setProfileData({ ...profileData, description: e.target.value })
                    }
                    rows={4}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {profileData.description.length}/500文字
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <Globe className="h-4 w-4 inline mr-1" />
                      Webサイト
                    </label>
                    <Input
                      value={profileData.website}
                      onChange={(e) =>
                        setProfileData({ ...profileData, website: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <MapPin className="h-4 w-4 inline mr-1" />
                      所在地
                    </label>
                    <Input
                      value={profileData.location}
                      onChange={(e) =>
                        setProfileData({ ...profileData, location: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <Calendar className="h-4 w-4 inline mr-1" />
                      設立年
                    </label>
                    <Input
                      value={profileData.foundedYear}
                      onChange={(e) =>
                        setProfileData({ ...profileData, foundedYear: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <Users className="h-4 w-4 inline mr-1" />
                      従業員数
                    </label>
                    <Input
                      value={profileData.employeeCount}
                      onChange={(e) =>
                        setProfileData({ ...profileData, employeeCount: e.target.value })
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Industries */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">得意業界</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {allIndustries.map((industry) => (
                    <Badge
                      key={industry}
                      variant={industries.includes(industry) ? 'default' : 'outline'}
                      className={`cursor-pointer ${
                        industries.includes(industry)
                          ? 'bg-blue-600 hover:bg-blue-700'
                          : 'hover:bg-gray-100'
                      }`}
                      onClick={() => toggleIndustry(industry)}
                    >
                      {industries.includes(industry) && (
                        <X className="h-3 w-3 mr-1" />
                      )}
                      {industry}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  クリックして選択/解除
                </p>
              </CardContent>
            </Card>

            {/* Tech Stack */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">技術スタック</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium">LLM/RAG</label>
                    <span className="text-sm text-gray-500">{techStack.llm}/5</span>
                  </div>
                  <Slider
                    value={[techStack.llm]}
                    onValueChange={([value]) =>
                      setTechStack({ ...techStack, llm: value })
                    }
                    max={5}
                    min={1}
                    step={1}
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium">画像認識</label>
                    <span className="text-sm text-gray-500">
                      {techStack.imageRecognition}/5
                    </span>
                  </div>
                  <Slider
                    value={[techStack.imageRecognition]}
                    onValueChange={([value]) =>
                      setTechStack({ ...techStack, imageRecognition: value })
                    }
                    max={5}
                    min={1}
                    step={1}
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium">時系列予測</label>
                    <span className="text-sm text-gray-500">
                      {techStack.timeSeries}/5
                    </span>
                  </div>
                  <Slider
                    value={[techStack.timeSeries]}
                    onValueChange={([value]) =>
                      setTechStack({ ...techStack, timeSeries: value })
                    }
                    max={5}
                    min={1}
                    step={1}
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium">最適化</label>
                    <span className="text-sm text-gray-500">
                      {techStack.optimization}/5
                    </span>
                  </div>
                  <Slider
                    value={[techStack.optimization]}
                    onValueChange={([value]) =>
                      setTechStack({ ...techStack, optimization: value })
                    }
                    max={5}
                    min={1}
                    step={1}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Price Range */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">価格帯</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      最低受注額（万円）
                    </label>
                    <Input
                      type="number"
                      value={profileData.minBudget}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          minBudget: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      主要価格帯上限（万円）
                    </label>
                    <Input
                      type="number"
                      value={profileData.maxBudget}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          maxBudget: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  表示価格帯: {profileData.minBudget}〜{profileData.maxBudget}万円
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Preview Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">プレビュー</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center font-bold text-blue-600">
                      A
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{profileData.name}</div>
                      <div className="text-xs text-gray-500">
                        {profileData.location}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mb-3 line-clamp-3">
                    {profileData.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {industries.slice(0, 3).map((industry) => (
                      <Badge key={industry} variant="secondary" className="text-xs">
                        {industry}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-xs text-gray-500">
                    {profileData.minBudget}〜{profileData.maxBudget}万円
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <Card>
              <CardContent className="p-4">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Save className="mr-2 h-4 w-4" />
                  変更を保存
                </Button>
                <p className="text-xs text-gray-500 text-center mt-2">
                  変更は審査後に反映されます
                </p>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-blue-900 mb-2">プロフィールのコツ</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>・具体的な実績を記載しましょう</li>
                  <li>・得意分野を明確にしましょう</li>
                  <li>・価格帯は正確に設定しましょう</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
