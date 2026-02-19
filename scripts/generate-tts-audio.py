#!/usr/bin/env python3
"""
TTS Audio Generator for WhimsyLabs Website
Generates MP3 files for each page in each language using Edge TTS.

Usage:
    pip install edge-tts
    python scripts/generate-tts-audio.py

Output:
    public/audio/{lang}/{page}.mp3
    public/audio/manifest.json
"""

import asyncio
import json
import os
import re
from pathlib import Path

try:
    import edge_tts
except ImportError:
    print("Error: edge-tts not installed. Run: pip install edge-tts")
    exit(1)

# Voice configuration per language
VOICES = {
    'en': 'en-GB-SoniaNeural',      # British English, friendly female
    'es': 'es-ES-ElviraNeural',      # Spanish, clear female
    'fr': 'fr-FR-DeniseNeural',      # French, clear female
    'de': 'de-DE-KatjaNeural',       # German, clear female
    'jp': 'ja-JP-NanamiNeural',      # Japanese, natural female
}

# Content to generate TTS for (extracted from translations.js)
# Format: { page_id: { lang: "text to read" } }
PAGES = {
    'contact': {
        'en': """
            Contact WhimsyLabs. Get in Touch. 
            Have questions about our virtual laboratory software? 
            We'd love to hear from you. Fill out the form below and our team will respond within 24 hours.
            Send us a message. Your name. Your email. Your message.
            Prefer email? Reach us directly at hello@whimsylabs.ai
        """,
        'es': """
            Contactar con WhimsyLabs. Ponte en Contacto.
            ¿Tienes preguntas sobre nuestro software de laboratorio virtual?
            Nos encantaría saber de ti. Completa el formulario y nuestro equipo responderá en 24 horas.
            Envíanos un mensaje. Tu nombre. Tu correo electrónico. Tu mensaje.
            ¿Prefieres email? Escríbenos directamente a hello@whimsylabs.ai
        """,
        'fr': """
            Contacter WhimsyLabs. Contactez-nous.
            Vous avez des questions sur notre logiciel de laboratoire virtuel?
            Nous serions ravis de vous entendre. Remplissez le formulaire et notre équipe vous répondra dans les 24 heures.
            Envoyez-nous un message. Votre nom. Votre email. Votre message.
            Vous préférez l'email? Contactez-nous directement à hello@whimsylabs.ai
        """,
        'de': """
            WhimsyLabs kontaktieren. Kontaktieren Sie uns.
            Haben Sie Fragen zu unserer virtuellen Laborsoftware?
            Wir würden gerne von Ihnen hören. Füllen Sie das Formular aus und unser Team wird innerhalb von 24 Stunden antworten.
            Senden Sie uns eine Nachricht. Ihr Name. Ihre E-Mail. Ihre Nachricht.
            Bevorzugen Sie E-Mail? Erreichen Sie uns direkt unter hello@whimsylabs.ai
        """,
        'jp': """
            WhimsyLabsへのお問い合わせ。
            バーチャルラボソフトウェアについてご質問がありますか？
            お気軽にお問い合わせください。フォームにご記入いただければ、24時間以内にチームからご連絡いたします。
            メッセージを送る。お名前。メールアドレス。メッセージ。
            メールをご希望の場合は、hello@whimsylabs.ai まで直接ご連絡ください。
        """,
    },
    
    'faq': {
        'en': """
            Virtual Lab FAQ. Online Lab Simulation Questions.
            Find answers to common questions about our virtual lab and online lab simulation software for STEM education.
            What is WhimsyLabs? WhimsyLabs is a virtual laboratory platform that allows students to conduct realistic science experiments in a safe, digital environment.
            How does the AI tutor work? Our AI tutor provides real-time guidance and feedback as students conduct experiments, helping them understand concepts and correct mistakes.
            What devices are supported? WhimsyLabs works on VR headsets, computers, tablets, and smartphones, ensuring accessibility for all students.
            Is it safe for students? Yes, all experiments are conducted virtually with no physical risks. Student data is protected and never sold.
        """,
        'es': """
            Preguntas frecuentes sobre laboratorio virtual. Preguntas sobre simulación de laboratorio en línea.
            Encuentra respuestas a preguntas comunes sobre nuestro laboratorio virtual y software de simulación para educación STEM.
            ¿Qué es WhimsyLabs? WhimsyLabs es una plataforma de laboratorio virtual que permite a los estudiantes realizar experimentos científicos realistas en un entorno digital seguro.
            ¿Cómo funciona el tutor de IA? Nuestro tutor de IA proporciona orientación y retroalimentación en tiempo real mientras los estudiantes realizan experimentos.
            ¿Qué dispositivos son compatibles? WhimsyLabs funciona en visores de realidad virtual, computadoras, tabletas y teléfonos inteligentes.
            ¿Es seguro para los estudiantes? Sí, todos los experimentos se realizan virtualmente sin riesgos físicos. Los datos de los estudiantes están protegidos.
        """,
        'fr': """
            FAQ Laboratoire Virtuel. Questions sur la Simulation de Laboratoire en Ligne.
            Trouvez des réponses aux questions courantes sur notre laboratoire virtuel et logiciel de simulation pour l'éducation STEM.
            Qu'est-ce que WhimsyLabs? WhimsyLabs est une plateforme de laboratoire virtuel permettant aux étudiants de réaliser des expériences scientifiques réalistes dans un environnement numérique sécurisé.
            Comment fonctionne le tuteur IA? Notre tuteur IA fournit des conseils et des retours en temps réel pendant que les étudiants réalisent leurs expériences.
            Quels appareils sont pris en charge? WhimsyLabs fonctionne sur casques VR, ordinateurs, tablettes et smartphones.
            Est-ce sécurisé pour les étudiants? Oui, toutes les expériences sont virtuelles sans risques physiques. Les données des étudiants sont protégées.
        """,
        'de': """
            Virtuelles Labor FAQ. Fragen zur Online-Laborsimulation.
            Finden Sie Antworten auf häufige Fragen zu unserem virtuellen Labor und der Simulationssoftware für MINT-Bildung.
            Was ist WhimsyLabs? WhimsyLabs ist eine virtuelle Laborplattform, die es Schülern ermöglicht, realistische wissenschaftliche Experimente in einer sicheren digitalen Umgebung durchzuführen.
            Wie funktioniert der KI-Tutor? Unser KI-Tutor bietet Echtzeit-Anleitung und Feedback während die Schüler Experimente durchführen.
            Welche Geräte werden unterstützt? WhimsyLabs funktioniert auf VR-Headsets, Computern, Tablets und Smartphones.
            Ist es sicher für Schüler? Ja, alle Experimente werden virtuell durchgeführt ohne physische Risiken. Schülerdaten werden geschützt.
        """,
        'jp': """
            バーチャルラボFAQ。オンラインラボシミュレーションに関する質問。
            STEM教育のためのバーチャルラボとオンラインラボシミュレーションソフトウェアに関するよくある質問への回答をご覧ください。
            WhimsyLabsとは？WhimsyLabsは、学生が安全なデジタル環境でリアルな科学実験を行えるバーチャルラボプラットフォームです。
            AIチューターはどのように機能しますか？AIチューターは、学生が実験を行う際にリアルタイムでガイダンスとフィードバックを提供します。
            どのデバイスがサポートされていますか？WhimsyLabsはVRヘッドセット、コンピューター、タブレット、スマートフォンで動作します。
            学生にとって安全ですか？はい、すべての実験は物理的なリスクなしに仮想的に行われます。学生データは保護され、販売されることはありません。
        """,
    },
    
    'data-security': {
        'en': """
            Data Security at WhimsyLabs.
            We take the security of student data seriously. Our platform is built with privacy-first principles.
            GDPR Compliant. Student Data Protected. UK-Based Processing. Data Never Sold.
            Student data belongs to students and their schools, never to us. 
            We collect only what's necessary for educational purposes.
            Schools retain full control over their students' data.
        """,
        'es': """
            Seguridad de Datos en WhimsyLabs.
            Nos tomamos en serio la seguridad de los datos de los estudiantes. Nuestra plataforma está construida con principios de privacidad primero.
            Cumplimiento GDPR. Datos de Estudiantes Protegidos. Procesamiento en el Reino Unido. Datos Nunca Vendidos.
            Los datos de los estudiantes pertenecen a los estudiantes y sus escuelas, nunca a nosotros.
            Solo recopilamos lo necesario para fines educativos.
            Las escuelas mantienen el control total sobre los datos de sus estudiantes.
        """,
        'fr': """
            Sécurité des Données chez WhimsyLabs.
            Nous prenons la sécurité des données des étudiants au sérieux. Notre plateforme est construite avec des principes de confidentialité d'abord.
            Conforme au RGPD. Données Étudiantes Protégées. Traitement au Royaume-Uni. Données Jamais Vendues.
            Les données des étudiants appartiennent aux étudiants et à leurs écoles, jamais à nous.
            Nous ne collectons que ce qui est nécessaire à des fins éducatives.
            Les écoles gardent le contrôle total sur les données de leurs étudiants.
        """,
        'de': """
            Datensicherheit bei WhimsyLabs.
            Wir nehmen die Sicherheit von Schülerdaten ernst. Unsere Plattform basiert auf Datenschutz-First-Prinzipien.
            DSGVO-konform. Schülerdaten Geschützt. Verarbeitung in Großbritannien. Daten Werden Nie Verkauft.
            Schülerdaten gehören den Schülern und ihren Schulen, niemals uns.
            Wir erheben nur das, was für Bildungszwecke notwendig ist.
            Schulen behalten die volle Kontrolle über die Daten ihrer Schüler.
        """,
        'jp': """
            WhimsyLabsのデータセキュリティ。
            私たちは学生データのセキュリティを真剣に受け止めています。プラットフォームはプライバシーファーストの原則で構築されています。
            GDPR準拠。学生データ保護。英国でのデータ処理。データは決して販売されません。
            学生データは学生と学校のものであり、私たちのものではありません。
            教育目的に必要なもののみを収集します。
            学校は学生のデータを完全に管理できます。
        """,
    },
    
    'landing': {
        'en': """
            Welcome to WhimsyLabs. The Future of Science Education.
            Virtual laboratories that make STEM learning accessible, engaging, and safe for every student.
            Experience realistic science experiments with our AI-powered virtual lab platform.
            No dangerous chemicals. No expensive equipment. Just pure learning.
            Book a demo today and see how WhimsyLabs can transform your classroom.
        """,
        'es': """
            Bienvenido a WhimsyLabs. El Futuro de la Educación Científica.
            Laboratorios virtuales que hacen el aprendizaje STEM accesible, atractivo y seguro para cada estudiante.
            Experimenta experimentos científicos realistas con nuestra plataforma de laboratorio virtual impulsada por IA.
            Sin químicos peligrosos. Sin equipos costosos. Solo aprendizaje puro.
            Reserva una demostración hoy y descubre cómo WhimsyLabs puede transformar tu aula.
        """,
        'fr': """
            Bienvenue chez WhimsyLabs. L'Avenir de l'Éducation Scientifique.
            Des laboratoires virtuels qui rendent l'apprentissage STEM accessible, engageant et sûr pour chaque étudiant.
            Vivez des expériences scientifiques réalistes avec notre plateforme de laboratoire virtuel alimentée par l'IA.
            Pas de produits chimiques dangereux. Pas d'équipement coûteux. Juste de l'apprentissage pur.
            Réservez une démo aujourd'hui et découvrez comment WhimsyLabs peut transformer votre classe.
        """,
        'de': """
            Willkommen bei WhimsyLabs. Die Zukunft der Naturwissenschaftlichen Bildung.
            Virtuelle Labore, die MINT-Lernen für jeden Schüler zugänglich, ansprechend und sicher machen.
            Erleben Sie realistische wissenschaftliche Experimente mit unserer KI-gestützten virtuellen Laborplattform.
            Keine gefährlichen Chemikalien. Keine teure Ausrüstung. Nur reines Lernen.
            Buchen Sie noch heute eine Demo und sehen Sie, wie WhimsyLabs Ihr Klassenzimmer verwandeln kann.
        """,
        'jp': """
            WhimsyLabsへようこそ。科学教育の未来。
            すべての学生にとってSTEM学習をアクセスしやすく、魅力的で安全なものにするバーチャルラボ。
            AI搭載のバーチャルラボプラットフォームでリアルな科学実験を体験してください。
            危険な化学物質なし。高価な機器なし。純粋な学習だけ。
            今すぐデモを予約して、WhimsyLabsがどのように教室を変革できるかをご覧ください。
        """,
    },
}


