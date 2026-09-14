#!/usr/bin/env python3
"""
Genera las diapositivas .dc.html del carrusel a partir del contenido de abajo.

Las fuentes de la marca se incrustan como data: URI porque la exportacion a
PNG del canvas no incrusta fuentes de Google, y el PNG es el entregable real.
Se subsetean a los caracteres que usa el carrusel: de 76 KB a unos pocos.
"""
import base64, io, pathlib, re
from fontTools import subset
from fontTools.ttLib import TTFont

RAIZ = pathlib.Path(__file__).resolve().parents[3]
SALIDA = pathlib.Path(__file__).resolve().parent
MEDIA = RAIZ / ".next/static/media"

FAMILIAS = ["Bricolage Grotesque", "Geist"]


def resolver_fuentes():
    """Next renombra las fuentes con un hash en cada build, asi que se
    resuelven leyendo el CSS generado en vez de fijar los nombres."""
    css = sorted((RAIZ / ".next/static/chunks").glob("*.css"))
    if not css:
        raise SystemExit("No hay CSS generado. Corre `npm run build` primero.")
    texto = "\n".join(c.read_text(encoding="utf-8", errors="ignore") for c in css)
    encontradas = {}
    for bloque in re.findall(r"@font-face\{([^}]*)\}", texto):
        familia = re.search(r"font-family:([^;]*)", bloque)
        url = re.search(r"url\(([^)]*)\)", bloque)
        if not familia or not url:
            continue
        nombre = familia.group(1).strip().strip("\"'")
        # El subconjunto latino es el que Next marca con `-s.p.`; es el unico
        # que trae acentos y signos de apertura del espanol.
        if nombre in FAMILIAS and "-s.p." in url.group(1):
            encontradas[nombre] = pathlib.Path(url.group(1)).name
    faltan = [f for f in FAMILIAS if f not in encontradas]
    if faltan:
        raise SystemExit(f"No encontre en el CSS: {', '.join(faltan)}")
    return encontradas

# Espanol completo + la puntuacion que usamos. Generoso a proposito: subsetear
# de mas obliga a regenerar por cada cambio de copy.
CARACTERES = (
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    "áéíóúüñÁÉÍÓÚÜÑ¿?¡!.,:;·—–-()[]%$/\"'“”‘’ →×+#@&*…"
)

# ---------------------------------------------------------------- paleta
CANVAS   = "#070910"
SUPERFIC = "#0e111b"
ELEVADO  = "#171b28"
TEXTO    = "#f7f8fc"
MUTED    = "#b0b6c9"
FAINT    = "#8b92a8"
AZURE4   = "#3b9ae1"
AZURE3   = "#8fbce6"
VIOLETA4 = "#9b7fd4"
LINEA    = "rgba(247, 248, 252, 0.09)"
GRAD_TXT = f"linear-gradient(100deg, {AZURE3} 0%, {AZURE4} 38%, {VIOLETA4} 100%)"
GRAD_BG  = "linear-gradient(100deg, #106ebe 0%, #6e4cae 100%)"

DISPLAY = "'Bricolage Grotesque', Georgia, serif"
SANS    = "Geist, ui-sans-serif, system-ui, sans-serif"


def subsetear():
    piezas = []
    for familia, archivo in resolver_fuentes().items():
        origen = MEDIA / archivo
        if not origen.exists():
            raise SystemExit(f"Falta la fuente {origen}. Corre `npm run build` primero.")
        fuente = TTFont(io.BytesIO(origen.read_bytes()))
        s = subset.Subsetter(subset.Options(layout_features=["*"], flavor="woff2"))
        s.populate(text=CARACTERES)
        s.subset(fuente)
        buf = io.BytesIO()
        fuente.flavor = "woff2"
        fuente.save(buf)
        b64 = base64.b64encode(buf.getvalue()).decode()
        print(f"  {familia}: {origen.stat().st_size // 1024} KB -> {len(buf.getvalue()) // 1024} KB")
        piezas.append(
            "@font-face{font-family:'%s';font-style:normal;font-weight:200 800;"
            "font-display:block;src:url(data:font/woff2;base64,%s) format('woff2');}"
            % (familia, b64)
        )
    return "".join(piezas)


