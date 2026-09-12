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

---

## 6. Estructura de oferta y precios

> Rangos de partida en US$ para validar. El micro negocio latinoamericano tiene
> el margen apretado: un precio de agencia europea no cierra ninguna venta.
> El mercado de EEUU admite precios más altos por el mismo trabajo.

| Paquete | Desde | Qué incluye | Para quién |
| --- | --- | --- | --- |
| **Arranque** | US$450 | Presencia web + WhatsApp conectado + catálogo básico | El que no tiene nada |
| **Automatización puntual** | US$350 | Un proceso repetitivo resuelto de punta a punta | El que pierde horas en algo concreto |
| **Sistema a medida** | US$1,200 | Punto de venta, agenda, inventario u órdenes, modelado a su operación | El que ya le queda chico lo que tiene |
| **Acompañamiento** | US$60/mes | Soporte, ajustes y mejoras continuas | Opcional, nunca obligatorio |

**Reglas de precio:**

- Precio cerrado tras el diagnóstico. No se mueve.
- Pago en dos partes (50/50) o mensualidades para proyectos grandes.
- El código y las cuentas quedan a nombre del cliente. Siempre.

---

## 7. Pendientes

- [ ] Validar los precios con dos o tres clientes reales antes de publicarlos.
- [ ] Definir si se atiende EEUU con precios distintos y cómo se comunica.
- [ ] Fase 2: retomar facturación electrónica cuando haya clientes y una
      forma definida de cobrar la operación recurrente.

---

## Fuentes

- [DPL News — Digitalización e internacionalización, desafíos de las pymes en América Latina](https://dplnews.com/digitalizacion-internacionalizacion-desafios-pymes-america-latina/)
- [CAF — Policy Paper #12: Digitalización de las PyMEs en América Latina](https://scioteca.caf.com/bitstream/handle/123456789/1970/Policy%20Paper%20%2312%20-%20Digitalizaci%C3%B3n%20de%20las%20PyMEs%20en%20Am%C3%A9rica%20Latina.pdf?sequence=3&isAllowed=y)
- [BID — Prioridades para la digitalización empresarial en América Latina y el Caribe](https://publications.iadb.org/es/prioridades-para-la-digitalizacion-empresarial-en-america-latina-y-el-caribe)
- [Blip — Estadísticas de WhatsApp Business en LATAM 2026](https://www.blip.ai/blog/es/whatsapp/estadisticas-whatsapp-marketing-latam/)
- [Alegra — Facturación electrónica obligatoria en RD: fechas límite DGII 2026](https://blog.alegra.com/republica-dominicana/obligatoriedad-de-factura-electronica/)
- [Galileo Contabilidad — Facturación electrónica obligatoria 2026 para MIPYMES dominicanas](https://galileocontabilidad.com/blog/posts/novedades-dgii-2026/)
- [Treinta — Control de inventario de repuestos en tu taller mecánico](https://treinta.co/blog/control-inventario-repuestos)
- [Kosmo — Automatizar clínica dental con WhatsApp: reducir no-shows](https://kosmo.com.mx/blog/automatizar-clinica-dental-whatsapp)
- [Stacker — Small business statistics and trends every owner should know in 2026](https://www.timeshudsonvalley.com/wallkill-valley-times/premium/stacker/stories/small-business-statistics-and-trends-every-owner-should-know-in-2026,240074)
