import type { CasoEval } from "./casos";

/**
 * Set retenido. Escrito DESPUÉS de cerrar el extractor y sin ajustarlo para
 * que pase: cada caso declara lo que un sistema competente debería hacer, no
 * lo que hace el nuestro. Por eso este es el número honesto, y por eso es
 * el que se publica.
 *
 * Recoge cómo escribe la gente de verdad: dimensiones en vez de superficie,
 * negaciones, regionalismos, faltas, unidades mezcladas.
 */
export const CASOS_DIFICILES: CasoEval[] = [
  {
    id: "dimensiones",
    descripcion: "Da largo por ancho en vez de superficie",
    texto: "El baño mide 2 por 3 metros. Quiero alicatado nuevo y suelo.",
    partidasEsperadas: ["alicatado", "solado_porcelanico"],
    decision: "presupuesto",
  },
  {
    id: "dimensiones-cm",
    descripcion: "Medidas en centímetros",
    texto: "Baño de 250x300 cm, quiero cambiar el suelo.",
    partidasEsperadas: ["solado_porcelanico"],
    decision: "presupuesto",
  },
  {
    id: "negacion",
    descripcion: "Excluye explícitamente un trabajo",
    texto:
      "En el baño de 5 m2 quiero alicatado nuevo. El suelo no hay que tocarlo, está bien.",
    partidasEsperadas: ["alicatado"],
    decision: "presupuesto",
  },
  {
    id: "negacion-2",
    descripcion: "Niega una partida que aparece nombrada",
    texto:
      "Cocina de 9 m2. No quiero cambiar los muebles, solo la encimera de 3 metros lineales.",
    partidasEsperadas: ["encimera"],
    decision: "presupuesto",
  },
  {
    id: "regionalismo",
    descripcion: "Vocabulario regional para alicatar",
    texto: "Quiero chapar el baño entero, son 6 metros cuadrados.",
    partidasEsperadas: ["alicatado"],
    decision: "presupuesto",
  },
  {
    id: "faltas-ortografia",
    descripcion: "Faltas y abreviaturas propias del móvil",
    texto: "ola kiero alikatado nuevo en el banyo de 5m2 y cambiar el water",
    partidasEsperadas: ["alicatado", "inodoro"],
    decision: "presupuesto",
  },
  {
    id: "decimal-coma",
    descripcion: "Superficie con decimal y coma",
    texto: "Salón de 22,5 m2, quiero pintar y poner suelo nuevo.",
    partidasEsperadas: ["pintura", "solado_porcelanico"],
    decision: "presupuesto",
  },
  {
    id: "dos-estancias",
    descripcion: "Dos estancias con superficies distintas",
    texto:
      "Quiero alicatar el baño, que tiene 5 m2, y también la cocina, que tiene 11 m2.",
    partidasEsperadas: ["alicatado"],
    decision: "presupuesto",
  },
  {
    id: "cantidad-implicita",
    descripcion: "Plural sin número",
    texto: "Hay que cambiar las puertas del pasillo, es un piso de 90 m2.",
    partidasEsperadas: ["puerta_paso"],
    decision: "escalado",
    codigoEscalado: "medicion_ausente",
  },
  {
    id: "gotele",
    descripcion: "Trabajo común que no está en el baremo",
    texto: "Quiero quitar el gotelé del salón de 20 m2 y pintar.",
    partidasEsperadas: ["pintura"],
    decision: "presupuesto",
  },
  {
    id: "superficie-implicita",
    descripcion: "Tamaño cualitativo, sin número",
    texto: "Tengo un baño pequeño y quiero alicatado nuevo y plato de ducha.",
    partidasEsperadas: ["alicatado", "banera_a_ducha"],
    decision: "escalado",
    codigoEscalado: "medicion_ausente",
  },
  {
    id: "orden-invertido",
    descripcion: "La medida aparece antes que la estancia",
    texto: "42 metros cuadrados tiene el salón y quiero ponerle suelo nuevo.",
    partidasEsperadas: ["solado_porcelanico"],
    decision: "presupuesto",
  },
  {
    id: "exclusion-estancia",
    descripcion: "Excluye una estancia del alcance",
    texto: "Pintar todo el piso de 75 m2 menos la cocina.",
    partidasEsperadas: ["pintura"],
    decision: "presupuesto",
  },
  {
    id: "pregunta-mezclada",
    descripcion: "Consulta y encargo en el mismo mensaje",
    texto:
      "¿Trabajáis los sábados? Necesitaría cambiar el suelo del dormitorio, son 13 m2, y pintarlo.",
    partidasEsperadas: ["solado_porcelanico", "pintura"],
    decision: "presupuesto",
  },
];
