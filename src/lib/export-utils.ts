// AI Studio エクスポートユーティリティ
import type { AladdinAnswers, CostEstimateResult, VendorMatchResult, GeneratedSpec } from './aladdin-engine'

type ExportData = {
  answers: AladdinAnswers
  costEstimate: CostEstimateResult | null
  vendorMatches: VendorMatchResult[]
  specification: GeneratedSpec | null
  exportedAt: Date
}

// 業界ラベルマップ
const INDUSTRY_LABELS: Record<string, string> = {
  manufacturing: '製造業',
  retail: '小売・EC',
  finance: '金融・保険',
  healthcare: '医療・ヘルスケア',
  logistics: '物流・運輸',
  service: 'サービス業',
  other: 'その他',
}

// ユースケースラベルマップ
const USE_CASE_LABELS: Record<string, string> = {
  quality_inspection: '品質検査・外観検査',
  demand_forecast: '需要予測・在庫最適化',
  equipment_maintenance: '設備予知保全',
  process_optimization: '工程最適化',
  customer_analysis: '顧客分析・レコメンド',
  chatbot: 'チャットボット・FAQ自動応答',
  document_processing: '書類読み取り・OCR',
  fraud_detection: '不正検知・リスク分析',
  image_diagnosis: '画像診断支援',
  route_optimization: '配送ルート最適化',
  sentiment_analysis: '感情分析・VOC分析',
  other: 'その他',
}

// 予算ラベルマップ
const BUDGET_LABELS: Record<string, string> = {
  under1m: '100万円未満',
  '1m-3m': '100〜300万円',
  '3m-5m': '300〜500万円',
  '5m-10m': '500〜1000万円',
  over10m: '1000万円以上',
  unknown: '相場を知りたい',
}

// タイムラインラベルマップ
const TIMELINE_LABELS: Record<string, string> = {
  urgent: '3ヶ月以内',
  normal: '半年程度',
  planned: '1年以内',
  flexible: '特に決まっていない',
}

// データステータスラベルマップ
const DATA_STATUS_LABELS: Record<string, string> = {
  digital: '電子データがある',
  paper: '紙のデータがある',
  partial: '一部ある',
  none: 'ほぼない',
  unknown: 'わからない',
}

// IT体制ラベルマップ
const IT_STAFF_LABELS: Record<string, string> = {
  dedicated: '専任担当者がいる',
  shared: '兼任担当者がいる',
  outsource: '外部委託している',
  none: 'いない',
}

/**
 * Markdown形式でエクスポート
 */
