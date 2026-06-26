/**
 * Japanese translations for Japan Education Grant Page
 * Uses proper keigo (敬語) throughout - formal business Japanese appropriate for educators
 */

const jaTranslations = {
  hero: {
    title: "日本の教育助成金",
    subtitleStrong: "理科教育向けのICT教材導入に活用できる助成金をご紹介いたします。",
    subtitleText: "WhimsyLabsは申請書作成をお手伝いし、無料デモを提供いたします。GIGAスクール標準のChromebookで快適にご利用いただけます。",
    badge1: "🎁 無料デモ提供",
    badge2: "📝 申請サポート",
    badge3: "💻 GIGAスクール対応",
    ctaPrimary: "お問い合わせ",
    ctaSecondary: "助成金一覧",
    ctaTertiary: "GIGAスクール対応"
  },

  about: {
    title: "WhimsyLabsのシミュレーション教材について",
    description: "WhimsyLabsは、物理・化学・生物のvirtual lab（仮想実験室）を提供するシミュレーション教材です。実験室の設備やスペースに制約のある学校でも、リアルな科学実験を体験できます。文部科学省や各種助成金を活用して、貴校でもご導入いただけます。",
    card1: {
      title: "助成金の活用",
      text: "MEXT（文部科学省）やJSPS科研費など、様々な助成金を活用してICT教材を導入できます。申請に必要な資料をご提供いたします。"
    },
    card2: {
      title: "GIGAスクール完全対応",
      text: "WhimsyLabsはChromebook、Windows、iPadなど、GIGAスクール構想で配布された端末すべてで動作いたします。追加のハードウェアは不要です。"
    },
    card3: {
      title: "申請サポート",
      text: "助成金申請に必要な技術仕様書、教育効果の根拠資料、導入計画書などをご用意いたします。お気軽にご相談ください。"
    }
  },

  giga: {
    title: "GIGAスクール構想との互換性",
    description: "WhimsyLabsは、GIGAスクール構想で全国の児童・生徒に配布された端末で快適にご利用いただけるよう設計されております。",
    compatible: {
      title: "対応端末",
      items: [
        "Chromebook（GIGAスクール標準仕様）",
        "Windows PC / タブレット",
        "iPad / iOS端末",
        "Androidタブレット",
        "VRヘッドセット（オプション）"
      ]
    },
    benefits: {
      title: "導入のメリット",
      items: [
        "追加のハードウェア購入が不要",
        "既存のGIGA端末をそのまま活用",
        "インストール不要のWebベース",
        "学校のネットワーク環境で動作",
        "生徒一人一台で個別学習が可能"
      ]
    }
  },

  grants: {
    title: "主要な助成金制度",
    description: "以下は、ICT教材や理科教育設備の導入に活用できる代表的な助成金制度です。WhimsyLabsでは、これらの申請に必要な資料をご提供いたします。",
    
    mext: {
      title: "文部科学省 教育ICT活用推進事業",
      subtitle: "Ministry of Education, Culture, Sports, Science and Technology",
      description: "文部科学省では、GIGAスクール構想の推進に伴い、ICTを活用した教育の質的向上を目的とした各種事業を実施しております。デジタル教材の導入や教員研修などに活用できます。",
      targetLabel: "対象",
      target: "公立・私立の小学校、中学校、高等学校",
      purposeLabel: "主な用途",
      purpose: "ICT機器、デジタル教材、教員研修",
      highlight: "WhimsyLabsは「デジタル教材」として申請可能です。教育効果を示すエビデンス資料をご提供いたします。"
    },

    jsps: {
      title: "JSPS 科学研究費助成事業（科研費）",
      subtitle: "Japan Society for the Promotion of Science - Grants-in-Aid for Scientific Research",
      description: "日本学術振興会が運営する科研費は、大学や高等専門学校における研究活動を支援する制度です。教育方法の研究や教材開発プロジェクトにご活用いただけます。",
      targetLabel: "対象",
      target: "大学、高等専門学校、研究機関",
      amountLabel: "助成額",
      amount: "研究種目により異なる（数十万円〜数千万円）",
      highlight: "シミュレーション教材を用いた理科教育の効果研究などでご活用いただけます。共同研究のご相談も承ります。"
    },

    gigaGrant: {
      title: "GIGAスクール構想関連補助金",
      subtitle: "GIGA School Program Related Subsidies",
      description: "GIGAスクール構想の第2フェーズでは、端末の更新だけでなく、教育コンテンツの充実も重点項目となっております。各自治体の補助金をご活用いただけます。",
      targetLabel: "対象",
      target: "市区町村教育委員会、公立学校",
      focusLabel: "重点分野",
      focus: "デジタル教材、学習支援システム、教員研修",
      highlight: "WhimsyLabsはGIGAスクール標準端末で動作するため、追加のハードウェア費用なくコンテンツ費用のみで導入いただけます。"
    }
  },

  help: {
    title: "WhimsyLabsの申請サポート",
    description: "助成金申請にあたり、以下のサポートを無料でご提供いたします。お気軽にお問い合わせください。",
    features: [
      {
        icon: "📄",
        title: "技術仕様書",
        text: "システム要件、セキュリティ対策、データ保護方針など、申請に必要な技術情報をまとめた資料をご提供いたします。"
      },
      {
        icon: "📊",
        title: "教育効果エビデンス",
        text: "仮想実験室の学習効果を示す研究データ、海外での導入実績などをまとめた資料をご用意しております。"
      },
      {
        icon: "📋",
        title: "導入計画書テンプレート",
        text: "カリキュラムへの組み込み方、指導計画の例など、導入計画書の作成に役立つテンプレートをご提供いたします。"
      },
      {
        icon: "🎥",
        title: "無料デモ・体験会",
        text: "審査員や関係者向けのデモンストレーション、教員向け体験会の開催をサポートいたします。"
      },
      {
        icon: "💬",
        title: "申請書レビュー",
        text: "申請書のドラフトを拝見し、技術的な記載内容についてアドバイスさせていただきます。"
      },
      {
        icon: "🤝",
        title: "継続的なサポート",
        text: "導入後も、教員研修や運用サポートを継続的にご提供いたします。成果報告書の作成もお手伝いいたします。"
      }
    ]
  },

  apply: {
    title: "お問い合わせ・ご相談",
    description: "助成金を活用したWhimsyLabs導入についてのご相談を承っております。まずは無料デモをご体験いただき、貴校に最適なプランをご提案させていただきます。",
    form: {
      name: "お名前",
      namePlaceholder: "例：山田 太郎",
      school: "学校名・機関名",
      schoolPlaceholder: "例：○○市立△△中学校",
      email: "メールアドレス",
      emailPlaceholder: "例：yamada@school.ed.jp",
      role: "役職",
      rolePlaceholder: "例：理科主任、教頭",
      grantType: "ご検討中の助成金",
      grantTypeOptions: {
        select: "選択してください...",
        mext: "文部科学省関連事業",
        jsps: "JSPS科研費",
        giga: "GIGAスクール関連補助金",
        other: "その他・未定"
      },
      message: "ご質問・ご要望",
      messagePlaceholder: "導入をご検討の教科、生徒数、ご質問などがございましたらお聞かせください。",
      submit: "送信する",
      sending: "送信中...",
      success: "お問い合わせありがとうございます。2営業日以内にご連絡させていただきます。",
      error: "送信に失敗しました。恐れ入りますが、hello@whimsylabs.ai まで直接ご連絡ください。"
    }
  },

  cta: {
    title: "まずは無料デモをお試しください",
    description: "WhimsyLabsの仮想実験室を実際にご体験いただき、貴校の理科教育にどのように活用できるかをご確認ください。助成金申請のサポートも含め、導入に向けて全面的にお手伝いいたします。",
    primaryButton: "無料デモを申し込む",
    secondaryButton: "文部科学省サイト"
  }
};

export default jaTranslations;
