'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Menu, Bell, User, ChevronDown, Bot } from 'lucide-react'

const navigation = [
  { name: '要件定義', href: '/aladdin' },
  { name: '相場検索', href: '/market' },
  { name: 'ベンダー', href: '/vendors' },
  { name: '事例', href: '/cases' },
  { name: 'AI Studio', href: '/ai-studio', isNew: true },
]

export default function Header() {
  const [isLoggedIn] = useState(false) // モック用

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold">
            A
          </div>
          <span className="text-xl font-bold text-gray-900">AIAIO</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium transition-colors flex items-center gap-1.5 ${
                item.isNew
                  ? 'text-purple-600 hover:text-purple-700'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {item.isNew && <Bot className="h-4 w-4" />}
              {item.name}
              {item.isNew && (
                <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-purple-100 text-purple-700 rounded">
                  NEW
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop Right Section */}
        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              {/* Notifications */}
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="h-4 w-4" />
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">ダッシュボード</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/specs">仕様書管理</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings">設定</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    ログアウト
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">ログイン</Link>
              </Button>
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link href="/register">新規登録</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px]">
            <nav className="flex flex-col space-y-4 mt-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-lg font-medium transition-colors flex items-center gap-2 ${
                    item.isNew
                      ? 'text-purple-600 hover:text-purple-700'
                      : 'text-gray-900 hover:text-blue-600'
                  }`}
                >
                  {item.isNew && <Bot className="h-5 w-5" />}
                  {item.name}
                  {item.isNew && (
                    <span className="px-1.5 py-0.5 text-xs font-semibold bg-purple-100 text-purple-700 rounded">
                      NEW
                    </span>
                  )}
                </Link>
              ))}
              <div className="pt-4 border-t">
                {isLoggedIn ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="block py-2 text-lg font-medium text-gray-900"
                    >
                      ダッシュボード
                    </Link>
                    <button className="py-2 text-lg font-medium text-red-600">
                      ログアウト
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="block py-2 text-lg font-medium text-gray-900"
                    >
                      ログイン
                    </Link>
                    <Button asChild className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                      <Link href="/register">新規登録</Link>
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
