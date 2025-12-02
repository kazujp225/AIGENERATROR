# AIAIO - AI発注OS

**「AI開発の発注OS」** - AI開発を発注するための仕様書・相場・ベンダーマップを標準化して握るプラットフォーム。

## ビジョン

「何を、どこに、いくらで頼めばいいか分からない」という情報非対称性を解消し、AI開発の民主化を実現する。

### 解決する社会課題

1. **開発費が高く、投資リスクが致命的** - 価格の妥当性を判断する基準がない
2. **DX/AI人材・リテラシーの欠如** - 社内にエンジニアがいない企業が大多数
3. **「何をやるべきか分からない」企画力の欠如** - PoC地獄の蔓延
4. **ベンダー情報の非対称性** - どこに頼めばいいか分からない
5. **レガシーシステム & 紙文化** - データの断絶
6. **DX疲れ** - 過去の失敗による学習性無力感

### 3つのコア機能（標準化）

| 機能 | 概要 | 価値 |
|------|------|------|
| **仕様の標準化** | アラジン方式による要件定義AI | 非エンジニアでも対話だけで要件を言語化 |
| **相場の標準化** | 業界×ユースケース×規模別の価格レンジ | 見積もりの妥当性を即座に判断 |
| **ベンダーの標準化** | 開発会社の実力・相性・信頼性の定量評価 | 最適なマッチングを実現 |

---

## 技術スタック

### フロントエンド
| 技術 | バージョン | 用途 |
|------|-----------|------|
| Next.js | 16.0.6 | App Router フレームワーク |
| React | 19.2.0 | UIライブラリ |
| TypeScript | 5.x | 型安全な開発 |
| Tailwind CSS | 4.x | ユーティリティファーストCSS |
| shadcn/ui (Radix UI) | - | アクセシブルなUIコンポーネント |
| Lucide React | 0.555.0 | アイコンライブラリ |
| react-resizable-panels | 3.0.6 | リサイザブルパネルレイアウト |

### 依存関係（Radix UI）
- `@radix-ui/react-accordion` - アコーディオン
- `@radix-ui/react-avatar` - アバター
- `@radix-ui/react-dialog` - ダイアログ/モーダル
- `@radix-ui/react-dropdown-menu` - ドロップダウンメニュー
- `@radix-ui/react-progress` - プログレスバー
- `@radix-ui/react-select` - セレクトボックス
- `@radix-ui/react-separator` - セパレーター
- `@radix-ui/react-slider` - スライダー
- `@radix-ui/react-tabs` - タブ

---

