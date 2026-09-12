# Facturación electrónica RD — requisitos reales para ser emisor

> 🗓️ **APLAZADO A FASE 2 (decisión de septiembre 2026).** Esta línea no se
> ofrece por ahora: es regulada, exige operar infraestructura por cliente y
> compite con una herramienta gratuita del Estado. La investigación queda
> completa y lista para retomarse. Ver la sección 0 de
> `docs/estrategia-comercial.md`.

> **Fuentes.** Las secciones 1 a 6 salen de **dos documentos oficiales de la
> DGII** leídos íntegros:
> - *Guía para ser Emisor Electrónico* (Impuestos Internos, enero 2025)
> - *Proceso de Certificación para ser Emisor Electrónico* (Impuestos Internos,
>   julio 2025)
>
> Ambos llevan la nota **"Publicación informativa sin validez legal"**: son
> guías, no la norma. La norma es la **Ley 32-23**, el **Decreto 587-24**
> (reglamento de aplicación) y la **Norma General 01-2020**.
>
> Las secciones 7 a 9 provienen de fuentes secundarias y están marcadas como
> tales. Nada de esto es asesoría fiscal.
>
> Última revisión: septiembre 2026.

---

## 1. Los tres roles: no los confundas

| Rol | Qué es | ¿Lo necesitas? |
| --- | --- | --- |
| **Emisor electrónico** | Contribuyente autorizado a emitir e-CF | Tu cliente. Y tú, para tu empresa |
| **Proveedor de servicios de FE** | Empresa certificada por la DGII para dar el servicio a terceros | Solo si vendes la facturación como servicio |
| **Desarrollador de software** | Quien construye la solución | No requiere certificación propia |

El formulario de postulación pregunta explícitamente el **Tipo de Software**:
si fue *adquirido a un proveedor externo* o *desarrollado de manera interna*.
Si es adquirido, hay que completar además una sección **"Datos del Proveedor"**.

**Consecuencia:** puedes construirle el software a tu cliente y él se certifica
declarando software desarrollado internamente o indicándote a ti como
proveedor, sin que tú tengas que estar certificado como *Proveedor de Servicios
de FE*. Ese es el camino corto.

---

## 2. Requisitos para solicitar la autorización

Los dos documentos oficiales listan requisitos ligeramente distintos. Esta es
la unión de ambos:

1. **Estar inscrito en el RNC** y registrado como contribuyente con
   obligaciones tributarias a su cargo.
2. **Clave de acceso a la Oficina Virtual (OFV).**
3. **Autorización para emitir comprobantes fiscales (Alta NCF)**, cumpliendo la
   **Norma General 06-2018**.
4. **Certificado Digital para Procedimiento Tributario**, emitido por una
   prestadora de servicios de confianza autorizada por el **INDOTEL**, **a
   nombre de la persona que actuará como Usuario Administrador e-CF**. El
   representante **debe estar vinculado al RNC** del contribuyente.
5. **Disponer de un software** para la emisión de e-CF.
6. **Estar al día** en el cumplimiento de sus obligaciones tributarias.
7. **Completar el formulario FI-GDF-016** — *Formulario de Solicitud para ser
   Emisor Electrónico, Vers. C*.

> Si no se cumplen los requisitos, **la solicitud es rechazada** y solo puede
> volver a introducirse cuando se hayan subsanado las razones del rechazo.

### Datos mínimos que debe tener el representante en su registro

Son obligatorios para poder certificarse:

- RNC / Cédula (RNC asignado si es extranjero, cédula si es nacional)
- Pasaporte (solo si es extranjero; si es nacional **no** debe tener pasaporte)
- Nombre
- Correo electrónico

Si alguno está errado o incompleto, el representante debe actualizar su
registro por los canales oficiales antes de poder continuar.

---

## 3. El requisito técnico que casi nadie menciona

En el formulario de postulación hay que declarar **tres URL de servicios web**:

| Campo | Qué debe hacer ese servicio |
| --- | --- |
| **URL Recepción** | Recibir los e-CF que otros le emitan al contribuyente (rol de receptor electrónico) |
| **URL Aprobación** | Recibir las Aprobaciones o Rechazos Comerciales sobre los e-CF que el contribuyente emitió |
| **URL Autenticación** | Validar identidad: recibe una petición con certificado digital sobre un archivo semilla y devuelve un **token con duración determinada** |

