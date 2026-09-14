# Estrategia comercial — Jobid

> Documento interno. Fuente de verdad para el copy de la web, los posts y los
> reels. Si cambias el posicionamiento, cámbialo aquí primero y después baja
> los cambios a `src/lib/i18n/dictionaries/`.
>
> Última revisión: septiembre 2026.

---

## 0. Alcance de la fase 1

**Decisión (septiembre 2026): la facturación electrónica queda fuera de la
primera etapa.**

Es un dolor real y con fecha límite, pero como primer producto es mala apuesta:

- Es una línea **regulada**. Un error tuyo se convierte en una multa del cliente.
- Obliga a **operar infraestructura por cliente de forma continua** (tres
  servicios web públicos: recepción, aprobación comercial y autenticación).
  Ver `docs/facturacion-electronica-rd.md`.
- El **certificado digital y el estado del RNC** dependen de terceros y del
  propio cliente. Los retrasos te los achacan a ti.
- Compite de frente con el **Facturador Gratuito de la DGII**, que es gratis.

La investigación está hecha y guardada. Se retoma cuando haya clientes,
rodaje y una forma clara de cobrar lo recurrente.

### En qué sí se enfoca la fase 1

Problemas sin regulación de por medio, con resultado visible en semanas:

1. **Responder a tiempo.** Quien contesta en menos de un minuto cierra hasta
   8 veces más. Automatizar lo repetitivo de WhatsApp.
2. **Cotizar rápido.** Ya hay una demo funcionando: es el argumento más fácil
   de enseñar.
3. **Saber qué hay en el inventario.** Lo que se mueve, lo que está muerto,
   lo que hay que pedir.
4. **Que las citas se confirmen solas.** Aplica a salud, talleres y servicios.
5. **Cobrar sin perseguir.** Recordatorios antes del vencimiento.
6. **Saber si se está ganando.** Panel del dueño con tres números.
7. **Sacar el conocimiento de la cabeza de una persona.**

---

## 1. Posicionamiento

**Base:** República Dominicana.
**Mercado:** toda América Latina + público latino en Estados Unidos.
**Cliente:** micro y pequeño negocio. Dos perfiles:

- **El que no está al día.** Opera con cuaderno, Excel y WhatsApp personal. No
  tiene sistema. Sabe que "debería digitalizarse" pero no sabe por dónde y le
  da miedo que sea caro y complicado.
- **El que ya tiene algo y le queda chico.** Compró un sistema genérico o usa
  varias herramientas sueltas. Paga mensualidades por cosas que no usa, y lo
  que sí necesita el sistema no lo hace.

**No es cliente** (por ahora): corporativos, startups con inversión, empresas
con departamento de TI propio. No compiten en precio contigo ni tú con ellos.

### El argumento central

> **Software hecho a la medida de cómo tú ya trabajas.**
> No al revés.

Todo lo demás cuelga de aquí. El competidor real no es otra agencia: es el
sistema genérico de suscripción que obliga al negocio a cambiar su forma de
trabajar para encajar en el software. El mensaje es el opuesto: **el software
se adapta al negocio**.

Tres consecuencias que hay que repetir en todo el contenido:

1. **No pagas por lo que no usas.** Un sistema a medida tiene exactamente las
   pantallas que tu negocio necesita. Ni una más.
2. **No cambias tu forma de trabajar.** Se modela tu proceso real, incluido lo
   "raro" que hace tu negocio y que ningún sistema genérico contempla.
3. **Es tuyo.** Sin mensualidad obligatoria de por vida, sin quedar atrapado.

---

## 2. Dolores transversales

Estos aplican a casi todos los sectores. Son los que deben estar en la portada.

### 2.1 El negocio vive en WhatsApp y WhatsApp no es un sistema

**El dato:** el 72% del comercio en América Latina ya ocurre por WhatsApp.
Penetración: México 93%, Colombia 92–94%, Argentina 90–93%. El 81% de los
equipos comerciales en México prospecta y vende por ahí.

**El dolor real:** el pedido, el precio acordado, la dirección de entrega y la
queja del cliente están todos en un chat. Si el empleado que atendía se va, se
va con el historial. No hay forma de saber cuántas cotizaciones se enviaron ni
cuántas se cerraron.

**Lo que vendes:** conectar WhatsApp a un sistema real. Que cada conversación
quede registrada, que los pedidos se conviertan en órdenes, que las respuestas
frecuentes se automaticen.

**El número que convence:** quienes responden en menos de un minuto convierten
hasta 8 veces más. Un negocio que contesta al día siguiente está perdiendo esas
ventas sin enterarse.

### 2.2 La factura electrónica ya no es opcional — APLAZADO a fase 2

