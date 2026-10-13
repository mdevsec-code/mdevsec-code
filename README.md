<!--
  Os SVGs animados (banner, botões, terminal, SAP, formação, divisórias e rodapé) ficam em
  assets/ e são gerados por scripts/gerar_svgs.py — edite os textos lá e rode o
  script. Banner e terminal têm versão de celular (*-mobile-*), escolhida pelo
  media="(max-width: 600px)". A cobrinha das contribuições é gerada todo dia por
  .github/workflows/snake.yml e publicada no branch `output`.
-->

<picture>
  <source media="(max-width: 600px) and (prefers-color-scheme: dark)" srcset="assets/header-mobile-dark.svg">
  <source media="(max-width: 600px) and (prefers-color-scheme: light)" srcset="assets/header-mobile-light.svg">
  <source media="(max-width: 600px)" srcset="assets/header-mobile-dark.svg">
  <source media="(prefers-color-scheme: dark)" srcset="assets/header-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="assets/header-light.svg">
  <img alt="Murilo de Souza — Full-Stack Developer · Dados, BI & Automação" src="assets/header-dark.svg" width="100%">
</picture>

<p align="center">
  <a href="https://linkedin.com/in/dev-murilo-de-souza"><picture><source media="(prefers-color-scheme: light)" srcset="assets/btn-linkedin-light.svg"><img alt="LinkedIn" src="assets/btn-linkedin-dark.svg" height="52"></picture></a>
  <a href="mailto:murilocerqueira361@gmail.com"><picture><source media="(prefers-color-scheme: light)" srcset="assets/btn-email-light.svg"><img alt="Email" src="assets/btn-email-dark.svg" height="52"></picture></a>
  <a href="#-projetos-em-destaque"><picture><source media="(prefers-color-scheme: light)" srcset="assets/btn-projetos-light.svg"><img alt="Projetos" src="assets/btn-projetos-dark.svg" height="52"></picture></a>
  <a href="https://www.google.com/maps/place/Cama%C3%A7ari,+BA"><picture><source media="(prefers-color-scheme: light)" srcset="assets/btn-local-light.svg"><img alt="Camaçari, BA" src="assets/btn-local-dark.svg" height="52"></picture></a>
</p>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/divider-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="assets/divider-light.svg">
  <img alt="" src="assets/divider-dark.svg" width="100%">
</picture>

## 👋 Sobre mim

<picture>
  <source media="(max-width: 600px) and (prefers-color-scheme: dark)" srcset="assets/terminal-mobile-dark.svg">
  <source media="(max-width: 600px) and (prefers-color-scheme: light)" srcset="assets/terminal-mobile-light.svg">
  <source media="(max-width: 600px)" srcset="assets/terminal-mobile-dark.svg">
  <source media="(prefers-color-scheme: dark)" srcset="assets/terminal-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="assets/terminal-light.svg">
  <img alt="Terminal: whoami — Murilo de Souza, full-stack dev, dados e BI; trabalha com BI, processos e automação na ENGENOVA, dentro da fábrica da BYD; projetos: falcao-saude-ocupacional, falcao-erp-suprimentos, controle-de-epi, clinica-estetica" src="assets/terminal-dark.svg" width="100%">
</picture>

Desenvolvedor full-stack e profissional de dados, atuando na interseção entre **desenvolvimento de software**, **BI/automação de processos** e **ambiente industrial**. Atualmente na **ENGENOVA Construções** (unidade nas instalações da fábrica da BYD, Camaçari/BA).

## 🔧 O que eu faço

- 🖥️ **Aplicações web** — sistemas full-stack de ponta a ponta com React, Vue, TypeScript, Node.js e NestJS: do banco à tela, com RBAC e auditoria.
- 📊 **Dashboards de BI** — ferramentas de BI personalizadas em HTML/JavaScript para cenários sem Power BI ou nuvem disponível.
- 🤖 **Automação** — relatórios e processos automatizados com Python, tirando o trabalho repetitivo do caminho.
- 🔗 **Integração com SAP** — integração e gestão de dados via SAP (Fiori, MM), ligando o ERP ao dia a dia da operação.
- 🏭 **Dados industriais** — consolidação, validação e análise de dados operacionais em ambiente de fábrica.
- 🦅 **Família Falcão** — Saúde Ocupacional e ERP de Suprimentos com a mesma stack e o mesmo design system, a caminho de um hub único.

