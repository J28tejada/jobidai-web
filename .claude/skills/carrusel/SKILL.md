---
name: carrusel
description: Produce carruseles de Instagram y LinkedIn con el sistema de diseño de Jobid — 1080x1350, tipografía de marca incrustada, publicados como canvas editable con la skill design. Úsala para cualquier post de imagen de captación, no solo carruseles.
---

# Carruseles de captación

Produce el contenido de imagen que trae leads. Es el formato principal de
captación: el video quedó en pausa.

Cada carrusel vive en `marketing/carruseles/<nombre>/`. Lo único versionado es
`generar.py`; las diapositivas se regeneran. El primero,
`marketing/carruseles/mensaje-de-las-11/`, es la base: **para uno nuevo, copia
esa carpeta y cambia el copy.** No empieces de cero.

## El formato

**1080 × 1350 px (4:5).** Es la proporción vertical máxima que Instagram
permite en el feed: ocupa más pantalla que el cuadrado y se lee mejor en
celular. Usa el mismo tamaño para LinkedIn.

## Las fuentes se incrustan. No es opcional

El canvas exporta a PNG **sin incrustar fuentes de Google**, y el PNG es lo que
se sube. Si las diapositivas cargan la tipografía por `<link>`, lo exportado
sale con otra fuente y no se parece a lo que viste en pantalla.

Por eso `generar.py` toma las fuentes que Next ya dejó cacheadas del build, las
subsetea a los caracteres del copy (68 KB → 42 KB) y las mete como `data:` URI
en cada diapositiva. Necesita `npm run build` hecho antes y
`pip install fonttools brotli`.

Los nombres de archivo de las fuentes se resuelven leyendo el CSS generado, no
fijos: Next les cambia el hash en cada build.

## Tokens de marca

Los mismos de `src/app/globals.css`. No inventes colores nuevos:

| Uso | Valor |
| --- | --- |
| Fondo | `#070910` (ink-950) |
| Superficie elevada | `#171b28` (ink-800) |
| Texto | `#f7f8fc` · apagado `#b0b6c9` · tenue `#8b92a8` |
| Degradado de texto | `#8fbce6` → `#3b9ae1` → `#9b7fd4` |
| Degradado de fondo (CTA) | `#106ebe` → `#6e4cae` |
| Display | Bricolage Grotesque |
| Cuerpo | Geist |

El degradado se usa **en una o dos palabras** del titular, nunca en la frase
completa: marca el énfasis. Si todo brilla, nada brilla.

## El arco de 7 diapositivas

El que ya está probado en `mensaje-de-las-11`:

| # | Función | Regla |
| --- | --- | --- |
| 1 | **Gancho** | La frase que detiene el scroll. Sin saludo, sin logo grande, sin "hoy les traigo" |
| 2 | **La escena** | El momento concreto, reconocible. Un chat, un mostrador, una hora del día |
| 3 | **La consecuencia** | Qué se perdió. Un número grande funciona muy bien aquí |
| 4 | **El dato** | La cifra respaldada que convierte la anécdota en patrón |
| 5 | **La absolución** | "No es descuido." El dueño tiene que sentir que no lo estás regañando |
| 6 | **La solución** | Qué hace el sistema, en tres líneas. Sin jerga |
| 7 | **El CTA** | Uno solo: escríbeme y te digo si tiene arreglo |

La diapositiva 5 es la que más se salta y la que más importa. Un carrusel que
va del problema directo a la venta se lee como reclamo; el dueño se defiende y
no escribe. Absolverlo primero es lo que lo deja abierto a la solución.

Un post suelto (no carrusel) es la diapositiva 1 y la 7 en una sola imagen.

## Regla dura: ningún número inventado

La misma de `contenido`. Solo se citan cifras que estén en
`docs/estrategia-comercial.md` §2 o §3, que tienen su fuente al final del
documento. Nada de porcentajes inventados, resultados de clientes que no
existen, ni casos presentados como reales.

**Y no atribuyas una fuente que no esté fijada en el documento.** El "hasta 8
veces más" está en §2.1 pero el documento no dice de dónde sale: por eso en el
carrusel va sin atribución. Si quieres citarla sobre la imagen, primero se fija
en el documento.

Cuando no haya dato, usa una escena. "Te escribieron a las 11:14 p.m." no
necesita estadística.

## Tampoco enseñes funcionando lo que no existe

Se puede **vender** el WhatsApp que contesta solo; describirlo en texto es
legítimo. Lo que no se puede es simular una captura del sistema respondiendo
mientras no exista. Enseñar un producto falso se descubre en la primera
conversación.

## Revisión visual, obligatoria

El `--check` del canvas solo prueba que el archivo parsea. **Hay que mirar las
diapositivas.** Están renderizables sin el editor porque son estáticas: se
extrae el `<style>` del `<helmet>` y el contenido entre `<x-dc>`, y se abre en
Chromium a 1080×1350.

Qué buscar, en este orden:

1. **Desbordamiento.** `scrollHeight` tiene que ser exactamente 1350. Si se
   pasa, el texto está cortado en el PNG.
2. **La medida de línea.** Los párrafos van a ~30 caracteres. Con menos, el
   texto rompe tan pronto que media diapositiva queda vacía y parece error de
   maqueta — pasó en la primera versión y hubo que arreglarlo.
3. **Las siete juntas**, en una hoja de contactos. Los problemas de ritmo solo
   se ven comparando: una diapositiva con el doble de texto que el resto rompe
   la serie.
4. **El nombre del negocio y las cifras**, leídos uno por uno.

## Publicar

Con la skill `design`: cada diapositiva es un artboard, `canvas.json` las
acomoda en filas, y el canvas publicado permite exportar cada una a PNG.

- `--artboard` por diapositiva, la primera llamada `Main.dc.html`.
- Título y nombre de archivo = como se llama el carrusel, no "carrusel1".
- Se publica con `contract: "0.1.31"` y las capacidades que liste el roster.

## Qué NO hacer

- **Nada de emoji decorativo** ni iconos de dingbat. Los iconos se dibujan como
  SVG en línea, con trazo, para que escalen y se recoloreen.
- **No pongas precio en un carrusel de captación.** El CTA es el diagnóstico
  gratis. El precio sale en la conversación.
- **No metas tres llamadas a la acción.** Una.
- **No uses el degradado como fondo completo.** Es acento, no papel tapiz: es
  la diferencia entre verse de marca y verse de plantilla de Canva.
