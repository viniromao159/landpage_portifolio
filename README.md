# Portfólio Pessoal

Landing page de portfólio web pessoal, single page com seções separadas por tema.

## Funcionalidades

- Tema claro/escuro com alternância via botão (salvo no `localStorage`)
- Grid magnético interativo no hero (pontos que reagem ao mouse e ripple ao clicar)
- Glow do mouse (spotlight) nas demais seções
- Efeito 3D tilt nos cards
- Botões magnéticos
- Scroll reveal com animações suaves
- Barra de progresso da leitura
- Efeito de digitação (typing effect) no hero
- Design responsivo (mobile-first)
- Glassmorphism nos cards
- Projetos gerenciáveis via array JavaScript

## Tecnologias

- HTML5
- CSS3 (variáveis, flexbox, grid, animações, glassmorphism)
- JavaScript (canvas, IntersectionObserver, localStorage)
- Font Awesome (ícones)
- Google Fonts (Inter)

## Estrutura

```
├── index.html          # Página principal
├── css/style.css       # Estilos (tema claro + escuro)
├── js/
│   ├── grid-effect.js  # Grid magnético no hero
│   ├── effects.js      # Spotlight, 3D tilt, botões magnéticos, parallax
│   ├── skills.js       # Habilidades (array editável)
│   ├── projects.js     # Projetos (array editável)
│   └── script.js       # Typing, scroll reveal, progress bar, navbar
└── README.md
```

## Como personalizar

| O que editar | Arquivo |
|---|---|
| Nome, bio, formação, experiência, contato | `index.html` (busque por `<!-- TROQUE:`) |
| Habilidades técnicas | `js/skills.js` (array `skillsData`) |
| Projetos | `js/projects.js` (array `PROJECTS_DATA`) |
| Frases do typing | `js/script.js` (array `TYPING_PHRASES`) |
| Paleta de cores | `css/style.css` (variáveis em `:root`) |

> Basta abrir o `index.html` no navegador — não requer servidor.

## Licença

O código deste template é livre para uso, modificação e distribuição. Apenas as informações pessoais contidas (nome, bio, links, projetos fictícios, etc.) são de caráter exclusivos e devem ser substituídas pelas suas.

---

_Criado com [opencode](https://opencode.ai) utilizando DeepSeek V4._
