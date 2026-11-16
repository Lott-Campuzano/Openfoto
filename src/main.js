/* ==========================================================================
   Openfoto — UI compartida
   --------------------------------------------------------------------------
   Navegación móvil, modales y render de tarjetas a partir del arreglo
   de fotógrafos (src/data.js + src/store.js). Todas las páginas usan
   este archivo, así que el contenido vive en un solo lugar.
   ========================================================================== */

/* ---------- Utilidades ---------- */

function esc(texto) {
  return String(texto ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function slug(texto) {
  return String(texto || "")
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

/* ---------- Navegación móvil ---------- */

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("mobile-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      menu.classList.toggle("hidden");
      const abierto = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!abierto));
    });
  }
});

/* ---------- Modales ---------- */

function abrirModalHTML(html) {
  const overlay = document.getElementById("openfoto-modal");
  document.getElementById("openfoto-modal-contenido").innerHTML = html;
  overlay.classList.remove("hidden");
  overlay.classList.add("flex");
  document.body.style.overflow = "hidden";
}

function cerrarModal() {
  const overlay = document.getElementById("openfoto-modal");
  overlay.classList.add("hidden");
  overlay.classList.remove("flex");
  document.body.style.overflow = "";
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") cerrarModal();
});

/* ---------- Índice de colecciones (por página) ---------- */

let INDICE_COLECCIONES = {}; // id -> { coleccion, autor }

function registrarColecciones(fotografos) {
  INDICE_COLECCIONES = {};
  fotografos.forEach(autor => {
    autor.colecciones.forEach(col => {
      INDICE_COLECCIONES[col.id] = { coleccion: col, autor };
    });
  });
}

