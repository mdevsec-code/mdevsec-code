"""
Gera os SVGs animados do README do perfil (assets/*.svg), em tema claro e escuro.

Uso:  python scripts/gerar_svgs.py

Tudo é SVG estático com animação em CSS/SMIL: o GitHub exibe como imagem,
sem JavaScript e sem depender de serviços externos. Para mudar textos ou
cores, edite as constantes abaixo e rode o script de novo.
"""

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent / "assets"

THEMES = {
    "dark": {
        "bg": "#0D1117",
        "panel": "#161B22",
        "grid": "#21262D",
        "grid2": "#30363D",
        "text": "#E6EDF3",
        "muted": "#8B949E",
        "accent": "#2F81F7",
        "accent2": "#A371F7",
        "ok": "#3FB950",
        "warn": "#D29922",
    },
    "light": {
        "bg": "#FFFFFF",
        "panel": "#F6F8FA",
        "grid": "#EAEEF2",
        "grid2": "#D0D7DE",
        "text": "#1F2328",
        "muted": "#59636E",
        "accent": "#0969DA",
        "accent2": "#8250DF",
        "ok": "#1A7F37",
        "warn": "#9A6700",
    },
}

NAME = "Murilo de Souza"
SUBTITLE = "Full-Stack Developer · Dados, BI &amp; Automação"
ROLES = [
    "› React · TypeScript · NestJS · Prisma · PostgreSQL",
    "› Python · SQL · Dashboards de BI · SAP (Fiori, MM)",
    "› Transformo dados em decisão — e construo o que falta",
]
LOCATION = "Camaçari, BA · ENGENOVA Construções (unidade BYD)"

FONTS = """
  .mono { font-family: ui-monospace, SFMono-Regular, 'Cascadia Code', Consolas, 'Liberation Mono', monospace; }
  .sans { font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Inter, Helvetica, Arial, sans-serif; }
  .serif { font-family: Georgia, 'Times New Roman', serif; }
"""


def fill(template: str, theme: dict) -> str:
    for key, value in theme.items():
        template = template.replace("{{" + key + "}}", value)
    return template


# ── Banner ──────────────────────────────────────────────────────────────────

