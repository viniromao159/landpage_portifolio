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
    titulo: "Análise de Vendas Olist",
    descricao: "Análise exploratória de dados do e-commerce brasileiro utilizando o dataset público da Olist.",
    tags: ["Python", "Pandas"],
    imagem: "../img/olist.jpg",
    github: "https://github.com/viniromao159/olist",
  },
  {
    titulo: "Análise de compartilhamento de bicicletas - Cyclistic",
    descricao: "Estudo de caso para entender como diferente tipos de usuários utilizam o programa de alugel de bicicleta.",
    tags: ["Python", "SQL", "PostgreSQL"],
    imagem: "../img/Cyclistic.jpg",
    github: "https://github.com/viniromao159/cyclistic-analyse",
  },
  {
    titulo: "Wine Quality Prediction",
    descricao: "Criação de modelos preditores para prever a qualidade de vinhos.",
    tags: ["Python", "Machine Learning"],
    imagem: "../img/vinhos.jpg",
    github: "https://github.com/MayconNune/PosGraduacao_DataAnalytics---Machine-Learning---Grupo-31",
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