## プロジェクト構造

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # ルートレイアウト
│   ├── page.tsx                  # ホームページ
│   ├── globals.css               # グローバルスタイル
│   │
│   ├── (public)/                 # 公開ページ
│   │   ├── aladdin/              # 要件定義AI
│   │   │   ├── page.tsx          # イントロ
│   │   │   ├── start/            # セッション開始
│   │   │   ├── result/           # 結果表示
│   │   │   └── history/          # 履歴一覧
│   │   ├── market/               # 相場検索
│   │   ├── vendors/              # ベンダー一覧
│   │   │   ├── [id]/             # 詳細ページ
│   │   │   └── compare/          # 比較ページ
│   │   ├── cases/                # 導入事例
│   │   │   └── [id]/             # 詳細ページ
│   │   ├── ai-studio/            # AI Studio (IDE風UI)
│   │   ├── about/                # サービス紹介
│   │   ├── pricing/              # 料金プラン
│   │   ├── contact/              # お問い合わせ
│   │   ├── terms/                # 利用規約
│   │   ├── privacy/              # プライバシー
│   │   └── help/                 # ヘルプセンター
│   │
│   ├── (auth)/                   # 認証ページ
│   │   ├── login/                # ログイン
│   │   ├── register/             # 新規登録
│   │   └── onboarding/           # オンボーディング
│   │
│   ├── (dashboard)/              # 発注者ダッシュボード
│   │   └── dashboard/
│   │       ├── page.tsx          # メインダッシュボード
│   │       ├── projects/         # プロジェクト管理
│   │       ├── specs/            # 仕様書管理
│   │       │   └── [id]/         # 詳細・編集
│   │       └── settings/         # アカウント設定
│   │
│   └── (vendor)/                 # ベンダーポータル
│       └── vendor-portal/
│           ├── page.tsx          # ポータルホーム
│           ├── profile/          # プロフィール編集
│           ├── leads/            # リード管理
│           └── analytics/        # アナリティクス
│
├── components/
│   ├── ui/                       # shadcn/ui コンポーネント (15個)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── textarea.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── sheet.tsx
│   │   ├── tabs.tsx
│   │   ├── avatar.tsx
│   │   ├── accordion.tsx
│   │   ├── separator.tsx
│   │   ├── slider.tsx
│   │   └── progress.tsx
│   │
│   ├── layout/                   # レイアウトコンポーネント
│   │   ├── Header.tsx            # レスポンシブヘッダー
│   │   ├── Footer.tsx            # フッター
│   │   └── index.ts
│   │
│   └── ai-studio/                # AI Studio専用 (27コンポーネント)
│       ├── index.ts              # バレルエクスポート
│       ├── WelcomeScreen.tsx     # ウェルカム画面
│       ├── EnhancedChat.tsx      # AIチャットUI
│       ├── AladdinChat.tsx       # アラジン式対話
│       ├── ArtifactPanel.tsx     # 生成物管理
│       ├── CodeViewer.tsx        # コードビューア
│       ├── SyntaxHighlighter.tsx # シンタックスハイライト
│       ├── CostEstimator.tsx     # コスト見積もり
│       ├── VendorRecommendation.tsx # ベンダー推薦
│       ├── SpecPreview.tsx       # 仕様書プレビュー
│       ├── ProgressIndicator.tsx # 進捗表示
│       ├── GlossaryPanel.tsx     # 用語集
│       ├── SimilarCasesPanel.tsx # 類似事例
│       ├── HelpPanel.tsx         # ヘルプ
│       ├── ActivityBar.tsx       # サイドナビ
│       ├── FileExplorer.tsx      # ファイルツリー
│       ├── EditorTabs.tsx        # タブ管理
│       ├── Breadcrumb.tsx        # パンくず
│       ├── Minimap.tsx           # ミニマップ
│       ├── BottomPanel.tsx       # ボトムパネル
│       ├── TerminalPanel.tsx     # ターミナル
│       ├── TaskPanel.tsx         # タスク管理
│       ├── ProblemsPanel.tsx     # 問題一覧
│       ├── DebugPanel.tsx        # デバッグ
│       ├── SearchPanel.tsx       # 検索
│       ├── GitPanel.tsx          # Git操作
│       ├── AgentPanel.tsx        # エージェント
│       ├── ChatPanel.tsx         # チャット(レガシー)
│       └── CommandPalette.tsx    # コマンドパレット
│
├── types/                        # TypeScript型定義 (5ファイル)
│   ├── index.ts                  # バレルエクスポート
│   ├── vendor.ts                 # ベンダー型
│   ├── case.ts                   # 事例型
│   ├── market.ts                 # 相場型
│   ├── aladdin.ts                # アラジン型
│   └── ai-studio.ts              # AI Studio型
│
├── mocks/                        # モックデータ (7ファイル)
│   ├── index.ts                  # バレルエクスポート
│   ├── vendors.ts                # ベンダーデータ (6社)
│   ├── cases.ts                  # 事例データ
│   ├── market.ts                 # 相場データ
│   ├── aladdin.ts                # アラジンデータ
│   ├── specs.ts                  # 仕様書データ
│   ├── projects.ts               # プロジェクトデータ
│   └── ai-studio.ts              # AI Studioデータ
│
└── lib/                          # ユーティリティ
    └── utils.ts                  # clsx/tailwind-merge