HEADER = """<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="360" viewBox="0 0 1200 360" role="img" aria-label="Murilo de Souza — Full-Stack Developer, Dados, BI e Automação">
<title>Murilo de Souza — Full-Stack Developer · Dados, BI e Automação</title>
<defs>
  <pattern id="g" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" fill="none" stroke="{{grid}}" stroke-width="1"/></pattern>
  <pattern id="G" width="120" height="120" patternUnits="userSpaceOnUse"><path d="M120 0H0V120" fill="none" stroke="{{grid2}}" stroke-width="1"/></pattern>
  <radialGradient id="glowA"><stop offset="0" stop-color="{{accent}}" stop-opacity="0.30"/><stop offset="1" stop-color="{{accent}}" stop-opacity="0"/></radialGradient>
  <radialGradient id="glowB"><stop offset="0" stop-color="{{accent2}}" stop-opacity="0.26"/><stop offset="1" stop-color="{{accent2}}" stop-opacity="0"/></radialGradient>
  <linearGradient id="nameGrad" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="{{accent}}"/><stop offset="1" stop-color="{{accent2}}"/></linearGradient>
  <radialGradient id="dotGlow"><stop offset="0" stop-color="{{accent}}" stop-opacity="0.9"/><stop offset="1" stop-color="{{accent}}" stop-opacity="0"/></radialGradient>
  <clipPath id="frame"><rect width="1200" height="360" rx="20"/></clipPath>
  <clipPath id="typing"><rect x="60" y="196" width="0" height="44">
    <animate attributeName="width" from="0" to="660" begin="1.5s" dur="1.9s" fill="freeze"/>
  </rect></clipPath>
</defs>
<style>
""" + FONTS + """
  @keyframes drift { 0%, 100% { transform: translate(0px, 0px); } 50% { transform: translate(46px, -22px); } }
  .glowA { animation: drift 10s ease-in-out infinite; }
  .glowB { animation: drift 13s ease-in-out infinite reverse; }
  @keyframes draw { to { stroke-dashoffset: 0; } }
  @keyframes paint { to { fill-opacity: 1; stroke-opacity: 0; } }
  .name { fill: url(#nameGrad); fill-opacity: 0; stroke: {{accent}}; stroke-width: 1.2; stroke-dasharray: 1600; stroke-dashoffset: 1600;
          animation: draw 2.2s ease-out forwards, paint 0.9s ease-out 1.7s forwards; }
  @keyframes blink { 50% { opacity: 0; } }
  .caret { animation: blink 1.05s steps(1) infinite; }
  @keyframes rotate { 0% { opacity: 0; transform: translateY(10px); } 4%, 30% { opacity: 1; transform: translateY(0px); } 34%, 100% { opacity: 0; transform: translateY(-10px); } }
  .role { opacity: 0; animation: rotate 10.5s ease-in-out infinite both; }
  .r1 { animation-delay: 3.4s; } .r2 { animation-delay: 6.9s; } .r3 { animation-delay: 10.4s; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0px); } }
  .late { opacity: 0; animation: fadeUp 0.8s ease-out 3.2s forwards; }
  @keyframes lit { 0%, 22%, 100% { stroke: {{grid2}}; } 6%, 14% { stroke: {{accent}}; } }
  .node { animation: lit 6s linear infinite; }
  .n2 { animation-delay: 1.9s; } .n3 { animation-delay: 3s; } .n4 { animation-delay: 4.9s; }
  @media (prefers-reduced-motion: reduce) {
    * { animation: none !important; }
    .name { fill-opacity: 1; stroke-opacity: 0; stroke-dashoffset: 0; }
    .late, .r1 { opacity: 1; }
  }
</style>
<g clip-path="url(#frame)">
  <rect width="1200" height="360" fill="{{bg}}"/>
  <rect width="1200" height="360" fill="url(#g)" opacity="0.7"/>
  <rect width="1200" height="360" fill="url(#G)" opacity="0.8"/>
  <circle class="glowA" cx="240" cy="110" r="280" fill="url(#glowA)"/>
  <circle class="glowB" cx="1000" cy="280" r="300" fill="url(#glowB)"/>
  <g stroke="{{muted}}" stroke-width="1.2" opacity="0.7">
    <path d="M30 40h20M40 30v20"/><path d="M1150 40h20M1160 30v20"/>
    <path d="M1150 320h20M1160 310v20"/>
  </g>
  <g class="mono" font-size="11" fill="{{muted}}" opacity="0.8">
    <text x="56" y="44">A1</text><text x="1126" y="44">A8</text>
    <text x="1126" y="324">F8</text>
  </g>
</g>
<rect x="0.5" y="0.5" width="1199" height="359" rx="20" fill="none" stroke="{{grid2}}"/>

<text x="64" y="96" class="mono" font-size="16" fill="{{muted}}">~/mdevsec-code <tspan fill="{{accent}}">$</tspan> whoami<tspan class="caret" fill="{{accent}}"> ▍</tspan></text>
<text x="60" y="176" class="serif name" font-size="78" font-weight="700" letter-spacing="-1">""" + NAME + """</text>
<g clip-path="url(#typing)">
  <text x="64" y="230" class="sans" font-size="27" fill="{{text}}">""" + SUBTITLE + """</text>
</g>
<g class="mono" font-size="17" fill="{{accent}}">
  <text class="role r1" x="64" y="282">""" + ROLES[0] + """</text>
  <text class="role r2" x="64" y="282">""" + ROLES[1] + """</text>
  <text class="role r3" x="64" y="282">""" + ROLES[2] + """</text>
</g>
<text class="mono late" x="64" y="322" font-size="14" fill="{{muted}}">◉ """ + LOCATION + """</text>

<g class="late">
  <text x="772" y="70" class="mono" font-size="12" letter-spacing="3" fill="{{muted}}">FLUXO · DADO → DECISÃO</text>
  <path id="loop" d="M845 118 H1065 V258 H845 Z" fill="none" stroke="{{grid2}}" stroke-width="2" stroke-dasharray="6 6"/>
  <g>
    <circle r="14" fill="url(#dotGlow)"><animateMotion dur="6s" repeatCount="indefinite" rotate="auto"><mpath href="#loop"/></animateMotion></circle>
    <circle r="5" fill="{{accent}}"><animateMotion dur="6s" repeatCount="indefinite"><mpath href="#loop"/></animateMotion></circle>
  </g>
  <g class="mono" font-size="15" font-weight="600" text-anchor="middle">
    <rect class="node n1" x="772" y="96" width="146" height="44" rx="10" fill="{{panel}}" stroke="{{grid2}}" stroke-width="2"/>
    <text x="845" y="123" fill="{{text}}">DADOS</text>
    <rect class="node n2" x="992" y="96" width="146" height="44" rx="10" fill="{{panel}}" stroke="{{grid2}}" stroke-width="2"/>
    <text x="1065" y="123" fill="{{text}}">API</text>
    <rect class="node n3" x="992" y="236" width="146" height="44" rx="10" fill="{{panel}}" stroke="{{grid2}}" stroke-width="2"/>
    <text x="1065" y="263" fill="{{text}}">DASHBOARD</text>
    <rect class="node n4" x="772" y="236" width="146" height="44" rx="10" fill="{{panel}}" stroke="{{grid2}}" stroke-width="2"/>
    <text x="845" y="263" fill="{{text}}">DECISÃO</text>
  </g>
</g>
</svg>
"""

# ── Banner (celular) ────────────────────────────────────────────────────────
# No celular o README tem ~360 px de largura: o banner de 1200 px ficaria com
# letra miúda. Esta versão é mais estreita, com fonte proporcionalmente maior,
# e troca o diagrama em quadrado por um fluxo horizontal.

