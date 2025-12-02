'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  ArrowLeft,
  Building2,
  Calendar,
  MessageSquare,
  CheckCircle2,
  Clock,
  Circle,
} from 'lucide-react'
import { mockProjects } from '@/mocks'

export default function ProjectsPage() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'planning':
        return <Badge variant="secondary">計画中</Badge>
      case 'in_progress':
        return <Badge className="bg-blue-100 text-blue-700">進行中</Badge>
      case 'review':
        return <Badge className="bg-yellow-100 text-yellow-700">レビュー中</Badge>
      case 'completed':
        return <Badge className="bg-emerald-100 text-emerald-700">完了</Badge>
      default:
        return null
    }
  }

  const getMilestoneIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-emerald-600" />
      case 'in_progress':
        return <Clock className="h-4 w-4 text-blue-600" />
      default:
        return <Circle className="h-4 w-4 text-gray-300" />
    }
  }

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
          <h1 className="text-2xl font-bold text-gray-900">プロジェクト管理</h1>
          <p className="text-gray-600">進行中のプロジェクトを確認・管理できます</p>
        </div>

        {/* Projects List */}
        <div className="space-y-6">
          {mockProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg">{project.name}</CardTitle>
                        {getStatusBadge(project.status)}
                      </div>
                      <p className="text-sm text-gray-500">{project.vendorName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm text-gray-500">予算</div>
                      <div className="font-semibold">
                        {(project.budget / 10000).toLocaleString()}万円
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      メッセージ
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Progress */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">進捗</span>
                    <span className="text-sm font-medium">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                {/* Milestones */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-3">マイルストーン</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.milestones.map((milestone, index) => (
                      <div
                        key={milestone.id}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm ${
                          milestone.status === 'completed'
                            ? 'bg-emerald-50 text-emerald-700'
                            : milestone.status === 'in_progress'
                            ? 'bg-blue-50 text-blue-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {getMilestoneIcon(milestone.status)}
                        <span>{milestone.title}</span>
                        {index < project.milestones.length - 1 && (
                          <span className="text-gray-300 ml-2">→</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Info Row */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {project.startDate} 〜 {project.endDate}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{project.lastActivity}</span>
                    <span className="text-gray-400">({project.lastActivityTime})</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {mockProjects.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">進行中のプロジェクトがありません</h3>
              <p className="text-gray-600 mb-4">
                仕様書を作成して、ベンダーに問い合わせてみましょう
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                <Link href="/aladdin">仕様書を作成する</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