**El dato (RD):** por la Ley 32-23, el e-CF es obligatorio. Grandes nacionales
desde mayo 2024, grandes locales y medianos desde noviembre 2025, y **micro,
pequeños y no clasificados desde el 15 de noviembre de 2026**. Multas de 5 a
50 salarios mínimos y pérdida de validez fiscal de los comprobantes.

**Por qué importa ahora:** es un dolor con fecha límite en tu mercado local, a
dos meses vista. El micro y pequeño negocio dominicano tiene que resolverlo sí
o sí, y la mayoría todavía no ha empezado.

**Lo que vendes:** ponerlo a facturar electrónicamente sin que tenga que
entender el XML ni la DGII. Y de paso, conectar esa facturación a su inventario
y sus ventas, que es donde está el valor real.

**Ojo:** cada país tiene su régimen (CFDI en México, DIAN en Colombia, SUNAT en
Perú, AFIP en Argentina, SII en Chile). El gancho se replica cambiando la sigla.

> ⚠️ **Fuera de la fase 1.** Ver la sección 0 y el informe completo en
> `docs/facturacion-electronica-rd.md`. No se anuncia en la web ni en el
> contenido hasta que se decida cómo cobrar la operación recurrente.

### 2.3 Nadie sabe qué hay en el inventario

**El dato:** un taller pequeño con 300–500 referencias sufre dos problemas
opuestos a la vez: falta el repuesto cuando el cliente lo necesita (y hay que
comprarlo de emergencia con sobreprecio), y a la vez hay repuestos meses en el
estante con el capital atrapado. Le llaman "stock fantasma": no se sabe si algo
se usó o sigue en el depósito.

**Lo que vendes:** control de inventario que el dueño entienda. Qué se mueve,
qué está muerto, qué hay que pedir.

### 2.4 El negocio depende de una persona

El dueño o un empleado clave es el único que sabe los precios, quién debe qué y
cómo se hace cada cosa. Si se enferma, el negocio se frena. Nada está escrito.

**Lo que vendes:** sacar ese conocimiento de la cabeza de una persona y meterlo
en un sistema. Es un argumento emocional fuerte: **poder irte de vacaciones.**

### 2.5 No se sabe si se está ganando dinero

Se factura, se cobra, se paga. Pero nadie sabe qué producto deja margen, qué
cliente es rentable ni cuánto se debe. La contabilidad llega tarde y solo sirve
para pagar impuestos, no para decidir.

**Lo que vendes:** un panel simple que responda tres preguntas: cuánto vendí,
cuánto me deben, qué me deja margen.

### 2.6 Contexto de mercado

- Más del **70% de las PYMES latinoamericanas** tienen baja madurez digital.
- Solo el **30%** accede a financiamiento tecnológico.
- El **31%** ya invirtió en IA y el **80%** planea hacerlo durante 2026. Hay
  apetito; falta quien lo aterrice sin tecnicismos.

### 2.7 El latino en Estados Unidos

- Unos **5 millones de negocios** de dueños hispanos, uno de los grupos de
  mayor crecimiento. Un tercio se lanzó durante la pandemia.
- El **40%** de los dueños hispanos necesita un segundo trabajo para cubrir
  gastos. Son negocios con el margen apretado: el precio importa mucho.
- Solo el **42%** de los solicitantes obtuvo todo el financiamiento que buscó.

**Dolores propios de ese público:**

- **Barrera de idioma con el proveedor.** Contratan software en inglés, con
  soporte en inglés, y no lo aprovechan. Que tú atiendas en español es una
  ventaja competitiva concreta, no un detalle.
- **Operan entre dos países.** Proveedores o familia en su país de origen,
  clientes en EEUU. Necesitan manejar dos monedas y dos husos.
- **Cumplimiento que no entienden.** Sales tax por estado, 1099, requisitos de
  licencia municipal.

---

## 3. Sectores

Para cada uno: cómo trabaja hoy, qué le duele, qué le vendes y por dónde entrar.

### 3.1 Clínicas dentales y consultorios médicos

**Cómo trabajan hoy:** agenda en cuaderno o en Google Calendar, confirmación
por llamada, expediente en carpeta de papel. El dato de investigación: entre
**5 y 15 ausencias por semana** en una clínica dental promedio en México.

**Duele:**
- El paciente no aparece y ese espacio ya no se vende. Es dinero perdido que no
  se recupera.
- La recepcionista pasa la mañana confirmando citas por teléfono.
- El historial del paciente está en papel; buscar algo toma minutos.
- No se sabe qué tratamientos quedaron a medias ni a quién habría que llamar.

**Qué le vendes:**
- Agenda con confirmación automática por WhatsApp y recordatorio 24 h antes.
- Lista de espera: si alguien cancela, el sistema ofrece el espacio al siguiente.
- Expediente digital con lo que ese consultorio realmente registra.
- Seguimiento de tratamientos pendientes y presupuestos no aceptados.

