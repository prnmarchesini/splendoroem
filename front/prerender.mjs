// Depois do `vite build`: injeta o HTML renderizado no dist/index.html, para que
// buscadores e IAs (que não executam JS) leiam o conteúdo da página.
import { readFileSync, writeFileSync, rmSync } from "node:fs";

const { render } = await import("./dist-ssr/entry-server.js");
const file = "dist/index.html";
const html = readFileSync(file, "utf8");
const marker = '<div id="root"></div>';
if (!html.includes(marker)) throw new Error(`${marker} não encontrado em ${file}`);
writeFileSync(file, html.replace(marker, `<div id="root">${render()}</div>`));
rmSync("dist-ssr", { recursive: true, force: true });
