# Openfoto

Galería abierta de fotografía independiente. Donde muchos ven lugares, nosotros vemos historias.

Demo: https://openfoto.vercel.app/

## Páginas

| Página | Qué hace |
| --- | --- |
| `index.html` | Portada: tarjetas y franjas de colecciones, generadas desde el arreglo de datos. |
| `collections.html` | Todas las colecciones publicadas con su narrativa, técnica e inspiración. |
| `creators.html` | Todos los fotógrafos que han contribuido, con su contacto y colecciones. |
| `us.html` | Sobre el proyecto y cómo funciona la publicación por invitación. |
| `invitacion.html` | Formulario de publicación. Solo se abre con un enlace de invitación (`?token=…`). |
| `panel.html` | Panel del curador (uso local, no se publica): invitaciones, revisión y aprobación. |

## Panel del curador: solo local

El panel vive en el repositorio pero **no se publica**:

- `vercel.json` redirige `/panel.html` (y `/panel`) a la portada en producción,
  así que el sitio desplegado nunca lo muestra.
- El panel no está enlazado desde ninguna página pública y lleva `noindex`.
- En local funciona igual por HTTP (`python3 -m http.server`) que abriendo
  `panel.html` directamente como archivo; si el navegador bloquea el
  almacenamiento en `file://`, hay respaldo en memoria para la sesión.

## Cómo se publica (por invitación)

Nadie puede publicar por su cuenta: el curador genera un enlace único y se lo
envía al fotógrafo.

1. **Generar invitación (local)** — abre `panel.html` en tu máquina y pulsa
   *Generar invitación*; copia el enlace y envíaselo al fotógrafo.
2. **El fotógrafo completa el formulario** — datos de contacto, colección,
   descripción de las fotografías, técnica e inspiración, y hasta 6 fotos
   (se optimizan en su propio dispositivo).
3. **Revisión (local)** — el envío queda pendiente en `panel.html`; al
   aprobarlo aparece en Colecciones y Creadores de tu navegador.
4. **Publicación permanente** — exporta el JSON desde el panel y añádelo al
   arreglo `fotografos` de `src/data.js`; al subirlo al repo se publica para todos.

## Datos sin base de datos

Mientras no exista backend, todo vive en dos capas:

- `src/data.js` — el arreglo con los fotógrafos, colecciones y fotos publicadas de forma
  permanente. Editar este archivo es publicar.
- `src/store.js` — almacenamiento local del navegador para invitaciones generadas, envíos
  pendientes y aprobaciones.

## Estructura

```
├── index.html / collections.html / creators.html / us.html
├── invitacion.html          # formulario por invitación
├── panel.html               # panel del curador (solo local)
├── vercel.json              # bloquea /panel.html en producción
└── src/
    ├── data.js              # arreglo de fotógrafos y colecciones
    ├── store.js             # almacenamiento local (sustituto de BD)
    ├── main.js              # UI compartida: nav, modales, tarjetas
    ├── styles.css           # fuente de estilos (Tailwind v4)
    ├── stylesTW.css         # estilos compilados (build completo, sin CDN)
    └── img/                 # fotografías y favicon
```

## Stack

HTML + Tailwind v4 compilado (`src/stylesTW.css` incluye todas las clases del
sitio: el build se generó escaneando todas las páginas, sin depender de ningún
CDN). Tipografías JetBrains Mono y Noto Serif desde Google Fonts, con fallback
de sistema si no hay red. Sin build: abre `index.html` y listo.

Hecho con ❤️ por @Lott_Campuzano.
