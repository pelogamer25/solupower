# Auditoría on-site — pass/fail

**Fecha:** 2026-08-28 · **Páginas:** 50 (todas las del sitemap) · **Método:** rastreo del
HTML renderizado sobre el build de producción, no lectura del código fuente.

Informe legible: https://claude.ai/code/artifact/7886c90e-e1e7-443f-af59-d7b9e976c7ca

| # | Punto del checklist | Estado |
|---|---|---|
| 1 | Keywords documentadas | PASA — `seo/keywords.md`, 3.925 analizadas |
| 2 | Top keywords en headers y cuerpo | PASA — exactamente 2× por keyword objetivo |
| 3 | Estructura de headers (1 H1, H2 sección, H3 trabajo) | PASA — 50/50 un H1, 243 H2, 394 H3 |
| 4 | Enlaces internos con anchor de keyword | PASA — 349 contextuales, 0 «clic aquí» |
| 5 | Imágenes optimizadas | PARCIAL — nombres y alt hechos; geotags y compresión pendientes |
| 6 | NAP visible y coincidente con GBP | VERIFICAR — visible en el sitio; falta cotejar con la ficha |
| 7 | Prueba social / reseñas | FALTA — requiere testimonios reales del negocio |
| 8 | Teléfono + formulario arriba | PASA — hero con cotización y WhatsApp |
| 9 | Titles y metas únicos, sin keyword stuffing | PASA — 50/50 en rango, 0 duplicados |

## Cifras verificadas

| Métrica | Antes | Después |
|---|---|---|
| Páginas con ciudad en el title | 7 | 50 |
| Meta descriptions ≤ 160 caracteres | 20 | 50 |
| Titles ≤ 60 caracteres | 45 | 50 |
| Alt distintos en las fotos de trabajo | 1 | 11 |
| Nombres de archivo con keyword | 0 | 11 |
| Categorías con cuerpo SEO | 2 | 7 |
| Enlaces internos contextuales | 321 | 349 |
| Meta descriptions duplicadas | 1 | 0 |
| Imágenes sin alt (de 170) | 0 | 0 |
| Páginas con canonical | 50 | 50 |

## Pendientes del lado del negocio

1. Confirmar si se presta **limpieza de campanas extractoras** (5 keywords de competencia baja sin dueño).
2. Aportar **testimonios reales** o conectar widget de reseñas.
3. Cotejar el **NAP** con la ficha de Google Business, carácter por carácter.
4. **Geotaguear** las fotos en GeoImgr **antes** de comprimirlas (comprimir borra el EXIF).
5. Subir las fotos renombradas a **Google Business Profile**.
6. Decidir si el **teléfono** entra en la barra de navegación.
