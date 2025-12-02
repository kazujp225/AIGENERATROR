'use client'

import { useState, useCallback } from 'react'
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
  Code2,
  FileText,
  Building2,
  Layers,
  ChevronRight,
  Download,
  Share2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  CostEstimator,
  VendorRecommendation,
  GlossaryPanel,
  SimilarCasesPanel,
  HelpPanel,
  ArtifactPanel,
  WelcomeScreen,
  EnhancedChat,
} from '@/components/ai-studio'
import {
  mockQuestions,
  mockMessages,
  mockCostEstimate,
  mockVendorMatches,
  mockProgressSteps,
  mockGlossary,
  mockSimilarCases,
  mockHelpTopics,
  mockArtifact,
  mockCodeExplanations,
} from '@/mocks/ai-studio'
import type { Message, ProgressStep, CostEstimate, VendorMatch, Artifact } from '@/types/ai-studio'
import Link from 'next/link'

function ResizeHandle({ direction = 'horizontal' }: { direction?: 'horizontal' | 'vertical' }) {
  return (
    <PanelResizeHandle
      className={cn(
        'group relative',
        direction === 'horizontal' ? 'w-1' : 'h-1',
        'bg-gray-200 hover:bg-purple-400 transition-all duration-150'
      )}
    >
      <div
        className={cn(
          'absolute bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity',
          direction === 'horizontal'
            ? 'w-1 h-8 left-0 top-1/2 -translate-y-1/2'
            : 'h-1 w-8 top-0 left-1/2 -translate-x-1/2'
        )}
      />
    </PanelResizeHandle>
  )
}

type RightPanelTab = 'artifact' | 'estimate' | 'vendors'

