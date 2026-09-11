import type { Dictionary } from "../types";

export const es: Dictionary = {
  meta: {
    title: "Jobid — Webs, aplicaciones y automatizaciones a medida",
    description:
      "Diseño y desarrollo webs de alto impacto, aplicaciones a medida y automatizaciones que eliminan trabajo manual. Un solo interlocutor, de la idea al lanzamiento.",
    ogAlt: "Jobid — estudio de diseño y desarrollo de producto digital",
  },

  nav: {
    links: [
      { href: "#servicios", label: "Servicios" },
      { href: "#proceso", label: "Proceso" },
      { href: "#trabajo", label: "Trabajo" },
      { href: "#precios", label: "Precios" },
      { href: "#faq", label: "Preguntas" },
    ],
    cta: "Empezar proyecto",
    menuOpen: "Abrir menú",
    menuClose: "Cerrar menú",
    skipToContent: "Saltar al contenido",
    langLabel: "Cambiar idioma",
  },

  hero: {
    status: "Disponible para 2 proyectos este trimestre",
    headline: ["Webs que venden.", "Sistemas que", "trabajan solos."],
    highlight: "trabajan solos.",
    lede:
      "Diseño y construyo la presencia digital de negocios que ya no caben en una plantilla. Webs a medida, aplicaciones internas y automatizaciones que devuelven horas cada semana. Sin equipos intermedios: hablas directamente con quien lo construye.",
    ctaPrimary: "Cuéntame tu proyecto",
    ctaSecondary: "Ver cómo trabajo",
    stats: [
      { value: "2-6", label: "semanas por proyecto" },
      { value: "100%", label: "código propio, sin plantillas" },
      { value: "< 24h", label: "tiempo de respuesta" },
    ],
  },

  services: {
    eyebrow: "Lo que hago",
    title: "Tres líneas de trabajo, un mismo estándar",
    lede:
      "Cada proyecto empieza entendiendo qué mueve la aguja en tu negocio. Después elegimos la herramienta, nunca al revés.",
    items: [
      {
        id: "webs",
        index: "01",
        name: "Webs de alto impacto",
        tagline: "Tu mejor comercial, trabajando 24/7",
        description:
          "Sitios diseñados para convertir, no solo para verse bien. Arquitectura de información pensada desde la duda real del cliente, rendimiento medido y posicionamiento desde el primer día.",
        bullets: [
          "Diseño original, sin plantillas reconocibles",
          "Rendimiento Core Web Vitals en verde",
          "SEO técnico y datos estructurados incluidos",
          "Panel para que edites el contenido sin tocar código",
        ],
        deliverable: "Entrega típica: 2 a 4 semanas",
      },
      {
        id: "apps",
        index: "02",
        name: "Aplicaciones web a medida",
        tagline: "El software que tu negocio necesita y no existe",
        description:
          "Paneles de control, portales de cliente, herramientas internas y productos SaaS. Cuando la hoja de cálculo se queda corta y el software genérico te obliga a trabajar a su manera.",
        bullets: [
          "Autenticación, roles y permisos desde el diseño",
          "Base de datos modelada para crecer sin reescribir",
          "Interfaz pensada para usarse ocho horas al día",
          "Despliegue continuo y entorno de pruebas",
        ],
        deliverable: "Entrega típica: 4 a 10 semanas",
      },
      {
        id: "automatizaciones",
        index: "03",
        name: "Automatizaciones e IA",
        tagline: "Deja de pagar por trabajo que una máquina hace mejor",
        description:
          "Conecto las herramientas que ya usas y elimino el copiar-pegar entre ellas. Desde flujos sencillos hasta agentes con IA que leen, clasifican y responden.",
        bullets: [
          "Integración entre CRM, facturación, correo y hojas de cálculo",
          "Procesamiento de documentos y correos con IA",
          "Informes que se generan y envían solos",
          "Alertas y control de errores para que nada se caiga en silencio",
        ],
        deliverable: "Entrega típica: 1 a 3 semanas",
      },
    ],
  },

  process: {
    eyebrow: "Cómo trabajo",
    title: "Un proceso sin sorpresas ni facturas inesperadas",
    lede:
      "Sabes en todo momento en qué punto estamos, qué falta y cuánto cuesta. Cada fase termina con algo que puedes ver y tocar.",
    steps: [
      {
        number: "01",
        name: "Diagnóstico",
        duration: "48 horas",
        description:
          "Una llamada de verdad, no una demo de ventas. Salimos con el problema definido, el alcance cerrado, el precio fijo y la fecha de entrega por escrito.",
      },
      {
        number: "02",
        name: "Diseño",
        duration: "3 a 7 días",
        description:
          "Wireframes y después diseño final navegable. Lo ves en tu navegador y en tu móvil antes de que se escriba una sola línea de producción. Dos rondas de cambios incluidas.",
      },
      {
        number: "03",
        name: "Construcción",
        duration: "1 a 8 semanas",
        description:
          "Desarrollo en abierto con un enlace de vista previa que se actualiza cada día. Ves el avance real en lugar de esperar a un lanzamiento sorpresa.",
      },
      {
        number: "04",
        name: "Lanzamiento y cuidado",
        duration: "Continuo",
        description:
          "Puesta en producción, medición, formación para tu equipo y 30 días de garantía sobre todo lo entregado. Después, mantenimiento solo si lo quieres.",
      },
    ],
  },

  work: {
    eyebrow: "El laboratorio",
    title: "Piezas construidas para demostrar, no para decorar",
    lede:
      "Prefiero enseñarte software que funciona antes que logotipos de clientes. Estos son proyectos propios: puedes abrirlos, romperlos y juzgar el criterio detrás de cada decisión.",
    disclaimer:
      "Proyectos propios de demostración. Los trabajos bajo acuerdo de confidencialidad se enseñan en llamada.",
    items: [
      {
        slug: "panel-operaciones",
        kind: "Aplicación web",
        name: "Panel de operaciones",
        summary:
          "Un centro de mando que sustituye a cinco hojas de cálculo compartidas.",
        problem:
          "Los equipos pequeños coordinan su operación en hojas de cálculo que nadie mantiene: datos duplicados, versiones en conflicto y cero trazabilidad de quién cambió qué.",
        solution:
          "Una aplicación con datos en tiempo real, permisos por rol, historial de cambios y vistas distintas para dirección y para operaciones. Importa los datos existentes sin migración manual.",
        metrics: [
          { value: "5 → 1", label: "herramientas en el flujo" },
          { value: "-70%", label: "tiempo de consolidación" },
          { value: "< 400ms", label: "carga inicial" },
        ],
        tags: ["Next.js", "PostgreSQL", "Tiempo real", "Roles"],
      },
      {
        slug: "motor-automatizacion",
        kind: "Automatización",
        name: "Motor de presupuestos",
        summary:
          "De correo entrante a presupuesto enviado, sin intervención humana.",
        problem:
          "Responder solicitudes de presupuesto consume horas: leer el correo, buscar precios, redactar, dar formato y enviar. Repetido decenas de veces cada semana.",
        solution:
          "Un flujo que lee el correo, extrae los datos con IA, los valida contra la tarifa real, genera el PDF, lo envía y lo registra en el CRM. Si algo no cuadra, avisa a una persona en lugar de inventarse la respuesta.",
        metrics: [
          { value: "22 min → 40 s", label: "por presupuesto" },
          { value: "98%", label: "extracción correcta" },
          { value: "0", label: "envíos sin validar" },
        ],
        tags: ["IA", "Integraciones", "PDF", "CRM"],
      },
      {
        slug: "sitio-conversion",
        kind: "Web",
        name: "Sitio de conversión",
        summary:
          "Una web de servicios medida contra un único objetivo: llamadas agendadas.",
        problem:
          "La mayoría de webs de servicios describen lo que la empresa hace y olvidan responder a la pregunta que frena la compra: por qué tú y no el de al lado.",
        solution:
          "Estructura construida sobre las objeciones reales del comprador, pruebas sociales colocadas donde aparece la duda y un único camino claro hacia la acción. Analítica de eventos desde el minuto uno.",
        metrics: [
          { value: "100", label: "Lighthouse rendimiento" },
          { value: "AA", label: "accesibilidad WCAG" },
          { value: "3", label: "idiomas desde el día uno" },
        ],
        tags: ["Diseño", "SEO", "Analítica", "i18n"],
      },
    ],
    cta: "Ver el caso completo",
  },

  stack: {
    eyebrow: "Herramientas",
    title: "Tecnología elegida por criterio, no por moda",
    lede:
      "Uso herramientas maduras y con comunidad grande. Si mañana desaparezco, cualquier desarrollador competente puede continuar tu proyecto sin arqueología.",
    groups: [
      {
        name: "Interfaz",
        items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Motion"],
      },
      {
        name: "Servidor y datos",
        items: ["Node.js", "PostgreSQL", "Supabase", "Prisma", "Redis"],
      },
      {
        name: "Automatización e IA",
        items: ["n8n", "API de Claude", "Zapier", "Make", "Webhooks"],
      },
      {
        name: "Infraestructura",
        items: ["Vercel", "Cloudflare", "Docker", "GitHub Actions", "Sentry"],
      },
    ],
  },

  why: {
    eyebrow: "Por qué yo",
    title: "Lo que obtienes trabajando con una sola persona",
    lede:
      "No compito con agencias de veinte personas en volumen. Compito en criterio, velocidad y en que nunca hablas con un intermediario.",
    items: [
      {
        title: "Un solo interlocutor",
        description:
          "Quien te escucha en la llamada es quien diseña, quien programa y quien responde cuando algo falla. Nada se pierde en traducciones internas.",
      },
      {
        title: "Precio cerrado antes de empezar",
        description:
          "El presupuesto se fija tras el diagnóstico y no se mueve. Si algo se complica por mi lado, es mi problema, no una factura extra en la tuya.",
      },
      {
        title: "El código es tuyo",
        description:
          "Repositorio, dominio, cuentas y documentación a tu nombre desde el primer día. Te quedas conmigo porque quieres, no porque no puedas irte.",
      },
      {
        title: "Rendimiento y accesibilidad de serie",
        description:
          "Core Web Vitals en verde, contraste verificado, navegación por teclado y respeto a quien prefiere menos animación. No son extras facturables.",
      },
      {
        title: "Construido para que lo mantengas",
        description:
          "Entrego documentación real y una sesión de formación grabada. Tu equipo puede editar contenido y entender el sistema sin depender de mí.",
      },
      {
        title: "Garantía de 30 días",
        description:
          "Cualquier fallo sobre lo acordado se corrige sin coste durante el mes siguiente a la entrega. Por escrito, en el contrato.",
      },
    ],
  },

  pricing: {
    eyebrow: "Inversión",
    title: "Precios de partida, sin letra pequeña",
    lede:
      "Cada proyecto se presupuesta a medida tras el diagnóstico. Estas cifras son el punto de entrada real de cada línea de trabajo, para que sepas si encajamos antes de escribirme.",
    note:
      "Precios en euros, sin IVA. Pago en dos partes: 50% al arrancar y 50% al entregar. Proyectos de más de 6.000 € se pueden fraccionar en mensualidades.",
    popular: "Más solicitado",
    plans: [
      {
        id: "web",
        name: "Web",
        price: "1.400 €",
        priceNote: "desde",
        description:
          "Para negocios que necesitan una presencia sólida que genere confianza y capte contactos.",
        features: [
          "Hasta 6 secciones con diseño original",
          "Adaptada a móvil, tablet y escritorio",
          "SEO técnico y datos estructurados",
          "Formulario de contacto conectado a tu correo",
          "Panel para editar textos e imágenes",
          "Analítica configurada y explicada",
          "30 días de garantía",
        ],
        cta: "Pedir presupuesto",
      },
      {
        id: "aplicacion",
        name: "Aplicación",
        price: "4.500 €",
        priceNote: "desde",
        description:
          "Para equipos que han superado las hojas de cálculo y necesitan software propio.",
        features: [
          "Todo lo de la línea Web",
          "Usuarios, roles y permisos",
          "Base de datos diseñada a medida",
          "Integración con tus herramientas actuales",
          "Entorno de pruebas separado de producción",
          "Documentación técnica y formación grabada",
          "60 días de garantía",
        ],
        cta: "Agendar diagnóstico",
        featured: true,
      },
      {
        id: "automatizacion",
        name: "Automatización",
        price: "900 €",
        priceNote: "desde",
        description:
          "Para eliminar una tarea repetitiva concreta que hoy consume horas de tu equipo.",
        features: [
          "Mapa del proceso actual y del automatizado",
          "Conexión entre tus herramientas existentes",
          "Tratamiento de documentos o correos con IA",
          "Control de errores y alertas",
          "Panel de seguimiento de ejecuciones",
          "Formación para tu equipo",
          "30 días de garantía",
        ],
        cta: "Calcular ahorro",
      },
    ],
  },

  faq: {
    eyebrow: "Antes de escribirme",
    title: "Las preguntas que siempre aparecen",
    lede: "Si la tuya no está aquí, escríbeme y la respondo sin compromiso.",
    items: [
      {
        question: "¿Cuánto tarda realmente un proyecto?",
        answer:
          "Una web entre 2 y 4 semanas, una automatización entre 1 y 3, y una aplicación entre 4 y 10 según el alcance. La fecha se cierra por escrito tras el diagnóstico y la cumplo: si me retraso por mi parte, descuento un 10% por cada semana de desvío.",
      },
      {
        question: "¿Qué necesitas de mí para empezar?",
        answer:
          "Una hora de tu tiempo para el diagnóstico y acceso a lo que ya tengas: textos, logotipo, cuentas existentes. Si no hay materiales, el copy y la identidad básica entran en el proyecto. Nunca te pido que rellenes un documento de cincuenta páginas.",
      },
      {
        question: "¿Y si no me gusta el diseño?",
        answer:
          "Verás el diseño navegable antes de que se escriba el código de producción, e incluye dos rondas de cambios. Si tras la primera propuesta consideras que no vamos en la dirección correcta, devuelvo el anticipo completo y cerramos sin coste.",
      },
      {
        question: "¿Trabajas con empresas fuera de España?",
        answer:
          "Sí. Trabajo en remoto con clientes de España y Latinoamérica, en español o en inglés, adaptándome a franjas horarias entre UTC-6 y UTC+2. Facturo en euros o en dólares.",
      },
      {
        question: "¿Quién es el dueño del código y de las cuentas?",
        answer:
          "Tú, desde el primer día. El repositorio se crea en tu organización, el dominio y los servicios se contratan a tu nombre y recibes toda la documentación. No hay dependencia forzada ni licencias que caduquen.",
      },
      {
        question: "¿Ofreces mantenimiento después de la entrega?",
        answer:
          "Es opcional. Tras la garantía puedes contratar un plan mensual de soporte y mejoras continuas, o quedarte solo con lo entregado. Muchos clientes lo llevan internamente, y esa es precisamente la idea.",
      },
      {
        question: "¿Por qué no usas WordPress o un creador visual?",
        answer:
          "Los uso cuando son la respuesta correcta, y lo digo en el diagnóstico. Pero para webs que deben ser rápidas, singulares y crecer con el negocio, el código a medida sale más barato en dos años: sin plugins que chocan, sin licencias anuales y sin límites de plataforma.",
      },
      {
        question: "¿Puedo empezar por algo pequeño?",
        answer:
          "Es lo que recomiendo. Una automatización concreta o una landing sirven para comprobar cómo trabajo con poco riesgo. La mayoría de proyectos grandes empiezan así.",
      },
    ],
  },

  contact: {
    eyebrow: "Siguiente paso",
    title: "Cuéntame qué quieres construir",
    lede:
      "Respondo en menos de 24 horas laborables con una primera valoración honesta: si encaja, cómo lo abordaría y qué rango de precio esperar. Si no encaja, te lo digo y te oriento hacia quien sí.",
    form: {
      name: "Nombre",
      namePlaceholder: "Cómo te llamas",
      email: "Correo",
      emailPlaceholder: "tu@empresa.com",
      company: "Empresa",
      companyPlaceholder: "Opcional",
      service: "Qué necesitas",
      serviceOptions: [
        "Una web",
        "Una aplicación web",
        "Una automatización",
        "Todavía no lo tengo claro",
      ],
      budget: "Presupuesto aproximado",
      budgetOptions: [
        "Menos de 1.500 €",
        "1.500 € - 5.000 €",
        "5.000 € - 15.000 €",
        "Más de 15.000 €",
        "Prefiero comentarlo",
      ],
      message: "Cuéntame el contexto",
      messagePlaceholder:
        "Qué problema quieres resolver, qué has probado ya y para cuándo lo necesitas.",
      submit: "Enviar mensaje",
      submitting: "Enviando...",
      successTitle: "Mensaje recibido",
      successBody:
        "Gracias. Te respondo en menos de 24 horas laborables desde una dirección personal, no desde un autorrespondedor.",
      errorRequired: "Este campo es obligatorio",
      errorEmail: "Introduce un correo válido",
      errorGeneric:
        "No se ha podido enviar. Escríbeme directamente a hola@jobid.ai y lo resolvemos.",
      privacy:
        "Tus datos se usan únicamente para responderte. Sin listas de correo ni terceros.",
    },
    direct: [
      { label: "Correo", value: "hola@jobid.ai", href: "mailto:hola@jobid.ai" },
      { label: "Agenda", value: "Reserva 30 minutos", href: "#contacto" },
      { label: "LinkedIn", value: "Conectar", href: "#contacto" },
    ],
  },

  footer: {
    tagline:
      "Diseño y construyo webs, aplicaciones y automatizaciones para negocios que quieren dejar de improvisar en digital.",
    sections: [
      {
        title: "Servicios",
        links: [
          { href: "#servicios", label: "Webs de alto impacto" },
          { href: "#servicios", label: "Aplicaciones a medida" },
          { href: "#servicios", label: "Automatizaciones e IA" },
        ],
      },
      {
        title: "Estudio",
        links: [
          { href: "#proceso", label: "Proceso" },
          { href: "#trabajo", label: "Trabajo" },
          { href: "#precios", label: "Precios" },
          { href: "#faq", label: "Preguntas" },
        ],
      },
      {
        title: "Contacto",
        links: [
          { href: "mailto:hola@jobid.ai", label: "hola@jobid.ai" },
          { href: "#contacto", label: "Formulario" },
        ],
      },
    ],
    rights: "Todos los derechos reservados.",
    builtWith: "Diseñado y construido a medida. Sin plantillas.",
    backToTop: "Volver arriba",
  },
};
