export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">利用規約</h1>

          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-8">
              最終更新日: 2024年11月1日
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">第1条（適用）</h2>
              <p className="text-gray-600 mb-4">
                本規約は、AIAIO（以下「当社」）が提供するサービス（以下「本サービス」）の利用条件を定めるものです。
                登録ユーザーの皆さま（以下「ユーザー」）には、本規約に従って本サービスをご利用いただきます。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">第2条（利用登録）</h2>
              <p className="text-gray-600 mb-4">
                1. 本サービスにおいては、登録希望者が本規約に同意の上、当社の定める方法によって利用登録を申請し、
                当社がこれを承認することによって、利用登録が完了するものとします。
              </p>
              <p className="text-gray-600 mb-4">
                2. 当社は、利用登録の申請者に以下の事由があると判断した場合、利用登録の申請を承認しないことがあり、
                その理由については一切の開示義務を負わないものとします。
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                <li>利用登録の申請に際して虚偽の事項を届け出た場合</li>
                <li>本規約に違反したことがある者からの申請である場合</li>
                <li>その他、当社が利用登録を相当でないと判断した場合</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">第3条（禁止事項）</h2>
              <p className="text-gray-600 mb-4">
                ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                <li>法令または公序良俗に違反する行為</li>
                <li>犯罪行為に関連する行為</li>
                <li>当社のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為</li>
                <li>当社のサービスの運営を妨害するおそれのある行為</li>
                <li>他のユーザーに関する個人情報等を収集または蓄積する行為</li>
                <li>他のユーザーに成りすます行為</li>
                <li>当社のサービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為</li>
                <li>その他、当社が不適切と判断する行為</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">第4条（本サービスの提供の停止等）</h2>
              <p className="text-gray-600 mb-4">
                当社は、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく
                本サービスの全部または一部の提供を停止または中断することができるものとします。
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                <li>本サービスにかかるコンピュータシステムの保守点検または更新を行う場合</li>
                <li>地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合</li>
                <li>コンピュータまたは通信回線等が事故により停止した場合</li>
                <li>その他、当社が本サービスの提供が困難と判断した場合</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">第5条（著作権）</h2>
              <p className="text-gray-600 mb-4">
                本サービスによって生成された仕様書等の著作権は、生成したユーザーに帰属します。
                ただし、当社は本サービスの改善・マーケティング目的で、匿名化した上で統計情報として利用することができます。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">第6条（免責事項）</h2>
              <p className="text-gray-600 mb-4">
                当社は、本サービスに関して、ユーザーと他のユーザーまたは第三者との間において生じた取引、連絡または紛争等について
                一切責任を負いません。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">第7条（サービス内容の変更等）</h2>
              <p className="text-gray-600 mb-4">
                当社は、ユーザーへの事前の告知をもって、本サービスの内容を変更、追加または廃止することがあり、
                ユーザーはこれを承諾するものとします。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">第8条（利用規約の変更）</h2>
              <p className="text-gray-600 mb-4">
                当社は、必要と判断した場合には、ユーザーに通知することなくいつでも本規約を変更することができるものとします。
                なお、本規約の変更後、本サービスの利用を開始した場合には、当該ユーザーは変更後の規約に同意したものとみなします。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">第9条（準拠法・裁判管轄）</h2>
              <p className="text-gray-600 mb-4">
                本規約の解釈にあたっては、日本法を準拠法とします。
                本サービスに関して紛争が生じた場合には、東京地方裁判所を専属的合意管轄とします。
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
