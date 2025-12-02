'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  ArrowLeft,
  User,
  Building2,
  Bell,
  Lock,
  Mail,
  Phone,
  Save,
} from 'lucide-react'

export default function SettingsPage() {
  const [profileData, setProfileData] = useState({
    name: '山田 太郎',
    email: 'yamada@example.com',
    phone: '03-1234-5678',
    company: '株式会社サンプル',
    department: 'DX推進部',
    position: '部長',
  })

  const [notifications, setNotifications] = useState({
    email: true,
    browser: true,
    vendorMessage: true,
    projectUpdate: true,
    marketing: false,
  })

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            ダッシュボードに戻る
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">設定</h1>
          <p className="text-gray-600">アカウント情報や通知設定を管理できます</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              プロフィール
            </TabsTrigger>
            <TabsTrigger value="company" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              会社情報
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              通知設定
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              セキュリティ
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>プロフィール設定</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-600">
                    山
                  </div>
                  <div>
                    <Button variant="outline" size="sm">
                      画像を変更
                    </Button>
                    <p className="text-xs text-gray-500 mt-1">
                      JPG, PNG (最大2MB)
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      お名前
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        value={profileData.name}
                        onChange={(e) =>
                          setProfileData({ ...profileData, name: e.target.value })
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
                        value={profileData.email}
                        onChange={(e) =>
                          setProfileData({ ...profileData, email: e.target.value })
                        }
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      電話番号
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) =>
                          setProfileData({ ...profileData, phone: e.target.value })
                        }
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Save className="mr-2 h-4 w-4" />
                    保存する
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Company Tab */}
          <TabsContent value="company">
            <Card>
              <CardHeader>
                <CardTitle>会社情報</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      会社名
                    </label>
                    <Input
                      value={profileData.company}
                      onChange={(e) =>
                        setProfileData({ ...profileData, company: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      部署
                    </label>
                    <Input
                      value={profileData.department}
                      onChange={(e) =>
                        setProfileData({ ...profileData, department: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      役職
                    </label>
                    <Input
                      value={profileData.position}
                      onChange={(e) =>
                        setProfileData({ ...profileData, position: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Save className="mr-2 h-4 w-4" />
                    保存する
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>通知設定</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">メール通知</div>
                      <div className="text-sm text-gray-500">
                        重要なお知らせをメールで受け取ります
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifications.email}
                      onChange={(e) =>
                        setNotifications({ ...notifications, email: e.target.checked })
                      }
                      className="h-5 w-5 rounded border-gray-300"
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">ブラウザ通知</div>
                      <div className="text-sm text-gray-500">
                        ブラウザでプッシュ通知を受け取ります
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifications.browser}
                      onChange={(e) =>
                        setNotifications({ ...notifications, browser: e.target.checked })
                      }
                      className="h-5 w-5 rounded border-gray-300"
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">ベンダーからのメッセージ</div>
                      <div className="text-sm text-gray-500">
                        ベンダーからメッセージが届いた時に通知
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifications.vendorMessage}
                      onChange={(e) =>
                        setNotifications({ ...notifications, vendorMessage: e.target.checked })
                      }
                      className="h-5 w-5 rounded border-gray-300"
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">プロジェクト更新</div>
                      <div className="text-sm text-gray-500">
                        プロジェクトの進捗更新時に通知
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifications.projectUpdate}
                      onChange={(e) =>
                        setNotifications({ ...notifications, projectUpdate: e.target.checked })
                      }
                      className="h-5 w-5 rounded border-gray-300"
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">マーケティング情報</div>
                      <div className="text-sm text-gray-500">
                        新機能やキャンペーン情報を受け取ります
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifications.marketing}
                      onChange={(e) =>
                        setNotifications({ ...notifications, marketing: e.target.checked })
                      }
                      className="h-5 w-5 rounded border-gray-300"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Save className="mr-2 h-4 w-4" />
                    保存する
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>セキュリティ設定</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium mb-4">パスワード変更</h4>
                  <div className="space-y-4 max-w-md">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        現在のパスワード
                      </label>
                      <Input type="password" placeholder="••••••••" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        新しいパスワード
                      </label>
                      <Input type="password" placeholder="••••••••" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        新しいパスワード（確認）
                      </label>
                      <Input type="password" placeholder="••••••••" />
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      パスワードを変更
                    </Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-4">二要素認証</h4>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg max-w-md">
                    <div>
                      <div className="font-medium">二要素認証</div>
                      <div className="text-sm text-gray-500">
                        アカウントのセキュリティを強化します
                      </div>
                    </div>
                    <Button variant="outline">設定する</Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-4 text-red-600">危険な操作</h4>
                  <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg max-w-md">
                    <div>
                      <div className="font-medium text-red-900">アカウント削除</div>
                      <div className="text-sm text-red-700">
                        アカウントと関連データを完全に削除します
                      </div>
                    </div>
                    <Button variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-100">
                      削除する
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
