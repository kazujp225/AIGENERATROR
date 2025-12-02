'use client'

import { useState } from 'react'
import { Search, ChevronDown, ChevronRight, File, X, Replace } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type SearchResult = {
  file: string
  matches: {
    line: number
    content: string
    matchStart: number
    matchEnd: number
  }[]
}

type SearchPanelProps = {
  onFileSelect?: (path: string, line: number) => void
}

// Mock search results
const mockSearchResults: SearchResult[] = [
  {
    file: '/src/app/page.tsx',
    matches: [
      { line: 12, content: "import { Button } from '@/components/ui/button'", matchStart: 10, matchEnd: 16 },
      { line: 45, content: '          <Button onClick={handleSubmit}>送信</Button>', matchStart: 11, matchEnd: 17 },
    ],
  },
  {
    file: '/src/components/ui/button.tsx',
    matches: [
      { line: 1, content: "export function Button({ children, ...props }) {", matchStart: 16, matchEnd: 22 },
      { line: 15, content: "  return <button className={buttonStyles} {...props}>", matchStart: 10, matchEnd: 16 },
    ],
  },
]

export function SearchPanel({ onFileSelect }: SearchPanelProps) {
  const [query, setQuery] = useState('')
  const [replaceQuery, setReplaceQuery] = useState('')
  const [showReplace, setShowReplace] = useState(false)
  const [expandedFiles, setExpandedFiles] = useState<Set<string>>(new Set())
  const [results, setResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = () => {
    if (!query.trim()) return
    setIsSearching(true)
    // Simulate search
    setTimeout(() => {
      setResults(mockSearchResults.filter(r =>
        r.matches.some(m => m.content.toLowerCase().includes(query.toLowerCase()))
      ))
      setExpandedFiles(new Set(mockSearchResults.map(r => r.file)))
      setIsSearching(false)
    }, 300)
  }

  const toggleFile = (file: string) => {
    const newExpanded = new Set(expandedFiles)
    if (newExpanded.has(file)) {
      newExpanded.delete(file)
    } else {
      newExpanded.add(file)
    }
    setExpandedFiles(newExpanded)
  }

  const highlightMatch = (content: string, start: number, end: number) => {
    return (
      <>
        <span className="text-gray-400">{content.slice(0, start)}</span>
        <span className="bg-yellow-500/30 text-yellow-200">{content.slice(start, end)}</span>
        <span className="text-gray-400">{content.slice(end)}</span>
      </>
    )
  }

  const totalMatches = results.reduce((acc, r) => acc + r.matches.length, 0)

  return (
    <div className="h-full bg-gray-900 text-gray-300 flex flex-col">
      {/* Header */}
      <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-700 flex items-center justify-between">
        <span>Search</span>
        <button
          onClick={() => setShowReplace(!showReplace)}
          className={cn(
            'p-1 rounded hover:bg-gray-700 transition-colors',
            showReplace && 'bg-gray-700'
          )}
        >
          <Replace className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Search inputs */}
      <div className="p-2 space-y-2 border-b border-gray-700">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search..."
            className="pl-8 h-8 bg-gray-800 border-gray-700 text-sm"
          />
          {query && (
            <button
              onClick={() => { setQuery(''); setResults([]) }}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 hover:bg-gray-700 rounded"
            >
              <X className="h-3.5 w-3.5 text-gray-500" />
            </button>
          )}
        </div>

        {showReplace && (
          <div className="relative">
            <Replace className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              value={replaceQuery}
              onChange={(e) => setReplaceQuery(e.target.value)}
              placeholder="Replace..."
              className="pl-8 h-8 bg-gray-800 border-gray-700 text-sm"
            />
          </div>
        )}
      </div>

      {/* Results */}
      <div className="flex-1 overflow-auto">
        {isSearching ? (
          <div className="p-4 text-center text-gray-500 text-sm">
            検索中...
          </div>
        ) : results.length > 0 ? (
          <div>
            <div className="px-3 py-1.5 text-xs text-gray-500 border-b border-gray-800">
              {results.length} ファイル中 {totalMatches} 件の結果
            </div>
            {results.map((result) => (
              <div key={result.file}>
                <button
                  onClick={() => toggleFile(result.file)}
                  className="w-full flex items-center gap-1 px-2 py-1 text-sm hover:bg-gray-800 transition-colors"
                >
                  {expandedFiles.has(result.file) ? (
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-gray-500" />
                  )}
                  <File className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-300 truncate">{result.file.split('/').pop()}</span>
                  <span className="text-gray-600 text-xs ml-auto">{result.matches.length}</span>
                </button>

                {expandedFiles.has(result.file) && (
                  <div className="ml-6 border-l border-gray-800">
                    {result.matches.map((match, idx) => (
                      <button
                        key={idx}
                        onClick={() => onFileSelect?.(result.file, match.line)}
                        className="w-full text-left px-3 py-1 text-xs font-mono hover:bg-gray-800 transition-colors flex items-start gap-2"
                      >
                        <span className="text-gray-600 flex-shrink-0">{match.line}</span>
                        <span className="truncate">
                          {highlightMatch(match.content, match.matchStart, match.matchEnd)}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : query ? (
          <div className="p-4 text-center text-gray-500 text-sm">
            結果が見つかりませんでした
          </div>
        ) : (
          <div className="p-4 text-center text-gray-500 text-sm">
            検索キーワードを入力してください
          </div>
        )}
      </div>
    </div>
  )
}
