// Gera os SVGs animados do README do perfil (assets/*.svg), em tema claro e
// escuro e com versão de celular.
//
// Uso:  node scripts/gerar-svgs.mjs
//
// Tudo é SVG com animação em CSS/SMIL: o GitHub exibe como imagem, sem
// JavaScript e sem serviço externo. As capturas dos projetos (assets/shots/,
// JPEG 880x550) vão embutidas em base64 nos cartões — uma imagem dentro de um
// SVG servido como <img> não pode carregar outra URL.
//
// Para mudar textos, cores ou projetos, edite as constantes deste arquivo e
// rode o script de novo.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'assets');
const SHOTS = join(OUT, 'shots');

// ── Paletas ────────────────────────────────────────────────────────────────

const THEMES = {
  dark: {
    name: 'dark',
    bg: '#05070F', bg2: '#0A0F24', panel: '#0B1124', panel2: '#10183A',
    line: '#1B2547', line2: '#2A3A66', text: '#EEF2FF', muted: '#8C96BA', faint: '#5A658C',
    c1: '#22D3EE', c2: '#8B5CF6', c3: '#F472B6', ok: '#34D399',
    glow: 0.55, star: '#FFFFFF', shade: '#000000',
  },
  light: {
    name: 'light',
    bg: '#FFFFFF', bg2: '#F2F5FF', panel: '#FFFFFF', panel2: '#F5F7FF',
    line: '#E1E6F4', line2: '#C6D0EC', text: '#0B1022', muted: '#566182', faint: '#8A94B4',
    c1: '#0891B2', c2: '#7C3AED', c3: '#DB2777', ok: '#059669',
    glow: 0.22, star: '#7C3AED', shade: '#5B6CA8',
  },
};

// ── Conteúdo ───────────────────────────────────────────────────────────────

const NAME = 'Murilo de Souza';
const SUBTITLE = 'Full-Stack Developer · Dados, BI & Automação';
const ROLES = [
  '› React · TypeScript · NestJS · Prisma · PostgreSQL',
  '› Python · SQL · Dashboards de BI · SAP (Fiori, MM)',
  '› Transformo dados em decisão — e construo o que falta',
];
const ROLES_MOBILE = ['› React · TS · NestJS · Prisma', '› Python · SQL · BI · SAP Fiori', '› Dados viram decisão'];
const MOTTO = '“Quando a ferramenta ideal não está disponível, eu construo uma.”';

// ── Utilitários ────────────────────────────────────────────────────────────

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Largura aproximada de texto (sem medir fonte): suficiente para dimensionar
// chips e pílulas com folga.
const textWidth = (s, size, mono = false) => [...s].length * size * (mono ? 0.61 : 0.53);

// Pseudoaleatório determinístico: o SVG gerado não muda a cada execução.
function rng(seed) {
  let x = seed;
  return () => ((x = (x * 1103515245 + 12345) % 2147483648) / 2147483648);
}

const FONTS = `
  .sans { font-family: 'Segoe UI Variable Display', 'Segoe UI', Inter, -apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif; }
  .mono { font-family: 'Cascadia Code', 'JetBrains Mono', ui-monospace, SFMono-Regular, Consolas, 'Liberation Mono', monospace; }
`;

const REDUCED = `
  @media (prefers-reduced-motion: reduce) {
    *, *::before { animation: none !important; }
    .rv { opacity: 1 !important; transform: none !important; }
  }
`;

function svg(w, h, label, css, body) {
  w = Math.round(w); h = Math.round(h);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(label)}">
<title>${esc(label)}</title>
<style>${FONTS}${css}${REDUCED}</style>
${body}
</svg>
`;
}

function save(name, content) {
  writeFileSync(join(OUT, name), content);
  console.log(`${name.padEnd(34)} ${(content.length / 1024).toFixed(1)} KB`);
}

// Gradiente da marca (ciano → violeta → rosa) e uma versão que "corre" na
// horizontal, usada em títulos.
function brandDefs(t, w = 1200) {
  return `
  <linearGradient id="brand" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${t.c1}"/><stop offset="0.5" stop-color="${t.c2}"/><stop offset="1" stop-color="${t.c3}"/></linearGradient>
  <linearGradient id="flow" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="${w / 2}" y2="0" spreadMethod="repeat">
    <stop offset="0" stop-color="${t.c1}"/><stop offset="0.33" stop-color="${t.c2}"/><stop offset="0.66" stop-color="${t.c3}"/><stop offset="1" stop-color="${t.c1}"/>
    <animateTransform attributeName="gradientTransform" type="translate" from="0 0" to="${w / 2} 0" dur="7s" repeatCount="indefinite"/>
  </linearGradient>
  <filter id="soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="60"/></filter>
  <filter id="halo" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="8"/></filter>`;
}

// Fundo comum: gradiente, auroras que flutuam e grade de pontos.
function backdrop(t, w, h, rx = 24) {
  return `
<defs>
  <linearGradient id="bgG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${t.bg}"/><stop offset="1" stop-color="${t.bg2}"/></linearGradient>
  <pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="1.1" fill="${t.line2}" opacity="0.55"/></pattern>
  <clipPath id="frame"><rect width="${w}" height="${h}" rx="${rx}"/></clipPath>
</defs>
<g clip-path="url(#frame)">
  <rect width="${w}" height="${h}" fill="url(#bgG)"/>
  <rect width="${w}" height="${h}" fill="url(#dots)" opacity="0.6"/>
  <g filter="url(#soft)" opacity="${t.glow}">
    <ellipse class="aur a1" cx="${w * 0.18}" cy="${h * 0.2}" rx="${w * 0.22}" ry="${h * 0.32}" fill="${t.c1}"/>
    <ellipse class="aur a2" cx="${w * 0.62}" cy="${h * 0.05}" rx="${w * 0.2}" ry="${h * 0.26}" fill="${t.c2}"/>
    <ellipse class="aur a3" cx="${w * 0.9}" cy="${h * 0.7}" rx="${w * 0.18}" ry="${h * 0.3}" fill="${t.c3}"/>
  </g>
</g>`;
}

const AURORA_CSS = `
  @keyframes drift { 0%, 100% { transform: translate(0px, 0px) scale(1); } 50% { transform: translate(60px, 24px) scale(1.12); } }
  .aur { transform-box: fill-box; transform-origin: center; animation: drift 14s ease-in-out infinite; }
  .a2 { animation-duration: 18s; animation-direction: reverse; }
  .a3 { animation-duration: 16s; animation-delay: -6s; }
  @keyframes rise { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0px); } }
  .rv { opacity: 0; animation: rise 0.8s cubic-bezier(.2,.7,.2,1) forwards; }
`;

function frameStroke(t, w, h, rx = 24) {
  return `<rect x="0.5" y="0.5" width="${w - 1}" height="${h - 1}" rx="${rx}" fill="none" stroke="${t.line2}"/>`;
}

// Borda com um "cometa" de luz percorrendo o contorno.
function cometBorder(w, h, rx, stroke, dur = 9, len = 260) {
  const per = Math.round(2 * (w + h) - (8 - 2 * Math.PI) * rx);
  return `<rect x="1" y="1" width="${w - 2}" height="${h - 2}" rx="${rx}" fill="none" stroke="${stroke}" stroke-width="2.2" stroke-linecap="round" stroke-dasharray="${len} ${per - len}">
    <animate attributeName="stroke-dashoffset" from="0" to="${-per}" dur="${dur}s" repeatCount="indefinite"/>
  </rect>`;
}

// Estrelas/partículas piscando.
function stars(t, w, h, n, seed, yMax = h) {
  const r = rng(seed);
  let out = '';
  for (let i = 0; i < n; i++) {
    const x = (r() * w).toFixed(1), y = (r() * yMax).toFixed(1), s = (0.6 + r() * 1.4).toFixed(2);
    const d = (2.5 + r() * 4).toFixed(2), b = (-r() * 5).toFixed(2);
    out += `<circle cx="${x}" cy="${y}" r="${s}" fill="${t.star}"><animate attributeName="opacity" values="0.1;0.9;0.1" dur="${d}s" begin="${b}s" repeatCount="indefinite"/></circle>`;
  }
  return `<g opacity="${t.name === 'dark' ? 0.8 : 0.35}">${out}</g>`;
}

// Piso em perspectiva: linhas que fogem para o horizonte e linhas
// horizontais que descem acelerando, como se a câmera andasse para a frente.
function floor(t, w, h, horizon, vx, id = 'fl') {
  let vert = '';
  for (let i = -18; i <= 18; i++) vert += `<line x1="${vx + i * 18}" y1="${horizon}" x2="${vx + i * 150}" y2="${h + 40}"/>`;
  let hor = '';
  const N = 9, dur = 5.4;
  for (let i = 0; i < N; i++) {
    hor += `<line x1="0" x2="${w}" y1="${horizon}" y2="${horizon}">
      <animate attributeName="y1" values="${horizon};${h + 20}" dur="${dur}s" begin="${(-i * dur / N).toFixed(2)}s" repeatCount="indefinite" calcMode="spline" keySplines="0.55 0 1 1" keyTimes="0;1"/>
      <animate attributeName="y2" values="${horizon};${h + 20}" dur="${dur}s" begin="${(-i * dur / N).toFixed(2)}s" repeatCount="indefinite" calcMode="spline" keySplines="0.55 0 1 1" keyTimes="0;1"/>
    </line>`;
  }
  return `
<defs>
  <linearGradient id="${id}Fade" x1="0" y1="${horizon}" x2="0" y2="${h}" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="0.35" stop-color="#fff" stop-opacity="0.75"/><stop offset="1" stop-color="#fff" stop-opacity="1"/></linearGradient>
  <mask id="${id}Mask"><rect y="${horizon}" width="${w}" height="${h - horizon}" fill="url(#${id}Fade)"/></mask>
  <linearGradient id="${id}Line" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${t.c1}"/><stop offset="0.5" stop-color="${t.c2}"/><stop offset="1" stop-color="${t.c3}"/></linearGradient>
</defs>
<g clip-path="url(#frame)">
  <g mask="url(#${id}Mask)" stroke="url(#${id}Line)" stroke-width="1.2" opacity="${t.name === 'dark' ? 0.55 : 0.4}">${vert}${hor}</g>
  <rect x="0" y="${horizon - 1}" width="${w}" height="2" fill="url(#${id}Line)" opacity="0.9"/>
  <rect x="0" y="${horizon - 6}" width="${w}" height="12" fill="url(#${id}Line)" opacity="0.35" filter="url(#halo)"/>
