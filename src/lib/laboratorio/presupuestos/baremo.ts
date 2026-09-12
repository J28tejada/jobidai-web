import type { Estancia, MotivoVisita, Partida } from "./tipos";

/**
 * Baremo de precios unitarios. Es la "tarifa real" contra la que se valida
 * todo. Precios orientativos de mercado dominicano, en dólares y sin ITBIS.
 *
 * Los sinónimos se escriben ya normalizados: minúsculas y sin tildes. El
 * extractor normaliza la entrada de la misma forma antes de comparar, así
 * que "Alicatado" y "alicatádo" caen en el mismo sitio.
 */
export const BAREMO: Partida[] = [
  // --- Demoliciones ---------------------------------------------------------
  {
    id: "demolicion_alicatado",
    nombre: "Demolición de alicatado existente",
    unidad: "m2",
    precioUnitario: 8,
    estancias: ["bano", "cocina"],
    rango: { min: 1, max: 120 },
    sinonimos: [
      "quitar el alicatado", "picar azulejos", "quitar azulejos",
      "demoler alicatado", "retirar alicatado", "picar el alicatado",
    ],
  },
  {
    id: "demolicion_solado",
    nombre: "Demolición de solado existente",
    unidad: "m2",
    precioUnitario: 7,
    estancias: ["bano", "cocina", "salon", "dormitorio", "pasillo", "vivienda"],
    rango: { min: 1, max: 300 },
    sinonimos: [
      "levantar el suelo", "quitar el suelo", "picar el suelo",
      "retirar el pavimento", "demoler solado", "quitar las baldosas del suelo",
    ],
  },

  // --- Revestimientos -------------------------------------------------------
  {
    id: "alicatado",
    nombre: "Alicatado cerámico, material y colocación",
    unidad: "m2",
    precioUnitario: 22,
    estancias: ["bano", "cocina"],
    rango: { min: 1, max: 120 },
    sinonimos: [
      "alicatar", "alicatado", "azulejos nuevos", "poner azulejos",
      "chapar", "chapado",
      "revestimiento de paredes", "alicatado nuevo", "cambiar los azulejos",
    ],
  },
  {
    id: "solado_porcelanico",
    nombre: "Solado de gres porcelánico, material y colocación",
    unidad: "m2",
    precioUnitario: 24,
    estancias: ["bano", "cocina", "salon", "dormitorio", "pasillo", "vivienda"],
    rango: { min: 1, max: 300 },
    sinonimos: [
      "suelo nuevo", "poner suelo", "solar", "gres", "porcelanico",
      "cambiar el suelo", "pavimento nuevo", "colocar suelo",
    ],
  },
  {
    id: "pintura",
    nombre: "Pintura plástica lisa, dos manos",
    unidad: "m2",
    precioUnitario: 5,
    estancias: ["bano", "cocina", "salon", "dormitorio", "pasillo", "vivienda"],
    rango: { min: 5, max: 600 },
    sinonimos: ["pintar", "pintura", "dar una mano de pintura", "repintar"],
  },
  {
    id: "falso_techo",
    nombre: "Falso techo de placa de yeso laminado",
    unidad: "m2",
    precioUnitario: 18,
    estancias: ["bano", "cocina", "salon", "dormitorio", "pasillo", "vivienda"],
    rango: { min: 1, max: 200 },
    sinonimos: ["falso techo", "pladur en techo", "bajar el techo", "techo nuevo"],
  },

  // --- Baño -----------------------------------------------------------------
  {
    id: "banera_a_ducha",
    nombre: "Sustitución de bañera por plato de ducha",
    unidad: "ud",
    precioUnitario: 420,
    estancias: ["bano"],
    rango: { min: 1, max: 4 },
    sinonimos: [
      "cambiar la banera por un plato de ducha", "quitar la banera y poner ducha",
      "sustituir banera por ducha", "plato de ducha", "cambiar banera por ducha",
      "convertir la banera en ducha",
    ],
  },
  {
    id: "mampara",
    nombre: "Mampara de ducha instalada",
    unidad: "ud",
    precioUnitario: 200,
    estancias: ["bano"],
    rango: { min: 1, max: 4 },
    sinonimos: ["mampara", "cerramiento de ducha"],
  },
  {
    id: "inodoro",
    nombre: "Sustitución de inodoro",
    unidad: "ud",
    precioUnitario: 120,
    estancias: ["bano"],
    rango: { min: 1, max: 6 },
    sinonimos: ["inodoro", "water", "vater", "taza del bano", "cambiar el wc"],
  },
  {
    id: "lavabo_mueble",
    nombre: "Lavabo con mueble suspendido",
    unidad: "ud",
    precioUnitario: 230,
    estancias: ["bano"],
    rango: { min: 1, max: 6 },
    sinonimos: ["lavabo", "mueble de bano", "lavamanos"],
  },
  {
    id: "fontaneria_bano",
    nombre: "Renovación de fontanería de baño",
    unidad: "ud",
    precioUnitario: 380,
    estancias: ["bano"],
    rango: { min: 1, max: 4 },
    sinonimos: [
      "fontaneria", "cambiar las tuberias", "renovar la fontaneria",
      "tuberias nuevas",
    ],
  },

  // --- Cocina ---------------------------------------------------------------
  {
    id: "muebles_cocina",
    nombre: "Muebles de cocina, alto y bajo",
    unidad: "ml",
    precioUnitario: 220,
    estancias: ["cocina"],
    rango: { min: 1, max: 20 },
    sinonimos: [
      "muebles de cocina", "amueblar la cocina", "armarios de cocina",
      "mobiliario de cocina", "muebles nuevos", "muebles",
    ],
  },
  {
    id: "encimera",
    nombre: "Encimera de compacto fenólico",
    unidad: "ml",
    precioUnitario: 150,
    estancias: ["cocina"],
    rango: { min: 1, max: 20 },
    sinonimos: ["encimera", "encimera nueva", "cambiar la encimera"],
  },

  // --- Carpintería y electricidad ------------------------------------------
  {
    id: "puerta_paso",
    nombre: "Puerta de paso lacada, instalada",
    unidad: "ud",
    precioUnitario: 170,
    estancias: ["salon", "dormitorio", "pasillo", "vivienda", "bano", "cocina"],
    rango: { min: 1, max: 15 },
    sinonimos: ["puerta", "puertas", "puerta de paso", "cambiar las puertas"],
  },
  {
    id: "ventana_pvc",
    nombre: "Ventana de PVC con vidrio bajo emisivo",
    unidad: "ud",
    precioUnitario: 280,
    estancias: ["salon", "dormitorio", "cocina", "bano", "vivienda"],
    rango: { min: 1, max: 20 },
    sinonimos: ["ventana", "ventanas", "cambiar las ventanas", "ventanas de pvc"],
  },
  {
    id: "electricidad_estancia",
    nombre: "Renovación de instalación eléctrica por estancia",
    unidad: "ud",
    precioUnitario: 320,
    estancias: ["bano", "cocina", "salon", "dormitorio", "vivienda"],
    rango: { min: 1, max: 10 },
    sinonimos: [
      "instalacion electrica", "cambiar los enchufes", "renovar la electricidad",
      "electricidad nueva", "cableado",
    ],
  },
];