ROLES_MOBILE = [
    "› React · TS · NestJS · Prisma",
    "› Python · SQL · BI · SAP Fiori",
    "› Dados viram decisão",
]

HEADER_MOBILE = """<svg xmlns="http://www.w3.org/2000/svg" width="640" height="440" viewBox="0 0 640 440" role="img" aria-label="Murilo de Souza — Full-Stack Developer, Dados, BI e Automação">
<title>Murilo de Souza — Full-Stack Developer · Dados, BI e Automação</title>
<defs>
  <pattern id="g" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="{{grid}}" stroke-width="1"/></pattern>
  <pattern id="G" width="100" height="100" patternUnits="userSpaceOnUse"><path d="M100 0H0V100" fill="none" stroke="{{grid2}}" stroke-width="1"/></pattern>
  <radialGradient id="glowA"><stop offset="0" stop-color="{{accent}}" stop-opacity="0.30"/><stop offset="1" stop-color="{{accent}}" stop-opacity="0"/></radialGradient>
  <radialGradient id="glowB"><stop offset="0" stop-color="{{accent2}}" stop-opacity="0.26"/><stop offset="1" stop-color="{{accent2}}" stop-opacity="0"/></radialGradient>
  <linearGradient id="nameGrad" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="{{accent}}"/><stop offset="1" stop-color="{{accent2}}"/></linearGradient>
  <radialGradient id="dotGlow"><stop offset="0" stop-color="{{accent}}" stop-opacity="0.9"/><stop offset="1" stop-color="{{accent}}" stop-opacity="0"/></radialGradient>
  <clipPath id="frame"><rect width="640" height="440" rx="20"/></clipPath>
  <clipPath id="typing"><rect x="36" y="168" width="0" height="40">
    <animate attributeName="width" from="0" to="580" begin="1.5s" dur="1.6s" fill="freeze"/>
  </rect></clipPath>
</defs>
<style>
""" + FONTS + """
  @keyframes drift { 0%, 100% { transform: translate(0px, 0px); } 50% { transform: translate(30px, -16px); } }
  .glowA { animation: drift 10s ease-in-out infinite; }
  .glowB { animation: drift 13s ease-in-out infinite reverse; }
  @keyframes draw { to { stroke-dashoffset: 0; } }
  @keyframes paint { to { fill-opacity: 1; stroke-opacity: 0; } }
  .name { fill: url(#nameGrad); fill-opacity: 0; stroke: {{accent}}; stroke-width: 1.2; stroke-dasharray: 1400; stroke-dashoffset: 1400;
          animation: draw 2.2s ease-out forwards, paint 0.9s ease-out 1.7s forwards; }
  @keyframes blink { 50% { opacity: 0; } }
  .caret { animation: blink 1.05s steps(1) infinite; }
  @keyframes rotate { 0% { opacity: 0; transform: translateY(10px); } 4%, 30% { opacity: 1; transform: translateY(0px); } 34%, 100% { opacity: 0; transform: translateY(-10px); } }
  .role { opacity: 0; animation: rotate 10.5s ease-in-out infinite both; }
  .r1 { animation-delay: 3.4s; } .r2 { animation-delay: 6.9s; } .r3 { animation-delay: 10.4s; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0px); } }
  .late { opacity: 0; animation: fadeUp 0.8s ease-out 3.2s forwards; }
  @keyframes lit { 0%, 22%, 100% { stroke: {{grid2}}; } 6%, 14% { stroke: {{accent}}; } }
  .node { animation: lit 5s linear infinite; }
  .n2 { animation-delay: 1.25s; } .n3 { animation-delay: 2.5s; } .n4 { animation-delay: 3.75s; }
  @media (prefers-reduced-motion: reduce) {
    * { animation: none !important; }
    .name { fill-opacity: 1; stroke-opacity: 0; stroke-dashoffset: 0; }
    .late, .r1 { opacity: 1; }
  }
</style>
<g clip-path="url(#frame)">
  <rect width="640" height="440" fill="{{bg}}"/>
  <rect width="640" height="440" fill="url(#g)" opacity="0.7"/>
  <rect width="640" height="440" fill="url(#G)" opacity="0.8"/>
  <circle class="glowA" cx="140" cy="100" r="220" fill="url(#glowA)"/>
  <circle class="glowB" cx="540" cy="360" r="240" fill="url(#glowB)"/>
  <g stroke="{{muted}}" stroke-width="1.2" opacity="0.7">
    <path d="M590 30h20M600 20v20"/>
  </g>
</g>
<rect x="0.5" y="0.5" width="639" height="439" rx="20" fill="none" stroke="{{grid2}}"/>

<text x="38" y="62" class="mono" font-size="19" fill="{{muted}}">~/mdevsec-code <tspan fill="{{accent}}">$</tspan> whoami<tspan class="caret" fill="{{accent}}"> ▍</tspan></text>
<text x="34" y="140" class="serif name" font-size="64" font-weight="700" letter-spacing="-1">""" + NAME + """</text>
<g clip-path="url(#typing)">
  <text x="38" y="196" class="sans" font-size="25" fill="{{text}}">Full-Stack · Dados, BI &amp; Automação</text>
</g>
<g class="mono" font-size="21" fill="{{accent}}">
  <text class="role r1" x="38" y="246">""" + ROLES_MOBILE[0] + """</text>
  <text class="role r2" x="38" y="246">""" + ROLES_MOBILE[1] + """</text>
  <text class="role r3" x="38" y="246">""" + ROLES_MOBILE[2] + """</text>
</g>
<text class="mono late" x="38" y="288" font-size="17" fill="{{muted}}">◉ Camaçari, BA · ENGENOVA (BYD)</text>

<g class="late">
  <path id="flow" d="M60 370 H580" fill="none" stroke="{{grid2}}" stroke-width="2" stroke-dasharray="6 6"/>
  <circle r="14" fill="url(#dotGlow)"><animateMotion dur="5s" repeatCount="indefinite"><mpath href="#flow"/></animateMotion></circle>
  <circle r="5" fill="{{accent}}"><animateMotion dur="5s" repeatCount="indefinite"><mpath href="#flow"/></animateMotion></circle>
  <g class="mono" font-size="15" font-weight="600" text-anchor="middle">
    <rect class="node n1" x="24" y="348" width="128" height="44" rx="10" fill="{{panel}}" stroke="{{grid2}}" stroke-width="2"/>
    <text x="88" y="375" fill="{{text}}">DADOS</text>
    <rect class="node n2" x="176" y="348" width="128" height="44" rx="10" fill="{{panel}}" stroke="{{grid2}}" stroke-width="2"/>
    <text x="240" y="375" fill="{{text}}">API</text>
    <rect class="node n3" x="328" y="348" width="138" height="44" rx="10" fill="{{panel}}" stroke="{{grid2}}" stroke-width="2"/>
    <text x="397" y="375" fill="{{text}}">DASHBOARD</text>
    <rect class="node n4" x="490" y="348" width="128" height="44" rx="10" fill="{{panel}}" stroke="{{grid2}}" stroke-width="2"/>
    <text x="554" y="375" fill="{{text}}">DECISÃO</text>
  </g>
  <text x="320" y="420" text-anchor="middle" class="mono" font-size="12" letter-spacing="3" fill="{{muted}}">FLUXO · DADO → DECISÃO</text>
</g>
</svg>
"""

