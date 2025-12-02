'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Slider } from '@/components/ui/slider'
import {
  ArrowRight,
  ArrowLeft,
  Building2,
  Target,
  Wallet,
  Lightbulb,
  CheckCircle2,
} from 'lucide-react'

const industries = [
  '製造業',
  '小売・流通',
  '金融・保険',
  '医療・ヘルスケア',
  '物流',
  'サービス業',
  '不動産',
  'IT・通信',
  'その他',
]

const interests = [
  'チャットボット・RAG',
  '画像認識・外観検査',
  '需要予測・在庫最適化',
  '自然言語処理・文書解析',
  '異常検知・予知保全',
  '音声認識・合成',
  'レコメンデーション',
  'その他',
]

const budgetRanges = [
  '〜100万円',
  '100〜300万円',
  '300〜500万円',
  '500〜1000万円',
  '1000万円以上',
  '未定',
]

const stages = [
  '情報収集中',
  '検討中（半年以内に導入予定）',
  '具体的に進めたい（3ヶ月以内）',
  'すぐにでも始めたい',
]

type UserType = 'client' | 'vendor'

export default function OnboardingPage() {
  const [userType] = useState<UserType>('client') // 実際はセッションから取得
  const [step, setStep] = useState(1)
  const [clientData, setClientData] = useState({
    industry: '',
    interests: [] as string[],
    budgetRange: '',
    stage: '',
  })
  const [vendorData, setVendorData] = useState({
    companyName: '',
    description: '',
    industries: [] as string[],
    techStack: {
      llm: 3,
      imageRecognition: 3,
      timeSeries: 3,
      optimization: 3,
    },
    minBudget: 100,
  })

  const totalSteps = userType === 'client' ? 4 : 5
  const progress = (step / totalSteps) * 100

  const toggleClientInterest = (interest: string) => {
    if (clientData.interests.includes(interest)) {
      setClientData({
        ...clientData,
        interests: clientData.interests.filter((i) => i !== interest),
      })
    } else {
      setClientData({
        ...clientData,
        interests: [...clientData.interests, interest],
      })
    }
  }

  const toggleVendorIndustry = (industry: string) => {
    if (vendorData.industries.includes(industry)) {
      setVendorData({
        ...vendorData,
        industries: vendorData.industries.filter((i) => i !== industry),
      })
    } else {
      setVendorData({
        ...vendorData,
        industries: [...vendorData.industries, industry],
      })
    }
  }

  const handleComplete = () => {
    // モック: オンボーディング完了処理
    alert('オンボーディングが完了しました！')
    window.location.href = userType === 'client' ? '/dashboard' : '/vendor-portal'
  }

  const renderClientStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <CardHeader className="text-center">
              <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>あなたの業界を教えてください</CardTitle>
              <p className="text-sm text-gray-500 mt-2">
                最適な相場情報やベンダーをおすすめするために使用します
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {industries.map((industry) => (
                  <button
                    key={industry}
                    onClick={() =>
                      setClientData({ ...clientData, industry })
                    }
                    className={`p-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                      clientData.industry === industry
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {industry}
                  </button>
                ))}
              </div>
            </CardContent>
          </>
        )
      case 2:
        return (
          <>
            <CardHeader className="text-center">
              <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center mx-auto mb-4">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle>興味のある分野を選んでください</CardTitle>
              <p className="text-sm text-gray-500 mt-2">
                複数選択できます
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <Badge
                    key={interest}
                    variant={
                      clientData.interests.includes(interest) ? 'default' : 'outline'
                    }
                    className={`cursor-pointer px-3 py-2 ${
                      clientData.interests.includes(interest)
                        ? 'bg-purple-600 hover:bg-purple-700'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => toggleClientInterest(interest)}
                  >
                    {interest}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </>
        )
      case 3:
        return (
          <>
            <CardHeader className="text-center">
              <div className="h-12 w-12 rounded-lg bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                <Wallet className="h-6 w-6 text-emerald-600" />
              </div>
              <CardTitle>想定予算を教えてください</CardTitle>
              <p className="text-sm text-gray-500 mt-2">
                適切な相場情報を提供するために使用します
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {budgetRanges.map((range) => (
                  <button
                    key={range}
                    onClick={() =>
                      setClientData({ ...clientData, budgetRange: range })
                    }
                    className={`p-4 rounded-lg border-2 text-sm font-medium transition-colors ${
                      clientData.budgetRange === range
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </CardContent>
          </>
        )
      case 4:
        return (
          <>
            <CardHeader className="text-center">
              <div className="h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle>現在の検討段階は？</CardTitle>
              <p className="text-sm text-gray-500 mt-2">
                あなたのペースに合わせた情報を提供します
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stages.map((stage) => (
                  <button
                    key={stage}
                    onClick={() => setClientData({ ...clientData, stage })}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-colors ${
                      clientData.stage === stage
                        ? 'border-orange-600 bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="font-medium">{stage}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </>
        )
      default:
        return null
    }
  }

  const renderVendorStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <CardHeader className="text-center">
              <CardTitle>会社情報を入力してください</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  会社名
                </label>
                <Input
                  value={vendorData.companyName}
                  onChange={(e) =>
                    setVendorData({ ...vendorData, companyName: e.target.value })
                  }
                  placeholder="株式会社〇〇"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  会社紹介
                </label>
                <Textarea
                  value={vendorData.description}
                  onChange={(e) =>
                    setVendorData({ ...vendorData, description: e.target.value })
                  }
                  placeholder="貴社の強みや特徴を記入してください"
                  rows={4}
                />
              </div>
            </CardContent>
          </>
        )
      case 2:
        return (
          <>
            <CardHeader className="text-center">
              <CardTitle>得意な業界を選んでください</CardTitle>
              <p className="text-sm text-gray-500 mt-2">複数選択できます</p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {industries.map((industry) => (
                  <Badge
                    key={industry}
                    variant={
                      vendorData.industries.includes(industry) ? 'default' : 'outline'
                    }
                    className={`cursor-pointer px-3 py-2 ${
                      vendorData.industries.includes(industry)
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => toggleVendorIndustry(industry)}
                  >
                    {industry}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </>
        )
      case 3:
        return (
          <>
            <CardHeader className="text-center">
              <CardTitle>技術スタックを設定してください</CardTitle>
              <p className="text-sm text-gray-500 mt-2">
                各技術の習熟度を1〜5で設定
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { key: 'llm', label: 'LLM/RAG' },
                { key: 'imageRecognition', label: '画像認識' },
                { key: 'timeSeries', label: '時系列予測' },
                { key: 'optimization', label: '最適化' },
              ].map((tech) => (
                <div key={tech.key}>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium">{tech.label}</label>
                    <span className="text-sm text-gray-500">
                      {vendorData.techStack[tech.key as keyof typeof vendorData.techStack]}/5
                    </span>
                  </div>
                  <Slider
                    value={[vendorData.techStack[tech.key as keyof typeof vendorData.techStack]]}
                    onValueChange={([value]) =>
                      setVendorData({
                        ...vendorData,
                        techStack: {
                          ...vendorData.techStack,
                          [tech.key]: value,
                        },
                      })
                    }
                    max={5}
                    min={1}
                    step={1}
                  />
                </div>
              ))}
            </CardContent>
          </>
        )
      case 4:
        return (
          <>
            <CardHeader className="text-center">
              <CardTitle>価格帯を設定してください</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  最低受注額（万円）
                </label>
                <Input
                  type="number"
                  value={vendorData.minBudget}
                  onChange={(e) =>
                    setVendorData({
                      ...vendorData,
                      minBudget: Number(e.target.value),
                    })
                  }
                />
              </div>
            </CardContent>
          </>
        )
      case 5:
        return (
          <>
            <CardHeader className="text-center">
              <div className="h-12 w-12 rounded-lg bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="h-6 w-6 text-emerald-600" />
              </div>
              <CardTitle>登録内容の確認</CardTitle>
              <p className="text-sm text-gray-500 mt-2">
                以下の内容で登録を完了します
              </p>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div>
                  <span className="text-sm text-gray-500">会社名:</span>
                  <span className="ml-2 font-medium">{vendorData.companyName}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-500">得意業界:</span>
                  <span className="ml-2">{vendorData.industries.join(', ')}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-500">最低受注額:</span>
                  <span className="ml-2 font-medium">{vendorData.minBudget}万円〜</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4 text-center">
                登録後、審査を経てプロフィールが公開されます
              </p>
            </CardContent>
          </>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-xl">
              A
            </div>
            <span className="text-2xl font-bold text-gray-900">AIAIO</span>
          </Link>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>ステップ {step}/{totalSteps}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Card */}
        <Card className="shadow-lg">
          {userType === 'client' ? renderClientStep() : renderVendorStep()}

          {/* Navigation */}
          <div className="p-6 pt-0 flex gap-3">
            {step > 1 && (
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                <ArrowLeft className="mr-1 h-4 w-4" />
                戻る
              </Button>
            )}
            {step < totalSteps ? (
              <Button
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                onClick={() => setStep(step + 1)}
              >
                次へ
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            ) : (
              <Button
                className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                onClick={handleComplete}
              >
                <CheckCircle2 className="mr-1 h-4 w-4" />
                完了
              </Button>
            )}
          </div>
        </Card>

        {/* Skip */}
        <p className="text-center mt-4">
          <button
            onClick={() => {
              window.location.href =
                userType === 'client' ? '/dashboard' : '/vendor-portal'
            }}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            スキップして後で設定する
          </button>
        </p>
      </div>
    </div>
  )
}
