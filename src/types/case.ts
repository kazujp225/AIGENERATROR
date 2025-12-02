// 事例関連の型定義

export type CaseStudy = {
  id: string
  title: string
  thumbnail: string
  industry: string
  useCase: string
  technology: string
  company: string // 匿名の場合は "匿名"
  challenge: string
  solution: string
  results: string[]
  cost: number
  duration: string
  vendorId: string
  vendorName: string
  successFactors: string[]
  warnings: string[]
  createdAt: string
}

export type Industry = {
  id: string
  name: string
  icon: string
  caseCount: number
}