# ── Botões de contato ───────────────────────────────────────────────────────
# Cada botão é um SVG próprio, no mesmo traço do banner: o GitHub não deixa
# clicar dentro de uma imagem, então cada um vai dentro do seu <a> no README.

ICONS = {
    # "in" num quadrado arredondado
    "linkedin": '<rect x="0" y="0" width="22" height="22" rx="5" fill="{{accent}}"/>'
                '<text x="11" y="16.5" text-anchor="middle" class="sans" font-size="14" font-weight="700" fill="{{bg}}">in</text>',
    # envelope
    "email": '<rect x="1" y="3" width="20" height="16" rx="3" fill="none" stroke="{{accent}}" stroke-width="2"/>'
             '<path d="M2 5l9 7 9-7" fill="none" stroke="{{accent}}" stroke-width="2" stroke-linejoin="round"/>',
    # pasta com </>
    "projetos": '<path d="M1 5a2 2 0 0 1 2-2h5l2 2.5h9a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2Z" fill="none" stroke="{{accent}}" stroke-width="2"/>'
                '<path d="M8.5 10.5l-2.5 2.5 2.5 2.5M13.5 10.5l2.5 2.5-2.5 2.5" fill="none" stroke="{{accent}}" stroke-width="1.8" stroke-linecap="round"/>',
    # alfinete de mapa
    "local": '<path d="M11 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C18 14.8 11 21 11 21Z" fill="none" stroke="{{accent}}" stroke-width="2"/>'
             '<circle cx="11" cy="9.5" r="2.6" fill="{{accent}}"/>',
}

BUTTONS = [
    ("linkedin", "LINKEDIN", "conecte-se comigo", 0.0),
    ("email", "EMAIL", "fale comigo", 0.35),
    ("projetos", "PROJETOS", "veja os sistemas", 0.7),
    ("local", "CAMAÇARI, BA", "Bahia · Brasil", 1.05),
]