/**
 * Trabajos que la empresa hace pero que no se cotizan a distancia. Detectarlos
 * y frenar es el comportamiento correcto: un número inventado aquí cuesta más
 * que no dar número.
 */
export const MOTIVOS_VISITA: MotivoVisita[] = [
  {
    id: "obra_estructural",
    nombre: "Modificación de distribución o estructura",
    razon:
      "Tirar o levantar tabiques exige comprobar si el muro es de carga y puede requerir proyecto y licencia. No se cotiza sin ver la obra.",
    sinonimos: [
      "tirar un tabique", "tirar el tabique", "quitar un tabique",
      "tirar una pared", "quitar una pared", "abrir un hueco",
      "cambiar la distribucion", "unir el salon y la cocina",
      "muro de carga", "derribar una pared",
    ],
  },
  {
    id: "instalacion_gas",
    nombre: "Instalación o modificación de gas",
    razon:
      "Cualquier intervención en la instalación de gas requiere instalador autorizado y certificado. Se presupuesta tras inspección.",
    sinonimos: ["instalacion de gas", "caldera de gas", "tuberia de gas", "mover la caldera"],
  },
  {
    id: "elemento_comunitario",
    nombre: "Intervención sobre elemento comunitario",
    razon:
      "Bajantes, fachada y cubierta son elementos comunes: necesitan autorización de la comunidad antes de poder presupuestar.",
    sinonimos: ["bajante", "fachada", "cubierta", "tejado", "patio de luces"],
  },
  {
    id: "humedades",
    nombre: "Patología de humedades",
    razon:
      "Una humedad hay que diagnosticarla en obra antes de saber si es filtración, capilaridad o condensación. El coste cambia por diez según el caso.",
    sinonimos: ["humedad", "humedades", "moho", "filtracion", "gotera"],
  },
];

/** Rangos de superficie con sentido por estancia, para detectar incoherencias. */
export const RANGOS_ESTANCIA: Record<Estancia, { min: number; max: number }> = {
  bano: { min: 2, max: 15 },
  cocina: { min: 4, max: 30 },
  salon: { min: 8, max: 60 },
  dormitorio: { min: 6, max: 40 },
  pasillo: { min: 2, max: 30 },
  vivienda: { min: 25, max: 400 },
};

export const NOMBRE_ESTANCIA: Record<Estancia, string> = {
  bano: "baño",
  cocina: "cocina",
  salon: "salón",
  dormitorio: "dormitorio",
  pasillo: "pasillo",
  vivienda: "vivienda completa",
};

/** Sinónimos de estancia, normalizados. */
export const SINONIMOS_ESTANCIA: Record<Estancia, string[]> = {
  bano: ["bano", "aseo", "cuarto de bano", "servicio"],
  cocina: ["cocina"],
  salon: ["salon", "comedor", "sala de estar", "salon comedor"],
  dormitorio: ["dormitorio", "habitacion", "cuarto", "alcoba"],
  pasillo: ["pasillo", "recibidor", "distribuidor", "entrada"],
  vivienda: ["piso", "vivienda", "casa", "toda la casa", "vivienda completa", "todo el piso"],
};

/** Parámetros comerciales del presupuesto. */
export const PARAMETROS = {
  /** Porcentaje del subtotal que se imputa a gestión de residuos y contenedor. */
  tasaResiduos: 0.04,
  /** ITBIS dominicano. Cambia según el país donde opere el negocio. */
  impuesto: 0.18,
  validezDias: 30,
  /** Por debajo de esta confianza media, el caso se marca para revisión. */
  umbralConfianza: 0.55,
};

export function buscarPartida(id: string): Partida | undefined {
  return BAREMO.find((p) => p.id === id);
}
