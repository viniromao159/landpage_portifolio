/* ================================================================
   PROJECTS.JS - Projetos do portfólio
   ================================================================
   EDITAR AQUI: o array PROJECTS_DATA com seus projetos
   ================================================================
   Formato:
     titulo: nome do projeto
     descricao: descrição curta
     tags: array de tecnologias usadas
     imagem: caminho da imagem (ou "" para ícone padrão)
     github: link do repositório (ou "" para não exibir)
     demo: link da demonstração (ou "" para não exibir)
   ================================================================ */

const PROJECTS_DATA = [
  {
    titulo: "Sistema de Gestão de Tarefas",
    descricao: "Aplicação web para gerenciamento de tarefas com dashboard em tempo real, autenticação de usuários e kanban interativo.",
    tags: ["React", "Node.js", "MongoDB"],
    imagem: "",
    github: "https://github.com/seuuser/sistema-gestao",
    demo: "https://sistema-gestao.vercel.app"
  },
  {
    titulo: "API de E-commerce",
    descricao: "API RESTful completa para plataforma de e-commerce com carrinho de compras, autenticação JWT e integração de pagamentos.",
    tags: ["Python", "Django", "PostgreSQL"],
    imagem: "",
    github: "https://github.com/seuuser/ecommerce-api",
    demo: ""
  },
  {
    titulo: "Dashboard de Análise",
    descricao: "Dashboard interativo para visualização de dados com gráficos dinâmicos, filtros e exportação de relatórios.",
    tags: ["React", "TypeScript", "Chart.js"],
    imagem: "",
    github: "https://github.com/seuuser/dashboard-analise",
    demo: "https://dashboard-analise.vercel.app"
  },
];

// =============================================
// RENDER - não precisa editar daqui pra baixo
// =============================================
(function renderProjects() {
  const container = document.getElementById('projectsContainer');
  if (!container) return;

  if (!PROJECTS_DATA || PROJECTS_DATA.length === 0) {
    container.innerHTML =
      '<p class="section-subtitle" style="grid-column: 1/-1;">Nenhum projeto cadastrado ainda.</p>';
    return;
  }

  container.innerHTML = PROJECTS_DATA
    .map(
      (p, i) => `
      <div class="project-card glass tilt-card reveal" style="transition-delay: ${i * 0.1}s">
        <div class="project-image">
          ${p.imagem
            ? `<img src="${p.imagem}" alt="${p.titulo}" />`
            : '<i class="fas fa-laptop-code"></i>'
          }
        </div>
        <div class="project-info">
          <h3>${p.titulo}</h3>
          <p>${p.descricao}</p>
          <div class="project-tags">
            ${p.tags.map((tag) => `<span>${tag}</span>`).join('')}
          </div>
          <div class="project-links">
            ${p.github
              ? `<a href="${p.github}" target="_blank" class="project-link-code" rel="noopener">
                   <i class="fab fa-github"></i> Código
                 </a>`
              : ''
            }
            ${p.demo
              ? `<a href="${p.demo}" target="_blank" class="project-link-demo" rel="noopener">
                   <i class="fas fa-external-link-alt"></i> Demo
                 </a>`
              : ''
            }
          </div>
        </div>
      </div>
    `
    )
    .join('');

  if (window.initTilt) window.initTilt();
})();
