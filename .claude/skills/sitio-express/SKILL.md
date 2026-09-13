---
name: sitio-express
description: Genera el sitio de una página que se regala a un negocio local (la oferta gancho de docs/estrategia-comercial.md §6). Úsala cuando haya que armar una vista previa gratis para un negocio concreto a partir de su nombre, rubro y ciudad, publicarla como enlace temporal y despublicarla a los 7 días.
---

# Sitio express

Arma en minutos el sitio de una página que se **regala** a un negocio local, se
entrega como vista previa temporal y se despublica a los 7 días si no hay
respuesta. Es la pieza que en el video original hacía "AI Studio" de
GoHighLevel.

El contexto comercial completo está en `docs/estrategia-comercial.md` §6: los
mensajes del grupo de Facebook, el de entrega y el de cierre salen de ahí, no
de este archivo. Aquí está solo **cómo se construye el sitio**.

La regla económica que manda sobre todo lo demás: esto es trabajo sin cobrar.
**Presupuesto: 20–30 minutos por sitio.** Si te pasas de ahí afinando detalles
para alguien que todavía no ha pagado nada, el número no cuadra. Un sitio
correcto y sobrio entregado hoy vale más que uno perfecto la semana que viene.

## Regla dura: nada inventado

Un solo dato falso en un sitio bonito destruye la confianza de un golpe, y no
hay segunda oportunidad. **Nunca escribas un dato que no hayas visto.** En
particular, jamás inventes:

- años de fundación ("desde 1998"), ni antigüedad de ningún tipo
- certificaciones, licencias, premios, afiliaciones
- cantidad de reseñas, estrellas, número de clientes
- precios
- garantías, plazos de entrega, políticas de devolución
- marcas que el negocio supuestamente distribuye

Si un dato falta, tienes exactamente dos salidas: **borrar el bloque entero**, o
usar el texto neutro de la tabla de abajo. No hay una tercera. Un sitio con tres
secciones verdaderas es mejor que uno con seis donde dos son inventadas.

Cuando entregues el sitio, dile al dueño qué dejaste fuera por no saberlo: "no
puse precios ni horario porque no los tengo confirmados, dímelos y los agrego".
Eso se lee como cuidado, no como trabajo incompleto.

## Paso 1 — Datos

Al negocio solo se le preguntan **dos cosas** (§6, mensaje 2): cómo se llama y
si ya tiene alguna página. Todo lo demás sale de su ficha pública de Google o
de su perfil de Instagram/Facebook. No mandes un cuestionario: el punto de la
oferta es que a él no le cuesta esfuerzo.

| Dato | De dónde sale | Si no lo tienes |
| --- | --- | --- |
| `NEGOCIO` | Se lo preguntaste | Imprescindible. No sigas sin él |
| `WHATSAPP` | Ficha de Google / Instagram | Imprescindible. Sin esto el sitio no sirve |
| `RUBRO` | Lo que vende, en 1–3 palabras | Imprescindible |
| `CIUDAD` | Ficha de Google | Imprescindible |
| `QUE_VENDE` | Tu resumen del rubro, para el `<title>` | Usa el rubro tal cual |
| `TITULAR` | Lo escribes tú (ver abajo) | — |
| `SUBTITULO` | Lo escribes tú | — |
| `PRODUCTOS` | Ficha de Google, Instagram, o lo que te dijo | Si no tienes ni 3, borra la sección `#productos` completa |
| `PRECIO` (por producto) | Solo si lo viste publicado | Borra el `<p class="tarjeta__precio">` de esa tarjeta. Nunca "consultar precio" en unas y precio real en otras: o todas o ninguna |
| `RAZONES` | Solo hechos verificables | Si no tienes 3 reales, borra la sección `#porque` completa |
| `HORARIO` | Ficha de Google | Borra ese `.dato` |
| `DIRECCION` | Ficha de Google | Borra ese `.dato`. Si el negocio es a domicilio, pon la zona que cubre, no una dirección |
| `TELEFONO` | Ficha de Google | Borra ese `.dato` |
| `FECHA_LIMITE` | Hoy + 7 días | Calcúlalo, no lo dejes vago |

