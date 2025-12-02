// アラジンエンジン - AI発注の本質的価値を提供するコアロジック
// 「何を、どこに、いくらで頼めばいいか」を解決する

import type { Vendor } from '@/types/vendor'

// ========================================
// 型定義
// ========================================

export type IndustryType =
  | 'manufacturing'
  | 'retail'
  | 'finance'
  | 'healthcare'
  | 'logistics'
  | 'service'
  | 'other'

export type UseCaseType =
  | 'quality_inspection'      // 品質検査・外観検査
  | 'demand_forecast'         // 需要予測
  | 'equipment_maintenance'   // 設備保全・予知保全
  | 'production_optimization' // 生産最適化
  | 'inventory_optimization'  // 在庫最適化
  | 'customer_support'        // 顧客対応・チャットボット
  | 'document_processing'     // 文書処理・OCR
  | 'fraud_detection'         // 不正検知
  | 'risk_analysis'           // リスク分析
  | 'personalization'         // パーソナライズ・レコメンド
  | 'diagnosis_support'       // 診断支援
  | 'route_optimization'      // 配送・ルート最適化
  | 'data_analysis'           // データ分析・可視化
  | 'other'

export type ProjectScale = 'poc' | 'department' | 'company' | 'unknown'
export type DataStatus = 'digital' | 'paper' | 'partial' | 'none' | 'unknown'
export type BudgetRange = 'under1m' | '1m-3m' | '3m-5m' | '5m-10m' | 'over10m' | 'unknown'
export type TimelineType = 'urgent' | 'normal' | 'planned' | 'flexible'
export type ITStaffStatus = 'dedicated' | 'shared' | 'outsource' | 'none'

export type AladdinAnswers = {
  industry?: IndustryType
  useCase?: UseCaseType
  problemDescription?: string
  dataStatus?: DataStatus
  existingSystems?: string[]
  needsIntegration?: boolean
  itStaff?: ITStaffStatus
  budget?: BudgetRange
  timeline?: TimelineType
  securityRequirements?: string[]
}

// ========================================
// 相場データベース
// ========================================

type PriceRangeData = {
  min: number
  max: number
  median: number
  sampleCount: number
  successRate: number
  periodMonths: { min: number; max: number }
}

