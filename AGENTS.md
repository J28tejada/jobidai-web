<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

<!-- BEGIN:jobid-project-rules -->

# Convenciones de este proyecto

## Texto visible
Nunca escribas texto de interfaz dentro de un componente. Todo va a
`src/lib/i18n/dictionaries/es.ts` y `en.ts`. El tipo `Dictionary` en
`src/lib/i18n/types.ts` fuerza que ambos idiomas coincidan: si añades una clave
a uno y no al otro, el build falla. Eso es intencional.

## Tono y mercado
El público es micro y pequeño negocio de América Latina y negocios latinos en
Estados Unidos. El español es **latinoamericano**, nunca de España: "computadora"
y no "ordenador", "celular" y no "móvil", "cotización" y no "presupuesto",
"tú/ustedes" y nunca "vosotros". Los precios van en dólares. Antes de escribir
copy, lee `docs/estrategia-comercial.md`: ahí están el posicionamiento, los
dolores con sus datos y los sectores.

## Estilos
Los tokens viven en `@theme` dentro de `src/app/globals.css`. No introduzcas
valores de color en crudo en los componentes: si necesitas un color nuevo,
añade el token. La marca son dos colores, `azure-*` (azul) y `violeta-*`
(morado); `alerta-*` (ámbar) es solo para avisos y escalados, nunca decorativo.
Ojo: `bg-azure-500` con texto oscuro da 4.34:1 y NO pasa AA — usa la utilidad
`bg-marca` con texto blanco (5.2:1) para cualquier elemento de acción. El ritmo vertical de las secciones lo fija el componente
`Section`, no clases sueltas de padding.

## Contraste
`--color-text`, `--color-muted` y `--color-faint` están calibrados para superar
4.5:1 sobre canvas, sección tintada y tarjeta. Si los cambias, vuelve a medir
con axe-core antes de dar el cambio por bueno.

## Movimiento
Toda animación comprueba `useReducedMotion()` (o usa `motion-safe:`). El estado
por defecto con movimiento reducido es el contenido **visible en su posición
final**, nunca `opacity: 0`.

## Verificación antes de dar algo por terminado
1. `npx tsc --noEmit`
2. `npm run build`
3. Revisión visual real en el navegador, no solo compilación correcta
4. axe-core sobre `/es` y `/en` con `prefers-reduced-motion: reduce`

<!-- END:jobid-project-rules -->