def button_svg(key: str, label: str, hint: str, delay: float) -> str:
    return (
        """<svg xmlns="http://www.w3.org/2000/svg" width="240" height="64" viewBox="0 0 240 64" role="img" aria-label=\"""" + label + """">
<title>""" + label + """</title>
<defs>
  <linearGradient id="edge" x1="0" x2="1"><stop offset="0" stop-color="{{accent}}"/><stop offset="1" stop-color="{{accent2}}"/></linearGradient>
  <pattern id="g" width="12" height="12" patternUnits="userSpaceOnUse"><path d="M12 0H0V12" fill="none" stroke="{{grid}}" stroke-width="1"/></pattern>
  <clipPath id="c"><rect x="1" y="1" width="238" height="62" rx="12"/></clipPath>
</defs>
<style>
""" + FONTS + """
  @keyframes in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0px); } }
  .all { opacity: 0; animation: in 0.6s ease-out """ + f"{3.4 + delay:.2f}" + """s forwards; }
  @keyframes trace { from { stroke-dashoffset: 600; } to { stroke-dashoffset: 0; } }
  .trace { stroke-dasharray: 80 520; animation: trace 6s linear """ + f"{delay:.2f}" + """s infinite; }
  @keyframes shine { 0% { transform: translateX(-120px); } 60%, 100% { transform: translateX(360px); } }
  .shine { animation: shine 7s ease-in-out """ + f"{4 + delay:.2f}" + """s infinite; }
  @media (prefers-reduced-motion: reduce) { .all, .trace, .shine { animation: none !important; opacity: 1; } .trace { opacity: 0; } }
</style>
<g class="all">
  <g clip-path="url(#c)">
    <rect width="240" height="64" fill="{{panel}}"/>
    <rect width="240" height="64" fill="url(#g)" opacity="0.6"/>
    <rect class="shine" x="0" y="0" width="60" height="64" fill="{{accent}}" opacity="0.07" transform="skewX(-20)"/>
  </g>
  <rect x="1" y="1" width="238" height="62" rx="12" fill="none" stroke="{{grid2}}" stroke-width="1.5"/>
  <rect class="trace" x="1" y="1" width="238" height="62" rx="12" fill="none" stroke="url(#edge)" stroke-width="2"/>
  <g transform="translate(20 21)">""" + ICONS[key] + """</g>
  <text x="58" y="30" class="mono" font-size="15" font-weight="700" letter-spacing="1" fill="{{text}}">""" + label + """</text>
  <text x="58" y="49" class="mono" font-size="11.5" fill="{{muted}}">""" + hint + """</text>
  <path d="M214 26l6 6-6 6" fill="none" stroke="{{muted}}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</g>
</svg>
"""
    )


# ── SAP no bloco de ferramentas ─────────────────────────────────────────────
# O skillicons.dev não tem SAP: este cartão segue o mesmo formato dos ícones
# dele (fundo, raio e altura de 48 px), com o selo da SAP estilizado.

SAP_TILE = {
    "dark": {"tile": "#242938", "tileText": "#FFFFFF", "tileMuted": "#9BA3B4"},
    "light": {"tile": "#F4F2ED", "tileText": "#1F2328", "tileMuted": "#59636E"},
}

SAP_SVG = """<svg xmlns="http://www.w3.org/2000/svg" width="640" height="256" viewBox="0 0 640 256" role="img" aria-label="SAP Fiori e SAP MM">
<title>SAP Fiori · MM</title>
<defs>
  <linearGradient id="sap" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#00B8F1"/><stop offset="1" stop-color="#1E5FBB"/></linearGradient>
  <linearGradient id="gloss" x1="0" x2="1"><stop offset="0" stop-color="#FFFFFF" stop-opacity="0"/><stop offset="0.5" stop-color="#FFFFFF" stop-opacity="0.55"/><stop offset="1" stop-color="#FFFFFF" stop-opacity="0"/></linearGradient>
  <clipPath id="logo"><path d="M30 64H232L142 192H30Z"/></clipPath>
</defs>
<style>
""" + FONTS + """
  @keyframes gloss { 0% { transform: translateX(-120px); } 45%, 100% { transform: translateX(260px); } }
  .gloss { animation: gloss 4.5s ease-in-out infinite; }
  @media (prefers-reduced-motion: reduce) { .gloss { animation: none; opacity: 0; } }
</style>
<rect width="640" height="256" rx="60" fill="{{tile}}"/>
<path d="M30 64H232L142 192H30Z" fill="url(#sap)"/>
<g clip-path="url(#logo)"><rect class="gloss" x="0" y="60" width="70" height="140" fill="url(#gloss)" transform="skewX(-18)"/></g>
<text x="46" y="146" class="sans" font-size="50" font-weight="800" font-style="italic" fill="#FFFFFF" letter-spacing="-1">SAP</text>
<text x="250" y="152" class="sans" font-size="76" font-weight="700" fill="{{tileText}}">Fiori<tspan fill="{{tileMuted}}" font-weight="400"> · </tspan>MM</text>
</svg>
"""


# ── Terminal ────────────────────────────────────────────────────────────────