</g>`;
}

function pill(t, x, y, label, { size = 14, mono = true, color = t.text, dot = t.c1, h = 34 } = {}) {
  const w = textWidth(label, size, mono) + 44;
  return {
    w,
    svg: `<g transform="translate(${x} ${y})">
      <rect width="${w.toFixed(0)}" height="${h}" rx="${h / 2}" fill="${t.panel}" fill-opacity="0.82" stroke="${t.line2}"/>
      <circle cx="18" cy="${h / 2}" r="4" fill="${dot}"/>
      <text x="30" y="${h / 2 + size * 0.36}" class="${mono ? 'mono' : 'sans'}" font-size="${size}" fill="${color}">${esc(label)}</text>
    </g>`,
  };
}

// ── Banner ─────────────────────────────────────────────────────────────────

function heroCss(t) {
  return `${AURORA_CSS}
  @keyframes blink { 50% { opacity: 0; } }
  .caret { animation: blink 1.05s steps(1) infinite; }
  @keyframes role { 0% { opacity: 0; transform: translateY(10px); } 4%, 30% { opacity: 1; transform: translateY(0px); } 34%, 100% { opacity: 0; transform: translateY(-10px); } }
  .role { opacity: 0; animation: role 10.5s ease-in-out infinite both; }
  .r1 { animation-delay: 2.6s; } .r2 { animation-delay: 6.1s; } .r3 { animation-delay: 9.6s; }
  @keyframes bob { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
  .bob { animation: bob 5s ease-in-out infinite; } .bob2 { animation: bob 6.5s ease-in-out -2s infinite; } .bob3 { animation: bob 5.8s ease-in-out -4s infinite; }
  @keyframes draw { from { stroke-dashoffset: 900; } to { stroke-dashoffset: 0; } }
  .spark { stroke-dasharray: 900; animation: draw 2.4s ease-out 1.2s both; }
  @keyframes grow { 0%, 100% { transform: scaleY(0.35); } 50% { transform: scaleY(1); } }
  .bar { transform-box: fill-box; transform-origin: bottom; animation: grow 3.2s ease-in-out infinite; }
  @media (prefers-reduced-motion: reduce) { .r1 { opacity: 1; } .spark { stroke-dashoffset: 0; } }
`;
}

// O nome aparece num "wipe" com um cursor de luz correndo na frente; depois
// o gradiente fica deslizando devagar dentro das letras.
function nameBlock(t, x, y, size, lines, width) {
  const lh = size * 1.02;
  const total = lines.length;
  let txt = '';
  lines.forEach((ln, i) => { txt += `<tspan x="${x}" y="${y + i * lh}">${esc(ln)}</tspan>`; });
  const top = y - size * 0.92, hgt = lh * total + size * 0.2;
  return `
<defs>
  <clipPath id="wipe"><rect x="${x - 10}" y="${top}" width="0" height="${hgt}"><animate attributeName="width" from="0" to="${width + 40}" begin="0.3s" dur="1.5s" fill="freeze" calcMode="spline" keySplines="0.6 0 0.2 1" keyTimes="0;1"/></rect></clipPath>
</defs>
<g clip-path="url(#wipe)">
  <text class="sans" font-size="${size}" font-weight="800" letter-spacing="-2" fill="url(#flow)" opacity="0.55" filter="url(#halo)">${txt}</text>
  <text class="sans" font-size="${size}" font-weight="800" letter-spacing="-2" fill="url(#flow)">${txt}</text>
</g>
<rect x="${x - 10}" y="${top}" width="4" height="${hgt}" rx="2" fill="${t.c1}" opacity="0">
  <animate attributeName="x" from="${x - 10}" to="${x + width + 30}" begin="0.3s" dur="1.5s" fill="freeze" calcMode="spline" keySplines="0.6 0 0.2 1" keyTimes="0;1"/>
  <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" begin="0.3s" dur="1.7s" fill="freeze"/>
  <set attributeName="visibility" to="hidden" begin="2.1s" fill="freeze"/>
</rect>`;
}

// Painel "holográfico" do banner: gráfico de linha se desenhando, barras
// pulsando e o fluxo dados → API → dashboard → decisão.
function holoCard(t, x, y) {
  const w = 350, h = 262;
  const pts = [[0, 92], [40, 78], [80, 84], [120, 58], [160, 64], [200, 38], [240, 46], [280, 18], [310, 24]];
  const line = pts.map(([px, py], i) => `${i ? 'L' : 'M'}${px + 20} ${py + 62}`).join(' ');
  const area = `${line} L330 154 L20 154 Z`;
  let bars = '';
  [38, 56, 30, 64, 48, 72, 52].forEach((bh, i) => {
    bars += `<rect class="bar" style="animation-delay:${(-i * 0.4).toFixed(1)}s" x="${24 + i * 22}" y="${236 - bh}" width="13" height="${bh}" rx="3" fill="url(#barG)"/>`;
  });
  const steps = ['DADOS', 'API', 'BI', 'DECISÃO'];
  let flow = '';
  steps.forEach((s, i) => {
    const fx = 196 + (i % 2) * 74, fy = 176 + Math.floor(i / 2) * 36;
    flow += `<rect x="${fx}" y="${fy}" width="66" height="26" rx="7" fill="${t.panel2}" stroke="${t.line2}"><animate attributeName="stroke" values="${t.line2};${t.c1};${t.line2};${t.line2}" keyTimes="0;0.1;0.25;1" dur="4s" begin="${i}s" repeatCount="indefinite"/></rect>
      <text x="${fx + 33}" y="${fy + 17}" text-anchor="middle" class="mono" font-size="10.5" font-weight="700" fill="${t.text}">${s}</text>`;
  });
  return `
<defs>
  <linearGradient id="areaG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${t.c2}" stop-opacity="0.45"/><stop offset="1" stop-color="${t.c2}" stop-opacity="0"/></linearGradient>
  <linearGradient id="barG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${t.c1}"/><stop offset="1" stop-color="${t.c2}" stop-opacity="0.6"/></linearGradient>
  <path id="sparkPath" d="${line}"/>
</defs>
<g transform="translate(${x} ${y})"><g class="bob">
  <rect width="${w}" height="${h}" rx="18" fill="${t.panel}" fill-opacity="0.9" stroke="${t.line2}"/>
  ${cometBorder(w, h, 18, 'url(#brand)', 7, 180)}
  <circle cx="22" cy="24" r="4.5" fill="${t.c3}"/><circle cx="38" cy="24" r="4.5" fill="${t.c2}"/><circle cx="54" cy="24" r="4.5" fill="${t.c1}"/>
  <text x="72" y="28" class="mono" font-size="11.5" fill="${t.muted}">live.dashboard</text>
  <circle cx="${w - 60}" cy="24" r="5" fill="${t.ok}"/><circle cx="${w - 60}" cy="24" r="5" fill="none" stroke="${t.ok}" stroke-width="2"><animate attributeName="r" values="5;15" dur="1.8s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.7;0" dur="1.8s" repeatCount="indefinite"/></circle>
  <text x="${w - 50}" y="28" class="mono" font-size="11" fill="${t.ok}">ao vivo</text>
  <line x1="20" y1="44" x2="${w - 20}" y2="44" stroke="${t.line}"/>
  <g stroke="${t.line}" stroke-dasharray="3 5"><line x1="20" y1="80" x2="330" y2="80"/><line x1="20" y1="116" x2="330" y2="116"/><line x1="20" y1="152" x2="330" y2="152"/></g>
  <path d="${area}" fill="url(#areaG)"/>
  <path class="spark" d="${line}" fill="none" stroke="url(#brand)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <circle r="6" fill="${t.c3}"><animateMotion dur="5s" repeatCount="indefinite" calcMode="linear"><mpath href="#sparkPath"/></animateMotion></circle>
  <text x="22" y="70" class="mono" font-size="11" fill="${t.muted}">produtividade · 12 meses</text>
  ${bars}
  ${flow}
</g></g>`;
}

function hero(t, mobile) {
  const W = mobile ? 640 : 1200, H = mobile ? 720 : 500;
  const horizon = mobile ? 470 : 344;
  const prompt = (x, y, fs) => `<text x="${x}" y="${y}" class="mono rv" style="animation-delay:.1s" font-size="${fs}" fill="${t.muted}">~/mdevsec-code <tspan fill="${t.c1}">$</tspan> whoami<tspan class="caret" fill="${t.c1}"> ▍</tspan></text>`;
  const chip = (x, y, fs) => {
    const label = 'online · Camaçari, BA';
    const w = textWidth(label, fs, true) + 50;
    return `<g transform="translate(${x} ${y})"><g class="rv">
      <rect width="${w}" height="34" rx="17" fill="${t.panel}" fill-opacity="0.85" stroke="${t.line2}"/>
      <circle cx="19" cy="17" r="5" fill="${t.ok}"/><circle cx="19" cy="17" r="5" fill="none" stroke="${t.ok}" stroke-width="2"><animate attributeName="r" values="5;15" dur="1.8s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.7;0" dur="1.8s" repeatCount="indefinite"/></circle>
      <text x="36" y="${17 + fs * 0.36}" class="mono" font-size="${fs}" fill="${t.muted}">${label}</text>
    </g></g>`;
  };

  let body = backdrop(t, W, H) + `<defs>${brandDefs(t, W)}</defs>`;
  body += `<g clip-path="url(#frame)">${stars(t, W, horizon - 10, mobile ? 40 : 70, 7, horizon - 10)}</g>`;
  body += floor(t, W, H, horizon, mobile ? 320 : 600);

  if (!mobile) {
    body += chip(64, 40, 13);
    body += prompt(64, 118, 16);
    body += nameBlock(t, 60, 200, 84, [NAME], 690);
    body += `<text x="64" y="250" class="sans rv" style="animation-delay:1.5s" font-size="27" fill="${t.text}">${esc(SUBTITLE)}</text>`;
    body += `<g class="mono" font-size="17" fill="${t.c1}">${ROLES.map((r, i) => `<text class="role r${i + 1}" x="64" y="296">${esc(r)}</text>`).join('')}</g>`;
    body += holoCard(t, 806, 52);
    // Etiquetas flutuando em volta do painel.
    const tags = [['React', 772, 300, 'bob2'], ['NestJS', 1092, 30, 'bob3'], ['Python', 1104, 300, 'bob'], ['SAP Fiori', 760, 34, 'bob3']];
    for (const [label, tx, ty, cls] of tags) {
      const w = textWidth(label, 12, true) + 26;
      body += `<g transform="translate(${tx} ${ty})"><g class="${cls}"><g class="rv" style="animation-delay:2s"><rect width="${w}" height="26" rx="13" fill="${t.panel2}" stroke="url(#brand)"/><text x="13" y="17" class="mono" font-size="12" fill="${t.text}">${label}</text></g></g></g>`;
    }
    let px = 64;
    ['6 projetos no GitHub', 'Saúde · RH · Suprimentos · EPI · Estética', 'PT nativo · EN avançado'].forEach((label, i) => {
      const p = pill(t, px, 420, label, { dot: [t.c1, t.c2, t.c3][i] });
      body += `<g class="rv" style="animation-delay:${2.2 + i * 0.15}s">${p.svg}</g>`;
      px += p.w + 14;
    });
  } else {
    body += chip(36, 36, 15);
    body += prompt(38, 116, 19);
    body += nameBlock(t, 34, 206, 88, ['Murilo', 'de Souza'], 420);
    body += `<text class="sans rv" style="animation-delay:1.5s" font-size="27" fill="${t.text}"><tspan x="38" y="352">Full-Stack Developer</tspan><tspan x="38" y="388" fill="${t.muted}">Dados, BI &amp; Automação</tspan></text>`;
    body += `<g class="mono" font-size="20" fill="${t.c1}">${ROLES_MOBILE.map((r, i) => `<text class="role r${i + 1}" x="38" y="436">${esc(r)}</text>`).join('')}</g>`;
    const rows = [['6 projetos no GitHub', 'PT · EN'], ['Saúde · RH · Suprimentos · EPI']];
    rows.forEach((row, ri) => {
      let px = 38;
      row.forEach((label, i) => {
        const p = pill(t, px, 556 + ri * 54, label, { size: 17, h: 40, dot: [t.c1, t.c2, t.c3][(ri * 2 + i) % 3] });
        body += `<g class="rv" style="animation-delay:${2.2 + (ri * 2 + i) * 0.15}s">${p.svg}</g>`;
        px += p.w + 12;
      });
    });
  }
  body += frameStroke(t, W, H);
  return svg(W, H, `${NAME} — ${SUBTITLE}`, heroCss(t), body);
}


// ── Ícones (traço, grade 24×24) ────────────────────────────────────────────

const ICONS = {
  mail: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M3.5 7.5 12 13l8.5-5.5"/>',
  grid: '<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
  pin: '<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.6"/>',
  monitor: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
  chart: '<path d="M4 20V11M10 20V5M16 20v-7M2.5 20h19"/>',
  zap: '<path d="M13 2.5 4.5 14H11l-1 7.5L19.5 10H13z"/>',
  link: '<path d="M10 14a4.5 4.5 0 0 0 6.4 0l3.2-3.2a4.5 4.5 0 0 0-6.4-6.4l-1 1"/><path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3.2 3.2a4.5 4.5 0 0 0 6.4 6.4l1-1"/>',
  factory: '<path d="M3 21V10l6 4v-4l6 4V6l6 4v11z"/><path d="M7 17.5h1.5M11.5 17.5H13M16 17.5h1.5"/>',
  layers: '<path d="M12 3 2.5 8 12 13l9.5-5z"/><path d="M2.5 12.5 12 17.5l9.5-5"/><path d="M2.5 17 12 22l9.5-5"/>',
  cap: '<path d="M2 9.5 12 5l10 4.5L12 14z"/><path d="M6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5"/><path d="M22 9.5V15"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.6 2.6 3.8 5.6 3.8 9s-1.2 6.4-3.8 9c-2.6-2.6-3.8-5.6-3.8-9S9.4 5.6 12 3z"/>',
  check: '<path d="M4.5 12.5 10 18 19.5 6.5"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
};

function icon(name, x, y, size, stroke, sw = 2) {
  const k = size / 24;
  return `<g transform="translate(${x} ${y}) scale(${k})" fill="none" stroke="${stroke}" stroke-width="${(sw / k).toFixed(2)}" stroke-linecap="round" stroke-linejoin="round">${ICONS[name]}</g>`;
}

// ── Botões de contato ──────────────────────────────────────────────────────

const BUTTONS = [
  { id: 'linkedin', label: 'LINKEDIN', sub: 'vamos conversar', glyph: 'in' },
  { id: 'email', label: 'E-MAIL', sub: 'resposta rápida', glyph: 'mail' },
  { id: 'projetos', label: 'PROJETOS', sub: 'o que já construí', glyph: 'grid' },
  { id: 'local', label: 'CAMAÇARI', sub: 'Bahia · Brasil', glyph: 'pin' },
];

function button(t, b, i) {
  const W = 250, H = 64;
  const css = `${AURORA_CSS}
  @keyframes sweep { 0% { transform: translateX(-140px) skewX(-20deg); } 60%, 100% { transform: translateX(${W + 40}px) skewX(-20deg); } }
  .shine { animation: sweep 4.5s ease-in-out ${i * 0.6}s infinite; }`;
  const ic = b.glyph === 'in'
    ? `<text x="38" y="${H / 2 + 7}" text-anchor="middle" class="sans" font-size="19" font-weight="800" fill="#fff">in</text>`
    : icon(b.glyph, 27, H / 2 - 11, 22, '#fff', 2.2);
  const body = `
<defs>
  ${brandDefs(t, W)}
  <linearGradient id="spin" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${t.c1}"/><stop offset="0.5" stop-color="${t.c2}"/><stop offset="1" stop-color="${t.c3}"/>
    <animateTransform attributeName="gradientTransform" type="rotate" values="0 .5 .5;360 .5 .5" dur="6s" begin="${-i * 1.5}s" repeatCount="indefinite"/></linearGradient>
  <linearGradient id="sh" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="0.5" stop-color="#fff" stop-opacity="${t.name === 'dark' ? 0.16 : 0.55}"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
  <clipPath id="btn"><rect x="2" y="2" width="${W - 4}" height="${H - 4}" rx="${H / 2 - 2}"/></clipPath>
</defs>
<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="${H / 2 - 1}" fill="${t.panel}" stroke="url(#spin)" stroke-width="2.2"/>
<g clip-path="url(#btn)"><rect class="shine" x="0" y="0" width="90" height="${H}" fill="url(#sh)"/></g>
<circle cx="38" cy="${H / 2}" r="21" fill="url(#brand)"/>
${ic}
<text x="72" y="29" class="sans" font-size="15" font-weight="800" letter-spacing="2.4" fill="${t.text}">${b.label}</text>
<text x="72" y="47" class="mono" font-size="12" fill="${t.muted}">${b.sub}</text>
${icon('arrow', W - 44, H / 2 - 9, 18, t.c1, 2.2)}`;
  return svg(W, H, b.label, css, body);
}

// ── Títulos de seção ───────────────────────────────────────────────────────

const SECTIONS = [
  { id: 'sobre', n: '01', title: 'Sobre mim', cmd: 'neofetch' },
  { id: 'servicos', n: '02', title: 'O que eu faço', cmd: 'services --list' },
  { id: 'stack', n: '03', title: 'Stack', cmd: 'orbit.ts' },
  { id: 'projetos', n: '04', title: 'Projetos em destaque', cmd: 'ls ~/projetos' },
  { id: 'atividade', n: '05', title: 'Atividade', cmd: 'git log --graph' },
  { id: 'formacao', n: '06', title: 'Formação & idiomas', cmd: 'cat formacao.md' },
];

function sectionTitle(t, s, mobile) {
  const W = mobile ? 640 : 1000, H = mobile ? 118 : 96;
  const css = `${AURORA_CSS}
  @keyframes scan { from { transform: translateX(-200px); } to { transform: translateX(${W + 40}px); } }
  .scan { animation: scan 4.2s cubic-bezier(.6,0,.3,1) infinite; }`;
  let body = `<defs>${brandDefs(t, W)}
  <linearGradient id="seg" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${t.c1}" stop-opacity="0"/><stop offset="0.5" stop-color="${t.c2}"/><stop offset="1" stop-color="${t.c3}" stop-opacity="0"/></linearGradient></defs>`;
  if (mobile) {
    body += `<text x="2" y="34" class="mono" font-size="22" font-weight="700" fill="url(#brand)">${s.n}<tspan fill="${t.faint}" font-weight="400" font-size="19"> // ${esc(s.cmd)}</tspan></text>
<text x="2" y="88" class="sans" font-size="44" font-weight="800" letter-spacing="-0.5" fill="${t.text}">${esc(s.title)}</text>`;
  } else {
    body += `<text x="2" y="56" class="mono" font-size="20" font-weight="700" fill="url(#brand)">${s.n}<tspan fill="${t.faint}" font-weight="400" font-size="16"> //</tspan></text>
<text x="76" y="58" class="sans" font-size="40" font-weight="800" letter-spacing="-0.5" fill="${t.text}">${esc(s.title)}</text>
<text x="${W - 4}" y="54" text-anchor="end" class="mono" font-size="15" fill="${t.muted}"><tspan fill="${t.c1}">$</tspan> ${esc(s.cmd)}</text>`;
  }
  body += `<rect x="0" y="${H - 8}" width="${W}" height="2" rx="1" fill="${t.line}"/>
<rect x="0" y="${H - 8}" width="120" height="2" rx="1" fill="url(#brand)"/>
<rect class="scan" x="0" y="${H - 9}" width="180" height="4" rx="2" fill="url(#seg)"/>`;
  return svg(W, H, `${s.n} — ${s.title}`, css, body);
}

