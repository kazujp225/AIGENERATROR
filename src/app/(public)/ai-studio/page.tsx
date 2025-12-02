'use client'

import { useState, useCallback, useMemo } from 'react'
import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from 'react-resizable-panels'
import {
  Sparkles,
  BookOpen,
  ArrowLeft,
  RotateCcw,
  FileText,
  Building2,
  Calculator,
  Download,
  Share2,
  ChevronRight,
  CheckCircle2,
  HelpCircle,
  TrendingUp,
  Clock,
  Star,
  AlertCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { mockVendors } from '@/mocks/vendors'
import { mockGlossary } from '@/mocks/ai-studio'
import {
  calculateCostEstimate,
  matchVendors,
  generateSpecification,
  INDUSTRY_USE_CASES,
  type AladdinAnswers,
  type IndustryType,
  type UseCaseType,
  type CostEstimateResult,
  type VendorMatchResult,
  type GeneratedSpec,
} from '@/lib/aladdin-engine'
import type { GlossaryTerm } from '@/types/ai-studio'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

// ========================================
// 質問定義
// ========================================

type QuestionStep = {
  id: string
  category: string
  question: string
  type: 'single' | 'multiple' | 'text' | 'yesno'
  options?: { value: string; label: string; icon?: string; description?: string }[]
  placeholder?: string
  helpText?: string
  glossaryTerms?: string[]
  conditionalShow?: (answers: AladdinAnswers) => boolean
}

const QUESTIONS: QuestionStep[] = [
  {
    id: 'industry',
    category: '業界',
    question: 'どの業界でAIを活用したいですか？',
    type: 'single',
    options: [
      { value: 'manufacturing', label: '製造業', icon: '🏭', description: '工場・生産ライン' },
      { value: 'retail', label: '小売・EC', icon: '🛒', description: '店舗・オンライン販売' },
      { value: 'finance', label: '金融・保険', icon: '🏦', description: '銀行・証券・保険' },
      { value: 'healthcare', label: '医療・ヘルスケア', icon: '🏥', description: '病院・介護・健康' },
      { value: 'logistics', label: '物流・運輸', icon: '🚚', description: '配送・倉庫管理' },
      { value: 'service', label: 'サービス業', icon: '💼', description: 'BtoB/BtoCサービス' },
      { value: 'other', label: 'その他', icon: '💡', description: '上記以外' },
    ],
    helpText: '業界によって最適なAIソリューションが異なります',
  },
  {
    id: 'useCase',
    category: 'ユースケース',
    question: 'AIで何を実現したいですか？',
    type: 'single',
    helpText: '業界に合わせた選択肢が表示されています',
    glossaryTerms: ['AI', '機械学習'],
  },
  {
    id: 'problemDescription',
    category: '課題詳細',
    question: '具体的にどのような課題を解決したいですか？',
    type: 'text',
    placeholder: '例：製品の外観検査を目視で行っているが、検査員によって判定にばらつきがあり、不良品の見逃しが月に数件発生している',
    helpText: '詳しく書くほど、より正確な見積もりが出せます',
  },
  {
    id: 'dataStatus',
    category: 'データ状況',
    question: 'AI学習に使えるデータはありますか？',
    type: 'single',
    options: [
      { value: 'digital', label: '電子データがある', icon: '💾', description: 'Excel、CSV、データベースなど' },
      { value: 'paper', label: '紙のデータがある', icon: '📄', description: '電子化が必要' },
      { value: 'partial', label: '一部ある', icon: '📁', description: 'データが不完全' },
      { value: 'none', label: 'ほぼない', icon: '❌', description: '収集から始める' },
      { value: 'unknown', label: 'わからない', icon: '❓', description: '確認が必要' },
    ],
    helpText: 'データの有無で費用・期間が大きく変わります',
    glossaryTerms: ['教師データ', 'データセット'],
  },
  {
    id: 'needsIntegration',
    category: 'システム連携',
    question: '既存システムとの連携は必要ですか？',
    type: 'yesno',
    helpText: '基幹システムや業務システムとの接続',
    glossaryTerms: ['API', 'システム連携'],
  },
  {
    id: 'existingSystems',
    category: '既存システム',
    question: 'どのようなシステムがありますか？',
    type: 'multiple',
    options: [
      { value: 'erp', label: 'ERP（基幹システム）', icon: '🏢' },
      { value: 'crm', label: 'CRM（顧客管理）', icon: '👥' },
      { value: 'pos', label: 'POSシステム', icon: '💳' },
      { value: 'wms', label: '倉庫管理システム', icon: '📦' },
      { value: 'mes', label: 'MES（生産管理）', icon: '🏭' },
      { value: 'custom', label: '自社開発システム', icon: '💻' },
    ],
    conditionalShow: (answers) => answers.needsIntegration === true,
    glossaryTerms: ['ERP', 'CRM', 'API'],
  },
  {
    id: 'itStaff',
    category: 'IT体制',
    question: '社内にIT担当者はいますか？',
    type: 'single',
    options: [
      { value: 'dedicated', label: '専任担当者がいる', icon: '👨‍💻', description: 'IT専門の社員' },
      { value: 'shared', label: '兼任担当者がいる', icon: '👤', description: '他業務と兼任' },
      { value: 'outsource', label: '外部委託している', icon: '🤝', description: 'IT会社に委託' },
      { value: 'none', label: 'いない', icon: '❌', description: '運用サポート必要' },
    ],
    helpText: 'IT担当者の有無で必要なサポートレベルが変わります',
  },
  {
    id: 'budget',
    category: '予算',
    question: 'ご予算の目安を教えてください',
    type: 'single',
    options: [
      { value: 'under1m', label: '100万円未満', icon: '💰', description: '小規模PoC' },
      { value: '1m-3m', label: '100〜300万円', icon: '💰💰', description: 'PoC〜小規模導入' },
      { value: '3m-5m', label: '300〜500万円', icon: '💰💰💰', description: '中規模導入' },
      { value: '5m-10m', label: '500〜1000万円', icon: '💎', description: '本格導入' },
      { value: 'over10m', label: '1000万円以上', icon: '💎💎', description: '大規模導入' },
      { value: 'unknown', label: '相場を知りたい', icon: '❓', description: '参考にしたい' },
    ],
    helpText: '大まかで構いません。相場を参考に調整できます',
  },
  {
    id: 'timeline',
    category: 'スケジュール',
    question: 'いつまでに導入したいですか？',
    type: 'single',
    options: [
      { value: 'urgent', label: '3ヶ月以内', icon: '🚀', description: '急ぎで進めたい' },
      { value: 'normal', label: '半年程度', icon: '📅', description: '標準的なスケジュール' },
      { value: 'planned', label: '1年以内', icon: '🗓️', description: 'じっくり進めたい' },
      { value: 'flexible', label: '特に決まっていない', icon: '🤔', description: 'まずは情報収集' },
    ],
    helpText: '急ぎの場合は追加費用がかかることがあります',
  },
  {
    id: 'securityRequirements',
    category: 'セキュリティ',
    question: 'セキュリティに関する要件はありますか？',
    type: 'multiple',
    options: [
      { value: 'onpremise', label: 'オンプレミス必須', icon: '🏢', description: 'クラウド不可' },
      { value: 'iso27001', label: 'ISO27001認証', icon: '🛡️', description: 'ベンダーに必要' },
      { value: 'privacy', label: '個人情報を扱う', icon: '👤', description: 'プライバシー配慮' },
      { value: 'confidential', label: '機密情報を扱う', icon: '🔒', description: '秘密保持必要' },
      { value: 'none', label: '特になし', icon: '✅', description: '通常の対応でOK' },
    ],
    helpText: '該当するものをすべて選択してください',
    glossaryTerms: ['オンプレミス', 'クラウド'],
  },
]

// ========================================
// メインコンポーネント
// ========================================

export default function AIStudioPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<AladdinAnswers>({})
  const [isComplete, setIsComplete] = useState(false)
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false)
  const [selectedGlossaryTerm, setSelectedGlossaryTerm] = useState<GlossaryTerm | null>(null)

  // 現在の質問を取得（条件分岐対応）
  const visibleQuestions = useMemo(() => {
    return QUESTIONS.filter(q => !q.conditionalShow || q.conditionalShow(answers))
  }, [answers])

  const currentQuestion = visibleQuestions[currentStep]
  const progress = isComplete ? 100 : Math.round((currentStep / visibleQuestions.length) * 100)

  // 業界に応じたユースケース選択肢を取得
  const useCaseOptions = useMemo(() => {
    if (currentQuestion?.id === 'useCase' && answers.industry) {
      return INDUSTRY_USE_CASES[answers.industry as IndustryType] || INDUSTRY_USE_CASES.other
    }
    return []
  }, [currentQuestion?.id, answers.industry])

  // 計算結果
  const costEstimate = useMemo<CostEstimateResult | null>(() => {
    if (Object.keys(answers).length >= 2) {
      return calculateCostEstimate(answers)
    }
    return null
  }, [answers])

  const vendorMatches = useMemo<VendorMatchResult[]>(() => {
    if (Object.keys(answers).length >= 3) {
      return matchVendors(answers, mockVendors)
    }
    return []
  }, [answers])

  const specification = useMemo<GeneratedSpec | null>(() => {
    if (Object.keys(answers).length >= 2) {
      return generateSpecification(answers)
    }
    return null
  }, [answers])

  // 回答処理
  const handleAnswer = useCallback((value: string | string[] | boolean) => {
    const questionId = currentQuestion?.id
    if (!questionId) return

    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }))

    // 次の質問へ
    if (currentStep < visibleQuestions.length - 1) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 300)
    } else {
      setIsComplete(true)
    }
  }, [currentQuestion?.id, currentStep, visibleQuestions.length])

  // 用語集を開く
  const handleOpenGlossary = (term: string) => {
    const glossaryTerm = mockGlossary.find(g => g.term === term)
    if (glossaryTerm) {
      setSelectedGlossaryTerm(glossaryTerm)
      setIsGlossaryOpen(true)
    }
  }

  // リセット
  const handleReset = () => {
    setCurrentStep(0)
    setAnswers({})
    setIsComplete(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-40">
        <div className="flex items-center justify-between h-14 px-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-gray-700">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm hidden sm:inline">戻る</span>
            </Link>
            <div className="h-5 w-px bg-gray-200" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="font-bold text-gray-900 text-sm">AI Studio</h1>
                <p className="text-[10px] text-gray-500">AI発注サポート</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={handleReset} className="h-8 gap-1">
              <RotateCcw className="h-4 w-4" />
              <span className="hidden sm:inline">最初から</span>
            </Button>
            {isComplete && (
              <Button size="sm" className="h-8 gap-1 bg-blue-600 hover:bg-blue-700">
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">ダウンロード</span>
              </Button>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-gray-100">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Left: Chat/Questions (3 cols) */}
          <div className="lg:col-span-3">
            <Card className="shadow-lg border-0">
              <CardHeader className="border-b bg-gray-50/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                      質問 {currentStep + 1} / {visibleQuestions.length}
                    </span>
                    {currentQuestion?.category && (
                      <Badge variant="secondary">{currentQuestion.category}</Badge>
                    )}
                  </div>
                  {currentQuestion?.glossaryTerms && (
                    <div className="flex gap-1">
                      {currentQuestion.glossaryTerms.map(term => (
                        <button
                          key={term}
                          onClick={() => handleOpenGlossary(term)}
                          className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                        >
                          <HelpCircle className="h-3 w-3" />
                          {term}とは？
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="p-6">
                {!isComplete ? (
                  <div className="space-y-6">
                    {/* Question */}
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-2">
                        {currentQuestion?.question}
                      </h2>
                      {currentQuestion?.helpText && (
                        <p className="text-sm text-gray-500">{currentQuestion.helpText}</p>
                      )}
                    </div>

                    {/* Answer Options */}
                    <div className="space-y-3">
                      {/* Single Select / YesNo */}
                      {(currentQuestion?.type === 'single' || currentQuestion?.type === 'yesno') && (
                        <div className="grid gap-3 sm:grid-cols-2">
                          {currentQuestion.type === 'yesno' ? (
                            <>
                              <OptionButton
                                label="はい"
                                description="連携が必要です"
                                icon="✅"
                                onClick={() => handleAnswer(true)}
                              />
                              <OptionButton
                                label="いいえ / わからない"
                                description="連携不要または未定"
                                icon="❌"
                                onClick={() => handleAnswer(false)}
                              />
                            </>
                          ) : currentQuestion.id === 'useCase' ? (
                            useCaseOptions.map(opt => (
                              <OptionButton
                                key={opt.value}
                                label={opt.label}
                                icon={opt.icon}
                                onClick={() => handleAnswer(opt.value)}
                              />
                            ))
                          ) : (
                            currentQuestion.options?.map(opt => (
                              <OptionButton
                                key={opt.value}
                                label={opt.label}
                                description={opt.description}
                                icon={opt.icon}
                                onClick={() => handleAnswer(opt.value)}
                              />
                            ))
                          )}
                        </div>
                      )}

                      {/* Multiple Select */}
                      {currentQuestion?.type === 'multiple' && (
                        <MultipleSelect
                          options={currentQuestion.options || []}
                          onSubmit={handleAnswer}
                        />
                      )}

                      {/* Text Input */}
                      {currentQuestion?.type === 'text' && (
                        <TextInput
                          placeholder={currentQuestion.placeholder}
                          onSubmit={handleAnswer}
                        />
                      )}
                    </div>
                  </div>
                ) : (
                  // Complete State
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="h-8 w-8 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      ヒアリング完了！
                    </h2>
                    <p className="text-gray-600 mb-6">
                      右側に仕様書・見積もり・おすすめベンダーが表示されています
                    </p>
                    <div className="flex gap-3 justify-center">
                      <Button variant="outline" onClick={handleReset}>
                        <RotateCcw className="h-4 w-4 mr-2" />
                        最初からやり直す
                      </Button>
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <Share2 className="h-4 w-4 mr-2" />
                        結果を共有
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Progress Steps */}
            <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-2">
              {visibleQuestions.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => idx < currentStep && setCurrentStep(idx)}
                  disabled={idx > currentStep && !isComplete}
                  className={cn(
                    'flex items-center gap-2 px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-all',
                    idx < currentStep || isComplete
                      ? 'bg-green-100 text-green-700 cursor-pointer hover:bg-green-200'
                      : idx === currentStep && !isComplete
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  )}
                >
                  {idx < currentStep || isComplete ? (
                    <CheckCircle2 className="h-3 w-3" />
                  ) : (
                    <span className="w-3 text-center">{idx + 1}</span>
                  )}
                  {q.category}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Results (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            {/* Cost Estimate Card */}
            <Card className={cn(
              'shadow-lg border-0 transition-all',
              costEstimate ? 'opacity-100' : 'opacity-50'
            )}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Calculator className="h-5 w-5 text-green-600" />
                  相場見積もり
                  {costEstimate && (
                    <Badge variant="outline" className="ml-auto">
                      信頼度 {costEstimate.confidenceLevel}%
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {costEstimate ? (
                  <div className="space-y-4">
                    <div className="text-center py-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">想定費用</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {(costEstimate.totalMin / 10000).toLocaleString()}万円 〜 {(costEstimate.totalMax / 10000).toLocaleString()}万円
                      </p>
                      <p className="text-sm text-gray-500">
                        中央値: {(costEstimate.median / 10000).toLocaleString()}万円
                      </p>
                    </div>

                    <div className="space-y-2">
                      {costEstimate.breakdown.map(item => (
                        <div key={item.category} className="flex justify-between text-sm">
                          <span className="text-gray-600">{item.label}</span>
                          <span className="font-medium">
                            {(item.minCost / 10000).toLocaleString()}〜{(item.maxCost / 10000).toLocaleString()}万円
                          </span>
                        </div>
                      ))}
                    </div>

                    {costEstimate.factors.length > 0 && (
                      <div className="pt-3 border-t">
                        <p className="text-xs text-gray-500 mb-2">調整要因</p>
                        <div className="space-y-1">
                          {costEstimate.factors.map((factor, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs">
                              {factor.impact === 'increase' ? (
                                <TrendingUp className="h-3 w-3 text-red-500" />
                              ) : (
                                <TrendingUp className="h-3 w-3 text-green-500 rotate-180" />
                              )}
                              <span className="text-gray-600">
                                {factor.name}: {factor.impact === 'increase' ? '+' : '-'}{factor.percentage}%
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-xs text-gray-500 pt-2">
                      <Clock className="h-3 w-3" />
                      <span>推定期間: {costEstimate.periodMonths.min}〜{costEstimate.periodMonths.max}ヶ月</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-400">
                    <Calculator className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">質問に答えると見積もりが表示されます</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Vendor Match Card */}
            <Card className={cn(
              'shadow-lg border-0 transition-all',
              vendorMatches.length > 0 ? 'opacity-100' : 'opacity-50'
            )}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Building2 className="h-5 w-5 text-orange-600" />
                  おすすめベンダー
                  {vendorMatches.length > 0 && (
                    <Badge variant="outline" className="ml-auto">
                      {vendorMatches.length}社
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {vendorMatches.length > 0 ? (
                  <div className="space-y-3">
                    {vendorMatches.slice(0, 3).map((match, idx) => (
                      <div
                        key={match.vendor.id}
                        className={cn(
                          'p-3 rounded-lg border transition-all hover:shadow-md cursor-pointer',
                          idx === 0 ? 'border-orange-200 bg-orange-50/50' : 'border-gray-100'
                        )}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-sm">{match.vendor.name}</h4>
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span>{match.vendor.rating}</span>
                              <span>({match.vendor.reviewCount}件)</span>
                            </div>
                          </div>
                          <Badge className={cn(
                            'text-xs',
                            idx === 0 ? 'bg-orange-600' : 'bg-gray-600'
                          )}>
                            {match.matchScore}点
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {match.strengths.map(s => (
                            <Badge key={s} variant="secondary" className="text-xs">
                              {s}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/vendors">
                        すべてのベンダーを見る
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-400">
                    <Building2 className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">質問に答えるとおすすめが表示されます</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Spec Preview Card */}
            <Card className={cn(
              'shadow-lg border-0 transition-all',
              specification ? 'opacity-100' : 'opacity-50'
            )}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <FileText className="h-5 w-5 text-blue-600" />
                  仕様書
                  {specification && (
                    <Badge variant="outline" className="ml-auto">
                      完成度 {specification.completionRate}%
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {specification ? (
                  <div className="space-y-3">
                    <Progress value={specification.completionRate} className="h-2" />
                    <div className="space-y-2">
                      {specification.sections.slice(0, 4).map(section => (
                        <div key={section.id} className="flex items-center gap-2 text-sm">
                          {section.status === 'complete' ? (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          ) : section.status === 'draft' ? (
                            <AlertCircle className="h-4 w-4 text-yellow-500" />
                          ) : (
                            <div className="h-4 w-4 rounded-full border-2 border-gray-200" />
                          )}
                          <span className={cn(
                            section.status === 'empty' ? 'text-gray-400' : 'text-gray-700'
                          )}>
                            {section.title}
                          </span>
                        </div>
                      ))}
                    </div>
                    {isComplete && (
                      <Button variant="outline" className="w-full">
                        <FileText className="h-4 w-4 mr-2" />
                        仕様書をダウンロード
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-400">
                    <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">質問に答えると仕様書が生成されます</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Glossary Dialog */}
      <Dialog open={isGlossaryOpen} onOpenChange={setIsGlossaryOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              {selectedGlossaryTerm?.term}
              {selectedGlossaryTerm?.reading && (
                <span className="text-sm font-normal text-gray-500">
                  （{selectedGlossaryTerm.reading}）
                </span>
              )}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-700">{selectedGlossaryTerm?.definition}</p>
            {selectedGlossaryTerm?.example && (
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm text-gray-500 mb-1">例</p>
                <p className="text-sm text-gray-700">{selectedGlossaryTerm.example}</p>
              </div>
            )}
            {selectedGlossaryTerm?.relatedTerms && (
              <div>
                <p className="text-sm text-gray-500 mb-2">関連用語</p>
                <div className="flex flex-wrap gap-2">
                  {selectedGlossaryTerm.relatedTerms.map(term => (
                    <Badge key={term} variant="secondary" className="cursor-pointer">
                      {term}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// ========================================
// Sub Components
// ========================================

function OptionButton({
  label,
  description,
  icon,
  onClick
}: {
  label: string
  description?: string
  icon?: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 p-4 rounded-xl border-2 border-gray-100 hover:border-blue-500 hover:bg-blue-50 transition-all text-left group"
    >
      {icon && <span className="text-2xl">{icon}</span>}
      <div>
        <p className="font-medium text-gray-900 group-hover:text-blue-700">{label}</p>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
    </button>
  )
}

function MultipleSelect({
  options,
  onSubmit
}: {
  options: { value: string; label: string; icon?: string }[]
  onSubmit: (values: string[]) => void
}) {
  const [selected, setSelected] = useState<string[]>([])

  const toggle = (value: string) => {
    if (value === 'none') {
      setSelected(['none'])
    } else {
      setSelected(prev =>
        prev.includes(value)
          ? prev.filter(v => v !== value)
          : [...prev.filter(v => v !== 'none'), value]
      )
    }
  }

  return (
    <div className="space-y-3">
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map(opt => (
          <button
            key={opt.value}
            onClick={() => toggle(opt.value)}
            className={cn(
              'flex items-center gap-3 p-3 rounded-lg border-2 transition-all text-left',
              selected.includes(opt.value)
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-100 hover:border-gray-300'
            )}
          >
            {opt.icon && <span className="text-xl">{opt.icon}</span>}
            <span className="font-medium text-sm">{opt.label}</span>
            {selected.includes(opt.value) && (
              <CheckCircle2 className="h-4 w-4 text-blue-600 ml-auto" />
            )}
          </button>
        ))}
      </div>
      <Button
        onClick={() => onSubmit(selected)}
        disabled={selected.length === 0}
        className="w-full bg-blue-600 hover:bg-blue-700"
      >
        次へ進む
        <ChevronRight className="h-4 w-4 ml-1" />
      </Button>
    </div>
  )
}

function TextInput({
  placeholder,
  onSubmit
}: {
  placeholder?: string
  onSubmit: (value: string) => void
}) {
  const [value, setValue] = useState('')

  return (
    <div className="space-y-3">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full h-32 p-4 border-2 border-gray-100 rounded-xl focus:border-blue-500 focus:ring-0 resize-none"
      />
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() => onSubmit('')}
          className="flex-1"
        >
          スキップ
        </Button>
        <Button
          onClick={() => onSubmit(value)}
          disabled={!value.trim()}
          className="flex-1 bg-blue-600 hover:bg-blue-700"
        >
          次へ進む
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  )
}
