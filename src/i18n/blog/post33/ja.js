// Japanese - Post 33: EdTech Critics Response
import React from "react";

export const title = "批評家の指摘は正しい：ほとんどのEdTechは役に立たない";
export const description = "2024年、米国の学校はEdTechに300億ドルを費やしました。批評家たちはそれが無駄だと言います。受動的なスクリーンタイムについては彼らの言う通りです。しかし、生徒が実際に科学を「体験する」仮想実験室は別の話です。";
export const keywords = [
  "EdTech効果",
  "仮想実験室",
  "バーチャルラボ",
  "STEM教育",
  "AIチューター",
  "実験シミュレーション",
  "アクティブラーニング",
  "教育工学批判",
  "受動的学習と能動的学習",
  "OECD デジタル教育"
];

export const content = (
  <>
    <p>
      <em>「教育工学はほとんど役に立たないのか？」</em>と
      <a
        href="https://www.economist.com/letters/2026/02/12/is-education-technology-mostly-useless"
        target="_blank"
        rel="noopener noreferrer"
      >
        The Economist
      </a>
      は問いかけます。<em>「子どもたちは学校で何時間もスクリーンを見ている。それで何が得られるのか？」</em>と
      <a
        href="https://www.bloomberg.com/opinion/articles/2026-02-11/education-technology-isn-t-teaching-us-children-more-effectively"
        target="_blank"
        rel="noopener noreferrer"
      >
        Bloomberg
      </a>
      も同調します。これらは厳しい見出しです。そしてEdTech企業である私たちも、この批判の多くに同意せざるを得ません。
    </p>

    <p>
      Bloombergの記事は驚くべき数字を指摘しています。米国の学校は<strong>2024年に教育工学に300億ドル</strong>を費やしました。これは教科書への支出の10倍です。その投資はどこに向かったのでしょうか？ 主にタブレット、ノートパソコン、学習管理システム、そしてエンゲージメントを約束しながらも、実際にはスクリーンタイム以上のものをほとんど提供しなかったアプリに費やされました。これらの批評家によれば、投資対効果は控えめに言っても疑問が残ります。
    </p>

    <h2>なぜほとんどのEdTechは失敗しているのか？</h2>

    <p>
      批評家たちは間違っていません。ただ、問題を十分に具体的に指摘していないだけです。問題は教育における技術そのものではありません。問題は教育における<strong>受動的な技術</strong>なのです。
    </p>

    <p>
      実際に「EdTech」が現場でどのように使われているかを考えてみましょう。生徒は動画を見たり、選択式のクイズをクリックしたり、デジタル教科書をスクロールしたりしています。これはテレビと同じ受動的な消費であり、教育的な言葉で装飾されているにすぎません。画面が作業を行い、生徒は受動的に座っているだけです。研究は一貫して、受動的学習はアクティブラーニングと比較して効果が限られていることを示しています（
      <a
        href="https://www.pnas.org/doi/10.1073/pnas.1319030111"
        target="_blank"
        rel="noopener noreferrer"
      >
        Freeman et al., 2014
      </a>
      ）。
    </p>

    <p>
      <a
        href="https://www.oecd.org/en/publications/oecd-digital-education-outlook-2026_062a7394-en.html"
        target="_blank"
        rel="noopener noreferrer"
      >
        OECDのDigital Education Outlook 2026
      </a>
      {" "}はこの区別を明確にしています。汎用AIツールを構造化せずに生徒に単に与えた場合、生徒が思考を機械に外注してしまうため、学習は<em>低下する</em>ことが多いのです。しかし、<strong>「意図的な教育目的」</strong>を持って設計されたAIは持続的な改善を示します。違いは技術が存在するかどうかではなく、その技術が学習者に能動的な関与を求めるかどうかなのです。
    </p>

    <p>
      CoSNの
      <a
        href="https://www.eschoolnews.com/innovative-teaching/2026/02/16/new-cosn-report-underscores-importance-of-intentional-reliable-edtech-use/"
        target="_blank"
        rel="noopener noreferrer"
      >
        2026 Driving K-12 Innovation Report
      </a>
      {" "}もこの点を強調しています。<em>「人間中心の戦略がなければ、最良の技術でさえ失敗する」</em>と。多くの学校は技術を購入しましたが、それを効果的に実装するための戦略は購入しなかったのです。
    </p>

    <h2>アクティブラーニングの何が違うのか？</h2>

    <p>
      <strong>アクティブラーニング</strong>に関する実質的な研究群があり、生徒は見るよりも行う方が効果的に学ぶことが実証されています。225の研究を対象とした画期的なメタ分析では、アクティブラーニングは従来の講義と比較して、試験成績を半グレード向上させ、不合格率を55%削減したことが明らかになりました（
      <a
        href="https://www.pnas.org/doi/10.1073/pnas.1319030111"
        target="_blank"
        rel="noopener noreferrer"
      >
        Freeman et al., 2014
      </a>
      ）。教育者にとっての課題は常に、スケールでアクティブラーニング体験をどのように創出するかでした。
    </p>

    <p>
      物理的な理科実験室は常にアクティブラーニングの好例でした。生徒は滴定を見るのではなく、実行します。振り子の運動について読むのではなく、測定します。学習は行動を通じて、試行錯誤を通じて、器具を操作し結果を直接観察するという物理的な関与を通じて起こります。
    </p>

    <p>
      課題は、物理的な実験室は費用がかかり、慎重な安全管理を必要とし、時間割に制約され、STEM教育の教員不足が続く中でスタッフ配置がますます困難になっていることです。COVID-19が世界中の学校を閉鎖したとき、何百万人もの生徒が実践的な理科教育へのアクセスを完全に失いました（
      <a
        href="https://www.iza.org/publications/dp/13820/covid-19-and-educational-inequality-how-school-closures-affect-low-and-high-achieving-students"
        target="_blank"
        rel="noopener noreferrer"
      >
        Grewenig et al., 2021
      </a>
      ）。
    </p>

    <p>
      ここでほとんどのEdTechソリューションは失敗しました。能動的な物理実験を受動的なデジタル代替物に置き換えてしまったのです。実験のアニメーション、科学者の作業ビデオ、ラベル付きのクリック可能な図。生徒は自分で科学を行う代わりに、他の誰かが科学を行うのを見ています。これらの代替物はより安価で安全ですが、身体化認知と運動学習に関する研究によれば、実践的スキルが習得される根本的なメカニズムを欠いています（
      <a
        href="https://www.frontiersin.org/articles/10.3389/fpsyg.2019.00625/full"
        target="_blank"
        rel="noopener noreferrer"
      >
        Macedonia, 2019
      </a>
      ）。
    </p>

    <h2>仮想実験室はどのようにアクティブラーニングを維持できるのか？</h2>

    <p>
      WhimsyLabsでは、私たちは一つの原則を中心にプラットフォームを構築しました。それは実験学習の<em>能動的な</em>部分を維持することです。私たちのバーチャルラボでは、生徒は「化学薬品を加える」というボタンをクリックしません。自然な手の動きを使って液体を実際に注ぎます。メニューから「ビーカーを加熱」を選択するのではなく、機器をブンゼンバーナーの上に配置し、炎を自分でコントロールします。ピペット技術について読むのではなく、実際にピペット操作を行い、動きをリアルタイムで追跡・指導されることで実技スキルを発達させます。
    </p>

    <p>
      このアプローチは運動学習研究に基づいています。物理的な動作を行うとき、脳は他の誰かが同じ動作を行うのを見るときとは異なる方法でそれをエンコードします。活性化される神経経路は異なり、記憶保持も異なり、そして決定的に、実世界のスキルへの転移も異なります（
      <a
        href="https://www.nature.com/articles/nphys293"
        target="_blank"
        rel="noopener noreferrer"
      >
        Wieman & Perkins, 2006
      </a>
      ）。
    </p>

    <p>
      私たちのサンドボックスアプローチはこれをさらに拡張します。予め決められたレシピに従うのではなく、生徒は自分自身の実験シミュレーションを設計します。「この未知の酸の濃度を決定せよ」といった問題を与えられると、適切な機器を選択し、手順を計画し、技術を実行し、結果を分析し、期待通りにいかなかったときには反復する必要があります。これが科学者が実際に行うことです。すべてのステップで能動的な関与が必要です。
    </p>

    <h2>AIによる評価は脅威ではなく意味のあるものになり得るか？</h2>

    <p>
      生徒がChatGPTや類似ツールを使って課題を完成させることへの現在の懸念は正当なものです。生徒はAIを使ってエッセイを書いたり、数学の問題を解いたり、実験レポートを生成したりできます。書面の成果物に焦点を当てた従来の評価方法は、この種の回避に対してますます脆弱になっています。
    </p>

    <p>
      しかし、テキスト生成AIが根本的にできないことがあります。それは<strong>手順を物理的に実行すること</strong>です。
    </p>

    <p>
      私たちのAIチューターであるWhimsyCatは、生徒が提出する書面の回答だけでなく、<em>どのように</em>作業するかを観察します。ピペットを正しい角度で持っていたか？ 滴定の終点に十分ゆっくりとアプローチしたか？ ビュレットを満たす前にすすぐことを覚えていたか？ メニスカスを目の高さで読んだか？ これらはリアルタイムで捉えられる物理的な動作です。テキストではなく、動作、タイミング、空間推論、そして行動を通じて示される手続き的知識であるため、テキストジェネレーターに外注することはできません。
    </p>

    <p>
      Pearsonの最近の評価研究では、実践的スキルは本質的に<strong>AI耐性</strong>があると特定されています。これは誰かが意図的にAIをブロックしているからではなく、スキル自体が言語モデルでは提供できない物理的な実演を必要とするからです。ChatGPTにプロンプトを入力しても滴定技術を偽ることはできません。実際に行う必要があるのです。
    </p>

    <p>
      WhimsyCatは生徒をプロセスで評価します。実験設計の選択、技術の質、トラブルシューティングのアプローチ、安全意識などです。すべての評価は教師がレビューできる監査証跡を生成します。これはAIが教師の判断を置き換えるものではありません。教師が生徒の能力についてより情報に基づいた判断を下すために使用できる詳細な証拠をAIが提供するのです。
    </p>

    <h2>人間中心のEdTechとは実際にはどのようなものか？</h2>

    <p>
      CoSNのレポートは、成功する教育技術には<em>「人間中心の戦略」</em>が必要であることを強調しています。私たちはこの原則を真剣に受け止めています。WhimsyLabsは理科教師を置き換えるためではなく、ますます不可能になっている作業負荷を管理する上で彼らを支援するために設計されています。
    </p>

    <p>
      実際の現実を考えてみましょう。実験セッション中に30人の生徒を監督する理科教師1人が、各生徒の技術にそれにふさわしい注意を払って観察することは到底不可能です。十分な目がなく、十分な時間がなく、十分な余裕がありません。結果として、実践的な評価はしばしば、生徒が有能な技術を示したかどうかではなく、期待される最終回答を出したかどうかに焦点を当てたチェックボックス作業になってしまいます。
    </p>

    <p>
      WhimsyCatは生徒が作業している間、継続的な形成的フィードバックを提供し、技術を指導し、エラーを特定し、探究的な質問を投げかけます。これは教師を置き換えるものではありません。教師を増幅するのです。教師は人間のサポートを必要とする生徒に注意を集中でき、WhimsyCatは他の生徒への日常的なガイダンスを担当します。
    </p>

    <p>
      重要なことに、教師は管理権を保持しています。カリキュラムに合わせたカスタム実験を作成できます。難易度を調整できます。AIの評価をレビューし、同意できない場合は上書きできます。人間は教育プロセスの中心に留まります。AIは周辺からサポートします。
    </p>

    <h2>EdTechについてどのような質問をすべきか？</h2>

    <p>
      私たちは教育技術についてより精密な批判を歓迎します。EdTechが役に立たないかどうかを広く問うのではなく、より具体的な質問を考えてみてください。
    </p>

    <ul>
      <li><strong>この技術は能動的な関与を必要とするか？</strong> 半分注意を払いながら使えるなら、おそらく受動的です。</li>
      <li><strong>プロセスを評価するか、結果のみを評価するか？</strong> 選択式クイズは最終回答のみを捉えます。最も重要な推論と技術を見逃しています。</li>
      <li><strong>教師を支援するか、置き換えようとするか？</strong> 教師の置き換えは繰り返し失敗してきました。教師の拡張には真の可能性があります。</li>
      <li><strong>学習転移の証拠はあるか？</strong> この技術を使用した生徒は実世界の文脈でより良いパフォーマンスを示すか？</li>
      <li><strong>教育的意図を持って設計されたか？</strong> それとも技術が導入されれば学習は自動的に起こると想定したエンジニアによって設計されたか？</li>
    </ul>

    <p>
      教育技術に費やされた300億ドルの多くはこれらのテストに不合格です。実装計画なしに配布されたタブレットはこれらのテストに不合格です。PDFワークシートのリポジトリと化した学習管理システムはこれらのテストに不合格です。教育的フレームワークなしに導入されたAIチャットボットはこれらのテストに不合格です。
    </p>

    <p>
      生徒が物理的に実験を行い、技術についてリアルタイムの指導を受け、AIでは再現できないスキルを実演するバーチャルラボは？ それは根本的に異なるカテゴリーの教育技術を代表しています。
    </p>

    <h2>このアプローチを支持する証拠は？</h2>

    <p>
      私たちはこれらの主張を信仰に基づいて受け入れるよう求めてはいません。BETT 2025では、生徒自身が<strong>Kids' Choice Awards</strong>でWhimsyLabsに投票し、理科を魅力的でアクセスしやすいものにしたプラットフォームとして認められました。BETT 2026では、<strong>Tech & LearningがBest of BETTとして私たちを選出</strong>しました。これらはマーケティング賞ではありません。実際に製品を使用し、価値を見出した教育者と生徒からの評価を代表しています。
    </p>

    <p>
      私たちはパートナー校と協力して実践的スキルの転移を測定する継続的な研究を実施しています。初期の結果では、WhimsyLabsで手順を練習した生徒は、その後物理的な実験室で作業する際に技術の向上を示すことが示されています。仮想での練習は実世界のパフォーマンスに転移します。サンドボックスアプローチは、従来のレシピスタイルの実験では育成が困難な実験設計思考を発達させます。
    </p>

    <p>
      批評家たちの言う通りです。ほとんどのEdTechは意味のある教育的価値を提供できていません。私たちは問題の一部ではなく、解決策の一部になるよう取り組んでいます。
    </p>

    <h2>これは私たちをどこに導くのか？</h2>

    <p>
      教育技術に関する議論は「技術か、技術なしか」という枠組みで捉えるべきではありません。その選択肢はもはや利用可能ではありません。技術は教育に組み込まれており、そのまま残り続けます。生産的な議論は、<em>どのような</em>技術が、<em>どのような原則</em>に従って設計され、<em>どのような戦略</em>で実装されるかに関するものです。
    </p>

    <p>
      学習の装いをした受動的なスクリーンタイム？ 批評家たちがそれを指摘するのは正しいです。生徒の代わりに思考するAIツール？ 逆効果です。技術が教師を置き換えるという約束？ 繰り返し失敗してきました。
    </p>

    <p>
      真の関与を必要とするアクティブラーニング環境。最終回答だけでなくプロセスと技術を追跡する評価。教師を置き換えようとするのではなく支援する技術。従来の実験室を賄えない、またはスタッフを配置できない学校にも実践的な理科教育をアクセス可能にするプラットフォーム。AIでは偽れないスキルを発達させるツール。
    </p>

    <p>
      それが投資する価値のある教育技術です。私たちはその構築の小さな一部になろうと努力しています。
    </p>

    <h2>関連記事</h2>
    <ul>
      <li>
        <a href="/jp/blog/oecd-ai-learning-paradox-virtual-labs">
          OECDのAI学習パラドックス：なぜ生成AIは生徒を失敗させるのか（そして仮想実験室はなぜ成功するのか）
        </a>
      </li>
      <li>
        <a href="/jp/blog/ai-assessment-crisis-solution">
          AI評価の危機には解決策がある
        </a>
      </li>
      <li>
        <a href="/jp/blog/pearson-webinar-vr-assessment-ai-age">
          AI時代の評価：Pearsonウェビナーに参加しよう
        </a>
      </li>
    </ul>

    <div className="references-section">
      <h3>参考文献</h3>
      <ul className="references-list">
        <li>
          Freeman, S., Eddy, S. L., McDonough, M., Smith, M. K., Okoroafor, N., Jordt, H., & Wenderoth, M. P. (2014). Active learning increases student performance in science, engineering, and mathematics. <em>Proceedings of the National Academy of Sciences, 111</em>(23), 8410-8415.
        </li>
        <li>
          Grewenig, E., Lergetporer, P., Werner, K., Woessmann, L., & Zierow, L. (2021). COVID-19 and educational inequality: How school closures affect low- and high-achieving students. <em>European Economic Review, 140</em>, 103920.
        </li>
        <li>
          Macedonia, M. (2019). Embodied learning: Why at school the mind needs the body. <em>Frontiers in Psychology, 10</em>, 2098.
        </li>
        <li>
          OECD. (2026). <em>OECD Digital Education Outlook 2026</em>. OECD Publishing.{" "}
          <a href="https://www.oecd.org/en/publications/oecd-digital-education-outlook-2026_062a7394-en.html" target="_blank" rel="noopener noreferrer">
            Link
          </a>
        </li>
        <li>
          CoSN. (2026). <em>2026 Driving K-12 Innovation Report</em>. Consortium for School Networking.{" "}
          <a href="https://www.cosn.org/tools-and-resources/resource/2026-driving-k-12-innovation-report-hurdles-accelerators-tech-enablers/" target="_blank" rel="noopener noreferrer">
            Link
          </a>
        </li>
        <li>
          The Economist. (2026, February 12). Is education technology mostly useless? <em>The Economist</em>.{" "}
          <a href="https://www.economist.com/letters/2026/02/12/is-education-technology-mostly-useless" target="_blank" rel="noopener noreferrer">
            Link
          </a>
        </li>
        <li>
          Bloomberg. (2026, February 11). Kids Spend Hours in School on Screens. And for What? <em>Bloomberg Opinion</em>.{" "}
          <a href="https://www.bloomberg.com/opinion/articles/2026-02-11/education-technology-isn-t-teaching-us-children-more-effectively" target="_blank" rel="noopener noreferrer">
            Link
          </a>
        </li>
        <li>
          Wieman, C. E., & Perkins, K. K. (2006). A powerful tool for teaching science. <em>Nature Physics, 2</em>(5), 290-292.
        </li>
      </ul>
    </div>
  </>
);
