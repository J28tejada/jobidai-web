/** Forma del diccionario. `es` es la fuente de verdad; `en` debe satisfacerla. */
export type Dictionary = {
  meta: {
    title: string;
    description: string;
    ogAlt: string;
  };
  nav: {
    links: { href: string; label: string }[];
    cta: string;
    menuOpen: string;
    menuClose: string;
    skipToContent: string;
    langLabel: string;
  };
  hero: {
    status: string;
    headline: string[];
    highlight: string;
    lede: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stats: { value: string; label: string }[];
  };
  services: {
    eyebrow: string;
    title: string;
    lede: string;
    items: {
      id: string;
      index: string;
      name: string;
      tagline: string;
      description: string;
      bullets: string[];
      deliverable: string;
    }[];
  };
  dolores: {
    eyebrow: string;
    title: string;
    lede: string;
    items: {
      id: string;
      titulo: string;
      descripcion: string;
      /** Dato de mercado que respalda el dolor. Opcional. */
      dato?: string;
      fuente?: string;
    }[];
  };

  sectores: {
    eyebrow: string;
    title: string;
    lede: string;
    nota: string;
    hoyLabel: string;
    construyoLabel: string;
    items: {
      id: string;
      nombre: string;
      hoy: string;
      construyo: string[];
      entrada: string;
    }[];
  };

  process: {
    eyebrow: string;
    title: string;
    lede: string;
    steps: { number: string; name: string; duration: string; description: string }[];
  };
  work: {
    eyebrow: string;
    title: string;
    lede: string;
    disclaimer: string;
    items: {
      slug: string;
      kind: string;
      name: string;
      summary: string;
      problem: string;
      solution: string;
      metrics: { value: string; label: string }[];
      tags: string[];
      /** Ruta de la demo navegable, si existe. Sin ella la tarjeta no enlaza. */
      href?: string;
    }[];
    cta: string;
    ctaSinDemo: string;
  };
  stack: {
    eyebrow: string;
    title: string;
    lede: string;
    groups: { name: string; items: string[] }[];
  };
  why: {
    eyebrow: string;
    title: string;
    lede: string;
    items: { title: string; description: string }[];
  };
  pricing: {
    eyebrow: string;
    title: string;
    lede: string;
    note: string;
    popular: string;
    plans: {
      id: string;
      name: string;
      price: string;
      priceNote: string;
      description: string;
      features: string[];
      cta: string;
      featured?: boolean;
    }[];
  };
  faq: {
    eyebrow: string;
    title: string;
    lede: string;
    items: { question: string; answer: string }[];
  };
  contact: {
    eyebrow: string;
    title: string;
    lede: string;
    form: {
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      company: string;
      companyPlaceholder: string;
      service: string;
      serviceOptions: string[];
      budget: string;
      budgetOptions: string[];
      message: string;
      messagePlaceholder: string;
      submit: string;
      submitting: string;
      successTitle: string;
      successBody: string;
      errorRequired: string;
      errorEmail: string;
      errorGeneric: string;
      privacy: string;
    };
    direct: { label: string; value: string; href: string }[];
  };
  laboratorio: {
    motorPresupuestos: {
      meta: { title: string; description: string };
      eyebrow: string;
      titulo: string;
      lede: string;
      volver: string;
      entrada: {
        titulo: string;
        etiqueta: string;
        placeholder: string;
        ejecutar: string;
        ejecutando: string;
        limpiar: string;
        ejemplos: string;
        contador: string;
      };
      ejemplos: { id: string; etiqueta: string; nota: string; texto: string }[];
      etapas: { entrada: string; extraccion: string; validacion: string; decision: string };
      resultado: {
        presupuestoTitulo: string;
        escaladoTitulo: string;
        escaladoLede: string;
        necesita: string;
        avisos: string;
        concepto: string;
        medicion: string;
        precio: string;
        importe: string;
        subtotal: string;
        residuos: string;
        base: string;
        iva: string;
        total: string;
        orientativo: string;
        validez: string;
        descargar: string;
        descargando: string;
        crmTitulo: string;
        crmNota: string;
        vacio: string;
        error: string;
      };
      traza: { titulo: string; nota: string; ver: string; ocultar: string };
      comoFunciona: { titulo: string; items: { titulo: string; texto: string }[] };
      honestidad: { titulo: string; realTitulo: string; real: string[]; simuladoTitulo: string; simulado: string[] };
      evaluacion: {
        titulo: string;
        lede: string;
        filas: { etiqueta: string; valor: string; nota: string }[];
        limitacionesTitulo: string;
        limitaciones: string[];
      };
    };
  };

  footer: {
    tagline: string;
    sections: { title: string; links: { href: string; label: string }[] }[];
    rights: string;
    builtWith: string;
    backToTop: string;
  };
};