**Entrada:** empieza solo por la confirmación automática de citas. Es barato,
se instala rápido y el resultado se ve en dos semanas. De ahí sale el resto.

**Cuidado:** datos de salud. Nunca pedir información clínica por chat; WhatsApp
solo como capa de agenda (nombre, teléfono, motivo genérico).

### 3.2 Abogados y bufetes pequeños

**Cómo trabajan hoy:** expedientes en carpetas y en el correo. Plazos en la
cabeza o en una agenda. Facturación por horas anotadas de memoria.

**Duele:**
- **Perder un plazo.** Es el miedo número uno y tiene consecuencias graves.
- Horas trabajadas que nunca se facturan porque nadie las anotó.
- El cliente llama a preguntar "cómo va lo mío" y hay que buscar el expediente.
- Documentos repetitivos (contratos, poderes) que se rehacen a mano cada vez.

**Qué le vendes:**
- Gestor de expedientes con alertas de plazos y vencimientos.
- Registro de horas por caso, con facturación a partir de ahí.
- Portal donde el cliente ve el estado de su caso sin tener que llamar.
- Generación de documentos desde plantillas con los datos del expediente.

**Entrada:** el control de plazos. Vende tranquilidad, que es lo que compran.

### 3.3 Talleres mecánicos

**Cómo trabajan hoy:** orden de trabajo en papel o en la cabeza del jefe de
taller. Repuestos sin control. Presupuesto verbal por teléfono.

**Duele:**
- Stock fantasma: no se sabe si el repuesto se usó o sigue en el estante.
- Faltantes que obligan a compras de emergencia con sobreprecio, y a la vez
  capital atrapado en piezas que llevan meses sin moverse.
- El cliente llama tres veces a preguntar si su carro está listo.
- Trabajos hechos que no se facturaron completos.

**Qué le vendes:**
- Orden de trabajo digital: qué entra, qué se le hizo, qué repuestos llevó.
- Inventario conectado a las órdenes: al usar una pieza, se descuenta sola.
- Aviso automático por WhatsApp cuando el vehículo está listo.
- Historial por vehículo (por placa): qué se le hizo y cuándo.

**Entrada:** la orden de trabajo digital con aviso al cliente. Es lo más
visible para el dueño y lo que más reduce llamadas.

### 3.4 Dealers y concesionarios

**Cómo trabajan hoy:** inventario de vehículos en Excel, fotos en el celular
del vendedor, seguimiento de interesados en WhatsApp personal.

**Duele:**
- Un interesado escribe, el vendedor no contesta a tiempo y se pierde.
- No se sabe cuántos prospectos hay ni en qué punto está cada uno.
- El mismo vehículo se publica en cinco sitios y hay que actualizar cinco veces.
- Financiamiento y documentación en papel.

**Qué le vendes:**
- Inventario de vehículos con fichas y fotos, publicable en la web.
- CRM de prospectos con etapas y recordatorios de seguimiento.
- Respuesta automática por WhatsApp con la ficha del vehículo consultado.
- Cálculo de financiamiento en la ficha.

**Entrada:** el catálogo web conectado a WhatsApp. Vende más rápido y se ve.

### 3.5 Tiendas de ropa

**Cómo trabajan hoy:** inventario por conteo manual. Ventas en libreta o en un
POS genérico. Instagram y WhatsApp como vitrina.

**Duele:**
- Tallas y colores: una misma prenda son 15 combinaciones y nadie las controla.
- No se sabe qué se vende y qué no hasta que es temporada vieja.
- Apartados y encargos anotados en papel que se pierden.
- Vender por Instagram significa contestar lo mismo cien veces.

**Qué le vendes:**
- Inventario por variante (talla/color) que el dueño entienda.
- Catálogo en línea con lo que hay disponible de verdad.
- Control de apartados y abonos.
- Respuestas automáticas de disponibilidad y precio por WhatsApp.

**Entrada:** el catálogo con inventario real. Elimina el "¿tienes la M?".

### 3.6 Tiendas de repuestos

**Cómo trabajan hoy:** miles de referencias, equivalencias en la cabeza del
dueño, precios en una lista impresa.

**Duele:**
- Encontrar la pieza: el cliente da marca, modelo y año, y hay que buscar.
- Equivalencias entre marcas que solo conoce el dueño.
- Cotizaciones por WhatsApp una por una, todo el día.
- Lo mismo del taller: faltantes y capital muerto conviviendo.

**Qué le vendes:**
- Catálogo buscable por vehículo (marca/modelo/año), no solo por código.
- Equivalencias registradas en el sistema, no en la memoria de una persona.
- Cotización automática por WhatsApp con precio y disponibilidad.
- Control de inventario con alertas de reposición.

