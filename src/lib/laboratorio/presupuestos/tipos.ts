/**
 * Motor de presupuestos de reforma — tipos del dominio.
 *
 * El flujo tiene cuatro etapas y cada una produce un artefacto observable:
 *   texto libre → Extraccion → Validacion → Presupuesto | Escalado
 *
 * La regla que lo sostiene todo: el extractor NUNCA produce precios. Solo
 * identifica qué se pide y cuánto se mide. El importe lo calcula el motor
 * de forma determinista contra el baremo. Así, aunque alguien manipule el
 * texto de entrada, no puede alterar un euro del resultado.
 */

export type Unidad = "m2" | "ml" | "ud";

export type Estancia =
  | "bano"
  | "cocina"
  | "salon"
  | "dormitorio"
  | "pasillo"
  | "vivienda";

/** Una línea del baremo: lo que la empresa sabe presupuestar y a qué precio. */
export type Partida = {
  id: string;
  nombre: string;
  unidad: Unidad;
  /** Precio unitario en euros, sin IVA. */
  precioUnitario: number;
  /** Estancias donde esta partida tiene sentido. */
  estancias: Estancia[];
  /** Medición admisible. Fuera de rango, el caso se escala en vez de calcularse. */
  rango: { min: number; max: number };
  /** Términos que el extractor reconoce, ya normalizados (sin tildes, minúsculas). */
  sinonimos: string[];
};

/**
 * Trabajo que la empresa hace pero que NO se puede presupuestar a distancia.
 * Detectarlo es tan importante como calcular: es la diferencia entre un
 * presupuesto honesto y un número inventado.
 */
export type MotivoVisita = {
  id: string;
  nombre: string;
  /** Por qué no se puede cerrar sin ver la obra. */
  razon: string;
  sinonimos: string[];
};

/** Superficie declarada por estancia, en metros cuadrados. */
export type MedicionEstancia = {
  estancia: Estancia;
  superficie: number | null;
};

export type PartidaDetectada = {
  partidaId: string;
  /** Cómo se detectó, para poder mostrar la traza al visitante. */
  evidencia: string;
  /** 0 a 1. Baja cuando el término es ambiguo o la medición es inferida. */
  confianza: number;
  /** Medición asociada, si el texto la aporta o se puede derivar. */
  medicion: number | null;
  /** De dónde sale la medición: del texto, de la superficie de la estancia, o de nada. */
  origenMedicion: "texto" | "estancia" | "unitaria" | "ausente";
};

export type Extraccion = {
  estancias: MedicionEstancia[];
  partidas: PartidaDetectada[];
  /** Trabajos detectados que exigen visita técnica. */
  requiereVisita: { motivoId: string; evidencia: string }[];
  /** Términos de obra reconocidos pero que no están en el baremo. */
  fueraDeCatalogo: string[];
  /** Confianza global, media ponderada de las partidas detectadas. */
  confianzaGlobal: number;
};

export type Incidencia = {
  codigo:
    | "sin_partidas"
    | "medicion_ausente"
    | "medicion_fuera_de_rango"
    | "requiere_visita"
    | "fuera_de_catalogo"
    | "confianza_baja";
  /** `bloqueante` impide calcular; `aviso` se muestra pero deja continuar. */
  gravedad: "bloqueante" | "aviso";
  mensaje: string;
  /** Qué se necesita del cliente para desbloquearlo. */
  necesita?: string;
};

export type Validacion = {
  incidencias: Incidencia[];
  /** Solo true si NO hay ninguna incidencia bloqueante. */
  puedeCalcular: boolean;
};

export type LineaPresupuesto = {
  partidaId: string;
  concepto: string;
  unidad: Unidad;
  medicion: number;
  precioUnitario: number;
  importe: number;
};

export type Presupuesto = {
  lineas: LineaPresupuesto[];
  subtotal: number;
  gestionResiduos: number;
  baseImponible: number;
  iva: number;
  total: number;
  /** Siempre true: sin ver la obra, ningún presupuesto de reforma es cerrado. */
  orientativo: true;
  validezDias: number;
};

/** Lo que se entrega cuando NO se puede calcular. Nunca un número inventado. */
export type Escalado = {
  motivo: string;
  incidencias: Incidencia[];
  /** Preguntas concretas para devolver al cliente. */
  preguntas: string[];
};

export type PasoTraza = {
  etapa: "entrada" | "extraccion" | "validacion" | "decision";
  titulo: string;
  /** Milisegundos que costó la etapa. Medido, no estimado. */
  duracionMs: number;
  detalle: unknown;
};

export type ResultadoPipeline = {
  traza: PasoTraza[];
  extraccion: Extraccion;
  validacion: Validacion;
  presupuesto: Presupuesto | null;
  escalado: Escalado | null;
  /** Payload que se enviaría al CRM. Se muestra, no se envía a ningún sitio. */
  payloadCrm: Record<string, unknown>;
  duracionTotalMs: number;
};

/**
 * Contrato del extractor. Hoy lo implementa un analizador de reglas; mañana
 * puede implementarlo un modelo de lenguaje sin tocar nada más del motor.
 * Esa costura es deliberada: el negocio no debe depender del proveedor de IA.
 */
export interface Extractor {
  readonly nombre: string;
  extraer(texto: string): Extraccion;
}