def clean_text(text: str) -> str:
    """Clean up text for TTS - remove extra whitespace, normalize."""
    text = re.sub(r'\s+', ' ', text)
    text = text.strip()
    return text


async def generate_audio(text: str, voice: str, output_path: Path) -> bool:
    """Generate MP3 audio file using Edge TTS."""
    try:
        communicate = edge_tts.Communicate(text, voice)
        await communicate.save(str(output_path))
        print(f"  ✓ Generated: {output_path.name}")
        return True
    except Exception as e:
        print(f"  ✗ Failed: {output_path.name} - {e}")
        return False


async def main():
    # Setup paths
    script_dir = Path(__file__).parent
    project_root = script_dir.parent
    output_dir = project_root / 'public' / 'audio'
    
    # Create output directories
    for lang in VOICES.keys():
        (output_dir / lang).mkdir(parents=True, exist_ok=True)
    
    print("🎙️  WhimsyLabs TTS Audio Generator")
    print("=" * 40)
    print(f"Output: {output_dir}")
    print(f"Languages: {', '.join(VOICES.keys())}")
    print(f"Pages: {', '.join(PAGES.keys())}")
    print()
    
    # Generate manifest
    manifest = {
        'generated': '',  # Will be filled at the end
        'voices': VOICES,
        'pages': {}
    }
    
    # Generate audio for each page and language
    tasks = []
    for page_id, translations in PAGES.items():
        manifest['pages'][page_id] = {}
        print(f"📄 {page_id}")
        
        for lang, text in translations.items():
            if lang not in VOICES:
                print(f"  ⚠ Skipping {lang} - no voice configured")
                continue
                
            voice = VOICES[lang]
            clean = clean_text(text)
            output_path = output_dir / lang / f"{page_id}.mp3"
            
            # Track in manifest
            manifest['pages'][page_id][lang] = f"/audio/{lang}/{page_id}.mp3"
            
            # Queue generation
            tasks.append(generate_audio(clean, voice, output_path))
    
    # Run all generations
    results = await asyncio.gather(*tasks)
    
    # Save manifest
    from datetime import datetime
    manifest['generated'] = datetime.now().isoformat()
    manifest_path = output_dir / 'manifest.json'
    with open(manifest_path, 'w') as f:
        json.dump(manifest, f, indent=2)
    
    # Summary
    success = sum(results)
    total = len(results)
    print()
    print("=" * 40)
    print(f"✅ Generated {success}/{total} audio files")
    print(f"📋 Manifest: {manifest_path}")
    print()
    print("Next steps:")
    print("1. Update PageReader.js to use prebaked audio")
    print("2. Commit the audio files to the repo")
    print("3. Deploy!")


if __name__ == '__main__':
    asyncio.run(main())