// 業界×ユースケース×規模の相場マトリクス
const PRICE_DATABASE: Record<string, PriceRangeData> = {
  // 製造業
  'manufacturing_quality_inspection_poc': { min: 1000000, max: 2000000, median: 1500000, sampleCount: 15, successRate: 0.85, periodMonths: { min: 1, max: 2 } },
  'manufacturing_quality_inspection_department': { min: 3000000, max: 6000000, median: 4500000, sampleCount: 23, successRate: 0.78, periodMonths: { min: 3, max: 5 } },
  'manufacturing_quality_inspection_company': { min: 8000000, max: 15000000, median: 11000000, sampleCount: 8, successRate: 0.72, periodMonths: { min: 6, max: 12 } },

  'manufacturing_demand_forecast_poc': { min: 800000, max: 1500000, median: 1200000, sampleCount: 12, successRate: 0.80, periodMonths: { min: 1, max: 2 } },
  'manufacturing_demand_forecast_department': { min: 2500000, max: 5000000, median: 3500000, sampleCount: 18, successRate: 0.75, periodMonths: { min: 2, max: 4 } },

  'manufacturing_equipment_maintenance_poc': { min: 1500000, max: 2500000, median: 2000000, sampleCount: 10, successRate: 0.82, periodMonths: { min: 2, max: 3 } },
  'manufacturing_equipment_maintenance_department': { min: 4000000, max: 8000000, median: 6000000, sampleCount: 14, successRate: 0.75, periodMonths: { min: 4, max: 6 } },

  // 小売・EC
  'retail_customer_support_poc': { min: 500000, max: 1000000, median: 750000, sampleCount: 25, successRate: 0.88, periodMonths: { min: 1, max: 2 } },
  'retail_customer_support_department': { min: 1500000, max: 3000000, median: 2000000, sampleCount: 32, successRate: 0.82, periodMonths: { min: 2, max: 3 } },

  'retail_demand_forecast_poc': { min: 800000, max: 1500000, median: 1000000, sampleCount: 20, successRate: 0.85, periodMonths: { min: 1, max: 2 } },
  'retail_demand_forecast_department': { min: 2000000, max: 4000000, median: 3000000, sampleCount: 15, successRate: 0.78, periodMonths: { min: 2, max: 4 } },

  'retail_personalization_poc': { min: 1000000, max: 2000000, median: 1500000, sampleCount: 18, successRate: 0.80, periodMonths: { min: 1, max: 2 } },
  'retail_personalization_department': { min: 3000000, max: 6000000, median: 4500000, sampleCount: 12, successRate: 0.75, periodMonths: { min: 3, max: 5 } },

  // 金融
  'finance_fraud_detection_poc': { min: 2000000, max: 3500000, median: 2800000, sampleCount: 8, successRate: 0.75, periodMonths: { min: 2, max: 3 } },
  'finance_fraud_detection_department': { min: 5000000, max: 10000000, median: 7500000, sampleCount: 12, successRate: 0.70, periodMonths: { min: 4, max: 6 } },

  'finance_customer_support_poc': { min: 800000, max: 1500000, median: 1200000, sampleCount: 15, successRate: 0.85, periodMonths: { min: 1, max: 2 } },
  'finance_customer_support_department': { min: 2500000, max: 5000000, median: 3500000, sampleCount: 20, successRate: 0.80, periodMonths: { min: 2, max: 4 } },

  'finance_document_processing_poc': { min: 1000000, max: 2000000, median: 1500000, sampleCount: 18, successRate: 0.82, periodMonths: { min: 1, max: 2 } },
  'finance_document_processing_department': { min: 3000000, max: 6000000, median: 4500000, sampleCount: 14, successRate: 0.78, periodMonths: { min: 3, max: 5 } },

  // 医療
  'healthcare_diagnosis_support_poc': { min: 3000000, max: 5000000, median: 4000000, sampleCount: 6, successRate: 0.70, periodMonths: { min: 3, max: 4 } },
  'healthcare_diagnosis_support_department': { min: 8000000, max: 15000000, median: 12000000, sampleCount: 5, successRate: 0.65, periodMonths: { min: 6, max: 10 } },

  'healthcare_document_processing_poc': { min: 1500000, max: 2500000, median: 2000000, sampleCount: 10, successRate: 0.80, periodMonths: { min: 2, max: 3 } },

  // 物流
  'logistics_route_optimization_poc': { min: 1500000, max: 2500000, median: 2000000, sampleCount: 12, successRate: 0.78, periodMonths: { min: 2, max: 3 } },
  'logistics_route_optimization_department': { min: 4000000, max: 8000000, median: 6000000, sampleCount: 8, successRate: 0.72, periodMonths: { min: 4, max: 6 } },

  'logistics_demand_forecast_poc': { min: 1000000, max: 2000000, median: 1500000, sampleCount: 15, successRate: 0.82, periodMonths: { min: 1, max: 2 } },

  // 汎用
  'other_customer_support_poc': { min: 500000, max: 1000000, median: 750000, sampleCount: 30, successRate: 0.85, periodMonths: { min: 1, max: 2 } },
  'other_customer_support_department': { min: 1500000, max: 3000000, median: 2000000, sampleCount: 25, successRate: 0.80, periodMonths: { min: 2, max: 3 } },

  'other_data_analysis_poc': { min: 800000, max: 1500000, median: 1000000, sampleCount: 20, successRate: 0.82, periodMonths: { min: 1, max: 2 } },
  'other_data_analysis_department': { min: 2000000, max: 4000000, median: 3000000, sampleCount: 15, successRate: 0.78, periodMonths: { min: 2, max: 4 } },
}

