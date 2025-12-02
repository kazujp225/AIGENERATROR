import Link from 'next/link'

const footerLinks = {
  service: [
    { name: '要件定義AI', href: '/aladdin' },
    { name: '相場検索', href: '/market' },
    { name: 'ベンダー検索', href: '/vendors' },
    { name: '導入事例', href: '/cases' },
  ],
  vendor: [
    { name: 'パートナー登録', href: '/register?type=vendor' },
    { name: 'ベンダーログイン', href: '/login' },
  ],
  company: [
    { name: '会社概要', href: '/about' },
    { name: '採用情報', href: '/careers' },
    { name: 'ブログ', href: '/blog' },
  ],
  support: [
    { name: 'ヘルプ', href: '/help' },
    { name: 'お問い合わせ', href: '/contact' },
    { name: 'よくある質問', href: '/faq' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Logo & Description */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold">
                A
              </div>
              <span className="text-xl font-bold text-white">AIAIO</span>
            </Link>
            <p className="mt-4 text-sm text-gray-400">
              AI開発の発注OS
              <br />
              仕様・相場・ベンダーを標準化
            </p>
          </div>

          {/* Service Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              サービス
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.service.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Vendor Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              ベンダー向け
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.vendor.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              会社情報
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              サポート
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              &copy; 2024 AIAIO. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                href="/terms"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                利用規約
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                プライバシーポリシー
              </Link>
              <Link
                href="/legal"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                特商法表記
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
