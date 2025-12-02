export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">プライバシーポリシー</h1>

          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-8">
              最終更新日: 2024年11月1日
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">1. はじめに</h2>
              <p className="text-gray-600 mb-4">
                AIAIO（以下「当社」）は、お客様の個人情報の保護を重要な責務と考えております。
                本プライバシーポリシーでは、当社がどのような情報を収集し、どのように使用・保護するかについて説明します。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">2. 収集する情報</h2>
              <p className="text-gray-600 mb-4">当社は、以下の情報を収集することがあります。</p>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                <li>氏名、会社名、部署名、役職</li>
                <li>メールアドレス、電話番号</li>
                <li>サービス利用履歴（閲覧ページ、検索履歴等）</li>
                <li>IPアドレス、ブラウザ情報、デバイス情報</li>
                <li>お問い合わせ内容</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">3. 情報の利用目的</h2>
              <p className="text-gray-600 mb-4">収集した情報は、以下の目的で利用します。</p>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                <li>本サービスの提供・運営</li>
                <li>ユーザーからのお問い合わせへの対応</li>
                <li>本サービスの改善・新機能開発</li>
                <li>マーケティング・分析目的（匿名化した統計情報として）</li>
                <li>利用規約に違反した行為への対応</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">4. 情報の第三者提供</h2>
              <p className="text-gray-600 mb-4">
                当社は、以下の場合を除き、お客様の個人情報を第三者に提供することはありません。
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                <li>お客様の同意がある場合</li>
                <li>法令に基づく場合</li>
                <li>人の生命、身体または財産の保護のために必要な場合</li>
                <li>業務委託先に対して、業務遂行に必要な範囲で提供する場合</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">5. 情報の安全管理</h2>
              <p className="text-gray-600 mb-4">
                当社は、個人情報の漏洩、滅失、毀損を防止するため、適切なセキュリティ対策を講じています。
                SSL暗号化通信の使用、アクセス制限、定期的なセキュリティ監査等を実施しています。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">6. Cookieの使用</h2>
              <p className="text-gray-600 mb-4">
                当社は、ウェブサイトの機能向上およびユーザー体験の改善のためにCookieを使用しています。
                ブラウザの設定により、Cookieの受け入れを拒否することができますが、
                一部の機能が利用できなくなる場合があります。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">7. お客様の権利</h2>
              <p className="text-gray-600 mb-4">お客様は、以下の権利を有しています。</p>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                <li>ご自身の個人情報へのアクセス・訂正・削除の請求</li>
                <li>個人情報の利用停止の請求</li>
                <li>個人情報の第三者提供の停止の請求</li>
              </ul>
              <p className="text-gray-600 mb-4">
                これらの請求は、お問い合わせフォームよりご連絡ください。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">8. 未成年者の個人情報</h2>
              <p className="text-gray-600 mb-4">
                本サービスは、18歳未満の方を対象としておりません。
                18歳未満の方は、保護者の同意を得た上でご利用ください。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">9. プライバシーポリシーの変更</h2>
              <p className="text-gray-600 mb-4">
                当社は、必要に応じて本プライバシーポリシーを変更することがあります。
                重要な変更がある場合は、ウェブサイト上で通知いたします。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">10. お問い合わせ</h2>
              <p className="text-gray-600 mb-4">
                本プライバシーポリシーに関するお問い合わせは、以下までご連絡ください。
              </p>
              <p className="text-gray-600">
                AIAIO サポートチーム<br />
                メール: privacy@aiaio.jp
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