**Entrada:** el buscador por vehículo. Es el diferenciador más visible.

### 3.7 Tiendas de tecnología

**Cómo trabajan hoy:** inventario con series, garantías en papel, reparaciones
anotadas a mano.

**Duele:**
- Números de serie e IMEI sin control: no se sabe qué se vendió a quién.
- Garantías: el cliente vuelve y no hay registro de la compra.
- Equipos en reparación sin seguimiento.
- Precios que cambian con el dólar y hay que actualizar a mano.

**Qué le vendes:**
- Inventario con número de serie y garantía asociada a la venta.
- Módulo de reparaciones con estados y aviso al cliente.
- Actualización de precios por tasa de cambio.

**Entrada:** control de series y garantías.

### 3.8 Colegios y academias

**Cómo trabajan hoy:** cobros en efectivo o transferencia, control en Excel,
comunicación con padres por grupos de WhatsApp caóticos.

**Duele:**
- Cobranza: perseguir mensualidades atrasadas consume días cada mes.
- Comunicación con padres dispersa en grupos donde se pierde todo.
- Notas y asistencia en papel o en hojas sueltas.
- Inscripciones cada año rehechas desde cero.

**Qué le vendes:**
- Portal de padres: estado de cuenta, notas, asistencia, circulares.
- Recordatorio automático de pago antes del vencimiento.
- Inscripción en línea que no repite datos del año anterior.

**Entrada:** el recordatorio de cobranza. Se paga solo el primer mes.

### 3.9 Productos transversales

No son sectores, son piezas que se venden a casi cualquiera:

| Producto | Para quién | Qué resuelve |
| --- | --- | --- |
| **Punto de venta a medida** | Cualquier comercio | Vender, facturar e inventariar en una sola pantalla, con las particularidades del negocio |
| **CRM básico** | Quien vende con seguimiento | Saber cuántos prospectos hay y en qué punto está cada uno |
| **Asistente de ventas por WhatsApp** | Todos | Responder al instante lo repetitivo y pasar a una persona lo que importa |
| **Panel del dueño** | Todos | Cuánto vendí, cuánto me deben, qué me deja margen |

---

## 4. Tono y vocabulario

La web estaba escrita en español de España. Hay que latinizarla.

### Reglas

- **Usted / tú, nunca vosotros.** Tratamiento de "tú" en el contenido, cercano
  pero profesional. En RD y gran parte de LatAm el "tú" funciona bien.
- **Moneda en US$**, no euros. Es la referencia común en la región y para el
  público latino en EEUU.
- **Sin jerga técnica.** Si una palabra necesita explicación, no va.

### Sustituciones

| España | LatAm |
| --- | --- |
| ordenador | computadora |
| móvil | celular |
| coger | tomar / agarrar |
| vale | está bien / listo |
| presupuesto (cotización) | cotización |
| IVA | ITBIS (RD), IVA (MX/CO), impuesto |
| gestionar | manejar / administrar |
| aparcar | estacionar |
| fichero | archivo |
| ¿Vale? | ¿Te sirve? |
| billetera / cartera | cuenta |
| "tenéis", "podéis" | "tienen", "pueden" |

### Lo que NO hacer

- No caricaturizar el habla dominicana. El cliente es de toda la región.
- No prometer "transformación digital". Nadie compra eso. Compran "que el
  cliente no se me pierda" y "saber cuánto me deben".
- No hablar de tecnología antes de hablar del problema.

---

## 5. Banco de ganchos para posts y reels

Organizados por tipo. Cada uno es un reel de 30–60 segundos.

### Ganchos de dolor (abren con el problema)

1. "Si tu negocio vive en WhatsApp y el vendedor se va, se lleva a tus clientes."
2. "Tienes 500 repuestos en el estante. ¿Cuántos llevan seis meses sin moverse?"
3. "Tu dentista pierde entre 5 y 15 citas por semana. Eso es un sueldo."
4. "¿Puedes irte de vacaciones una semana sin que el negocio se pare?"
5. "Facturas, cobras, pagas… ¿pero sabes qué producto te deja margen?"
6. "El cliente te escribió a las 11 de la noche. ¿Cuándo le contestaste?"
7. "Pagas tres mensualidades de sistemas que usas al 20%."

### Ganchos de contraste (a medida vs genérico)

8. "El sistema genérico te obliga a cambiar cómo trabajas. Debería ser al revés."
9. "¿Por qué pagas por 40 funciones si solo usas 6?"
10. "Tu negocio tiene algo raro que ningún sistema contempla. Ese 'algo raro' es tu ventaja."
11. "Software propio no es más caro. Es que dejas de pagar mensualidad para siempre."

### Ganchos de demostración (enseñar funcionando)

