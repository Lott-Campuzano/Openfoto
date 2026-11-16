/* ==========================================================================
   Openfoto — Almacén local
   --------------------------------------------------------------------------
   Sustituto de la base de datos mientras Openfoto no tiene backend.
   Guarda en localStorage:
   - los envíos pendientes de revisión (llegan por el formulario de invitación)
   - los envíos aprobados, que se publican junto con src/data.js
   - los tokens de invitación generados desde el panel del curador
   ========================================================================== */

const ALMACEN = (() => {
  const CLAVES = {
    pendientes: "openfoto:pendientes",
    publicados: "openfoto:publicados",
    tokens: "openfoto:tokens",
    usados: "openfoto:tokens-usados"
  };

  function leer(clave, porDefecto) {
    try {
      const bruto = localStorage.getItem(clave);
      return bruto ? JSON.parse(bruto) : porDefecto;
    } catch {
      return porDefecto;
    }
  }

  function escribir(clave, valor) {
    localStorage.setItem(clave, JSON.stringify(valor));
  }

  /* ---------- Tokens de invitación ---------- */

  function tokensGenerados() {
    return leer(CLAVES.tokens, []);
  }

  function generarToken() {
    const azar = Math.random().toString(36).slice(2, 6).toUpperCase();
    const token = `OPENFOTO-${azar.slice(0, 4)}-${Date.now().toString(36).slice(-4).toUpperCase()}`;
    const tokens = tokensGenerados();
    tokens.push({ token, activo: true, origen: "panel" });
    escribir(CLAVES.tokens, tokens);
    return token;
  }

  function tokensValidos() {
    const delArchivo = (OPENFOTO.invitaciones || [])
      .filter(i => i.activo)
      .map(i => ({ token: i.token, origen: "data.js" }));
    return delArchivo.concat(tokensGenerados().filter(t => t.activo));
  }

  function tokenUsado(token) {
    return leer(CLAVES.usados, []).includes(token);
  }

  function marcarTokenUsado(token) {
    const usados = leer(CLAVES.usados, []);
    if (!usados.includes(token)) usados.push(token);
    escribir(CLAVES.usados, usados);
  }

  /* ---------- Envíos (colecciones que llegan por invitación) ---------- */

  function pendientes() {
    return leer(CLAVES.pendientes, []);
  }

  function publicados() {
    return leer(CLAVES.publicados, []);
  }

  function guardarEnvio(envio) {
    const lista = pendientes();
    lista.push(envio);
    escribir(CLAVES.pendientes, lista);
  }

  function aprobarEnvio(id) {
    const restantes = [];
    let aprobado = null;
    pendientes().forEach(e => {
      if (e.id === id) aprobado = e; else restantes.push(e);
    });
    if (aprobado) {
      escribir(CLAVES.pendientes, restantes);
      const publicadosActuales = publicados();
      publicadosActuales.push(aprobado);
      escribir(CLAVES.publicados, publicadosActuales);
    }
    return aprobado;
  }

  function rechazarEnvio(id) {
    escribir(CLAVES.pendientes, pendientes().filter(e => e.id !== id));
  }

  /* Devuelve todos los fotógrafos: los del archivo data.js + los aprobados.
     Los envíos aprobados se agrupan por email: si el fotógrafo ya existe,
     su nueva colección se añade a su ficha. */
  function todosLosFotografos() {
    const base = (OPENFOTO.fotografos || []).map(f => ({
      ...f,
      colecciones: f.colecciones.map(c => ({ ...c, origen: "data.js" }))
    }));

    publicados().forEach(envio => {
      const coleccion = {
        id: envio.coleccionId,
        titulo: envio.titulo,
        anio: envio.anio || "",
        narrativa: envio.narrativa || "",
        tecnica: envio.tecnica || "",
        inspiracion: envio.inspiracion || "",
        portada: (envio.fotos && envio.fotos[0]) || "",
        fotos: envio.fotos || [],
        origen: "invitacion"
      };
      const existente = base.find(f => f.email === envio.email);
      if (existente) {
        existente.colecciones.push(coleccion);
      } else {
        base.push({
          id: envio.autorId,
          nombre: envio.nombre,
          alias: envio.alias || "",
          bio: envio.bio || "",
          email: envio.email || "",
          web: envio.web || "",
          instagram: envio.instagram || "",
          colecciones: [coleccion]
        });
      }
    });

    return base;
  }

  return {
    tokensGenerados, generarToken, tokensValidos, tokenUsado, marcarTokenUsado,
    pendientes, publicados, guardarEnvio, aprobarEnvio, rechazarEnvio,
    todosLosFotografos
  };
})();
