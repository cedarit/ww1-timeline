import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, BookOpen, X, Play, Pause, RotateCcw, Palette } from "lucide-react";

const THEMES = {
  antique: {
    name: "Antique Parchment",
    preview: ["#e8d9b4", "#f4ead5", "#c89858", "#8b1a1a"],
    vars: {
      "--t-bg": "#e8d9b4",
      "--t-surface": "#f4ead5",
      "--t-dark": "#3a2a1a",
      "--t-accent": "#c89858",
      "--t-danger": "#8b1a1a",
      "--t-text": "#3a2a1a",
      "--t-text-light": "#f4ead5",
      "--t-muted": "#5a3e1f",
      "--t-exam-bg": "#fffbe8",
      "--t-overlay": "rgba(58,42,26,0.85)",
      "--t-on-accent": "#3a2a1a",
      "--t-nav-border": "4px double #c89858",
      "--t-font": "'Crimson Text', Georgia, serif",
      "--t-heading-font": "'Playfair Display', Georgia, serif",
      "--t-accent-glow": "none",
    },
  },
  genz: {
    name: "Gen Z Neon",
    preview: ["#0d0d1a", "#1a1a2e", "#00d4ff", "#ff2d78"],
    vars: {
      "--t-bg": "#0d0d1a",
      "--t-surface": "#1a1a2e",
      "--t-dark": "#06060f",
      "--t-accent": "#00d4ff",
      "--t-danger": "#ff2d78",
      "--t-text": "#e8e8ff",
      "--t-text-light": "#e8e8ff",
      "--t-muted": "#8888bb",
      "--t-exam-bg": "#1a0a2e",
      "--t-overlay": "rgba(6,6,15,0.92)",
      "--t-on-accent": "#06060f",
      "--t-nav-border": "4px solid #00d4ff",
      "--t-font": "'Space Grotesk', 'Inter', system-ui, sans-serif",
      "--t-heading-font": "'Space Grotesk', 'Inter', system-ui, sans-serif",
      "--t-accent-glow": "0 0 20px rgba(0,212,255,0.35)",
    },
  },
};