Primero se declaran en ambiente de prueba y al final (paso 12) hay que
registrar las **URL de producción**, que quedan en el *directorio de servicios*
y se cargan en la OFV.

> ### ⚠️ Esto cambia tu modelo de negocio
>
> Un emisor con solución propia **tiene que exponer tres servicios web públicos
> y mantenerlos en pie**. Un colmado o un taller no puede hacer eso solo:
> alguien tiene que hospedarlos, monitorearlos y responder cuando se caigan.
>
> Es decir: **vender facturación electrónica a medida implica operar
> infraestructura por cliente, de forma continua.** Eso tiene costo recurrente
> real (hosting, certificados, monitoreo, respuesta a fallos).
>
> **Choca con el mensaje actual de la web, que dice "0 mensualidades
> obligatorias".** Para esta línea sí hace falta un cargo recurrente, o pierdes
> dinero. Hay que decidir cómo se comunica sin contradecir la promesa general:
> lo honesto es distinguir entre *"tu software es tuyo y no pagas licencia"* y
> *"la operación del servicio ante la DGII sí tiene un costo mensual"*.

---

## 4. El proceso, paso a paso (fuente oficial)

Tres etapas: **Solicitud → Set de Pruebas → Certificación**.

### Etapa 1 · Solicitud

1. Cumplir los requisitos y completar el **formulario FI-GDF-016** en la OFV.
2. Si la solicitud cumple, llega un mensaje al **Buzón de la OFV** con las
   instrucciones para acceder al **Portal de Certificación de FE**, incluyendo
   usuario y clave.
3. Ya autenticado, y **antes de iniciar la certificación**, se puede probar en
   el **ambiente de pre-certificación** para confirmar la integración del
   sistema.
4. Para arrancar: **"Crear Postulación"** → opción **"Emisor Electrónico"**.

### Etapa 2 · Set de pruebas (14 pasos)

**Paso 1 — Registrado.** Se completa el formulario de postulación. Los datos
del contribuyente y del representante vienen prellenados; hay que añadir los
**Datos del software**: Tipo de Registro, Tipo de Software (adquirido o
interno), Nombre del Software, las tres URL, Versión del Software y, si aplica,
Datos del Proveedor.

Después: **"Generar archivo"** descarga la postulación en **XML**, que hay que
**firmar digitalmente** y volver a cargar. La DGII valida y, si todo está bien,
habilita las pruebas.

> La DGII ofrece de forma **opcional** la herramienta **"App Firma Digital"**
> para firmar estos archivos.

**Paso 2 — Pruebas de Datos (e-CF).** Se descarga un **set de datos en Excel**
suministrado por la DGII y se generan los XML de e-CF.

> **Regla dura:** hay que generar los XML **con los mismos campos y en el mismo
> orden** que el archivo descargado. Si un e-CF sale **"Rechazado"**, hay que
> **reiniciar la generación del set completo**.

**Paso 3 — Pruebas de Datos (Aprobaciones o Rechazos Comerciales).** Igual: se
descarga otro Excel y se generan las aprobaciones/rechazos en XML.

**Respuestas de validación.** Para e-CF se recibe un **TrackId** con el que se
consulta el resultado:

| Estado | Significado |
| --- | --- |
| **Aceptado** | Cumple y la información es íntegra y coherente |
| **Rechazado** | No cumple o presenta errores |
| **Aceptado Condicional** | No amerita rechazo, pero hay irregularidades que corregir para comprobantes futuros |
| **En Proceso** | Todavía validando; hay que consultar más tarde |

Para aprobaciones/rechazos comerciales: **"OK"**, o **"Error"/"Incorrecto"**.

**Paso 4 — Pruebas de Simulación (envío de e-CF).** Se generan facturas con
**datos representativos de la operación real** del contribuyente.

**Paso 5 — Pruebas de Simulación (Representación Impresa).** Se envía la RI de
los e-CF anteriores en **PDF de máximo 10 MB**.

**Paso 6 — Validación de la RI.** Respuesta: **Aprobada** o **Rechazada**. Si
se rechaza, se corrige y se reenvía.

