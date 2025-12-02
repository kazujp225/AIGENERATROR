// AI Studio モックデータ（初心者向けAI発注支援）

import type {
  Message,
  AladdinQuestion,
  CostEstimate,
  SpecDocument,
  VendorMatch,
  ProgressStep,
  GlossaryTerm,
  SimilarCase,
} from '@/types/ai-studio'

// アラジン式の質問データ
export const mockQuestions: AladdinQuestion[] = [
  {
    id: 'q1',
    category: '業種',
    question: 'どの業界でAIを活用したいですか？',
    type: 'single',
    options: [
      { id: 'manufacturing', label: '製造業', description: '工場・生産ライン', icon: '🏭' },
      { id: 'retail', label: '小売・EC', description: '店舗・オンライン販売', icon: '🛒' },
      { id: 'finance', label: '金融・保険', description: '銀行・証券・保険', icon: '🏦' },
      { id: 'healthcare', label: '医療・ヘルスケア', description: '病院・介護・健康', icon: '🏥' },
      { id: 'logistics', label: '物流・運輸', description: '配送・倉庫管理', icon: '🚚' },
      { id: 'other', label: 'その他', description: '上記以外の業界', icon: '💼' },
    ],
    helpText: '業界によって最適なAIソリューションが異なります。',
  },
  {
    id: 'q2',
    category: '課題',
    question: 'AIで解決したい課題は何ですか？',
    type: 'multiple',
    options: [
      { id: 'automation', label: '業務の自動化', description: '手作業を減らしたい', icon: '⚡' },
      { id: 'prediction', label: '需要・売上予測', description: '将来を予測したい', icon: '📈' },
      { id: 'customer', label: '顧客対応の効率化', description: 'チャットボット等', icon: '💬' },
      { id: 'quality', label: '品質管理・検査', description: '不良品検出等', icon: '🔍' },
      { id: 'document', label: '文書処理・分析', description: '書類のデジタル化', icon: '📄' },
      { id: 'data', label: 'データ分析・可視化', description: '経営判断の支援', icon: '📊' },
    ],
    helpText: '複数選択可能です。主な課題を選んでください。',
    glossaryTerms: ['チャットボット', 'AI', '機械学習'],
  },
  {
    id: 'q3',
    category: '規模',
    question: '導入する規模はどの程度を想定していますか？',
    type: 'single',
    options: [
      { id: 'poc', label: 'まずは検証から', description: 'PoC・実証実験', icon: '🧪' },
      { id: 'department', label: '一部署で導入', description: '特定チームで利用', icon: '👥' },
      { id: 'company', label: '全社導入', description: '会社全体で利用', icon: '🏢' },
      { id: 'unknown', label: 'まだわからない', description: '相談して決めたい', icon: '❓' },
    ],
    helpText: '最初は小さく始めて、効果を見ながら拡大することをお勧めします。',
    glossaryTerms: ['PoC'],
  },
  {
    id: 'q4',
    category: '予算',
    question: 'ご予算の目安を教えてください',
    type: 'single',
    options: [
      { id: 'under1m', label: '100万円未満', description: '小規模な導入', icon: '💰' },
      { id: '1m-5m', label: '100万〜500万円', description: '中規模な導入', icon: '💰💰' },
      { id: '5m-10m', label: '500万〜1000万円', description: '本格的な導入', icon: '💰💰💰' },
      { id: 'over10m', label: '1000万円以上', description: '大規模な導入', icon: '💎' },
      { id: 'unknown', label: '相場を知りたい', description: '予算はこれから', icon: '❓' },
    ],
    helpText: '大まかで構いません。相場を参考に調整できます。',
  },
  {
    id: 'q5',
    category: 'スケジュール',
    question: 'いつまでに導入したいですか？',
    type: 'single',
    options: [
      { id: 'urgent', label: '3ヶ月以内', description: '急ぎで進めたい', icon: '🚀' },
      { id: 'normal', label: '半年程度', description: '標準的なスケジュール', icon: '📅' },
      { id: 'planned', label: '1年以内', description: 'じっくり進めたい', icon: '🗓️' },
      { id: 'flexible', label: '特に決まっていない', description: 'まずは情報収集', icon: '🤔' },
    ],
    helpText: 'プロジェクトの複雑さによって期間は変動します。',
  },
]

