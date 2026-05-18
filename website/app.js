// ── CIRCUIT BOARD ANIMATION ──────────────────────────
const canvas = document.getElementById('circuit');
const ctx = canvas.getContext('2d');

let nodes = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  buildNodes();
}

function buildNodes() {
  nodes = [];
  const count = Math.floor((canvas.width * canvas.height) / 18000);
  for (let i = 0; i < count; i++) {
    nodes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - .5) * .3,
      vy: (Math.random() - .5) * .3,
      r: Math.random() * 2 + 1,
      pulse: Math.random() * Math.PI * 2,
    });
  }
}

function drawCircuit() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Move nodes
  nodes.forEach(n => {
    n.x += n.vx; n.y += n.vy; n.pulse += .02;
    if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
    if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
  });

  // Draw connections
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 160) {
        const alpha = (1 - dist / 160) * .6;
        ctx.strokeStyle = `rgba(220,38,38,${alpha})`;
        ctx.lineWidth = .5;
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.stroke();
      }
    }
  }

  // Draw nodes
  nodes.forEach(n => {
    const pulse = (Math.sin(n.pulse) + 1) / 2;
    ctx.fillStyle = `rgba(220,38,38,${.4 + pulse * .6})`;
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(drawCircuit);
}

resize();
window.addEventListener('resize', resize);
drawCircuit();

// ── NAV SCROLL ───────────────────────────────────────
window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('on', window.scrollY > 40);
});

// ── CHARTS ───────────────────────────────────────────
window.addEventListener('load', () => {
  const red = '#ef4444';
  const red2 = 'rgba(239,68,68,.15)';
  const gold = '#f59e0b';
  const gridColor = 'rgba(58,16,16,.8)';
  const textColor = '#5a2020';

  // Radar Chart
  const radarCtx = document.getElementById('radarChart');
  if (radarCtx) {
    new Chart(radarCtx, {
      type: 'radar',
      data: {
        labels: ['Linux/Bash','Docker/Nginx','Java','C#','Python','Networking'],
        datasets: [{
          label: 'Skill Level',
          data: [85, 82, 78, 75, 72, 70],
          borderColor: red,
          backgroundColor: 'rgba(220,38,38,.12)',
          pointBackgroundColor: red,
          pointBorderColor: '#0a0000',
          pointBorderWidth: 2,
          pointRadius: 4,
          borderWidth: 2,
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          r: {
            min: 0, max: 100,
            grid: { color: gridColor },
            angleLines: { color: gridColor },
            pointLabels: {
              color: textColor,
              font: { family: 'IBM Plex Mono', size: 10 }
            },
            ticks: { display: false, stepSize: 25 }
          }
        }
      }
    });
  }

  // Bar Chart
  const barCtx = document.getElementById('barChart');
  if (barCtx) {
    new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: ['Lab04','Lab05','Lab06','Lab07','Lab08','Lab09'],
        datasets: [{
          label: 'Completion',
          data: [100, 100, 100, 100, 100, 100],
          backgroundColor: [
            'rgba(220,38,38,.3)','rgba(220,38,38,.4)',
            'rgba(220,38,38,.5)','rgba(220,38,38,.6)',
            'rgba(220,38,38,.8)','rgba(220,38,38,1)',
          ],
          borderColor: red,
          borderWidth: 1,
          borderRadius: 3,
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          x: {
            grid: { color: gridColor },
            ticks: { color: textColor, font: { family: 'IBM Plex Mono', size: 9 } }
          },
          y: {
            min: 0, max: 100,
            grid: { color: gridColor },
            ticks: { color: textColor, font: { family: 'IBM Plex Mono', size: 9 }, callback: v => v + '%' }
          }
        }
      }
    });
  }

  // Doughnut Chart
  const dCtx = document.getElementById('doughnutChart');
  if (dCtx) {
    new Chart(dCtx, {
      type: 'doughnut',
      data: {
        labels: ['Encrypted (HTTPS)', 'Plaintext (HTTP)', 'TLS Handshake'],
        datasets: [{
          data: [78, 17, 5],
          backgroundColor: [red, '#1f2937', gold],
          borderColor: '#0a0000',
          borderWidth: 3,
        }]
      },
      options: {
        responsive: true,
        cutout: '68%',
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: { label: ctx => ` ${ctx.parsed}%` }
          }
        }
      }
    });
  }
});

// ── SKILL BARS ──────────────────────────────────────
const skObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const w = e.target.closest('.sbar').dataset.w;
      e.target.style.width = w + '%';
      skObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.sb-fill').forEach(f => skObs.observe(f));

// ── FADE IN ──────────────────────────────────────────
const fadeObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
      fadeObs.unobserve(e.target);
    }
  });
}, { threshold: 0.05 });

document.querySelectorAll('.lab-card, .proj-card, .astat, .ai-row, .ts-item, .kv').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  fadeObs.observe(el);
});