**Paso 7 — URL Servicio de Prueba.** Actualizar las URL de recepción y
aprobación comercial (y opcionalmente la de autenticación) si cambiaron.

**Paso 8 — URL Pruebas de Comunicación.** Opcionalmente se valida el
certificado digital descargando el **certificado raíz**. Después se marca que
se está listo para recibir e-CF.

**Paso 9 — Recepción de e-CF.** Ahora la DGII **envía** comprobantes al
contribuyente, que debe **retornar los acuses de recibo**.

**Paso 10 — Inicio prueba Aprobaciones Comerciales.** Se marca "Enviar prueba
de Aprobaciones Comerciales".

**Paso 11 — Recepción de Aprobaciones Comerciales.** El contribuyente, como
receptor, recibe las aprobaciones/rechazos que envía la DGII y responde.

**Paso 12 — URL Servicios Producción.** Se registran las URL definitivas de
Autenticación, Recepción y Aprobación Comercial del ambiente productivo.

**Paso 13 — Declaración Jurada.** Formulario electrónico **bajo fe de
juramento** que hace constar que la certificación se hizo íntegramente, sin
fraude ni irregularidades. Se descarga en **XML** (contiene RNC, representante
y condiciones normativas), se **firma digitalmente** y se envía. Se valida que
la haya firmado el representante indicado en la postulación.

**Paso 14 — Verificación del estatus.** La DGII vuelve a revisar que el
contribuyente siga al día, con clave OFV, Alta NCF y representante registrado.
Si algo falla, hay que corregirlo para poder completar.

### Etapa 3 · Certificación

Completadas todas las pruebas y aceptada la declaración jurada, se otorga la
autorización. Se habilita en la OFV el **menú de Facturación Electrónica** con:

- Registro de contingencia
- Delegación
- Consulta de e-CF emitidos, recibidos y anulados
- Consulta de directorio electrónico
- **Mantenimiento de directorio** (aquí viven las URL de producción)

A partir de ahí se solicitan los **e-NCF** y se empieza a emitir.

### Servicios técnicos de la DGII (ambiente de certificación)

- Recepción: `https://eCF.dgii.gov.do/CerteCF/Recepcion`
- Consulta de resultado: `https://eCF.dgii.gov.do/CerteCF/ConsultaResultado`

### Cancelar o cambiar de representante

- Se puede **cancelar la postulación en cualquiera de los pasos 1 al 13**,
  indicando el motivo.
- Para cambiar de representante con una certificación en curso: cancelar con
  la justificación **"Cambio de representante"**, crear otra postulación y
  elegir al nuevo. El anterior queda sustituido también en pre-certificación.

---

## 5. Obligaciones permanentes del emisor

Según la *Guía*, todo emisor electrónico debe:

1. **Firmar digitalmente** los e-CF con su certificado vigente.
2. **Emitir la Representación Impresa** del e-CF al receptor **no** electrónico.
3. **Recibir** todos los e-CF de sus proveedores emitidos válidamente.
4. **Exhibir a la DGII** toda información digital o física requerida, conforme
   al Código Tributario.
5. **Conservar los e-CF** conforme al Código Tributario.

> **Ojo al cotizar:** la obligación 3 significa que el sistema no solo emite,
> **también tiene que recibir**. Mucha gente presupuesta solo la emisión.

---

## 6. Contingencias (plazos exactos)

| Causa | Qué hacer | Plazo |
| --- | --- | --- |
| **Falta de conectividad** | Generar los e-CF offline y enviarlos después | **No más de 72 horas** |
| **Imposibilidad de emitir el e-CF** | Usar secuencias autorizadas de comprobantes **no** electrónicos y después enviar los e-CF que los reemplazan | Envío en **máximo 30 días calendario**. La contingencia **no puede exceder 15 días calendario** |
| **Los mecanismos de la DGII no están disponibles** | Almacenar los e-CF y enviarlos al restablecerse la comunicación | — |

**Envío diferido:** excepcionalmente la DGII puede autorizar envío diferido a
contribuyentes que operen fuera de su domicilio con **dispositivos portátiles
sin conexión a internet**, tanto hacia la DGII como hacia el receptor.

