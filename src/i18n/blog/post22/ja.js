import React from "react";

export const title = "PowerSchool侵害後にEdTechベンダーに尋ねるべき10の質問";
export const date = "2026-02-07";
export const slug = "edtech-vendor-security-questions-powerschool";
export const description = "PowerSchoolデータ侵害事件で6,240万人の生徒と950万人の教育者の情報が流出。学校がEdTechベンダー選定時に確認すべき10の重要なセキュリティ質問を解説。SOC 2認証、MFA、データ保持ポリシーなど、契約前に必ず確認を。";
export const keywords = "PowerSchool data breach, EdTech security, student data privacy, school vendor questionnaire, FERPA compliance, GDPR education, virtual lab security, EdTech vendor vetting";

export const content = (
  <>
    <figure className="blog-image">
      <img
        src="/images/seccenter.jpg"
        alt="EdTechベンダーのセキュリティ文書を確認する学校管理者"
        style={{ width: '100%', maxWidth: '700px', margin: '0 auto 1.5rem', display: 'block', borderRadius: '8px' }}
      />
      <figcaption style={{ textAlign: 'center', fontStyle: 'italic', color: '#666', marginBottom: '1.5rem' }}>
        学校は今やEdTechベンダーのセキュリティ慣行を審査する法的責任を負っています
      </figcaption>
    </figure>

    <p>
      2024年12月、PowerSchoolは大規模なデータ侵害を受け、北米全土で約6,240万人の生徒と950万人の教育者の個人情報が流出しました（<a href="https://www.bleepingcomputer.com/news/security/powerschool-hacker-claims-they-stole-data-of-62-million-students/" target="_blank" rel="noopener noreferrer">BleepingComputer, 2025</a>）。この侵害は、単一の従業員認証情報の漏洩と、重要なサポートポータルでの多要素認証の欠如が原因で発生しました（<a href="https://www.techtarget.com/whatis/feature/PowerSchool-data-breach-Explaining-how-it-happened" target="_blank" rel="noopener noreferrer">TechTarget, 2025</a>）。プライバシー規制当局はその後、学校がベンダーのセキュリティ慣行を審査する責任を負うことを強調しています。
    </p>
    <p>
      これにより、学校がEdTechプロバイダーを評価する方法がすべて変わります。バーチャル理科実験室、学習管理システム、または生徒データに触れるあらゆるソフトウェアを検討している場合、より厳しい質問をする必要があります。以下は、すべての学校が契約締結前に尋ねるべき10の質問です。
    </p>

    <h2>1. データはどこに保存されていますか？</h2>
    <p>
      これは国を知るだけではありません。具体的な情報が必要です：
    </p>
    <ul>
      <li><strong>どのクラウドプロバイダー？</strong>（AWS、Google Cloud、Azure、または自社ホスティング？）</li>
      <li><strong>どの地域？</strong>（EUの学校はGDPRのためにEUベースのサーバーを必要とする場合があります）</li>
      <li><strong>データは国際的に転送されることがありますか？</strong></li>
      <li><strong>バックアップは別の場所に保存されていますか？</strong></li>
    </ul>
    <p>
      これらの質問に正確に答えられないベンダーは、おそらくデータアーキテクチャについて慎重に考えていません。英国情報コミッショナー事務局は、組織が個人データがどこで処理されるかを把握することを明確に要求しています（<a href="https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/international-transfers/" target="_blank" rel="noopener noreferrer">ICO, 2024</a>）。
    </p>

    <h2>2. SOC 2またはISO 27001認証を取得していますか？</h2>
    <p>
      SOC 2（System and Organization Controls）は、独立した会計士によって実施されるセキュリティ監査であり、ベンダーのセキュリティコントロールが紙の上だけでなく実際に機能することを証明します（<a href="https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2" target="_blank" rel="noopener noreferrer">AICPA, 2024</a>）。2つのタイプがあります：
    </p>
    <ul>
      <li><strong>タイプI：</strong>ある時点でコントロールが存在することを確認</li>
      <li><strong>タイプII：</strong>6〜12ヶ月にわたってコントロールが一貫して機能したことを確認（より厳格）</li>
    </ul>
    <p>
      ISO 27001は160カ国以上で認められている国際的な同等規格です（<a href="https://www.iso.org/standard/27001" target="_blank" rel="noopener noreferrer">ISO, 2022</a>）。ベンダーがどちらも持っていない場合、どのような第三者検証を受けているか尋ねてください。「セキュリティを真剣に考えています」は認証ではありません。
    </p>

    <h2>3. 誰が生徒データにアクセスできますか？</h2>
    <p>
      PowerSchoolの侵害は、適切なアクセス制御がなかったカスタマーサポートポータルを通じて発生しました。ベンダーに尋ねてください：
    </p>
    <ul>
      <li>何人の従業員が生徒データにアクセスできますか？</li>
      <li>アクセスは記録され、監査可能ですか？</li>
      <li>サポートスタッフがデータにアクセスする前に許可が必要ですか？</li>
      <li>請負業者や第三者もアクセス制御に含まれていますか？</li>
    </ul>
    <p>
      最小権限の原則は、NISTサイバーセキュリティフレームワーク（<a href="https://www.nist.gov/cyberframework" target="_blank" rel="noopener noreferrer">NIST, 2024</a>）などのフレームワークの核心要件であり、従業員は業務に必要な最小限のデータにのみアクセスすべきことを意味します。「サポート全員」が生徒記録を見ることができる場合、それは危険信号です。
    </p>

    <h2>4. 多要素認証を使用していますか？</h2>
    <p>
      PowerSchoolの侵害はMFAで防ぐことができました。Microsoftによると、MFAは自動化された攻撃の99.9%をブロックします（<a href="https://www.microsoft.com/en-us/security/blog/2019/08/20/one-simple-action-you-can-take-to-prevent-99-9-percent-of-account-attacks/" target="_blank" rel="noopener noreferrer">Microsoft, 2019</a>）。具体的に尋ねてください：
    </p>
    <ul>
      <li>すべての従業員アカウントにMFAは必須ですか？</li>
      <li>管理ポータルにMFAは必須ですか？</li>
      <li>学校管理者アカウントでMFAは利用可能ですか？</li>
      <li>どのMFA方法がサポートされていますか？（アプリベースはSMSより強力です）</li>
    </ul>
    <p>
      ベンダーが内部でMFAを強制していない場合、2026年において基本的なセキュリティ衛生を守っていません。
    </p>

    <h2>5. どのサードパーティサービスがデータに触れますか？</h2>
    <p>
      多くのEdTechプラットフォームは、分析、エラートラッキング、AI機能、またはホスティングに外部サービスを使用しています。それぞれが潜在的な漏洩ポイントです。GDPRの下では、ベンダーは個人データを扱うすべてのサブプロセッサーを開示する必要があります（<a href="https://www.edpb.europa.eu/" target="_blank" rel="noopener noreferrer">EDPB, 2024</a>）。完全なリストと各サービスが受け取るデータを要求してください。
    </p>
    <p>
      注意すべき点：
    </p>
    <ul>
      <li><strong>分析プラットフォーム</strong>（Google Analytics、Mixpanel）は生徒の行動を追跡する可能性があります</li>
      <li><strong>AIサービス</strong>は採点やフィードバックのために生徒の作品を処理します</li>
      <li><strong>カスタマーサポートツール</strong>は会話ログを保存する可能性があります</li>
      <li><strong>エラートラッキング</strong>はクラッシュレポートで機密データを取り込む可能性があります</li>
    </ul>
    <p>
      「生徒向けアプリケーションにサードパーティ分析なし」というベンダーは、意味のある約束をしています。
    </p>

    <h2>6. AIデータポリシーは何ですか？</h2>
    <p>
      AI搭載のEdTechが一般的になる中、ベンダーがAIと生徒データをどのように扱うかを理解することが重要です。Future of Privacy ForumのAIガバナンスに関する研究は、これらのポリシーを評価するための有用なフレームワークを提供しています（<a href="https://fpf.org/issue/ai-ml/" target="_blank" rel="noopener noreferrer">FPF, 2024</a>）。以下について尋ねてください：
    </p>
    <ul>
      <li><strong>AIモデルのトレーニングに生徒データを使用していますか？</strong>使用している場合、オプトインですか、オプトアウトですか？</li>
      <li><strong>学校は参加するかどうかを選択できますか？</strong></li>
      <li><strong>AI処理は自社インフラで行われますか、それとも第三者に送られますか？</strong></li>
      <li><strong>処理後、生徒の作品はどうなりますか？</strong></li>
    </ul>
    <p>
      鍵は透明性です。ベンダーは自社のアプローチを明確に説明し、生徒データがAI目的でどのように使用されるかについて学校に意味のある制御を与えるべきです。
    </p>

    <h2>7. データ保持ポリシーは何ですか？</h2>
    <p>
      存在しないデータは侵害されることができません。GDPRのデータ最小化原則は、組織が個人データを必要な期間のみ保持することを要求しています（<a href="https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/" target="_blank" rel="noopener noreferrer">ICO, 2024</a>）。尋ねてください：
    </p>
    <ul>
      <li>生徒がプラットフォームを離れた後、データはどのくらい保持されますか？</li>
      <li>学校は早期削除を要求できますか？</li>
      <li>サブスクリプションをキャンセルした場合、データはどうなりますか？</li>
      <li>バックアップも削除されますか、それとも残りますか？</li>
    </ul>
    <p>
      「念のため」生徒データを無期限に保持するベンダーはリスクです。
    </p>

    <h2>8. 侵害が発生した場合はどうなりますか？</h2>
    <p>
      すべてのベンダーはインシデント対応計画を持つべきです。GDPRは72時間以内の通知を要求しています（<a href="https://ico.org.uk/for-organisations/report-a-breach/personal-data-breach/" target="_blank" rel="noopener noreferrer">ICO, 2024</a>）。尋ねてください：
    </p>
    <ul>
      <li>侵害についてどのくらい早く通知しますか？</li>
      <li>通知にはどのような情報が含まれますか？</li>
      <li>サイバーセキュリティ保険に加入していますか？</li>
      <li>影響を受けた生徒に信用監視を提供しますか？</li>
    </ul>
    <p>
      PowerSchoolは侵害の全容を開示するのに数週間かかり、一部の学校は公式通知ではなくメディア報道で知ったと報告しています。通知タイムラインに関する明確な契約上の約束が重要です。
    </p>

    <h2>9. データ処理契約を取得できますか？</h2>
    <p>
      データ処理契約（DPA）は、GDPR第28条で要求される法的契約であり、ベンダーがデータをどのように扱うかを定義します（<a href="https://gdpr.eu/what-is-data-processing-agreement/" target="_blank" rel="noopener noreferrer">GDPR.eu, 2024</a>）。以下を明記する必要があります：
    </p>
    <ul>
      <li>どのデータが収集され、なぜ</li>
      <li>データがどのように保護されるか</li>
      <li>サブプロセッサーリスト</li>
      <li>侵害通知手順</li>
      <li>終了時のデータ削除</li>
    </ul>
    <p>
      ベンダーがDPAを提供できない場合、コンプライアンスを真剣に考える学校と協力する準備ができていない可能性があります。
    </p>

    <h2>10. 学校のデータをどのように保護していますか？</h2>
    <p>
      同じプラットフォーム上の他の学校からデータがどのように保護されているかを理解することは重要です。NISTサイバーセキュリティフレームワークは多層防御アプローチを推奨しています。以下について尋ねてください：
    </p>
    <ul>
      <li><strong>暗号化：</strong>学校のデータは組織固有のキーで暗号化されていますか？</li>
      <li><strong>アクセス制御：</strong>ある学校のユーザーが別の学校のデータにアクセスすることを何が防いでいますか？</li>
      <li><strong>監査ログ：</strong>すべてのデータアクセス試行は記録され、監視されていますか？</li>
      <li><strong>ペネトレーションテスト：</strong>独立したセキュリティ会社がプラットフォームをテストしましたか？</li>
    </ul>
    <p>
      暗号化、アクセス制御、またはアーキテクチャ設計を通じて、データをどのように分離し保護するかを具体的に説明できるベンダーを探してください。
    </p>

    <h2>学校の新しい現実</h2>
    <p>
      PowerSchoolの侵害は規制環境を変えました。プライバシーコミッショナーは、学校が単にベンダーを信頼することはできず、検証しなければならないことを明確にしています。これは、これら10の質問が単なるベストプラクティスではないことを意味します。法的要件になりつつあります。
    </p>
    <p>
      受け取った回答を文書化してください。契約にセキュリティ要件を含めてください。そして、明確な回答を提供できないベンダーから離れることを恐れないでください。
    </p>
    <p>
      WhimsyLabsでは、透明性が信頼を築くと信じています。私たちのバーチャル理科実験室を検討しているすべての学校に、これら10の質問すべてに喜んでお答えします。<a href="/contact">お問い合わせください</a>。完全なセキュリティ文書をお送りします。
    </p>

    <div className="references-section">
      <h3>参考文献</h3>
      <ul className="references-list">
        <li key="ref-1">
          AICPA. (2024). SOC 2 - SOC for Service Organizations: Trust Services Criteria.
          <em> American Institute of Certified Public Accountants</em>.
          <a href="https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2" target="_blank" rel="noopener noreferrer"> https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2</a>
        </li>
        <li key="ref-2">
          BleepingComputer. (2025, January 22). PowerSchool hacker claims they stole data of 62 million students.
          <em> BleepingComputer</em>.
          <a href="https://www.bleepingcomputer.com/news/security/powerschool-hacker-claims-they-stole-data-of-62-million-students/" target="_blank" rel="noopener noreferrer"> https://www.bleepingcomputer.com/news/security/powerschool-hacker-claims-they-stole-data-of-62-million-students/</a>
        </li>
        <li key="ref-3">
          European Data Protection Board. (2024). Guidelines on the concepts of controller and processor.
          <em> EDPB</em>.
          <a href="https://www.edpb.europa.eu/" target="_blank" rel="noopener noreferrer"> https://www.edpb.europa.eu/</a>
        </li>
        <li key="ref-4">
          Future of Privacy Forum. (2024). Center for Artificial Intelligence.
          <em> FPF</em>.
          <a href="https://fpf.org/issue/ai-ml/" target="_blank" rel="noopener noreferrer"> https://fpf.org/issue/ai-ml/</a>
        </li>
        <li key="ref-5">
          GDPR.eu. (2024). What is a Data Processing Agreement?
          <em> GDPR.eu</em>.
          <a href="https://gdpr.eu/what-is-data-processing-agreement/" target="_blank" rel="noopener noreferrer"> https://gdpr.eu/what-is-data-processing-agreement/</a>
        </li>
        <li key="ref-6">
          Information Commissioner's Office. (2024). International transfers of personal data.
          <em> ICO</em>.
          <a href="https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/international-transfers/" target="_blank" rel="noopener noreferrer"> https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/international-transfers/</a>
        </li>
        <li key="ref-7">
          Information Commissioner's Office. (2024). Personal data breaches.
          <em> ICO</em>.
          <a href="https://ico.org.uk/for-organisations/report-a-breach/personal-data-breach/" target="_blank" rel="noopener noreferrer"> https://ico.org.uk/for-organisations/report-a-breach/personal-data-breach/</a>
        </li>
        <li key="ref-8">
          Information Commissioner's Office. (2024). Guide to the UK GDPR.
          <em> ICO</em>.
          <a href="https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/" target="_blank" rel="noopener noreferrer"> https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/</a>
        </li>
        <li key="ref-9">
          ISO. (2022). ISO/IEC 27001:2022 Information Security Management.
          <em> International Organization for Standardization</em>.
          <a href="https://www.iso.org/standard/27001" target="_blank" rel="noopener noreferrer"> https://www.iso.org/standard/27001</a>
        </li>
        <li key="ref-10">
          Microsoft. (2019). One simple action you can take to prevent 99.9% of attacks on your accounts.
          <em> Microsoft Security Blog</em>.
          <a href="https://www.microsoft.com/en-us/security/blog/2019/08/20/one-simple-action-you-can-take-to-prevent-99-9-percent-of-account-attacks/" target="_blank" rel="noopener noreferrer"> https://www.microsoft.com/en-us/security/blog/2019/08/20/one-simple-action-you-can-take-to-prevent-99-9-percent-of-account-attacks/</a>
        </li>
        <li key="ref-11">
          NIST. (2024). Cybersecurity Framework 2.0.
          <em> National Institute of Standards and Technology</em>.
          <a href="https://www.nist.gov/cyberframework" target="_blank" rel="noopener noreferrer"> https://www.nist.gov/cyberframework</a>
        </li>
        <li key="ref-12">
          TechTarget. (2025). PowerSchool data breach: Explaining how it happened.
          <em> TechTarget</em>.
          <a href="https://www.techtarget.com/whatis/feature/PowerSchool-data-breach-Explaining-how-it-happened" target="_blank" rel="noopener noreferrer"> https://www.techtarget.com/whatis/feature/PowerSchool-data-breach-Explaining-how-it-happened</a>
        </li>
        <li key="ref-13">
          US Department of Education. (2024). Student Privacy Policy Office.
          <em> Protecting Student Privacy</em>.
          <a href="https://studentprivacy.ed.gov/" target="_blank" rel="noopener noreferrer"> https://studentprivacy.ed.gov/</a>
        </li>
        <li key="ref-14">
          Information Commissioner's Office. (2024). Children and the UK GDPR.
          <em> ICO</em>.
          <a href="https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/childrens-information/children-and-the-uk-gdpr/" target="_blank" rel="noopener noreferrer"> https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/childrens-information/children-and-the-uk-gdpr/</a>
        </li>
      </ul>
    </div>

    <h2>関連記事</h2>
    <ul>
      <li><a href="/blog/royal-society-partnership-grants-vr-science-labs">英国の学校：VR理科実験室に3,000ポンドの助成金を取得</a></li>
      <li><a href="/blog/teachers-are-experts-custom-experiment-designer">教師は専門家です。私たちはツールを作るだけです。</a></li>
      <li><a href="/blog/ai-assessment-crisis-solution">AI検出は機能しません。プロセスベースの評価は機能します。</a></li>
    </ul>
  </>
);

