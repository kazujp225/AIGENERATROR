// AI Studio - AI開発発注支援ツール向け型定義

// アラジン式質問の型
export type QuestionType = 'yesno' | 'single' | 'multiple' | 'scale' | 'text'

export type QuestionOption = {
  id: string
  label: string
  description?: string
  icon?: string
}

export type AladdinQuestion = {
  id: string
  category: string
  question: string
  type: QuestionType
  options?: QuestionOption[]
  helpText?: string
  glossaryTerms?: string[]
}

export type AladdinAnswer = {
  questionId: string
  answer: string | string[] | number | boolean
  timestamp: Date
}

// チャットメッセージ
export type MessageRole = 'user' | 'assistant' | 'system'

export type Message = {
  id: string
  role: MessageRole
  content: string
  timestamp: Date
  question?: AladdinQuestion
  isTyping?: boolean
  // レガシーフィールド（旧ChatPanel互換）
  status?: 'pending' | 'streaming' | 'complete' | 'error'
  toolCalls?: ToolCall[]
}

// ToolCallの前方参照のため、型をここで宣言
export type ToolCall = {
  id: string
  name: string
  status: 'pending' | 'running' | 'complete' | 'error'
  input?: string
  output?: string
}

// 相場見積もり
export type CostBreakdown = {
  category: string
  label: string
  minCost: number
  maxCost: number
  description: string
}

export type CostEstimate = {
  totalMin: number
  totalMax: number
  breakdown: CostBreakdown[]
  confidenceLevel: number // 0-100
  comparisons: {
    industry: string
    avgCost: number
  }[]
}

// 仕様書
export type SpecSection = {
  id: string
  title: string
  content: string
  status: 'empty' | 'draft' | 'complete'
}

export type SpecDocument = {
  projectName: string
  lastUpdated: Date
  completionRate: number
  sections: SpecSection[]
}

// ベンダー推薦
export type VendorMatch = {
  id: string
  name: string
  logo: string
  matchScore: number
  strengths: string[]
  priceRange: {
    min: number
    max: number
  }
  rating: number
  reviewCount: number
  specialties: string[]
}

// 進捗状態
export type ProgressStep = {
  id: string
  label: string
  status: 'pending' | 'active' | 'completed'
  description: string
}

// 用語集
export type GlossaryTerm = {
  term: string
  reading?: string
  definition: string
  example?: string
  relatedTerms?: string[]
}

// 類似事例
export type SimilarCase = {
  id: string
  title: string
  industry: string
  description: string
  cost: number
  duration: string
  technologies: string[]
  thumbnail?: string
}

// セッション状態
export type SessionPhase =
  | 'welcome'
  | 'industry'
  | 'problem'
  | 'requirements'
  | 'budget'
  | 'timeline'
  | 'summary'

export type Session = {
  id: string
  phase: SessionPhase
  answers: AladdinAnswer[]
  costEstimate: CostEstimate | null
  specDocument: SpecDocument | null
  recommendedVendors: VendorMatch[]
  startedAt: Date
  lastActivityAt: Date
}

// レガシー型（互換性のため）
export type FileNode = {
  id: string
  name: string
  type: 'file' | 'folder'
  path: string
  children?: FileNode[]
  language?: string
}

export type Task = {
  id: string
  title: string
  content?: string  // レガシー互換
  status: 'pending' | 'in_progress' | 'completed'
  description?: string
  activeForm?: string  // レガシー互換
}

export type TerminalOutput = {
  id: string
  type: 'command' | 'output' | 'error'
  content: string
  timestamp: Date
}

export type AgentStatus = 'idle' | 'thinking' | 'executing' | 'waiting'

// 生成アーティファクト（v0風）
export type ArtifactType = 'spec' | 'diagram' | 'code' | 'config'

export type ArtifactFile = {
  id: string
  name: string
  path: string
  language: string
  content: string
  explanation?: string  // 初心者向け解説
}

export type Artifact = {
  id: string
  title: string
  type: ArtifactType
  description: string
  files: ArtifactFile[]
  createdAt: Date
  updatedAt: Date
  version: number
}

// コード解説
export type CodeExplanation = {
  lineStart: number
  lineEnd: number
  explanation: string
  level: 'beginner' | 'intermediate' | 'advanced'
}

// 修正リクエスト
export type ModificationRequest = {
  id: string
  content: string
  targetFile?: string
  targetLines?: { start: number; end: number }
  status: 'pending' | 'processing' | 'applied' | 'rejected'
  timestamp: Date
}

export type ModificationResponse = {
  id: string
  requestId: string
  content: string
  diff?: {
    before: string
    after: string
  }
  timestamp: Date
}
