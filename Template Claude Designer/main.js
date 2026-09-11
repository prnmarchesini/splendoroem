/* ============================================================
   SPLENDOR O&M — interações
   (reveal/count via verificação de scroll — IO não é confiável aqui)
   ============================================================ */
(function(){
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Nav: sombra ao rolar + menu mobile ---------- */
  var nav = document.getElementById('nav');
  var burger = document.getElementById('burger');
  var navLinks = document.getElementById('navLinks');

  function onNav(){
    if(window.scrollY > 24) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onNav, {passive:true});
  onNav();

  burger.addEventListener('click', function(){ nav.classList.toggle('open'); });
  navLinks.addEventListener('click', function(e){
    if(e.target.closest('a')) nav.classList.remove('open');
  });

  /* ---------- Count-up ---------- */
  function fmt(n){ return n.toLocaleString('pt-BR'); }
  function countUp(el){
    if(el.dataset.done) return;
    el.dataset.done = '1';
    var target = parseFloat(el.dataset.count) || 0;
    var dur = parseInt(el.dataset.dur || '1300', 10);
    if(reduce){ el.textContent = fmt(target); return; }
    var start = performance.now();
    (function tick(now){
      var p = Math.min(1, (now - start) / dur);
      var e = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      el.textContent = fmt(Math.round(target * e));
      if(p < 1) requestAnimationFrame(tick);
      else el.textContent = fmt(target);
    })(performance.now());
    // safety net: garante valor final mesmo se rAF estiver estrangulado
    setTimeout(function(){ el.textContent = fmt(target); }, dur + 150);
  }

  /* ---------- Reveal + count-up por posição de scroll ---------- */
  function inView(el, ratio){
    var r = el.getBoundingClientRect();
    var vh = window.innerHeight || document.documentElement.clientHeight;
    if(r.width === 0 && r.height === 0) return false; // escondido (hero inativo)
    return r.top < vh * (ratio || 0.88) && r.bottom > 0;
  }
  function check(){
    document.querySelectorAll('.reveal').forEach(function(el){
      if(!el.classList.contains('in') && inView(el)) el.classList.add('in');
    });
    document.querySelectorAll('[data-count]').forEach(function(el){
      if(!el.dataset.done && inView(el, 0.95)) countUp(el);
    });
  }
  // failsafe: se a transição não avança (aba em segundo plano / captura),
  // força o estado final dos elementos já revelados que estão em vista.
  function snapStuck(){
    document.querySelectorAll('.reveal.in').forEach(function(el){
      if(parseFloat(getComputedStyle(el).opacity) < 0.95) el.classList.add('snap');
    });
  }
  var snapT;
  function checkAndSnap(){ check(); clearTimeout(snapT); snapT = setTimeout(snapStuck, 360); }
  window.addEventListener('scroll', checkAndSnap, {passive:true});
  window.addEventListener('resize', check);
  window.addEventListener('load', check);
  check();
  // failsafes (fontes/layout assentando + ambiente sem transições)
  [120, 500, 900, 1400].forEach(function(ms){ setTimeout(function(){ check(); snapStuck(); }, ms); });

  /* ---------- Hero switcher ---------- */
  var heroswitch = document.getElementById('heroswitch');
  var heroes = document.getElementById('heroes');
  function updateNavTheme(){
    var active = heroes.querySelector('[data-hero].is-active');
    nav.classList.toggle('nav--ondark', !!active && active.dataset.hero === 'b');
  }
  function setHero(go, persist){
    heroswitch.querySelectorAll('button').forEach(function(b){ b.classList.toggle('active', b.dataset.go===go); });
    heroes.querySelectorAll('[data-hero]').forEach(function(s){
      s.classList.toggle('is-active', s.dataset.hero === go);
    });
    updateNavTheme();
    if(persist){ try{ localStorage.setItem('splendorHero', go); }catch(e){} }
    var active = heroes.querySelector('[data-hero].is-active');
    active.querySelectorAll('.reveal').forEach(function(el){ el.classList.add('in'); });
    active.querySelectorAll('[data-count]').forEach(function(el){ el.dataset.done=''; countUp(el); });
    setTimeout(snapStuck, 360);
  }
  heroswitch.addEventListener('click', function(e){
    var btn = e.target.closest('button[data-go]');
    if(!btn) return;
    setHero(btn.dataset.go, true);
    window.scrollTo({top:0, behavior: reduce ? 'auto' : 'smooth'});
  });
  // restaura escolha (padrão: hero escuro)
  var saved = 'b';
  try{ saved = localStorage.getItem('splendorHero') || 'b'; }catch(e){}
  if(saved !== 'b') setHero(saved, false); else updateNavTheme();

  /* ---------- Formulário (visual, não envia) ---------- */
  var form = document.getElementById('diagForm');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var ok = true;
      form.querySelectorAll('input[required]').forEach(function(inp){
        if(!inp.value.trim()){ ok=false; inp.style.borderColor='var(--red)'; }
        else inp.style.borderColor='';
      });
      if(!ok) return;
      document.getElementById('formFields').style.display='none';
      document.getElementById('formOk').classList.add('show');
    });
    form.querySelectorAll('input').forEach(function(inp){
      inp.addEventListener('input', function(){ inp.style.borderColor=''; });
    });
  }
})();

/* ---------- abas do meuPlano ---------- */
document.querySelectorAll('.ptab').forEach(function(t){
  t.addEventListener('click', function(){
    document.querySelectorAll('.ptab').forEach(function(x){ x.classList.toggle('is-on', x === t); });
    var id = t.dataset.tab;
    document.querySelectorAll('.ppanel').forEach(function(p){ p.classList.toggle('is-on', p.id === id); });
  });
});

/* ---------- troca de print pelas miniaturas ---------- */
document.querySelectorAll('.pthumb').forEach(function(b){
  b.addEventListener('click', function(){
    var panel = b.closest('.ppanel');
    var img = panel.querySelector('.pmain .frame__img');
    var cap = panel.querySelector('.pmain figcaption');
    img.src = b.dataset.src; img.dataset.full = b.dataset.src; img.alt = b.dataset.cap;
    if (cap) cap.textContent = b.dataset.cap;
    markPortrait(img);
    panel.querySelectorAll('.pthumb').forEach(function(x){ x.classList.toggle('is-on', x === b); });
  });
});

/* ---------- prints em retrato ganham moldura de celular ---------- */
function markPortrait(img){
  var fig = img.closest('.pmain');
  if (!fig) return;
  var apply = function(){ fig.classList.toggle('is-port', img.naturalHeight > img.naturalWidth); };
  if (img.complete && img.naturalWidth) apply(); else img.addEventListener('load', apply, { once: true });
}
document.querySelectorAll('.pmain .frame__img').forEach(markPortrait);

/* ---------- lightbox dos prints ---------- */
(function(){
  var lb = document.getElementById('lbox'), lbImg = document.getElementById('lboxImg');
  if (!lb) return;
  function close(){ lb.hidden = true; document.body.style.overflow = ''; }
  document.addEventListener('click', function(e){
    var z = e.target.closest('.pzoom');
    if (z){ lbImg.src = z.dataset.full || z.src; lbImg.alt = z.alt || ''; lb.hidden = false; document.body.style.overflow = 'hidden'; }
  });
  lb.addEventListener('click', function(e){ if (e.target !== lbImg) close(); });
  document.getElementById('lboxClose').addEventListener('click', close);
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape' && !lb.hidden) close(); });
})();
