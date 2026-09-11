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
    }[];
    cta: string;
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
  footer: {
    tagline: string;
    sections: { title: string; links: { href: string; label: string }[] }[];
    rights: string;
    builtWith: string;
    backToTop: string;
  };
};