def envoltura(cuerpo: str, numero: int, fuentes: str, total: int = 7) -> str:
    """Marco comun: fondo, marca arriba a la izquierda, numeracion abajo."""
    return f"""<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
  <style>
    {fuentes}
    body {{ margin: 0; }}
    a {{ color: {AZURE4}; }}
    a:hover {{ color: {AZURE3}; }}
  </style>
</helmet>
<div style="width: 1080px; height: 1350px; background: {CANVAS}; color: {TEXTO};
            font-family: {SANS}; display: flex; flex-direction: column;
            padding: 84px; box-sizing: border-box; position: relative; overflow: hidden;">

  <div style="display: flex; justify-content: space-between; align-items: center;">
    <span style="font-family: {SANS}; font-size: 24px; font-weight: 600;
                 letter-spacing: 0.18em; color: {FAINT};">JOBID</span>
    <span style="font-family: {SANS}; font-size: 24px; font-weight: 500;
                 letter-spacing: 0.08em; color: {FAINT};">{numero}/{total}</span>
  </div>

{cuerpo}

</div>
</x-dc>
</body>
</html>
"""


def titular(texto: str, tam: int = 108, color: str = TEXTO, peso: int = 600) -> str:
    return (f'<h1 style="font-family: {DISPLAY}; font-size: {tam}px; font-weight: {peso}; '
            f'line-height: 1.02; letter-spacing: -0.03em; margin: 0; color: {color}; '
            f'text-wrap: pretty;">{texto}</h1>')


def degradado(texto: str) -> str:
    return (f'<span style="background-image: {GRAD_TXT}; background-clip: text; '
            f'-webkit-background-clip: text; color: transparent;">{texto}</span>')


def parrafo(texto: str, tam: int = 38, color: str = MUTED, tope: int = 40,
            medida: int = 30) -> str:
    # 30ch a 38px ocupa ~600 de los 912 utiles. Con 20ch el texto rompia tan
    # pronto que media diapositiva quedaba vacia y parecia un error de maqueta.
    return (f'<p style="font-family: {SANS}; font-size: {tam}px; line-height: 1.5; '
            f'margin: {tope}px 0 0; color: {color}; max-width: {medida}ch; '
            f'text-wrap: pretty;">{texto}</p>')


def centro(interior: str) -> str:
    return (f'<div style="flex-grow: 1; display: flex; flex-direction: column; '
            f'justify-content: center;">{interior}</div>')


FLECHA = (
    f'<svg width="30" height="30" viewBox="0 0 24 24" fill="none" '
    f'stroke="{AZURE4}" stroke-width="2.2" stroke-linecap="round" '
    f'stroke-linejoin="round" aria-hidden="true">'
    f'<path d="M5 12h13"/><path d="M13 6l6 6-6 6"/></svg>'
)


def pie_desliza(texto: str = "Desliza") -> str:
    return (f'<div style="display: flex; align-items: center; gap: 14px;">'
            f'<span style="font-family: {SANS}; font-size: 26px; font-weight: 500; '
            f'letter-spacing: 0.04em; color: {FAINT};">{texto}</span>{FLECHA}</div>')


def item(texto: str) -> str:
    return (f'<div style="display: flex; gap: 22px; align-items: flex-start;">'
            f'<div style="flex-shrink: 0; margin-top: 12px;">{FLECHA}</div>'
            f'<span style="font-family: {SANS}; font-size: 37px; line-height: 1.4; '
            f'color: {TEXTO};">{texto}</span></div>')


# ------------------------------------------------------------- diapositivas
def slide_1():
    return centro(
        f'<span style="font-family: {SANS}; font-size: 30px; font-weight: 500; '
        f'letter-spacing: 0.1em; color: {FAINT};">11:14 p.m.</span>'
        + f'<div style="height: 34px;"></div>'
        + titular(f'Un cliente te escribió anoche.<br>{degradado("¿Cuándo le contestaste?")}', 112)
    ) + pie_desliza()


def slide_2():
    burbuja = (
        f'<div style="background: {ELEVADO}; border: 1px solid {LINEA}; '
        f'border-radius: 28px 28px 28px 8px; padding: 40px 44px; max-width: 760px;">'
        f'<p style="font-family: {SANS}; font-size: 40px; line-height: 1.42; margin: 0; '
        f'color: {TEXTO};">Buenas, ¿tienen disponible el modelo de 50 pulgadas? '
        f'¿A cómo está?</p>'
        f'<p style="font-family: {SANS}; font-size: 25px; margin: 26px 0 0; '
        f'color: {FAINT};">11:14 p.m.</p></div>'
    )
    return centro(burbuja + parrafo(
        "Está listo para comprar. En ese momento, no mañana.", 40, MUTED, 56))