```

---

## 構築済みUI一覧

### 総計
- **29ページ** + **42コンポーネント**（UI 15 + AI Studio 27）

### 公開ページ（17ページ）

| カテゴリ | ページ | パス | 説明 |
|---------|--------|------|------|
| コア | ホーム | `/` | ヒーロー、価値提案、利用の流れ、実績、相場検索、事例、ベンダー、FAQ、CTA |
| アラジン | イントロ | `/aladdin` | AI要件定義ツールの説明 |
| | 開始 | `/aladdin/start` | ヒアリングセッション |
| | 結果 | `/aladdin/result` | 仕様書・相場・推奨ベンダー表示 |
| | 履歴 | `/aladdin/history` | 過去のセッション一覧 |
| 相場 | 検索 | `/market` | 業界×ユースケース別相場検索 |
| ベンダー | 一覧 | `/vendors` | フィルター・ソート付き一覧 |
| | 詳細 | `/vendors/[id]` | プロファイル・実績・評価 |
| | 比較 | `/vendors/compare` | 最大4社の横並び比較 |
| 事例 | 一覧 | `/cases` | 業界・ユースケース別フィルター |
| | 詳細 | `/cases/[id]` | 課題・解決策・成果・学び |
| AI Studio | メイン | `/ai-studio` | VSCode風IDE UI（後述） |
| インフォ | About | `/about` | サービス紹介 |
| | 料金 | `/pricing` | 料金プラン |
| | お問い合わせ | `/contact` | フォーム |
| | 利用規約 | `/terms` | 利用規約 |
| | プライバシー | `/privacy` | プライバシーポリシー |
| | ヘルプ | `/help` | FAQ・ガイド |

### 認証ページ（3ページ）

| ページ | パス | 説明 |
|--------|------|------|
| ログイン | `/login` | メール/パスワード、ソーシャルログイン |
| 新規登録 | `/register` | 発注者/ベンダー種別選択 |
| オンボーディング | `/onboarding` | 初期設定ウィザード |

### 発注者ダッシュボード（5ページ）

| ページ | パス | 説明 |
|--------|------|------|
| ダッシュボード | `/dashboard` | サマリー、アクティビティ、クイックアクション |
| プロジェクト | `/dashboard/projects` | 進行中プロジェクト管理 |
| 仕様書一覧 | `/dashboard/specs` | 作成した仕様書一覧 |
| 仕様書詳細 | `/dashboard/specs/[id]` | 編集・PDF出力 |
| 設定 | `/dashboard/settings` | アカウント設定 |

### ベンダーポータル（4ページ）

| ページ | パス | 説明 |
|--------|------|------|
| ポータルホーム | `/vendor-portal` | サマリー、新着リード、通知 |
| プロフィール | `/vendor-portal/profile` | 企業情報・スキル編集 |
| リード管理 | `/vendor-portal/leads` | 問い合わせ・見積もり管理 |
| アナリティクス | `/vendor-portal/analytics` | 閲覧数・成約率分析 |

---

## AI Studio 詳細

VSCode/Claude Code風の初心者向けAI発注支援ツール。

### 機能
- **対話型要件定義** - アラジン方式の質問でヒアリング
- **リアルタイム見積もり** - 回答に応じて相場を自動計算
- **仕様書自動生成** - 標準フォーマットの仕様書をリアルタイム生成
- **ベンダー推薦** - 要件にマッチするベンダーを提案
- **用語集** - IT専門用語を初心者向けに解説

### UI構成
```
┌─────────────────────────────────────────────────────────────┐
│ Header: ロゴ / 進捗バー / 用語集 / リセット / 共有          │
├──────────────────────┬──────────────────────────────────────┤
│                      │ Tab: 生成物 | 見積もり | ベンダー    │
│   EnhancedChat       ├──────────────────────────────────────┤
│   (アラジン対話)      │                                      │
│                      │   ArtifactPanel / CostEstimator /   │
│   質問カード          │   VendorRecommendation              │
│   選択肢ボタン        │                                      │
│   テキスト入力        │   SimilarCasesPanel                 │
│                      │   HelpPanel                         │
├──────────────────────┴──────────────────────────────────────┤
│ GlossaryPanel (モーダル)                                     │
└─────────────────────────────────────────────────────────────┘
```

### コンポーネント一覧（27個）

| カテゴリ | コンポーネント | 説明 |
|---------|---------------|------|
| エントリー | WelcomeScreen | 初回表示、開始ボタン |
| チャット | EnhancedChat | メインの対話UI |
| | AladdinChat | アラジン式質問カード |
| | ChatPanel | レガシーチャット |
| 生成物 | ArtifactPanel | 仕様書・コード表示 |
| | CodeViewer | コードビューア |
| | SyntaxHighlighter | シンタックスハイライト |
| | SpecPreview | 仕様書プレビュー |
| 見積もり | CostEstimator | コスト見積もり表示 |
| | SimilarCasesPanel | 類似事例表示 |
| ベンダー | VendorRecommendation | 推薦ベンダー表示 |
| サポート | GlossaryPanel | 用語集モーダル |
| | HelpPanel | ヘルプトピック |
| | ProgressIndicator | 進捗表示 |
| IDE風 | ActivityBar | サイドナビ |
| | FileExplorer | ファイルツリー |
| | EditorTabs | タブ管理 |
| | Breadcrumb | パンくず |
| | Minimap | ミニマップ |
| | BottomPanel | ボトムパネル |
| | TerminalPanel | ターミナル |
| | TaskPanel | タスク管理 |
| | ProblemsPanel | 問題一覧 |
| | DebugPanel | デバッグ |
| | SearchPanel | 検索 |
| | GitPanel | Git操作 |
| | AgentPanel | エージェント |
| | CommandPalette | コマンドパレット |

---

## 型定義

### Vendor型 (`types/vendor.ts`)
```typescript
type Vendor = {
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
  techStack: TechStack  // LLM/画像認識/時系列/最適化の5段階評価
  priceRange: PriceRange
  metrics: VendorMetrics  // 納期遵守率/品質/リピート率/レス時間
  availableFrom: string
  monthlyCapacity: number
  certifications: string[]
  featured: boolean
}
```

### AI Studio型 (`types/ai-studio.ts`)
- `AladdinQuestion` - アラジン式質問
- `Message` - チャットメッセージ
- `CostEstimate` - コスト見積もり
- `SpecDocument` - 仕様書
- `VendorMatch` - マッチしたベンダー
- `GlossaryTerm` - 用語集
- `SimilarCase` - 類似事例
- `Artifact` - 生成物（仕様書/図/コード）
- `Session` - セッション状態

---

## モックデータ

### ベンダー（6社）
1. **AIソリューションズ** - 製造業特化、画像認識・LLM
2. **データサイエンス** - 金融特化、時系列・最適化
3. **スマートAI** - 中小企業向け低価格、チャットボット・RAG
4. **ビジョンAIラボ** - 画像認識専門、外観検査・物体検出
5. **クラウドAI** - フルリモート、アジャイル開発
6. **医療AIソリューションズ** - 医療特化、画像診断・電子カルテ

### 評価指標
- 納期遵守率: 88〜98%
- 品質スコア: 4.0〜4.9
- リピート率: 55〜85%
- 平均レス時間: 1.8〜5.0時間

---

## 開発環境

### セットアップ
```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build

