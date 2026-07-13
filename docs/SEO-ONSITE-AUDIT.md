# SEO On-Site Audit — SOLUPOWER (build local)

> `/seo audit` ejecutado sobre el build renderizado en `localhost:3000` (15 páginas crawleadas,
> señales extraídas del HTML server-side). Complementa a [SEO-AUDIT.md](./SEO-AUDIT.md)
> (competidores + keywords). Fecha: julio 2026.

## SEO Health Score: **74 / 100** — "Base técnica excelente, sin datos reales ni autoridad todavía"

| Categoría | Peso | Score | Lectura |
|---|---|---|---|
| Technical SEO | 22% | 88 | robots.txt, sitemap.xml, canonical en todas, 1 H1/página, index,follow, URLs limpias, hreflang base ✓ |
| Content Quality | 23% | 62 | Estructura e interlinking excelentes, pero **blog thin y duplicado**, contenido de producto corto vs. líder, sin E-E-A-T real |
| On-Page SEO | 20% | 85 | Títulos/descripciones únicos, 1 H1, keywords alineadas, **25–31 enlaces internos/página** ✓ |
| Schema | 10% | 80 | Organization, WebSite, Product, Service, BlogPosting, BreadcrumbList ✓; faltan LocalBusiness y Offer/precio |
| Performance (CWV·INP) | 10% | 72* | SSG + next/font + JS bajo ✓; **hero de 40 frames (2.9 MB) + blur pesado** = riesgo LCP/INP (validar en campo) |
| AI Search (GEO) | 10% | 68 | HTML limpio y semántico ✓; falta `llms.txt`, entidad/autoría y bloques citables |
| Images | 5% | 30 | **0 imágenes reales** (todo gradientes/canvas). Sin image SEO ni foto de producto |

\* Provisional: los Core Web Vitals reales (INP/LCP/CLS) requieren medición en campo tras el deploy.

---

## Hallazgos por prioridad

### 🔴 CRITICAL — bloquea indexación/confianza
1. **Datos NAP y dominio son placeholders.** El canonical apunta a `https://www.solupower.co`
   (teléfono `+57 300 000 0000`, WhatsApp `573000000000`, email y dirección genéricos). Sin datos
   reales no hay confianza ni SEO local. → `config/site.ts`.
2. **El sitio no está desplegado (solo local, HTTP).** Nada se indexa hasta publicar en el dominio
   real con **HTTPS** y darlo de alta en **Google Search Console** (+ enviar sitemap).

### 🟠 HIGH — impacto fuerte en ranking
3. **Contenido de blog duplicado y thin.** Los 3 artículos comparten **el mismo cuerpo genérico**
   (~460 palabras). Riesgo de contenido casi duplicado + E-E-A-T bajo. → escribir artículos únicos
   de 800–1500 palabras con datos, ejemplos y autoría.
4. **Cero imágenes reales + Product schema sin `image` ni `Offer`.** Para un vendedor de equipos,
   las fotos de producto (con `alt` descriptivo) y el precio/`Offer` son señales clave y fuente de
   tráfico de Google Imágenes/Shopping. Los competidores las tienen.
5. **Falta `LocalBusiness`/`ProfessionalService` schema + Google Business Profile.** Es la palanca
   #1 del *local pack* ("en Bogotá / cerca de mí"). Hoy solo hay `Organization`.
6. **Contenido de producto corto** (~537 palabras) vs. la estructura larga del líder (INDPower:
   "cómo elegir", comparativa técnica, aplicaciones por sector, "dónde comprar", FAQ).
7. **Meta description del Home = 212 caracteres** (se trunca en la SERP). Recortar a ≤155.

### 🟡 MEDIUM — optimización
8. **Home hero de 40 frames (2.9 MB) precargados** + `backdrop-filter: blur` intensivo: vigilar
   **LCP/INP**. Mitigar con póster inicial + carga diferida de frames, o reducir nº de frames.
   (Reduced-motion ya está resuelto.)
9. **Falta `og:image`.** Hay OG/Twitter (6 tags) pero sin imagen → previews sociales sin miniatura.
   Añadir una imagen OG de marca (1200×630).
10. **Títulos cortos sin keyword/geo** en `/nosotros`, `/contacto`, `/clientes` (20 car.). Enriquecer
    con keyword + "Bogotá/Colombia".
11. **Falta `llms.txt`** (AI search / GEO). Bajo esfuerzo, ayuda a citabilidad en LLMs.
12. **E-E-A-T real ausente**: sin autor con experiencia, sin casos con métricas reales, sin reseñas.

### 🟢 LOW / INFO
13. **FAQPage schema — corrección importante:** desde ago-2023 Google solo da *rich results* de FAQ
    a sitios **gubernamentales y de salud**. En un sitio comercial **no genera rich result**; solo
    aporta citabilidad en IA/LLM. → prioridad **Info**, no "alto impacto". *(Esto matiza la
    recomendación de FAQPage del audit de competidores anterior.)*
14. **HowTo schema:** no usar (deprecado sept-2023). El sitio no lo usa ✓.
15. Páginas utilitarias thin (`/contacto` 213, `/clientes` 205, `/galeria` 233 palabras): aceptable
    por tipo de página; opcional enriquecer.

---

## Lo que ya está muy bien (no tocar)
- **1 solo H1 por página** en las 15 páginas; jerarquía H2/H3 correcta.
- **Títulos y meta descriptions únicos** por página vía Metadata API.
- **canonical + index,follow** en todas; URLs limpias; hreflang `es-CO`/`x-default`.
- **Interlinking semántico fuerte** (25–31 enlaces internos/página; clusters, relacionados, footer,
  sidebar) — supera a varios competidores.
- **Schema por tipo de página** correcto (Product/Service/BlogPosting/Breadcrumb).
- **robots.txt + sitemap.xml** automáticos; HTML 100% server-rendered (SSG).

---

## Plan de acción (orden recomendado)
1. **Cargar datos reales** (NAP + dominio) → desbloquea local + deploy.
2. **Deploy HTTPS + Search Console + Bing Webmaster** (enviar sitemap).
3. **Google Business Profile** + pedir reseñas.
4. **Quick wins de código** (1 sesión): `LocalBusiness` schema, `Offer`/precio en Product,
   `og:image`, recortar meta del Home, `llms.txt`, títulos con geo.
5. **Reescribir los 3 blogs** (únicos, largos) + ampliar 6 páginas de producto a la estructura larga.
6. **Fotos reales** de producto/proyectos con `alt` + `next/image`.
7. **Autoridad** (backlinks, directorios, reseñas con schema) — ver [SEO-AUDIT.md](./SEO-AUDIT.md) §5.
