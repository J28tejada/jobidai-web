import type { Dictionary } from "../types";

export const en: Dictionary = {
  meta: {
    title: "Jobid — Custom websites, web apps and automation",
    description:
      "I design and build high-impact websites, custom web applications and automations that remove manual work. One point of contact, from idea to launch.",
    ogAlt: "Jobid — digital product design and development studio",
  },

  nav: {
    links: [
      { href: "#servicios", label: "Services" },
      { href: "#proceso", label: "Process" },
      { href: "#trabajo", label: "Work" },
      { href: "#precios", label: "Pricing" },
      { href: "#faq", label: "FAQ" },
    ],
    cta: "Start a project",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    skipToContent: "Skip to content",
    langLabel: "Change language",
  },

  hero: {
    status: "Available for 2 projects this quarter",
    headline: ["Websites that sell.", "Systems that", "run themselves."],
    highlight: "run themselves.",
    lede:
      "I design and build the digital presence of businesses that have outgrown templates. Custom websites, internal applications and automations that give hours back every week. No account managers in between: you talk directly to the person building it.",
    ctaPrimary: "Tell me about your project",
    ctaSecondary: "See how I work",
    stats: [
      { value: "2-6", label: "weeks per project" },
      { value: "100%", label: "custom code, no templates" },
      { value: "< 24h", label: "response time" },
    ],
  },

  services: {
    eyebrow: "What I do",
    title: "Three lines of work, one standard",
    lede:
      "Every project starts by understanding what actually moves the needle for your business. The tool comes second, never first.",
    items: [
      {
        id: "webs",
        index: "01",
        name: "High-impact websites",
        tagline: "Your best salesperson, working 24/7",
        description:
          "Sites designed to convert, not just to look good. Information architecture built around your customer's real hesitation, measured performance, and search visibility from day one.",
        bullets: [
          "Original design, no recognisable templates",
          "Core Web Vitals in the green",
          "Technical SEO and structured data included",
          "A dashboard so you can edit content without touching code",
        ],
        deliverable: "Typical delivery: 2 to 4 weeks",
      },
      {
        id: "apps",
        index: "02",
        name: "Custom web applications",
        tagline: "The software your business needs and nobody sells",
        description:
          "Dashboards, client portals, internal tools and SaaS products. For when the spreadsheet runs out of road and off-the-shelf software forces you to work its way.",
        bullets: [
          "Authentication, roles and permissions designed in",
          "A data model built to grow without a rewrite",
          "An interface meant to be used eight hours a day",
          "Continuous deployment and a staging environment",
        ],
        deliverable: "Typical delivery: 4 to 10 weeks",
      },
      {
        id: "automatizaciones",
        index: "03",
        name: "Automation and AI",
        tagline: "Stop paying for work a machine does better",
        description:
          "I connect the tools you already use and remove the copy-paste between them. From simple flows to AI agents that read, classify and respond.",
        bullets: [
          "Integration across CRM, invoicing, email and spreadsheets",
          "Document and email processing with AI",
          "Reports that generate and send themselves",
          "Alerting and error handling so nothing fails silently",
        ],
        deliverable: "Typical delivery: 1 to 3 weeks",
      },
    ],
  },

  process: {
    eyebrow: "How I work",
    title: "A process with no surprises and no surprise invoices",
    lede:
      "You always know where we are, what's left and what it costs. Every phase ends with something you can see and click.",
    steps: [
      {
        number: "01",
        name: "Diagnosis",
        duration: "48 hours",
        description:
          "A real conversation, not a sales demo. We come out of it with the problem defined, the scope closed, a fixed price and a delivery date in writing.",
      },
      {
        number: "02",
        name: "Design",
        duration: "3 to 7 days",
        description:
          "Wireframes first, then a clickable final design. You see it in your browser and on your phone before a single line of production code exists. Two rounds of changes included.",
      },
      {
        number: "03",
        name: "Build",
        duration: "1 to 8 weeks",
        description:
          "Development in the open, with a preview link that updates daily. You watch real progress instead of waiting for a surprise launch.",
      },
      {
        number: "04",
        name: "Launch and care",
        duration: "Ongoing",
        description:
          "Going live, measurement, training for your team and a 30-day warranty on everything delivered. After that, maintenance only if you want it.",
      },
    ],
  },

  work: {
    eyebrow: "The lab",
    title: "Pieces built to prove a point, not to decorate",
    lede:
      "I would rather show you software that works than a wall of client logos. These are my own projects: open them, break them, and judge the thinking behind every decision.",
    disclaimer:
      "Self-initiated demonstration projects. Work under NDA is shown on a call.",
    items: [
      {
        slug: "panel-operaciones",
        kind: "Web application",
        name: "Operations dashboard",
        summary: "A command centre that replaces five shared spreadsheets.",
        problem:
          "Small teams run their operation on spreadsheets nobody maintains: duplicated data, conflicting versions and no trace of who changed what.",
        solution:
          "An application with live data, role-based permissions, a change history and separate views for leadership and for operations. It imports existing data without manual migration.",
        metrics: [
          { value: "5 → 1", label: "tools in the flow" },
          { value: "-70%", label: "time spent consolidating" },
          { value: "< 400ms", label: "initial load" },
        ],
        tags: ["Next.js", "PostgreSQL", "Real time", "Roles"],
      },
      {
        slug: "motor-automatizacion",
        kind: "Automation",
        name: "Quoting engine",
        summary: "From inbound email to sent quote, with no human in the loop.",
        problem:
          "Answering quote requests eats hours: read the email, look up prices, write it, format it, send it. Repeated dozens of times a week.",
        solution:
          "A flow that reads the email, extracts the data with AI, validates it against the real price list, generates the PDF, sends it and logs it in the CRM. When something doesn't add up it flags a human instead of inventing an answer.",
        metrics: [
          { value: "22 min → 40 s", label: "per quote" },
          { value: "98%", label: "extraction accuracy" },
          { value: "0", label: "unvalidated sends" },
        ],
        tags: ["AI", "Integrations", "PDF", "CRM"],
      },
      {
        slug: "sitio-conversion",
        kind: "Website",
        name: "Conversion site",
        summary: "A services site measured against one goal: booked calls.",
        problem:
          "Most service websites describe what the company does and forget to answer the question that stalls the sale: why you and not the next one.",
        solution:
          "A structure built on the buyer's real objections, social proof placed exactly where the doubt appears, and a single clear path to action. Event analytics from minute one.",
        metrics: [
          { value: "100", label: "Lighthouse performance" },
          { value: "AA", label: "WCAG accessibility" },
          { value: "3", label: "languages from day one" },
        ],
        tags: ["Design", "SEO", "Analytics", "i18n"],
      },
    ],
    cta: "Read the full case",
  },

  stack: {
    eyebrow: "Tooling",
    title: "Technology chosen on judgement, not on hype",
    lede:
      "I use mature tools with large communities. If I disappeared tomorrow, any competent developer could pick your project up without an archaeology dig.",
    groups: [
      {
        name: "Interface",
        items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Motion"],
      },
      {
        name: "Server and data",
        items: ["Node.js", "PostgreSQL", "Supabase", "Prisma", "Redis"],
      },
      {
        name: "Automation and AI",
        items: ["n8n", "Claude API", "Zapier", "Make", "Webhooks"],
      },
      {
        name: "Infrastructure",
        items: ["Vercel", "Cloudflare", "Docker", "GitHub Actions", "Sentry"],
      },
    ],
  },

  why: {
    eyebrow: "Why me",
    title: "What you get by working with one person",
    lede:
      "I don't compete with twenty-person agencies on volume. I compete on judgement, speed, and the fact that you never talk to a middleman.",
    items: [
      {
        title: "One point of contact",
        description:
          "The person listening on the call is the one designing, writing the code and answering when something breaks. Nothing is lost in internal translation.",
      },
      {
        title: "Fixed price before we start",
        description:
          "The quote is set after the diagnosis and doesn't move. If something gets harder on my side, that's my problem, not an extra line on your invoice.",
      },
      {
        title: "The code is yours",
        description:
          "Repository, domain, accounts and documentation in your name from day one. You stay because you want to, not because you can't leave.",
      },
      {
        title: "Performance and accessibility as standard",
        description:
          "Core Web Vitals in the green, verified contrast, keyboard navigation and respect for people who prefer less motion. These are not billable extras.",
      },
      {
        title: "Built for you to maintain",
        description:
          "You get real documentation and a recorded training session. Your team can edit content and understand the system without depending on me.",
      },
      {
        title: "30-day warranty",
        description:
          "Anything that doesn't match what we agreed gets fixed at no cost for a month after delivery. In writing, in the contract.",
      },
    ],
  },

  pricing: {
    eyebrow: "Investment",
    title: "Starting prices, no small print",
    lede:
      "Every project is quoted individually after the diagnosis. These are the real entry points for each line of work, so you know whether we're a fit before you write to me.",
    note:
      "Prices in euros, excluding VAT. Paid in two parts: 50% to start, 50% on delivery. Projects above €6,000 can be split into monthly payments.",
    popular: "Most requested",
    plans: [
      {
        id: "web",
        name: "Website",
        price: "€1,400",
        priceNote: "from",
        description:
          "For businesses that need a solid presence that builds trust and captures leads.",
        features: [
          "Up to 6 sections with original design",
          "Built for mobile, tablet and desktop",
          "Technical SEO and structured data",
          "Contact form wired to your inbox",
          "Dashboard to edit copy and images",
          "Analytics configured and explained",
          "30-day warranty",
        ],
        cta: "Request a quote",
      },
      {
        id: "aplicacion",
        name: "Application",
        price: "€4,500",
        priceNote: "from",
        description:
          "For teams that have outgrown spreadsheets and need software of their own.",
        features: [
          "Everything in the Website tier",
          "Users, roles and permissions",
          "A data model designed for you",
          "Integration with your current tools",
          "Staging environment separate from production",
          "Technical documentation and recorded training",
          "60-day warranty",
        ],
        cta: "Book a diagnosis",
        featured: true,
      },
      {
        id: "automatizacion",
        name: "Automation",
        price: "€900",
        priceNote: "from",
        description:
          "To remove one specific repetitive task that eats your team's hours today.",
        features: [
          "A map of the current and automated process",
          "Connection between your existing tools",
          "Document or email processing with AI",
          "Error handling and alerting",
          "A dashboard to monitor every run",
          "Training for your team",
          "30-day warranty",
        ],
        cta: "Calculate the saving",
      },
    ],
  },

  faq: {
    eyebrow: "Before you write",
    title: "The questions that always come up",
    lede: "If yours isn't here, write to me and I'll answer with no strings attached.",
    items: [
      {
        question: "How long does a project actually take?",
        answer:
          "A website takes 2 to 4 weeks, an automation 1 to 3, and an application 4 to 10 depending on scope. The date is fixed in writing after the diagnosis and I keep it: if I slip on my side, I take 10% off for every week of delay.",
      },
      {
        question: "What do you need from me to start?",
        answer:
          "An hour of your time for the diagnosis and access to whatever you already have: copy, logo, existing accounts. If there are no materials, basic copy and identity are part of the project. I will never ask you to fill in a fifty-page brief.",
      },
      {
        question: "What if I don't like the design?",
        answer:
          "You see a clickable design before any production code is written, and it includes two rounds of changes. If after the first proposal you feel we're heading the wrong way, I refund the deposit in full and we close it at no cost.",
      },
      {
        question: "Do you work with companies outside Spain?",
        answer:
          "Yes. I work remotely with clients across Spain and Latin America, in Spanish or English, covering time zones between UTC-6 and UTC+2. I invoice in euros or dollars.",
      },
      {
        question: "Who owns the code and the accounts?",
        answer:
          "You do, from day one. The repository is created in your organisation, the domain and services are registered in your name, and you receive all the documentation. No forced dependency, no expiring licences.",
      },
      {
        question: "Do you offer maintenance after delivery?",
        answer:
          "It's optional. After the warranty you can take a monthly support and improvement plan, or keep just what was delivered. Plenty of clients run it in-house, and that's exactly the point.",
      },
      {
        question: "Why not WordPress or a visual builder?",
        answer:
          "I use them when they're the right answer, and I say so during the diagnosis. But for sites that need to be fast, distinctive and grow with the business, custom code is cheaper over two years: no clashing plugins, no annual licences, no platform ceiling.",
      },
      {
        question: "Can I start with something small?",
        answer:
          "That's what I recommend. One specific automation or a landing page is a low-risk way to see how I work. Most large projects start exactly like that.",
      },
    ],
  },

  contact: {
    eyebrow: "Next step",
    title: "Tell me what you want to build",
    lede:
      "I reply within 24 working hours with an honest first read: whether it fits, how I'd approach it and what price range to expect. If it doesn't fit, I'll say so and point you to someone it does.",
    form: {
      name: "Name",
      namePlaceholder: "What should I call you",
      email: "Email",
      emailPlaceholder: "you@company.com",
      company: "Company",
      companyPlaceholder: "Optional",
      service: "What you need",
      serviceOptions: [
        "A website",
        "A web application",
        "An automation",
        "Not sure yet",
      ],
      budget: "Approximate budget",
      budgetOptions: [
        "Under €1,500",
        "€1,500 - €5,000",
        "€5,000 - €15,000",
        "Over €15,000",
        "I'd rather discuss it",
      ],
      message: "Give me the context",
      messagePlaceholder:
        "What problem you want to solve, what you've already tried, and when you need it.",
      submit: "Send message",
      submitting: "Sending...",
      successTitle: "Message received",
      successBody:
        "Thank you. I'll reply within 24 working hours from a personal address, not an autoresponder.",
      errorRequired: "This field is required",
      errorEmail: "Enter a valid email address",
      errorGeneric:
        "That didn't send. Write to me directly at hola@jobid.ai and we'll sort it out.",
      privacy:
        "Your details are used only to reply to you. No mailing lists, no third parties.",
    },
    direct: [
      { label: "Email", value: "hola@jobid.ai", href: "mailto:hola@jobid.ai" },
      { label: "Calendar", value: "Book 30 minutes", href: "#contacto" },
      { label: "LinkedIn", value: "Connect", href: "#contacto" },
    ],
  },

  footer: {
    tagline:
      "I design and build websites, applications and automations for businesses ready to stop improvising online.",
    sections: [
      {
        title: "Services",
        links: [
          { href: "#servicios", label: "High-impact websites" },
          { href: "#servicios", label: "Custom applications" },
          { href: "#servicios", label: "Automation and AI" },
        ],
      },
      {
        title: "Studio",
        links: [
          { href: "#proceso", label: "Process" },
          { href: "#trabajo", label: "Work" },
          { href: "#precios", label: "Pricing" },
          { href: "#faq", label: "FAQ" },
        ],
      },
      {
        title: "Contact",
        links: [
          { href: "mailto:hola@jobid.ai", label: "hola@jobid.ai" },
          { href: "#contacto", label: "Contact form" },
        ],
      },
    ],
    rights: "All rights reserved.",
    builtWith: "Designed and built from scratch. No templates.",
    backToTop: "Back to top",
  },
};