// 初期メッセージ
export const mockMessages: Message[] = [
  {
    id: 'm1',
    role: 'assistant',
    content: 'こんにちは！AI開発の発注をサポートする「アラジン」です。\n\nいくつかの質問に答えるだけで、あなたに最適なAIソリューションと概算費用がわかります。技術的な知識は必要ありません。',
    timestamp: new Date(),
    question: mockQuestions[0],
  },
]

// 相場見積もり
export const mockCostEstimate: CostEstimate = {
  totalMin: 3000000,
  totalMax: 8000000,
  breakdown: [
    {
      category: 'development',
      label: 'AI開発費',
      minCost: 2000000,
      maxCost: 5000000,
      description: 'AIモデルの開発・学習',
    },
    {
      category: 'integration',
      label: 'システム連携',
      minCost: 500000,
      maxCost: 1500000,
      description: '既存システムとの接続',
    },
    {
      category: 'infrastructure',
      label: 'インフラ構築',
      minCost: 300000,
      maxCost: 1000000,
      description: 'サーバー・クラウド環境',
    },
    {
      category: 'support',
      label: '保守・運用',
      minCost: 200000,
      maxCost: 500000,
      description: '年間の保守費用',
    },
  ],
  confidenceLevel: 65,
  comparisons: [
    { industry: '製造業（同規模）', avgCost: 5500000 },
    { industry: '全業界平均', avgCost: 4800000 },
  ],
}

// 仕様書
export const mockSpecDocument: SpecDocument = {
  projectName: 'AI画像検査システム導入プロジェクト',
  lastUpdated: new Date(),
  completionRate: 45,
  sections: [
    {
      id: 'overview',
      title: 'プロジェクト概要',
      content: '製造ラインにおける製品の外観検査を自動化するAIシステムの導入',
      status: 'complete',
    },
    {
      id: 'background',
      title: '背景・課題',
      content: '現在は目視検査に依存しており、検査員の負担が大きく、見落としリスクがある',
      status: 'complete',
    },
    {
      id: 'requirements',
      title: '機能要件',
      content: '- 不良品の自動検出（精度95%以上）\n- リアルタイム処理（1秒以内）\n- 既存ラインへの組み込み',
      status: 'draft',
    },
    {
      id: 'scope',
      title: '対象範囲',
      content: '',
      status: 'empty',
    },
    {
      id: 'timeline',
      title: 'スケジュール',
      content: '',
      status: 'empty',
    },
    {
      id: 'budget',
      title: '予算',
      content: '',
      status: 'empty',
    },
  ],
}

// ベンダー推薦
export const mockVendorMatches: VendorMatch[] = [
  {
    id: 'v1',
    name: 'AIソリューションズ株式会社',
    logo: '/mock/vendors/ai-solutions.png',
    matchScore: 92,
    strengths: ['製造業実績多数', '画像認識に強み', '保守サポート充実'],
    priceRange: { min: 3500000, max: 6000000 },
    rating: 4.7,
    reviewCount: 28,
    specialties: ['画像認識', '製造業', '品質管理'],
  },
  {
    id: 'v2',
    name: 'テクノブリッジ株式会社',
    logo: '/mock/vendors/technobridge.png',
    matchScore: 85,
    strengths: ['コスト効率が良い', '迅速な対応', '中小企業に強い'],
    priceRange: { min: 2500000, max: 4500000 },
    rating: 4.4,
    reviewCount: 42,
    specialties: ['業務自動化', 'データ分析', '中小企業支援'],
  },
  {
    id: 'v3',
    name: 'NextAI株式会社',
    logo: '/mock/vendors/nextai.png',
    matchScore: 78,
    strengths: ['最新技術に強い', '大手実績あり', 'グローバル対応可'],
    priceRange: { min: 5000000, max: 10000000 },
    rating: 4.8,
    reviewCount: 15,
    specialties: ['深層学習', 'エンタープライズ', '研究開発'],
  },
]