// ── Neofetch (sobre mim) ───────────────────────────────────────────────────

const FETCH = [
  ['Nome', 'Murilo de Souza'],
  ['Cargo', 'Full-Stack Developer · Dados, BI & Automação'],
  ['Empresa', 'ENGENOVA Construções — BI, Processos e Automação'],
  ['Local', 'Unidade nas instalações da BYD · Camaçari/BA'],
  ['Formação', 'Sistemas de Informação · UNIME · 8º semestre'],
  ['Idiomas', 'Português (nativo) · Inglês (avançado)'],
  ['Front', 'React · Vue · TypeScript · Tailwind CSS'],
  ['Back', 'Node.js · NestJS · Express · Fastify · Prisma'],
  ['Dados', 'PostgreSQL · Python · SQL · Dashboards de BI'],
  ['ERP', 'SAP Fiori · SAP MM'],
];
const FETCH_MOBILE = [
  ['Nome', 'Murilo de Souza'],
  ['Cargo', 'Full-Stack · Dados, BI & Automação'],
  ['Empresa', 'ENGENOVA — BI e Automação'],
  ['Local', 'Fábrica da BYD · Camaçari/BA'],
  ['Formação', 'Sist. de Informação · UNIME'],
  ['Idiomas', 'PT nativo · EN avançado'],
  ['Front', 'React · Vue · TS · Tailwind'],
  ['Back', 'Node · NestJS · Express · Prisma'],
  ['Dados', 'PostgreSQL · Python · SQL · BI'],
  ['ERP', 'SAP Fiori · SAP MM'],
];

