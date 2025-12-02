// 相場関連の型定義

export type MarketData = {
  id: string
  industry: string
  useCase: string
  technology: string
  scale: 'small' | 'medium' | 'large'
  priceRange: {
    min: number
    median: number
    max: number
  }
  durationRange: {
    min: number
    median: number
    max: number
  }
  sampleCount: number
  successRate: number
  confidence: 'low' | 'medium' | 'high'
}

export type MarketSearchParams = {
  industry?: string
  useCase?: string
  technology?: string
  scale?: string
}
