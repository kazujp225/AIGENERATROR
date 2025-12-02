'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Slider } from '@/components/ui/slider'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, ArrowRight, Bot } from 'lucide-react'
import { aladdinQuestions } from '@/mocks'

type Answer = string | string[] | number | boolean | null

export default function AladdinStartPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>(
    Array(aladdinQuestions.length).fill(null)
  )

  const question = aladdinQuestions[currentStep]
  const progress = ((currentStep + 1) / aladdinQuestions.length) * 100

  const handleSingleSelect = (value: string) => {
    const newAnswers = [...answers]
    newAnswers[currentStep] = value
    setAnswers(newAnswers)
  }

  const handleMultipleSelect = (value: string) => {
    const currentAnswer = (answers[currentStep] as string[]) || []
    const newAnswer = currentAnswer.includes(value)
      ? currentAnswer.filter((v) => v !== value)
      : [...currentAnswer, value]
    const newAnswers = [...answers]
    newAnswers[currentStep] = newAnswer
    setAnswers(newAnswers)
  }

  const handleYesNo = (value: boolean) => {
    const newAnswers = [...answers]
    newAnswers[currentStep] = value
    setAnswers(newAnswers)
  }

  const handleTextChange = (value: string) => {
    const newAnswers = [...answers]
    newAnswers[currentStep] = value
    setAnswers(newAnswers)
  }

  const handleSliderChange = (value: number[]) => {
    const newAnswers = [...answers]
    newAnswers[currentStep] = value[0]
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentStep < aladdinQuestions.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const isAnswered = () => {
    const answer = answers[currentStep]
    if (answer === null || answer === undefined) return false
    if (Array.isArray(answer)) return answer.length > 0
    if (typeof answer === 'string') return answer.trim() !== ''
    return true
  }

  const isLastStep = currentStep === aladdinQuestions.length - 1

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">
              質問 {currentStep + 1} / {aladdinQuestions.length}
            </span>
            <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="shadow-lg mb-6">
          <CardContent className="p-6">
            {/* AI Avatar */}
            <div className="flex items-start gap-3 mb-6">
              <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-lg font-medium text-gray-900">{question.text}</p>
              </div>
            </div>

            {/* Answer Options */}
            <div className="ml-13">
              {question.type === 'single' && question.options && (
                <div className="grid grid-cols-2 gap-3">
                  {question.options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleSingleSelect(option.value)}
                      className={`p-3 rounded-lg border-2 text-left transition-colors ${
                        answers[currentStep] === option.value
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}

              {question.type === 'multiple' && question.options && (
                <div className="grid grid-cols-2 gap-3">
                  {question.options.map((option) => {
                    const selected =
                      Array.isArray(answers[currentStep]) &&
                      (answers[currentStep] as string[]).includes(option.value)
                    return (
                      <button
                        key={option.value}
                        onClick={() => handleMultipleSelect(option.value)}
                        className={`p-3 rounded-lg border-2 text-left transition-colors ${
                          selected
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {option.label}
                      </button>
                    )
                  })}
                </div>
              )}

              {question.type === 'yesno' && (
                <div className="flex gap-4">
                  <button
                    onClick={() => handleYesNo(true)}
                    className={`flex-1 p-4 rounded-lg border-2 transition-colors ${
                      answers[currentStep] === true
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    はい
                  </button>
                  <button
                    onClick={() => handleYesNo(false)}
                    className={`flex-1 p-4 rounded-lg border-2 transition-colors ${
                      answers[currentStep] === false
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    いいえ
                  </button>
                </div>
              )}

              {question.type === 'text' && (
                <Textarea
                  placeholder={question.placeholder}
                  value={(answers[currentStep] as string) || ''}
                  onChange={(e) => handleTextChange(e.target.value)}
                  className="min-h-[120px]"
                />
              )}

              {question.type === 'slider' && (
                <div className="space-y-4">
                  <Slider
                    defaultValue={[(answers[currentStep] as number) || question.min || 0]}
                    min={question.min}
                    max={question.max}
                    step={question.step}
                    onValueChange={handleSliderChange}
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{question.min}万円</span>
                    <span className="text-lg font-semibold text-blue-600">
                      {(answers[currentStep] as number) || question.min}万円
                    </span>
                    <span>{question.max}万円</span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            戻る
          </Button>

          {isLastStep ? (
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              disabled={!isAnswered()}
              asChild
            >
              <Link href="/aladdin/result">
                仕様書を生成
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={!isAnswered()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              次へ
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
