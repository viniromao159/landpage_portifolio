/* ================================================================
   GRID-EFFECT.JS - Rede de Ondas WebGL 3D usando Three.js
   ================================================================ */

(function initThreeWaveGrid() {
  const hero = document.getElementById('hero');
  if (!hero || typeof THREE === 'undefined') return;

  // 1. Criar o Canvas
  const canvas = document.createElement('canvas');
  canvas.id = 'gridCanvas';
  hero.insertBefore(canvas, hero.firstChild);

  // 2. Parâmetros da Grade de Partículas
  const SEPARATOR = 40;
  const AMOUNTX = 65;
  const AMOUNTY = 45;

  let scene, camera, renderer, particles, count = 0;
  let currentTheme = '';
  let ripples = [];
  
  // Controle do mouse em 3D
  const raycaster = new THREE.Raycaster();
  const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const mouse3D = new THREE.Vector3(-9999, -9999, -9999);
  const mouse2D = new THREE.Vector2(-9999, -9999);

  // Função para ler a cor do tema CSS
  function getColor() {
    const s = getComputedStyle(document.documentElement);
    return (s.getPropertyValue('--grid-dot-color') || '#4a5578').trim();
  }

  // Gera uma textura circular em tempo de execução para partículas suaves
  function createCircleTexture() {
    const canvasMat = document.createElement('canvas');
    canvasMat.width = 32;
    canvasMat.height = 32;
    const ctxMat = canvasMat.getContext('2d');
    const grad = ctxMat.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctxMat.fillStyle = grad;
    ctxMat.fillRect(0, 0, 32, 32);
    return new THREE.CanvasTexture(canvasMat);
  }

  function init() {
    // Câmera com perspectiva inclinada
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(0, 280, 500);
    camera.lookAt(new THREE.Vector3(0, -50, 0));

    scene = new THREE.Scene();

    const numParticles = AMOUNTX * AMOUNTY;
    const positions = new Float32Array(numParticles * 3);
    const scales = new Float32Array(numParticles);

    // Inicializar posições planas da grade no espaço 3D (X e Z)
    let i = 0;
    let s = 0;
    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        positions[i] = ix * SEPARATOR - (AMOUNTX * SEPARATOR) / 2; // X
        positions[i + 1] = 0;                                      // Y (Altura inicial)
        positions[i + 2] = iy * SEPARATOR - (AMOUNTY * SEPARATOR) / 2; // Z

        scales[s] = 1;
        i += 3;
        s++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

    // Material das partículas com textura circular e suporte à transparência
    const material = new THREE.PointsMaterial({
      size: 4.0,
      map: createCircleTexture(),
      transparent: true,
      opacity: 0.65,
      blending: THREE.NormalBlending,
      depthWrite: false
    });

    // Criar o objeto Points no Three.js
    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Configurar o Renderer WebGL
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    
    resize();

    // Eventos
    window.addEventListener('resize', resize);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('touchmove', onTouchMove, { passive: true });
    document.addEventListener('click', onClick);
    document.addEventListener('touchstart', onTouchStart, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    animate();
  }

  function resize() {
    const rect = hero.getBoundingClientRect();
    camera.aspect = rect.width / rect.height;
    camera.updateProjectionMatrix();
    renderer.setSize(rect.width, rect.height, false);
  }

  function onMouseMove(e) {
    const rect = hero.getBoundingClientRect();
    mouse2D.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse2D.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  }

  function onTouchMove(e) {
    if (e.touches[0]) {
      const rect = hero.getBoundingClientRect();
      mouse2D.x = ((e.touches[0].clientX - rect.left) / rect.width) * 2 - 1;
      mouse2D.y = -((e.touches[0].clientY - rect.top) / rect.height) * 2 + 1;
    }
  }

  function onTouchStart(e) {
    if (e.touches[0]) {
      const rect = hero.getBoundingClientRect();
      const tx = e.touches[0].clientX;
      const ty = e.touches[0].clientY;
      mouse2D.x = ((tx - rect.left) / rect.width) * 2 - 1;
      mouse2D.y = -((ty - rect.top) / rect.height) * 2 + 1;
      triggerRipple(tx, ty);
    }
  }

  function onClick(e) {
    triggerRipple(e.clientX, e.clientY);
  }

  function triggerRipple(clientX, clientY) {
    // Certifica-se de atualizar a interseção no clique antes de registrar
    raycaster.setFromCamera(mouse2D, camera);
    raycaster.ray.intersectPlane(plane, mouse3D);

    if (mouse3D.x !== -9999) {
      ripples.push({
        x: mouse3D.x,
        z: mouse3D.z,
        radius: 0,
        maxRadius: 500,
        speed: 7.5,
        strength: 70,
        opacity: 1.0
      });
    }
  }

  function onMouseLeave() {
    mouse2D.x = -9999;
    mouse2D.y = -9999;
    mouse3D.set(-9999, -9999, -9999);
  }

  function animate() {
    requestAnimationFrame(animate);

    // 1. Monitoramento inteligente de troca de tema CSS
    const theme = document.documentElement.getAttribute('data-theme') || 'light';
    if (theme !== currentTheme) {
      currentTheme = theme;
      const col = getColor();
      particles.material.color.set(col);
    }

    // 2. Atualizar Ripples ativos
    for (let r = ripples.length - 1; r >= 0; r--) {
      const rip = ripples[r];
      rip.radius += rip.speed;
      rip.opacity -= 0.016;
      if (rip.opacity <= 0) {
        ripples.splice(r, 1);
      }
    }

    // 3. Atualizar posição do Mouse 3D no plano Y=0
    if (mouse2D.x !== -9999) {
      raycaster.setFromCamera(mouse2D, camera);
      raycaster.ray.intersectPlane(plane, mouse3D);
    }

    // 4. Animação matemática das posições dos vértices da grade
    const positions = particles.geometry.attributes.position.array;
    const scales = particles.geometry.attributes.scale.array;
    let i = 0;
    let s = 0;

    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        const posX = positions[i];
        const posZ = positions[i + 2];

        // Ondulação padrão (fórmula matemática de ondas cruzadas e circulares)
        const distFromCenter = Math.sqrt(posX * posX + posZ * posZ);
        let heightY = Math.sin((ix + count) * 0.25) * 18 + Math.cos((iy + count) * 0.25) * 18;
        heightY += Math.sin(distFromCenter * 0.01 - count * 0.8) * 10;

        // Efeito magnético do Mouse (atração/repulsão)
        if (mouse3D.x !== -9999) {
          const dx = posX - mouse3D.x;
          const dz = posZ - mouse3D.z;
          const distMouse = Math.sqrt(dx * dx + dz * dz);
          
          if (distMouse < 180) {
            const progress = 1 - distMouse / 180;
            // Cria um declive dinâmico ondulatório sob o mouse
            heightY += Math.sin(distMouse * 0.05 - count * 2) * 35 * progress;
          }
        }

        // Efeito físico das ondas de clique (Ripples)
        ripples.forEach(rip => {
          const rdx = posX - rip.x;
          const rdz = posZ - rip.z;
          const distRip = Math.sqrt(rdx * rdx + rdz * rdz);
          
          if (distRip < rip.radius && distRip > rip.radius - 120) {
            const progress = 1 - (Math.abs(distRip - rip.radius) / 120);
            heightY += Math.sin((distRip - rip.radius) * 0.05) * rip.strength * rip.opacity * progress;
          }
        });

        // Aplica a nova altura Y calculado no buffer de vértices
        positions[i + 1] = heightY;

        // Escala dinâmica baseada na altura da crista da onda (partes altas ficam ligeiramente maiores)
        scales[s] = 1.0 + (heightY + 30) / 60;

        i += 3;
        s++;
      }
    }

    particles.geometry.attributes.position.needsUpdate = true;
    particles.geometry.attributes.scale.needsUpdate = true;

    count += 0.025; // velocidade base de oscilação do loop

    renderer.render(scene, camera);
  }

  // Inicializar a execução
  init();
})();