12. Grabar el motor de presupuestos: escribir un mensaje de cliente y que salga
    la cotización en un segundo.
13. "Le pedí a mi sistema que me estafara. Mira lo que pasó." (el caso de
    intento de manipulación del laboratorio)
14. Antes/después: el cuaderno de citas vs la agenda con confirmación automática.
15. "Esto es lo que pasa cuando un cliente escribe a las 11 de la noche."

### Ganchos educativos (construyen autoridad)

16. "Tres preguntas que tu negocio debería poder responder en 10 segundos."
17. "Cómo saber cuánto te deben hoy, sin abrir el Excel."
18. "Cómo saber si un sistema te está quedando chico."
19. "La diferencia entre digitalizarse y comprar software."

### Ganchos para el público latino en EEUU

20. "Tu proveedor de software te atiende en inglés. Tu negocio opera en español."
21. "Manejas proveedores allá y clientes acá. Tu sistema debería entender las dos monedas."

### Formato sugerido de reel

1. **0–3 s:** el gancho, en texto grande. Sin saludo, sin presentación.
2. **3–20 s:** el problema concreto con un número o un ejemplo real.
3. **20–45 s:** la solución mostrada, no explicada. Pantalla grabada.
4. **45–60 s:** cierre con una acción: "escríbeme y te digo si tiene arreglo".

### El CTA de todo el contenido: el diagnóstico gratis

Decisión de septiembre 2026. El gancho gratis **ya no es un sitio regalado**:
es la opinión honesta que el sitio ya promete en la sección de contacto —
*"te digo si tiene arreglo, cómo lo haría y qué rango de precio esperar"*.

Tiene tres ventajas sobre regalar un sitio: no hay que construir nada antes de
que alguien lo pida, no compite con el servicio premium de webs a la medida, y
lo que el prospecto recibe (una respuesta que entendió *su* operación) es la
única demostración real de "100% adaptado a tu negocio" que va a ver antes de
pagar.

**El contenido manda a WhatsApp, no al formulario.** En América Latina el
formulario web convierte muy por debajo. El formulario del sitio queda para
quien llega a la web por su cuenta.

El enlace lleva mensaje precargado y el tema de la pieza dentro:

```
https://wa.me/{{TU_WHATSAPP}}?text=Vi%20tu%20video%20sobre%20{{TEMA}}%20y%20quiero%20preguntarte%20algo
```

Cuando entra el mensaje ya sabes qué pieza lo trajo, sin preguntar. Es la única
medición que vas a tener al principio, y es gratis.

### Cómo se produce

Con la skill `contenido` (`.claude/skills/contenido/`), **en tandas de 4 a 6
piezas**, no de una en una. Nadie deja de publicar por falta de ideas: se deja
de publicar porque cada pieza empieza en blanco y a la tercera semana se
abandona. Se generan seis, se graban el mismo día y se publican dos por semana
durante tres semanas.

Rotación de una tanda: 3 de dolor, 2 de demostración, 1 educativo. Los de
contraste se guardan para cuando ya haya audiencia que te conozca — discuten
con una alternativa, y para eso tienen que saber quién eres.

**Lo que mide el éxito no son vistas: son mensajes de WhatsApp.** Un reel de
400 vistas que trae dos conversaciones vale más que uno de 20,000 que no trae
ninguna.

---

## 6. La oferta gancho: sitio gratis + sistema en marcha

> Añadido en septiembre 2026, a partir de un video sobre agencias con
> GoHighLevel. La mecánica de fondo es excelente y traducible; lo que cambia
> es la herramienta: donde el video usa GoHighLevel, nosotros usamos un
> generador propio hecho con Claude Code, y el "sistema detrás del sitio" no
> es una automatización enlatada de una plataforma, es exactamente lo que ya
> estamos construyendo en el laboratorio (el analizador + motor determinista +
> escalado a persona).

### La idea central, en una frase

**No le vendas el sitio. Regálaselo. Cóbrale por lo que lo mantiene vivo.**

Pedirle a un extraño que confíe en ti *antes* de haber hecho algo por él es
pedir demasiado, demasiado pronto. Por eso los mensajes de venta fríos no
funcionan: le estás pidiendo tiempo y dinero a alguien que no te conoce. La
solución es invertir el orden: construyes primero, entregas gratis, y dejas
que sea el propio dueño el que pregunte "¿y ahora qué?". Esa pregunta es la
que abre la puerta a la venta — nunca la abres tú primero.

### Por qué esto no contradice "0 mensualidades obligatorias"

No es una mensualidad por el software. Es una mensualidad por un **servicio
que sigue operando**: el número de WhatsApp que contesta solo, el sistema
que pide reseñas, el que agenda citas.