// 進捗ステップ
export const mockProgressSteps: ProgressStep[] = [
  { id: 'step1', label: '業種選択', status: 'completed', description: '業界を選びました' },
  { id: 'step2', label: '課題特定', status: 'completed', description: '解決したい課題を選びました' },
  { id: 'step3', label: '規模設定', status: 'active', description: '導入規模を決めています' },
  { id: 'step4', label: '予算確認', status: 'pending', description: '予算の目安を設定します' },
  { id: 'step5', label: '仕様確定', status: 'pending', description: '仕様書を完成させます' },
  { id: 'step6', label: 'ベンダー選定', status: 'pending', description: '最適なベンダーを選びます' },
]

// 用語集
export const mockGlossary: GlossaryTerm[] = [
  {
    term: 'AI',
    reading: 'エーアイ',
    definition: '人工知能（Artificial Intelligence）の略。コンピュータが人間のように学習し、判断する技術です。',
    example: '画像から不良品を見つけるAI、会話できるチャットボットなど',
    relatedTerms: ['機械学習', '深層学習', 'チャットボット'],
  },
  {
    term: 'PoC',
    reading: 'ピーオーシー',
    definition: '概念実証（Proof of Concept）の略。本格導入前に、小規模で効果を検証することです。',
    example: '1ヶ月間、一部のデータでAIの精度を検証する',
    relatedTerms: ['実証実験', 'パイロット'],
  },
  {
    term: '機械学習',
    reading: 'きかいがくしゅう',
    definition: 'データからパターンを学習し、予測や判断ができるようになるAIの技術です。',
    example: '過去の売上データから将来の需要を予測する',
    relatedTerms: ['AI', '深層学習', '教師あり学習'],
  },
  {
    term: 'チャットボット',
    reading: 'ちゃっとぼっと',
    definition: '人間の代わりに自動で会話・応答するプログラムです。24時間対応が可能になります。',
    example: 'ウェブサイトでの問い合わせ対応、社内ヘルプデスク',
    relatedTerms: ['AI', '自然言語処理', 'カスタマーサポート'],
  },
  {
    term: 'API',
    reading: 'エーピーアイ',
    definition: 'システム同士を連携させるための接続口です。異なるシステムがデータをやり取りできます。',
    example: '既存の在庫管理システムとAIシステムの連携',
    relatedTerms: ['システム連携', 'インテグレーション'],
  },
  {
    term: '深層学習',
    reading: 'しんそうがくしゅう',
    definition: '人間の脳の仕組みを模した高度なAI技術です。画像認識や音声認識で高い精度を発揮します。',
    example: '製品の傷を画像から検出するAI',
    relatedTerms: ['AI', '機械学習', 'ニューラルネットワーク'],
  },
]

// 類似事例
export const mockSimilarCases: SimilarCase[] = [
  {
    id: 'case1',
    title: '電子部品メーカーの外観検査AI導入',
    industry: '製造業',
    description: '目視検査の自動化により、検査工数を70%削減。不良品の見逃しも大幅に減少。',
    cost: 4500000,
    duration: '4ヶ月',
    technologies: ['画像認識', '深層学習', 'エッジAI'],
    thumbnail: '/mock/cases/manufacturing-ai.jpg',
  },
  {
    id: 'case2',
    title: '食品工場の需要予測システム',
    industry: '製造業',
    description: '過去の販売データと天候データを活用し、需要予測の精度を85%に向上。廃棄ロス30%削減。',
    cost: 3200000,
    duration: '3ヶ月',
    technologies: ['機械学習', '時系列分析', 'データ分析'],
    thumbnail: '/mock/cases/demand-forecast.jpg',
  },
  {
    id: 'case3',
    title: '物流会社の配車最適化AI',
    industry: '物流・運輸',
    description: 'AIによる配車計画の自動作成で、配送効率15%向上。CO2排出量も削減。',
    cost: 6800000,
    duration: '6ヶ月',
    technologies: ['最適化AI', '機械学習', 'ルート最適化'],
    thumbnail: '/mock/cases/logistics-ai.jpg',
  },
]