def slide_3():
    return centro(
        titular(degradado("9 h 48 min"), 152, peso=700)
        + parrafo("Eso fue lo que esperó hasta tu respuesta de las 9:02 a.m.", 40, TEXTO, 48)
        + parrafo("Para ti pasó una noche. Para él, nadie le contestó.", 38, MUTED, 26)
    )


def slide_4():
    return centro(
        titular(f'Quien responde en menos de un minuto vende {degradado("hasta 8 veces más")}.', 92)
        + parrafo("No es una diferencia de trato. Es una diferencia de ventas.", 38, MUTED, 44)
    )


def slide_5():
    return centro(
        titular("No es descuido.", 112)
        + parrafo("Nadie puede estar pendiente del celular a las once de la noche.", 40, MUTED, 44)
        + f'<p style="font-family: {DISPLAY}; font-size: 60px; font-weight: 600; '
          f'line-height: 1.15; margin: 34px 0 0; letter-spacing: -0.02em; color: {TEXTO};">'
          f'Tú no. {degradado("Tu negocio sí.")}</p>'
    )


def slide_6():
    items = "".join(item(t) for t in [
        "Contesta con tus precios, tu horario y tus zonas de entrega.",
        "Cuando no sabe algo, te pasa la conversación a ti.",
        "Cada semana te digo qué te preguntaron.",
    ])
    return centro(
        titular("Tu WhatsApp puede contestar solo.", 96)
        + f'<div style="display: flex; flex-direction: column; gap: 30px; margin-top: 52px;">{items}</div>'
        + f'<p style="font-family: {DISPLAY}; font-size: 44px; font-weight: 600; '
          f'margin: 54px 0 0; letter-spacing: -0.02em; color: {AZURE3};">'
          f'Y nunca se inventa un precio.</p>'
    )


def slide_7():
    chip = (
        f'<div style="display: inline-flex; align-items: center; gap: 16px; '
        f'background-image: {GRAD_BG}; background-color: #106ebe; color: #ffffff; '
        f'padding: 28px 44px; border-radius: 999px;">'
        f'<span style="font-family: {SANS}; font-size: 34px; font-weight: 600;">'
        f'Escríbeme por WhatsApp</span></div>'
    )
    return centro(
        titular(f'¿Te está {degradado("pasando")}?', 116)
        + parrafo("Escríbeme y te digo si tiene arreglo. Si no lo tiene, también te lo digo.",
                  40, MUTED, 44)
        + f'<div style="margin-top: 56px;">{chip}</div>'
    ) + (f'<p style="font-family: {SANS}; font-size: 28px; margin: 0; color: {FAINT};">'
         f'Enlace en la bio · jobid.ai</p>')


DIAPOSITIVAS = [
    ("Main.dc.html",        slide_1),
    ("Mensaje.dc.html",     slide_2),
    ("Brecha.dc.html",      slide_3),
    ("Dato.dc.html",        slide_4),
    ("NoEsDescuido.dc.html", slide_5),
    ("Solucion.dc.html",    slide_6),
    ("Cierre.dc.html",      slide_7),
]


def main():
    print("Subseteando fuentes de la marca:")
    fuentes = subsetear()
    for indice, (nombre, constructor) in enumerate(DIAPOSITIVAS, start=1):
        (SALIDA / nombre).write_text(envoltura(constructor(), indice, fuentes), encoding="utf-8")
    peso = sum((SALIDA / n).stat().st_size for n, _ in DIAPOSITIVAS) // 1024
    print(f"{len(DIAPOSITIVAS)} diapositivas escritas ({peso} KB en total)")

    # Dos filas de cuatro y tres: 1080 de ancho + 120 de aire.
    import json
    artboards = []
    for indice, (nombre, _) in enumerate(DIAPOSITIVAS):
        fila, col = divmod(indice, 4)
        artboards.append({"file": nombre, "x": col * 1200, "y": fila * 1520,
                          "w": 1080, "h": 1350})
    (SALIDA / "canvas.json").write_text(json.dumps(
        {"artboards": artboards, "launch": {"view": "canvas"}}, indent=2), encoding="utf-8")
    print("canvas.json escrito")


if __name__ == "__main__":
    main()
