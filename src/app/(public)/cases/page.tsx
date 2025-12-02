'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  BookOpen,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'
import { mockCases, mockIndustries } from '@/mocks'

export default function CasesPage() {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('')
  const [selectedTech, setSelectedTech] = useState<string>('')

  const filteredCases = mockCases.filter((caseStudy) => {
    if (selectedIndustry && caseStudy.industry !== selectedIndustry) return false
    if (selectedTech && caseStudy.technology !== selectedTech) return false
    return true
  })

  const technologies = [...new Set(mockCases.map((c) => c.technology))]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-orange-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">AI導入事例</h1>
          </div>
          <p className="text-gray-600">
            実際のAI導入事例から、成功のポイントや費用感を学びましょう
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Industry Quick Filter */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">業界から探す</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {mockIndustries.map((industry) => (
              <button
                key={industry.id}
                onClick={() => setSelectedIndustry(
                  selectedIndustry === industry.name ? '' : industry.name
                )}
                className={`p-4 rounded-lg border-2 text-center transition-colors ${
                  selectedIndustry === industry.name
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="text-2xl mb-2">{
                  industry.name === '製造業' ? '🏭' :
                  industry.name === '小売・流通' ? '🛒' :
                  industry.name === '金融・保険' ? '🏦' :
                  industry.name === '医療・ヘルスケア' ? '🏥' :
                  industry.name === '物流' ? '🚚' :
                  '👥'
                }</div>
                <div className="font-medium text-sm">{industry.name}</div>
                <div className="text-xs text-gray-500">{industry.caseCount}件</div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">絞り込み条件</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    業界
                  </label>
                  <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                    <SelectTrigger>
                      <SelectValue placeholder="すべて" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">すべて</SelectItem>
                      {mockIndustries.map((industry) => (
                        <SelectItem key={industry.id} value={industry.name}>
                          {industry.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    技術
                  </label>
                  <Select value={selectedTech} onValueChange={setSelectedTech}>
                    <SelectTrigger>
                      <SelectValue placeholder="すべて" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">すべて</SelectItem>
                      {technologies.map((tech) => (
                        <SelectItem key={tech} value={tech}>
                          {tech}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSelectedIndustry('')
                    setSelectedTech('')
                  }}
                >
                  条件をクリア
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                {filteredCases.length}件の事例が見つかりました
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {filteredCases.map((caseStudy) => (
                <Card key={caseStudy.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex gap-2 mb-2">
                      <Badge variant="secondary">{caseStudy.industry}</Badge>
                      <Badge variant="outline">{caseStudy.technology}</Badge>
                    </div>
                    <CardTitle className="text-lg line-clamp-2">{caseStudy.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                      {caseStudy.challenge}
                    </p>

                    <div className="space-y-2 mb-4">
                      {caseStudy.results.slice(0, 2).map((result, index) => (
                        <div key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{result}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="text-sm text-gray-600">
                        <span>費用: {(caseStudy.cost / 10000).toLocaleString()}万円</span>
                        <span className="mx-2">|</span>
                        <span>期間: {caseStudy.duration}</span>
                      </div>
                      <Button variant="link" className="p-0" asChild>
                        <Link href={`/cases/${caseStudy.id}`}>
                          詳しく <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
