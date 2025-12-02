'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Mail, Building2, MessageSquare, Send } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    type: '',
    companyName: '',
    name: '',
    email: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('お問い合わせを受け付けました。担当者より折り返しご連絡いたします。')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">お問い合わせ</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            AIAIOに関するご質問・ご相談はこちらからお問い合わせください。
            通常1〜2営業日以内にご返信いたします。
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>お問い合わせフォーム</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        お問い合わせ種別 <span className="text-red-500">*</span>
                      </label>
                      <Select
                        value={formData.type}
                        onValueChange={(value) =>
                          setFormData({ ...formData, type: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="選択してください" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="service">サービスについて</SelectItem>
                          <SelectItem value="pricing">料金について</SelectItem>
                          <SelectItem value="vendor">ベンダー登録について</SelectItem>
                          <SelectItem value="partnership">提携について</SelectItem>
                          <SelectItem value="other">その他</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        会社名
                      </label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          value={formData.companyName}
                          onChange={(e) =>
                            setFormData({ ...formData, companyName: e.target.value })
                          }
                          placeholder="株式会社〇〇"
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        お名前 <span className="text-red-500">*</span>
                      </label>
                      <Input
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="山田 太郎"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        メールアドレス <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          placeholder="email@example.com"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        お問い合わせ内容 <span className="text-red-500">*</span>
                      </label>
                      <Textarea
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        placeholder="お問い合わせ内容をご記入ください"
                        rows={6}
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      送信する
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium">メール</div>
                      <div className="text-sm text-gray-500">support@aiaio.jp</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    お問い合わせフォームからのご連絡を推奨しております
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <div className="font-medium">チャットサポート</div>
                      <div className="text-sm text-gray-500">平日 10:00-18:00</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    ログイン後、画面右下のチャットアイコンからご利用いただけます
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-blue-900 mb-2">
                    よくある質問
                  </h3>
                  <p className="text-sm text-blue-700 mb-4">
                    お問い合わせの前に、よくある質問をご確認ください
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="/help">ヘルプセンターへ</a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
