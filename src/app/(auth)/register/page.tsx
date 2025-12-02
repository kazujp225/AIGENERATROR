'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Mail, Lock, User, Building2, Chrome } from 'lucide-react'

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [userType, setUserType] = useState<'client' | 'vendor' | null>(null)
  const [formData, setFormData] = useState({
    companyName: '',
    name: '',
    email: '',
    password: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // モック: 登録処理
    alert('登録機能はモック段階です')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-xl">
              A
            </div>
            <span className="text-2xl font-bold text-gray-900">AIAIO</span>
          </Link>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">
              {step === 1 ? 'アカウントタイプを選択' : '新規登録'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {step === 1 ? (
              <div className="space-y-4">
                <button
                  onClick={() => {
                    setUserType('client')
                    setStep(2)
                  }}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-colors ${
                    userType === 'client'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold">AI開発を発注したい</div>
                      <div className="text-sm text-gray-500">
                        仕様書作成・ベンダー選定をしたい方
                      </div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setUserType('vendor')
                    setStep(2)
                  }}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-colors ${
                    userType === 'vendor'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                      <Building2 className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-semibold">AI開発会社として登録したい</div>
                      <div className="text-sm text-gray-500">
                        案件を獲得したい開発会社の方
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {userType === 'vendor' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      会社名
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="株式会社〇〇"
                        value={formData.companyName}
                        onChange={(e) =>
                          setFormData({ ...formData, companyName: e.target.value })
                        }
                        className="pl-10"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {userType === 'vendor' ? '担当者名' : 'お名前'}
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="山田 太郎"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    メールアドレス
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="email@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    パスワード
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="password"
                      placeholder="8文字以上"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                  >
                    戻る
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    登録する
                  </Button>
                </div>
              </form>
            )}

            {step === 2 && (
              <>
                <div className="relative my-6">
                  <Separator />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-gray-500">
                    または
                  </span>
                </div>

                <div className="space-y-3">
                  <Button variant="outline" className="w-full">
                    <Chrome className="mr-2 h-4 w-4" />
                    Googleで登録
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <p className="text-center mt-6 text-gray-600">
          すでにアカウントをお持ちの方は{' '}
          <Link href="/login" className="text-blue-600 hover:underline font-medium">
            ログイン
          </Link>
        </p>
      </div>
    </div>
  )
}