export function exportToMarkdown(data: ExportData): string {
  const { answers, costEstimate, vendorMatches, specification, exportedAt } = data

  const lines: string[] = [
    '# AI開発 要件定義書',
    '',
    `**作成日**: ${exportedAt.toLocaleDateString('ja-JP')}`,
    '',
    '---',
    '',
    '## 1. プロジェクト概要',
    '',
  ]

  // 業界
  if (answers.industry) {
    lines.push(`**対象業界**: ${INDUSTRY_LABELS[answers.industry] || answers.industry}`)
  }

  // ユースケース
  if (answers.useCase) {
    lines.push(`**ユースケース**: ${USE_CASE_LABELS[answers.useCase] || answers.useCase}`)
  }

  lines.push('')

  // 課題詳細
  if (answers.problemDescription) {
    lines.push('### 解決したい課題', '', answers.problemDescription, '')
  }

  // データ状況
  lines.push('---', '', '## 2. 現状環境', '')

  if (answers.dataStatus) {
    lines.push(`**データ状況**: ${DATA_STATUS_LABELS[answers.dataStatus] || answers.dataStatus}`)
  }

  if (answers.itStaff) {
    lines.push(`**IT体制**: ${IT_STAFF_LABELS[answers.itStaff] || answers.itStaff}`)
  }

  if (answers.needsIntegration !== undefined) {
    lines.push(`**システム連携**: ${answers.needsIntegration ? '必要' : '不要'}`)
  }

  if (answers.existingSystems && answers.existingSystems.length > 0) {
    lines.push(`**既存システム**: ${answers.existingSystems.join(', ')}`)
  }

  lines.push('')

  // セキュリティ要件
  if (answers.securityRequirements && answers.securityRequirements.length > 0) {
    lines.push('**セキュリティ要件**:', '')
    answers.securityRequirements.forEach(req => {
      const labels: Record<string, string> = {
        onpremise: 'オンプレミス必須',
        iso27001: 'ISO27001認証',
        privacy: '個人情報を扱う',
        confidential: '機密情報を扱う',
        none: '特になし',
      }
      lines.push(`- ${labels[req] || req}`)
    })
    lines.push('')
  }

  // 予算・スケジュール
  lines.push('---', '', '## 3. 予算・スケジュール', '')

  if (answers.budget) {
    lines.push(`**予算目安**: ${BUDGET_LABELS[answers.budget] || answers.budget}`)
  }

  if (answers.timeline) {
    lines.push(`**希望納期**: ${TIMELINE_LABELS[answers.timeline] || answers.timeline}`)
  }

  lines.push('')

  // 見積もり結果
  if (costEstimate) {
    lines.push('---', '', '## 4. 相場見積もり', '')
    lines.push(`**想定費用**: ${(costEstimate.totalMin / 10000).toLocaleString()}万円 〜 ${(costEstimate.totalMax / 10000).toLocaleString()}万円`)
    lines.push(`**中央値**: ${(costEstimate.median / 10000).toLocaleString()}万円`)
    lines.push(`**推定期間**: ${costEstimate.periodMonths.min}〜${costEstimate.periodMonths.max}ヶ月`)
    lines.push(`**信頼度**: ${costEstimate.confidenceLevel}%`)
    lines.push('')

    lines.push('### 内訳', '')
    costEstimate.breakdown.forEach(item => {
      lines.push(`- **${item.label}**: ${(item.minCost / 10000).toLocaleString()}〜${(item.maxCost / 10000).toLocaleString()}万円`)
    })
    lines.push('')

    if (costEstimate.factors.length > 0) {
      lines.push('### 調整要因', '')
      costEstimate.factors.forEach(factor => {
        const sign = factor.impact === 'increase' ? '+' : '-'
        lines.push(`- ${factor.name}: ${sign}${factor.percentage}%`)
      })
      lines.push('')
    }
  }

  // 推奨ベンダー
  if (vendorMatches.length > 0) {
    lines.push('---', '', '## 5. 推奨ベンダー', '')
    vendorMatches.slice(0, 5).forEach((match, idx) => {
      lines.push(`### ${idx + 1}. ${match.vendor.name}`)
      lines.push(`- **マッチスコア**: ${match.matchScore}点`)
      lines.push(`- **評価**: ${match.vendor.rating} (${match.vendor.reviewCount}件のレビュー)`)
      lines.push(`- **強み**: ${match.strengths.join(', ')}`)
      lines.push(`- **価格帯**: ${(match.vendor.priceRange.min / 10000).toLocaleString()}〜${(match.vendor.priceRange.max / 10000).toLocaleString()}万円`)
      lines.push('')
    })
  }

  // 仕様書セクション
  if (specification) {
    lines.push('---', '', '## 6. 仕様書', '')
    lines.push(`**完成度**: ${specification.completionRate}%`, '')

    specification.sections.forEach(section => {
      const statusIcon = section.status === 'complete' ? '✅' : section.status === 'draft' ? '📝' : '⬜'
      lines.push(`### ${statusIcon} ${section.title}`, '')
      if (section.content) {
        lines.push(section.content, '')
      }
    })
  }

  // フッター
  lines.push('---', '')
  lines.push('*このドキュメントはAI Studioで自動生成されました*')
  lines.push(`*生成日時: ${exportedAt.toLocaleString('ja-JP')}*`)

  return lines.join('\n')
}

