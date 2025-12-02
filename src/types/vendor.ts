// ベンダー関連の型定義

export type TechStackRating = 1 | 2 | 3 | 4 | 5

export type TechStack = {
  llm: TechStackRating
  imageRecognition: TechStackRating
  timeSeries: TechStackRating
  optimization: TechStackRating
}

export type VendorMetrics = {
  onTimeDeliveryRate: number // 0-1
  qualityScore: number // 1-5
  repeatRate: number // 0-1
  avgResponseTime: number // hours
}

export type PriceRange = {
  min: number
  max: number
}

export type Vendor = {
  id: string
  name: string
  logo: string
  rating: number
  reviewCount: number
  location: string
  foundedYear: number
  employeeCount: number
  description: string
  industries: string[]
  techStack: TechStack
  priceRange: PriceRange
  metrics: VendorMetrics
  availableFrom: string
  monthlyCapacity: number
  certifications: string[]
  featured: boolean
}

export type VendorReview = {
  id: string
  vendorId: string
  reviewerName: string
  reviewerCompany: string
  rating: number
  comment: string
  projectType: string
  createdAt: string
}
