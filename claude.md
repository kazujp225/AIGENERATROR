# AIAIO プロジェクト Claude Code ルール

## 最重要ルール

**以下のドキュメントを第一ルールとして常に参照し、これに反する実装は行わないこと。**

1. **CONCEPT.md** - プラットフォームのコンセプト・思想・ビジネスロジックの定義
2. **page.md** - ページ構成・UI設計・ナビゲーションの定義
3. **plan.md** - 背景となる議論・意思決定の経緯

実装に迷った場合は、必ずこれらのドキュメントを確認し、コンセプトに沿った判断を行う。

---

## プロジェクト概要

### AIAIOとは

「AI開発の発注OS」- AI開発を発注するための仕様書・相場・ベンダーマップを標準化して握るプラットフォーム。

### 解決する本質的課題

「何を、どこに、いくらで頼めばいいか分からない」という情報非対称性の解消。

### コア機能（3つの標準化）

1. **仕様の標準化** - アラジン方式による要件定義AI
2. **相場の標準化** - 業界×ユースケース×規模別の価格レンジ
3. **ベンダーの標準化** - 開発会社の実力・相性・信頼性の定量評価

---

## 技術スタック

### フロントエンド
- **フレームワーク**: Next.js 14+ (App Router)
- **言語**: TypeScript（厳格モード）
- **スタイリング**: Tailwind CSS
- **UIコンポーネント**: shadcn/ui
- **状態管理**: Zustand（グローバル）, React Hook Form（フォーム）
- **データフェッチ**: TanStack Query (React Query)

### バックエンド
- **フレームワーク**: Next.js API Routes / Server Actions
- **データベース**: Supabase (PostgreSQL)
- **認証**: Supabase Auth
- **ストレージ**: Supabase Storage
- **AI**: OpenAI API / Claude API

### インフラ
- **ホスティング**: Vercel
- **ドメイン**: 未定

---

## ディレクトリ構成

```
/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (public)/           # 公開ページグループ
│   │   │   ├── page.tsx        # ホーム
│   │   │   ├── aladdin/        # 要件定義AI
│   │   │   ├── market/         # 相場検索
│   │   │   ├── vendors/        # ベンダー一覧
│   │   │   └── cases/          # 導入事例
│   │   ├── (auth)/             # 認証ページグループ
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── onboarding/
│   │   ├── (dashboard)/        # 発注者ダッシュボード
│   │   │   └── dashboard/
│   │   ├── (vendor)/           # ベンダーポータル
│   │   │   └── vendor-portal/
│   │   ├── api/                # API Routes
│   │   └── layout.tsx          # ルートレイアウト
│   │
│   ├── components/             # コンポーネント
│   │   ├── ui/                 # shadcn/ui ベース
│   │   ├── layout/             # レイアウト系
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── features/           # 機能別コンポーネント
│   │   │   ├── aladdin/        # 要件定義AI関連
│   │   │   ├── market/         # 相場検索関連
│   │   │   ├── vendors/        # ベンダー関連
│   │   │   └── cases/          # 事例関連
│   │   └── shared/             # 共通コンポーネント
│   │
│   ├── lib/                    # ユーティリティ
│   │   ├── supabase/           # Supabase クライアント
│   │   ├── api/                # API クライアント
│   │   └── utils/              # ヘルパー関数
│   │
│   ├── hooks/                  # カスタムフック
│   ├── stores/                 # Zustand ストア
│   ├── types/                  # TypeScript 型定義
│   └── constants/              # 定数定義
│
├── public/                     # 静的ファイル
├── docs/                       # ドキュメント（MD ファイル）
│   ├── CONCEPT.md
│   ├── page.md
│   └── plan.md
│
└── supabase/                   # Supabase 設定
    ├── migrations/             # マイグレーション
    └── seed.sql                # シードデータ
```

---

## 開発フェーズ

### 現在のフェーズ: モック開発

**目標**: 本番を想定したUI/UXの完成形を視覚的に確認できる状態

**モック開発のルール**:
1. すべてのページの見た目を実装する
2. データは静的なモックデータを使用
3. インタラクション（ボタンクリック、フォーム送信）は動作させる
4. API連携・認証は後回し（スタブで代替）
5. レスポンシブ対応は必須