// デフォルト相場（該当なしの場合）
const DEFAULT_PRICE: Record<ProjectScale, PriceRangeData> = {
  poc: { min: 1000000, max: 2000000, median: 1500000, sampleCount: 0, successRate: 0.80, periodMonths: { min: 1, max: 2 } },
  department: { min: 3000000, max: 6000000, median: 4500000, sampleCount: 0, successRate: 0.75, periodMonths: { min: 3, max: 5 } },
  company: { min: 8000000, max: 15000000, median: 11000000, sampleCount: 0, successRate: 0.70, periodMonths: { min: 6, max: 12 } },
  unknown: { min: 2000000, max: 5000000, median: 3500000, sampleCount: 0, successRate: 0.75, periodMonths: { min: 2, max: 4 } },
}

// ========================================
// 相場計算エンジン
// ========================================

export type CostEstimateResult = {
  totalMin: number
  totalMax: number
  median: number
  breakdown: {
    category: string
    label: string
    minCost: number
    maxCost: number
    description: string
  }[]
  periodMonths: { min: number; max: number }
  confidenceLevel: number // 0-100
  sampleCount: number
  successRate: number
  factors: {
    name: string
    impact: 'increase' | 'decrease' | 'neutral'
    percentage: number
    reason: string
  }[]
  comparisons: {
    label: string
    avgCost: number
  }[]
}

export function calculateCostEstimate(answers: AladdinAnswers): CostEstimateResult {
  const industry = answers.industry || 'other'
  const useCase = answers.useCase || 'data_analysis'
  const scale = answers.budget === 'under1m' ? 'poc' :
                answers.budget === '1m-3m' ? 'poc' :
                answers.budget === '3m-5m' ? 'department' :
                answers.budget === '5m-10m' ? 'department' :
                answers.budget === 'over10m' ? 'company' : 'department'

  // 相場データを取得
  const key = `${industry}_${useCase}_${scale}`
  const basePrice = PRICE_DATABASE[key] || DEFAULT_PRICE[scale]

  // 調整係数を計算
  const factors: CostEstimateResult['factors'] = []
  let adjustmentRate = 1.0

  // データ状況による調整
  if (answers.dataStatus === 'paper') {
    adjustmentRate += 0.15
    factors.push({
      name: 'データ電子化',
      impact: 'increase',
      percentage: 15,
      reason: '紙データの電子化作業が必要なため'
    })
  } else if (answers.dataStatus === 'none') {
    adjustmentRate += 0.25
    factors.push({
      name: 'データ収集',
      impact: 'increase',
      percentage: 25,
      reason: 'データ収集・整備から始める必要があるため'
    })
  } else if (answers.dataStatus === 'digital') {
    adjustmentRate -= 0.05
    factors.push({
      name: 'データ整備済み',
      impact: 'decrease',
      percentage: 5,
      reason: '電子データが整備されているため'
    })
  }

  // システム連携による調整
  if (answers.needsIntegration && answers.existingSystems && answers.existingSystems.length > 0) {
    const integrationCost = Math.min(answers.existingSystems.length * 0.08, 0.25)
    adjustmentRate += integrationCost
    factors.push({
      name: 'システム連携',
      impact: 'increase',
      percentage: Math.round(integrationCost * 100),
      reason: `${answers.existingSystems.length}個の既存システムとの連携が必要なため`
    })
  }

  // セキュリティ要件による調整
  if (answers.securityRequirements && answers.securityRequirements.length > 0) {
    if (answers.securityRequirements.includes('onpremise')) {
      adjustmentRate += 0.15
      factors.push({
        name: 'オンプレミス環境',
        impact: 'increase',
        percentage: 15,
        reason: 'クラウドではなくオンプレミス環境での構築が必要なため'
      })
    }
    if (answers.securityRequirements.includes('iso27001')) {
      adjustmentRate += 0.10
      factors.push({
        name: 'ISO27001対応',
        impact: 'increase',
        percentage: 10,
        reason: 'セキュリティ認証への対応が必要なため'
      })
    }
  }

  // IT担当者による調整
  if (answers.itStaff === 'none') {
    adjustmentRate += 0.10
    factors.push({
      name: '運用サポート',
      impact: 'increase',
      percentage: 10,
      reason: 'IT担当者不在のため、手厚いサポートが必要'
    })
  } else if (answers.itStaff === 'dedicated') {
    adjustmentRate -= 0.05
    factors.push({
      name: '社内IT体制',
      impact: 'decrease',
      percentage: 5,
      reason: '専任IT担当者がいるため、スムーズに進行可能'
    })
  }

  // 納期による調整
  if (answers.timeline === 'urgent') {
    adjustmentRate += 0.15
    factors.push({
      name: '短納期対応',
      impact: 'increase',
      percentage: 15,
      reason: '急ぎの納期のため、追加リソースが必要'
    })
  }

  // 最終価格を計算
  const adjustedMin = Math.round(basePrice.min * adjustmentRate / 100000) * 100000
  const adjustedMax = Math.round(basePrice.max * adjustmentRate / 100000) * 100000
  const adjustedMedian = Math.round(basePrice.median * adjustmentRate / 100000) * 100000

  // 内訳を計算
  const breakdown = [
    {
      category: 'development',
      label: 'AI開発費',
      minCost: Math.round(adjustedMin * 0.55 / 100000) * 100000,
      maxCost: Math.round(adjustedMax * 0.55 / 100000) * 100000,
      description: 'AIモデルの開発・学習・チューニング'
    },
    {
      category: 'integration',
      label: 'システム連携',
      minCost: Math.round(adjustedMin * 0.20 / 100000) * 100000,
      maxCost: Math.round(adjustedMax * 0.20 / 100000) * 100000,
      description: '既存システムとの接続・データ連携'
    },
    {
      category: 'infrastructure',
      label: 'インフラ構築',
      minCost: Math.round(adjustedMin * 0.15 / 100000) * 100000,
      maxCost: Math.round(adjustedMax * 0.15 / 100000) * 100000,
      description: 'サーバー・クラウド環境の構築'
    },
    {
      category: 'support',
      label: '導入・研修',
      minCost: Math.round(adjustedMin * 0.10 / 100000) * 100000,
      maxCost: Math.round(adjustedMax * 0.10 / 100000) * 100000,
      description: '導入支援・オペレーター研修'
    }
  ]

  // 信頼度を計算
  const confidenceLevel = basePrice.sampleCount > 0
    ? Math.min(40 + basePrice.sampleCount * 2.5, 90)
    : 30

  return {
    totalMin: adjustedMin,
    totalMax: adjustedMax,
    median: adjustedMedian,
    breakdown,
    periodMonths: basePrice.periodMonths,
    confidenceLevel: Math.round(confidenceLevel),
    sampleCount: basePrice.sampleCount,
    successRate: Math.round(basePrice.successRate * 100),
    factors,
    comparisons: [
      { label: '同業界平均', avgCost: adjustedMedian },
      { label: '全業界平均', avgCost: 4500000 }
    ]
  }
}

