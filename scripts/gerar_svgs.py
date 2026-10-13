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

# ── Terminal ────────────────────────────────────────────────────────────────

TERMINAL_LINES = [
    ("cmd", "whoami"),
    ("out", "Murilo de Souza — full-stack dev, dados &amp; BI"),
    ("cmd", "cat agora.txt"),
    ("out", "BI, processos e automação na ENGENOVA, dentro da fábrica da BYD"),
    ("cmd", "ls projetos/"),
    ("ls", ""),
    ("cmd", "echo $LEMA"),
    ("quote", "“Quando a ferramenta ideal não está disponível, eu construo uma.”"),
]


def terminal_svg() -> str:
    rows = []
    y = 92
    delay = 0.4
    for kind, content in TERMINAL_LINES:
        if kind == "cmd":
            body = '<tspan fill="{{ok}}">murilo@engenova</tspan><tspan fill="{{muted}}">:</tspan><tspan fill="{{accent}}">~</tspan><tspan fill="{{muted}}">$ </tspan><tspan fill="{{text}}">' + content + "</tspan>"
            step = 0.75
        elif kind == "ls":
            body = (
                '<tspan fill="{{accent}}" font-weight="600">falcao-saude-ocupacional/</tspan>   '
                '<tspan fill="{{accent}}" font-weight="600">falcao-erp-suprimentos/</tspan>   '
                '<tspan fill="{{accent}}" font-weight="600">controle-de-epi/</tspan>'
            )
            step = 0.55
        elif kind == "quote":
            body = '<tspan fill="{{warn}}" font-style="italic">' + content + "</tspan>"
            step = 0.55
        else:
            body = '<tspan fill="{{muted}}">' + content + "</tspan>"
            step = 0.55
        rows.append(f'<text class="line" x="40" y="{y}" style="animation-delay:{delay:.2f}s">{body}</text>')
        y += 34
        delay += step
    caret_y = y
    return (
        """<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="380" viewBox="0 0 1200 380" role="img" aria-label="Terminal: whoami, o que faço agora, projetos e lema">
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
<rect x="0.5" y="0.5" width="1199" height="379" rx="16" fill="{{panel}}" stroke="{{grid2}}"/>
<path d="M0.5 16.5a16 16 0 0 1 16-16h1167a16 16 0 0 1 16 16V44H0.5Z" fill="{{bg}}" stroke="{{grid2}}"/>
<circle cx="28" cy="22" r="7" fill="#FF5F57"/><circle cx="52" cy="22" r="7" fill="#FEBC2E"/><circle cx="76" cy="22" r="7" fill="#28C840"/>
<text x="600" y="27" text-anchor="middle" class="mono" font-size="13" fill="{{muted}}">murilo@engenova: ~ — zsh</text>
<g class="mono" font-size="18" xml:space="preserve">
"""
        + "\n".join(rows)
        + f"""
<text class="caret" x="40" y="{caret_y}"><tspan fill="{{{{ok}}}}">murilo@engenova</tspan><tspan fill="{{{{muted}}}}">:</tspan><tspan fill="{{{{accent}}}}">~</tspan><tspan fill="{{{{muted}}}}">$ </tspan><tspan fill="{{{{accent}}}}">▍</tspan></text>
</g>
</svg>
"""
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
        (ROOT / f"terminal-{name}.svg").write_text(fill(terminal_svg(), theme), encoding="utf-8")
        (ROOT / f"divider-{name}.svg").write_text(fill(DIVIDER, theme), encoding="utf-8")
        (ROOT / f"footer-{name}.svg").write_text(fill(FOOTER, theme), encoding="utf-8")
    print("SVGs gerados em", ROOT)


if __name__ == "__main__":
    main()