Ojo con cómo se justifica. Contestar mensajes por WhatsApp **no cuesta**:
desde el 1 de noviembre de 2024 Meta dejó de cobrar las conversaciones de
servicio, así que mientras el cliente te haya escrito en las últimas 24 horas,
todas tus respuestas de texto libre son gratis e ilimitadas. Solo se paga por
plantillas que inicia el negocio (marketing, utilidad, autenticación). El costo
real por cliente es de centavos: inferencia y hosting compartido.

Entonces la mensualidad no se sostiene diciendo "me cuesta infraestructura",
porque es mentira y se cae sola. Se sostiene por lo que sí es cierto: **es
atención continua**. Alguien revisa las respuestas malas, actualiza los precios
cuando el negocio los cambia, y responde cuando algo se rompe. Eso es tiempo, y
el tiempo es lo único que de verdad escala con la cantidad de clientes. La
distinción que hay que sostener siempre en el copy:

- **El sitio es tuyo. Sin mensualidad, sin candado.** Se cumple.
- **El sistema que lo mantiene funcionando es un servicio aparte, opcional,
  y se cancela cuando quieras.** También se cumple, porque nunca decimos que
  sea gratis ni obligatorio.

### Cómo se traduce cada pieza de GoHighLevel

| En el video (GoHighLevel) | En Jobid (Claude Code) |
| --- | --- |
| Grupos locales de Facebook | Igual — en RD y LatAm son, si acaso, más centrales que en EE. UU. (grupos de compra-venta, de empresarios del barrio, de la comunidad) |
| AI Studio: un prompt arma el sitio en 3–5 min | Una herramienta propia: a partir del nombre del negocio, el rubro (uno de los 9 que ya tenemos mapeados) y la ciudad, se genera un sitio de una página con nuestro propio sistema de diseño, listo en minutos |
| Enlace de vista previa temporal, bajo control del que lo construye | Un subdominio o ruta de vista previa propia (por ejemplo `previa.jobid.ai/nombre-negocio`), que se puede despublicar de verdad a los 7 días |
| El "sistema" detrás: texto automático a leads, solicitud de reseñas, chat que responde y agenda — todo nativo de la plataforma | Aquí es donde de verdad reemplazamos GoHighLevel por trabajo propio: el asistente de WhatsApp que ya íbamos a construir como demo del laboratorio, más recordatorios de reseña y de citas. No es una automatización de plataforma, es software nuestro |
| Cuentas de cliente ilimitadas bajo una sola suscripción → el costo marginal por cliente nuevo es casi cero | Nuestro costo marginal también es casi cero, pero por otra razón: responder mensajes entrantes es gratis en WhatsApp. Lo que no escala es el tiempo de montar y atender a cada cliente, y ahí es donde tiene que apoyarse el precio |
| Herramienta que busca negocios sin sitio web en Google Maps | Un script sencillo, muy replicable: buscar por rubro y ciudad, filtrar los que no tienen sitio en su ficha |
| Dominio siempre a nombre del cliente, nunca de la agencia | Ya es un principio de Jobid. Se mantiene igual |

### Los mensajes (listos para usar, tono LatAm)

**1. El post en el grupo local**

> Estoy armando 2 sitios web gratis esta semana para [tipo de negocio] en
> [ciudad]. Quiero tener un par de ejemplos reales y de paso me sirve tu
> opinión sincera. Si te gusta lo que te muestro, te quedas con él.
> Comenta o escríbeme por WhatsApp si te interesa.

Cambia el tipo de negocio según el rubro que quieras trabajar esa semana.
Empieza por el que más cómodo te sientas explicando.

**2. Cuando alguien responde**

> ¡Qué bien! Cuéntame dos cositas: ¿cómo se llama tu negocio, y ya tienes
> alguna página, aunque sea vieja?

Nada más. No se pitchea nada todavía. El resto (servicios, teléfono, horario)
casi siempre está público en su ficha de Google.

**3. Mensaje de entrega**

> Hola [nombre], ya te tengo el sitio listo. Aquí está la vista previa:
> [enlace]. Es temporal, la voy a quitar en 7 días. Échale un ojo cuando
> puedas. Si te gusta y quieres quedarte con él, me avisas y te cuento los
> siguientes pasos.

Sin precio, sin paquetes, sin "por cierto, también ofrezco...". El plazo de
7 días tiene que ser real: se publica y se despublica de verdad.

**4. El cierre (cuando preguntan "¿y ahora qué?")**

> Qué bueno que te gustó. El sitio es gratis: si lo quieres, hago los ajustes
> que necesites y lo paso a tu dominio. Lo que sí tiene costo es lo que lo
> mantiene funcionando: que tu WhatsApp conteste solo cuando te escriban,
> con tus precios y tu horario, a la hora que sea. Cuando no sepa algo, te
> pasa la conversación. Y cada semana te mando un resumen de qué te
> preguntaron. Son US$50 al mes por adelantado, sin contrato, cancelas cuando
> quieras. Si te sirve, te mando el link de pago y esta semana lo conectamos.