// ========================================
// ベンダーマッチングエンジン
// ========================================

export type VendorMatchResult = {
  vendor: Vendor
  matchScore: number
  strengths: string[]
  matchReasons: {
    category: string
    score: number
    reason: string
  }[]
  estimatedPrice: { min: number; max: number }
}

export function matchVendors(answers: AladdinAnswers, vendors: Vendor[]): VendorMatchResult[] {
  const results: VendorMatchResult[] = []

  for (const vendor of vendors) {
    let totalScore = 0
    const matchReasons: VendorMatchResult['matchReasons'] = []
    const strengths: string[] = []

    // 業界マッチング（40点満点）
    const industryMap: Record<IndustryType, string> = {
      manufacturing: '製造業',
      retail: '小売業',
      finance: '金融',
      healthcare: '医療',
      logistics: '物流',
      service: 'サービス業',
      other: ''
    }
    const targetIndustry = industryMap[answers.industry || 'other']

    if (targetIndustry && vendor.industries.includes(targetIndustry)) {
      totalScore += 40
      matchReasons.push({
        category: '業界適合',
        score: 40,
        reason: `${targetIndustry}の実績あり`
      })
      strengths.push(`${targetIndustry}に強み`)
    } else if (vendor.industries.some(ind => ['IT', 'その他'].includes(ind))) {
      totalScore += 20
      matchReasons.push({
        category: '業界適合',
        score: 20,
        reason: '幅広い業界に対応'
      })
    } else {
      totalScore += 10
      matchReasons.push({
        category: '業界適合',
        score: 10,
        reason: '異なる業界だが対応可能'
      })
    }

    // 技術マッチング（30点満点）
    const useCaseToTech: Record<UseCaseType, keyof typeof vendor.techStack> = {
      quality_inspection: 'imageRecognition',
      demand_forecast: 'timeSeries',
      equipment_maintenance: 'timeSeries',
      production_optimization: 'optimization',
      inventory_optimization: 'optimization',
      customer_support: 'llm',
      document_processing: 'llm',
      fraud_detection: 'timeSeries',
      risk_analysis: 'timeSeries',
      personalization: 'llm',
      diagnosis_support: 'imageRecognition',
      route_optimization: 'optimization',
      data_analysis: 'timeSeries',
      other: 'llm'
    }

    const requiredTech = useCaseToTech[answers.useCase || 'other']
    const techScore = vendor.techStack[requiredTech] || 3
    const techPoints = techScore * 6
    totalScore += techPoints

    if (techScore >= 4) {
      const techNames: Record<string, string> = {
        llm: 'LLM・RAG',
        imageRecognition: '画像認識',
        timeSeries: '時系列分析',
        optimization: '最適化'
      }
      strengths.push(`${techNames[requiredTech]}に強み`)
    }

    matchReasons.push({
      category: '技術適合',
      score: techPoints,
      reason: `必要技術のスキルレベル: ${techScore}/5`
    })

    // 価格帯マッチング（20点満点）
    const costEstimate = calculateCostEstimate(answers)
    const vendorMidPrice = (vendor.priceRange.min + vendor.priceRange.max) / 2
    const targetMidPrice = costEstimate.median

    const priceRatio = vendorMidPrice / targetMidPrice
    let priceScore = 0

    if (priceRatio >= 0.8 && priceRatio <= 1.2) {
      priceScore = 20
      matchReasons.push({
        category: '価格適合',
        score: 20,
        reason: '想定予算に合致'
      })
    } else if (priceRatio >= 0.5 && priceRatio <= 1.5) {
      priceScore = 12
      matchReasons.push({
        category: '価格適合',
        score: 12,
        reason: '想定予算と概ね合致'
      })
    } else {
      priceScore = 5
      matchReasons.push({
        category: '価格適合',
        score: 5,
        reason: '想定予算とやや乖離'
      })
    }
    totalScore += priceScore

    // 信頼性（10点満点）
    const reliabilityScore = Math.round(
      (vendor.metrics.onTimeDeliveryRate * 4 +
       vendor.metrics.qualityScore / 5 * 3 +
       vendor.metrics.repeatRate * 3) * 10
    ) / 10
    totalScore += Math.min(reliabilityScore, 10)

    if (vendor.metrics.onTimeDeliveryRate >= 0.9) {
      strengths.push('納期遵守率90%以上')
    }
    if (vendor.metrics.qualityScore >= 4.5) {
      strengths.push('高品質評価')
    }
    if (vendor.metrics.repeatRate >= 0.6) {
      strengths.push('リピート率60%以上')
    }

    matchReasons.push({
      category: '信頼性',
      score: Math.min(reliabilityScore, 10),
      reason: `評価: ${vendor.rating}/5.0 (${vendor.reviewCount}件)`
    })

    results.push({
      vendor,
      matchScore: Math.round(totalScore),
      strengths: strengths.slice(0, 3),
      matchReasons,
      estimatedPrice: {
        min: Math.max(vendor.priceRange.min, costEstimate.totalMin * 0.8),
        max: Math.min(vendor.priceRange.max, costEstimate.totalMax * 1.2)
      }
    })
  }

  // スコア順にソート
  return results.sort((a, b) => b.matchScore - a.matchScore)
}