### フェーズ進行

```
[現在] Phase 0: モック開発
        ↓
Phase 1: 認証・基本機能
        ↓
Phase 2: アラジン（要件定義AI）
        ↓
Phase 3: 相場エンジン
        ↓
Phase 4: ベンダーマッチング
        ↓
Phase 5: ダッシュボード
        ↓
Phase 6: 本番リリース
```

---

## コーディング規約

### TypeScript

```typescript
// 型定義は types/ ディレクトリに配置
// インターフェースには I プレフィックスをつけない
// 型エイリアスを優先

// Good
type Vendor = {
  id: string
  name: string
  rating: number
}

// Bad
interface IVendor {
  id: string
  name: string
  rating: number
}
```

### コンポーネント

```typescript
// 関数コンポーネントを使用
// Props は type で定義
// デフォルトエクスポートを使用

type ButtonProps = {
  variant: 'primary' | 'secondary'
  children: React.ReactNode
  onClick?: () => void
}

export default function Button({ variant, children, onClick }: ButtonProps) {
  return (
    <button onClick={onClick} className={...}>
      {children}
    </button>
  )
}
```

### ファイル命名

| 種類 | 命名規則 | 例 |
|-----|---------|-----|
| コンポーネント | PascalCase | `VendorCard.tsx` |
| フック | camelCase + use prefix | `useVendors.ts` |
| ユーティリティ | camelCase | `formatPrice.ts` |
| 型定義 | camelCase | `vendor.ts` |
| 定数 | UPPER_SNAKE_CASE | `API_ENDPOINTS.ts` |

### インポート順序

```typescript
// 1. React/Next.js
import { useState } from 'react'
import Link from 'next/link'

// 2. 外部ライブラリ
import { useQuery } from '@tanstack/react-query'

// 3. 内部モジュール（絶対パス）
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'

// 4. 型定義
import type { Vendor } from '@/types/vendor'

// 5. 相対パス
import { formatPrice } from './utils'
```

---

## UI/デザインルール

### カラーパレット（Tailwind設定）

```javascript
// tailwind.config.js で設定
colors: {
  primary: {
    DEFAULT: '#2563EB',  // blue-600
    hover: '#1D4ED8',    // blue-700
    light: '#DBEAFE',    // blue-100
  },
  secondary: {
    DEFAULT: '#10B981',  // emerald-500
    hover: '#059669',    // emerald-600
  },
  warning: '#F59E0B',    // amber-500
  error: '#EF4444',      // red-500
  background: '#F9FAFB', // gray-50
  text: {
    primary: '#111827',  // gray-900
    secondary: '#6B7280', // gray-500
  }
}
```

### スペーシング

- セクション間: `py-16` (64px) または `py-24` (96px)
- コンポーネント間: `space-y-4` (16px) または `space-y-6` (24px)
- 要素間: `gap-2` (8px) または `gap-4` (16px)

### レスポンシブ

```typescript
// モバイルファースト
// ブレークポイント: sm(640px), md(768px), lg(1024px), xl(1280px)

<div className="
  grid grid-cols-1      // モバイル: 1列
  md:grid-cols-2        // タブレット: 2列
  lg:grid-cols-3        // デスクトップ: 3列
  gap-6
">
```

---

## モックデータ

### 配置場所

```
src/
├── mocks/
│   ├── vendors.ts      # ベンダーモックデータ
│   ├── cases.ts        # 事例モックデータ
│   ├── market.ts       # 相場モックデータ
│   └── user.ts         # ユーザーモックデータ
```

### データ構造例

```typescript
// src/mocks/vendors.ts
export const mockVendors: Vendor[] = [
  {
    id: 'v1',
    name: '株式会社AIソリューションズ',
    logo: '/mock/vendors/ai-solutions.png',
    rating: 4.5,
    reviewCount: 32,
    location: '東京都渋谷区',
    employeeCount: 25,
    industries: ['製造業', '小売業', '金融'],
    techStack: {
      llm: 5,
      imageRecognition: 4,
      timeSeries: 3,
      optimization: 2,
    },
    priceRange: {
      min: 1500000,
      max: 8000000,
    },
    metrics: {
      onTimeDeliveryRate: 0.94,
      qualityScore: 4.3,
      repeatRate: 0.67,
      avgResponseTime: 2.3, // hours
    },
  },
  // ...
]
```