/**
 * JSON形式でエクスポート
 */
export function exportToJSON(data: ExportData): string {
  return JSON.stringify(data, null, 2)
}

/**
 * ファイルダウンロード
 */
export function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

/**
 * Markdownファイルとしてダウンロード
 */
export function downloadMarkdown(data: ExportData): void {
  const content = exportToMarkdown(data)
  const date = new Date().toISOString().split('T')[0]
  downloadFile(content, `AI開発要件定義書_${date}.md`, 'text/markdown')
}

/**
 * JSONファイルとしてダウンロード
 */
export function downloadJSON(data: ExportData): void {
  const content = exportToJSON(data)
  const date = new Date().toISOString().split('T')[0]
  downloadFile(content, `AI開発要件定義書_${date}.json`, 'application/json')
}

/**
 * 印刷用HTMLを生成してPDFとして保存（ブラウザの印刷機能使用）
 */
export function printAsPDF(data: ExportData): void {
  const markdown = exportToMarkdown(data)

  // シンプルなHTMLに変換
  const html = `
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>AI開発 要件定義書</title>
  <style>
    body {
      font-family: 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'Noto Sans JP', sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 40px;
      line-height: 1.8;
      color: #333;
    }
    h1 { color: #1e40af; border-bottom: 2px solid #1e40af; padding-bottom: 10px; }
    h2 { color: #374151; margin-top: 30px; border-left: 4px solid #3b82f6; padding-left: 12px; }
    h3 { color: #4b5563; margin-top: 20px; }
    hr { border: none; border-top: 1px solid #e5e7eb; margin: 20px 0; }
    ul { padding-left: 24px; }
    li { margin: 8px 0; }
    strong { color: #1f2937; }
    @media print {
      body { padding: 20px; }
      h1, h2 { page-break-after: avoid; }
      h3 { page-break-after: avoid; }
    }
  </style>
</head>
<body>
${markdownToHTML(markdown)}
</body>
</html>
`

  const printWindow = window.open('', '_blank')
  if (printWindow) {
    printWindow.document.write(html)
    printWindow.document.close()
    printWindow.onload = () => {
      printWindow.print()
    }
  }
}

/**
 * シンプルなMarkdown→HTML変換
 */
function markdownToHTML(md: string): string {
  let html = md
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^\*\*(.*)\*\*:(.*)$/gim, '<p><strong>$1</strong>:$2</p>')
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*)\*/gim, '<em>$1</em>')
    .replace(/^- (.*)$/gim, '<li>$1</li>')
    .replace(/^---$/gim, '<hr>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')

  // リスト項目をulでラップ
  const listMatch = html.match(/(<li>.*?<\/li>)+/g)
  if (listMatch) {
    listMatch.forEach(match => {
      html = html.replace(match, `<ul>${match}</ul>`)
    })
  }

  return html
}

/**
 * クリップボードにコピー
 */
export async function copyToClipboard(data: ExportData): Promise<boolean> {
  const content = exportToMarkdown(data)
  try {
    await navigator.clipboard.writeText(content)
    return true
  } catch {
    return false
  }
}

/**
 * 共有用URLを生成（データをBase64エンコード）
 */
export function generateShareableURL(data: ExportData): string {
  const minimalData = {
    a: data.answers,
    t: Date.now(),
  }
  const encoded = btoa(encodeURIComponent(JSON.stringify(minimalData)))
  return `${window.location.origin}/ai-studio?share=${encoded}`
}

/**
 * 共有URLからデータを復元
 */
export function parseShareableURL(url: string): AladdinAnswers | null {
  try {
    const params = new URL(url).searchParams
    const share = params.get('share')
    if (!share) return null

    const decoded = JSON.parse(decodeURIComponent(atob(share)))
    return decoded.a as AladdinAnswers
  } catch {
    return null
  }
}