// ========================================
// 仕様書生成エンジン
// ========================================

export type GeneratedSpec = {
  projectName: string
  version: string
  generatedAt: Date
  sections: {
    id: string
    title: string
    content: string
    status: 'complete' | 'draft' | 'empty'
  }[]
  completionRate: number
}

export function generateSpecification(answers: AladdinAnswers): GeneratedSpec {
  const industryNames: Record<IndustryType, string> = {
    manufacturing: '製造業',
    retail: '小売・EC',
    finance: '金融・保険',
    healthcare: '医療・ヘルスケア',
    logistics: '物流・運輸',
    service: 'サービス業',
    other: 'その他業種'
  }

  const useCaseNames: Record<UseCaseType, string> = {
    quality_inspection: '品質検査・外観検査の自動化',
    demand_forecast: '需要予測・販売予測',
    equipment_maintenance: '設備保全・予知保全',
    production_optimization: '生産最適化',
    inventory_optimization: '在庫最適化',
    customer_support: '顧客対応・チャットボット',
    document_processing: '文書処理・OCR',
    fraud_detection: '不正検知',
    risk_analysis: 'リスク分析',
    personalization: 'パーソナライズ・レコメンド',
    diagnosis_support: '診断支援',
    route_optimization: '配送・ルート最適化',
    data_analysis: 'データ分析・可視化',
    other: 'AI活用'
  }

  const costEstimate = calculateCostEstimate(answers)

  const projectName = `${industryNames[answers.industry || 'other']}向け ${useCaseNames[answers.useCase || 'other']}プロジェクト`

  const sections: GeneratedSpec['sections'] = [
    {
      id: 'overview',
      title: 'プロジェクト概要',
      content: `【プロジェクト名】
${projectName}

【業界】
${industryNames[answers.industry || 'other']}

【目的】
${useCaseNames[answers.useCase || 'other']}により、業務効率化・コスト削減を実現する。

${answers.problemDescription ? `【具体的な課題】\n${answers.problemDescription}` : ''}`,
      status: 'complete'
    },
    {
      id: 'background',
      title: '背景・課題',
      content: answers.problemDescription
        ? `【現状の課題】\n${answers.problemDescription}\n\n【AI導入により期待される効果】\n- 業務効率の向上\n- コスト削減\n- 品質・精度の向上\n- 人的リソースの最適化`
        : '',
      status: answers.problemDescription ? 'complete' : 'empty'
    },
    {
      id: 'data',
      title: 'データ要件',
      content: `【データ状況】
${answers.dataStatus === 'digital' ? '電子データが整備されている' :
  answers.dataStatus === 'paper' ? '紙のデータがあり、電子化が必要' :
  answers.dataStatus === 'partial' ? 'データは一部のみ存在' :
  answers.dataStatus === 'none' ? 'データ収集から始める必要がある' :
  '確認が必要'}

${answers.dataStatus === 'paper' ? '【必要な作業】\n- 紙データの電子化\n- データクレンジング\n- フォーマット統一' : ''}
${answers.dataStatus === 'none' ? '【必要な作業】\n- データ収集計画の策定\n- データ収集の実施\n- データ品質の確保' : ''}`,
      status: answers.dataStatus ? 'complete' : 'empty'
    },
    {
      id: 'system',
      title: 'システム要件',
      content: `【既存システム連携】
${answers.needsIntegration ? '連携が必要' : '連携不要または未定'}

${answers.existingSystems && answers.existingSystems.length > 0
  ? `【連携対象システム】\n${answers.existingSystems.map(s => `- ${s}`).join('\n')}`
  : ''}

【IT体制】
${answers.itStaff === 'dedicated' ? '専任IT担当者あり' :
  answers.itStaff === 'shared' ? '兼任IT担当者あり' :
  answers.itStaff === 'outsource' ? '外部委託' :
  answers.itStaff === 'none' ? 'IT担当者なし（運用サポート必要）' :
  '確認が必要'}

${answers.securityRequirements && answers.securityRequirements.length > 0
  ? `【セキュリティ要件】\n${answers.securityRequirements.map(s => `- ${s}`).join('\n')}`
  : ''}`,
      status: answers.needsIntegration !== undefined ? 'complete' : 'draft'
    },
    {
      id: 'budget',
      title: '予算・スケジュール',
      content: `【想定予算】
${costEstimate.totalMin.toLocaleString()}円 〜 ${costEstimate.totalMax.toLocaleString()}円
（中央値: ${costEstimate.median.toLocaleString()}円）

【費用内訳（概算）】
${costEstimate.breakdown.map(b => `- ${b.label}: ${b.minCost.toLocaleString()}円 〜 ${b.maxCost.toLocaleString()}円`).join('\n')}

【希望納期】
${answers.timeline === 'urgent' ? '3ヶ月以内（急ぎ）' :
  answers.timeline === 'normal' ? '半年程度' :
  answers.timeline === 'planned' ? '1年以内' :
  '未定'}

【推定開発期間】
${costEstimate.periodMonths.min}ヶ月 〜 ${costEstimate.periodMonths.max}ヶ月`,
      status: 'complete'
    }
  ]

  const completedSections = sections.filter(s => s.status === 'complete').length
  const completionRate = Math.round((completedSections / sections.length) * 100)

  return {
    projectName,
    version: '1.0.0',
    generatedAt: new Date(),
    sections,
    completionRate
  }
}

