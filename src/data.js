/* ==========================================================================
   Openfoto — Datos del proyecto
   --------------------------------------------------------------------------
   Mientras Openfoto no tenga base de datos, todo vive en este arreglo.
   Para publicar a un fotógrafo nuevo de forma permanente, añade su objeto
   aquí (o usa el panel del curador, que te da el JSON listo para pegar).
   ========================================================================== */

const OPENFOTO = {
  /* ------------------------------------------------------------------
     Fotógrafos y colecciones.
     Cada autor puede tener varias colecciones; cada colección
     documenta su narrativa, técnica e inspiración.
     Las fotos pueden ser rutas locales (./src/img/...) o URLs.
     ------------------------------------------------------------------ */
  fotografos: [
    {
      id: "guillermo-aguirre",
      nombre: "Guillermo Aguirre",
      alias: "Guillermo AC",
      bio: "Fotógrafo urbano. Camina la ciudad como quien relee un libro viejo: buscando lo que ya pasó desapercibido.",
      email: "guillermo.aguirre@example.com",
      web: "https://guillermoaguirrefoto.com",
      instagram: "guillermoaguirre",
      colecciones: [
        {
          id: "calles-con-historia",
          titulo: "Calles con historia",
          anio: 2024,
          narrativa: "Esta colección captura la esencia de calles llenas de historia. Cada imagen refleja no solo un ambiente único, sino los fragmentos de vida que transitan por esos lugares. Se trata de un recorrido por rincones icónicos y desconocidos, inmortalizando los recuerdos que esas calles guardan en sus adoquines y fachadas.",
          tecnica: "Fotografía documental a pie de calle, 35 mm, luz natural y tomas a mano sin trípode. Se prioriza el encuadre disponible: la calle no se detiene para posar.",
          inspiracion: "Hay tantos lugares que quisiera volver a visitar, no por su belleza sino por lo que cuentan.",
          portada: "./src/img/20240801_142239.jpg",
          fotos: [
            "./src/img/20240801_142239.jpg",
            "https://images.unsplash.com/photo-1610465299996-30f240ac2b1c?auto=format&q=75&fit=crop&w=1000",
            "https://images.unsplash.com/photo-1542759564-7ccbb6ac450a?auto=format&q=75&fit=crop&w=1000"
          ]
        }
      ]
    },
    {
      id: "diana-garcia",
      nombre: "Diana García",
      alias: "Diana",
      bio: "Fotógrafa por encargo del aburrimiento y las urgencias creativas. Trabaja por proyectos cortos e intensos.",
      email: "diana.garcia@example.com",
      web: "",
      instagram: "dianagarcia.foto",
      colecciones: [
        {
          id: "10-dias",
          titulo: "10 días",
          anio: 2025,
          narrativa: "Un experimento de urgencia: fotografiar sin descanso durante diez días seguidos, uno por cada canción que hizo falta para sostener el ánimo. El resultado es un diario visual de lo que pasa cuando la disciplina y la emoción se obligan a convivir.",
          tecnica: "Una foto diaria, sin edición posterior más que el recorte. Calendario fijo, sin excepciones: lo que el día dio, eso quedó.",
          inspiracion: "Me inspiré en Fred Again.., si él pudo hacer un álbum en 10 días. ¿Por qué yo no una colección?",
          portada: "./src/img/20250406_175626.jpg",
          fotos: [
            "./src/img/20250406_175626.jpg"
          ]
        }
      ]
    },
    {
      id: "lott-campuzano",
      nombre: "Lott Campuzano",
      alias: "Lott",
      bio: "Creador de Openfoto y fotógrafo amateur de lo improbable: luz rara, reflejos, y todo aquello que la cámara ve antes que el ojo.",
      email: "lott.campuzano@example.com",
      web: "",
      instagram: "Lott_Campuzano",
      colecciones: [
        {
          id: "no-crei-que-existieras",
          titulo: "No creí que existieras",
          anio: 2025,
          narrativa: "Una colección sobre fenómenos que parecen trucos: nubes que se rompen en el instante exacto, reflejos que duplican la escena, colores que no deberían convivir. La fotografía como prueba de que lo extraño existe, aunque dure un segundo.",
          tecnica: "Larga exposición nocturna y experimentos con reflejos. Procesado mínimo: lo importante es lo que ya estaba enfrente del lente.",
          inspiracion: "Mi amor por la ciencia no me permitía creer, pero la ciencia sabía algo que yo no.",
          portada: "./src/img/20250405_182436 (2).jpg",
          fotos: [
            "./src/img/20250405_182436 (2).jpg"
          ]
        }
      ]
    },
    {
      id: "alejandra-avendano",
      nombre: "Alejandra Avendaño",
      alias: "Alejandra",
      bio: "Fotógrafa de memoria: retratos, objetos heredados y lugares que ya no están pero siguen habitando a alguien.",
      email: "alejandra.avendano@example.com",
      web: "",
      instagram: "ale.avendano",
      colecciones: [
        {
          id: "no-te-olvides-de-mi",
          titulo: "No te olvides de mí",
          anio: 2024,
          narrativa: "Un archivo de personas y cosas que estaban a punto de ser olvidadas: retratos de mayores, cartas guardadas, habitaciones congeladas en el tiempo. Esta colección es una forma de escuchar a quienes ya no pueden contar su propia historia.",
          tecnica: "Retrato con luz de ventana, film y digital mezclados. Sin posing: la cámara entra cuando el silencio ya se hizo costumbre.",
          inspiracion: "Estas no son solo fotografías, son la historia de quien no pudo contarla.",
          portada: "./src/img/20240920_115804.jpg",
          fotos: [
            "./src/img/20240920_115804.jpg"
          ]
        }
      ]
    }
  ],

  /* ------------------------------------------------------------------
     Invitaciones.
     Openfoto es por invitación: nadie puede publicar por su cuenta.
     El curador genera un enlace (panel.html) y se lo envía al
     fotógrafo; el enlace abre el formulario (invitacion.html?token=...).
     Los tokens listados aquí funcionan siempre que sigan activos.
     Los generados desde el panel se guardan en localStorage.
     ------------------------------------------------------------------ */
  invitaciones: [
    { token: "OPENFOTO-PILOTO-01", activo: true }
  ]
};