Esta pregunta la hace el cliente, nunca tú. Si no la hace, no se fuerza: se
espera, o se despublica el sitio a los 7 días sin más.

**5. Mensaje frío, para negocios sin web (sin depender del grupo de Facebook)**

> Hola [nombre], estaba buscando la página de [negocio] en [ciudad] y no
> encontré ninguna. Sé que esto suena de la nada, pero fui y te armé una de
> todas formas. ¿Te la mando para que le eches un vistazo?

Es un regalo, no una oferta. La diferencia entre "¿quieres que te construya
un sitio?" (que se ignora, porque lo manda un extraño pidiendo algo) y "ya te
construí uno" (que se abre, porque es un regalo) es enorme.

### Tres cosas que lo pueden arruinar

1. **No te obsesiones con el sitio gratis.** El punto es que la IA te permite
   entregar algo genuinamente bueno rápido. Si le metes tres horas afinando
   detalles a alguien que todavía no te ha pagado nada, el número no cuadra.
2. **Revisa lo que el sistema inventó antes de enviarlo.** Teléfono, horario,
   dirección, "desde 1998" cuando el negocio abrió el año pasado. Enseñarle
   a un cliente un sitio precioso con un dato inventado destruye la confianza
   de un solo golpe.
3. **No conectes el dominio ni actives nada hasta que digan que sí y paguen.**
   La vista previa existe justo para que decidan sin que tú hayas hecho
   trabajo sin cobrar de más.

### Cómo escala

Un cliente a US$50/mes es el punto de partida, no el techo. Diez clientes en
el sistema son US$500 al mes corriendo solos. Y cada cliente que
ya confía en ti para su presencia digital es candidato natural para subir a
los paquetes de Sistema a la medida cuando su negocio lo pida.

### El sitio de regalo, después de septiembre 2026

Se sigue regalando, pero **no genérico**. La decisión: hacer **un solo sitio
base, bien trabajado**, al nivel del de Jobid, y personalizar ese para cada
negocio. Un sitio mediocre regalado no genera la reacción que abre la venta —
genera un "gracias" cortés y nada más. La skill `sitio-express` queda en pausa
hasta que exista esa base. Las webs a la medida siguen siendo servicio premium,
cotizado y solo por petición específica.

---

## 6.1. La oferta de pago, v1 — "WhatsApp que contesta solo"

Esto es lo que se cobra de verdad. Definido en septiembre 2026.

### Precio

**US$50 al mes, pagado por adelantado.** Sin instalación, sin contrato, sin
mínimo de permanencia. El primer mes se paga antes de conectar nada: nunca hay
servicio funcionando sin pagar. Banda de ajuste US$45–60 según rubro; el
mercado de EEUU admite 2 a 3 veces eso por el mismo trabajo.

### Qué se entrega

1. **Tu número contesta solo, 24/7**, en menos de un minuto.
2. **Contesta desde tu información**: catálogo, precios, horario, dirección,
   zonas de delivery y preguntas frecuentes. Si algo no está cargado, dice que
   no sabe. Nunca inventa un precio — es la misma tesis del motor de
   cotizaciones: el analizador lee, el código decide.
3. **Escalado a persona**: cuando no sabe, o cuando el cliente pide hablar con
   alguien, te pasa la conversación y te avisa.
4. **Resumen semanal**: qué te preguntaron, qué no supo contestar, cuántas
   conversaciones entraron.

El punto 4 no es un extra. Un bot que contesta bien es **invisible**: el dueño
no ve trabajo, ve silencio, y a los dos meses se pregunta por qué paga. El
resumen semanal le pone cara al servicio. Y de paso te dice qué venderle
después, porque ahí salen las preguntas que su negocio todavía no sabe
responder.

### Qué NO incluye

Cobros, agendar citas, campañas de marketing, control de inventario. Son la v2
y se cobran aparte. Decirlo desde el principio evita la conversación incómoda
del mes tres.

### La regla que protege el negocio

Al no cobrar instalación, **las horas de montaje las pagas tú**. Si un cliente
se va en el mes dos, ese montaje se pagó con US$100. La única defensa es que el
montaje sea barato en tiempo:

- **Tope duro: 2 horas de montaje por cliente.** Intake fijo (que mande su
  lista de precios como esté: foto, Excel, o escrita en un mensaje), nada a la
  medida en la v1.
- **Si un cliente necesita más de 2 horas, no es cliente de este producto.**
  Es cliente de "Sistema a medida", y se cotiza aparte.

Sin ese tope, el producto no cierra: US$50 al mes no paga una semana de trabajo
de montaje, por mucho que el cliente se quede un año.