export default function App() {
  const [stop, setStop] = useState(0);
  const [showScript, setShowScript] = useState(false);
  const [showExam, setShowExam] = useState(true);
  const [themeKey, setThemeKey] = useState("antique");
  const [showThemePicker, setShowThemePicker] = useState(false);
  const currentTheme = THEMES[themeKey];

  const stops = [
    {
      id: 1,
      year: "1900",
      title: "Europe on the Eve",
      subtitle: "A continent of pride, rivalry, and hidden fault lines",
      script: "Begin here. Set the scene: Europe in 1900 is the centre of the world. Six big powers, each convinced of its own greatness. Ask the class: 'What happens when six proud neighbours all want more?' That tension is our story.",
      exam: "Nationalism = sense of unity through common history, language, culture. Imperialism = a powerful nation establishing control over another country.",
      Component: StopEurope1900,
    },
    {
      id: 2,
      year: "Late 1800s",
      title: "Aggressive Nationalism",
      subtitle: "Pride curdles into grievance",
      script: "Three countries, three grudges. France wants Alsace-Lorraine back from Germany. Italy wants Trentino and Trieste from Austria. Serbia wants all Slavs in one state. Make students notice: every grievance points toward Germany or Austria.",
      exam: "Three textbook examples: France→Alsace-Lorraine, Italy→Trentino & Trieste, Serbia→Greater Slav State. Each fuelled the road to war.",
      Component: StopGrievances,
    },
    {
      id: 3,
      year: "1880–1914",
      title: "The Scramble for Colonies",
      subtitle: "Britain and France first, Germany arrives late",
      script: "Imperialism in one image: the world's map fills up with British and French colours. Then Germany shows up — and there's nothing left. That latecomer's frustration is the engine of envy.",
      exam: "Colonies provided raw materials, cheap labour, markets, and prestige. Britain's empire was protected by the world's largest navy.",
      Component: StopColonies,
    },
    {
      id: 4,
      year: "1870–1914",
      title: "The Arms Race",
      subtitle: "Self-defence becomes self-fulfilling prophecy",
      script: "The Franco-Prussian War of 1870 starts the clock. Every country stockpiles 'for self-defence' — but if your neighbour arms, you must arm too. By 1914, Europe is a powder keg with everyone holding a match.",
      exam: "Trigger date: Franco-Prussian War, 1870. Germany built a powerful navy to rival Britain. Kiel Canal deepened for battleships. Imperator (1912) — largest ship in the world.",
      Component: StopArmsRace,
    },
    {
      id: 5,
      year: "1882 & 1907",
      title: "The Alliance System",
      subtitle: "Two webs across one continent",
      script: "Watch carefully. Triple Alliance forms in 1882: Germany, Austria-Hungary, Italy. Then France, Russia, and Britain answer with the Triple Entente in 1907. Europe is now divided into two armed camps. Any spark, anywhere, will pull both sides in.",
      exam: "Triple Alliance (1882): Germany + Austria-Hungary + Italy. Triple Entente (1907): France + Russia + Britain. Japan later joined the Entente. Italy switched sides in 1915.",
      Component: StopAlliances,
    },
    {
      id: 6,
      year: "June 28, 1914",
      title: "Sarajevo: The Spark",
      subtitle: "One bullet, two deaths, a continent on fire",
      script: "June 28, 1914. Sarajevo, capital of Bosnia. Archduke Franz Ferdinand — heir to the Austrian throne — is shot by a Serbian nationalist linked to the Black Hand. Pause here. Ask: 'Should one murder cause a world war?' The answer comes next.",
      exam: "Date: June 28, 1914. Place: Sarajevo, Bosnia. Victim: Archduke Francis Ferdinand. Organisation: Black Hand (Union of Death) — extremist Serbian nationalists.",
      Component: StopSarajevo,
    },
    {
      id: 7,
      year: "July 28 – Aug 4, 1914",
      title: "The Domino Cascade",
      subtitle: "Seven days. Six declarations. One world war.",
      script: "This is the moment. Press play and watch: Austria→Serbia, Russia mobilises, Germany→Russia, Germany→France, Germany invades Belgium, Britain→Germany. Six declarations in seven days — because the alliance webs we built earlier left no off-ramp.",
      exam: "Sequence: Jul 23 ultimatum → Jul 28 Austria declares war on Serbia → Aug 1 Germany on Russia → Aug 3 Germany on France → Aug 4 Germany invades Belgium → Aug 4 Britain on Germany.",
      Component: StopCascade,
    },
    {
      id: 8,
      year: "1914",
      title: "Quick Check",
      subtitle: "Three questions on what you've seen so far",
      script: "Pause here before moving on. Three questions covering the causes and outbreak of war. Ask students to answer individually, then discuss. Green = correct, red = wrong.",
      exam: "Tests: declaration sequence (Jul 28), Belgium's role triggering Britain, Black Hand organisation. All standard ICSE exam material.",
      Component: StopCascadeQuiz,
    },
    {
      id: 9,
      year: "1914",
      title: "Two Fronts Open",
      subtitle: "Germany fights east and west at once",
      script: "Germany's nightmare: war on two fronts. In the West, they sweep through Belgium toward Paris — stopped at the Battle of the Marne, 15 miles short. In the East, Russia attacks. The 'short war' everyone expected is already gone.",
      exam: "Battle of the Marne — turning point of the war. Foiled German plans to crush France quickly. Eastern Front opened August 1914 with Austria-Hungary's invasion of Russia.",
      Component: StopFronts,
    },
    {
      id: 10,
      year: "1914–1918",
      title: "Life in the Trenches",
      subtitle: "Total war, total misery",
      script: "Click each part of the trench. This is what 'total war' meant on the ground: machine guns above, mud below, lice and rats in between. Earlier wars spared civilians. This one didn't spare anyone.",
      exam: "Trench warfare emerged because machine guns + heavy artillery made above-ground movement suicidal. Conditions: food shortages, lice, rats, poison gas, mud. Marks WW1 as 'total war'.",
      Component: StopTrenches,
    },
    {
      id: 11,
      year: "1917",
      title: "USA Enters, Russia Exits",
      subtitle: "The war's hinge year",
      script: "1917 changes everything. April: USA joins the Allies, angered by U-boats sinking the Lusitania (1,153 dead, 128 American). October: Bolshevik Revolution in Russia. By March 1918, Russia signs the Treaty of Brest-Litovsk and walks out. Fresh American troops replace exhausted Russian ones.",
      exam: "USA enters: 6 April 1917. Trigger: Lusitania (1915) + fear of German victory threatening US loans. Russia exits: October Revolution → Treaty of Brest-Litovsk, March 1918.",
      Component: StopUSARussia,
    },
    {
      id: 12,
      year: "June 28, 1919",
      title: "The Treaty of Versailles",
      subtitle: "Eleven clauses to crush a nation",
      script: "Signed exactly five years after Sarajevo. Click each clause. Every one is designed to ensure Germany never wars again. But ask the class — does humiliation bring peace, or breed the next war? Hint: 1939.",
      exam: "Date: 28 June 1919. Decided by the 'Big Three': Wilson (USA), Lloyd George (UK), Clemenceau (France). Based on Wilson's Fourteen Points. Reparations: $33 billion. Army capped at 100,000.",
      Component: StopVersailles,
    },
    {
      id: 13,
      year: "1919–1920",
      title: "A Map Redrawn, A League Born",
      subtitle: "Three empires fall, new nations rise",
      script: "Final stop. Three dynasties gone — Romanov, Hohenzollern, Hapsburg. New nations appear: Czechoslovakia, Yugoslavia, Poland, Finland, Latvia, Lithuania, Estonia. The League of Nations forms in 1920 to prevent another war. Ask: 'Why did it fail?' Cliffhanger to WW2.",
      exam: "Dynasties destroyed: Romanov (Russia), Hohenzollern (Germany), Hapsburg (Austria-Hungary). New states: Czechoslovakia, Yugoslavia, Finland, Estonia, Latvia, Lithuania. League of Nations: 1920. USA never joined; failed to prevent WW2.",
      Component: StopAftermath,
    },
  ];

  const current = stops[stop];
  const Stage = current.Component;

  const next = () => setStop((s) => Math.min(s + 1, stops.length - 1));
  const prev = () => setStop((s) => Math.max(s - 1, 0));

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div style={styles.app}>
      <style>{makeGlobalCSS(currentTheme.vars)}</style>

      {/* Masthead */}
      <header style={styles.masthead}>
        <div style={styles.mastheadInner}>
          <div style={styles.mastheadLeft}>
            <div style={styles.eyebrow}>ICSE History · Chapter 10</div>
            <h1 style={styles.mastheadTitle}>The Great War</h1>
            <div style={styles.mastheadSub}>An Interactive Timeline · 1900 — 1920</div>
          </div>
          <div style={styles.mastheadRight}>
            <div style={styles.yearBadge}>
              <div style={styles.yearLabel}>YEAR</div>
              <div style={styles.yearValue}>{current.year}</div>
            </div>
            <button
              onClick={() => setShowThemePicker((v) => !v)}
              style={styles.themeButton}
              title="Change theme"
            >
              <Palette size={14} /> THEME
            </button>
          </div>
        </div>
      </header>

      {/* Title bar for current stop */}
      <div style={styles.stopHeader}>
        <div style={styles.stopNumber}>STOP {String(current.id).padStart(2, "0")} / {stops.length}</div>
        <h2 style={styles.stopTitle}>{current.title}</h2>
        <div style={styles.stopSubtitle}>{current.subtitle}</div>
      </div>

      {/* Main stage */}
      <main style={styles.stage}>
        <Stage key={current.id} />
      </main>

      {/* Exam Note (always visible, can hide) */}
      {showExam && (
        <div style={styles.examNote}>
          <div style={styles.examNoteHeader}>
            <BookOpen size={14} strokeWidth={2.5} />
            <span style={{ letterSpacing: "0.18em" }}>EXAM NOTE</span>
            <button onClick={() => setShowExam(false)} style={styles.examClose} aria-label="hide">
              <X size={14} />
            </button>
          </div>
          <div style={styles.examBody}>{current.exam}</div>
        </div>
      )}
      {!showExam && (
        <button onClick={() => setShowExam(true)} style={styles.examOpenButton}>
          <BookOpen size={14} /> Show Exam Note
        </button>
      )}

      {/* Teacher Script popup */}
      {showScript && (
        <div style={styles.scriptOverlay} onClick={() => setShowScript(false)}>
          <div style={styles.scriptCard} onClick={(e) => e.stopPropagation()}>
            <div style={styles.scriptHeader}>
              <span style={styles.scriptLabel}>TEACHER SCRIPT · 30 SECONDS</span>
              <button onClick={() => setShowScript(false)} style={styles.scriptClose}>
                <X size={18} />
              </button>
            </div>
            <div style={styles.scriptBody}>{current.script}</div>
          </div>
        </div>
      )}

      {/* Footer Navigation */}
      <nav style={styles.nav}>
        <button onClick={prev} disabled={stop === 0} style={{ ...styles.navButton, ...styles.navArrow }}>
          <ChevronLeft size={20} />
        </button>

        <button onClick={() => setShowScript(true)} style={styles.scriptButton}>
          <Play size={12} /> Teacher Script
        </button>

        <div style={styles.dotsContainer}>
          {stops.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setStop(i)}
              style={{
                ...styles.dot,
                ...(i === stop ? styles.dotActive : {}),
                ...(i < stop ? styles.dotPast : {}),
              }}
              aria-label={`Stop ${s.id}: ${s.title}`}
              title={`${s.id}. ${s.title}`}
            >
              {i === stop && <span style={styles.dotInner} />}
            </button>
          ))}
        </div>

        <button onClick={next} disabled={stop === stops.length - 1} style={{ ...styles.navButton, ...styles.navArrow }}>
          <ChevronRight size={20} />
        </button>
      </nav>

      {/* Theme Picker */}
      {showThemePicker && (
        <>
          <div style={styles.themePickerBackdrop} onClick={() => setShowThemePicker(false)} />
          <div style={styles.themePicker}>
            <div style={styles.themePickerTitle}>CHOOSE THEME</div>
            {Object.entries(THEMES).map(([key, theme]) => (
              <button
                key={key}
                onClick={() => { setThemeKey(key); setShowThemePicker(false); }}
                style={{ ...styles.themeCard, ...(themeKey === key ? styles.themeCardActive : {}) }}
              >
                <div style={styles.themeSwatches}>
                  {theme.preview.map((color, i) => (
                    <div key={i} style={{ ...styles.themeSwatch, background: color }} />
                  ))}
                </div>
                <span style={styles.themeCardName}>{theme.name}</span>
                {themeKey === key && <span style={styles.themeCheck}>✓</span>}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ============================================================
   STAGE COMPONENTS — one per stop
   ============================================================ */

function StopEurope1900() {
  const [hovered, setHovered] = useState(null);
  const countries = [
    { id: "GB", name: "Great Britain", x: 220, y: 165, want: "Protect the empire & rule the seas", flag: "🇬🇧" },
    { id: "FR", name: "France", x: 300, y: 290, want: "Recover Alsace-Lorraine from Germany", flag: "🇫🇷" },
    { id: "DE", name: "Germany", x: 430, y: 220, want: "A 'place in the sun' — colonies & navy", flag: "🇩🇪" },
    { id: "AT", name: "Austria-Hungary", x: 510, y: 295, want: "Hold the multi-ethnic empire together", flag: "🇦🇹" },
    { id: "RU", name: "Russia", x: 680, y: 195, want: "Protect fellow Slavs in the Balkans", flag: "🇷🇺" },
    { id: "IT", name: "Italy", x: 460, y: 380, want: "Recover Trentino & Trieste from Austria", flag: "🇮🇹" },
    { id: "RS", name: "Serbia", x: 575, y: 370, want: "Unite all Slavs in one Greater State", flag: "🇷🇸" },
  ];

  return (
    <div style={stageStyles.wrap}>
      <svg viewBox="0 0 800 500" style={stageStyles.svg}>
        <defs>
          <pattern id="paper" width="100" height="100" patternUnits="userSpaceOnUse">
            <rect width="100" height="100" fill="#f4ead5" />
            <circle cx="20" cy="30" r="0.5" fill="#3a2a1a" opacity="0.15" />
            <circle cx="70" cy="60" r="0.4" fill="#3a2a1a" opacity="0.1" />
            <circle cx="40" cy="80" r="0.6" fill="#3a2a1a" opacity="0.12" />
          </pattern>
        </defs>
        <rect width="800" height="500" fill="url(#paper)" />

        {/* Stylized Europe outline */}
        <path
          d="M 150 150 Q 180 100 250 110 L 320 130 Q 380 140 420 150 L 480 145 Q 540 155 600 175 L 700 200 L 740 250 L 730 320 L 700 380 Q 640 420 580 410 L 500 420 Q 440 430 380 420 L 300 410 Q 240 400 200 370 L 160 320 Q 130 270 140 220 Z"
          fill="#e8d9b4"
          stroke="#5a3e1f"
          strokeWidth="1.5"
          opacity="0.6"
        />

        {countries.map((c) => (
          <g
            key={c.id}
            onMouseEnter={() => setHovered(c.id)}
            onMouseLeave={() => setHovered(null)}
            style={{ cursor: "pointer" }}
          >
            <circle
              cx={c.x}
              cy={c.y}
              r={hovered === c.id ? 26 : 20}
              fill={hovered === c.id ? "#8b1a1a" : "#c89858"}
              stroke="#3a2a1a"
              strokeWidth="2"
              style={{ transition: "all 0.3s ease" }}
            />
            <text
              x={c.x}
              y={c.y + 5}
              textAnchor="middle"
              fontFamily="Georgia, serif"
              fontSize="14"
              fontWeight="bold"
              fill="#fff"
            >
              {c.id}
            </text>
            <text
              x={c.x}
              y={c.y + 45}
              textAnchor="middle"
              fontFamily="Georgia, serif"
              fontSize="13"
              fill="#3a2a1a"
              fontWeight="600"
            >
              {c.name}
            </text>
          </g>
        ))}

        {hovered && (
          <g>
            {(() => {
              const c = countries.find((x) => x.id === hovered);
              return (
                <>
                  <rect x="50" y="430" width="700" height="50" fill="#3a2a1a" rx="4" />
                  <text x="400" y="453" textAnchor="middle" fontFamily="Georgia, serif" fontSize="14" fill="#c89858" fontStyle="italic">
                    {c.name} wants:
                  </text>
                  <text x="400" y="472" textAnchor="middle" fontFamily="Georgia, serif" fontSize="16" fill="#f4ead5" fontWeight="600">
                    "{c.want}"
                  </text>
                </>
              );
            })()}
          </g>
        )}

        {!hovered && (
          <text x="400" y="460" textAnchor="middle" fontFamily="Georgia, serif" fontSize="14" fill="#5a3e1f" fontStyle="italic">
            Hover any nation to reveal what it wants.
          </text>
        )}
      </svg>
    </div>
  );
}

function StopGrievances() {
  const [step, setStep] = useState(0);
  const grievances = [
    { country: "France", target: "Alsace-Lorraine", from: "Germany", color: "#1e3a8a" },
    { country: "Italy", target: "Trentino & Trieste", from: "Austria", color: "#15803d" },
    { country: "Serbia", target: "All Slav peoples", from: "Austria-Hungary", color: "#b91c1c" },
  ];

  useEffect(() => {
    const t = setInterval(() => setStep((s) => (s + 1) % 4), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={stageStyles.wrap}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, padding: "20px 30px", height: "100%" }}>
        {grievances.map((g, i) => (
          <div
            key={i}
            style={{
              border: "2px solid #5a3e1f",
              background: step > i ? "#f4ead5" : "#e8d9b4",
              padding: "24px 20px",
              borderRadius: 4,
              transform: step > i ? "translateY(0)" : "translateY(15px)",
              opacity: step > i ? 1 : 0.4,
              transition: "all 0.6s ease",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ fontFamily: "Georgia, serif", fontSize: 13, letterSpacing: "0.15em", color: "#8b1a1a", marginBottom: 8 }}>
                GRIEVANCE №{i + 1}
              </div>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 36, fontWeight: 700, color: g.color, lineHeight: 1 }}>
                {g.country}
              </div>
              <div style={{ fontFamily: "Georgia, serif", fontSize: 15, color: "#3a2a1a", marginTop: 16, fontStyle: "italic" }}>
                wants back…
              </div>
              <div style={{ fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 700, color: "#3a2a1a", marginTop: 6 }}>
                {g.target}
              </div>
              <div style={{ fontFamily: "Georgia, serif", fontSize: 14, color: "#5a3e1f", marginTop: 12 }}>
                from <strong>{g.from}</strong>
              </div>
            </div>
            <div
              style={{
                marginTop: 20,
                padding: "8px 12px",
                background: "#3a2a1a",
                color: "#c89858",
                fontFamily: "Georgia, serif",
                fontSize: 12,
                letterSpacing: "0.1em",
                textAlign: "center",
              }}
            >
              GRUDGE → {g.from.toUpperCase()}
            </div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", padding: "8px 0 16px", fontFamily: "Georgia, serif", fontSize: 14, color: "#5a3e1f", fontStyle: "italic" }}>
        Notice the pattern: every grievance points toward Germany or Austria.
      </div>
    </div>
  );
}

function StopColonies() {
  const [phase, setPhase] = useState(0);
  // phase: 0 empty, 1 british, 2 french, 3 german arrives

  return (
    <div style={stageStyles.wrap}>
      <svg viewBox="0 0 800 460" style={stageStyles.svg}>
        <rect width="800" height="460" fill="#e8d9b4" />
        {/* World */}
        <g opacity="0.9">
          {/* Africa */}
          <path
            d="M 380 180 L 460 180 L 480 240 L 500 320 L 470 380 L 410 390 L 380 350 L 360 280 Z"
            fill={phase >= 1 ? "#7c2d12" : "#d4c08a"}
            stroke="#3a2a1a"
            strokeWidth="1.5"
            style={{ transition: "fill 1s ease" }}
          />
          {/* India */}
          <path d="M 580 220 L 620 220 L 625 280 L 600 290 L 585 260 Z" fill={phase >= 1 ? "#7c2d12" : "#d4c08a"} stroke="#3a2a1a" strokeWidth="1.5" style={{ transition: "fill 1s ease" }} />
          {/* SE Asia */}
          <path d="M 660 260 L 700 270 L 705 310 L 670 305 Z" fill={phase >= 2 ? "#1e3a8a" : "#d4c08a"} stroke="#3a2a1a" strokeWidth="1.5" style={{ transition: "fill 1s ease" }} />
          {/* W Africa (French) */}
          <path d="M 320 200 L 380 195 L 380 240 L 340 250 Z" fill={phase >= 2 ? "#1e3a8a" : "#d4c08a"} stroke="#3a2a1a" strokeWidth="1.5" style={{ transition: "fill 1s ease" }} />
          {/* Europe */}
          <path d="M 350 100 L 480 100 L 490 170 L 360 175 Z" fill="#c89858" stroke="#3a2a1a" strokeWidth="1.5" />
          {/* Australia */}
          <path d="M 700 360 L 760 360 L 770 400 L 705 405 Z" fill={phase >= 1 ? "#7c2d12" : "#d4c08a"} stroke="#3a2a1a" strokeWidth="1.5" style={{ transition: "fill 1s ease" }} />
        </g>

        {/* Germany trying to find space */}
        {phase >= 3 && (
          <g style={{ animation: "pulse 1.4s ease-in-out infinite" }}>
            <text x="430" y="135" textAnchor="middle" fontFamily="Georgia, serif" fontSize="18" fill="#000" fontWeight="700">
              🇩🇪 Germany
            </text>
            <text x="430" y="155" textAnchor="middle" fontFamily="Georgia, serif" fontSize="13" fill="#8b1a1a" fontStyle="italic">
              "Where's our share?!"
            </text>
            <line x1="430" y1="160" x2="380" y2="200" stroke="#8b1a1a" strokeWidth="2" strokeDasharray="4,3" />
            <line x1="430" y1="160" x2="600" y2="220" stroke="#8b1a1a" strokeWidth="2" strokeDasharray="4,3" />
          </g>
        )}

        {/* Legend */}
        <g>
          <rect x="40" y="40" width="14" height="14" fill="#7c2d12" />
          <text x="60" y="52" fontFamily="Georgia, serif" fontSize="13" fill="#3a2a1a">British Empire</text>
          <rect x="40" y="62" width="14" height="14" fill="#1e3a8a" />
          <text x="60" y="74" fontFamily="Georgia, serif" fontSize="13" fill="#3a2a1a">French Empire</text>
          <rect x="40" y="84" width="14" height="14" fill="#d4c08a" stroke="#3a2a1a" />
          <text x="60" y="96" fontFamily="Georgia, serif" fontSize="13" fill="#3a2a1a">Unclaimed (1880)</text>
        </g>
      </svg>

      <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 12 }}>
        {["1880: Empty", "Britain Claims", "France Claims", "Germany Arrives"].map((label, i) => (
          <button
            key={i}
            onClick={() => setPhase(i)}
            style={{
              padding: "8px 14px",
              fontFamily: "Georgia, serif",
              fontSize: 13,
              background: phase === i ? "#3a2a1a" : "#f4ead5",
              color: phase === i ? "#f4ead5" : "#3a2a1a",
              border: "1.5px solid #3a2a1a",
              cursor: "pointer",
              letterSpacing: "0.05em",
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

function StopArmsRace() {
  const [year, setYear] = useState(1870);
  const data = {
    1870: { GB: 30, DE: 15, FR: 25, RU: 20, AT: 18 },
    1890: { GB: 50, DE: 35, FR: 38, RU: 32, AT: 28 },
    1910: { GB: 75, DE: 70, FR: 55, RU: 50, AT: 40 },
    1914: { GB: 95, DE: 92, FR: 70, RU: 75, AT: 55 },
  };
  const years = [1870, 1890, 1910, 1914];
  const colors = { GB: "#1e3a8a", DE: "#3a2a1a", FR: "#1e5e3e", RU: "#7a1f1f", AT: "#a16207" };
  const names = { GB: "Britain", DE: "Germany", FR: "France", RU: "Russia", AT: "Austria-H." };

  useEffect(() => {
    const t = setInterval(() => {
      setYear((y) => {
        const idx = years.indexOf(y);
        return years[(idx + 1) % years.length];
      });
    }, 2400);
    return () => clearInterval(t);
  }, []);

  const current = data[year];

  return (
    <div style={stageStyles.wrap}>
      <div style={{ padding: "30px 40px" }}>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 56, fontWeight: 700, color: "#8b1a1a", lineHeight: 1 }}>
            {year}
          </div>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 14, color: "#5a3e1f", letterSpacing: "0.15em", marginTop: 4 }}>
            MILITARY EXPENDITURE INDEX
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 600, margin: "0 auto" }}>
          {Object.entries(current).map(([code, val]) => (
            <div key={code} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 110, fontFamily: "Georgia, serif", fontSize: 15, color: "#3a2a1a", fontWeight: 600 }}>
                {names[code]}
              </div>
              <div style={{ flex: 1, height: 28, background: "#e8d9b4", border: "1px solid #5a3e1f", position: "relative" }}>
                <div
                  style={{
                    width: `${val}%`,
                    height: "100%",
                    background: colors[code],
                    transition: "width 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    paddingRight: 8,
                    color: "#f4ead5",
                    fontFamily: "Georgia, serif",
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                >
                  {val}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 24, fontFamily: "Georgia, serif", fontSize: 14, color: "#5a3e1f", fontStyle: "italic", maxWidth: 540, margin: "24px auto 0" }}>
          The Franco-Prussian War of <strong>1870</strong> ignited the race. By <strong>1914</strong>, Germany had nearly caught Britain — and Europe was a powder keg.
        </div>
      </div>
    </div>
  );
}

function StopAlliances() {
  const [show, setShow] = useState(0); // 0=none, 1=alliance, 2=entente, 3=both
  const positions = {
    DE: { x: 420, y: 200, name: "Germany" },
    AT: { x: 500, y: 280, name: "Austria-Hungary" },
    IT: { x: 440, y: 360, name: "Italy" },
    FR: { x: 280, y: 270, name: "France" },
    RU: { x: 640, y: 200, name: "Russia" },
    GB: { x: 220, y: 150, name: "Britain" },
  };

  return (
    <div style={stageStyles.wrap}>
      <svg viewBox="0 0 800 480" style={stageStyles.svg}>
        <rect width="800" height="480" fill="#f4ead5" />

        {/* Triple Alliance triangle */}
        {show >= 1 && (
          <g style={{ animation: "fadein 0.8s ease" }}>
            <polygon
              points={`${positions.DE.x},${positions.DE.y} ${positions.AT.x},${positions.AT.y} ${positions.IT.x},${positions.IT.y}`}
              fill="#8b1a1a"
              opacity="0.18"
            />
            <line x1={positions.DE.x} y1={positions.DE.y} x2={positions.AT.x} y2={positions.AT.y} stroke="#8b1a1a" strokeWidth="3" />
            <line x1={positions.AT.x} y1={positions.AT.y} x2={positions.IT.x} y2={positions.IT.y} stroke="#8b1a1a" strokeWidth="3" />
            <line x1={positions.IT.x} y1={positions.IT.y} x2={positions.DE.x} y2={positions.DE.y} stroke="#8b1a1a" strokeWidth="3" />
          </g>
        )}

        {/* Triple Entente triangle */}
        {show >= 2 && (
          <g style={{ animation: "fadein 0.8s ease" }}>
            <polygon
              points={`${positions.FR.x},${positions.FR.y} ${positions.RU.x},${positions.RU.y} ${positions.GB.x},${positions.GB.y}`}
              fill="#1e3a8a"
              opacity="0.18"
            />
            <line x1={positions.FR.x} y1={positions.FR.y} x2={positions.RU.x} y2={positions.RU.y} stroke="#1e3a8a" strokeWidth="3" />
            <line x1={positions.RU.x} y1={positions.RU.y} x2={positions.GB.x} y2={positions.GB.y} stroke="#1e3a8a" strokeWidth="3" />
            <line x1={positions.GB.x} y1={positions.GB.y} x2={positions.FR.x} y2={positions.FR.y} stroke="#1e3a8a" strokeWidth="3" />
          </g>
        )}

        {/* Country nodes */}
        {Object.entries(positions).map(([code, p]) => {
          const isAlliance = ["DE", "AT", "IT"].includes(code);
          const color = show === 0 ? "#c89858" : isAlliance ? (show >= 1 ? "#8b1a1a" : "#c89858") : show >= 2 ? "#1e3a8a" : "#c89858";
          return (
            <g key={code}>
              <circle cx={p.x} cy={p.y} r="28" fill={color} stroke="#3a2a1a" strokeWidth="2.5" style={{ transition: "fill 0.6s ease" }} />
              <text x={p.x} y={p.y + 6} textAnchor="middle" fontFamily="Georgia, serif" fontSize="15" fontWeight="bold" fill="#fff">
                {code}
              </text>
              <text x={p.x} y={p.y + 50} textAnchor="middle" fontFamily="Georgia, serif" fontSize="13" fill="#3a2a1a" fontWeight="600">
                {p.name}
              </text>
            </g>
          );
        })}

        {/* Labels */}
        {show >= 1 && (
          <text x="465" y="160" textAnchor="middle" fontFamily="'Playfair Display', Georgia, serif" fontSize="22" fontWeight="700" fill="#8b1a1a">
            TRIPLE ALLIANCE
          </text>
        )}
        {show >= 1 && (
          <text x="465" y="180" textAnchor="middle" fontFamily="Georgia, serif" fontSize="13" fontStyle="italic" fill="#8b1a1a">
            (1882)
          </text>
        )}
        {show >= 2 && (
          <text x="380" y="430" textAnchor="middle" fontFamily="'Playfair Display', Georgia, serif" fontSize="22" fontWeight="700" fill="#1e3a8a">
            TRIPLE ENTENTE
          </text>
        )}
        {show >= 2 && (
          <text x="380" y="450" textAnchor="middle" fontFamily="Georgia, serif" fontSize="13" fontStyle="italic" fill="#1e3a8a">
            (1907)
          </text>
        )}
      </svg>

      <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 8 }}>
        {["Reset", "Show Triple Alliance (1882)", "Add Triple Entente (1907)"].map((label, i) => (
          <button
            key={i}
            onClick={() => setShow(i)}
            style={{
              padding: "8px 14px",
              fontFamily: "Georgia, serif",
              fontSize: 13,
              background: show === i ? "#3a2a1a" : "#f4ead5",
              color: show === i ? "#f4ead5" : "#3a2a1a",
              border: "1.5px solid #3a2a1a",
              cursor: "pointer",
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

function StopSarajevo() {
  const [moment, setMoment] = useState(0);
  const moments = [
    { label: "The Motorcade", text: "June 28, 1914. Archduke Franz Ferdinand rides through Sarajevo with his wife Sophie." },
    { label: "The Wrong Turn", text: "After a failed bomb attempt, the driver takes a wrong turn — directly past Gavrilo Princip." },
    { label: "The Shots", text: "Princip fires twice. Sophie dies almost instantly. The Archduke dies minutes later." },
    { label: "The Black Hand", text: "Princip belonged to the 'Black Hand' (Union of Death) — extremist Serbian nationalists wanting all Slavs in one state." },
  ];

  return (
    <div style={stageStyles.wrap}>
      <div style={{ padding: "20px 40px", display: "flex", flexDirection: "column", height: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: 18 }}>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 12, letterSpacing: "0.2em", color: "#8b1a1a" }}>
            SARAJEVO · BOSNIA
          </div>
          <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 38, fontWeight: 700, color: "#3a2a1a", lineHeight: 1.1 }}>
            June 28, 1914
          </div>
        </div>

        {/* Scene SVG */}
        <svg viewBox="0 0 600 220" style={{ width: "100%", maxHeight: 220 }}>
          <rect width="600" height="220" fill="#e8d9b4" />
          {/* Buildings */}
          <rect x="0" y="60" width="600" height="100" fill="#c89858" opacity="0.5" />
          <rect x="40" y="40" width="80" height="120" fill="#a67838" />
          <rect x="140" y="55" width="60" height="105" fill="#a67838" />
          <rect x="220" y="35" width="90" height="125" fill="#a67838" />
          <rect x="330" y="50" width="70" height="110" fill="#a67838" />
          <rect x="420" y="40" width="80" height="120" fill="#a67838" />
          {/* Street */}
          <rect x="0" y="160" width="600" height="60" fill="#5a3e1f" />
          <line x1="0" y1="190" x2="600" y2="190" stroke="#c89858" strokeWidth="2" strokeDasharray="20,15" />

          {/* Car */}
          <g style={{ transform: `translateX(${moment * 120}px)`, transition: "transform 1.2s ease" }}>
            <rect x="200" y="150" width="80" height="25" fill="#1a1a1a" stroke="#000" strokeWidth="1.5" rx="3" />
            <rect x="215" y="135" width="50" height="20" fill="#3a3a3a" stroke="#000" strokeWidth="1" />
            <circle cx="220" cy="180" r="9" fill="#1a1a1a" stroke="#444" strokeWidth="2" />
            <circle cx="265" cy="180" r="9" fill="#1a1a1a" stroke="#444" strokeWidth="2" />
            {moment < 2 && <text x="240" y="148" textAnchor="middle" fontSize="10" fill="#c89858">FF</text>}
          </g>

          {/* Princip */}
          {moment >= 1 && (
            <g style={{ animation: "fadein 0.6s ease" }}>
              <circle cx="430" cy="155" r="6" fill="#3a2a1a" />
              <rect x="427" y="160" width="6" height="14" fill="#3a2a1a" />
              <text x="430" y="135" textAnchor="middle" fontFamily="Georgia, serif" fontSize="11" fill="#8b1a1a" fontWeight="700">
                Princip
              </text>
            </g>
          )}

          {/* Shot indicator */}
          {moment >= 2 && (
            <g style={{ animation: "shotflash 0.5s ease" }}>
              <text x="350" y="120" textAnchor="middle" fontFamily="Georgia, serif" fontSize="32" fontWeight="700" fill="#8b1a1a">
                BANG!
              </text>
            </g>
          )}

          {/* Black Hand symbol */}
          {moment >= 3 && (
            <g style={{ animation: "fadein 0.8s ease" }}>
              <circle cx="100" cy="40" r="22" fill="#000" stroke="#8b1a1a" strokeWidth="2" />
              <text x="100" y="46" textAnchor="middle" fontSize="22">✋</text>
              <text x="100" y="80" textAnchor="middle" fontFamily="Georgia, serif" fontSize="11" fontWeight="700" fill="#8b1a1a">
                BLACK HAND
              </text>
            </g>
          )}
        </svg>

        <div style={{ textAlign: "center", padding: "16px 20px", background: "#3a2a1a", color: "#f4ead5", borderRadius: 4, marginTop: 18, minHeight: 70 }}>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 12, letterSpacing: "0.2em", color: "#c89858", marginBottom: 6 }}>
            {moments[moment].label.toUpperCase()}
          </div>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 15, lineHeight: 1.5 }}>
            {moments[moment].text}
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 14 }}>
          {moments.map((m, i) => (
            <button
              key={i}
              onClick={() => setMoment(i)}
              style={{
                padding: "6px 12px",
                fontFamily: "Georgia, serif",
                fontSize: 12,
                background: moment === i ? "#8b1a1a" : "#f4ead5",
                color: moment === i ? "#f4ead5" : "#3a2a1a",
                border: "1.5px solid #3a2a1a",
                cursor: "pointer",
              }}
            >
              {i + 1}. {m.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function StopCascade() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  const events = [
    { date: "Jul 23", text: "Austria-Hungary issues 11-point ultimatum to Serbia", from: "AT", to: "RS", color: "#a16207" },
    { date: "Jul 28", text: "Austria-Hungary declares war on Serbia", from: "AT", to: "RS", color: "#8b1a1a" },
    { date: "Aug 1", text: "Germany declares war on Russia (defending ally Austria)", from: "DE", to: "RU", color: "#8b1a1a" },
    { date: "Aug 3", text: "Germany declares war on France (Russia's ally)", from: "DE", to: "FR", color: "#8b1a1a" },
    { date: "Aug 4", text: "Germany invades neutral Belgium → Britain declares war on Germany", from: "GB", to: "DE", color: "#8b1a1a" },
  ];

  const positions = {
    DE: { x: 420, y: 200, name: "Germany" },
    AT: { x: 500, y: 280, name: "Austria-H." },
    IT: { x: 440, y: 360, name: "Italy" },
    FR: { x: 280, y: 270, name: "France" },
    RU: { x: 640, y: 200, name: "Russia" },
    GB: { x: 220, y: 150, name: "Britain" },
    RS: { x: 540, y: 360, name: "Serbia" },
  };

  useEffect(() => {
    if (!playing) return;
    if (step >= events.length) {
      setPlaying(false);
      return;
    }
    const t = setTimeout(() => setStep((s) => s + 1), 1800);
    return () => clearTimeout(t);
  }, [playing, step]);

  const reset = () => {
    setPlaying(false);
    setStep(0);
  };

  return (
    <div style={stageStyles.wrap}>
      <div style={{ display: "flex", height: "100%" }}>
        <svg viewBox="0 0 800 480" style={{ flex: 1 }}>
          <rect width="800" height="480" fill="#f4ead5" />

          {/* Background alliance lines (faded) */}
          <line x1={positions.DE.x} y1={positions.DE.y} x2={positions.AT.x} y2={positions.AT.y} stroke="#8b1a1a" strokeWidth="1" opacity="0.2" />
          <line x1={positions.FR.x} y1={positions.FR.y} x2={positions.RU.x} y2={positions.RU.y} stroke="#1e3a8a" strokeWidth="1" opacity="0.2" />
          <line x1={positions.GB.x} y1={positions.GB.y} x2={positions.FR.x} y2={positions.FR.y} stroke="#1e3a8a" strokeWidth="1" opacity="0.2" />
          <line x1={positions.GB.x} y1={positions.GB.y} x2={positions.RU.x} y2={positions.RU.y} stroke="#1e3a8a" strokeWidth="1" opacity="0.2" />

          {/* Cascade arrows */}
          {events.slice(0, step).map((e, i) => {
            const from = positions[e.from];
            const to = positions[e.to];
            return (
              <g key={i} style={{ animation: "drawline 0.8s ease" }}>
                <defs>
                  <marker id={`arr${i}`} markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
                    <polygon points="0,0 10,5 0,10" fill={e.color} />
                  </marker>
                </defs>
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={e.color}
                  strokeWidth="3.5"
                  markerEnd={`url(#arr${i})`}
                  opacity="0.9"
                />
              </g>
            );
          })}

          {/* Country nodes */}
          {Object.entries(positions).map(([code, p]) => {
            const involvedRecent = events[step - 1] && (events[step - 1].from === code || events[step - 1].to === code);
            return (
              <g key={code}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={involvedRecent ? 30 : 26}
                  fill={involvedRecent ? "#8b1a1a" : "#c89858"}
                  stroke="#3a2a1a"
                  strokeWidth="2.5"
                  style={{ transition: "all 0.4s ease" }}
                />
                <text x={p.x} y={p.y + 6} textAnchor="middle" fontFamily="Georgia, serif" fontSize="14" fontWeight="bold" fill="#fff">
                  {code}
                </text>
                <text x={p.x} y={p.y + 48} textAnchor="middle" fontFamily="Georgia, serif" fontSize="12" fill="#3a2a1a" fontWeight="600">
                  {p.name}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Sidebar log */}
        <div style={{ width: 280, background: "#3a2a1a", color: "#f4ead5", padding: 20, display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 11, letterSpacing: "0.2em", color: "#c89858", marginBottom: 14 }}>
            DECLARATION LOG
          </div>
          <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12 }}>
            {events.map((e, i) => (
              <div
                key={i}
                style={{
                  borderLeft: `3px solid ${i < step ? e.color : "#5a3e1f"}`,
                  paddingLeft: 10,
                  opacity: i < step ? 1 : 0.35,
                  transition: "opacity 0.5s",
                }}
              >
                <div style={{ fontFamily: "Georgia, serif", fontSize: 11, color: "#c89858", letterSpacing: "0.1em" }}>
                  {e.date.toUpperCase()}, 1914
                </div>
                <div style={{ fontFamily: "Georgia, serif", fontSize: 13, lineHeight: 1.4, marginTop: 3 }}>
                  {e.text}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
            <button
              onClick={() => setPlaying((v) => !v)}
              disabled={step >= events.length}
              style={{
                flex: 1,
                padding: "10px",
                background: playing ? "#5a3e1f" : "#8b1a1a",
                color: "#f4ead5",
                border: "none",
                fontFamily: "Georgia, serif",
                fontSize: 13,
                cursor: step >= events.length ? "default" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                letterSpacing: "0.1em",
              }}
            >
              {step >= events.length ? "DONE" : playing ? <><Pause size={12} /> PAUSE</> : <><Play size={12} /> PLAY CASCADE</>}
            </button>
            <button
              onClick={reset}
              style={{
                padding: "10px",
                background: "transparent",
                color: "#c89858",
                border: "1.5px solid #c89858",
                fontFamily: "Georgia, serif",
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              <RotateCcw size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StopCascadeQuiz() {
  const questions = [
    {
      q: "On what date did Austria-Hungary officially declare war on Serbia, starting the cascade?",
      options: ["June 28, 1914", "July 23, 1914", "July 28, 1914", "August 1, 1914"],
      answer: 2,
      explain: "July 28, 1914 — exactly one month after the Sarajevo assassination.",
    },
    {
      q: "Germany's invasion of which neutral country caused Britain to enter the war on 4 August 1914?",
      options: ["France", "Serbia", "Belgium", "Russia"],
      answer: 2,
      explain: "Belgium — Britain had guaranteed Belgian neutrality in the 1839 Treaty of London.",
    },
    {
      q: "Which secret organisation was behind the assassination of Archduke Franz Ferdinand?",
      options: ["Triple Alliance", "Triple Entente", "Bolsheviks", "Black Hand"],
      answer: 3,
      explain: "The Black Hand (Union of Death) — an extremist Serbian nationalist group.",
    },
  ];

  const [selected, setSelected] = useState(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const allAnswered = selected.every((s) => s !== null);
  const score = submitted ? selected.filter((s, i) => s === questions[i].answer).length : 0;

  const pick = (qi, oi) => {
    if (submitted) return;
    setSelected((prev) => prev.map((v, i) => (i === qi ? oi : v)));
  };

  const reset = () => {
    setSelected(Array(questions.length).fill(null));
    setSubmitted(false);
  };

  const scoreColor = score === questions.length ? "#1e5e3e" : score >= 2 ? "#a16207" : "#8b1a1a";

  return (
    <div style={{ ...stageStyles.wrap, overflowY: "auto" }}>
      <div style={{ maxWidth: 740, margin: "0 auto", padding: "28px 20px", width: "100%" }}>

        <div style={{ fontFamily: "var(--t-font)", fontSize: 11, letterSpacing: "0.25em", color: "var(--t-accent)", fontWeight: 700, marginBottom: 24 }}>
          CHECKPOINT · SLIDES 1 – 7
        </div>

        {questions.map((q, qi) => (
          <div key={qi} style={{ marginBottom: 32 }}>
            <div style={{ fontFamily: "var(--t-heading-font)", fontSize: 18, fontWeight: 700, color: "var(--t-text)", lineHeight: 1.35, marginBottom: 12 }}>
              {qi + 1}.&nbsp;{q.q}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {q.options.map((opt, oi) => {
                const isSel = selected[qi] === oi;
                const isRight = oi === q.answer;
                let bg = "transparent", border = "var(--t-accent)", color = "var(--t-text)", fw = 400;
                if (submitted) {
                  if (isRight)            { bg = "#1e5e3e"; border = "#1e5e3e"; color = "#fff"; fw = 700; }
                  else if (isSel)         { bg = "#8b1a1a"; border = "#8b1a1a"; color = "#fff"; fw = 700; }
                  else                    { border = "var(--t-muted)"; color = "var(--t-muted)"; }
                } else if (isSel) {
                  bg = "var(--t-accent)"; color = "var(--t-on-accent)"; fw = 700;
                }
                return (
                  <button
                    key={oi}
                    onClick={() => pick(qi, oi)}
                    style={{
                      background: bg,
                      border: `2px solid ${border}`,
                      color,
                      fontWeight: fw,
                      fontFamily: "var(--t-font)",
                      fontSize: 14,
                      padding: "10px 14px",
                      textAlign: "left",
                      cursor: submitted ? "default" : "pointer",
                      lineHeight: 1.35,
                      transition: "all 0.2s",
                    }}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            {submitted && (
              <div style={{ marginTop: 8, fontFamily: "var(--t-font)", fontSize: 13, color: "#1e5e3e", fontStyle: "italic" }}>
                ✓ {q.explain}
              </div>
            )}
          </div>
        ))}

        {!submitted ? (
          <button
            onClick={() => setSubmitted(true)}
            disabled={!allAnswered}
            style={{
              background: allAnswered ? "var(--t-danger)" : "transparent",
              border: "2px solid var(--t-danger)",
              color: allAnswered ? "var(--t-text-light)" : "var(--t-muted)",
              fontFamily: "var(--t-font)",
              fontSize: 13,
              letterSpacing: "0.15em",
              fontWeight: 700,
              padding: "12px 28px",
              cursor: allAnswered ? "pointer" : "default",
              transition: "all 0.2s",
            }}
          >
            CHECK ANSWERS
          </button>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
            <div style={{ fontFamily: "var(--t-heading-font)", fontSize: 28, fontWeight: 900, color: scoreColor }}>
              {score} / {questions.length}
              <span style={{ fontFamily: "var(--t-font)", fontSize: 14, fontWeight: 400, color: "var(--t-muted)", marginLeft: 10 }}>
                {score === questions.length ? "Perfect!" : score >= 2 ? "Well done" : "Keep reviewing"}
              </span>
            </div>
            <button
              onClick={reset}
              style={{
                background: "transparent",
                border: "2px solid var(--t-accent)",
                color: "var(--t-accent)",
                fontFamily: "var(--t-font)",
                fontSize: 12,
                letterSpacing: "0.15em",
                fontWeight: 700,
                padding: "10px 20px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <RotateCcw size={13} /> TRY AGAIN
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function StopFronts() {
  return (
    <div style={stageStyles.wrap}>
      <svg viewBox="0 0 800 460" style={stageStyles.svg}>
        <rect width="800" height="460" fill="#f4ead5" />
        {/* Europe outline */}
        <path
          d="M 100 100 L 700 100 L 720 350 L 100 380 Z"
          fill="#e8d9b4"
          stroke="#5a3e1f"
          strokeWidth="1"
          opacity="0.5"
        />

        {/* WESTERN FRONT */}
        <g>
          <rect x="120" y="120" width="280" height="250" fill="#8b1a1a" opacity="0.08" />
          <text x="260" y="145" textAnchor="middle" fontFamily="'Playfair Display', Georgia, serif" fontSize="22" fontWeight="700" fill="#8b1a1a">
            WESTERN FRONT
          </text>

          {/* Trench line zigzag */}
          <path
            d="M 180 180 L 200 200 L 220 180 L 240 200 L 260 180 L 280 200 L 300 180 L 320 200 L 340 180"
            stroke="#3a2a1a"
            strokeWidth="3"
            fill="none"
            strokeDasharray="3,2"
          />
          <text x="260" y="225" textAnchor="middle" fontFamily="Georgia, serif" fontSize="11" fill="#3a2a1a" fontStyle="italic">
            Trench line — France/Belgium
          </text>

          {/* Battle of Marne marker */}
          <g>
            <circle cx="290" cy="270" r="14" fill="#8b1a1a" stroke="#3a2a1a" strokeWidth="2" />
            <text x="290" y="275" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#fff">★</text>
            <text x="290" y="305" textAnchor="middle" fontFamily="Georgia, serif" fontSize="13" fontWeight="700" fill="#3a2a1a">
              Battle of the Marne
            </text>
            <text x="290" y="322" textAnchor="middle" fontFamily="Georgia, serif" fontSize="11" fill="#5a3e1f" fontStyle="italic">
              15 miles from Paris · Sept 1914
            </text>
            <text x="290" y="345" textAnchor="middle" fontFamily="Georgia, serif" fontSize="11" fill="#8b1a1a" fontWeight="700">
              ◆ TURNING POINT ◆
            </text>
          </g>
        </g>

        {/* Divider */}
        <line x1="400" y1="120" x2="400" y2="370" stroke="#5a3e1f" strokeWidth="1.5" strokeDasharray="6,4" />

        {/* EASTERN FRONT */}
        <g>
          <rect x="420" y="120" width="280" height="250" fill="#1e3a8a" opacity="0.08" />
          <text x="560" y="145" textAnchor="middle" fontFamily="'Playfair Display', Georgia, serif" fontSize="22" fontWeight="700" fill="#1e3a8a">
            EASTERN FRONT
          </text>

          {/* Russian arrow */}
          <defs>
            <marker id="arrowE" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
              <polygon points="0,0 10,5 0,10" fill="#1e3a8a" />
            </marker>
            <marker id="arrowW" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
              <polygon points="0,0 10,5 0,10" fill="#3a2a1a" />
            </marker>
          </defs>
          <line x1="660" y1="200" x2="500" y2="220" stroke="#1e3a8a" strokeWidth="3" markerEnd="url(#arrowE)" />
          <text x="600" y="195" textAnchor="middle" fontFamily="Georgia, serif" fontSize="11" fill="#1e3a8a" fontStyle="italic">
            Russia advances
          </text>

          <line x1="450" y1="280" x2="610" y2="260" stroke="#3a2a1a" strokeWidth="3" markerEnd="url(#arrowW)" />
          <text x="530" y="298" textAnchor="middle" fontFamily="Georgia, serif" fontSize="11" fill="#3a2a1a" fontStyle="italic">
            Germany & Austria push back
          </text>

          <text x="560" y="335" textAnchor="middle" fontFamily="Georgia, serif" fontSize="12" fill="#3a2a1a">
            Russians captured · Romania, Serbia, Italy fall
          </text>
        </g>

        <text x="400" y="410" textAnchor="middle" fontFamily="Georgia, serif" fontSize="14" fill="#5a3e1f" fontStyle="italic">
          Germany now fights a war on TWO FRONTS — its strategic nightmare.
        </text>
      </svg>
    </div>
  );
}

function StopTrenches() {
  const [hot, setHot] = useState(null);

  const hotspots = [
    { id: "mg", x: 130, y: 90, label: "Machine Guns", text: "Above-ground movement = death. Machine guns mowed down anyone who tried to cross 'no man's land'." },
    { id: "gas", x: 350, y: 70, label: "Poison Gas", text: "Chlorine and mustard gas, drifting silently in clouds. New weapon, new horror." },
    { id: "rats", x: 280, y: 280, label: "Rats & Lice", text: "Rats grew fat on corpses. Lice infested every soldier — 'trench fever' was inevitable." },
    { id: "mud", x: 480, y: 320, label: "Mud", text: "Rain turned trenches into thick mud caves. Men drowned in it." },
    { id: "dead", x: 600, y: 260, label: "Bodies", text: "Dead soldiers couldn't be retrieved. The stench was constant. So was the despair." },
    { id: "food", x: 200, y: 320, label: "Hunger", text: "Food shortages were chronic. Cold rations, stale bread, and never enough." },
  ];

  return (
    <div style={stageStyles.wrap}>
      <svg viewBox="0 0 800 420" style={stageStyles.svg}>
        {/* Sky */}
        <rect x="0" y="0" width="800" height="160" fill="#7a6347" />
        {/* Smoke clouds */}
        <ellipse cx="200" cy="40" rx="80" ry="20" fill="#5a3e1f" opacity="0.6" />
        <ellipse cx="500" cy="30" rx="100" ry="22" fill="#5a3e1f" opacity="0.5" />
        <ellipse cx="700" cy="50" rx="60" ry="15" fill="#5a3e1f" opacity="0.6" />

        {/* Ground */}
        <rect x="0" y="160" width="800" height="260" fill="#5a3e1f" />

        {/* Trench cross-section */}
        <path
          d="M 0 200 L 100 200 L 130 280 L 250 280 L 280 200 L 320 200 L 350 110 L 400 110 L 430 200 L 470 200 L 500 280 L 620 280 L 650 200 L 800 200 L 800 420 L 0 420 Z"
          fill="#3a2a1a"
        />

        {/* Sandbags */}
        {[100, 280, 470, 650].map((x, i) => (
          <g key={i}>
            <ellipse cx={x - 5} cy="195" rx="12" ry="6" fill="#8b6914" />
            <ellipse cx={x + 10} cy="195" rx="12" ry="6" fill="#8b6914" />
          </g>
        ))}

        {/* Soldiers (silhouettes) */}
        <g>
          <circle cx="180" cy="240" r="8" fill="#1a1a1a" />
          <rect x="175" y="248" width="10" height="20" fill="#1a1a1a" />
        </g>
        <g>
          <circle cx="550" cy="240" r="8" fill="#1a1a1a" />
          <rect x="545" y="248" width="10" height="20" fill="#1a1a1a" />
        </g>

        {/* Hotspots */}
        {hotspots.map((h) => (
          <g key={h.id} onClick={() => setHot(h.id)} style={{ cursor: "pointer" }}>
            <circle
              cx={h.x}
              cy={h.y}
              r={hot === h.id ? 16 : 13}
              fill="#c89858"
              stroke="#3a2a1a"
              strokeWidth="2.5"
              style={{ transition: "all 0.3s", animation: hot === h.id ? "none" : "pulse 2s ease-in-out infinite" }}
            />
            <text x={h.x} y={h.y + 5} textAnchor="middle" fontSize="14" fontWeight="700" fill="#3a2a1a">+</text>
          </g>
        ))}

        {/* Tooltip */}
        {hot && (() => {
          const h = hotspots.find((x) => x.id === hot);
          return (
            <g>
              <rect x="50" y="350" width="700" height="55" fill="#f4ead5" stroke="#3a2a1a" strokeWidth="2" />
              <text x="70" y="372" fontFamily="Georgia, serif" fontSize="14" fontWeight="700" fill="#8b1a1a" letterSpacing="0.1em">
                {h.label.toUpperCase()}
              </text>
              <text x="70" y="392" fontFamily="Georgia, serif" fontSize="13" fill="#3a2a1a">
                {h.text}
              </text>
            </g>
          );
        })()}

        {!hot && (
          <text x="400" y="385" textAnchor="middle" fontFamily="Georgia, serif" fontSize="14" fill="#f4ead5" fontStyle="italic">
            Click any glowing marker to discover what trench life was really like.
          </text>
        )}
      </svg>
    </div>
  );
}

function StopUSARussia() {
  const [side, setSide] = useState("both"); // 'usa' | 'russia' | 'both'

  return (
    <div style={stageStyles.wrap}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, padding: 20, height: "100%" }}>
        {/* USA enters */}
        <div
          style={{
            background: "#1e3a8a",
            color: "#f4ead5",
            padding: "24px 26px",
            borderRadius: 4,
            opacity: side === "russia" ? 0.3 : 1,
            transition: "opacity 0.4s",
            cursor: "pointer",
          }}
          onClick={() => setSide(side === "usa" ? "both" : "usa")}
        >
          <div style={{ fontFamily: "Georgia, serif", fontSize: 12, letterSpacing: "0.2em", color: "#c89858" }}>
            APRIL 6, 1917
          </div>
          <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 32, fontWeight: 700, lineHeight: 1.1, marginTop: 6 }}>
            USA Enters the War
          </div>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 14, lineHeight: 1.5, marginTop: 14 }}>
            <strong style={{ color: "#c89858" }}>The Trigger:</strong> A German U-boat sinks the British liner <em>Lusitania</em> in 1915. Of 1,153 dead, <strong>128 are American</strong>.
          </div>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 14, lineHeight: 1.5, marginTop: 10 }}>
            <strong style={{ color: "#c89858" }}>The Money:</strong> The USA has lent vast sums to the Allies. If Germany wins, those loans vanish — and Germany becomes a rival superpower.
          </div>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 14, lineHeight: 1.5, marginTop: 10, fontStyle: "italic", borderTop: "1px solid #c89858", paddingTop: 10 }}>
            Result: Fresh American troops, money, and morale tilt the war toward the Allies.
          </div>
        </div>

        {/* Russia exits */}
        <div
          style={{
            background: "#7a1f1f",
            color: "#f4ead5",
            padding: "24px 26px",
            borderRadius: 4,
            opacity: side === "usa" ? 0.3 : 1,
            transition: "opacity 0.4s",
            cursor: "pointer",
          }}
          onClick={() => setSide(side === "russia" ? "both" : "russia")}
        >
          <div style={{ fontFamily: "Georgia, serif", fontSize: 12, letterSpacing: "0.2em", color: "#c89858" }}>
            OCTOBER 1917 → MARCH 1918
          </div>
          <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 32, fontWeight: 700, lineHeight: 1.1, marginTop: 6 }}>
            Russia Exits the War
          </div>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 14, lineHeight: 1.5, marginTop: 14 }}>
            <strong style={{ color: "#c89858" }}>The Cost:</strong> Over <strong>600,000 Russian soldiers killed</strong>. The Tsar collapses.
          </div>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 14, lineHeight: 1.5, marginTop: 10 }}>
            <strong style={{ color: "#c89858" }}>The Revolution:</strong> Lenin's Bolsheviks seize power and immediately issue the <em>Decree on Peace</em>.
          </div>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 14, lineHeight: 1.5, marginTop: 10 }}>
            <strong style={{ color: "#c89858" }}>The Treaty:</strong> March 1918 — <em>Treaty of Brest-Litovsk</em> with Germany. Russia surrenders huge territories.
          </div>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 14, lineHeight: 1.5, marginTop: 10, fontStyle: "italic", borderTop: "1px solid #c89858", paddingTop: 10 }}>
            Result: Germany frees up Eastern troops — but it's too late. The Americans are coming.
          </div>
        </div>
      </div>
      <div style={{ textAlign: "center", padding: "0 20px 14px", fontFamily: "Georgia, serif", fontSize: 14, color: "#5a3e1f", fontStyle: "italic" }}>
        1917 was the war's hinge: one giant joins as another walks out.
      </div>
    </div>
  );
}

function StopVersailles() {
  const [active, setActive] = useState(null);

  const terms = [
    { id: 1, short: "War Guilt", text: "Germany declared solely guilty of aggression." },
    { id: 2, short: "Reparations", text: "Germany must pay $33 billion + supply ships, coal, gold for ten years." },
    { id: 3, short: "Rhine Demilitarised", text: "Rhine Valley demilitarised; west bank occupied by Allies for 15 years." },
    { id: 4, short: "Lost: Alsace-Lorraine", text: "Returned to France. Eupen-et-Malmedy → Belgium. Schleswig → Denmark. Danzig → Free Port (Polish territory)." },
    { id: 5, short: "Lost Territory", text: "Pre-war territory ceded to Denmark, Belgium, Poland, Czechoslovakia, France." },
    { id: 6, short: "Saar Coal", text: "Saar coal mines to France for 15 years; area governed by League of Nations." },
    { id: 7, short: "Colonies Lost", text: "All overseas colonies stripped — given to Britain, Belgium, South Africa, Portugal, Japan." },
    { id: 8, short: "Pacific & China", text: "German colonies in Pacific and concessions in China handed to Japan." },
    { id: 9, short: "Army Capped", text: "Army limited to 100,000. Navy: 15,000 men, 24 ships. No air force, no submarines." },
    { id: 10, short: "New Nations", text: "Treaty affirmed independence of Belgium, Poland, Czechoslovakia, Yugoslavia." },
    { id: 11, short: "League of Nations", text: "Covenant of the League of Nations attached to the Treaty itself." },
  ];

  return (
    <div style={stageStyles.wrap}>
      <div style={{ padding: 20, height: "100%", display: "flex", flexDirection: "column" }}>
        <div style={{ textAlign: "center", marginBottom: 12 }}>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 12, letterSpacing: "0.2em", color: "#8b1a1a" }}>
            SIGNED · HALL OF MIRRORS · VERSAILLES
          </div>
          <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 30, fontWeight: 700, color: "#3a2a1a" }}>
            June 28, 1919
          </div>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 12, color: "#5a3e1f", fontStyle: "italic" }}>
            Five years to the day after Sarajevo. The Big Three: Wilson · Lloyd George · Clemenceau.
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, flex: 1 }}>
          {terms.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id === active ? null : t.id)}
              style={{
                padding: "10px 8px",
                background: active === t.id ? "#8b1a1a" : "#f4ead5",
                color: active === t.id ? "#f4ead5" : "#3a2a1a",
                border: "1.5px solid #3a2a1a",
                cursor: "pointer",
                fontFamily: "Georgia, serif",
                textAlign: "left",
                transition: "all 0.2s",
              }}
            >
              <div style={{ fontSize: 10, letterSpacing: "0.15em", color: active === t.id ? "#c89858" : "#8b1a1a", fontWeight: 700 }}>
                ARTICLE {t.id}
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, marginTop: 2 }}>{t.short}</div>
            </button>
          ))}
        </div>

        <div
          style={{
            marginTop: 14,
            padding: "16px 20px",
            background: "#3a2a1a",
            color: "#f4ead5",
            minHeight: 60,
            borderRadius: 4,
            fontFamily: "Georgia, serif",
            fontSize: 14,
            lineHeight: 1.5,
            fontStyle: active ? "normal" : "italic",
            textAlign: active ? "left" : "center",
          }}
        >
          {active ? terms.find((t) => t.id === active).text : "Click any article to read its terms. All eleven were designed to ensure Germany never wars again."}
        </div>
      </div>
    </div>
  );
}

