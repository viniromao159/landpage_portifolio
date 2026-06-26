/* ================================================================
   SKILLS.JS - Habilidades técnicas
   ================================================================
   EDITAR AQUI: array skillsData com suas habilidades
   ================================================================
   Formato:
     nome: nome da tecnologia
     nivel: número de 0 a 100 (nível de proficiência)
     icone: classe do Font Awesome (https://fontawesome.com/search)
   ================================================================ */

// =============================================
// EDITAR AQUI: suas habilidades
// =============================================
const skillsData = [
  { nome: "Python",           nivel: 100, icone: "fab fa-python" },
  { nome: "SQL",              nivel: 100, icone: "fa fa-database" },
  { nome: "Planilhas",        nivel: 100, icone: "fa fa fa-file-excel" },
  { nome: "BI",               nivel: 100, icone: "fa fa-line-chart" },
  { nome: "Big Data",         nivel: 100, icone: "fa fa-table" },
  { nome: "Machine Learning", nivel: 100, icone: "fa fa-microchip" },
  { nome: "Git & GitHub",     nivel: 100, icone: "fab fa-git-alt" },
  { nome: "Linux & Windows",  nivel: 100, icone: "fa fa-window-restore" },
];
// ADICIONE OU REMOVA ITENS À VONTADE ↑

// =============================================
// RENDER - não precisa editar daqui pra baixo
// =============================================
(function renderSkills() {
  const container = document.getElementById('skillsContainer');
  if (!container) return;

  container.innerHTML = skillsData
    .map(
      (skill, i) => `
      <div class="skill-card glass tilt-card reveal" style="transition-delay: ${i * 0.08}s">
        <div class="skill-icon"><i class="${skill.icone}"></i></div>
        <div class="skill-info">
          <h4>${skill.nome}</h4>
          <div class="skill-bar">
            <div class="skill-fill" style="width: ${skill.nivel}%"></div>
          </div>
        </div>
      </div>
    `
    )
    .join('');

  // Ativa tilt nos novos cards
  if (window.initTilt) window.initTilt();
})();
