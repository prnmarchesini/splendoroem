import { useEffect } from "react";
import { postLead } from "../lib/api";

/**
 * Porte fiel do main.js original (interações da landing) para o ciclo de vida
 * do React. A página é renderizada estaticamente com as MESMAS classes/ids/data-*
 * do design, então as interações operam direto no DOM, exatamente como no original:
 *
 *  - Nav: sombra ao rolar + menu mobile (burger).
 *  - Count-up animado dos números (com prefers-reduced-motion).
 *  - Reveal on-scroll por posição (com failsafe "snap").
 *  - Hero switcher A/B/C com persistência em localStorage ('splendorHero').
 *  - Formulário de diagnóstico: validação visual + POST real para /api/leads,
 *    mantendo a tela de sucesso do design.
 *
 * Todos os listeners usam um AbortController para limpeza correta (StrictMode).
 */
export function useSplendorInteractions(): void {
  useEffect(() => {
    const ac = new AbortController();
    const { signal } = ac;
    const timeouts: number[] = [];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---------- Nav: sombra ao rolar + menu mobile ---------- */
    const nav = document.getElementById("nav");
    const burger = document.getElementById("burger");
    const navLinks = document.getElementById("navLinks");

    function onNav() {
      if (!nav) return;
      if (window.scrollY > 24) nav.classList.add("scrolled");
      else nav.classList.remove("scrolled");
    }
    window.addEventListener("scroll", onNav, { passive: true, signal });
    onNav();

    burger?.addEventListener("click", () => nav?.classList.toggle("open"), { signal });
    navLinks?.addEventListener(
      "click",
      (e) => {
        if ((e.target as HTMLElement).closest("a")) nav?.classList.remove("open");
      },
      { signal },
    );

    /* ---------- Count-up ---------- */
    const fmt = (n: number) => n.toLocaleString("pt-BR");
    function countUp(el: HTMLElement) {
      if (el.dataset.done) return;
      el.dataset.done = "1";
      const target = parseFloat(el.dataset.count || "") || 0;
      const dur = parseInt(el.dataset.dur || "1300", 10);
      if (reduce) {
        el.textContent = fmt(target);
        return;
      }
      const start = performance.now();
      (function tick(now: number) {
        const p = Math.min(1, (now - start) / dur);
        const e = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
        el.textContent = fmt(Math.round(target * e));
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = fmt(target);
      })(performance.now());
      // safety net: garante valor final mesmo se rAF estiver estrangulado
      timeouts.push(window.setTimeout(() => (el.textContent = fmt(target)), dur + 150));
    }

    /* ---------- Reveal + count-up por posição de scroll ---------- */
    function inView(el: HTMLElement, ratio?: number) {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (r.width === 0 && r.height === 0) return false; // escondido (hero inativo)
      return r.top < vh * (ratio || 0.88) && r.bottom > 0;
    }
    function check() {
      document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => {
        if (!el.classList.contains("in") && inView(el)) el.classList.add("in");
      });
      document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        if (!el.dataset.done && inView(el, 0.95)) countUp(el);
      });
    }
    function snapStuck() {
      document.querySelectorAll<HTMLElement>(".reveal.in").forEach((el) => {
        if (parseFloat(getComputedStyle(el).opacity) < 0.95) el.classList.add("snap");
      });
    }
    let snapT: number;
    function checkAndSnap() {
      check();
      clearTimeout(snapT);
      snapT = window.setTimeout(snapStuck, 360);
    }
    window.addEventListener("scroll", checkAndSnap, { passive: true, signal });
    window.addEventListener("resize", check, { signal });
    window.addEventListener("load", check, { signal });
    check();
    [120, 500, 900, 1400].forEach((ms) =>
      timeouts.push(
        window.setTimeout(() => {
          check();
          snapStuck();
        }, ms),
      ),
    );

    /* ---------- Hero switcher ---------- */
    const heroswitch = document.getElementById("heroswitch");
    const heroes = document.getElementById("heroes");
    function updateNavTheme() {
      const active = heroes?.querySelector<HTMLElement>("[data-hero].is-active");
      nav?.classList.toggle("nav--ondark", !!active && active.dataset.hero === "b");
    }
    function setHero(go: string, persist: boolean) {
      heroswitch?.querySelectorAll<HTMLElement>("button").forEach((b) =>
        b.classList.toggle("active", b.dataset.go === go),
      );
      heroes?.querySelectorAll<HTMLElement>("[data-hero]").forEach((s) =>
        s.classList.toggle("is-active", s.dataset.hero === go),
      );
      updateNavTheme();
      if (persist) {
        try {
          localStorage.setItem("splendorHero", go);
        } catch {
          /* localStorage indisponível */
        }
      }
      const active = heroes?.querySelector<HTMLElement>("[data-hero].is-active");
      active?.querySelectorAll<HTMLElement>(".reveal").forEach((el) => el.classList.add("in"));
      active?.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        el.dataset.done = "";
        countUp(el);
      });
      timeouts.push(window.setTimeout(snapStuck, 360));
    }
    heroswitch?.addEventListener(
      "click",
      (e) => {
        const btn = (e.target as HTMLElement).closest<HTMLElement>("button[data-go]");
        if (!btn) return;
        setHero(btn.dataset.go || "b", true);
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      },
      { signal },
    );
    // restaura escolha (padrão: hero escuro)
    let saved = "b";
    try {
      saved = localStorage.getItem("splendorHero") || "b";
    } catch {
      /* localStorage indisponível */
    }
    if (saved !== "b") setHero(saved, false);
    else updateNavTheme();

    /* ---------- Formulário: validação visual + POST real ---------- */
    const form = document.getElementById("diagForm") as HTMLFormElement | null;
    if (form) {
      const fieldsEl = document.getElementById("formFields");
      const okEl = document.getElementById("formOk");
      const errEl = document.getElementById("formErr");
      const submitBtn = form.querySelector<HTMLButtonElement>("button[type=submit]");

      form.addEventListener(
        "submit",
        async (e) => {
          e.preventDefault();
          let ok = true;
          form.querySelectorAll<HTMLInputElement>("input[required]").forEach((inp) => {
            if (!inp.value.trim()) {
              ok = false;
              inp.style.borderColor = "var(--red)";
            } else inp.style.borderColor = "";
          });
          if (!ok) return;

          const val = (id: string) =>
            (form.querySelector<HTMLInputElement>(`#${id}`)?.value || "").trim();

          if (errEl) errEl.style.display = "none";
          const originalLabel = submitBtn?.textContent || "Agendar diagnóstico";
          if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = "Enviando…";
          }

          try {
            await postLead({
              nome: val("nome"),
              whatsapp: val("zap"),
              cidade: val("cidade"),
              potencia_kwp: val("pot"),
            });
            if (fieldsEl) fieldsEl.style.display = "none";
            okEl?.classList.add("show");
          } catch (err) {
            if (errEl) {
              errEl.textContent =
                err instanceof Error ? err.message : "Não foi possível enviar agora.";
              errEl.style.display = "block";
            }
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.textContent = originalLabel;
            }
          }
        },
        { signal },
      );

      form.querySelectorAll<HTMLInputElement>("input").forEach((inp) =>
        inp.addEventListener("input", () => (inp.style.borderColor = ""), { signal }),
      );
    }

    return () => {
      ac.abort();
      clearTimeout(snapT);
      timeouts.forEach((t) => clearTimeout(t));
    };
  }, []);
}
