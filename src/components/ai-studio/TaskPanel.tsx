'use client'

import { CheckCircle2, Circle, Loader2, ListTodo } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Task } from '@/types/ai-studio'

type TaskPanelProps = {
  tasks: Task[]
}

function TaskItem({ task }: { task: Task }) {
  const statusConfig = {
    pending: {
      icon: <Circle className="h-4 w-4 text-gray-500" />,
      textClass: 'text-gray-400',
      label: task.content,
    },
    in_progress: {
      icon: <Loader2 className="h-4 w-4 text-blue-400 animate-spin" />,
      textClass: 'text-blue-300',
      label: task.activeForm,
    },
    completed: {
      icon: <CheckCircle2 className="h-4 w-4 text-green-400" />,
      textClass: 'text-gray-500 line-through',
      label: task.content,
    },
  }

  const config = statusConfig[task.status]

  return (
    <div className={cn(
      'flex items-start gap-2 px-3 py-2 rounded transition-colors',
      task.status === 'in_progress' && 'bg-blue-900/20'
    )}>
      <div className="mt-0.5 flex-shrink-0">
        {config.icon}
      </div>
      <span className={cn('text-sm', config.textClass)}>
        {config.label}
      </span>
    </div>
  )
}

export function TaskPanel({ tasks }: TaskPanelProps) {
  const completedCount = tasks.filter(t => t.status === 'completed').length
  const totalCount = tasks.length
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

  return (
    <div className="h-full flex flex-col bg-gray-900">
      {/* Header */}
      <div className="px-3 py-2 border-b border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <ListTodo className="h-4 w-4 text-gray-400" />
            <span className="text-xs font-medium text-gray-400">Tasks</span>
          </div>
          <span className="text-xs text-gray-500">
            {completedCount}/{totalCount}
          </span>
        </div>
        {/* Progress bar */}
        <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Task List */}
      <div className="flex-1 overflow-auto py-1">
        {tasks.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-600 text-sm">
            タスクがありません
          </div>
        ) : (
          <div className="space-y-0.5">
            {tasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