function abrirColeccion(id) {
  const registro = INDICE_COLECCIONES[id];
  if (!registro) return;
  const { coleccion: col, autor } = registro;

  const galeria = (col.fotos && col.fotos.length ? col.fotos : [col.portada])
    .map((src, i) => `
      <div class="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:col-span-2 md:h-80">
        <img alt="${esc(col.titulo)} — imagen ${i + 1}" class="h-full w-full object-cover rounded-lg shadow-md" loading="lazy" decoding="async" src="${esc(src)}">
      </div>`)
    .join("");

  const contacto = `
    <h3 class="text-zinc-50 text-xl ns-bold mb-2">Contacto del autor:</h3>
    <p class="jm-regular text-zinc-50 mb-2"><strong>Email:</strong> ${esc(autor.email)}</p>
    ${autor.web ? `<p class="jm-regular text-zinc-50 mb-2"><strong>Sitio web:</strong> <a class="text-amber-600 underline hover:text-amber-500" href="${esc(autor.web)}" target="_blank" rel="noopener">${esc(autor.web.replace(/^https?:\/\//, ""))}</a></p>` : ""}
    ${autor.instagram ? `<p class="jm-regular text-zinc-50 mb-2"><strong>Redes sociales:</strong> <a class="text-amber-600 underline hover:text-amber-500" href="https://instagram.com/${esc(autor.instagram)}" target="_blank" rel="noopener">@${esc(autor.instagram)}</a></p>` : ""}`;

  abrirModalHTML(`
    <button class="text-zinc-50 hover:text-white float-right text-xl font-bold" onclick="cerrarModal()" aria-label="Cerrar">&times;</button>
    <h2 class="text-zinc-50 text-2xl ns-bold mb-4">${esc(col.titulo)}</h2>
    <p class="jm-regular text-zinc-50 mb-2"><strong>Autor:</strong> ${esc(autor.nombre)}${autor.alias ? ` (${esc(autor.alias)})` : ""}</p>
    <p class="jm-regular text-zinc-50 mb-2"><strong>Colección:</strong> ${esc(col.titulo)}${col.anio ? ` · ${esc(col.anio)}` : ""}</p>
    <p class="jm-regular text-zinc-50 mb-4"><strong>Narrativa:</strong> ${esc(col.narrativa)}</p>
    ${col.tecnica ? `<p class="jm-regular text-zinc-50 mb-4"><strong>Técnica:</strong> ${esc(col.tecnica)}</p>` : ""}
    ${col.inspiracion ? `<p class="jm-regular text-zinc-50 mb-4"><strong>Inspiración:</strong> ${esc(col.inspiracion)}</p>` : ""}
    <hr class="my-4 border-zinc-700">
    ${contacto}
    <hr class="my-4 border-zinc-700">
    <div class="p-0 rounded-lg shadow-lg pt-2">
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">${galeria}</div>
    </div>`);
}

/* ---------- Componentes ---------- */

// Tarjeta de colección (mismo lenguaje visual que el diseño original)
function tarjetaColeccion(col, autor) {
  return `
    <button class="relative text-left w-full" onclick="abrirColeccion('${esc(col.id)}')" aria-label="Ver colección ${esc(col.titulo)}">
      <div class="h-full relative overflow-clip group rounded-lg">
        <div class="absolute bottom-0 lg:group-hover:top-0 left-0 w-full h-full lg:group-hover:bg-zinc-700/60 lg:group-hover:backdrop-blur-sm transition-all ease-in-out duration-500">
          <div class="w-full h-full p-2 relative">
            <div class="absolute bottom-0 lg:group-hover:bottom-24 text-white text-left transition-all ease-in-out duration-500">
              <h2 class="text-xl ns-bold text-zinc-50 mt-2 mb-0 pb-1">${esc(col.titulo)}</h2>
              <p class="hidden lg:text-sm lg:block ns-light">${esc(autor.nombre)}</p>
              <br>
              <p class="hidden lg:group-hover:block text-sm jm-regular transition-all ease-in-out duration-500">${esc(col.inspiracion || col.narrativa || "")}</p>
            </div>
          </div>
        </div>
        <img class="w-full h-48 sm:h-64 md:h-80 object-cover rounded-lg" loading="lazy" decoding="async"
             src="${esc(col.portada)}" alt="Colección ${esc(col.titulo)} de ${esc(autor.nombre)}">
      </div>
    </button>`;
}

// Bloque ancho de "historias" (la franja que ya existía en el índice)
function bloqueHistoria(col, autor, idModalOscuro) {
  const fotos = col.fotos.length ? col.fotos : [col.portada];
  const celdas = fotos.slice(0, 4).map((src, i) => `
    <div class="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:col-span-2 md:h-80 shadow-zinc-800">
      <img alt="${esc(col.titulo)} — foto ${i + 1}" class="absolute inset-0 h-full w-full object-cover object-center" loading="lazy" decoding="async" src="${esc(src)}">
    </div>`).join("");

  return `
    <div class="mx-auto max-w-screen-2xl px-4 md:px-8">
      <div class="mb-4 flex items-center justify-between gap-4 sm:mb-6 md:mb-8 pt-10">
        <div class="flex items-center gap-8">
          <h2 class="text-2xl ns-bold text-zinc-50 lg:text-3xl">${esc(col.titulo)} <span class="ns-light">\\ ${esc(autor.alias || autor.nombre)}</span></h2>
          <p class="hidden max-w-screen-sm jm-regular-mini text-zinc-50 md:block">${esc((col.narrativa || "").split(".")[0])}.</p>
        </div>
        <button class="inline-block rounded-lg border border-zinc-300 bg-transparent px-4 py-2 text-center jm-regular-mini text-zinc-300 outline-none transition duration-150 ease-in-out hover:shadow-[0_0_30px_#e4e4e7] hover:text-zinc-100 hover:ring-1 focus:ring-zinc-100 md:px-8 md:py-3 md:text-base"
                onclick="abrirColeccion('${esc(col.id)}')">Ver</button>
      </div>
      <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 xl:gap-8">${celdas}</div>
    </div>`;
}

// Tarjeta de creador (para creators.html)
function tarjetaCreador(autor) {
  const iniciales = autor.nombre.split(" ").map(p => p[0]).slice(0, 2).join("").toUpperCase();
  const chips = autor.colecciones.map(col => `
    <button class="rounded-full border border-zinc-600 bg-zinc-800 px-3 py-1 jm-regular-mini text-zinc-300 hover:text-amber-500 hover:border-amber-600 transition"
            onclick="abrirColeccion('${esc(col.id)}')">${esc(col.titulo)}</button>`).join("");

  return `
    <article class="rounded-lg bg-zinc-800 p-6 shadow-lg shadow-zinc-950/50 flex flex-col gap-4">
      <div class="flex items-center gap-4">
        <div class="w-16 h-16 rounded-full bg-gradient-to-br from-amber-600 to-red-700 flex items-center justify-center text-zinc-50 ns-bold text-xl shrink-0" aria-hidden="true">${esc(iniciales)}</div>
        <div>
          <h2 class="text-xl ns-bold text-zinc-50">${esc(autor.nombre)}</h2>
          ${autor.alias ? `<p class="jm-regular-mini text-amber-600">${esc(autor.alias)}</p>` : ""}
        </div>
      </div>
      <p class="ns-light text-zinc-300 text-sm leading-relaxed">${esc(autor.bio)}</p>
      <div class="jm-regular-mini text-zinc-400 space-y-1">
        <p><strong class="text-zinc-50">Contacto:</strong> ${esc(autor.email)}</p>
        ${autor.web ? `<p><a class="text-amber-600 underline hover:text-amber-500" href="${esc(autor.web)}" target="_blank" rel="noopener">${esc(autor.web.replace(/^https?:\/\//, ""))}</a></p>` : ""}
        ${autor.instagram ? `<p><a class="text-amber-600 underline hover:text-amber-500" href="https://instagram.com/${esc(autor.instagram)}" target="_blank" rel="noopener">@${esc(autor.instagram)}</a></p>` : ""}
      </div>
      <div class="flex flex-wrap gap-2 pt-1">${chips}</div>
    </article>`;
}

/* ---------- Carga inicial ---------- */

// Fusiona data.js con lo aprobado en localStorage y deja el índice listo.
function cargarFotografos() {
  const todos = ALMACEN.todosLosFotografos();
  registrarColecciones(todos);
  return todos;
}