// Monograma: hexágono que se desenha, um "M" em traço de luz e órbitas.
function monogram(t, cx, cy, r) {
  const hex = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 2;
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
  }).join(' ');
  const s = r * 0.42;
  const m = `M${cx - s} ${cy + s * 0.95} V${cy - s * 0.95} L${cx} ${cy + s * 0.15} L${cx + s} ${cy - s * 0.95} V${cy + s * 0.95}`;
  const orbit = (rot) => `<ellipse cx="${cx}" cy="${cy}" rx="${r * 1.32}" ry="${r * 0.42}" fill="none" stroke="${t.line2}" stroke-dasharray="4 7" transform="rotate(${rot} ${cx} ${cy})"/>
    <g transform="rotate(${rot} ${cx} ${cy})"><circle r="6" fill="${rot < 0 ? t.c3 : t.c1}"><animateMotion dur="${rot < 0 ? 6 : 8}s" repeatCount="indefinite" path="M${cx - r * 1.32} ${cy} a${r * 1.32} ${r * 0.42} 0 1 0 ${r * 2.64} 0 a${r * 1.32} ${r * 0.42} 0 1 0 ${-r * 2.64} 0"/></circle></g>`;
  return `
  ${orbit(-18)}
  <polygon points="${hex}" fill="${t.panel2}" fill-opacity="0.7" stroke="url(#brand)" stroke-width="3" stroke-dasharray="${(r * 6.3).toFixed(0)}" stroke-dashoffset="${(r * 6.3).toFixed(0)}">
    <animate attributeName="stroke-dashoffset" to="0" dur="2s" begin="0.2s" fill="freeze" calcMode="spline" keySplines="0.5 0 0.2 1" keyTimes="0;1"/>
  </polygon>
  <path d="${m}" fill="none" stroke="url(#brand)" stroke-width="${(r * 0.12).toFixed(1)}" stroke-linecap="round" stroke-linejoin="round" opacity="0.35" filter="url(#halo)"/>
  <path d="${m}" fill="none" stroke="url(#brand)" stroke-width="${(r * 0.12).toFixed(1)}" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="${(s * 7).toFixed(0)}" stroke-dashoffset="${(s * 7).toFixed(0)}">
    <animate attributeName="stroke-dashoffset" to="0" dur="1.6s" begin="1s" fill="freeze"/>
  </path>
  ${orbit(38)}`;
}

function neofetch(t, mobile) {
  const W = mobile ? 640 : 1200, H = mobile ? 1060 : 600;
  const css = `${AURORA_CSS}
  @keyframes blink { 50% { opacity: 0; } }
  .caret { animation: blink 1.05s steps(1) infinite; }`;
  const rows = mobile ? FETCH_MOBILE : FETCH;
  const fs = mobile ? 20 : 16.5, lh = mobile ? 40 : 29;
  const x0 = mobile ? 40 : 470, y0 = mobile ? 520 : 150, kw = mobile ? 128 : 112;
  const palette = [t.c1, t.c2, t.c3, t.ok, '#FACC15', '#FB923C', t.muted, t.text];

  let body = backdrop(t, W, H) + `<defs>${brandDefs(t, W)}</defs>`;
  body += `<g clip-path="url(#frame)"><rect x="0" y="0" width="${W}" height="48" fill="${t.panel}" fill-opacity="0.75"/></g>
  <line x1="0" y1="48" x2="${W}" y2="48" stroke="${t.line}"/>
  <circle cx="26" cy="24" r="6.5" fill="#FF5F57"/><circle cx="48" cy="24" r="6.5" fill="#FEBC2E"/><circle cx="70" cy="24" r="6.5" fill="#28C840"/>
  <text x="${W / 2}" y="29" text-anchor="middle" class="mono" font-size="${mobile ? 15 : 13}" fill="${t.muted}">murilo@mdevsec: ~ — neofetch</text>`;
  body += `<text x="40" y="${mobile ? 98 : 92}" class="mono" font-size="${mobile ? 19 : 16}" fill="${t.muted}"><tspan fill="${t.ok}">murilo@mdevsec</tspan> <tspan fill="${t.c1}">~</tspan> $ neofetch<tspan class="caret" fill="${t.c1}"> ▍</tspan></text>`;
  body += mobile ? monogram(t, 320, 290, 112) : monogram(t, 230, 330, 132);
  if (!mobile) body += `<text x="230" y="548" text-anchor="middle" class="mono" font-size="13" letter-spacing="4" fill="${t.faint}">MDEVSEC · DEV</text>`;

  body += `<text x="${x0}" y="${y0 - (mobile ? 50 : 40)}" class="mono rv" style="animation-delay:.3s" font-size="${fs + 2}" font-weight="700"><tspan fill="${t.c1}">murilo</tspan><tspan fill="${t.muted}">@</tspan><tspan fill="${t.c3}">mdevsec</tspan></text>`;
  body += `<rect x="${x0}" y="${y0 - (mobile ? 32 : 26)}" width="${mobile ? 300 : 260}" height="2" fill="url(#brand)" class="rv" style="animation-delay:.4s"/>`;
  rows.forEach(([k, v], i) => {
    body += `<text x="${x0}" y="${y0 + i * lh}" class="mono rv" style="animation-delay:${(0.5 + i * 0.12).toFixed(2)}s" font-size="${fs}"><tspan fill="${t.c1}" font-weight="700">${esc(k)}</tspan><tspan x="${x0 + kw}" fill="${t.text}">${esc(v)}</tspan></text>`;
  });
  const py = y0 + rows.length * lh - (mobile ? 12 : 8);
  palette.forEach((c, i) => {
    body += `<rect x="${x0 + i * (mobile ? 46 : 34)}" y="${py}" width="${mobile ? 40 : 30}" height="${mobile ? 22 : 18}" rx="4" fill="${c}" class="rv" style="animation-delay:${(1.8 + i * 0.06).toFixed(2)}s"/>`;
  });
  if (mobile) {
    body += `<text class="sans rv" style="animation-delay:2.3s" font-size="23" font-style="italic" fill="${t.text}"><tspan x="40" y="${py + 76}">“Quando a ferramenta ideal não</tspan><tspan x="40" y="${py + 110}">está disponível, eu construo uma.”</tspan></text>`;
  } else {
    body += `<text x="${x0}" y="${py + 66}" class="sans rv" style="animation-delay:2.3s" font-size="20" font-style="italic" fill="${t.text}">${esc(MOTTO)}</text>`;
  }
  body += frameStroke(t, W, H);
  return svg(W, H, `neofetch — ${rows.map(([k, v]) => `${k}: ${v}`).join('; ')}. ${MOTTO}`, css, body);
}

// ── O que eu faço ──────────────────────────────────────────────────────────

const SERVICES = [
  { icon: 'monitor', title: 'Aplicações web', lines: ['Sistemas full-stack de ponta a ponta:', 'do banco à tela, com RBAC e auditoria.'], tags: ['React', 'Vue', 'NestJS'] },
  { icon: 'chart', title: 'Dashboards de BI', lines: ['BI sob medida em HTML/JavaScript,', 'mesmo sem Power BI ou nuvem.'], tags: ['SQL', 'HTML', 'JS'] },
  { icon: 'zap', title: 'Automação', lines: ['Relatórios e processos automatizados', 'com Python, sem trabalho repetitivo.'], tags: ['Python', 'Scripts'] },
  { icon: 'link', title: 'Integração com SAP', lines: ['Dados do ERP (Fiori, MM) ligados', 'ao dia a dia da operação.'], tags: ['SAP Fiori', 'SAP MM'] },
  { icon: 'factory', title: 'Dados industriais', lines: ['Consolidação, validação e análise', 'de dados operacionais de fábrica.'], tags: ['ETL', 'Qualidade'] },
  { icon: 'layers', title: 'Família Falcão', lines: ['Saúde Ocupacional, Suprimentos e RH', 'com a mesma base e o mesmo visual.'], tags: ['Design system', 'RBAC'] },
];

function services(t, mobile) {
  const cols = mobile ? 1 : 3;
  const tw = mobile ? 640 : 376, th = mobile ? 226 : 252, gap = mobile ? 22 : 36;
  const W = mobile ? 640 : 1200;
  const H = Math.ceil(SERVICES.length / cols) * (th + gap) - gap;
  const tf = mobile ? 27 : 22, df = mobile ? 19 : 15.5, dl = mobile ? 28 : 23;
  const ic = mobile ? 64 : 54;
  let body = `<defs>${brandDefs(t, W)}
    <linearGradient id="tileG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${t.panel2}"/><stop offset="1" stop-color="${t.panel}"/></linearGradient></defs>`;
  SERVICES.forEach((s, i) => {
    const x = (i % cols) * (tw + gap), y = Math.floor(i / cols) * (th + gap);
    const textX = mobile ? 28 + ic + 24 : 28;
    const titleY = mobile ? 70 : 122;
    const tagY = th - (mobile ? 52 : 46);
    let tags = '', tx = textX;
    s.tags.forEach((tg) => {
      const tfs = mobile ? 15 : 12, th2 = mobile ? 30 : 24;
      const w = textWidth(tg, tfs, true) + 22;
      tags += `<rect x="${tx}" y="${tagY}" width="${w.toFixed(1)}" height="${th2}" rx="${th2 / 2}" fill="${t.bg}" fill-opacity="0.5" stroke="${t.line2}"/>
        <text x="${tx + 11}" y="${tagY + th2 / 2 + tfs * 0.36}" class="mono" font-size="${tfs}" fill="${t.muted}">${esc(tg)}</text>`;
      tx += w + 8;
    });
    body += `<g transform="translate(${x} ${y})"><g class="rv" style="animation-delay:${(i * 0.12).toFixed(2)}s">
      <rect x="1" y="1" width="${tw - 2}" height="${th - 2}" rx="20" fill="url(#tileG)" stroke="${t.line2}"/>
      ${cometBorder(tw, th, 20, 'url(#brand)', 8, 160).replace('<animate ', `<animate begin="${(-i * 1.3).toFixed(1)}s" `)}
      <rect x="28" y="28" width="${ic}" height="${ic}" rx="15" fill="url(#brand)"/>
      ${icon(s.icon, 28 + ic * 0.24, 28 + ic * 0.24, ic * 0.52, '#fff', 2.2)}
      <text x="${textX}" y="${titleY}" class="sans" font-size="${tf}" font-weight="800" fill="${t.text}">${esc(s.title)}</text>
      ${s.lines.map((l, li) => `<text x="${textX}" y="${titleY + (mobile ? 36 : 32) + li * dl}" class="sans" font-size="${df}" fill="${t.muted}">${esc(l)}</text>`).join('')}
      ${tags}
    </g></g>`;
  });
  return svg(W, H, `O que eu faço: ${SERVICES.map((s) => s.title).join(', ')}`, AURORA_CSS, body);
}