// ヘルプトピック
export const mockHelpTopics = [
  {
    id: 'help1',
    title: 'AIでできることって何？',
    content: 'AIは大きく分けて「予測する」「認識する」「自動化する」「対話する」の4つができます。',
  },
  {
    id: 'help2',
    title: '費用の相場はどのくらい？',
    content: '小規模なPoCで100〜300万円、本格導入で500〜2000万円が一般的です。',
  },
  {
    id: 'help3',
    title: '導入までの期間は？',
    content: 'PoCで1〜2ヶ月、本格導入で3〜6ヶ月が目安です。複雑なシステムは1年かかることも。',
  },
  {
    id: 'help4',
    title: 'どんな準備が必要？',
    content: 'まずはデータの整理が重要です。過去のデータがあればあるほど、AIの精度は上がります。',
  },
]

// 生成アーティファクト（v0風）
export const mockArtifact = {
  id: 'artifact-1',
  title: 'AI画像検査システム仕様書',
  type: 'spec' as const,
  description: '製造ラインの外観検査を自動化するAIシステムの仕様書',
  files: [
    {
      id: 'file-1',
      name: 'specification.yaml',
      path: '/specs/specification.yaml',
      language: 'yaml',
      content: `# AI画像検査システム仕様書
# 自動生成: AIAIO AI Studio

project:
  name: "AI外観検査システム"
  version: "1.0.0"
  created: "2024-11-20"

# プロジェクト概要
overview:
  description: |
    製造ラインにおける製品の外観検査を
    AIで自動化するシステム
  goals:
    - 検査工数を70%削減
    - 不良品見逃し率を0.1%以下に
    - 24時間無人稼働の実現

# 機能要件
requirements:
  functional:
    - id: REQ-001
      name: "リアルタイム画像取得"
      priority: 必須
      description: |
        ラインカメラから毎秒30フレームで
        製品画像を取得する

    - id: REQ-002
      name: "不良品検出"
      priority: 必須
      description: |
        AIモデルで傷・変形・異物を
        検出する（精度95%以上）

    - id: REQ-003
      name: "アラート通知"
      priority: 必須
      description: |
        不良品検出時に音とライトで
        作業員に通知する

# 技術仕様
technical:
  ai_model:
    type: "CNN (畳み込みニューラルネットワーク)"
    framework: "PyTorch"
    accuracy: "95%以上"

  hardware:
    camera: "産業用ラインカメラ 4K"
    gpu: "NVIDIA RTX 4090"
    storage: "NVMe SSD 2TB"

  integration:
    - name: "既存MES連携"
      protocol: "REST API"
    - name: "PLCとの通信"
      protocol: "OPC UA"

# スケジュール
schedule:
  phases:
    - name: "PoC（実証実験）"
      duration: "1ヶ月"
      deliverables:
        - AIモデルのプロトタイプ
        - 精度検証レポート

    - name: "本開発"
      duration: "3ヶ月"
      deliverables:
        - 本番AIモデル
        - システム統合

    - name: "導入・調整"
      duration: "1ヶ月"
      deliverables:
        - 現場設置
        - オペレーター研修

# 予算
budget:
  total: "500万〜800万円"
  breakdown:
    - item: "AI開発"
      amount: "300万〜500万円"
    - item: "ハードウェア"
      amount: "100万〜150万円"
    - item: "導入・研修"
      amount: "100万〜150万円"`,
      explanation: 'このファイルはプロジェクト全体の設計図です。AIが理解しやすい形式（YAML）で書かれています。',
    },
    {
      id: 'file-2',
      name: 'api-design.yaml',
      path: '/specs/api-design.yaml',
      language: 'yaml',
      content: `# API設計書
# AI検査システムのAPI仕様

openapi: "3.0.0"
info:
  title: "AI外観検査API"
  version: "1.0.0"
  description: |
    製品画像を送信し、検査結果を取得する
    シンプルなAPIです

# エンドポイント一覧
paths:
  /api/inspect:
    post:
      summary: "画像検査を実行"
      description: |
        製品画像を送信すると、AIが検査して
        結果を返します
      requestBody:
        content:
          multipart/form-data:
            schema:
              type: object
              properties:
                image:
                  type: string
                  format: binary
                  description: "検査する製品画像"
                line_id:
                  type: string
                  description: "製造ラインID"
      responses:
        "200":
          description: "検査成功"
          content:
            application/json:
              schema:
                type: object
                properties:
                  result:
                    type: string
                    enum: [OK, NG]
                    description: "検査結果"
                  confidence:
                    type: number
                    description: "AIの確信度（0〜100%）"
                  defects:
                    type: array
                    description: "検出された不良"
                    items:
                      type: object
                      properties:
                        type:
                          type: string
                          description: "不良の種類"
                        location:
                          type: object
                          description: "位置座標"
              example:
                result: "NG"
                confidence: 98.5
                defects:
                  - type: "傷"
                    location: { x: 150, y: 200 }

  /api/stats:
    get:
      summary: "検査統計を取得"
      description: |
        指定期間の検査結果の統計情報を
        取得します
      parameters:
        - name: from
          in: query
          schema:
            type: string
            format: date
        - name: to
          in: query
          schema:
            type: string
            format: date
      responses:
        "200":
          description: "統計情報"
          content:
            application/json:
              schema:
                type: object
                properties:
                  total_inspections:
                    type: integer
                  ok_count:
                    type: integer
                  ng_count:
                    type: integer
                  ng_rate:
                    type: number`,
      explanation: 'これはAPIの設計書です。開発者がシステムを作る際の「設計図」として使います。',
    },
    {
      id: 'file-3',
      name: 'data-flow.md',
      path: '/docs/data-flow.md',
      language: 'markdown',
      content: `# データフロー図

## システム概要

\`\`\`
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  カメラ     │────▶│  AIサーバー │────▶│  管理画面   │
│ (画像取得)  │     │ (検査処理)  │     │ (結果表示)  │
└─────────────┘     └─────────────┘     └─────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │   PLC       │
                    │ (ライン制御)│
                    └─────────────┘
\`\`\`

## 処理の流れ

### 1. 画像取得（0.03秒）
- ラインカメラが製品を撮影
- 画像データをAIサーバーに送信

### 2. AI検査（0.5秒）
- 画像の前処理（リサイズ、正規化）
- AIモデルによる推論
- 不良箇所の特定

### 3. 結果出力（0.02秒）
- 検査結果をデータベースに保存
- NGの場合、PLCに停止信号を送信
- 管理画面にリアルタイム表示

## 1日のデータ量

| 項目 | 数量 |
|------|------|
| 検査回数 | 約86,400回/日 |
| 画像データ | 約500GB/日 |
| 保存期間 | 30日間 |
| 必要容量 | 約15TB |

## セキュリティ

- 工場内ネットワークのみで運用
- 外部アクセスは不可
- 画像データは暗号化して保存`,
      explanation: 'データの流れを図で示したドキュメントです。システムがどう動くかが一目でわかります。',
    },
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
  version: 1,
}

// コード解説データ
export const mockCodeExplanations = [
  {
    lineStart: 1,
    lineEnd: 5,
    explanation: 'プロジェクトの基本情報です。名前とバージョン、作成日が書かれています。',
    level: 'beginner' as const,
  },
  {
    lineStart: 7,
    lineEnd: 15,
    explanation: 'プロジェクトの目標です。「何を達成したいか」が明確に書かれています。これがないと、ベンダーに正確に伝わりません。',
    level: 'beginner' as const,
  },
  {
    lineStart: 17,
    lineEnd: 35,
    explanation: '機能要件です。「システムに何ができてほしいか」を具体的に書いています。優先度（必須/任意）も大切です。',
    level: 'beginner' as const,
  },
  {
    lineStart: 37,
    lineEnd: 55,
    explanation: '技術仕様です。AIの種類やハードウェアなど、技術的な詳細が書かれています。ベンダーが見積もりを出すのに必要な情報です。',
    level: 'intermediate' as const,
  },
]

// レガシー互換のため
export const mockFileTree: { id: string; name: string; type: string; path: string }[] = []
export const mockTasks = mockProgressSteps.map(step => ({
  id: step.id,
  title: step.label,
  status: step.status === 'active' ? 'in_progress' as const : step.status === 'completed' ? 'completed' as const : 'pending' as const,
  description: step.description,
}))
export const mockTerminalOutput: { id: string; type: string; content: string; timestamp: Date }[] = []
export const mockFileContents: Record<string, string> = {}