## 🛠️ Stack

<p align="center">
  <b>Front-end</b><br><br>
  <img src="https://skillicons.dev/icons?i=react,vue,ts,js,tailwind,vite,html,css&perline=8" alt="React, Vue, TypeScript, JavaScript, Tailwind CSS, Vite, HTML, CSS">
</p>
<p align="center">
  <b>Back-end e dados</b><br><br>
  <img src="https://skillicons.dev/icons?i=nodejs,nestjs,express,prisma,postgres,python&perline=8" alt="Node.js, NestJS, Express, Prisma, PostgreSQL, Python">
</p>
<p align="center">
  <b>Ferramentas e ERP</b><br><br>
  <img src="https://skillicons.dev/icons?i=git,github,githubactions,docker,vercel,vscode&perline=8" alt="Git, GitHub, GitHub Actions, Docker, Vercel, VS Code">
  <picture><source media="(prefers-color-scheme: light)" srcset="assets/sap-light.svg"><img alt="SAP Fiori e MM" src="assets/sap-dark.svg" height="48"></picture>
</p>

## 🚀 Projetos em destaque

### [🏥 Falcão Saúde Ocupacional](https://github.com/mdevsec-code/falcao-saude-ocupacional)

<a href="https://github.com/mdevsec-code/falcao-saude-ocupacional"><img src="https://raw.githubusercontent.com/mdevsec-code/falcao-saude-ocupacional/master/docs/screenshots/dashboard.png" alt="Dashboard do Falcão Saúde Ocupacional" width="100%"></a>

Plataforma de saúde e segurança ocupacional da Falcão Construções e Engenharia, para Recepção, Médicos, Enfermeiros, Técnicos de Segurança, RH e Administradores: agenda, **prontuário eletrônico**, atendimentos, CID, exames, **ASO por atividade de risco**, atestados, férias e **segurança do trabalho** (NBR 14280). 17 módulos, RBAC, **auditoria LGPD** e 3 idiomas.