// ── Stack em órbita ────────────────────────────────────────────────────────

const STACK = [
  { ring: 'Linguagens', items: [['TypeScript', '#3178C6'], ['JavaScript', '#F7DF1E'], ['Python', '#3776AB'], ['SQL', '#E38C00']] },
  { ring: 'Frameworks', items: [['React', '#61DAFB'], ['Vue', '#42B883'], ['Node.js', '#5FA04E'], ['NestJS', '#E0234E'], ['Express', '#9AA4BF'], ['Fastify', '#9AA4BF'], ['Tailwind', '#38BDF8']] },
  { ring: 'Dados · Infra · ERP', items: [['PostgreSQL', '#4169E1'], ['Prisma', '#5A67D8'], ['Drizzle', '#A3D930'], ['Docker', '#2496ED'], ['Git', '#F05032'], ['GitHub Actions', '#2088FF'], ['Vite', '#646CFF'], ['SAP Fiori', '#0FAAFF'], ['Vercel', '#9AA4BF']] },
];

function chip(t, label, color, size, x, y) {
  const w = textWidth(label, size, true) + size * 2.4, h = size * 2.3;
  return { w, h, svg: `<g transform="translate(${(x - w / 2).toFixed(1)} ${(y - h / 2).toFixed(1)})">
    <rect width="${w.toFixed(1)}" height="${h.toFixed(1)}" rx="${(h / 2).toFixed(1)}" fill="${t.panel}" stroke="${color}" stroke-opacity="0.8" stroke-width="1.4"/>
    <circle cx="${(size * 0.95).toFixed(1)}" cy="${(h / 2).toFixed(1)}" r="${(size * 0.32).toFixed(1)}" fill="${color}"/>
    <text x="${(size * 1.6).toFixed(1)}" y="${(h / 2 + size * 0.36).toFixed(1)}" class="mono" font-size="${size}" fill="${t.text}">${esc(label)}</text>
  </g>` };
}

function stackOrbit(t) {
  const W = 1200, H = 640, cx = 600, cy = 296;
  const rings = [[210, 74, 46], [370, 132, 64], [510, 196, 88]];
  const css = `${AURORA_CSS}
  @keyframes pulse { 0% { transform: scale(0.6); opacity: 0.6; } 100% { transform: scale(2.4); opacity: 0; } }
  .pulse { transform-box: fill-box; transform-origin: center; animation: pulse 3s ease-out infinite; }
  .p2 { animation-delay: 1s; } .p3 { animation-delay: 2s; }`;
  let body = backdrop(t, W, H) + `<defs>${brandDefs(t, W)}
    <radialGradient id="core" cx="0.35" cy="0.3"><stop offset="0" stop-color="#fff" stop-opacity="0.9"/><stop offset="0.25" stop-color="${t.c1}"/><stop offset="0.7" stop-color="${t.c2}"/><stop offset="1" stop-color="${t.c3}"/></radialGradient></defs>`;
  body += `<g clip-path="url(#frame)">${stars(t, W, H, 60, 21)}</g>`;
  rings.forEach(([rx, ry], i) => {
    body += `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="${[t.c1, t.c2, t.c3][i]}" stroke-opacity="0.4" stroke-width="1.4" stroke-dasharray="${i === 1 ? '2 8' : '6 10'}"/>`;
  });
  body += `<circle class="pulse" cx="${cx}" cy="${cy}" r="44" fill="none" stroke="${t.c2}" stroke-width="2"/>
    <circle class="pulse p2" cx="${cx}" cy="${cy}" r="44" fill="none" stroke="${t.c1}" stroke-width="2"/>
    <circle class="pulse p3" cx="${cx}" cy="${cy}" r="44" fill="none" stroke="${t.c3}" stroke-width="2"/>
    <circle cx="${cx}" cy="${cy}" r="58" fill="url(#core)" opacity="0.5" filter="url(#halo)"/>
    <circle cx="${cx}" cy="${cy}" r="46" fill="url(#core)"/>
    <text x="${cx}" y="${cy + 10}" text-anchor="middle" class="mono" font-size="28" font-weight="800" fill="#fff">&lt;/&gt;</text>`;
  // Chips percorrendo as órbitas: animateMotion só leva o chip pela elipse,
  // sem girá-lo; a opacidade cai na metade de trás para dar profundidade.
  STACK.forEach((ring, ri) => {
    const [rx, ry, dur] = rings[ri];
    const dir = ri === 1 ? 1 : 0;
    const path = `M${cx - rx} ${cy} a${rx} ${ry} 0 1 ${dir} ${2 * rx} 0 a${rx} ${ry} 0 1 ${dir} ${-2 * rx} 0`;
    const fade = dir ? '0.9;0.45;0.9;1;0.9' : '0.9;1;0.9;0.45;0.9';
    ring.items.forEach(([label, color], i) => {
      const c = chip(t, label, color, 14, 0, 0);
      const begin = (-(i / ring.items.length) * dur).toFixed(2);
      body += `<g>${c.svg}
        <animateMotion dur="${dur}s" begin="${begin}s" repeatCount="indefinite" path="${path}"/>
        <animate attributeName="opacity" values="${fade}" keyTimes="0;0.25;0.5;0.75;1" dur="${dur}s" begin="${begin}s" repeatCount="indefinite"/>
      </g>`;
    });
  });
  let lx = 0;
  const legend = STACK.map((r, i) => {
    const p = pill(t, 0, 0, r.ring, { dot: [t.c1, t.c2, t.c3][i], size: 13 });
    const out = { p, x: lx };
    lx += p.w + 14;
    return out;
  });
  const start = (W - (lx - 14)) / 2;
  legend.forEach(({ p, x }) => { body += `<g transform="translate(${(start + x).toFixed(1)} ${H - 62})">${p.svg}</g>`; });
  body += frameStroke(t, W, H);
  return svg(W, H, `Stack: ${STACK.map((r) => `${r.ring}: ${r.items.map((x) => x[0]).join(', ')}`).join('. ')}`, css, body);
}

// No celular a órbita ficaria miúda: grade de chips por grupo.
function stackGrid(t) {
  const W = 640;
  let y = 40, body = '';
  STACK.forEach((ring, ri) => {
    body += `<text x="36" y="${y + 22}" class="mono" font-size="18" font-weight="700" fill="${[t.c1, t.c2, t.c3][ri]}">// ${esc(ring.ring.toUpperCase())}</text>`;
    y += 44;
    let x = 36;
    ring.items.forEach(([label, color], i) => {
      const c = chip(t, label, color, 18, 0, 0);
      if (x + c.w > W - 36) { x = 36; y += c.h + 14; }
      body += `<g class="rv" style="animation-delay:${(ri * 0.3 + i * 0.06).toFixed(2)}s">${chip(t, label, color, 18, x + c.w / 2, y + c.h / 2).svg}</g>`;
      x += c.w + 12;
    });
    y += 41 + 40;
  });
  const H = Math.round(y);
  return svg(W, H, `Stack: ${STACK.map((r) => `${r.ring}: ${r.items.map((x) => x[0]).join(', ')}`).join('. ')}`, AURORA_CSS,
    backdrop(t, W, H) + `<defs>${brandDefs(t, W)}</defs>` + body + frameStroke(t, W, H));
}

