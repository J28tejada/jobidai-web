# Carruseles

Cada carpeta es un carrusel. Lo único versionado es `generar.py`: las
diapositivas `.dc.html`, el `canvas.json` y el canvas ensamblado se regeneran.

```bash
cd marketing/carruseles/<carrusel>
python3 generar.py
```

Necesita `npm run build` hecho antes (de ahí salen las fuentes de la marca) y
`pip install fonttools brotli`.

Las fuentes se incrustan como data: URI en cada diapositiva, subseteadas a los
caracteres que usa el copy. No es un capricho: la exportación a PNG del canvas
no incrusta fuentes de Google, y el PNG es el entregable que se sube a
Instagram. Sin esto el carrusel exportado sale con una tipografía distinta a la
que se ve en pantalla.