---

## 7. Estructura de oferta y precios

> Rangos de partida en US$ para validar. El micro negocio latinoamericano tiene
> el margen apretado: un precio de agencia europea no cierra ninguna venta.
> El mercado de EEUU admite precios más altos por el mismo trabajo.

| Paquete | Desde | Qué incluye | Para quién |
| --- | --- | --- | --- |
| **Arranque** | US$450 | Presencia web + WhatsApp conectado + catálogo básico | El que no tiene nada |
| **Automatización puntual** | US$350 | Un proceso repetitivo resuelto de punta a punta | El que pierde horas en algo concreto |
| **Sistema a medida** | US$1,200 | Punto de venta, agenda, inventario u órdenes, modelado a su operación | El que ya le queda chico lo que tiene |
| **Sistema en marcha** | US$50/mes | WhatsApp que responde solo, escalado a persona y resumen semanal. Mes por adelantado, sin contrato. Ver sección 6.1 | El cliente que ya recibió un sitio gratis y preguntó "¿y ahora qué?" |
| **Acompañamiento** | US$60/mes | Soporte, ajustes y mejoras continuas | Opcional, nunca obligatorio |

**Reglas de precio:**

- Precio cerrado tras el diagnóstico. No se mueve.
- Pago en dos partes (50/50) o mensualidades para proyectos grandes.
- El código y las cuentas quedan a nombre del cliente. Siempre.

---

## 8. Pendientes

- [ ] Validar los precios con dos o tres clientes reales antes de publicarlos.
- [ ] Definir si se atiende EEUU con precios distintos y cómo se comunica.
- [ ] Fase 2: retomar facturación electrónica cuando haya clientes y una
      forma definida de cobrar la operación recurrente.
- [x] Fijar el precio y el alcance real de "Sistema en marcha" → sección 6.1.
- [ ] Construir el asistente de WhatsApp de la v1 (es el producto que cobra).
- [ ] Conectar el formulario de contacto: hoy devuelve 503 porque faltan
      `RESEND_API_KEY`, `CONTACT_TO_EMAIL` y `CONTACT_FROM_EMAIL`.
- [ ] Estructurar el diagnóstico: es lo que convierte el lead en cliente y es
      lo que el sitio ya promete responder en 24 horas.
- [ ] Rehacer el sitio base de regalo: uno solo, bien trabajado. `sitio-express`
      queda en pausa hasta entonces.
- [ ] Validar el tope de 2 horas de montaje con los primeros clientes reales.
      Si en la práctica son 5, el precio o el alcance están mal.

---

## Fuentes

- [DPL News — Digitalización e internacionalización, desafíos de las pymes en América Latina](https://dplnews.com/digitalizacion-internacionalizacion-desafios-pymes-america-latina/)
- [CAF — Policy Paper #12: Digitalización de las PyMEs en América Latina](https://scioteca.caf.com/bitstream/handle/123456789/1970/Policy%20Paper%20%2312%20-%20Digitalizaci%C3%B3n%20de%20las%20PyMEs%20en%20Am%C3%A9rica%20Latina.pdf?sequence=3&isAllowed=y)
- [BID — Prioridades para la digitalización empresarial en América Latina y el Caribe](https://publications.iadb.org/es/prioridades-para-la-digitalizacion-empresarial-en-america-latina-y-el-caribe)
- [Blip — Estadísticas de WhatsApp Business en LATAM 2026](https://www.blip.ai/blog/es/whatsapp/estadisticas-whatsapp-marketing-latam/)
- [SleekFlow — WhatsApp Business API Pricing: las conversaciones de servicio son gratis desde el 1/11/2024](https://help.sleekflow.io/en_US/whatsapp/pricing)
- [Blueticks — WhatsApp Business per-message pricing 2026: qué cambió](https://blueticks.co/blog/whatsapp-business-pricing-change-2026-per-message)
- [Alegra — Facturación electrónica obligatoria en RD: fechas límite DGII 2026](https://blog.alegra.com/republica-dominicana/obligatoriedad-de-factura-electronica/)
- [Galileo Contabilidad — Facturación electrónica obligatoria 2026 para MIPYMES dominicanas](https://galileocontabilidad.com/blog/posts/novedades-dgii-2026/)
- [Treinta — Control de inventario de repuestos en tu taller mecánico](https://treinta.co/blog/control-inventario-repuestos)
- [Kosmo — Automatizar clínica dental con WhatsApp: reducir no-shows](https://kosmo.com.mx/blog/automatizar-clinica-dental-whatsapp)
- [Stacker — Small business statistics and trends every owner should know in 2026](https://www.timeshudsonvalley.com/wallkill-valley-times/premium/stacker/stories/small-business-statistics-and-trends-every-owner-should-know-in-2026,240074)