---

## ページ実装優先順位

### Phase 0 (モック) での実装順序

1. **共通レイアウト** - Header, Footer, 基本レイアウト
2. **ホームページ** - 全セクション
3. **ベンダー一覧/詳細** - 静的表示
4. **相場検索** - フィルター + 結果表示
5. **要件定義AI（アラジン）** - チャットUI
6. **事例一覧/詳細** - 静的表示
7. **認証画面** - ログイン/登録フォーム（動作なし）
8. **ダッシュボード** - レイアウトのみ

---

## コミットメッセージ

```
feat: 新機能追加
fix: バグ修正
docs: ドキュメント
style: フォーマット（コード変更なし）
refactor: リファクタリング
test: テスト
chore: ビルド・設定変更
```

例:
```
feat: ベンダー一覧ページのモック実装
fix: ヘッダーのモバイルメニュー表示崩れ
docs: page.md にベンダー詳細ページを追加
```

---

## 禁止事項

1. **CONCEPT.mdに反する機能の実装**
   - 例: 「1円開発」「激安」などの価格訴求

2. **page.mdにないページの勝手な追加**
   - 新規ページが必要な場合は、まずpage.mdを更新

3. **過度な抽象化・複雑化**
   - モック段階では動くことを優先

4. **any型の使用**
   - 必ず適切な型を定義

5. **console.log の残存**
   - デバッグ後は必ず削除

6. **ハードコードされた日本語以外の言語**
   - UIは日本語で統一

---

## よくある実装パターン

### ページコンポーネント

```typescript
// src/app/(public)/vendors/page.tsx
import { VendorList } from '@/components/features/vendors/VendorList'
import { VendorFilters } from '@/components/features/vendors/VendorFilters'
import { mockVendors } from '@/mocks/vendors'

export default function VendorsPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">AI開発会社を探す</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <VendorFilters />
        </aside>

        <section className="lg:col-span-3">
          <VendorList vendors={mockVendors} />
        </section>
      </div>
    </main>
  )
}
```

### カード型コンポーネント

```typescript
// src/components/features/vendors/VendorCard.tsx
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star } from 'lucide-react'
import type { Vendor } from '@/types/vendor'

type VendorCardProps = {
  vendor: Vendor
}

export function VendorCard({ vendor }: VendorCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center gap-4">
        <img
          src={vendor.logo}
          alt={vendor.name}
          className="w-12 h-12 rounded"
        />
        <div>
          <h3 className="font-semibold">{vendor.name}</h3>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{vendor.rating}</span>
            <span>({vendor.reviewCount}件)</span>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap gap-2">
          {vendor.industries.map((industry) => (
            <Badge key={industry} variant="secondary">
              {industry}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
```

---

## チェックリスト

### 新規ページ追加時

- [ ] page.md に定義があるか確認
- [ ] ディレクトリ構成に従っているか
- [ ] レスポンシブ対応しているか
- [ ] モックデータを使用しているか
- [ ] TypeScript型が定義されているか

### コンポーネント作成時

- [ ] 適切なディレクトリに配置
- [ ] Props の型定義
- [ ] Tailwind CSS でスタイリング
- [ ] アクセシビリティ考慮（alt, aria-label等）

### プルリクエスト前

- [ ] `npm run build` が通るか
- [ ] `npm run lint` がエラーなし
- [ ] 不要なconsole.logがないか
- [ ] CONCEPT.md/page.md に沿っているか

---

## 連絡事項

### 不明点がある場合

1. まずCONCEPT.md、page.mdを確認
2. plan.mdで意思決定の経緯を確認
3. それでも不明な場合は、実装前に確認を求める

### ドキュメント更新

- 機能追加時は、必要に応じてpage.mdも更新
- 大きな方針変更がある場合は、CONCEPT.mdの更新を検討

---

*このルールは、AIAIOプロジェクトの開発における指針です。本番リリースに向けて進化していきます。*