<img src="https://img.shields.io/badge/React_18-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React"> <img src="https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript"> <img src="https://img.shields.io/badge/NestJS-E0234E?style=flat-square&logo=nestjs&logoColor=white" alt="NestJS"> <img src="https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white" alt="Prisma"> <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white" alt="PostgreSQL"> <img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white" alt="Docker"> · [🔗 Demonstração no ar](https://falcao-saude-ocupacional-eta.vercel.app)

### [📦 Falcão ERP Suprimentos](https://github.com/mdevsec-code/falcao-ERP-suprimentos-master)

<a href="https://github.com/mdevsec-code/falcao-ERP-suprimentos-master"><img src="https://raw.githubusercontent.com/mdevsec-code/falcao-ERP-suprimentos-master/main/docs/screenshots/dashboard.png" alt="Dashboard do Falcão ERP Suprimentos" width="100%"></a>

ERP do setor de Suprimentos da Falcão: fornecedores, produtos com histórico de preços, **compras com aprovação em etapas**, **contratos com aditivos**, **contas a pagar** com fluxo de caixa e conciliação de nota fiscal, reembolsos, documentos e agenda unificada. RBAC, auditoria, revisão de segurança e 3 idiomas.

<img src="https://img.shields.io/badge/React_18-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React"> <img src="https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript"> <img src="https://img.shields.io/badge/NestJS-E0234E?style=flat-square&logo=nestjs&logoColor=white" alt="NestJS"> <img src="https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white" alt="Prisma"> <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white" alt="PostgreSQL"> <img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white" alt="Docker">

### [💆‍♀️ Clínica Noely Cerqueira — Estética e Micropigmentação](https://github.com/mdevsec-code/clinica-de-saude-estetica)

<a href="https://github.com/mdevsec-code/clinica-de-saude-estetica"><img src="https://raw.githubusercontent.com/mdevsec-code/clinica-de-saude-estetica/main/docs/screenshots/site-inicio.png" alt="Site da Clínica Noely Cerqueira" width="100%"></a>

Site público com **agendamento online self-service** e painel de gestão da clínica: catálogo, agenda, **acompanhamento de pacientes** (fichas clínicas, retornos automáticos, galeria antes/depois e lembretes via WhatsApp Cloud API), **financeiro** com DRE e conciliação bancária OFX, estoque e auditoria de acesso a dado sensível (LGPD). Base para um futuro SaaS multi-tenant.

<img src="https://img.shields.io/badge/Vue_3-4FC08D?style=flat-square&logo=vuedotjs&logoColor=white" alt="Vue"> <img src="https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript"> <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite"> <img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white" alt="Express"> <img src="https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white" alt="Prisma"> <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white" alt="PostgreSQL"> <img src="https://img.shields.io/badge/GSAP-88CE02?style=flat-square&logo=greensock&logoColor=white" alt="GSAP">

### [🦺 Controle de Entrega de EPIs — ENGENOVA](https://github.com/mdevsec-code/Controle-de-EPI)

<a href="https://github.com/mdevsec-code/Controle-de-EPI"><img src="https://raw.githubusercontent.com/mdevsec-code/Controle-de-EPI/main/docs/imagens/desktop-inicio.png" alt="Tela inicial do Controle de Entrega de EPIs" width="100%"></a>

Entrega de EPIs com **assinatura do colaborador na tela** (QR Code do crachá, hash SHA-256 e comprovante), estoque por almoxarifado e local de armazenamento, validação de CA e auditoria completa — a rastreabilidade da NR-6, do celular do almoxarife ao computador da gestão.

<img src="https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React"> <img src="https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript"> <img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white" alt="Express"> <img src="https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white" alt="Prisma"> <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white" alt="PostgreSQL">

## 📊 Atividade

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/mdevsec-code/mdevsec-code/output/github-snake-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/mdevsec-code/mdevsec-code/output/github-snake.svg">
  <img alt="Cobrinha percorrendo o gráfico de contribuições" src="https://raw.githubusercontent.com/mdevsec-code/mdevsec-code/output/github-snake-dark.svg" width="100%">
</picture>

<!-- streak-stats.demolab.com com as cores do banner (o tema pronto deixava
     "Maior sequência" e as datas com pouco contraste). -->
<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://streak-stats.demolab.com?user=mdevsec-code&locale=pt_BR&hide_border=true&background=00000000&ring=2F81F7&fire=A371F7&currStreakNum=E6EDF3&sideNums=2F81F7&currStreakLabel=2F81F7&sideLabels=E6EDF3&dates=8B949E&stroke=30363D">
    <source media="(prefers-color-scheme: light)" srcset="https://streak-stats.demolab.com?user=mdevsec-code&locale=pt_BR&hide_border=true&background=00000000&ring=0969DA&fire=8250DF&currStreakNum=1F2328&sideNums=0969DA&currStreakLabel=0969DA&sideLabels=1F2328&dates=59636E&stroke=D0D7DE">
    <img alt="Sequência de contribuições no GitHub" src="https://streak-stats.demolab.com?user=mdevsec-code&locale=pt_BR&hide_border=true&background=00000000&ring=2F81F7&fire=A371F7&currStreakNum=E6EDF3&sideNums=2F81F7&currStreakLabel=2F81F7&sideLabels=E6EDF3&dates=8B949E&stroke=30363D">
  </picture>
</p>

## 🎓 Formação e idiomas

<picture>
  <source media="(max-width: 600px) and (prefers-color-scheme: dark)" srcset="assets/formacao-mobile-dark.svg">
  <source media="(max-width: 600px) and (prefers-color-scheme: light)" srcset="assets/formacao-mobile-light.svg">
  <source media="(max-width: 600px)" srcset="assets/formacao-mobile-dark.svg">
  <source media="(prefers-color-scheme: dark)" srcset="assets/formacao-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="assets/formacao-light.svg">
  <img alt="Formação: Bacharelado em Sistemas de Informação na UNIME, 8º semestre, conclusão prevista para breve. Idiomas: português nativo; inglês avançado (CNA Master e Platinum)." src="assets/formacao-dark.svg" width="100%">
</picture>

<picture>
  <source media="(max-width: 600px) and (prefers-color-scheme: dark)" srcset="assets/footer-mobile-dark.svg">
  <source media="(max-width: 600px) and (prefers-color-scheme: light)" srcset="assets/footer-mobile-light.svg">
  <source media="(max-width: 600px)" srcset="assets/footer-mobile-dark.svg">
  <source media="(prefers-color-scheme: dark)" srcset="assets/footer-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="assets/footer-light.svg">
  <img alt="Obrigado pela visita — vamos construir algo juntos?" src="assets/footer-dark.svg" width="100%">
</picture>
