// Teke-Tumateke · «A golpe de eslogan»: las tres frases caen y rebotan al cargar; las cintas de comida corren
// en sentidos opuestos y se aceleran y se inclinan con la velocidad del scroll
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ok = () => !reduce && typeof gsap !== 'undefined';

  function hero() {
    if (!ok()) return;
    const parts = gsap.utils.toArray('.sl .sw, .sl em');
    gsap.fromTo(parts, { yPercent: -160, scaleY: 1.5, scaleX: .8, opacity: 0, transformOrigin: '50% 100%' },
      { yPercent: 0, scaleY: 1, scaleX: 1, opacity: 1, duration: 1, ease: 'elastic.out(1, .55)', stagger: .09, delay: .05 });
    gsap.fromTo('.sticker', { scale: 0, rotate: -120 }, { scale: 1, rotate: (i) => (i ? 8 : -6), duration: 1.2, ease: 'back.out(1.8)', stagger: .15, delay: .45 });
    gsap.fromTo('.stamp', { scale: 0 }, { scale: 1, duration: .9, ease: 'back.out(2.4)', delay: .8 });
    gsap.to('.stamp', { rotate: '+=360', duration: 22, repeat: -1, ease: 'none', delay: 1.7 });
    gsap.to('.st1', { y: -30, rotate: 6, duration: 3.2, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 1.6 });
    gsap.to('.slogans', { yPercent: -25, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  }

  function tapes() {
    const rows = [...document.querySelectorAll('.tape-t')];
    rows.forEach((t) => (t.innerHTML += t.innerHTML));
    if (!ok()) return;
    const st = rows.map((t, i) => ({ t, x: 0, dir: i % 2 ? 1 : -1 }));
    let vel = 0, skew = 0;
    gsap.ticker.add(() => {
      const v = (window.P && P.lenis ? P.lenis.velocity : 0) || 0;
      vel += (v - vel) * .1; skew += (Math.max(-12, Math.min(12, vel * .6)) - skew) * .12;
      st.forEach((s) => {
        const half = s.t.scrollWidth / 2;
        s.x += s.dir * (.6 + Math.abs(vel) * .5);
        if (s.x <= -half) s.x += half; if (s.x > 0) s.x -= half;
        s.t.style.transform = `translate3d(${s.x}px,0,0) skewX(${-skew * s.dir}deg)`;
      });
    });
  }

  function init() { hero(); tapes(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