TERMINAL_LINES = [
    ("cmd", "whoami"),
    ("out", "Murilo de Souza — full-stack dev, dados &amp; BI"),
    ("cmd", "cat agora.txt"),
    ("out", "BI, processos e automação na ENGENOVA, dentro da fábrica da BYD"),
    ("cmd", "ls projetos/"),
    ("ls", ["falcao-saude-ocupacional/", "falcao-erp-suprimentos/", "controle-de-epi/", "clinica-estetica/"]),
    ("cmd", "echo $LEMA"),
    ("quote", "“Quando a ferramenta ideal não está disponível, eu construo uma.”"),
]

# Mesmo conteúdo, quebrado em linhas curtas para a tela do celular.
TERMINAL_LINES_MOBILE = [
    ("cmd", "whoami"),
    ("out", "Murilo de Souza"),
    ("out", "full-stack dev · dados &amp; BI"),
    ("cmd", "cat agora.txt"),
    ("out", "BI, processos e automação"),
    ("out", "na ENGENOVA, fábrica da BYD"),
    ("cmd", "ls projetos/"),
    ("ls", ["falcao-saude-ocupacional/"]),
    ("ls", ["falcao-erp-suprimentos/"]),
    ("ls", ["controle-de-epi/", "clinica-estetica/"]),
    ("cmd", "echo $LEMA"),
    ("quote", "“Quando a ferramenta ideal"),
    ("quote", "não está disponível,"),
    ("quote", "eu construo uma.”"),
]


def terminal_svg(lines=TERMINAL_LINES, width=1200, font=18, step_y=34, short_prompt=False) -> str:
    prompt = (
        '<tspan fill="{{ok}}">murilo</tspan><tspan fill="{{muted}}">:</tspan><tspan fill="{{accent}}">~</tspan><tspan fill="{{muted}}">$ </tspan>'
        if short_prompt
        else '<tspan fill="{{ok}}">murilo@engenova</tspan><tspan fill="{{muted}}">:</tspan><tspan fill="{{accent}}">~</tspan><tspan fill="{{muted}}">$ </tspan>'
    )
    rows = []
    y = 58 + step_y
    delay = 0.4
    for kind, content in lines:
        if kind == "cmd":
            body = prompt + '<tspan fill="{{text}}">' + content + "</tspan>"
            step = 0.75
        elif kind == "ls":
            body = "   ".join('<tspan fill="{{accent}}" font-weight="600">' + d + "</tspan>" for d in content)
            step = 0.4
        elif kind == "quote":
            body = '<tspan fill="{{warn}}" font-style="italic">' + content + "</tspan>"
            step = 0.4
        else:
            body = '<tspan fill="{{muted}}">' + content + "</tspan>"
            step = 0.4
        rows.append(f'<text class="line" x="32" y="{y}" style="animation-delay:{delay:.2f}s">{body}</text>')
        y += step_y
        delay += step
    caret_y = y
    height = caret_y + 30
    return (
        f"""<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}" role="img" aria-label="Terminal: whoami, o que faço agora, projetos e lema">
<title>Murilo de Souza no terminal</title>
<style>
"""
        + FONTS
        + """
  @keyframes typeIn { from { opacity: 0; transform: translateX(-6px); } to { opacity: 1; transform: translateX(0px); } }
  .line { opacity: 0; animation: typeIn 0.35s ease-out forwards; }
  @keyframes blink { 50% { opacity: 0; } }
  .caret { opacity: 0; animation: typeIn 0.2s ease-out """
        + f"{delay:.2f}"
        + """s forwards, blink 1.05s steps(1) """
        + f"{delay:.2f}"
        + """s infinite; }
  @media (prefers-reduced-motion: reduce) { .line, .caret { animation: none !important; opacity: 1; } }
</style>
"""
        + f"""<rect x="0.5" y="0.5" width="{width - 1}" height="{height - 1}" rx="16" fill="{{{{panel}}}}" stroke="{{{{grid2}}}}"/>
<path d="M0.5 16.5a16 16 0 0 1 16-16h{width - 33}a16 16 0 0 1 16 16V44H0.5Z" fill="{{{{bg}}}}" stroke="{{{{grid2}}}}"/>
<circle cx="28" cy="22" r="7" fill="#FF5F57"/><circle cx="52" cy="22" r="7" fill="#FEBC2E"/><circle cx="76" cy="22" r="7" fill="#28C840"/>
<text x="{width // 2}" y="27" text-anchor="middle" class="mono" font-size="13" fill="{{{{muted}}}}">murilo@engenova: ~ — zsh</text>
<g class="mono" font-size="{font}" xml:space="preserve">
"""
        + "\n".join(rows)
        + f"""
<text class="caret" x="32" y="{caret_y}">"""
        + prompt
        + """<tspan fill="{{accent}}">▍</tspan></text>
</g>
</svg>
"""
    )


# ── Formação e idiomas ──────────────────────────────────────────────────────
# Dois painéis no traço do banner: a graduação com os 8 semestres acendendo um
# a um, e os idiomas com barras de nível. No celular os painéis ficam um
# embaixo do outro.

