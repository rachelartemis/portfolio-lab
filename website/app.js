// ── MATRIX RAIN ────────────────────────────────────
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
let cols, drops;
const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ';

function initMatrix() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const fontSize = 13;
  cols = Math.floor(canvas.width / fontSize);
  drops = Array(cols).fill(1);
}

function drawMatrix() {
  ctx.fillStyle = 'rgba(3,8,16,0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#00d4ff';
  ctx.font = '13px JetBrains Mono, monospace';
  for (let i = 0; i < drops.length; i++) {
    const ch = chars[Math.floor(Math.random() * chars.length)];
    ctx.globalAlpha = Math.random() * 0.6 + 0.2;
    ctx.fillText(ch, i * 13, drops[i] * 13);
    if (drops[i] * 13 > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
  ctx.globalAlpha = 1;
}

initMatrix();
window.addEventListener('resize', initMatrix);
setInterval(drawMatrix, 50);

// ── NAV SCROLL ──────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ── TERMINAL ANIMATION ──────────────────────────────
const commands = [
  { type: 'cmd', text: 'docker compose up -d' },
  { type: 'out', text: '✓ Container nginx-web-server  Started' },
  { type: 'cmd', text: 'openssl req -x509 -newkey rsa:4096 -days 365 -nodes' },
  { type: 'out', text: '✓ nginx.crt and nginx.private.key generated' },
  { type: 'cmd', text: 'curl -sk https://localhost | grep title' },
  { type: 'out', text: '<title>Batu Guldogan — Network Security Portfolio</title>' },
  { type: 'cmd', text: 'git add . && git commit -m "Lab 09: TLS/SSL setup"' },
  { type: 'out', text: '[main a3f2c91] Lab 09: TLS/SSL setup — 6 files changed' },
  { type: 'cmd', text: 'git push origin main' },
  { type: 'ok',  text: '✓ pushed to github.com/rachelartemis/portfolio-lab' },
];

const tlines = document.getElementById('tlines');
const tcaret = document.getElementById('tcaret');
let delay = 800;

function addLine(html) {
  const div = document.createElement('div');
  div.innerHTML = html;
  tlines.appendChild(div);
  tlines.scrollTop = tlines.scrollHeight;
}

commands.forEach(({ type, text }) => {
  if (type === 'cmd') {
    setTimeout(() => {
      const span = document.createElement('span');
      span.className = 'tl cmd';
      span.innerHTML = '<span class="tp">batu@vizja:~$&nbsp;</span><span class="tc"></span>';
      tlines.appendChild(span);
      const tc = span.querySelector('.tc');
      let i = 0;
      const iv = setInterval(() => {
        tc.textContent += text[i++];
        if (i >= text.length) clearInterval(iv);
      }, 36);
    }, delay);
    delay += text.length * 36 + 300;
  } else {
    setTimeout(() => {
      const span = document.createElement('span');
      span.className = `tl ${type}`;
      span.textContent = text;
      tlines.appendChild(span);
    }, delay);
    delay += 200;
  }
});

// ── SKILL BARS ──────────────────────────────────────
const fills = document.querySelectorAll('.sk-fill');
const skObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const pct = e.target.closest('.sk').dataset.w;
      e.target.style.setProperty('--w', pct + '%');
      e.target.classList.add('on');
      e.target.style.width = pct + '%';
      skObs.unobserve(e.target);
    }
  });
}, { threshold: 0.4 });
fills.forEach(f => skObs.observe(f));

// ── SECTION FADE-IN ─────────────────────────────────
const secObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.lab, .proj, .ic, .tls-step, .sk').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  secObs.observe(el);
});