**Titular y subtítulo.** El titular dice qué vende y a quién, no un eslogan:
"Repuestos para carros japoneses en Santiago" funciona; "Calidad que te
acompaña" no dice nada. El subtítulo agrega la razón para escribir hoy y
termina empujando a WhatsApp. Español latinoamericano, `tú`, dólares o pesos
según lo que el negocio use — nunca "vosotros", "presupuesto" ni "móvil"
(ver `AGENTS.md`).

## Paso 2 — Paleta

Solo se cambian `--marca` y `--marca-oscuro`. El resto de los tokens de
`plantilla.html` está calibrado y **no se toca**. Pares medidos contra
WCAG 2.1 AA (`--marca` con texto blanco en botones y en la franja de cierre;
`--marca-oscuro` sobre blanco, sobre `#f6f7f9` y sobre el tinte del *eyebrow*):

| Rubro | `--marca` | `--marca-oscuro` | blanco/marca | oscuro/fondos |
| --- | --- | --- | --- | --- |
| Retail general, tecnología, celulares | `#0063b1` | `#004e8c` | 6.14:1 | 7.09–8.51:1 |
| Servicios creativos, belleza, spa | `#6b4bb8` | `#553a94` | 6.32:1 | 7.27–8.68:1 |
| Agro, ferretería, vivero, veterinaria | `#12735a` | `#0d5b47` | 5.79:1 | 6.79–8.06:1 |
| Salud, dental, óptica, laboratorio | `#0f6e7d` | `#0b5663` | 5.92:1 | 7.01–8.32:1 |
| Comida, panadería, colmado, repostería | `#b5321f` | `#8f2718` | 6.10:1 | 7.02–8.50:1 |
| Taller, repuestos, industrial | `#3a4552` | `#2a323c` | 9.75:1 | 10.64–12.96:1 |
| Abogados, contabilidad, seguros | `#1d3f73` | `#152f57` | 10.44:1 | 10.83–13.32:1 |

Si el negocio ya tiene un color propio (logo, local, rótulo), úsalo — pero
**mídelo antes**: `--marca` necesita ≥4.5:1 contra blanco y `--marca-oscuro`
≥4.5:1 contra `#f6f7f9`. Si el color de la marca no llega, usa el color real
solo como `--marca` si pasa, y oscurécelo hasta que pase para `--marca-oscuro`.
Un azul o verde brillante de rótulo casi nunca pasa con texto blanco; oscurecer
dos o tres pasos conserva la identidad y arregla el contraste.

Para medir hay un script en esta misma carpeta. Sin argumentos verifica la tabla
de arriba; con dos colores mide el par que le pases y sale con código 1 si algo
no llega:

```
node .claude/skills/sitio-express/contraste.mjs '#0063b1' '#004e8c'
```

No estimes a ojo. El propio `azure-500` de Jobid (`#0078d4`) lo demuestra:
apenas pasa con texto blanco (4.53:1) y **falla** como `--marca-oscuro` sobre
la sección tintada (4.22:1) y sobre el tinte del eyebrow (3.86:1). Un color que
"se ve suficientemente oscuro" no es evidencia de nada.

## Paso 3 — Llenar la plantilla

Copia `plantilla.html` a un archivo de trabajo en el scratchpad (no dentro del
repo: el sitio de un cliente no es código de Jobid) y sustituye.

`ejemplo.html` en esta carpeta es la plantilla ya llena para una tienda de
variedades, con la paleta de retail general. Sirve para ver el tono y el largo
de los textos. **Sus datos son inventados a propósito** y el número está en el
rango 555-01XX que NANP reserva para ficción — por eso no se publica como
artifact: un sitio que parece el de una tienda real, con dirección y teléfono,
no debe andar suelto. Se abre como archivo local. Copia la estructura, nunca
los datos.

`{{#PRODUCTOS}} … {{/PRODUCTOS}}` y `{{#RAZONES}} … {{/RAZONES}}` **no son un
motor de plantillas**: son marcas para que repitas el `<article>` a mano una vez
por ítem. Los marcadores se borran.