SEMESTRES = 8
IDIOMAS = [
    ("Português", "Nativo", 1.0),
    ("Inglês", "Avançado · CNA Master e Platinum", 0.86),
]


def _painel(x: int, y: int, w: int, h: int, rotulo: str, numero: str) -> str:
    return (
        f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="16" fill="{{{{panel}}}}" stroke="{{{{grid2}}}}"/>'
        f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="16" fill="url(#g)" opacity="0.5"/>'
        f'<text x="{x + 28}" y="{y + 38}" class="mono" font-size="13" letter-spacing="3" fill="{{{{muted}}}}">{rotulo}</text>'
        f'<text x="{x + w - 28}" y="{y + 38}" text-anchor="end" class="mono" font-size="12" fill="{{{{muted}}}}" opacity="0.7">{numero}</text>'
        f'<path d="M{x + 28} {y + 52}H{x + w - 28}" stroke="{{{{grid2}}}}" stroke-dasharray="4 5"/>'
    )


def _formacao(x: int, y: int, w: int, titulo_fs: int = 30) -> str:
    gap = 8
    seg = (w - 56 - gap * (SEMESTRES - 1)) / SEMESTRES
    blocos = []
    for i in range(SEMESTRES):
        sx = x + 28 + i * (seg + gap)
        ultimo = i == SEMESTRES - 1
        cls = "seg now" if ultimo else "seg"
        blocos.append(
            f'<rect class="{cls}" style="animation-delay:{0.6 + i * 0.18:.2f}s" x="{sx:.1f}" y="{y + 182}" width="{seg:.1f}" height="14" rx="4" fill="url(#bar)"/>'
            f'<text x="{sx + seg / 2:.1f}" y="{y + 220}" text-anchor="middle" class="mono" font-size="12" fill="{{{{muted}}}}">S{i + 1}</text>'
        )
    return (
        _painel(x, y, w, 250, "FORMAÇÃO", "01")
        + f'<g transform="translate({x + 28} {y + 80})"><path d="M0 12L22 2l22 10-22 10Z" fill="none" stroke="{{{{accent}}}}" stroke-width="2.2" stroke-linejoin="round"/>'
        f'<path d="M9 16v9c4 4 22 4 26 0v-9" fill="none" stroke="{{{{accent}}}}" stroke-width="2.2"/><path d="M44 12v12" stroke="{{{{accent2}}}}" stroke-width="2.2"/></g>'
        + f'<text x="{x + 88}" y="{y + 100}" class="serif" font-size="{titulo_fs}" font-weight="700" fill="{{{{text}}}}">Sistemas de Informação</text>'
        + f'<text x="{x + 88}" y="{y + 128}" class="sans" font-size="17" fill="{{{{muted}}}}">Bacharelado · UNIME</text>'
        + f'<text x="{x + 28}" y="{y + 168}" class="mono" font-size="14" fill="{{{{accent}}}}">8º semestre <tspan fill="{{{{muted}}}}">· conclusão prevista para breve</tspan></text>'
        + "".join(blocos)
    )


def _idiomas(x: int, y: int, w: int) -> str:
    linhas = []
    for i, (nome, nivel, frac) in enumerate(IDIOMAS):
        ly = y + 92 + i * 78
        largura = (w - 56) * frac
        linhas.append(
            f'<text x="{x + 28}" y="{ly}" class="sans" font-size="21" font-weight="600" fill="{{{{text}}}}">{nome}</text>'
            f'<text x="{x + w - 28}" y="{ly}" text-anchor="end" class="mono" font-size="13" fill="{{{{muted}}}}">{nivel}</text>'
            f'<rect x="{x + 28}" y="{ly + 16}" width="{w - 56}" height="10" rx="5" fill="{{{{grid}}}}"/>'
            f'<rect class="fillbar" style="animation-delay:{0.8 + i * 0.4:.1f}s" x="{x + 28}" y="{ly + 16}" width="{largura:.1f}" height="10" rx="5" fill="url(#bar)"/>'
        )
    return _painel(x, y, w, 250, "IDIOMAS", "02") + "".join(linhas)


def formacao_svg(mobile: bool = False) -> str:
    if mobile:
        width, height = 460, 556
        corpo = _formacao(20, 20, 420, titulo_fs=25) + _idiomas(20, 286, 420)
    else:
        width, height = 1200, 290
        corpo = _formacao(20, 20, 620) + _idiomas(656, 20, 524)
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}" role="img" '
        'aria-label="Formação: Bacharelado em Sistemas de Informação, UNIME, 8º semestre. Idiomas: português nativo, inglês avançado.">'
        "<title>Formação e idiomas</title>"
        '<defs><pattern id="g" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="{{grid}}" stroke-width="1"/></pattern>'
        '<linearGradient id="bar" x1="0" x2="1"><stop offset="0" stop-color="{{accent}}"/><stop offset="1" stop-color="{{accent2}}"/></linearGradient></defs>'
        "<style>" + FONTS + """
  @keyframes on { from { opacity: 0.12; } to { opacity: 1; } }
  .seg { opacity: 0.12; animation: on 0.35s ease-out forwards; }
  @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }
  .now { animation: on 0.35s ease-out forwards, pulse 1.8s ease-in-out 2.4s infinite; }
  @keyframes grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
  .fillbar { transform-box: fill-box; transform-origin: left center; transform: scaleX(0); animation: grow 1.4s cubic-bezier(.2,.8,.2,1) forwards; }
  @media (prefers-reduced-motion: reduce) { .seg, .now, .fillbar { animation: none !important; opacity: 1; transform: none; } }
</style>"""
        + corpo
        + "</svg>\n"
    )