// ── Projetos ───────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    id: 'saude', repo: 'falcao-saude-ocupacional', shot: 'saude.jpg', demo: true,
    accent: { dark: '#F5B83D', light: '#B7791F' },
    tag: 'SAÚDE OCUPACIONAL', title: ['Falcão Saúde', 'Ocupacional'],
    desc: ['Agenda, prontuário eletrônico, exames, ASO por', 'atividade de risco, atestados, férias e segurança', 'do trabalho (NBR 14280).'],
    highlights: ['17 módulos com RBAC por perfil', 'Auditoria LGPD de ponta a ponta', '3 idiomas · demonstração no ar'],
    stack: ['React 18', 'TypeScript', 'NestJS', 'Prisma', 'PostgreSQL', 'Docker'],
  },
  {
    id: 'rh', repo: 'Falcao-RH-Management', shot: 'rh.jpg',
    accent: { dark: '#FACC15', light: '#A16207' },
    tag: 'GESTÃO DE PESSOAS', title: ['Falcão RH'],
    desc: ['Gente, obra e escritório no mesmo cadastro:', 'colaboradores, estrutura, férias pela CLT,', 'aprovações, documentos com validade e indicadores.'],
    highlights: ['Isolamento por empresa com RLS no PostgreSQL', '102 testes de unidade e integração + 15 E2E', 'Paleta de comandos com Ctrl + K'],
    stack: ['React 19', 'Fastify 5', 'Drizzle', 'PostgreSQL 17', 'Tailwind 4', 'Playwright'],
  },
  {
    id: 'erp', repo: 'falcao-ERP-suprimentos-master', shot: 'erp.jpg',
    accent: { dark: '#38BDF8', light: '#0369A1' },
    tag: 'SUPRIMENTOS · ERP', title: ['Falcão ERP', 'Suprimentos'],
    desc: ['Fornecedores, produtos com histórico de preços,', 'compras com aprovação em etapas, contratos com', 'aditivos e contas a pagar com fluxo de caixa.'],
    highlights: ['Aprovação de compras em etapas', 'Conciliação de nota fiscal', 'RBAC, auditoria e 3 idiomas'],
    stack: ['React 18', 'TypeScript', 'NestJS', 'Prisma', 'PostgreSQL', 'Docker'],
  },
  {
    id: 'clinica', repo: 'clinica-de-saude-estetica', shot: 'clinica.jpg',
    accent: { dark: '#F472B6', light: '#BE185D' },
    tag: 'ESTÉTICA · AGENDAMENTO ONLINE', title: ['Clínica Noely', 'Cerqueira'],
    desc: ['Site com agendamento online e painel de gestão:', 'agenda, fichas de pacientes, financeiro com DRE', 'e conciliação OFX, estoque e auditoria LGPD.'],
    highlights: ['WhatsApp automático: saudação, confirmação', 'e lembretes · integração com Google Agenda', 'No ar numa VPS própria, com HTTPS e backup'],
    stack: ['Vue 3', 'TypeScript', 'Vite', 'Express', 'Prisma', 'PostgreSQL', 'GSAP'],
  },
  {
    id: 'epi', repo: 'Controle-de-EPI', shot: 'epi.jpg',
    accent: { dark: '#FB923C', light: '#C2410C' },
    tag: 'SEGURANÇA DO TRABALHO · NR-6', title: ['Controle de', 'Entrega de EPIs'],
    desc: ['Entrega de EPI com assinatura do colaborador na', 'tela, estoque por almoxarifado e local e', 'validação de CA — a rastreabilidade da NR-6.'],
    highlights: ['QR Code do crachá + hash SHA-256', 'Comprovante de entrega assinado', 'Do celular do almoxarife à gestão'],
    stack: ['React 19', 'TypeScript', 'Express', 'Prisma', 'PostgreSQL'],
  },
  {
    id: 'seminario', repo: 'seminario-bsc-governanca-ti', url: 'mdevsec-code.github.io/seminario-bsc-governanca-ti', demo: true,
    accent: { dark: '#A78BFA', light: '#6D28D9' },
    tag: 'ACADÊMICO · UNIME', title: ['Seminário BSC na', 'Governança de TI'],
    desc: ['Deck de 50 slides e um quiz ao vivo que substitui', 'o Kahoot: a turma entra pelo celular, responde,', 'e o ranking e o pódio se preenchem sozinhos.'],
    highlights: ['Pontuação proporcional à rapidez', 'Sala com código e QR Code', 'Site estático no GitHub Pages'],
    stack: ['HTML', 'JavaScript', 'Firebase', 'GitHub Pages'],
  },
];

const shotData = (file) => `data:image/jpeg;base64,${readFileSync(join(SHOTS, file)).toString('base64')}`;

// Ilustração do Seminário (não tem captura): slide do BSC com as quatro
// perspectivas, um celular respondendo o quiz e o pódio subindo.
function seminarArt(t, a, w, h) {
  const persp = [['Financeira', '#F59E0B'], ['Clientes', '#3B82F6'], ['Processos internos', '#10B981'], ['Aprendizado', '#EC4899']];
  const sw = w * 0.62, sh = h * 0.78, sx = w * 0.05, sy = h * 0.11;
  let q = '';
  persp.forEach(([label, c], i) => {
    const qx = sx + 22 + (i % 2) * ((sw - 54) / 2 + 10), qy = sy + 78 + Math.floor(i / 2) * ((sh - 110) / 2 + 10);
    const qw = (sw - 54) / 2, qh = (sh - 110) / 2;
    q += `<rect x="${qx}" y="${qy}" width="${qw}" height="${qh}" rx="10" fill="${c}" fill-opacity="0.16" stroke="${c}" stroke-opacity="0.7"/>
      <circle cx="${qx + 20}" cy="${qy + 22}" r="6" fill="${c}"/>
      <text x="${qx + 34}" y="${qy + 27}" class="sans" font-size="${(w * 0.021).toFixed(1)}" font-weight="700" fill="${t.text}">${label}</text>
      <rect x="${qx + 14}" y="${qy + qh - 24}" width="${qw - 28}" height="6" rx="3" fill="${t.line}"/>
      <rect x="${qx + 14}" y="${qy + qh - 24}" width="${(qw - 28) * (0.5 + i * 0.12)}" height="6" rx="3" fill="${c}"/>`;
  });
  const px = w * 0.72, py = h * 0.14, pw = w * 0.22, ph = h * 0.74;
  const btn = ['#E21B3C', '#1368CE', '#D89E00', '#26890C'];
  let answers = '';
  btn.forEach((c, i) => {
    const bx = px + 12 + (i % 2) * ((pw - 34) / 2 + 10), by = py + ph * 0.34 + Math.floor(i / 2) * (ph * 0.15);
    answers += `<rect x="${bx}" y="${by}" width="${(pw - 34) / 2}" height="${ph * 0.12}" rx="8" fill="${c}"><animate attributeName="opacity" values="1;1;0.35;1" keyTimes="0;0.55;0.6;1" dur="4s" begin="${i * 0.2}s" repeatCount="indefinite"/></rect>`;
  });
  const podium = [[0.62, 2], [0.9, 1], [0.45, 3]];
  let pod = '';
  podium.forEach(([f, n], i) => {
    const bw = (pw - 40) / 3, bx = px + 14 + i * (bw + 6), bh = ph * 0.17 * f, by = py + ph - 14 - bh;
    pod += `<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="4" fill="${a}" fill-opacity="${0.45 + f * 0.5}"><animate attributeName="height" values="0;${bh}" dur="1.2s" begin="${0.4 + i * 0.2}s" fill="freeze"/><animate attributeName="y" values="${by + bh};${by}" dur="1.2s" begin="${0.4 + i * 0.2}s" fill="freeze"/></rect>
      <text x="${bx + bw / 2}" y="${by - 6}" text-anchor="middle" class="mono" font-size="12" font-weight="700" fill="${t.text}">${n}º</text>`;
  });
  return `
  <rect width="${w}" height="${h}" fill="${t.panel}"/>
  <rect width="${w}" height="${h}" fill="url(#dots)" opacity="0.5"/>
  <rect x="${sx}" y="${sy}" width="${sw}" height="${sh}" rx="14" fill="${t.panel2}" stroke="${t.line2}"/>
  <text x="${sx + 22}" y="${sy + 40}" class="sans" font-size="${(w * 0.036).toFixed(1)}" font-weight="800" fill="${t.text}">Balanced Scorecard</text>
  <text x="${sx + 22}" y="${sy + 62}" class="mono" font-size="${(w * 0.018).toFixed(1)}" fill="${t.muted}">governança de TI · 4 perspectivas</text>
  ${q}
  <rect x="${px}" y="${py}" width="${pw}" height="${ph}" rx="22" fill="${t.bg}" stroke="${t.line2}" stroke-width="2"/>
  <rect x="${px + pw / 2 - 22}" y="${py + 10}" width="44" height="6" rx="3" fill="${t.line2}"/>
  <text x="${px + 14}" y="${py + 44}" class="mono" font-size="11" fill="${t.muted}">sala · BSC4</text>
  <text x="${px + 14}" y="${py + 70}" class="sans" font-size="13.5" font-weight="700" fill="${t.text}">Qual perspectiva</text>
  <text x="${px + 14}" y="${py + 88}" class="sans" font-size="13.5" font-weight="700" fill="${t.text}">mede inovação?</text>
  ${answers}
  ${pod}`;
}

