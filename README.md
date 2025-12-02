# AIAIO - AI発注OS

「AI開発の発注OS」- AI開発を発注するための仕様書・相場・ベンダーマップを標準化して握るプラットフォーム。

## コンセプト

「何を、どこに、いくらで頼めばいいか分からない」という情報非対称性を解消し、AI開発の民主化を実現します。

### 3つのコア機能

1. **仕様の標準化** - アラジン方式による要件定義AI
2. **相場の標準化** - 業界×ユースケース×規模別の価格レンジ
3. **ベンダーの標準化** - 開発会社の実力・相性・信頼性の定量評価

## 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **UIコンポーネント**: shadcn/ui
- **アイコン**: Lucide React

## 構築済みUI（モックフェーズ）

### 公開ページ（11ページ）

| ページ | パス | 説明 |
|--------|------|------|
| ホーム | `/` | ランディングページ（ヒーロー、機能紹介、CTA） |
| アラジン（要件定義AI） | `/aladdin` | AI要件定義ツールのイントロ |
| アラジン開始 | `/aladdin/start` | 要件定義セッション開始 |
| アラジン結果 | `/aladdin/result` | 生成された仕様書の表示 |
| アラジン履歴 | `/aladdin/history` | 過去のセッション履歴 |
| 相場検索 | `/market` | 業界・ユースケース別の相場検索 |
| ベンダー一覧 | `/vendors` | AI開発会社の一覧・フィルター |
| ベンダー詳細 | `/vendors/[id]` | 個別ベンダーの詳細情報 |
| ベンダー比較 | `/vendors/compare` | 複数ベンダーの比較表示 |
| 事例一覧 | `/cases` | 導入事例の一覧 |
| 事例詳細 | `/cases/[id]` | 個別事例の詳細 |

### AI Studio（VSCodeライクUI）

| ページ | パス | 説明 |
|--------|------|------|
| AI Studio | `/ai-studio` | 初心者向けAI発注支援ツール（IDE風UI） |

**AI Studio コンポーネント:**
- ActivityBar（サイドナビゲーション）
- FileExplorer（ファイルツリー）
- EditorTabs（タブ管理）
- CodeViewer（コードビューア）
- Minimap（ミニマップ）
- Breadcrumb（パンくずリスト）
- AladdinChat（AI対話パネル）
- EnhancedChat（強化版チャット）
- TerminalPanel（ターミナル風出力）
- TaskPanel（タスク管理）
- ProblemsPanel（問題一覧）
- DebugPanel（デバッグパネル）
- SearchPanel（検索パネル）
- GitPanel（Git操作パネル）
- AgentPanel（エージェント管理）
- CommandPalette（コマンドパレット）
- SpecPreview（仕様書プレビュー）
- CostEstimator（コスト見積もり）
- VendorRecommendation（ベンダー推薦）
- GlossaryPanel（用語集）
- SimilarCasesPanel（類似事例）
- HelpPanel（ヘルプ）
- ArtifactPanel（成果物管理）
- ProgressIndicator（進捗表示）
- WelcomeScreen（ウェルカム画面）
- BottomPanel（ボトムパネル）
- SyntaxHighlighter（シンタックスハイライト）

### インフォメーションページ（6ページ）

| ページ | パス | 説明 |
|--------|------|------|
| About | `/about` | サービス紹介 |
| 料金 | `/pricing` | 料金プラン |
| お問い合わせ | `/contact` | 問い合わせフォーム |
| 利用規約 | `/terms` | 利用規約 |
| プライバシー | `/privacy` | プライバシーポリシー |
| ヘルプ | `/help` | ヘルプセンター |

### 認証ページ（3ページ）

| ページ | パス | 説明 |
|--------|------|------|
| ログイン | `/login` | ログインフォーム |
| 新規登録 | `/register` | 会員登録フォーム |
| オンボーディング | `/onboarding` | 初期設定ウィザード |

### 発注者ダッシュボード（4ページ）

| ページ | パス | 説明 |
|--------|------|------|
| ダッシュボード | `/dashboard` | メインダッシュボード |
| プロジェクト | `/dashboard/projects` | プロジェクト管理 |
| 仕様書一覧 | `/dashboard/specs` | 作成した仕様書の一覧 |
| 仕様書詳細 | `/dashboard/specs/[id]` | 仕様書の詳細・編集 |
| 設定 | `/dashboard/settings` | アカウント設定 |

### ベンダーポータル（4ページ）

| ページ | パス | 説明 |
|--------|------|------|
| ポータルホーム | `/vendor-portal` | ベンダー向けダッシュボード |
| プロフィール | `/vendor-portal/profile` | 企業プロフィール編集 |
| リード管理 | `/vendor-portal/leads` | 問い合わせ・リード管理 |
| アナリティクス | `/vendor-portal/analytics` | アクセス解析・統計 |

### 共通コンポーネント

**UIコンポーネント（shadcn/ui）:**
- Button, Card, Badge, Input, Select
- Textarea, Dialog, DropdownMenu, Sheet
- Tabs, Avatar, Accordion, Separator
- Slider, Progress

**レイアウト:**
- Header（レスポンシブナビゲーション）
- Footer（フッター）

## 開発環境のセットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

[http://localhost:3000](http://localhost:3000) でアクセス可能です。

## ディレクトリ構成

```
src/
├── app/                      # Next.js App Router
│   ├── (public)/             # 公開ページ
│   ├── (auth)/               # 認証ページ
│   ├── (dashboard)/          # 発注者ダッシュボード
│   └── (vendor)/             # ベンダーポータル
├── components/
│   ├── ui/                   # shadcn/ui コンポーネント
│   ├── layout/               # レイアウトコンポーネント
│   └── ai-studio/            # AI Studio専用コンポーネント
├── lib/                      # ユーティリティ
├── mocks/                    # モックデータ
└── types/                    # TypeScript型定義
```

## 開発フェーズ

```
[完了] Phase 0: モック開発 - UIの完成形を実装
       ↓
[次回] Phase 1: 認証・基本機能
       ↓
Phase 2: アラジン（要件定義AI）
       ↓
Phase 3: 相場エンジン
       ↓
Phase 4: ベンダーマッチング
       ↓
Phase 5: ダッシュボード連携
       ↓
Phase 6: 本番リリース
```

## ドキュメント

- `docs/CONCEPT.md` - プラットフォームのコンセプト
- `docs/page.md` - ページ構成・UI設計
- `docs/plan.md` - 開発計画・意思決定の経緯
- `CLAUDE.md` - Claude Code開発ルール

## ライセンス

Private - All Rights Reserved
