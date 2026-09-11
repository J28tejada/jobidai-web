/**
 * Límite por IP en memoria. En serverless cada instancia lleva su propio
 * contador, así que no es una defensa dura: frena el abuso casual y el
 * script tonto, que es para lo que está. Un límite real necesitaría un
 * almacén compartido (Redis, Upstash), y eso se añade cuando haga falta.
 */
const ventanas = new Map<string, number[]>();

export function ipDePeticion(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "desconocida"
  );
}

export function superaLimite(
  clave: string,
  { maximo, ventanaMs }: { maximo: number; ventanaMs: number },
): boolean {
  const ahora = Date.now();
  const recientes = (ventanas.get(clave) ?? []).filter((t) => ahora - t < ventanaMs);
  recientes.push(ahora);
  ventanas.set(clave, recientes);

  // Poda perezosa para que el mapa no crezca sin control
  if (ventanas.size > 500) {
    for (const [k, tiempos] of ventanas) {
      if (tiempos.every((t) => ahora - t > ventanaMs)) ventanas.delete(k);
    }
  }

  return recientes.length > maximo;
}