function projectCard(t, p, idx, mobile) {
  const a = p.accent[t.name];
  const W = mobile ? 640 : 1200;
  const mirror = !mobile && idx % 2 === 1;
  const ww = mobile ? 592 : 650, bar = 34, ih = Math.round(ww * 550 / 880), wh = bar + ih;
  const wx = mobile ? 24 : (mirror ? 510 : 40), wy = mobile ? 28 : 64;
  const tx = mobile ? 34 : (mirror ? 54 : 738), tw = mobile ? 572 : 410;
  const F = mobile
    ? { idx: 17, tag: 14, title: 40, tlh: 44, desc: 19, dlh: 28, hl: 18, hlh: 32, chip: 15 }
    : { idx: 14, tag: 12, title: 38, tlh: 42, desc: 16, dlh: 24, hl: 15.5, hlh: 29, chip: 12.5 };

  // Coluna de texto, montada de cima para baixo.
  let y = mobile ? wy + wh + 64 : 110;
  let txt = `<text x="${tx}" y="${y}" class="mono" font-size="${F.idx}" font-weight="700" fill="${a}">0${idx + 1}<tspan fill="${t.faint}" font-weight="400"> / 0${PROJECTS.length}</tspan></text>`;
  y += mobile ? 22 : 18;
  const tagW = [...p.tag].length * (F.tag * 0.68 + 1.6) + 28;
  txt += `<rect x="${tx}" y="${y}" width="${tagW.toFixed(1)}" height="${F.tag * 2.4}" rx="${F.tag * 1.2}" fill="${a}" fill-opacity="0.13" stroke="${a}" stroke-opacity="0.5"/>
    <text x="${tx + 14}" y="${y + F.tag * 1.62}" class="sans" font-size="${F.tag}" font-weight="800" letter-spacing="1.6" fill="${a}">${esc(p.tag)}</text>`;
  y += F.tag * 2.4 + F.title + (mobile ? 22 : 20);
  p.title.forEach((ln, i) => { txt += `<text x="${tx}" y="${y + i * F.tlh}" class="sans" font-size="${F.title}" font-weight="800" letter-spacing="-0.8" fill="${t.text}">${esc(ln)}</text>`; });
  y += (p.title.length - 1) * F.tlh + (mobile ? 42 : 36);
  p.desc.forEach((ln, i) => { txt += `<text x="${tx}" y="${y + i * F.dlh}" class="sans" font-size="${F.desc}" fill="${t.muted}">${esc(ln)}</text>`; });
  y += (p.desc.length - 1) * F.dlh + (mobile ? 44 : 38);
  p.highlights.forEach((ln, i) => {
    const hy = y + i * F.hlh;
    txt += `<g class="rv" style="animation-delay:${(0.4 + i * 0.15).toFixed(2)}s"><circle cx="${tx + F.hl * 0.6}" cy="${hy - F.hl * 0.34}" r="${F.hl * 0.62}" fill="${a}" fill-opacity="0.16"/>
      ${icon('check', tx + F.hl * 0.6 - F.hl * 0.42, hy - F.hl * 0.34 - F.hl * 0.42, F.hl * 0.84, a, 3)}
      <text x="${tx + F.hl * 1.7}" y="${hy}" class="sans" font-size="${F.hl}" font-weight="600" fill="${t.text}">${esc(ln)}</text></g>`;
  });
  y += (p.highlights.length - 1) * F.hlh + (mobile ? 34 : 30);
  let cx = tx;
  const ch = F.chip * 2.2;
  p.stack.forEach((s) => {
    const w = textWidth(s, F.chip, true) + 22;
    if (cx + w > tx + tw) { cx = tx; y += ch + 8; }
    txt += `<rect x="${cx}" y="${y}" width="${w.toFixed(1)}" height="${ch}" rx="${ch / 2}" fill="${t.bg}" fill-opacity="0.6" stroke="${t.line2}"/>
      <text x="${cx + 11}" y="${y + ch / 2 + F.chip * 0.36}" class="mono" font-size="${F.chip}" fill="${t.muted}">${esc(s)}</text>`;
    cx += w + 8;
  });
  y += ch + (mobile ? 48 : 40);
  txt += `<text x="${tx}" y="${y}" class="sans" font-size="${mobile ? 19 : 16}" font-weight="800" fill="${a}">${p.url ? 'Abrir o site' : 'Ver o repositório'} →</text>`;
  if (p.demo && !p.url) txt += `<circle cx="${tx + (mobile ? 190 : 168)}" cy="${y - 5}" r="5" fill="${t.ok}"/><text x="${tx + (mobile ? 202 : 180)}" y="${y}" class="mono" font-size="${mobile ? 15 : 13}" fill="${t.ok}">demonstração no ar</text>`;

  const H = mobile ? Math.round(y + 44) : 620;
  const css = `${AURORA_CSS}
  @keyframes bob { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-7px); } }
  .bob { animation: bob 6s ease-in-out infinite; }
  @keyframes sweep { 0% { transform: translateX(-300px) skewX(-18deg); } 55%, 100% { transform: translateX(${ww + 300}px) skewX(-18deg); } }
  .shine { animation: sweep 6.5s ease-in-out ${idx * 0.7}s infinite; }`;

  const clip = `M0 ${bar} H${ww} V${wh - 16} Q${ww} ${wh} ${ww - 16} ${wh} H16 Q0 ${wh} 0 ${wh - 16} Z`;
  const url = p.url ?? `github.com/mdevsec-code/${p.repo}`;
  const screen = p.shot
    ? `<image href="${shotData(p.shot)}" x="0" y="${bar}" width="${ww}" height="${ih}" preserveAspectRatio="xMidYMin slice"/>`
    : `<g transform="translate(0 ${bar})">${seminarArt(t, a, ww, ih)}</g>`;
  const win = `
  <g transform="translate(${wx} ${wy})"><g class="bob">
    <rect x="-2" y="18" width="${ww + 4}" height="${wh}" rx="18" fill="${t.shade}" opacity="${t.name === 'dark' ? 0.5 : 0.16}" filter="url(#halo)"/>
    <rect width="${ww}" height="${wh}" rx="16" fill="${t.panel2}" stroke="${t.line2}"/>
    <circle cx="20" cy="17" r="5.5" fill="#FF5F57"/><circle cx="38" cy="17" r="5.5" fill="#FEBC2E"/><circle cx="56" cy="17" r="5.5" fill="#28C840"/>
    <rect x="80" y="7" width="${ww - 160}" height="20" rx="10" fill="${t.bg}" fill-opacity="0.7" stroke="${t.line}"/>
    <text x="${80 + (ww - 160) / 2}" y="21" text-anchor="middle" class="mono" font-size="${mobile ? 12.5 : 11.5}" fill="${t.muted}">${esc(url)}</text>
    <g clip-path="url(#scr)">${screen}<rect class="shine" x="0" y="${bar}" width="140" height="${ih}" fill="url(#sh)"/></g>
    <path d="${clip}" fill="none" stroke="${t.line2}"/>
  </g></g>`;

  const label = `${p.title.join(' ')} — ${p.tag}. ${p.desc.join(' ')} Destaques: ${p.highlights.join('; ')}. Stack: ${p.stack.join(', ')}.`;
  let body = backdrop(t, W, H) + `<defs>${brandDefs(t, W)}
    <clipPath id="scr"><path d="${clip}"/></clipPath>
    <linearGradient id="sh" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="0.5" stop-color="#fff" stop-opacity="${t.name === 'dark' ? 0.14 : 0.35}"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <linearGradient id="acc" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${t.c2}"/></linearGradient></defs>`;
  body += `<g clip-path="url(#frame)"><ellipse cx="${wx + ww / 2}" cy="${wy + wh / 2}" rx="${ww * 0.55}" ry="${wh * 0.5}" fill="${a}" opacity="${t.name === 'dark' ? 0.22 : 0.12}" filter="url(#soft)"/></g>`;
  body += win + txt;
  body += frameStroke(t, W, H);
  body += cometBorder(W, H, 24, 'url(#acc)', 10, 300).replace('<animate ', `<animate begin="${(-idx * 1.7).toFixed(1)}s" `);
  return svg(W, H, label, css, body);
}

// ── Formação e idiomas ─────────────────────────────────────────────────────

function education(t, mobile) {
  const W = mobile ? 640 : 1200;
  const pw = mobile ? 640 : 582, ph = mobile ? 330 : 330, gap = 36;
  const H = mobile ? ph * 2 + gap : ph;
  const css = `${AURORA_CSS}
  @keyframes fillx { from { transform: scaleX(0); } to { transform: scaleX(1); } }
  .fill { transform-box: fill-box; transform-origin: left; animation: fillx 1.6s cubic-bezier(.2,.7,.2,1) both; }`;
  const k = mobile ? 1.12 : 1;
  const panel = (x, y, ic, kicker, inner) => `<g transform="translate(${x} ${y})">
    <rect x="1" y="1" width="${pw - 2}" height="${ph - 2}" rx="22" fill="${t.panel}" stroke="${t.line2}"/>
    ${cometBorder(pw, ph, 22, 'url(#brand)', 9, 200)}
    <rect x="30" y="30" width="54" height="54" rx="15" fill="url(#brand)"/>
    ${icon(ic, 43, 43, 28, '#fff', 2.2)}
    <text x="100" y="${52}" class="mono" font-size="${13 * k}" letter-spacing="3" fill="${t.muted}">${kicker}</text>
    ${inner}
  </g>`;

  let sem = '';
  const sx = 30, sw = (pw - 60 - 7 * 10) / 8;
  for (let i = 0; i < 8; i++) {
    sem += `<rect x="${(sx + i * (sw + 10)).toFixed(1)}" y="196" width="${sw.toFixed(1)}" height="16" rx="5" fill="${t.line}"/>
      <rect x="${(sx + i * (sw + 10)).toFixed(1)}" y="196" width="${sw.toFixed(1)}" height="16" rx="5" fill="url(#brand)" opacity="0"><animate attributeName="opacity" to="1" dur="0.35s" begin="${(0.4 + i * 0.22).toFixed(2)}s" fill="freeze"/></rect>
      <text x="${(sx + i * (sw + 10) + sw / 2).toFixed(1)}" y="236" text-anchor="middle" class="mono" font-size="${12 * k}" fill="${t.faint}">${i + 1}º</text>`;
  }
  const edu = `<text x="100" y="78" class="sans" font-size="${27 * k}" font-weight="800" fill="${t.text}">Sistemas de Informação</text>
    <text x="30" y="140" class="sans" font-size="${18 * k}" fill="${t.muted}">Bacharelado · UNIME</text>
    <text x="30" y="172" class="mono" font-size="${14 * k}" fill="${t.c1}">8º semestre<tspan fill="${t.muted}"> · conclusão prevista para breve</tspan></text>
    ${sem}
    <text x="30" y="290" class="mono" font-size="${13 * k}" fill="${t.faint}">// governança de TI, BI, engenharia de software</text>`;

  const langs = [['Português', 'Nativo', 1], ['Inglês', 'Avançado · CNA Master e Platinum', 0.86]];
  let lg = '';
  langs.forEach(([l, lvl, f], i) => {
    const ly = 140 + i * 92;
    lg += `<text x="30" y="${ly}" class="sans" font-size="${22 * k}" font-weight="800" fill="${t.text}">${l}</text>
      <text x="${pw - 30}" y="${ly}" text-anchor="end" class="mono" font-size="${13 * k}" fill="${t.muted}">${lvl}</text>
      <rect x="30" y="${ly + 18}" width="${pw - 60}" height="12" rx="6" fill="${t.line}"/>
      <rect class="fill" style="animation-delay:${0.5 + i * 0.3}s" x="30" y="${ly + 18}" width="${((pw - 60) * f).toFixed(1)}" height="12" rx="6" fill="url(#brand)"/>`;
  });
  const lang = `<text x="100" y="78" class="sans" font-size="${27 * k}" font-weight="800" fill="${t.text}">Português e Inglês</text>${lg}`;

  let body = `<defs>${brandDefs(t, W)}</defs>`;
  body += panel(0, 0, 'cap', 'FORMAÇÃO', edu);
  body += mobile ? panel(0, ph + gap, 'globe', 'IDIOMAS', lang) : panel(pw + gap, 0, 'globe', 'IDIOMAS', lang);
  return svg(W, H, 'Formação: Bacharelado em Sistemas de Informação na UNIME, 8º semestre, conclusão prevista para breve. Idiomas: português nativo; inglês avançado (CNA Master e Platinum).', css, body);
}

// ── Rodapé ─────────────────────────────────────────────────────────────────

