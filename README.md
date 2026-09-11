# Jobid — sitio de captación

Portafolio y sitio comercial para tres líneas de negocio: webs a medida,
aplicaciones web y automatizaciones. Bilingüe (ES/EN), sin plantillas y
construido para que el propio sitio sea la demostración del servicio.

## Puesta en marcha

```bash
npm install
cp .env.example .env.local   # rellena las variables
npm run dev                  # http://localhost:3000
```

`/` redirige al idioma del navegador. Las rutas reales son `/es` y `/en`.

## Comandos

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm start` | Sirve el build |
| `npm run lint` | ESLint |
| `npm run typecheck` | Comprobación de tipos |
| `npm run eval:extractor` | Evalúa el analizador del laboratorio |
| `npm run audit:a11y` | Auditoría WCAG sobre el sitio servido |

## Arquitectura

```
src/
  app/
    [locale]/            Layout raíz e inicio. Genera /es y /en en estático.
      layout.tsx         Fuentes, metadatos, hreflang, cabecera y pie
      page.tsx           Composición de secciones + JSON-LD
      opengraph-image.tsx  Imagen social generada en el servidor
    api/contact/         Endpoint del formulario
    globals.css          DESIGN SYSTEM: todos los tokens viven aquí
    sitemap.ts robots.ts
  components/
    site/                Cabecera, pie, cambio de idioma, marca
    sections/            Una sección de la página por archivo
    ui/                  Primitivas reutilizables (Section, Reveal, Button…)
  lib/
    i18n/                Configuración, tipos y diccionarios ES/EN
    seo.ts               URL base y datos estructurados
  proxy.ts               Detección de idioma y redirección
```

### Diccionarios

Todo el texto visible vive en `src/lib/i18n/dictionaries/`. `es.ts` es la
fuente de verdad: el tipo `Dictionary` obliga a que `en.ts` tenga exactamente
la misma forma, así que **es imposible olvidar una traducción** — el proyecto
no compila si falta una clave.

Para cambiar un texto no toques los componentes: edita el diccionario.

### Design system

`src/app/globals.css` concentra color, tipografía, radios, curvas de
movimiento y utilidades de composición. Cambiar la identidad visual del sitio
entero es editar los tokens `--color-ember-*` y `--color-ink-*`.

La escala tipográfica es fluida (`clamp`): interpola entre 360 px y 1440 px de
viewport, sin saltos por breakpoint.

**Contraste:** los tres niveles de texto (`--color-text`, `--color-muted`,
`--color-faint`) superan 4.5:1 sobre todos los fondos del sitio. Están medidos
con axe-core. Si oscureces alguno, vuelve a medir antes de dar por bueno el
cambio.

### Movimiento

`prefers-reduced-motion` se respeta en toda la interfaz: las animaciones de
entrada se anulan y el contenido aparece en su posición final, nunca invisible.
Las primitivas `Reveal`, `Magnetic` y `SystemDiagram` comprueban la preferencia
antes de animar.

## Laboratorio: motor de presupuestos

Demostración funcional en `/[locale]/laboratorio/motor-de-presupuestos`. Un
mensaje de cliente entra como texto libre y sale un presupuesto calculado
contra baremo, o un escalado a persona si algo no cuadra.

### La decisión que lo sostiene

**El analizador lee. El código decide.** El extractor solo identifica qué se
pide y cuánto se mide; nunca produce un precio. El importe lo calcula
`motor.ts` de forma determinista contra el baremo. Por eso un mensaje
malicioso no puede alterar una factura: quien lee y quien cobra son piezas
distintas. Pruébalo con el ejemplo «Intento de manipulación».

### Piezas

```
src/lib/laboratorio/presupuestos/
  tipos.ts       Dominio. Incluye la interfaz Extractor
  baremo.ts      Precios unitarios, motivos de visita, rangos por estancia
  extractor.ts   Analizador de reglas (implementa Extractor)
  validador.ts   Única puerta al cálculo: sin pasar por aquí no hay importe
  motor.ts       Aritmética pura sobre una extracción ya validada
  pipeline.ts    Orquesta las cuatro etapas y produce la traza
  pdf.ts         Documento del presupuesto
  eval/          Set de desarrollo y set retenido
```

`Extractor` es una costura deliberada: hoy lo implementan reglas, mañana puede
implementarlo un modelo de lenguaje sin tocar el resto del motor.

### Evaluación

```bash
npm run eval:extractor
```

Mide dos conjuntos por separado:

- **Set de desarrollo** (26 casos), escrito junto al extractor. Da 100%, que
  no prueba nada: mide que el sistema hace lo que su autor esperaba.
- **Set retenido** (14 casos), escrito después de cerrar el extractor y con
  lo que *debería* hacer un sistema competente, no con lo que hace el
  nuestro. **Esta es la cifra que se publica.**

Si el número baja tras un cambio, se publica más bajo. Las limitaciones
conocidas están listadas en la propia página, no escondidas.

### Qué es real y qué no

Funcionan de verdad la lectura, la validación, el cálculo, el PDF y la traza.
Están simulados la bandeja de entrada, el envío al cliente y la escritura en
el CRM (se muestra el payload, no se envía). La página lo dice.

### Límites operativos

`POST /api/laboratorio/presupuesto` acepta 4.000 caracteres y 20 peticiones
por IP y minuto; la ruta del PDF, 10. El limitador vive en memoria, así que
en serverless es por instancia: frena el abuso casual, no un ataque real.

## Formulario de contacto

`POST /api/contact` valida en servidor (no confía en el navegador), aplica un
campo trampa antispam, limita a 5 envíos por IP y minuto, y envía por Resend.

Sin `RESEND_API_KEY`, `CONTACT_TO_EMAIL` y `CONTACT_FROM_EMAIL` responde
`503 not_configured` y la interfaz muestra el correo directo. Es intencional:
nunca se finge un envío correcto.

## Accesibilidad

Auditado con axe-core (WCAG 2.1 A y AA) sobre inicio y laboratorio, en ambos
idiomas: **0 incumplimientos**. Se ejecuta con `npm run audit:a11y` contra el
sitio ya servido.

- Enlace de salto al contenido
- Foco visible en todos los elementos interactivos
- Menú móvil con cierre por `Escape` y bloqueo de scroll
- Acordeón de preguntas con `<details>` nativo: funciona sin JavaScript
- Formulario con etiquetas asociadas, `aria-invalid` y errores anunciados

Para re-auditar tras un cambio, sirve el build y ejecuta axe-core contra `/es`
y `/en` con `prefers-reduced-motion` activo (así se audita también el contenido
que de otro modo estaría oculto esperando su animación de entrada).

## SEO

- `/es` y `/en` pre-renderizadas en estático
- `hreflang` recíproco más `x-default`
- Canonical por idioma
- JSON-LD: `ProfessionalService`, `WebSite` y `FAQPage`
- `sitemap.xml` y `robots.txt` generados
- Imagen Open Graph generada en el servidor por idioma

## Despliegue

Pensado para Vercel: importa el repositorio, añade las variables de
`.env.example` y despliega. `NEXT_PUBLIC_SITE_URL` debe ser el dominio final o
los canonical y el sitemap apuntarán a otro sitio.

## Pendiente

- Conectar `RESEND_API_KEY` para que el formulario envíe de verdad
- Sustituir los enlaces provisionales de agenda y LinkedIn en `contact.direct`
  (ambos diccionarios)
- Construir las otras dos demos del laboratorio: siguen siendo descripciones
  sin software detrás, a diferencia del motor de presupuestos
- Mejorar el analizador en lo que hoy falla: faltas de ortografía y pronombres
