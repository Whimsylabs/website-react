/**
 * Localized SEO metadata for grant pages, SINGLE SOURCE OF TRUTH.
 *
 * Used by both build.js (getPageMetadata) and scripts/metadata-injector.js
 * (getDefaultMetadata) so the two never drift apart. Each route has per-language
 * { title, description, keywords }.
 *
 * Constraints (enforced by validators):
 *  - title  <= 70 chars (validate-title-length), includes "| WhimsyLabs"
 *  - description >= 120 chars for en/es/fr/de (validate-meta-descriptions);
 *    Japanese (jp) is intentionally shorter, characters pack more meaning.
 *  - titles & descriptions must be unique across pages (validate-seo-uniqueness)
 */

const GRANT_META = {
  '/grants': {
    en: {
      title: 'STEM Grants & School Funding | WhimsyLabs',
      description: 'Discover current grants and school funding routes for virtual science labs across the UK, EU, US and Japan. WhimsyLabs offers free demos and application support.',
      keywords: 'STEM grants, school funding, virtual lab grants, science education funding, VR lab funding',
    },
    es: {
      title: 'Becas STEM y Financiación Escolar | WhimsyLabs',
      description: 'Descubre becas y vías de financiación escolar para laboratorios de ciencias virtuales en Reino Unido, UE, EE. UU. y Japón. WhimsyLabs ofrece demos gratuitas y apoyo.',
      keywords: 'becas STEM, financiación escolar, laboratorios virtuales, ayudas educación científica',
    },
    fr: {
      title: 'Subventions STEM et Financement | WhimsyLabs',
      description: 'Découvrez les subventions et voies de financement scolaire pour des laboratoires de sciences virtuels au Royaume-Uni, dans l’UE, aux États-Unis et au Japon.',
      keywords: 'subventions STEM, financement scolaire, laboratoires virtuels, financement éducation scientifique',
    },
    de: {
      title: 'STEM-Förderung für Schulen | WhimsyLabs',
      description: 'Entdecken Sie aktuelle Zuschüsse und Schulfinanzierung für virtuelle Naturwissenschaftslabore in UK, der EU, den USA und Japan. WhimsyLabs bietet kostenlose Demos.',
      keywords: 'STEM-Förderung, Schulfinanzierung, virtuelle Labore, MINT Zuschüsse, Fördermittel Schule',
    },
    jp: {
      title: 'STEM助成金と学校資金 | WhimsyLabs',
      description: '英国・EU・米国・日本で、バーチャル理科実験室を導入するための最新の助成金・学校資金をご紹介します。WhimsyLabsは無料デモと申請サポートを提供します。',
      keywords: 'STEM助成金, 学校資金, バーチャル実験室, 理科教育, 助成金 申請',
    },
  },

  '/grants/royal-society': {
    en: {
      title: 'Royal Society Partnership Grants | WhimsyLabs',
      description: 'UK schools can apply for up to £3,000 for investigative STEM projects with a partner. WhimsyLabs is your STEM partner, providing free virtual lab software and support.',
      keywords: 'Royal Society Partnership Grants, UK school grants, STEM funding UK, VR lab grants',
    },
    es: {
      title: 'Becas Royal Society Partnership | WhimsyLabs',
      description: 'Los colegios del Reino Unido pueden solicitar hasta £3.000 para proyectos STEM de investigación con un socio. WhimsyLabs es tu socio STEM con software gratuito.',
      keywords: 'becas Royal Society, ayudas escolares Reino Unido, financiación STEM, laboratorios virtuales',
    },
    fr: {
      title: 'Subventions Royal Society Partnership | WhimsyLabs',
      description: 'Les écoles britanniques peuvent demander jusqu’à 3 000 £ pour des projets STEM d’investigation avec un partenaire. WhimsyLabs est votre partenaire STEM gratuit.',
      keywords: 'subventions Royal Society, financement scolaire Royaume-Uni, financement STEM, laboratoires virtuels',
    },
    de: {
      title: 'Royal Society Partnership Grants für Schulen | WhimsyLabs',
      description: 'Britische Schulen können bis zu £3.000 für forschende STEM-Projekte mit einem Partner beantragen. WhimsyLabs ist Ihr STEM-Partner mit kostenloser Laborsoftware.',
      keywords: 'Royal Society Partnership Grants, Schulförderung UK, STEM-Förderung, virtuelle Labore',
    },
    jp: {
      title: 'Royal Society 連携助成金 | WhimsyLabs',
      description: '英国の学校はパートナーとの探究型STEMプロジェクトに最大£3,000を申請できます。WhimsyLabsがSTEMパートナーとして無料の実験室ソフトと支援を提供します。',
      keywords: 'Royal Society 助成金, 英国 学校助成金, STEM 資金, バーチャル実験室',
    },
  },

  '/grants/science-community': {
    en: {
      title: 'Royal Society Science Community Grant | WhimsyLabs',
      description: 'The Royal Society Science Community Grant offers up to £105,000 over 3 years for organisations leading clusters of 25+ schools. WhimsyLabs can be your STEM partner.',
      keywords: 'Science Community Grant, Royal Society funding, school cluster STEM, long-term science grants',
    },
    es: {
      title: 'Beca Science Community Royal Society | WhimsyLabs',
      description: 'La Science Community Grant de la Royal Society ofrece hasta £105.000 en 3 años para entidades que lideran redes de más de 25 colegios. WhimsyLabs es tu socio STEM.',
      keywords: 'Science Community Grant, financiación Royal Society, redes de colegios STEM, becas a largo plazo',
    },
    fr: {
      title: 'Subvention Science Community Royal Society | WhimsyLabs',
      description: 'La Science Community Grant de la Royal Society offre jusqu’à 105 000 £ sur 3 ans aux structures pilotant des réseaux de 25 écoles ou plus. WhimsyLabs, votre partenaire.',
      keywords: 'Science Community Grant, financement Royal Society, réseaux d’écoles STEM, subventions long terme',
    },
    de: {
      title: 'Science Community Grant der Royal Society | WhimsyLabs',
      description: 'Der Science Community Grant der Royal Society bietet bis zu £105.000 über 3 Jahre für Organisationen, die Netzwerke von 25+ Schulen leiten. WhimsyLabs als STEM-Partner.',
      keywords: 'Science Community Grant, Royal Society Förderung, Schulnetzwerke STEM, langfristige Förderung',
    },
    jp: {
      title: 'Science Community 助成金 | WhimsyLabs',
      description: 'Royal SocietyのScience Community Grantは、25校以上のネットワークを率いる団体に3年間で最大£105,000を提供します。WhimsyLabsがSTEMパートナーになります。',
      keywords: 'Science Community Grant, Royal Society 資金, 学校ネットワーク STEM, 長期助成金',
    },
  },

  '/grants/erasmus-plus': {
    en: {
      title: 'Erasmus+ Cooperation Partnerships | WhimsyLabs',
      description: 'EU schools can apply for €120,000–€400,000 through Erasmus+ KA220 Cooperation Partnerships to fund digital tools and teacher training. WhimsyLabs is your tech partner.',
      keywords: 'Erasmus+ grants, KA220 Cooperation Partnerships, EU education funding, STEM school funding',
    },
    es: {
      title: 'Asociaciones de Cooperación Erasmus+ | WhimsyLabs',
      description: 'Los centros de la UE pueden solicitar entre €120.000 y €400.000 mediante las Asociaciones de Cooperación Erasmus+ KA220 para herramientas digitales y formación.',
      keywords: 'becas Erasmus+, KA220 cooperación, financiación educación UE, financiación STEM escolar',
    },
    fr: {
      title: 'Partenariats de Coopération Erasmus+ | WhimsyLabs',
      description: 'Les écoles de l’UE peuvent demander de 120 000 € à 400 000 € via les Partenariats de Coopération Erasmus+ KA220 pour des outils numériques et la formation.',
      keywords: 'subventions Erasmus+, KA220 coopération, financement éducation UE, financement STEM',
    },
    de: {
      title: 'Erasmus+ Kooperationspartnerschaften | WhimsyLabs',
      description: 'EU-Schulen können €120.000–€400.000 über Erasmus+ KA220 Kooperationspartnerschaften für digitale Werkzeuge und Lehrerfortbildung beantragen. WhimsyLabs als Partner.',
      keywords: 'Erasmus+ Förderung, KA220 Kooperationspartnerschaften, EU Bildungsförderung, STEM Förderung',
    },
    jp: {
      title: 'Erasmus+ 協力パートナーシップ | WhimsyLabs',
      description: 'EUの学校はErasmus+ KA220協力パートナーシップを通じて、デジタルツールと教員研修のために€120,000〜€400,000を申請できます。WhimsyLabsが技術パートナーです。',
      keywords: 'Erasmus+ 助成金, KA220 協力, EU教育資金, STEM 学校資金',
    },
  },

  '/grants/japan-education': {
    en: {
      title: 'Japan Education Grants for Virtual Labs | WhimsyLabs',
      description: 'Fund virtual science labs in Japan: GIGA School devices plus foundation grants (Panasonic, Takeda, Mitsubishi Mirai) for science software and STEAM projects.',
      keywords: 'Japan education grants, MEXT GIGA School, Panasonic foundation, STEAM funding Japan, science software',
    },
    es: {
      title: 'Becas Educativas de Japón | WhimsyLabs',
      description: 'Financia laboratorios de ciencias virtuales en Japón: dispositivos GIGA School y becas de fundaciones (Panasonic, Takeda) para software científico y proyectos STEAM.',
      keywords: 'becas educación Japón, MEXT GIGA School, fundación Panasonic, financiación STEAM, software científico',
    },
    fr: {
      title: 'Subventions Éducatives du Japon | WhimsyLabs',
      description: 'Financez des laboratoires de sciences virtuels au Japon : appareils GIGA School et subventions de fondations (Panasonic, Takeda) pour logiciels et projets STEAM.',
      keywords: 'subventions éducation Japon, MEXT GIGA School, fondation Panasonic, financement STEAM, logiciel scientifique',
    },
    de: {
      title: 'Bildungsförderung Japan für virtuelle Labore | WhimsyLabs',
      description: 'Finanzieren Sie virtuelle Naturwissenschaftslabore in Japan: GIGA-School-Geräte plus Stiftungsförderung (Panasonic, Takeda) für Wissenschaftssoftware und STEAM-Projekte.',
      keywords: 'Bildungsförderung Japan, MEXT GIGA School, Panasonic Stiftung, STEAM Förderung, Wissenschaftssoftware',
    },
    jp: {
      title: '日本の教育助成金 | WhimsyLabs',
      description: '日本でバーチャル理科実験室を導入：GIGAスクールの端末に加え、財団助成金（パナソニック教育財団、武田科学振興財団、三菱みらい育成財団）で理科ソフトやSTEAMを支援します。',
      keywords: '日本 教育助成金, MEXT GIGAスクール, パナソニック教育財団, STEAM 資金, 理科ソフトウェア',
    },
  },

  '/grants/british-science-week': {
    en: {
      title: 'British Science Week Kick Start Grants | WhimsyLabs',
      description: 'British Science Week Kick Start Grants give schools in challenging circumstances £400 to run science activities each March. WhimsyLabs offers free demo access.',
      keywords: 'British Science Week, Kick Start Grants, school science events, science week funding',
    },
    es: {
      title: 'Becas Kick Start British Science Week | WhimsyLabs',
      description: 'Las Kick Start Grants de la British Science Week dan £400 a colegios en circunstancias difíciles para actividades científicas cada marzo. WhimsyLabs ofrece demo gratis.',
      keywords: 'British Science Week, becas Kick Start, eventos científicos escolares, financiación semana ciencia',
    },
    fr: {
      title: 'Subventions Kick Start British Science Week | WhimsyLabs',
      description: 'Les Kick Start Grants de la British Science Week offrent 400 £ aux écoles en difficulté pour des activités scientifiques chaque mars. WhimsyLabs propose une démo gratuite.',
      keywords: 'British Science Week, subventions Kick Start, événements scientifiques scolaires, financement',
    },
    de: {
      title: 'British Science Week Kick-Start-Förderung | WhimsyLabs',
      description: 'Die Kick Start Grants der British Science Week geben Schulen in schwierigen Lagen £400 für Wissenschaftsaktivitäten jeden März. WhimsyLabs bietet kostenlosen Demo-Zugang.',
      keywords: 'British Science Week, Kick Start Grants, Schul-Wissenschaftsevents, Förderung Wissenschaftswoche',
    },
    jp: {
      title: 'British Science Week 助成金 | WhimsyLabs',
      description: 'British Science WeekのKick Start Grantsは、困難な状況にある学校に毎年3月の科学活動向けに£400を提供します。WhimsyLabsは無料デモを提供します。',
      keywords: 'British Science Week, Kick Start 助成金, 学校 科学イベント, サイエンスウィーク 資金',
    },
  },

  '/grants/armourers': {
    en: {
      title: 'Armourers & Brasiers Science Grants | WhimsyLabs',
      description: 'The Armourers & Brasiers Gauntlet Trust funds up to £600 (primary) and £1,000 (secondary) for practical science in UK schools. WhimsyLabs delivers affordable practical labs.',
      keywords: 'Armourers and Brasiers grant, practical science funding, UK school science grants, science equipment',
    },
    es: {
      title: 'Becas de Ciencia Armourers & Brasiers | WhimsyLabs',
      description: 'El Armourers & Brasiers Gauntlet Trust financia hasta £600 (primaria) y £1.000 (secundaria) para ciencia práctica en colegios del Reino Unido. WhimsyLabs ofrece laboratorios.',
      keywords: 'beca Armourers Brasiers, financiación ciencia práctica, becas ciencia Reino Unido, equipamiento',
    },
    fr: {
      title: 'Subventions Science Armourers & Brasiers | WhimsyLabs',
      description: 'Le Armourers & Brasiers Gauntlet Trust finance jusqu’à 600 £ (primaire) et 1 000 £ (secondaire) pour la science pratique dans les écoles britanniques. WhimsyLabs aide.',
      keywords: 'subvention Armourers Brasiers, financement science pratique, subventions science Royaume-Uni',
    },
    de: {
      title: 'Armourers & Brasiers Wissenschaftsförderung | WhimsyLabs',
      description: 'Der Armourers & Brasiers Gauntlet Trust fördert bis zu £600 (Primar) und £1.000 (Sekundar) für praktische Naturwissenschaft an britischen Schulen. WhimsyLabs unterstützt.',
      keywords: 'Armourers Brasiers Förderung, praktische Wissenschaft, Schulförderung UK, Wissenschaftsausstattung',
    },
    jp: {
      title: 'Armourers & Brasiers 科学助成金 | WhimsyLabs',
      description: 'Armourers & Brasiers Gauntlet Trustは、英国の学校での実践的な理科のために最大£600（初等）・£1,000（中等）を助成します。WhimsyLabsが手頃な実験を提供します。',
      keywords: 'Armourers Brasiers 助成金, 実践的理科 資金, 英国 学校 科学助成金, 理科設備',
    },
  },

  '/grants/uk-school-funding': {
    en: {
      title: 'Fund Virtual Labs with Pupil Premium | WhimsyLabs',
      description: 'UK schools can fund WhimsyLabs from existing budgets, Pupil Premium (£1,100–£2,690 per pupil) and the notional SEN budget both allow instructional and assistive software.',
      keywords: 'Pupil Premium software, SEN budget technology, UK school funding, fund virtual labs, SEND accessibility',
    },
    es: {
      title: 'Financiar Laboratorios con Pupil Premium | WhimsyLabs',
      description: 'Los colegios del Reino Unido pueden financiar WhimsyLabs con presupuestos existentes: Pupil Premium (£1.100–£2.690 por alumno) y el presupuesto SEN permiten software educativo.',
      keywords: 'Pupil Premium software, presupuesto SEN, financiación escolar Reino Unido, laboratorios virtuales',
    },
    fr: {
      title: 'Financer les Labos avec le Pupil Premium | WhimsyLabs',
      description: 'Les écoles britanniques peuvent financer WhimsyLabs sur leurs budgets : le Pupil Premium (1 100–2 690 £ par élève) et le budget SEN autorisent les logiciels pédagogiques.',
      keywords: 'Pupil Premium logiciel, budget SEN, financement scolaire Royaume-Uni, laboratoires virtuels',
    },
    de: {
      title: 'Virtuelle Labore mit Pupil Premium finanzieren | WhimsyLabs',
      description: 'Britische Schulen können WhimsyLabs aus vorhandenen Budgets finanzieren: Pupil Premium (£1.100–£2.690 pro Schüler) und das SEN-Budget erlauben Lern- und Hilfssoftware.',
      keywords: 'Pupil Premium Software, SEN-Budget, Schulfinanzierung UK, virtuelle Labore, Inklusion',
    },
    jp: {
      title: 'Pupil Premium で実験室を導入 | WhimsyLabs',
      description: '英国の学校は既存の予算でWhimsyLabsを導入できます。Pupil Premium（生徒1人£1,100〜£2,690）と特別支援（SEN）予算は教育・支援ソフトウェアに利用可能です。',
      keywords: 'Pupil Premium ソフトウェア, SEN予算, 英国 学校資金, バーチャル実験室, 特別支援',
    },
  },

  '/grants/us-education': {
    en: {
      title: 'US School Funding for Virtual Labs | WhimsyLabs',
      description: 'US schools can fund WhimsyLabs through Title IV-A technology funds and DonorsChoose, where digital subscriptions and VR are eligible. We support your application.',
      keywords: 'Title IV-A funding, DonorsChoose, US school grants, K-12 STEM funding, instructional software',
    },
    es: {
      title: 'Financiación Escolar de EE. UU. | WhimsyLabs',
      description: 'Los colegios de EE. UU. pueden financiar WhimsyLabs con fondos de tecnología del Título IV-A y DonorsChoose, donde las suscripciones digitales son elegibles.',
      keywords: 'financiación Título IV-A, DonorsChoose, becas escolares EE. UU., financiación STEM K-12',
    },
    fr: {
      title: 'Financement Scolaire aux États-Unis | WhimsyLabs',
      description: 'Les écoles américaines peuvent financer WhimsyLabs via le Title IV-A « Effective Use of Technology » et DonorsChoose, où les abonnements numériques sont éligibles.',
      keywords: 'financement Title IV-A, DonorsChoose, subventions écoles États-Unis, financement STEM K-12',
    },
    de: {
      title: 'US-Schulfinanzierung für virtuelle Labore | WhimsyLabs',
      description: 'US-Schulen können WhimsyLabs über Title-IV-A-Technologiemittel und DonorsChoose finanzieren, wo digitale Abonnements förderfähig sind. Wir unterstützen Sie.',
      keywords: 'Title IV-A Förderung, DonorsChoose, US Schulförderung, K-12 STEM Förderung, Lernsoftware',
    },
    jp: {
      title: '米国の学校資金で実験室を導入 | WhimsyLabs',
      description: '米国の学校はTitle IV-A「効果的な技術活用」やDonorsChoose（デジタル定期購読が対象）でWhimsyLabsを導入できます。WhimsyLabsが申請を支援します。',
      keywords: 'Title IV-A 資金, DonorsChoose, 米国 学校助成金, K-12 STEM 資金, 教育ソフトウェア',
    },
  },

  '/grants/inclusive-mainstream-fund': {
    en: {
      title: 'Inclusive Mainstream Fund for Schools | WhimsyLabs',
      description: 'English schools get Inclusive Mainstream Fund money in 2026-27, no application needed. Fund accessible practical science with WhimsyLabs and get inclusion strategy support.',
      keywords: 'Inclusive Mainstream Fund, IMF schools, inclusion strategy, SEND funding, accessible practical science, inclusive practice fund',
    },
    es: {
      title: 'Fondo Inclusive Mainstream para Escuelas | WhimsyLabs',
      description: 'Las escuelas inglesas reciben el Inclusive Mainstream Fund en 2026-27 sin solicitud. Financia ciencia práctica accesible con WhimsyLabs y recibe apoyo con tu estrategia.',
      keywords: 'Inclusive Mainstream Fund, fondo inclusión escuelas, financiación SEND, ciencia práctica accesible',
    },
    fr: {
      title: 'Fonds Inclusive Mainstream pour les Écoles | WhimsyLabs',
      description: 'Les écoles anglaises reçoivent le Inclusive Mainstream Fund en 2026-27 sans candidature. Financez des sciences pratiques accessibles avec WhimsyLabs et votre stratégie.',
      keywords: 'Inclusive Mainstream Fund, fonds inclusion écoles, financement SEND, sciences pratiques accessibles',
    },
    de: {
      title: 'Inclusive Mainstream Fund für Schulen | WhimsyLabs',
      description: 'Englische Schulen erhalten 2026-27 Mittel aus dem Inclusive Mainstream Fund, ohne Antrag. Finanzieren Sie barrierefreie praktische Naturwissenschaft mit WhimsyLabs.',
      keywords: 'Inclusive Mainstream Fund, Inklusionsförderung Schulen, SEND Förderung, barrierefreie Naturwissenschaft',
    },
    jp: {
      title: '英国インクルーシブ教育基金と実験室 | WhimsyLabs',
      description: '英国の学校は2026-27年度にInclusive Mainstream Fundの配分を申請不要で受け取ります。WhimsyLabsでバリアのない実践的な理科を実現し、戦略作成も支援します。',
      keywords: 'Inclusive Mainstream Fund, インクルーシブ教育 資金, SEND 支援, バリアフリー 理科実験',
    },
  },
};

/**
 * Return localized grant metadata for a route, or null if not a grant route.
 * @param {string} route - normalized route, no trailing slash, no lang prefix (e.g. /grants/royal-society)
 * @param {string} lang - en | es | fr | de | jp
 */
function getGrantMetadata(route, lang) {
  const entry = GRANT_META[route];
  if (!entry) return null;
  return entry[lang] || entry.en;
}

module.exports = { GRANT_META, getGrantMetadata };