function footer(t, mobile) {
  const W = mobile ? 640 : 1200, H = mobile ? 300 : 240;
  const css = `${AURORA_CSS}
  @keyframes wave { from { transform: translateX(0px); } to { transform: translateX(-${W}px); } }
  .w1 { animation: wave 14s linear infinite; } .w2 { animation: wave 22s linear infinite reverse; } .w3 { animation: wave 30s linear infinite; }`;
  const wave = (amp, y, cls, op, fill) => {
    let d = `M0 ${y}`;
    for (let x = 0; x <= W * 2; x += W / 4) d += ` Q${x + W / 8} ${y - amp} ${x + W / 4} ${y} T${x + W / 2} ${y}`;
    return `<path class="${cls}" d="${d} V${H} H0 Z" fill="${fill}" opacity="${op}"/>`;
  };
  let body = backdrop(t, W, H) + `<defs>${brandDefs(t, W)}</defs>`;
  body += `<g clip-path="url(#frame)">${stars(t, W, H * 0.6, 30, 99, H * 0.6)}
    ${wave(18, H - 70, 'w3', 0.18, t.c3)}${wave(24, H - 52, 'w2', 0.22, t.c2)}${wave(14, H - 34, 'w1', 0.3, t.c1)}</g>`;
  if (mobile) {
    body += `<text x="${W / 2}" y="92" text-anchor="middle" class="sans" font-size="34" font-weight="800" fill="url(#flow)">Obrigado pela visita</text>
      <text x="${W / 2}" y="138" text-anchor="middle" class="sans" font-size="24" fill="${t.text}">vamos construir algo juntos?</text>
      <text x="${W / 2}" y="180" text-anchor="middle" class="mono" font-size="15" fill="${t.muted}">feito em SVG puro · zero JavaScript</text>`;
  } else {
    body += `<text x="${W / 2}" y="92" text-anchor="middle" class="sans" font-size="40" font-weight="800" fill="url(#flow)">Obrigado pela visita — vamos construir algo juntos?</text>
      <text x="${W / 2}" y="132" text-anchor="middle" class="mono" font-size="15" fill="${t.muted}">murilo@mdevsec ~ $ exit <tspan fill="${t.faint}">· perfil feito em SVG puro, zero JavaScript</tspan></text>`;
  }
  body += frameStroke(t, W, H);
  return svg(W, H, 'Obrigado pela visita — vamos construir algo juntos?', css, body);
}

// ── Execução ───────────────────────────────────────────────────────────────

mkdirSync(OUT, { recursive: true });
for (const t of Object.values(THEMES)) {
  save(`hero-${t.name}.svg`, hero(t, false));
  save(`hero-mobile-${t.name}.svg`, hero(t, true));
  BUTTONS.forEach((b, i) => save(`btn-${b.id}-${t.name}.svg`, button(t, b, i)));
  for (const s of SECTIONS) {
    save(`title-${s.id}-${t.name}.svg`, sectionTitle(t, s, false));
    save(`title-${s.id}-mobile-${t.name}.svg`, sectionTitle(t, s, true));
  }
  save(`about-${t.name}.svg`, neofetch(t, false));
  save(`about-mobile-${t.name}.svg`, neofetch(t, true));
  save(`services-${t.name}.svg`, services(t, false));
  save(`services-mobile-${t.name}.svg`, services(t, true));
  save(`stack-${t.name}.svg`, stackOrbit(t));
  save(`stack-mobile-${t.name}.svg`, stackGrid(t));
  PROJECTS.forEach((p, i) => {
    save(`project-${p.id}-${t.name}.svg`, projectCard(t, p, i, false));
    save(`project-${p.id}-mobile-${t.name}.svg`, projectCard(t, p, i, true));
  });
  save(`education-${t.name}.svg`, education(t, false));
  save(`education-mobile-${t.name}.svg`, education(t, true));
  save(`footer-${t.name}.svg`, footer(t, false));
  save(`footer-mobile-${t.name}.svg`, footer(t, true));
}

// ── README ─────────────────────────────────────────────────────────────────
// Gerado junto com os SVGs: cada imagem tem até 4 variantes (desktop e
// celular × claro e escuro), escolhidas pelo <picture> do próprio GitHub.

const RAW_OUTPUT = 'https://raw.githubusercontent.com/mdevsec-code/mdevsec-code/output';

function picture(base, alt, { mobile = true, width = '100%', height } = {}) {
  const size = height ? `height="${height}"` : `width="${width}"`;
  const src = (v, th) => `assets/${base}${v}-${th}.svg`;
  const m = mobile
    ? `  <source media="(max-width: 600px) and (prefers-color-scheme: dark)" srcset="${src('-mobile', 'dark')}">
  <source media="(max-width: 600px) and (prefers-color-scheme: light)" srcset="${src('-mobile', 'light')}">
  <source media="(max-width: 600px)" srcset="${src('-mobile', 'dark')}">
`
    : '';
  return `<picture>
${m}  <source media="(prefers-color-scheme: dark)" srcset="${src('', 'dark')}">
  <source media="(prefers-color-scheme: light)" srcset="${src('', 'light')}">
  <img alt="${esc(alt)}" src="${src('', 'dark')}" ${size}>
</picture>`;
}

// Botão: imagem curta, sem versão de celular (já é pequena).
const btnPicture = (id, alt) =>
  `<picture><source media="(prefers-color-scheme: light)" srcset="assets/btn-${id}-light.svg"><img alt="${esc(alt)}" src="assets/btn-${id}-dark.svg" height="48"></picture>`;

const title = (id) => {
  const s = SECTIONS.find((x) => x.id === id);
  return picture(`title-${id}`, `${s.n} — ${s.title}`);
};

function readme() {
  const links = {
    linkedin: 'https://linkedin.com/in/dev-murilo-de-souza',
    email: 'mailto:murilocerqueira361@gmail.com',
    projetos: '#projetos',
    local: 'https://www.google.com/maps/place/Cama%C3%A7ari,+BA',
  };
  const projectBlocks = PROJECTS.map((p, i) => {
    const repo = `https://github.com/mdevsec-code/${p.repo}`;
    const extra = p.id === 'saude'
      ? ` · <a href="https://falcao-saude-ocupacional-eta.vercel.app">🌐 demonstração no ar</a>`
      : p.url ? ` · <a href="https://${p.url}/">🌐 abrir o site</a>` : '';
    return `<a href="${repo}">
${picture(`project-${p.id}`, `${p.title.join(' ')} — ${p.tag}: ${p.desc.join(' ')}`)}
</a>
<p align="center"><sub><a href="${repo}"><b>${esc(p.title.join(' '))}</b> · repositório</a>${extra}</sub></p>
${i < PROJECTS.length - 1 ? '\n' : ''}`;
  }).join('\n');

  const streak = (th) => {
    const c = th === 'dark'
      ? 'ring=22D3EE&fire=F472B6&currStreakNum=EEF2FF&sideNums=8B5CF6&currStreakLabel=22D3EE&sideLabels=EEF2FF&dates=8C96BA&stroke=2A3A66'
      : 'ring=0891B2&fire=DB2777&currStreakNum=0B1022&sideNums=7C3AED&currStreakLabel=0891B2&sideLabels=0B1022&dates=566182&stroke=C6D0EC';
    return `https://streak-stats.demolab.com?user=mdevsec-code&locale=pt_BR&hide_border=true&background=00000000&${c}`;
  };

  return `<!--
  Gerado por scripts/gerar-svgs.mjs (node scripts/gerar-svgs.mjs) — edite os
  textos lá, não aqui: o script reescreve este arquivo e todos os SVGs de
  assets/ (desktop e celular, tema claro e escuro). As capturas dos projetos
  ficam em assets/shots/ e vão embutidas nos cartões. A cobrinha e o gráfico
  3D das contribuições são gerados todo dia por .github/workflows/snake.yml e
  publicados no branch \`output\`.
-->

${picture('hero', `${NAME} — ${SUBTITLE}`)}

<p align="center">
  <a href="${links.linkedin}">${btnPicture('linkedin', 'LinkedIn')}</a>
  <a href="${links.email}">${btnPicture('email', 'E-mail')}</a>
  <a href="${links.projetos}">${btnPicture('projetos', 'Projetos')}</a>
  <a href="${links.local}">${btnPicture('local', 'Camaçari, BA')}</a>
</p>

<p align="center">
  <img alt="Visitas ao perfil" src="https://komarev.com/ghpvc/?username=mdevsec-code&label=visitas&color=8B5CF6&style=flat-square">
  <img alt="Seguidores" src="https://img.shields.io/github/followers/mdevsec-code?label=seguidores&style=flat-square&color=22D3EE&labelColor=0B1124">
  <img alt="Estrelas" src="https://img.shields.io/github/stars/mdevsec-code?label=estrelas&style=flat-square&color=F472B6&labelColor=0B1124&affiliations=OWNER">
</p>

<br>

${title('sobre')}

${picture('about', `neofetch — ${FETCH.map(([k, v]) => `${k}: ${v}`).join('; ')}`)}

Desenvolvedor full-stack e profissional de dados, atuando na interseção entre **desenvolvimento de software**, **BI/automação de processos** e **ambiente industrial**. Hoje na **ENGENOVA Construções**, numa unidade dentro da fábrica da **BYD** em Camaçari/BA, transformando dados de operação em decisão — e construindo as ferramentas que faltam quando a ideal não está disponível.

<br>

${title('servicos')}

${picture('services', `O que eu faço: ${SERVICES.map((s) => `${s.title} — ${s.lines.join(' ')}`).join(' ')}`)}

<br>

${title('stack')}

${picture('stack', `Stack: ${STACK.map((r) => `${r.ring}: ${r.items.map((x) => x[0]).join(', ')}`).join('. ')}`)}

<br>

<a id="projetos"></a>

${title('projetos')}

${projectBlocks}

<br>

${title('atividade')}

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="${RAW_OUTPUT}/3d/profile-night-rainbow.svg">
  <source media="(prefers-color-scheme: light)" srcset="${RAW_OUTPUT}/3d/profile-season-animate.svg">
  <img alt="Gráfico 3D das contribuições no GitHub" src="${RAW_OUTPUT}/3d/profile-night-rainbow.svg" width="100%">
</picture>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="${RAW_OUTPUT}/github-snake-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="${RAW_OUTPUT}/github-snake.svg">
  <img alt="Cobrinha percorrendo o gráfico de contribuições" src="${RAW_OUTPUT}/github-snake-dark.svg" width="100%">
</picture>

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="${streak('dark')}">
    <source media="(prefers-color-scheme: light)" srcset="${streak('light')}">
    <img alt="Sequência de contribuições no GitHub" src="${streak('dark')}">
  </picture>
</p>

<br>

${title('formacao')}

${picture('education', 'Formação: Bacharelado em Sistemas de Informação na UNIME, 8º semestre, conclusão prevista para breve. Idiomas: português nativo; inglês avançado (CNA Master e Platinum).')}

<br><br>

${picture('footer', 'Obrigado pela visita — vamos construir algo juntos?')}
`;
}

writeFileSync(join(ROOT, 'README.md'), readme());
console.log('README.md escrito');
