import { useEffect, useState } from "react";

/**
 * Lightbox dos prints. Qualquer imagem com a classe `pzoom` abre em tela cheia
 * (usa `data-full` quando existe). Fecha no clique fora, no botão ou no Esc.
 */
export default function Lightbox() {
  const [shown, setShown] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    const ac = new AbortController();
    const { signal } = ac;

    document.addEventListener(
      "click",
      (e) => {
        const z = (e.target as HTMLElement).closest<HTMLImageElement>(".pzoom");
        if (!z) return;
        setShown({ src: z.dataset.full || z.src, alt: z.alt || "" });
      },
      { signal },
    );
    document.addEventListener(
      "keydown",
      (e) => {
        if (e.key === "Escape") setShown(null);
      },
      { signal },
    );

    return () => ac.abort();
  }, []);

  useEffect(() => {
    document.body.style.overflow = shown ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [shown]);

  return (
    <div className="lbox" id="lbox" hidden={!shown} onClick={() => setShown(null)}>
      <button className="lbox__close" id="lboxClose" aria-label="Fechar">
        ✕
      </button>
      {shown && (
        <img id="lboxImg" src={shown.src} alt={shown.alt} onClick={(e) => e.stopPropagation()} />
      )}
    </div>
  );
}