> Para un negocio con internet inestable —común en RD— la contingencia **no es
> un extra, es parte del alcance obligatorio**. Si no la construyes, el cliente
> incumple el primer día que se le caiga la conexión.

---

## 7. Facturador Gratuito — tu competencia en el segmento micro

Herramienta de la DGII que genera **facturas, notas de crédito y notas de
débito**. Requisitos oficiales:

- RNC inscrito
- Clave de OFV **y** dispositivo de seguridad (Token, Tarjeta de Código, Token
  Digital u otro)
- Autorización para emitir comprobantes fiscales (NCF)
- Al día con obligaciones tributarias y deberes formales
- **Certificado Digital** a nombre del representante, de una entidad autorizada
  por INDOTEL — **el mismo requisito que las demás vías**
- Computadora o celular con internet
- **No haber sido autorizado antes a emitir e-CF por un sistema distinto**
- **Facturar como máximo 150 facturas al mes**
- Completar el **formulario FI-GDF-018**, Vers. A

### Cómo argumentar frente a él

No se argumenta en contra: se argumenta **cuándo deja de servir**.

- Más de 150 facturas al mes: se queda corto por diseño.
- Es 100% en línea: sin internet no se factura.
- **No se integra con nada**: el dato se teclea dos veces.
- No conoce tu operación: no descuenta inventario ni arma la orden de trabajo.

> **El argumento honesto:** *"Si facturas poco y no necesitas que se conecte con
> nada, usa el Facturador Gratuito y no me pagues. Yo entro cuando facturar
> tiene que ser parte de tu operación, no un trámite aparte."*

---

## 8. Datos de fuentes secundarias (verificar)

> Lo de esta sección **no** sale de los dos PDF oficiales. Trátalo como
> orientación, no como dato firme.

### Calendario de obligatoriedad

| Categoría | Fecha |
| --- | --- |
| Grandes contribuyentes nacionales | Mayo 2024 |
| Grandes locales y medianos | 15 de noviembre de 2025 |
| **Micro, pequeños y no clasificados** | **15 de noviembre de 2026** |

Sanciones mencionadas: multas de 5 a 50 salarios mínimos y pérdida de validez
fiscal de los comprobantes.

### Tipos de e-CF

| Código | Tipo |
| --- | --- |
| 31 | Factura de Crédito Fiscal |
| 32 | Factura de Consumo |
| 33 | Nota de Débito |
| 34 | Nota de Crédito |
| 41 | Compras |
| 43 | Gastos Menores |
| 44 | Regímenes Especiales |
| 45 | Gubernamental |
| 46 | Exportaciones |
| 47 | Pagos al Exterior |

Para el micro negocio típico, el grueso son **32**, **31** y **34**.

### PSC autorizadas por INDOTEL

Las fuentes secundarias mencionan **Viafirma, Digifirma y Novofirma**. Los PDF
oficiales solo dicen "prestadora autorizada por el INDOTEL", sin nombrarlas.
**Confirma la lista vigente en INDOTEL.**

### Incentivo fiscal (arts. 38-42, Ley 32-23)

Certificado de crédito fiscal por habilitarse durante el **período de
voluntariedad**, imputable contra anticipos de ISR, ITBIS operacional, ISR o
impuesto a los activos del mismo ejercicio:

| Categoría | Hasta |
| --- | --- |
| Micro y no clasificados | RD$25,000 |
| Pequeños | RD$75,000 |
| Medianos | RD$200,000 |
| Grandes MiPymes | RD$300,000 |
| Grandes nacionales | RD$2,000,000 |

> ⚠️ **Conflicto sin resolver.** Unas fuentes dicen que el período voluntario
> para micro y pequeños corre hasta el **15 de noviembre de 2026**; otras
> hablan del **15 de mayo de 2026**, que ya pasó. **No uses esta cifra en
> publicidad hasta confirmarla con la DGII.** Prometer RD$75,000 que después no
> llegan destruye tu reputación en un mercado pequeño.

### Ser Proveedor de Servicios de FE (Norma General 10-21)

Requisitos según fuentes secundarias:

1. RNC con actividad de desarrollo de software o soluciones tecnológicas
2. **Estar previamente certificado como Emisor Electrónico** ← el orden no se salta
3. Al día con obligaciones tributarias
4. Cumplir requisitos técnicos de la DGII
5. Presentar la documentación requerida
6. Superar el proceso de certificación como proveedor
7. Al aprobarse: documento acreditativo + aparecer en la **lista pública de
   proveedores autorizados**

No encontré exigencias de capital mínimo ni fianza, pero **no leí la Norma
10-21 completa**. Verifícalo antes de tomar este camino.

---

## 9. Qué significa para tu oferta

1. **Puedes vender ya sin certificarte como proveedor.** Construyes, el cliente
   se certifica. El formulario contempla software interno o de proveedor.
2. **El certificado digital es de terceros y bloquea todo.** Cotízalo aparte,
   avisa del plazo, y no arranques sin que esté en trámite.
3. **Revisa el RNC del cliente antes de cotizar.** Si no está al día, o el
   representante no tiene bien el correo o la cédula, el proceso se traba.
4. **El alcance real incluye recibir, no solo emitir**, más acuse de recibo,
   aprobación comercial, anulación, RI con QR y contingencia.
5. **Hay costo recurrente inevitable** por las tres URL de servicios. Decide
   cómo lo cobras antes de publicar precios de esta línea.
6. **No compitas con el Facturador Gratuito por precio.** Compite por
   integración, y dilo abiertamente: gana credibilidad.
7. **Si un e-CF de prueba sale Rechazado hay que reiniciar el set completo.**
   Presupuesta margen: la certificación no es lineal.

---

## 10. Pendientes

- [ ] Confirmar si el período voluntario del incentivo sigue abierto.
- [ ] Leer la Norma General 10-21 completa (¿capital, fianza?).
- [ ] Confirmar la lista vigente de PSC en INDOTEL y sus precios y plazos.
- [ ] Leer el *Informe Técnico e-CF* (especificaciones de la RI) y el
      *Formato e-CF v1.0*.
- [ ] Definir el modelo de cobro recurrente para la operación de los servicios.
- [ ] Decidir si a mediano plazo conviene certificarse como Proveedor de
      Servicios de FE.

### Enlaces oficiales

- [Portal de Facturación Electrónica — DGII](https://dgii.gov.do/cicloContribuyente/facturacion/comprobantesFiscalesElectronicosE-CF/Paginas/default.aspx)
- [Norma General 10-2021](https://dgii.gov.do/legislacion/normasGenerales/Documents/NG%20sobre%20Comprobantes%20Fiscales/Norma10-21.pdf)
- [Formato e-CF v1.0](https://dgii.gov.do/cicloContribuyente/facturacion/comprobantesFiscalesElectronicosE-CF/Documentacin%20sobre%20eCF/Formatos%20XML/Formato%20Comprobante%20Fiscal%20Electr%C3%B3nico%20(e-CF)%20v1.0.pdf)
- [Descripción Técnica de FE v1.6](https://dgii.gov.do/cicloContribuyente/facturacion/comprobantesFiscalesElectronicosE-CF/Documentacin%20sobre%20eCF/Informe%20y%20Descripci%C3%B3n%20T%C3%A9cnica/Descripcion-tecnica-de-facturacion-electronica.pdf)
- [Formato Aprobación Comercial v1.0](https://dgii.gov.do/cicloContribuyente/facturacion/comprobantesFiscalesElectronicosE-CF/Documentacin%20sobre%20eCF/Formatos%20XML/Formato%20Aprobaci%C3%B3n%20Comercial%20v1.0.pdf)
- [Proveedores de Servicios de FE Autorizados](https://dgii.gov.do/cicloContribuyente/facturacion/comprobantesFiscalesElectronicosE-CF/Paginas/Proveedores-servicios-FE-autorizados.aspx)
- [Facturador Gratuito](https://dgii.gov.do/cicloContribuyente/facturacion/comprobantesFiscalesElectronicosE-CF/Paginas/facturador-gratuito.aspx)
- [Servicios Electrónicos de Confianza — INDOTEL](https://indotel.gob.do/firma-digital/servicios-electronicos-de-confianza/)

**Contacto DGII:** (809) 689-3444 · informacion@dgii.gov.do