# Lint
npm run lint
```

### アクセス
- 開発: http://localhost:3000
- AI Studio: http://localhost:3000/ai-studio

---

## 開発フェーズ

```
[完了] Phase 0: モック開発
       ├── 全29ページのUI実装
       ├── 42コンポーネントの構築
       ├── 型定義・モックデータ整備
       └── レスポンシブ対応
       ↓
[次回] Phase 1: 認証・基本機能
       ├── Supabase Auth連携
       ├── ユーザー管理
       └── 基本的なCRUD
       ↓
Phase 2: アラジン（要件定義AI）
       ├── OpenAI/Claude API連携
       ├── 対話ロジック実装
       └── 仕様書生成機能
       ↓
Phase 3: 相場エンジン
       ├── 相場データベース構築
       ├── 類似案件検索
       └── 価格推定ロジック
       ↓
Phase 4: ベンダーマッチング
       ├── マッチングアルゴリズム
       ├── スコアリングロジック
       └── 問い合わせ機能
       ↓
Phase 5: ダッシュボード連携
       ├── プロジェクト管理
       ├── 仕様書編集・共有
       └── 通知機能
       ↓
Phase 6: 本番リリース
```

---

## ドキュメント

| ファイル | 内容 |
|---------|------|
| `CONCEPT.md` | プラットフォームコンセプト・ビジネスモデル |
| `page.md` | ページ設計・UI仕様 |
| `plan.md` | 開発計画・意思決定の経緯 |
| `CLAUDE.md` | Claude Code開発ルール |

---

## コミットルール

```
feat: 新機能追加
fix: バグ修正
docs: ドキュメント
style: フォーマット
refactor: リファクタリング
test: テスト
chore: ビルド・設定
```

---

## ライセンス

Private - All Rights Reserved

---

*AIAIO - AI開発を、もっとシンプルに。*