// ========================================
// 業界別ユースケース取得
// ========================================

export const INDUSTRY_USE_CASES: Record<IndustryType, { value: UseCaseType; label: string; icon: string }[]> = {
  manufacturing: [
    { value: 'quality_inspection', label: '品質検査・外観検査', icon: '🔍' },
    { value: 'demand_forecast', label: '需要予測', icon: '📈' },
    { value: 'equipment_maintenance', label: '設備保全・予知保全', icon: '🔧' },
    { value: 'production_optimization', label: '生産最適化', icon: '⚙️' },
    { value: 'data_analysis', label: 'データ分析・可視化', icon: '📊' },
  ],
  retail: [
    { value: 'demand_forecast', label: '需要予測・販売予測', icon: '📈' },
    { value: 'inventory_optimization', label: '在庫最適化', icon: '📦' },
    { value: 'customer_support', label: '顧客対応・チャットボット', icon: '💬' },
    { value: 'personalization', label: 'パーソナライズ・レコメンド', icon: '🎯' },
    { value: 'data_analysis', label: 'データ分析・可視化', icon: '📊' },
  ],
  finance: [
    { value: 'fraud_detection', label: '不正検知', icon: '🛡️' },
    { value: 'risk_analysis', label: 'リスク分析', icon: '⚠️' },
    { value: 'customer_support', label: '顧客対応・チャットボット', icon: '💬' },
    { value: 'document_processing', label: '文書処理・OCR', icon: '📄' },
    { value: 'data_analysis', label: 'データ分析・可視化', icon: '📊' },
  ],
  healthcare: [
    { value: 'diagnosis_support', label: '診断支援', icon: '🏥' },
    { value: 'document_processing', label: '文書処理・カルテ解析', icon: '📄' },
    { value: 'data_analysis', label: 'データ分析・可視化', icon: '📊' },
    { value: 'demand_forecast', label: '需要予測', icon: '📈' },
  ],
  logistics: [
    { value: 'route_optimization', label: '配送・ルート最適化', icon: '🚚' },
    { value: 'demand_forecast', label: '需要予測', icon: '📈' },
    { value: 'inventory_optimization', label: '在庫最適化', icon: '📦' },
    { value: 'data_analysis', label: 'データ分析・可視化', icon: '📊' },
  ],
  service: [
    { value: 'customer_support', label: '顧客対応・チャットボット', icon: '💬' },
    { value: 'document_processing', label: '文書処理', icon: '📄' },
    { value: 'personalization', label: 'パーソナライズ', icon: '🎯' },
    { value: 'data_analysis', label: 'データ分析・可視化', icon: '📊' },
  ],
  other: [
    { value: 'customer_support', label: '顧客対応・チャットボット', icon: '💬' },
    { value: 'document_processing', label: '文書処理', icon: '📄' },
    { value: 'data_analysis', label: 'データ分析・可視化', icon: '📊' },
    { value: 'other', label: 'その他', icon: '💡' },
  ],
}