function StopAftermath() {
  const [layer, setLayer] = useState(0);

  return (
    <div style={stageStyles.wrap}>
      <svg viewBox="0 0 800 460" style={stageStyles.svg}>
        <rect width="800" height="460" fill="#f4ead5" />

        {/* 3 dynasties fallen */}
        {layer >= 1 && (
          <g style={{ animation: "fadein 0.8s ease" }}>
            <text x="400" y="60" textAnchor="middle" fontFamily="'Playfair Display', Georgia, serif" fontSize="20" fontWeight="700" fill="#8b1a1a">
              THREE DYNASTIES FALL
            </text>
            {[
              { x: 200, name: "Romanov", country: "Russia" },
              { x: 400, name: "Hohenzollern", country: "Germany" },
              { x: 600, name: "Hapsburg", country: "Austria-Hungary" },
            ].map((d, i) => (
              <g key={i}>
                <text x={d.x} y={100} textAnchor="middle" fontSize="32">👑</text>
                <line x1={d.x - 25} y1={85} x2={d.x + 25} y2={115} stroke="#8b1a1a" strokeWidth="3" />
                <text x={d.x} y={135} textAnchor="middle" fontFamily="Georgia, serif" fontSize="14" fontWeight="700" fill="#3a2a1a">
                  {d.name}
                </text>
                <text x={d.x} y={150} textAnchor="middle" fontFamily="Georgia, serif" fontSize="11" fill="#5a3e1f" fontStyle="italic">
                  ({d.country})
                </text>
              </g>
            ))}
          </g>
        )}

        {/* New nations */}
        {layer >= 2 && (
          <g style={{ animation: "fadein 0.8s ease" }}>
            <text x="400" y="195" textAnchor="middle" fontFamily="'Playfair Display', Georgia, serif" fontSize="20" fontWeight="700" fill="#1e5e3e">
              NEW NATIONS RISE
            </text>
            <g transform="translate(60, 215)">
              {["Finland", "Estonia", "Latvia", "Lithuania", "Poland", "Czechoslovakia", "Yugoslavia"].map((n, i) => (
                <g key={i} transform={`translate(${i * 100}, 0)`}>
                  <rect x="0" y="0" width="90" height="36" fill="#1e5e3e" rx="4" />
                  <text x="45" y="22" textAnchor="middle" fontFamily="Georgia, serif" fontSize="12" fontWeight="700" fill="#f4ead5">
                    {n}
                  </text>
                </g>
              ))}
            </g>
            <text x="400" y="280" textAnchor="middle" fontFamily="Georgia, serif" fontSize="12" fill="#5a3e1f" fontStyle="italic">
              Empires of mixed cultures dissolved into nation-states by language and identity.
            </text>
          </g>
        )}

        {/* League of Nations */}
        {layer >= 3 && (
          <g style={{ animation: "fadein 0.8s ease" }}>
            <text x="400" y="320" textAnchor="middle" fontFamily="'Playfair Display', Georgia, serif" fontSize="20" fontWeight="700" fill="#1e3a8a">
              THE LEAGUE OF NATIONS · 1920
            </text>
            <circle cx="400" cy="385" r="40" fill="none" stroke="#1e3a8a" strokeWidth="3" />
            <circle cx="400" cy="385" r="28" fill="none" stroke="#1e3a8a" strokeWidth="2" />
            <text x="400" y="392" textAnchor="middle" fontSize="22">🌍</text>
            <text x="400" y="445" textAnchor="middle" fontFamily="Georgia, serif" fontSize="12" fill="#5a3e1f" fontStyle="italic">
              Built to prevent another world war. Failed by 1939. The story continues…
            </text>
          </g>
        )}

        {layer === 0 && (
          <text x="400" y="230" textAnchor="middle" fontFamily="Georgia, serif" fontSize="16" fill="#5a3e1f" fontStyle="italic">
            Click below to reveal the new world order.
          </text>
        )}
      </svg>

      <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 4 }}>
        {["Reset", "Dynasties Fall", "New Nations", "League of Nations"].map((l, i) => (
          <button
            key={i}
            onClick={() => setLayer(i)}
            style={{
              padding: "8px 14px",
              fontFamily: "Georgia, serif",
              fontSize: 13,
              background: layer === i ? "#3a2a1a" : "#f4ead5",
              color: layer === i ? "#f4ead5" : "#3a2a1a",
              border: "1.5px solid #3a2a1a",
              cursor: "pointer",
            }}
          >
            {l}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   STYLES
   ============================================================ */

const makeGlobalCSS = (themeVars) => {
  const varBlock = Object.entries(themeVars).map(([k, v]) => `  ${k}: ${v};`).join("\n");
  return `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Crimson+Text:ital,wght@0,400;0,600;1,400&family=Space+Grotesk:wght@400;600;700;800&display=swap');

:root {
${varBlock}
}

@keyframes fadein {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
@keyframes shotflash {
  0% { opacity: 0; transform: scale(0.5); }
  50% { opacity: 1; transform: scale(1.2); }
  100% { opacity: 1; transform: scale(1); }
}
@keyframes drawline {
  from { stroke-dasharray: 1000; stroke-dashoffset: 1000; }
  to { stroke-dasharray: 1000; stroke-dashoffset: 0; }
}
`;
};

const styles = {
  app: {
    minHeight: "100vh",
    background: "var(--t-bg)",
    fontFamily: "var(--t-font)",
    color: "var(--t-text)",
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  masthead: {
    background: "var(--t-dark)",
    color: "var(--t-text-light)",
    padding: "20px 32px",
    borderBottom: "var(--t-nav-border)",
  },
  mastheadInner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    maxWidth: 1400,
    margin: "0 auto",
  },
  mastheadLeft: {},
  eyebrow: {
    fontFamily: "var(--t-font)",
    fontSize: 12,
    letterSpacing: "0.3em",
    color: "var(--t-accent)",
  },
  mastheadTitle: {
    fontFamily: "var(--t-heading-font)",
    fontSize: 48,
    fontWeight: 900,
    letterSpacing: "0.02em",
    margin: "4px 0 2px",
    lineHeight: 1,
  },
  mastheadSub: {
    fontFamily: "var(--t-font)",
    fontSize: 14,
    fontStyle: "italic",
    color: "var(--t-accent)",
  },
  mastheadRight: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  yearBadge: {
    border: "2px solid var(--t-accent)",
    padding: "8px 18px",
    textAlign: "center",
  },
  yearLabel: {
    fontSize: 10,
    letterSpacing: "0.3em",
    color: "var(--t-accent)",
  },
  yearValue: {
    fontFamily: "var(--t-heading-font)",
    fontSize: 22,
    fontWeight: 700,
    color: "var(--t-text-light)",
    marginTop: 2,
  },
  stopHeader: {
    background: "var(--t-surface)",
    padding: "20px 32px 16px",
    borderBottom: "1px solid var(--t-accent)",
    textAlign: "center",
  },
  stopNumber: {
    fontFamily: "var(--t-font)",
    fontSize: 11,
    letterSpacing: "0.3em",
    color: "var(--t-danger)",
    fontWeight: 600,
  },
  stopTitle: {
    fontFamily: "var(--t-heading-font)",
    fontSize: 36,
    fontWeight: 700,
    color: "var(--t-text)",
    margin: "4px 0 2px",
    lineHeight: 1.1,
  },
  stopSubtitle: {
    fontFamily: "var(--t-font)",
    fontSize: 16,
    fontStyle: "italic",
    color: "var(--t-muted)",
  },
  stage: {
    flex: 1,
    background: "var(--t-surface)",
    minHeight: 480,
    display: "flex",
    flexDirection: "column",
    position: "relative",
    overflow: "hidden",
  },
  examNote: {
    position: "fixed",
    top: 130,
    right: 24,
    width: 280,
    background: "var(--t-exam-bg)",
    border: "2px solid var(--t-danger)",
    boxShadow: "4px 4px 0 var(--t-dark)",
    padding: "10px 14px 12px",
    zIndex: 50,
    fontFamily: "var(--t-font)",
  },
  examNoteHeader: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 11,
    color: "var(--t-danger)",
    fontWeight: 700,
    borderBottom: "1px solid var(--t-danger)",
    paddingBottom: 6,
    marginBottom: 8,
  },
  examClose: {
    marginLeft: "auto",
    background: "none",
    border: "none",
    color: "var(--t-danger)",
    cursor: "pointer",
    padding: 2,
  },
  examBody: {
    fontSize: 13,
    color: "var(--t-text)",
    lineHeight: 1.5,
  },
  examOpenButton: {
    position: "fixed",
    top: 130,
    right: 24,
    background: "var(--t-danger)",
    color: "var(--t-text-light)",
    border: "none",
    padding: "8px 12px",
    fontFamily: "var(--t-font)",
    fontSize: 12,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 6,
    boxShadow: "3px 3px 0 var(--t-dark)",
    zIndex: 50,
  },
  scriptOverlay: {
    position: "fixed",
    inset: 0,
    background: "var(--t-overlay)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
    padding: 20,
  },
  scriptCard: {
    background: "var(--t-surface)",
    border: "3px solid var(--t-dark)",
    boxShadow: "8px 8px 0 var(--t-danger)",
    padding: 30,
    maxWidth: 600,
    width: "100%",
    fontFamily: "var(--t-font)",
  },
  scriptHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "2px solid var(--t-accent)",
    paddingBottom: 10,
    marginBottom: 16,
  },
  scriptLabel: {
    fontSize: 12,
    letterSpacing: "0.3em",
    color: "var(--t-danger)",
    fontWeight: 700,
  },
  scriptClose: {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "var(--t-text)",
  },
  scriptBody: {
    fontSize: 17,
    lineHeight: 1.6,
    color: "var(--t-text)",
  },
  nav: {
    background: "var(--t-dark)",
    padding: "16px 32px",
    display: "flex",
    alignItems: "center",
    gap: 16,
    borderTop: "var(--t-nav-border)",
  },
  navButton: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    color: "var(--t-accent)",
    padding: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  navArrow: {
    background: "var(--t-accent)",
    color: "var(--t-on-accent)",
    width: 44,
    height: 44,
    borderRadius: "50%",
  },
  scriptButton: {
    background: "var(--t-danger)",
    color: "var(--t-text-light)",
    border: "none",
    padding: "10px 16px",
    fontFamily: "var(--t-font)",
    fontSize: 13,
    letterSpacing: "0.1em",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  dotsContainer: {
    display: "flex",
    gap: 6,
    flex: 1,
    justifyContent: "center",
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: "50%",
    border: "2px solid var(--t-accent)",
    background: "transparent",
    cursor: "pointer",
    padding: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s",
  },
  dotActive: {
    background: "var(--t-accent)",
    transform: "scale(1.3)",
  },
  dotPast: {
    background: "var(--t-danger)",
    border: "2px solid var(--t-danger)",
  },
  dotInner: {
    width: 4,
    height: 4,
    borderRadius: "50%",
    background: "var(--t-on-accent)",
  },
  themeButton: {
    background: "none",
    border: "1px solid var(--t-accent)",
    color: "var(--t-accent)",
    cursor: "pointer",
    padding: "6px 10px",
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontFamily: "var(--t-font)",
    fontSize: 11,
    letterSpacing: "0.15em",
    fontWeight: 700,
  },
  themePickerBackdrop: {
    position: "fixed",
    inset: 0,
    zIndex: 200,
  },
  themePicker: {
    position: "fixed",
    top: 90,
    right: 24,
    background: "var(--t-dark)",
    border: "2px solid var(--t-accent)",
    boxShadow: "var(--t-accent-glow)",
    padding: 16,
    zIndex: 201,
    minWidth: 230,
  },
  themePickerTitle: {
    color: "var(--t-accent)",
    fontFamily: "var(--t-font)",
    fontSize: 11,
    letterSpacing: "0.25em",
    marginBottom: 12,
    fontWeight: 700,
  },
  themeCard: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    width: "100%",
    background: "none",
    border: "1px solid transparent",
    padding: "8px 10px",
    cursor: "pointer",
    color: "var(--t-text-light)",
    fontFamily: "var(--t-font)",
    textAlign: "left",
    marginBottom: 4,
  },
  themeCardActive: {
    border: "1px solid var(--t-accent)",
    background: "rgba(255,255,255,0.06)",
  },
  themeSwatches: {
    display: "flex",
    gap: 4,
  },
  themeSwatch: {
    width: 13,
    height: 13,
    borderRadius: "50%",
    border: "1px solid rgba(255,255,255,0.2)",
    flexShrink: 0,
  },
  themeCardName: {
    flex: 1,
    fontSize: 13,
  },
  themeCheck: {
    color: "var(--t-accent)",
    fontWeight: 700,
    fontSize: 14,
  },
};

const stageStyles = {
  wrap: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: 16,
    minHeight: 460,
  },
  svg: {
    width: "100%",
    flex: 1,
    maxHeight: 460,
  },
};
