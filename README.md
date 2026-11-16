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
| `panel.html` | Panel del curador: genera enlaces de invitación, revisa envíos y los aprueba. |

## Cómo se publica (por invitación)

Nadie puede publicar por su cuenta: el curador genera un enlace único y se lo
envía al fotógrafo.

1. **Generar invitación** — abre `panel.html` y pulsa *Generar invitación*; copia el enlace.
2. **El fotógrafo completa el formulario** — datos de contacto, colección, descripción de las
   fotografías, técnica e inspiración, y hasta 6 fotos (se optimizan en su propio dispositivo).
3. **Revisión** — el envío queda pendiente en `panel.html`; al aprobarlo aparece en
   Colecciones y Creadores.
4. **Publicación permanente** — exporta el JSON desde el panel y añádelo al arreglo
   `fotografos` de `src/data.js`.

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
├── panel.html               # panel del curador
└── src/
    ├── data.js              # arreglo de fotógrafos y colecciones
    ├── store.js             # almacenamiento local (sustituto de BD)
    ├── main.js              # UI compartida: nav, modales, tarjetas
    ├── styles.css           # fuente de estilos (Tailwind v4)
    ├── stylesTW.css         # estilos compilados
    └── img/                 # fotografías y favicon
```

## Stack

HTML + Tailwind (v3 CDN + estilos compilados v4), tipografías JetBrains Mono y Noto Serif.
Sin build: abre `index.html` y listo.

Hecho con ❤️ por @Lott_Campuzano.
