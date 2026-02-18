/**
 * Validate Keyword Targeting
 * Ensures pages include target keywords in key locations
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const BUILD_DIR = path.join(__dirname, '../build');

// Target keywords for key pages (expanded 2026)
// Includes translations for DE, ES, FR, JP pages
const PAGE_KEYWORDS = {
  // ============ ENGLISH ============
  // Homepage - broad coverage
  '/index.html': [
    'virtual lab', 'virtual laboratory', 'virtual science lab', 'stem education', 
    'whimsylabs', 'online lab simulation', 'science simulation software',
    'virtual lab for schools', 'AI science tutor', 'VR science lab'
  ],
  // Features - product-specific
  '/features/index.html': [
    'virtual lab', 'physics simulation', 'ai tutor', 'AI science tutor',
    'hands-on virtual learning', 'interactive lab simulation', 'VR science lab',
    'real-time physics', 'automated assessment'
  ],
  // Services - audience-focused
  '/services/index.html': [
    'virtual lab', 'virtual lab for schools', 'classroom lab software', 
    'K-12 virtual lab', 'virtual lab for teachers', 'school science software',
    'STEM teacher shortage solution', 'lab equipment cost reduction'
  ],
  // FAQ - problem/solution keywords
  '/faq/index.html': [
    'virtual lab', 'virtual science lab', 'online lab simulation',
    'safe lab experiments', 'virtual dissection', 'VR lab'
  ],
  // Blog - content/educational
  '/blog/index.html': [
    'virtual lab', 'stem education', 'science education',
    'AI in science education', 'VR STEM learning', 'gamified science learning'
  ],
  // Subject-specific pages
  '/chemistry/index.html': ['virtual chemistry lab', 'chemistry simulation', 'online chemistry lab'],
  '/biology/index.html': ['virtual biology lab', 'virtual dissection', 'online biology lab'],
  '/physics/index.html': ['virtual physics lab', 'physics simulation', 'online physics lab'],

  // ============ GERMAN (DE) ============
  '/de/index.html': [
    'virtuelles labor', 'virtuelle labore', 'online labor', 'MINT bildung',
    'whimsylabs', 'laborsimulation', 'naturwissenschaft software',
    'virtuelles labor schule', 'KI tutor', 'VR labor'
  ],
  '/de/features/index.html': [
    'virtuelles labor', 'physiksimulation', 'KI tutor', 'interaktive simulation',
    'praktisches lernen', 'echtzeit physik', 'automatische bewertung'
  ],
  '/de/services/index.html': [
    'virtuelles labor', 'labor für schulen', 'unterrichtssoftware',
    'schul laborsoftware', 'MINT lehrermangel'
  ],
  '/de/faq/index.html': [
    'virtuelles labor', 'online laborsimulation', 'sichere experimente',
    'virtuelle sektion', 'VR labor'
  ],
  '/de/blog/index.html': [
    'virtuelles labor', 'MINT bildung', 'naturwissenschaftliche bildung',
    'KI in der bildung', 'digitales lernen'
  ],

  // ============ SPANISH (ES) ============
  '/es/index.html': [
    'laboratorio virtual', 'laboratorios virtuales', 'lab virtual', 'educación STEM',
    'whimsylabs', 'simulación de laboratorio', 'software de ciencias',
    'laboratorio virtual escolar', 'tutor IA', 'laboratorio RV'
  ],
  '/es/features/index.html': [
    'laboratorio virtual', 'simulación física', 'tutor IA', 'simulación interactiva',
    'aprendizaje práctico', 'física en tiempo real', 'evaluación automática'
  ],
  '/es/services/index.html': [
    'laboratorio virtual', 'laboratorio para escuelas', 'software educativo',
    'software de laboratorio escolar', 'escasez de profesores STEM'
  ],
  '/es/faq/index.html': [
    'laboratorio virtual', 'simulación de laboratorio online', 'experimentos seguros',
    'disección virtual', 'laboratorio RV'
  ],
  '/es/blog/index.html': [
    'laboratorio virtual', 'educación STEM', 'educación científica',
    'IA en educación', 'aprendizaje digital'
  ],

  // ============ FRENCH (FR) ============
  '/fr/index.html': [
    'laboratoire virtuel', 'laboratoires virtuels', 'labo virtuel', 'éducation STEM',
    'whimsylabs', 'simulation de laboratoire', 'logiciel scientifique',
    'laboratoire virtuel scolaire', 'tuteur IA', 'laboratoire RV'
  ],
  '/fr/features/index.html': [
    'laboratoire virtuel', 'simulation physique', 'tuteur IA', 'simulation interactive',
    'apprentissage pratique', 'physique en temps réel', 'évaluation automatique'
  ],
  '/fr/services/index.html': [
    'laboratoire virtuel', 'laboratoire pour écoles', 'logiciel éducatif',
    'logiciel de laboratoire scolaire', 'pénurie enseignants STEM'
  ],
  '/fr/faq/index.html': [
    'laboratoire virtuel', 'simulation de labo en ligne', 'expériences sécurisées',
    'dissection virtuelle', 'laboratoire RV'
  ],
  '/fr/blog/index.html': [
    'laboratoire virtuel', 'éducation STEM', 'éducation scientifique',
    'IA dans éducation', 'apprentissage numérique'
  ],

  // ============ JAPANESE (JP) ============
  '/jp/index.html': [
    '仮想実験室', 'バーチャルラボ', '仮想ラボ', 'STEM教育',
    'whimsylabs', '実験シミュレーション', '理科教育ソフト',
    '学校向け仮想実験室', 'AIチューター', 'VR実験室'
  ],
  '/jp/features/index.html': [
    '仮想実験室', '物理シミュレーション', 'AIチューター', 'インタラクティブシミュレーション',
    '実践的学習', 'リアルタイム物理', '自動評価'
  ],
  '/jp/services/index.html': [
    '仮想実験室', '学校向けラボ', '教育ソフトウェア',
    '学校用実験室ソフト', 'STEM教員不足'
  ],
  '/jp/faq/index.html': [
    '仮想実験室', 'オンライン実験シミュレーション', '安全な実験',
    'バーチャル解剖', 'VRラボ'
  ],
  '/jp/blog/index.html': [
    '仮想実験室', 'STEM教育', '理科教育',
    'AI教育', 'デジタル学習'
  ],
};

// Check for keyword presence in important locations
function checkKeywordPresence(html, keyword) {
  const lowerHtml = html.toLowerCase();
  const lowerKeyword = keyword.toLowerCase();
  
  const locations = {
    title: false,
    h1: false,
    metaDescription: false,
    firstParagraph: false,
    body: false
  };

  // Check title
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  if (titleMatch && titleMatch[1].toLowerCase().includes(lowerKeyword)) {
    locations.title = true;
  }

  // Check H1 (handles inner HTML like <em> tags)
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (h1Match) {
    // Strip HTML tags to get text content
    const h1Text = h1Match[1].replace(/<[^>]+>/g, '').toLowerCase();
    if (h1Text.includes(lowerKeyword)) {
      locations.h1 = true;
    }
  }

  // Check meta description
  const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]+)"/i) ||
                    html.match(/<meta\s+content="([^"]+)"\s+name="description"/i);
  if (descMatch && descMatch[1].toLowerCase().includes(lowerKeyword)) {
    locations.metaDescription = true;
  }

  // Check first paragraph
  const firstPMatch = html.match(/<p[^>]*>([^<]{50,})<\/p>/i);
  if (firstPMatch && firstPMatch[1].toLowerCase().includes(lowerKeyword)) {
    locations.firstParagraph = true;
  }

  // Check body at all
  if (lowerHtml.includes(lowerKeyword)) {
    locations.body = true;
  }

  return locations;
}

function calculateKeywordScore(locations) {
  let score = 0;
  if (locations.title) score += 30;
  if (locations.h1) score += 25;
  if (locations.metaDescription) score += 20;
  if (locations.firstParagraph) score += 15;
  if (locations.body) score += 10;
  return score;
}

function validateKeywordTargeting() {
  console.log('\n🎯 Keyword Targeting Validation\n');
  console.log('='.repeat(60));

  let totalWarnings = 0;
  const results = [];

  for (const [pagePath, keywords] of Object.entries(PAGE_KEYWORDS)) {
    const fullPath = path.join(BUILD_DIR, pagePath);
    
    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️  ${pagePath} - File not found`);
      continue;
    }

    const html = fs.readFileSync(fullPath, 'utf8');
    const shortPath = pagePath.replace('/index.html', '') || '/';
    
    let pageScore = 0;
    let pageIssues = [];

    for (const keyword of keywords) {
      const locations = checkKeywordPresence(html, keyword);
      const score = calculateKeywordScore(locations);
      pageScore += score;

      if (score < 50) {
        pageIssues.push(`"${keyword}" weak (score: ${score}/100)`);
        if (!locations.title && !locations.h1) {
          pageIssues.push(`  → Missing from title and H1`);
        }
      }
    }

    const avgScore = Math.round(pageScore / keywords.length);
    const status = avgScore >= 60 ? '✅' : avgScore >= 40 ? '⚠️' : '❌';
    
    if (avgScore < 60) {
      totalWarnings++;
    }

    results.push({ path: shortPath, score: avgScore, issues: pageIssues });
    
    console.log(`${status} ${shortPath.padEnd(20)} Score: ${avgScore}/100`);
    if (pageIssues.length > 0 && avgScore < 60) {
      pageIssues.slice(0, 3).forEach(issue => console.log(`   ${issue}`));
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 Keyword Targeting Summary:');
  
  const avgTotal = Math.round(results.reduce((a, b) => a + b.score, 0) / results.length);
  console.log(`   Average score: ${avgTotal}/100`);
  console.log(`   Pages needing work: ${totalWarnings}`);

  // This is a warning-only validator - doesn't fail build
  if (totalWarnings > 0) {
    console.log('\n⚠️  Some pages could improve keyword targeting\n');
  } else {
    console.log('\n✅ Keyword targeting looks good!\n');
  }
}

validateKeywordTargeting();