# ── Divisória e rodapé ─────────────────────────────────────────────────────

DIVIDER = """<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="24" viewBox="0 0 1200 24" role="img" aria-label="">
<defs>
  <linearGradient id="beam" x1="0" x2="1"><stop offset="0" stop-color="{{accent}}" stop-opacity="0"/><stop offset="0.5" stop-color="{{accent}}"/><stop offset="1" stop-color="{{accent2}}" stop-opacity="0"/></linearGradient>
</defs>
<style>
  @keyframes sweep { from { transform: translateX(-260px); } to { transform: translateX(1200px); } }
  .beam { animation: sweep 4.5s ease-in-out infinite; }
  @media (prefers-reduced-motion: reduce) { .beam { animation: none; opacity: 0; } }
</style>
<line x1="0" y1="12" x2="1200" y2="12" stroke="{{grid2}}" stroke-width="1"/>
<rect class="beam" x="0" y="11" width="260" height="2" fill="url(#beam)"/>
<rect x="594" y="6" width="12" height="12" transform="rotate(45 600 12)" fill="{{bg}}" stroke="{{accent}}" stroke-width="1.5"/>
</svg>
"""

FOOTER = """<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="150" viewBox="0 0 1200 150" role="img" aria-label="Obrigado pela visita">
<title>Obrigado pela visita</title>
<defs>
  <linearGradient id="w1" x1="0" x2="1"><stop offset="0" stop-color="{{accent}}"/><stop offset="1" stop-color="{{accent2}}"/></linearGradient>
</defs>
<style>
""" + FONTS + """
  @keyframes wave { from { transform: translateX(0px); } to { transform: translateX(-600px); } }
  .w1 { animation: wave 9s linear infinite; }
  .w2 { animation: wave 14s linear infinite reverse; }
  @media (prefers-reduced-motion: reduce) { .w1, .w2 { animation: none; } }
</style>
<g opacity="0.22" class="w2">
  <path d="M0 92 C150 62 300 122 450 92 S750 62 900 92 S1200 122 1350 92 S1650 62 1800 92 V150 H0Z" fill="url(#w1)"/>
</g>
<g opacity="0.38" class="w1">
  <path d="M0 108 C150 88 300 128 450 108 S750 88 900 108 S1200 128 1350 108 S1650 88 1800 108 V150 H0Z" fill="url(#w1)"/>
</g>
<text x="600" y="54" text-anchor="middle" class="serif" font-size="22" font-style="italic" fill="{{text}}">Obrigado pela visita — vamos construir algo juntos?</text>
</svg>
"""


def main() -> None:
    ROOT.mkdir(parents=True, exist_ok=True)
    for name, theme in THEMES.items():
        (ROOT / f"header-{name}.svg").write_text(fill(HEADER, theme), encoding="utf-8")
        (ROOT / f"header-mobile-{name}.svg").write_text(fill(HEADER_MOBILE, theme), encoding="utf-8")
        (ROOT / f"terminal-{name}.svg").write_text(fill(terminal_svg(), theme), encoding="utf-8")
        mobile = terminal_svg(TERMINAL_LINES_MOBILE, width=640, font=22, step_y=36, short_prompt=True)
        (ROOT / f"terminal-mobile-{name}.svg").write_text(fill(mobile, theme), encoding="utf-8")
        (ROOT / f"formacao-{name}.svg").write_text(fill(formacao_svg(), theme), encoding="utf-8")
        (ROOT / f"formacao-mobile-{name}.svg").write_text(fill(formacao_svg(mobile=True), theme), encoding="utf-8")
        (ROOT / f"divider-{name}.svg").write_text(fill(DIVIDER, theme), encoding="utf-8")
        (ROOT / f"footer-{name}.svg").write_text(fill(FOOTER, theme), encoding="utf-8")
        for key, label, hint, delay in BUTTONS:
            (ROOT / f"btn-{key}-{name}.svg").write_text(fill(button_svg(key, label, hint, delay), theme), encoding="utf-8")
        (ROOT / f"sap-{name}.svg").write_text(fill(SAP_SVG, {**theme, **SAP_TILE[name]}), encoding="utf-8")
    print("SVGs gerados em", ROOT)


if __name__ == "__main__":
    main()
