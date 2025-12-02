// アラジン（要件定義AI）関連の型定義

export type QuestionType = 'single' | 'multiple' | 'yesno' | 'text' | 'slider'

export type QuestionOption = {
  value: string
  label: string
}

export type Question = {
  id: string
  text: string
  type: QuestionType
  options?: QuestionOption[]
  min?: number
  max?: number
  step?: number
  placeholder?: string
}

export type Answer = {
  questionId: string
  value: string | string[] | number | boolean
}

export type Specification = {
  id: string
  projectName: string
  industry: string
  useCase: string
  currentSituation: string
  requirements: string[]
  expectedOutcome: string
  budget: {
    min: number
    max: number
  }
  timeline: string
  hasExistingData: boolean
  needsIntegration: boolean
  createdAt: string
  status: 'draft' | 'complete' | 'sent'
}

export type AladdinSession = {
  id: string
  currentStep: number
  totalSteps: number
  answers: Answer[]
  specification?: Specification
}
