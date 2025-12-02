'use client'

import {
  Files,
  Search,
  GitBranch,
  Bot,
  Settings,
  Play,
  MessageSquare,
  Terminal,
  Bug,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export type ActivityView = 'files' | 'search' | 'git' | 'agent' | 'debug'

type ActivityBarProps = {
  activeView: ActivityView
  onViewChange: (view: ActivityView) => void
  hasRunningTask?: boolean
}

const activities = [
  { id: 'files' as const, icon: Files, label: 'Explorer' },
  { id: 'search' as const, icon: Search, label: 'Search' },
  { id: 'git' as const, icon: GitBranch, label: 'Source Control' },
  { id: 'agent' as const, icon: Bot, label: 'AI Agent' },
  { id: 'debug' as const, icon: Bug, label: 'Debug' },
]

const bottomActivities = [
  { id: 'settings' as const, icon: Settings, label: 'Settings' },
]

export function ActivityBar({ activeView, onViewChange, hasRunningTask }: ActivityBarProps) {
  return (
    <div className="w-12 bg-gray-900 border-r border-gray-800 flex flex-col">
      {/* Top activities */}
      <div className="flex-1">
        {activities.map((activity) => {
          const Icon = activity.icon
          const isActive = activeView === activity.id
          return (
            <button
              key={activity.id}
              onClick={() => onViewChange(activity.id)}
              className={cn(
                'w-full h-12 flex items-center justify-center relative group transition-colors',
                isActive
                  ? 'text-white'
                  : 'text-gray-500 hover:text-gray-300'
              )}
              title={activity.label}
            >
              {/* Active indicator */}
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-500" />
              )}

              {/* Icon */}
              <Icon className="h-5 w-5" />

              {/* Running indicator for agent */}
              {activity.id === 'agent' && hasRunningTask && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              )}

              {/* Tooltip */}
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
                {activity.label}
              </div>
            </button>
          )
        })}
      </div>

      {/* Bottom activities */}
      <div className="border-t border-gray-800">
        {bottomActivities.map((activity) => {
          const Icon = activity.icon
          return (
            <button
              key={activity.id}
              className="w-full h-12 flex items-center justify-center text-gray-500 hover:text-gray-300 relative group transition-colors"
              title={activity.label}
            >
              <Icon className="h-5 w-5" />
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
                {activity.label}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
