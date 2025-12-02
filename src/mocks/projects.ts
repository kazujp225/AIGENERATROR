// プロジェクトモックデータ

export type ProjectStatus = 'planning' | 'in_progress' | 'review' | 'completed'
export type ProjectMilestone = {
  id: string
  title: string
  status: 'pending' | 'in_progress' | 'completed'
  dueDate: string
}

export type Project = {
  id: string
  name: string
  vendorId: string
  vendorName: string
  specId: string
  status: ProjectStatus
  progress: number
  budget: number
  startDate: string
  endDate: string
  milestones: ProjectMilestone[]
  lastActivity: string
  lastActivityTime: string
}

export const mockProjects: Project[] = [
  {
    id: 'proj1',
    name: '外観検査自動化プロジェクト',
    vendorId: 'v1',
    vendorName: '株式会社AIソリューションズ',
    specId: 'spec1',
    status: 'in_progress',
    progress: 65,
    budget: 4500000,
    startDate: '2024-10-01',
    endDate: '2025-01-31',
    milestones: [
      { id: 'm1', title: '要件定義', status: 'completed', dueDate: '2024-10-15' },
      { id: 'm2', title: '設計', status: 'completed', dueDate: '2024-10-31' },
      { id: 'm3', title: 'モデル開発', status: 'in_progress', dueDate: '2024-11-30' },
      { id: 'm4', title: 'テスト', status: 'pending', dueDate: '2024-12-31' },
      { id: 'm5', title: '本番導入', status: 'pending', dueDate: '2025-01-31' },
    ],
    lastActivity: '進捗報告を送信しました',
    lastActivityTime: '2時間前',
  },
  {
    id: 'proj2',
    name: 'チャットボット導入プロジェクト',
    vendorId: 'v3',
    vendorName: 'AIクラフト合同会社',
    specId: 'spec2',
    status: 'planning',
    progress: 20,
    budget: 3000000,
    startDate: '2024-11-15',
    endDate: '2025-02-28',
    milestones: [
      { id: 'm1', title: 'キックオフ', status: 'completed', dueDate: '2024-11-15' },
      { id: 'm2', title: '要件定義', status: 'in_progress', dueDate: '2024-11-30' },
      { id: 'm3', title: '開発', status: 'pending', dueDate: '2025-01-31' },
      { id: 'm4', title: 'テスト・導入', status: 'pending', dueDate: '2025-02-28' },
    ],
    lastActivity: '要件定義書のレビューコメントが届きました',
    lastActivityTime: '1日前',
  },
]

// ベンダー向けリード（案件）モック
export type Lead = {
  id: string
  companyName: string
  projectName: string
  industry: string
  useCase: string
  budget: { min: number; max: number }
  timeline: string
  receivedAt: string
  status: 'new' | 'reviewing' | 'quoted' | 'negotiating' | 'won' | 'lost'
  matchScore: number
  specId: string
}

export const mockLeads: Lead[] = [
  {
    id: 'lead1',
    companyName: '大手精密機器メーカー',
    projectName: '外観検査AI導入',
    industry: '製造業',
    useCase: '外観検査',
    budget: { min: 3000000, max: 5000000 },
    timeline: '3ヶ月',
    receivedAt: '2024-11-18',
    status: 'new',
    matchScore: 92,
    specId: 'spec1',
  },
  {
    id: 'lead2',
    companyName: '地方銀行',
    projectName: 'AIチャットボット導入',
    industry: '金融・保険',
    useCase: 'チャットボット',
    budget: { min: 2000000, max: 4000000 },
    timeline: '2〜3ヶ月',
    receivedAt: '2024-11-15',
    status: 'reviewing',
    matchScore: 85,
    specId: 'spec2',
  },
  {
    id: 'lead3',
    companyName: '大手小売チェーン',
    projectName: '需要予測システム構築',
    industry: '小売・流通',
    useCase: '需要予測',
    budget: { min: 5000000, max: 8000000 },
    timeline: '4〜6ヶ月',
    receivedAt: '2024-11-10',
    status: 'quoted',
    matchScore: 78,
    specId: 'spec3',
  },
  {
    id: 'lead4',
    companyName: '保険会社',
    projectName: '契約書レビュー自動化',
    industry: '金融・保険',
    useCase: 'ドキュメント処理',
    budget: { min: 4000000, max: 6000000 },
    timeline: '3〜4ヶ月',
    receivedAt: '2024-11-05',
    status: 'negotiating',
    matchScore: 88,
    specId: 'spec4',
  },
  {
    id: 'lead5',
    companyName: '自動車部品メーカー',
    projectName: '設備予知保全システム',
    industry: '製造業',
    useCase: '予知保全',
    budget: { min: 6000000, max: 10000000 },
    timeline: '5〜6ヶ月',
    receivedAt: '2024-10-28',
    status: 'won',
    matchScore: 95,
    specId: 'spec5',
  },
]

// ベンダー分析データモック
export type VendorAnalytics = {
  profileViews: { date: string; count: number }[]
  inquiries: { date: string; count: number }[]
  conversionRate: number
  avgResponseTime: number
  rating: number
  reviewCount: number
  monthlyStats: {
    profileViews: number
    profileViewsChange: number
    inquiries: number
    inquiriesChange: number
    quotes: number
    quotesChange: number
    deals: number
    dealsChange: number
  }
}

export const mockVendorAnalytics: VendorAnalytics = {
  profileViews: [
    { date: '2024-11-01', count: 45 },
    { date: '2024-11-02', count: 52 },
    { date: '2024-11-03', count: 38 },
    { date: '2024-11-04', count: 61 },
    { date: '2024-11-05', count: 55 },
    { date: '2024-11-06', count: 48 },
    { date: '2024-11-07', count: 72 },
    { date: '2024-11-08', count: 65 },
    { date: '2024-11-09', count: 58 },
    { date: '2024-11-10', count: 43 },
    { date: '2024-11-11', count: 51 },
    { date: '2024-11-12', count: 67 },
    { date: '2024-11-13', count: 74 },
    { date: '2024-11-14', count: 82 },
  ],
  inquiries: [
    { date: '2024-11-01', count: 3 },
    { date: '2024-11-02', count: 2 },
    { date: '2024-11-03', count: 1 },
    { date: '2024-11-04', count: 4 },
    { date: '2024-11-05', count: 2 },
    { date: '2024-11-06', count: 3 },
    { date: '2024-11-07', count: 5 },
    { date: '2024-11-08', count: 3 },
    { date: '2024-11-09', count: 2 },
    { date: '2024-11-10', count: 1 },
    { date: '2024-11-11', count: 4 },
    { date: '2024-11-12', count: 3 },
    { date: '2024-11-13', count: 6 },
    { date: '2024-11-14', count: 4 },
  ],
  conversionRate: 32,
  avgResponseTime: 2.3,
  rating: 4.5,
  reviewCount: 32,
  monthlyStats: {
    profileViews: 856,
    profileViewsChange: 12,
    inquiries: 43,
    inquiriesChange: 8,
    quotes: 28,
    quotesChange: -3,
    deals: 9,
    dealsChange: 15,
  },
}