export default function AIStudioPage() {
  const [showWelcome, setShowWelcome] = useState(true)
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [progressSteps, setProgressSteps] = useState<ProgressStep[]>(mockProgressSteps)
  const [costEstimate, setCostEstimate] = useState<CostEstimate | null>(null)
  const [vendors, setVendors] = useState<VendorMatch[]>([])
  const [artifact, setArtifact] = useState<Artifact | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false)
  const [glossaryTerm, setGlossaryTerm] = useState<string>('')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [rightPanelTab, setRightPanelTab] = useState<RightPanelTab>('artifact')
  const [isGeneratingArtifact, setIsGeneratingArtifact] = useState(false)

  const handleAnswer = useCallback((questionId: string, answer: string | string[]) => {
    const answerLabel = Array.isArray(answer)
      ? answer.map(a => {
          const question = mockQuestions.find(q => q.id === questionId)
          const option = question?.options?.find(o => o.id === a)
          return option?.label || a
        }).join('、')
      : (() => {
          const question = mockQuestions.find(q => q.id === questionId)
          const option = question?.options?.find(o => o.id === answer)
          return option?.label || answer
        })()

    const userMessage: Message = {
      id: `m${Date.now()}`,
      role: 'user',
      content: answerLabel,
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    setProgressSteps(prev => prev.map((step, idx) => {
      if (idx === currentQuestionIndex) {
        return { ...step, status: 'completed' }
      }
      if (idx === currentQuestionIndex + 1) {
        return { ...step, status: 'active' }
      }
      return step
    }))

    setTimeout(() => {
      const nextIndex = currentQuestionIndex + 1

      if (nextIndex >= 2) {
        setCostEstimate(mockCostEstimate)
      }
      if (nextIndex >= 3) {
        setIsGeneratingArtifact(true)
        setTimeout(() => {
          setArtifact(mockArtifact)
          setIsGeneratingArtifact(false)
          setRightPanelTab('artifact')
        }, 2000)
      }
      if (nextIndex >= 4) {
        setVendors(mockVendorMatches)
      }

      if (nextIndex < mockQuestions.length) {
        const nextQuestion = mockQuestions[nextIndex]
        const aiMessage: Message = {
          id: `m${Date.now() + 1}`,
          role: 'assistant',
          content: `ありがとうございます！${answerLabel}ですね。\n\n次の質問です。`,
          timestamp: new Date(),
          question: nextQuestion,
        }
        setMessages(prev => [...prev, aiMessage])
        setCurrentQuestionIndex(nextIndex)
      } else {
        const completeMessage: Message = {
          id: `m${Date.now() + 1}`,
          role: 'assistant',
          content: `お疲れさまでした！ヒアリングが完了しました。\n\n右側のパネルで生成された仕様書を確認できます。「コード」ビューで詳細を見たり、「修正をリクエスト」で調整を依頼できます。`,
          timestamp: new Date(),
        }
        setMessages(prev => [...prev, completeMessage])
        setProgressSteps(prev => prev.map(step => ({ ...step, status: 'completed' })))
      }

      setIsLoading(false)
    }, 1500)
  }, [currentQuestionIndex])

  const handleOpenGlossary = (term: string) => {
    setGlossaryTerm(term)
    setIsGlossaryOpen(true)
  }

  const handleModificationRequest = (request: string, targetFile?: string) => {
    const userMessage: Message = {
      id: `m${Date.now()}`,
      role: 'user',
      content: `【修正リクエスト】${targetFile ? `(${targetFile})\n` : ''}${request}`,
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)
    setIsGeneratingArtifact(true)

    setTimeout(() => {
      const aiMessage: Message = {
        id: `m${Date.now() + 1}`,
        role: 'assistant',
        content: `承知しました！「${request}」の修正を適用しました。\n\n右側のパネルで更新された仕様書を確認できます。`,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, aiMessage])
      setIsLoading(false)
      setIsGeneratingArtifact(false)

      if (artifact) {
        setArtifact({
          ...artifact,
          version: artifact.version + 1,
          updatedAt: new Date(),
        })
      }
    }, 2000)
  }

  const handleReset = () => {
    setMessages(mockMessages)
    setProgressSteps(mockProgressSteps)
    setCostEstimate(null)
    setVendors([])
    setArtifact(null)
    setCurrentQuestionIndex(0)
    setShowWelcome(true)
  }

  const completedSteps = progressSteps.filter(s => s.status === 'completed').length
  const progressPercent = (completedSteps / progressSteps.length) * 100

  // Welcome Screen
  if (showWelcome) {
    return <WelcomeScreen onStart={() => setShowWelcome(false)} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="flex items-center justify-between h-14 px-4">
          {/* Left */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm hidden sm:inline">戻る</span>
            </Link>

            <div className="h-5 w-px bg-gray-200" />

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-md">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="font-bold text-gray-900 text-sm leading-tight">AI Studio</h1>
                <p className="text-[10px] text-gray-500">AI発注サポート</p>
              </div>
            </div>
          </div>

          {/* Center - Progress */}
          <div className="flex-1 max-w-xs mx-4 hidden md:block">
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-xs text-gray-500 whitespace-nowrap">
                {completedSteps}/{progressSteps.length}
              </span>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsGlossaryOpen(true)}
              className="text-gray-600 h-8 gap-1"
            >
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">用語集</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="text-gray-600 h-8 gap-1"
            >
              <RotateCcw className="h-4 w-4" />
              <span className="hidden sm:inline">最初から</span>
            </Button>

            {artifact && (
              <>
                <div className="h-4 w-px bg-gray-200 hidden sm:block" />
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 gap-1 hidden sm:flex"
                >
                  <Download className="h-4 w-4" />
                  ダウンロード
                </Button>
                <Button
                  size="sm"
                  className="h-8 gap-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500"
                >
                  <Share2 className="h-4 w-4" />
                  <span className="hidden sm:inline">共有</span>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="h-[calc(100vh-56px)]">
        <PanelGroup direction="horizontal">
          {/* Left Panel - Chat */}
          <Panel defaultSize={38} minSize={25} maxSize={50}>
            <div className="h-full flex flex-col bg-white shadow-sm">
              {/* Mobile Progress */}
              <div className="flex md:hidden items-center gap-2 px-4 py-2 border-b bg-gray-50">
                <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500">
                  {completedSteps}/{progressSteps.length}
                </span>
              </div>

              {/* Chat */}
              <div className="flex-1 overflow-hidden">
                <EnhancedChat
                  messages={messages}
                  onAnswer={handleAnswer}
                  onOpenGlossary={handleOpenGlossary}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </Panel>

          <ResizeHandle direction="horizontal" />

          {/* Right Panel - Results */}
          <Panel defaultSize={62} minSize={40}>
            <div className="h-full flex flex-col bg-gray-100">
              {/* Tab Bar */}
              <div className="flex items-center gap-1 px-2 py-2 bg-white border-b shadow-sm">
                {[
                  {
                    id: 'artifact' as const,
                    icon: Code2,
                    label: '生成物',
                    color: 'indigo',
                    badge: isGeneratingArtifact ? 'loading' : artifact ? 'done' : null,
                  },
                  {
                    id: 'estimate' as const,
                    icon: FileText,
                    label: '見積もり',
                    color: 'green',
                    badge: costEstimate ? 'done' : null,
                  },
                  {
                    id: 'vendors' as const,
                    icon: Building2,
                    label: 'ベンダー',
                    color: 'orange',
                    badge: vendors.length > 0 ? vendors.length.toString() : null,
                  },
                ].map((tab) => {
                  const isActive = rightPanelTab === tab.id
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setRightPanelTab(tab.id)}
                      className={cn(
                        'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
                        isActive
                          ? `bg-${tab.color}-50 text-${tab.color}-700 shadow-sm`
                          : 'text-gray-600 hover:bg-gray-100'
                      )}
                      style={isActive ? {
                        backgroundColor: tab.color === 'indigo' ? '#EEF2FF' :
                                        tab.color === 'green' ? '#ECFDF5' :
                                        '#FFF7ED',
                        color: tab.color === 'indigo' ? '#4338CA' :
                               tab.color === 'green' ? '#047857' :
                               '#C2410C',
                      } : {}}
                    >
                      <tab.icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{tab.label}</span>
                      {tab.badge === 'loading' && (
                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                      )}
                      {tab.badge === 'done' && (
                        <span className="w-2 h-2 bg-green-500 rounded-full" />
                      )}
                      {tab.badge && tab.badge !== 'loading' && tab.badge !== 'done' && (
                        <span className="px-1.5 py-0.5 text-[10px] bg-gray-200 text-gray-700 rounded-full">
                          {tab.badge}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>

              {/* Tab Content */}
              <div className="flex-1 overflow-hidden">
                {rightPanelTab === 'artifact' && (
                  <ArtifactPanel
                    artifact={artifact}
                    explanations={mockCodeExplanations}
                    onModificationRequest={handleModificationRequest}
                    isGenerating={isGeneratingArtifact}
                  />
                )}

                {rightPanelTab === 'estimate' && (
                  <div className="h-full overflow-auto p-4 space-y-4">
                    <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
                      <CostEstimator
                        estimate={costEstimate}
                        isCalculating={isLoading && currentQuestionIndex >= 1}
                      />
                    </div>

                    <SimilarCasesPanel
                      cases={mockSimilarCases}
                      onViewCase={(id) => alert(`事例 ${id} を表示`)}
                    />

                    <HelpPanel
                      topics={mockHelpTopics}
                      onOpenChat={() => alert('チャット相談を開始')}
                    />
                  </div>
                )}

                {rightPanelTab === 'vendors' && (
                  <div className="h-full overflow-auto">
                    <VendorRecommendation
                      vendors={vendors}
                      onViewVendor={(id) => alert(`ベンダー ${id} の詳細を表示`)}
                      onContactVendor={(id) => alert(`ベンダー ${id} に問い合わせ`)}
                    />
                  </div>
                )}
              </div>
            </div>
          </Panel>
        </PanelGroup>
      </main>

      {/* Glossary Modal */}
      <GlossaryPanel
        terms={mockGlossary}
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
        highlightTerm={glossaryTerm}
      />
    </div>
  )
}