Reglas de sustitución que importan:

- **`WHATSAPP`**: formato E.164 sin `+`, sin espacios ni guiones. República
  Dominicana: `18091234567`. México: `52...`. Un número mal formateado abre
  WhatsApp en blanco y el sitio queda inútil.
- **`MENSAJE_WA`**: texto codificado para URL, en primera persona del cliente
  final y específico del rubro — `Hola%2C%20vi%20su%20p%C3%A1gina%20y%20quiero%20preguntar%20por...`.
  Aparece tres veces en el archivo (barra, hero, cierre) más el botón flotante:
  sustitúyelo en todas.
- **Rejilla de productos**: `rejilla--4` está pensada para 4+ ítems. Con 3 o
  menos, cambia a `rejilla--3` para que las tarjetas no queden raquíticas.
  Apunta a 4 u 8 productos: en pantalla ancha entran 4 por fila, así que 6
  dejan una última fila coja que se lee como "aquí faltaba algo".
- **Banner `.previa`**: se queda mientras es vista previa. Se borra solo cuando
  el cliente ya dijo sí y el sitio pasa a su dominio.
- **No agregues secciones nuevas.** Si hace falta algo que la plantilla no
  tiene, ese es trabajo del sitio pagado, no del gratis.

## Paso 4 — Verificar antes de mandar

No se manda nada sin esto. Es corto a propósito:

1. **Abrir en el navegador de verdad**, a 360 px y a 1280 px. Que nada desborde
   horizontalmente y que el titular no se parta raro.
2. **Hacer clic en cada enlace de WhatsApp** (son 4). Que abran con el número y
   el mensaje correctos.
3. **axe-core con `prefers-reduced-motion: reduce`**, igual que el sitio
   principal (`npm run audit:a11y` acepta `AUDIT_URL`). Cero violaciones.
4. **Releer buscando datos inventados.** Pasada específica, no de paso: cada
   número, fecha, precio y afirmación de la sección "por qué aquí" tiene que
   tener una fuente que puedas señalar.
5. **Ortografía del nombre del negocio.** Escribirlo mal es peor que no haber
   mandado nada.

## Paso 5 — Publicar y entregar

Publica con la herramienta `Artifact`: da un enlace privado, se puede
republicar sobre la misma URL si el cliente pide un cambio, y **se puede borrar
de verdad** — que es lo que hace honesto el plazo de 7 días.

- `favicon`: un emoji del rubro (🔧 taller, 🦷 dental, 🥖 panadería).
- `title`: el nombre del negocio. Nada más, sin explicación pegada.
- No publiques nunca el sitio como si fuera del negocio en un dominio propio ni
  con su logo descargado sin permiso: es una vista previa que tú hiciste y así
  se presenta, con el banner `.previa` visible.

El mensaje de entrega es el 3 de §6, tal cual: enlace, plazo real de 7 días,
y nada de precios. Quien pregunta "¿y ahora qué?" es el cliente, nunca tú.

## Paso 6 — Despublicar a los 7 días

El plazo tiene que ser real o toda la oferta se vuelve un truco. Si al día 7 no
hubo respuesta, borra el artifact (`Artifact` con `action: "delete"`) y déjalo
ahí. No insistas, no lo extiendas "por si acaso", no mandes un recordatorio de
última hora: la escasez inventada se huele.

Si el cliente dijo sí, entonces sí: se borra el banner `.previa`, se hacen los
ajustes que pida y se pasa a **su** dominio, a nombre de él. El dominio nunca
queda a nombre de Jobid.

## Lo que esta skill no hace

- No conecta dominios, ni correo, ni analítica: eso es después del sí.
- No es el "sistema en marcha". El sitio es el regalo; lo que cobra
  mensualidad es el WhatsApp que contesta solo, y ese es software aparte.
- No genera el sitio de Jobid ni ningún componente de `src/`. Esto produce un
  HTML autónomo para un tercero, fuera del repo.
