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
  { nome: "HTML & CSS",       nivel: 90, icone: "fab fa-html5" },
  { nome: "JavaScript",       nivel: 85, icone: "fab fa-js" },
  { nome: "Python",           nivel: 80, icone: "fab fa-python" },
  { nome: "React",            nivel: 75, icone: "fab fa-react" },
  { nome: "Node.js",          nivel: 70, icone: "fab fa-node-js" },
  { nome: "Git & GitHub",     nivel: 85, icone: "fab fa-git-alt" },
  { nome: "Banco de Dados",   nivel: 75, icone: "fas fa-database" },
  { nome: "TypeScript",       nivel: 65, icone: "fas fa-code" },
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
