import { Pill, Figure, ProgBar } from './TC_Shared';

const BASE = './figures';

export default function TC_EDA() {
  return (
    <div className="space-y-14">

      {/* ── Intro stats ── */}
      <div>
        <p className="text-xs font-black uppercase tracking-widest text-indigo-500 mb-2">Exploratory Data Analysis</p>
        <h2 className="text-3xl font-black text-slate-800 mb-6 tracking-tight">Understanding the data before modeling</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[['20,000','Total posts'],['23 words','Mean length'],['1,749','Posts with slurs'],['152','Unique emojis']].map(([num, label]) => (
            <div key={label} className="bg-white border border-slate-200 rounded-2xl p-4 text-center shadow-sm">
              <div className="text-2xl font-black text-indigo-600 mb-1">{num}</div>
              <div className="text-xs text-slate-500">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Text Length ── */}
      <div>
        <p className="text-xs font-black uppercase tracking-widest text-indigo-500 mb-2">Text Length</p>
        <h2 className="text-3xl font-black text-slate-800 mb-6 tracking-tight">Short, dense, and information-rich</h2>
        <div className="grid md:grid-cols-2 gap-5">
          {[
            { pill: 'Character Length', cls: 'badge-blue',  src: `${BASE}/eda_char_length.png`, stats: 'Mean: 127 · Median: 121 · Max: 250', note: 'Most posts cluster below 200 characters – limited context per sample forces models to rely heavily on local cues.' },
            { pill: 'Word Count',       cls: 'badge-green', src: `${BASE}/eda_word_length.png`, stats: 'Mean: 23 words · Median: 22 · Max: 58', note: 'Fewer than 25 words on average – sequence models must capture meaning within extremely narrow context windows.' },
          ].map(({ pill, cls, src, stats, note }) => (
            <div key={pill} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
              <Pill cls={cls}>{pill}</Pill>
              <p className="text-sm text-slate-500">{stats}</p>
              <Figure src={src} caption="" height={220} />
              <div className="bg-blue-50 border-l-4 border-blue-300 rounded-r-xl px-4 py-3 text-sm text-slate-600">{note}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Text Artifacts ── */}
      <div>
        <p className="text-xs font-black uppercase tracking-widest text-indigo-500 mb-2">Text Artifacts</p>
        <h2 className="text-3xl font-black text-slate-800 mb-6 tracking-tight">Noise, signals, and structural tokens</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { pill: '[USER]', cls: 'badge-blue', count: '970 rows', desc: 'User mention placeholders occur frequently but carry almost no semantic value – strong candidates for removal during preprocessing.' },
            { pill: '[URL]',  cls: 'badge-blue', count: '2,358 rows', desc: 'Linked content is stripped to a placeholder. Context behind the link is lost, weakening signals in posts where the link carries the punchline.' },
            { pill: 'Emojis', cls: 'badge-purple', count: '845 · 152 unique', desc: 'Unlike placeholders, emojis are meaningful. They encode sarcasm, mockery, and emotional tone – critical for detecting subtle animosity.' },
          ].map(({ pill, cls, count, desc }) => (
            <div key={pill} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-2"><Pill cls={cls}>{pill}</Pill><span className="text-sm text-slate-500 font-medium">{count}</span></div>
              <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Emojis ── */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="mb-4"><Pill cls="badge-purple">Top emojis by frequency</Pill></div>
        <div className="flex flex-wrap gap-3">
          {[['😂','213','joy/mockery'],['🤣','39','laughing'],['🤔','38','doubt'],['😊','25','warmth'],['😁','22','grin'],['😠','17','anger'],['🙄','15','dismissal'],['👌','15','OK'],['💩','10','insult'],['🖕','9','hostility'],['😈','8','menace'],['👹','8','aggression']].map(([emoji, count, meaning]) => (
            <div key={emoji} className="flex flex-col items-center gap-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 min-w-[60px]">
              <span className="text-2xl">{emoji}</span>
              <span className="text-xs font-bold text-slate-700">{count}</span>
              <span className="text-[10px] text-slate-400 text-center">{meaning}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 bg-blue-50 border-l-4 border-blue-300 rounded-r-xl px-4 py-3 text-sm text-slate-600">
          Laughter dominates (😂 213, 🤣 39) – often deployed sarcastically in hostile posts. Anger and menace emojis (😠, 😈, 👹, 🖕) are rarer but strongly correlated with threats and derogation classes.
        </div>
      </div>

      {/* ── Slurs ── */}
      <div>
        <p className="text-xs font-black uppercase tracking-widest text-indigo-500 mb-2">Offensive Language</p>
        <h2 className="text-3xl font-black text-slate-800 mb-6 tracking-tight">Slurs – powerful but ambiguous signals</h2>
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex gap-2 flex-wrap mb-5">
            <Pill cls="badge-red">1,749 posts with slurs</Pill>
            <Pill cls="badge-amber">Appear across all classes</Pill>
          </div>
          <div className="space-y-4">
            {[['bitch',596,'bg-rose-400'],['pussy',249,'bg-orange-400'],['whore',206,'bg-amber-400'],['cunt',201,'bg-blue-400'],['slut',122,'bg-purple-400'],['bitches',117,'bg-slate-400']].map(([word, count, bar]) => (
              <div key={word}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="font-mono text-sm font-semibold text-slate-700">{word}</span>
                  <span className="text-sm text-slate-500">{count}</span>
                </div>
                <ProgBar pct={Math.round(count / 596 * 100)} color={bar} />
              </div>
            ))}
          </div>
          <div className="mt-4 bg-amber-50 border-l-4 border-amber-300 rounded-r-xl px-4 py-3 text-sm text-slate-600">
            Slurs are strong lexical signals and easy wins for keyword-based models. However, context still matters – the same word appears in non-sexist posts used in quotes, references, or reclaimed contexts.
          </div>
        </div>
      </div>

      {/* ── Word patterns ── */}
      <div>
        <p className="text-xs font-black uppercase tracking-widest text-indigo-500 mb-2">Word Patterns</p>
        <h2 className="text-3xl font-black text-slate-800 mb-6 tracking-tight">Why keywords are not enough</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { badge: 'Shared vocabulary', cls: 'badge-blue', tags: ['women','like','get','would','people','men','one','think','man','know'], body: 'The most common words appear in every class. They are too universal to discriminate – models cannot rely on word presence alone.' },
            { badge: 'Derogation', cls: 'badge-amber', tags: ['fuck women','hate women','they are','all women','stupid','worthless','disgusting'], body: 'Explicit patterns with hostile verbs and direct insults. Intent is clear and vocabulary is distinctive – the easiest class for models.' },
            { badge: 'Animosity', cls: 'badge-blue', tags: ['wife','girls','girlfriend','lol','haha','okay','should','want','men'], body: 'Casual, conversational tone with slang and sarcasm. Patterns are weak and noisy – hostility hides in tone and implication.' },
            { badge: 'Prejudiced Discussion', cls: 'badge-purple', tags: ["women's rights","false rape","equality","patriarchy","feminism","gender","biology"], body: 'Argumentative, topic-driven vocabulary. Models must understand discourse-level position, not just sentiment or individual words.' },
          ].map(({ badge, cls, tags, body }) => (
            <div key={badge} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <Pill cls={cls}>{badge}</Pill>
              <div className="flex flex-wrap gap-1.5 my-3">
                {tags.map(t => <span key={t} className="text-xs bg-slate-100 text-slate-500 px-2.5 py-1 rounded-full">{t}</span>)}
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Examples ── */}
      <div>
        <p className="text-xs font-black uppercase tracking-widest text-indigo-500 mb-2">Examples</p>
        <h2 className="text-3xl font-black text-slate-800 mb-6 tracking-tight">How each category reads in the wild</h2>
        <div className="space-y-4">
          {[
            { badge: 'Non-sexist',           cls: 'badge-blue',   accent: 'border-l-blue-400',   label: 'Benign – no gendered intent',                    quotes: ['So dumb! – a neutral disagreement with no gendered intent.','When I was growing up I always wanted to work toward being an important person. My two Ex wives have seen to it that this will never happen.'], note: 'These posts mention women or relationships but contain no derogatory intent – illustrating why context determines the label, not keywords.' },
            { badge: 'Derogation',           cls: 'badge-amber',  accent: 'border-l-amber-400',  label: 'Direct insults – intent is clear',               quotes: ['They aren\'t. They never will be… Look through history, they always collapse societies.','Me. I am the Baron… Horrible SJW bitch.'], note: 'Vocabulary is distinctive and intent is unambiguous – the easiest class for models to identify.' },
            { badge: 'Animosity',            cls: 'badge-blue',   accent: 'border-l-indigo-400', label: 'Sarcasm & casual hostility – hardest to detect',  quotes: ['Wait! I got the next wonder woman plot. A man identifying as wonder woman and does it better! Think it\'ll fly? 😁😂🤣😉','Bullshit. Most people prefer stability in relationships to being kept on their toes…'], note: 'Hostility wrapped in casual phrasing, sarcasm, or humour. The hardest class to detect.' },
            { badge: 'Prejudiced Discussion',cls: 'badge-purple', accent: 'border-l-purple-400', label: 'Framed as argument',                               quotes: ['once the patriarchy is gone, the future is female… which will result in collapse, anarchy, war, destruction…','There is a Huge difference between a woman being forcibly raped and a woman having sex to advance her career.'], note: 'Posts use neutral-sounding vocabulary while advancing discriminatory positions.' },
            { badge: 'Threats',              cls: 'badge-red',    accent: 'border-l-rose-400',   label: 'Explicit harm intent – rarest but clearest',     quotes: ['She is a loon. Putin should turn up at number 10 and give her a wee slap.','I am with you on the False Accuser Registry. she does deserve to get raped though. Empathy is dead.'], note: 'Rarest class (2.2%) but the most unambiguous – vocabulary is uniquely and consistently violent.' },
          ].map(({ badge, cls, accent, label, quotes, note }) => (
            <div key={badge} className={`bg-white border border-slate-200 border-l-4 ${accent} rounded-2xl p-5 shadow-sm`}>
              <div className="flex items-center gap-3 mb-3"><Pill cls={cls}>{badge}</Pill><span className="text-xs text-slate-400 italic">{label}</span></div>
              <div className="space-y-2 mb-3">
                {quotes.map((q, i) => (
                  <div key={i} className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm text-slate-700 italic">&ldquo;{q}&rdquo;</div>
                ))}
              </div>
              <div className="flex gap-2 pt-3 border-t border-slate-100">
                <span className="w-2 h-2 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                <p className="text-sm text-slate-500 leading-relaxed">{note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── EDA Insights ── */}
      <div>
        <p className="text-xs font-black uppercase tracking-widest text-indigo-500 mb-2">EDA Insights</p>
        <h2 className="text-3xl font-black text-slate-800 mb-6 tracking-tight">What the data reveals</h2>
        <div className="space-y-4">
          {[
            { icon:'😂', accent:'border-l-amber-400',  title:'Laughter is the dominant tone – even in hostile posts', body:'😂 appears 213 times, making it the single most common emoji. It is frequently deployed sarcastically in animosity and derogation posts, masking hostility behind humour. Surface sentiment alone is deeply misleading.' },
            { icon:'📏', accent:'border-l-blue-400',   title:'Short text forces models to rely on single tokens', body:'With a median of 22 words, removing just one slur or emoji can strip a post of its only discriminating signal.' },
            { icon:'🔤', accent:'border-l-orange-400', title:'The same words appear across every class', body:'"women", "men", "like", and "get" rank among the top tokens in all five classes. No single word reliably signals a category.' },
            { icon:'🏷️', accent:'border-l-purple-400', title:'Prejudiced Discussion is the quietest class', body:'Unlike threats or derogation, prejudiced posts rarely contain slurs or emojis. They read like op-eds – calm, argued, and vocabulary-neutral.' },
            { icon:'⚠️', accent:'border-l-rose-400',   title:'Rare classes carry the highest detection cost', body:'Threats (2.2%) and Prejudiced Discussion (2.4%) together total under 5% of the data, but missing them is not a minor error – it is a safety failure.' },
          ].map(({ icon, accent, title, body }) => (
            <div key={title} className={`flex gap-4 bg-white border border-slate-200 border-l-4 ${accent} rounded-r-2xl p-5 shadow-sm`}>
              <div className="text-2xl w-10 h-10 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center shrink-0">{icon}</div>
              <div>
                <div className="font-bold text-slate-800 mb-1">{title}</div>
                <div className="text-sm text-slate-500 leading-relaxed">{body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Modeling Implication ── */}
      <div>
        <p className="text-xs font-black uppercase tracking-widest text-indigo-500 mb-2">Modeling Implication</p>
        <h2 className="text-3xl font-black text-slate-800 mb-6 tracking-tight">What the data demands from models</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { cls: 'badge-blue',   label: 'Keyword models',  verdict: 'Insufficient',     verdictColor: 'text-rose-500',   body: 'TF-IDF and bag-of-words capture explicit slurs and derogation but collapse entirely on animosity and prejudiced discussion.' },
            { cls: 'badge-green',  label: 'BiLSTM + GloVe', verdict: 'Partial coverage', verdictColor: 'text-orange-500', body: 'Word order and local phrasing give BiLSTM an edge over keywords. GloVe embeddings bring semantic similarity – but the fixed context window limits understanding of long-range intent.' },
            { cls: 'badge-amber',  label: 'RoBERTa',         verdict: 'Full coverage',    verdictColor: 'text-indigo-600', body: 'Bidirectional context across the full post, pre-trained on 160GB of text. The only architecture capable of handling the full spectrum.' },
          ].map(({ cls, label, verdict, verdictColor, body }) => (
            <div key={label} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-2">
              <div className="flex justify-between items-center">
                <Pill cls={cls}>{label}</Pill>
                <span className={`text-xs font-bold ${verdictColor}`}>{verdict}</span>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
