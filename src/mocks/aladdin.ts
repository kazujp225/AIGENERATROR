import type { Question } from '@/types/aladdin'

export const aladdinQuestions: Question[] = [
  {
    id: 'q1',
    text: 'どの業界のお仕事ですか？',
    type: 'single',
    options: [
      { value: 'manufacturing', label: '製造業' },
      { value: 'retail', label: '小売・流通' },
      { value: 'finance', label: '金融・保険' },
      { value: 'healthcare', label: '医療・ヘルスケア' },
      { value: 'logistics', label: '物流' },
      { value: 'service', label: 'サービス業' },
      { value: 'other', label: 'その他' },
    ],
  },
  {
    id: 'q2',
    text: '最も解決したい課題は何ですか？',
    type: 'multiple',
    options: [
      { value: 'cost', label: 'コスト削減' },
      { value: 'efficiency', label: '業務効率化' },
      { value: 'quality', label: '品質向上' },
      { value: 'speed', label: 'スピード向上' },
      { value: 'accuracy', label: '精度向上' },
      { value: 'labor', label: '人手不足解消' },
    ],
  },
  {
    id: 'q3',
    text: '具体的にはどのような業務を改善したいですか？',
    type: 'text',
    placeholder: '例：製品の外観検査を自動化したい、お客様からの問い合わせ対応を効率化したい',
  },
  {
    id: 'q4',
    text: '対象業務にはデータがありますか？',
    type: 'single',
    options: [
      { value: 'yes_digital', label: 'はい、電子データがあります' },
      { value: 'yes_paper', label: 'はい、紙のデータがあります' },
      { value: 'partial', label: '一部あります' },
      { value: 'no', label: 'いいえ、ほとんどありません' },
      { value: 'unknown', label: 'わかりません' },
    ],
  },
  {
    id: 'q5',
    text: '既存システムとの連携は必要ですか？',
    type: 'yesno',
  },
  {
    id: 'q6',
    text: 'どのような既存システムがありますか？（複数選択可）',
    type: 'multiple',
    options: [
      { value: 'erp', label: 'ERP（基幹システム）' },
      { value: 'crm', label: 'CRM（顧客管理）' },
      { value: 'pos', label: 'POSシステム' },
      { value: 'wms', label: '倉庫管理システム' },
      { value: 'custom', label: '自社開発システム' },
      { value: 'none', label: '特になし' },
    ],
  },
  {
    id: 'q7',
    text: '社内にIT担当者はいますか？',
    type: 'single',
    options: [
      { value: 'dedicated', label: 'はい、専任の担当者がいます' },
      { value: 'shared', label: 'はい、兼任の担当者がいます' },
      { value: 'outsource', label: 'いいえ、外部に委託しています' },
      { value: 'none', label: 'いいえ、いません' },
    ],
  },
  {
    id: 'q8',
    text: '想定予算はどのくらいですか？',
    type: 'slider',
    min: 100,
    max: 5000,
    step: 100,
  },
  {
    id: 'q9',
    text: '希望する導入時期はいつですか？',
    type: 'single',
    options: [
      { value: 'asap', label: 'できるだけ早く' },
      { value: '3months', label: '3ヶ月以内' },
      { value: '6months', label: '半年以内' },
      { value: '1year', label: '1年以内' },
      { value: 'undecided', label: '未定' },
    ],
  },
  {
    id: 'q10',
    text: 'セキュリティに関する特別な要件はありますか？',
    type: 'multiple',
    options: [
      { value: 'onpremise', label: 'オンプレミス環境必須' },
      { value: 'iso27001', label: 'ISO27001認証必須' },
      { value: 'privacy', label: '個人情報を扱う' },
      { value: 'confidential', label: '機密情報を扱う' },
      { value: 'none', label: '特になし' },
    ],
  },
]

export const sampleSpecification = {
  id: 'spec1',
  projectName: '外観検査自動化プロジェクト',
  industry: '製造業（精密機械）',
  useCase: '外観検査自動化',
  currentIssues: `・熟練工2名で行っている目視検査に限界がある
・不良品の見逃しや検査員による判定のばらつきが発生
・熟練工の高齢化により技術継承が課題`,
  goals: [
    '検査時間50%削減',
    '不良見逃し率1%以下',
    '熟練工依存の解消',
    'データに基づく品質管理体制の構築',
  ],
  dataRequirements: `・入力データ：製品画像（現在カメラ設置済み、日次約500枚）
・教師データ：過去の検査記録（紙、約3年分あり）
・データ品質課題：紙記録の電子化が必要`,
  systemRequirements: `・連携システム：生産管理システム（オンプレ、API未対応）
・インフラ制約：社内ネットワーク内での稼働必須
・セキュリティ要件：機密図面を含むためクラウド不可`,
  budget: { min: 3000000, max: 5000000 },
  timeline: '3ヶ月以内',
  createdAt: '2024-11-15',
  status: 'complete' as const,
}
