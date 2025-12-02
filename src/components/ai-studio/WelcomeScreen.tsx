'use client'

import { useState } from 'react'
import {
  Sparkles,
  FileText,
  TrendingUp,
  Users,
  Clock,
  ArrowRight,
  CheckCircle2,
  Zap,
  Shield,
  MessageSquare,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type WelcomeScreenProps = {
  onStart: () => void
}

const features = [
  {
    icon: MessageSquare,
    title: '簡単な質問に答えるだけ',
    description: '技術知識は不要。Yes/Noや選択式の質問に答えていくだけです',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: FileText,
    title: '仕様書を自動生成',
    description: '回答に基づいて、プロの仕様書が自動で作成されます',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: TrendingUp,
    title: '相場がすぐわかる',
    description: '業界・規模に応じた概算費用をリアルタイムで表示',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Users,
    title: '最適なベンダーを紹介',
    description: 'あなたの要件にマッチした開発会社をご提案',
    color: 'from-orange-500 to-amber-500',
  },
]

const steps = [
  { num: 1, label: '質問に回答', time: '5分' },
  { num: 2, label: '仕様書確認', time: '3分' },
  { num: 3, label: 'ベンダー選定', time: '2分' },
]

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-12">
        {/* Logo & Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 shadow-xl shadow-purple-500/30 mb-6">
            <Sparkles className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            AI Studio
          </h1>
          <p className="text-xl text-purple-200 max-w-md mx-auto">
            AI開発の発注を、誰でも簡単に。
            <br />
            専門知識は必要ありません。
          </p>
        </div>

        {/* Time Estimate */}
        <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-full text-white/80 text-sm mb-8">
          <Clock className="h-4 w-4" />
          <span>所要時間: 約10分</span>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl w-full mb-12">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group p-5 rounded-2xl bg-white/5 backdrop-blur border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <div className={cn(
                'w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center mb-3',
                feature.color
              )}>
                <feature.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
              <p className="text-white/60 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Progress Steps */}
        <div className="flex items-center gap-4 mb-12">
          {steps.map((step, idx) => (
            <div key={idx} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white font-bold mb-2">
                  {step.num}
                </div>
                <span className="text-white/80 text-sm">{step.label}</span>
                <span className="text-white/40 text-xs">{step.time}</span>
              </div>
              {idx < steps.length - 1 && (
                <ArrowRight className="h-4 w-4 text-white/30 mx-4 mt-[-20px]" />
              )}
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <Button
          size="lg"
          onClick={onStart}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className={cn(
            'px-8 py-6 text-lg rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600',
            'hover:from-purple-500 hover:to-blue-500 shadow-xl shadow-purple-500/30',
            'transform transition-all duration-300',
            isHovering && 'scale-105'
          )}
        >
          <Sparkles className={cn(
            'h-5 w-5 mr-2 transition-transform duration-300',
            isHovering && 'rotate-12'
          )} />
          無料で始める
          <ArrowRight className={cn(
            'h-5 w-5 ml-2 transition-transform duration-300',
            isHovering && 'translate-x-1'
          )} />
        </Button>

        {/* Trust Badges */}
        <div className="flex items-center gap-6 mt-8 text-white/60 text-sm">
          <div className="flex items-center gap-1">
            <Shield className="h-4 w-4" />
            <span>無料・登録不要</span>
          </div>
          <div className="flex items-center gap-1">
            <Zap className="h-4 w-4" />
            <span>即時生成</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle2 className="h-4 w-4" />
            <span>1000社以上が利用</span>
          </div>
        </div>
      </div>

      {/* CSS for blob animation */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}
