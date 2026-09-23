# Identidad de marca — Sofía Álvarez · UX/UI

Guía de visual, voz y tono para replicar la identidad del portfolio en otros productos digitales (landings, apps, presentaciones, documentos, perfiles, prototipos).

Todo lo que figura acá sale del código del portfolio (`src/`). Cuando algo es una **recomendación** y no una práctica que ya existe, está marcado como tal.

---

## Índice

1. [Cómo usar esta guía](#1-cómo-usar-esta-guía)
2. [Esencia de marca](#2-esencia-de-marca)
3. [Arquitectura de marca: marca madre y productos](#3-arquitectura-de-marca-marca-madre-y-productos)
4. [Logo](#4-logo)
5. [Color](#5-color)
6. [Tipografía](#6-tipografía)
7. [Layout, grilla y espaciado](#7-layout-grilla-y-espaciado)
8. [Forma: radios, bordes y sombras](#8-forma-radios-bordes-y-sombras)
9. [Componentes firma](#9-componentes-firma)
10. [Iconografía y glifos](#10-iconografía-y-glifos)
11. [Recursos gráficos](#11-recursos-gráficos)
12. [Imágenes y mockups](#12-imágenes-y-mockups)
13. [Motion](#13-motion)
14. [Modo oscuro](#14-modo-oscuro)
15. [Accesibilidad (no negociable)](#15-accesibilidad-no-negociable)
16. [Voz](#16-voz)
17. [Tono según el contexto](#17-tono-según-el-contexto)
18. [Reglas de escritura](#18-reglas-de-escritura)
19. [Microcopy de referencia](#19-microcopy-de-referencia)
20. [Vocabulario](#20-vocabulario)
21. [Tokens listos para usar](#21-tokens-listos-para-usar)
22. [Checklist antes de publicar](#22-checklist-antes-de-publicar)
23. [Inconsistencias detectadas en el portfolio](#23-inconsistencias-detectadas-en-el-portfolio)

---

## 1. Cómo usar esta guía

- **Lo que no cambia**: logo, par teal + naranja, tipografía, voz, reglas de accesibilidad y curva de animación. Es lo que hace reconocible la marca.
- **Lo que se adapta**: el color de acento de cada producto, la densidad del layout, la cantidad de motion y el tono según el contexto.
- Ante una duda que la guía no cubre, la pregunta es: *¿esto hace que la experiencia sea más clara para más personas?* Si la respuesta es no, no va.

---

## 2. Esencia de marca

**Qué hace**: diseño UX/UI end-to-end, desde la investigación hasta el pixel final, con foco en fintech, mobile y productos digitales.

**Propósito**: transformar ideas complejas en experiencias simples y funcionales, sin perder de vista la diversidad de usuarios.

**Principio rector** (tomado de *Sobre mí*):
> Una interfaz realmente buena no necesita explicación.

**Promesa**: productos digitales que la gente disfruta usar.

**Diferencial**: formación en Artes Visuales y Pedagogía + experiencia con personas con necesidades diversas → la accesibilidad (WCAG 2.1/2.2) es parte del punto de partida, no un agregado al final.

### Personalidad

| Es | No es |
|---|---|
| Cálida y cercana | Informal al punto de ser poco seria |
| Clara y directa | Seca o tecnicista |
| Con criterio: explica el porqué | Soberbia o autorreferencial |
| Optimista y con energía | Exagerada, llena de superlativos |
| Curiosa, en exploración constante | Atada a modas sin fundamento |
| Inclusiva | Genérica o "para todos" sin pensar en nadie |

### Atributos visuales en una línea

**Profundo + cálido.** Un teal oscuro que transmite confianza y calma, combinado con un naranja que aporta energía y calidez. Superficies limpias, esquinas redondeadas, formas orgánicas (blobs, ondas, trazos a mano) y movimiento suave.

---

## 3. Arquitectura de marca: marca madre y productos

El portfolio ya resuelve cómo convive la marca personal con la de cada proyecto, y ese modelo sirve para cualquier producto nuevo:

- **Marca madre (Sofía Álvarez)**: teal `#025959` + naranja `#FF8300`. Siempre presente en la navegación, en el logo, en los CTAs principales y en el footer.
- **Producto / submarca**: cada caso de estudio tiene su propio `accentColor` (Milestone `#4A4E78`, IUPI `#004AAC`, Bookie `#FF8300`, Mas+ Bank `#025959`). Ese acento solo se usa en el contenido del producto: fondos tintados de imágenes, sombras de hover, líneas de acento y el hero.

**Regla para productos nuevos**

1. Si es un producto *de* Sofía (portfolio, CV, landing de servicios, newsletter, plantillas): usar la marca madre completa.
2. Si es un producto *para* un cliente o un proyecto con nombre propio: la marca del producto manda en la interfaz, y la marca madre queda como firma ("Diseñado por Sofía Álvarez", logo chico en el footer o en la portada del caso).
3. En un caso de estudio o presentación: el marco (navegación, etiquetas, tipografía, voz) es de la marca madre; el contenido (hero, mockups) toma el acento del producto.

---

## 4. Logo

**Monograma "SA"**: una **S** naranja (`#FF8300`) de trazo grueso y una **A** teal (`#025959`) dibujada como un trazo a mano, similar a una pincelada o a una firma, que se cruza con la S. Representa la mezcla de lo gráfico y lo artesanal (lápiz y papel) con lo digital.

### Versiones disponibles

| Archivo | Uso |
|---|---|
| `public/logo2.svg` · `src/imports/logo2.svg` | Principal, sobre fondo claro. Contenedor blanco con esquinas redondeadas (rx 12 sobre 160). |
| `src/imports/logo2dark.svg` | Sobre fondo oscuro (navbar en modo oscuro). |
| `public/favicon.svg` | Favicon / app icon (contenedor blanco, rx 28 sobre 160). |
| Monocromo blanco | Sobre teal (footer). En el sitio se logra con `brightness-0 invert`. |

### Reglas

- **Tamaño mínimo**: 32 px digital (en la navbar se usa a 40 px; en el footer a 48 px).
- **Área de seguridad** (recomendación): dejar libre alrededor al menos un 25 % del ancho del logo.
- **Fondos permitidos**: blanco, gris muy claro, teal (en versión blanca) y fondos oscuros (versión dark).
- **No**: cambiar los colores de la S y la A, invertir el orden de los colores, rotar, deformar, agregar sombras o contornos, ni ponerlo sobre fotografías sin contenedor.
- **Nombre escrito**: "Sofía Álvarez", siempre con tildes. Descriptor: "Diseñadora UX/UI" (en contextos en inglés: "UX/UI Designer").

---

## 5. Color

### 5.1 Paleta principal

| Token | Hex | Rol | Uso real en el sitio |
|---|---|---|---|
| `brand-teal` | `#025959` | **Primario.** Confianza, calma, profundidad. | CTA principal, links, labels, títulos destacados, ticker, footer, scrollbar. |
| `brand-orange` | `#FF8300` | **Acento.** Energía, calidez, personalidad. | Palabras clave del titular, badges, subrayado a mano, íconos destacados, hover de scrollbar. |
| `brand-teal-light` | `#4ECFCF` | Teal para modo oscuro. | Reemplaza a `#025959` en texto y detalles sobre fondos oscuros. |
| `brand-teal-hover` | `#037070` | Hover del botón primario. | Hero CTA. |
| `brand-teal-deep` | `#014040` | Fin de degradado de bloques teal. | Bloque "Logro del proyecto". |
| `brand-teal-night` | `#012020` → `#010A0A` | Degradado teal en modo oscuro. | Ídem, en oscuro. |

**Proporción recomendada 60 / 30 / 10**: 60 % neutros (blanco / grises), 30 % teal, 10 % naranja. El naranja es especia, no base: si aparece en más de un elemento por pantalla, pierde fuerza.

### 5.2 Neutros

Se usa la escala gris de Tailwind:

| Token | Hex | Uso |
|---|---|---|
| `white` | `#FFFFFF` | Fondo principal claro, cards. |
| `gray-50` | `#F9FAFB` | Fondo de secciones alternas (Proyectos, resúmenes). |
| `gray-100` | `#F3F4F6` | Bordes de cards (`border-gray-100`), hovers suaves. |
| `gray-400` | `#9CA3AF` | Solo eyebrows decorativos y metadatos (ver accesibilidad). |
| `gray-500` | `#6B7280` | Texto secundario / metadatos. |
| `gray-600` | `#4B5563` | Texto de cuerpo. |
| `gray-800` | `#1F2937` | Títulos. |
| `gray-900` | `#111827` | Fondo principal en modo oscuro. |

Fondos especiales del hero: `#F8FEFE` (claro, blanco con un toque teal) y `#0A1515` (oscuro, negro teal).

### 5.3 Transparencias de marca

La marca usa mucho sus dos colores **en baja opacidad** para tintar superficies sin perder limpieza:

| Uso | Valor |
|---|---|
| Fondo de etiqueta / chip teal | `#025959` al 10 % (25 % en oscuro) |
| Fondo de callout | `#025959` o `#FF8300` al 5 % (8 % en oscuro) |
| Borde suave | `#025959` al 15–25 % |
| Blobs decorativos | teal al 18 %, naranja al 16 % |
| Fondo de imagen de producto | `accentColor` al ~5 % (`0d`), ~9 % en oscuro (`18`) |

### 5.4 Degradados firma

- **Mesh del hero**: dos radiales sobre fondo casi blanco.
  `radial-gradient(60% 50% at 15% 10%, rgba(2,89,89,.14), transparent 60%), radial-gradient(50% 50% at 90% 0%, rgba(255,131,0,.12), transparent 60%), #F8FEFE`
- **Card de perfil / contacto**: `from-[#025959]/10 to-[#FF8300]/10` (diagonal, arriba-izquierda → abajo-derecha).
- **Banda separadora**: `linear-gradient(to right, teal 12 %, naranja 18 %, teal 12 %)`, 20 px de alto, a ancho completo.
- **Bloque de impacto**: `from-[#025959] to-[#014040]` con texto blanco y un dato en naranja.
- **Onda**: degradado horizontal de teal a naranja.

Los degradados van **siempre de teal hacia naranja** (el teal ancla, el naranja remata).

### 5.5 Colores semánticos (recomendación)

El portfolio casi no tiene estados de error ni de éxito. Para productos con formularios o transacciones:

| Estado | Hex sugerido | Nota |
|---|---|---|
| Éxito | `#15803D` | Verde que no compite con el teal. |
| Error | `#C23B3B` | Ya se usa en el caso Milestone. |
| Advertencia | `#A84F00` | Naranja oscuro accesible (5.55:1 sobre blanco). |
| Info | `#025959` | El propio teal. |

Nunca comunicar un estado **solo** con color: acompañar siempre con ícono y texto.

---

## 6. Tipografía

### Familia

- **Principal: Inter** (declarada en el caso de estudio del portfolio como "Single family · Variable weight · Google Fonts"). Una sola familia, legible y neutra, para que el color y la forma lleven la personalidad.
- ⚠️ Hoy `src/styles/fonts.css` está vacío y `index.html` no carga Inter, así que el sitio se ve con la fuente del sistema. **Al replicar la marca, cargar Inter explícitamente** (ver [tokens](#21-tokens-listos-para-usar)).
- **Excepción documentada**: el caso Milestone usa Manrope + Instrument Serif itálica porque es la identidad de *ese producto*, no de la marca madre.

### Escala

Base: `16px` (`--font-size`), interlineado de cuerpo `leading-relaxed` (1.625).

| Nivel | Tamaño (mobile → desktop) | Peso | Uso |
|---|---|---|---|
| Display / H1 hero | 36 → 60 → 72 px (`text-4xl sm:text-6xl lg:text-7xl`) | 800 | Un solo titular por página. Interlineado 1.08. |
| H2 sección | 36 → 48 px (`text-4xl lg:text-5xl`) | 500 | Títulos de sección del home. |
| H2 caso de estudio | 24 – 30 px | 700 | Secciones dentro de un caso. |
| H3 | 18 – 24 px | 600 – 700 | Títulos de card. |
| Lead | 20 – 24 px (`text-xl`) | 400 | Bajada de títulos de sección. |
| Cuerpo | 16 – 18 px (`text-base`/`text-lg`) | 400 | Párrafos. Máximo ~65 caracteres por línea (`max-w-2xl`). |
| Small | 14 px | 400 – 500 | Descripciones de card, labels. |
| Eyebrow | 10 – 12 px, MAYÚSCULAS, `tracking-widest` | 700 | "HALLAZGO CENTRAL", "POR QUÉ ESTO IMPORTA". |
| Métrica | 30 – 36 px | 900 | Números destacados ("100+", "2 semanas"). |

### Tratamientos tipográficos de marca

- **Palabra destacada en color**: dentro de un titular, una o dos palabras van en teal y/o naranja. Ej.: "Una diseñadora **UX/UI** (teal) creando experiencias digitales **excepcionales** (naranja)".
- **Subrayado a mano**: la palabra naranja más importante lleva un trazo SVG ondulado (`M2,8 Q50,2 100,7 T198,6`, stroke 3, extremos redondeados). Máximo una vez por pantalla.
- **Negrita en color** dentro de párrafos: `<strong>` en teal (`#4ECFCF` en oscuro) para la idea clave del párrafo, una por párrafo como máximo.
- **Números arábigos** siempre ("2 semanas", "3 case studies", "100+").

---

## 7. Layout, grilla y espaciado

- **Mobile first**, breakpoints Tailwind: `sm` 640, `md` 768, `lg` 1024.
- **Contenedores**:
  - General: `max-w-7xl` (1280 px) con `px-6 lg:px-12`.
  - Listado de proyectos: `max-w-6xl`.
  - Contacto / citas: `max-w-4xl` – `max-w-5xl`.
  - Texto corrido: `max-w-2xl` – `max-w-3xl`.
- **Ritmo vertical de secciones**: `py-16 md:py-24` (64 → 96 px). Dentro de casos: `py-16 md:py-20`.
- **Alternancia de fondos**: blanco → gris 50 → blanco… para separar secciones sin líneas. Un bloque teal saturado como máximo por página.
- **Gaps**: 24 – 32 px entre cards (`gap-6 md:gap-8`), 48 px entre columnas de texto e imagen (`gap-12`).
- **Escala de espaciado**: múltiplos de 4 px (sistema Tailwind).
- **Navegación**: fija arriba, 64 px en mobile / 80 px en desktop, fondo blanco con `shadow-md`. En mobile, drawer lateral derecho de 256 px con fondo oscurecido al 50 %.
- **Jerarquía de cards**: el contenido más importante ocupa más ancho (card primaria horizontal a ancho completo → secundaria centrada → terciarias compactas).

---

## 8. Forma: radios, bordes y sombras

### Radios

| Elemento | Radio |
|---|---|
| Botón primario, badges, chips, etiquetas de sección | `rounded-full` (píldora) |
| Cards, contenedores, bloques | `rounded-2xl` (16 px) |
| Bloques hero grandes | `rounded-3xl` (24 px) |
| Tiles de íconos, cajas de estadística | `rounded-xl` (12 px) |
| Botones secundarios, inputs, chips de herramientas | `rounded-lg` (8 px) |
| Base del sistema | `--radius: 0.625rem` (10 px) |

Nada de esquinas rectas en elementos interactivos. La marca es **redondeada y amable**.

### Bordes

- Cards: `1px` `gray-100` (claro) / `gray-700` (oscuro). Bordes suaves; la separación la da la sombra.
- Callouts: **borde izquierdo de 4 px** en teal o naranja + fondo tintado al 5 %.
- Líneas de acento: 2 px de alto, degradado del color del producto al 60–70 % hacia transparente.

### Sombras

- Reposo: `shadow-sm` / `shadow-md` (neutras).
- **Sombras tintadas con el color de marca** (rasgo distintivo):
  - CTA primario: `0 10px 28px rgba(2,89,89,.30)` → hover `0 14px 32px rgba(2,89,89,.40)`.
  - Card en hover: `0 20–28px 44–56px` en el color de acento del producto al ~15 %.
  - Ficha de dato en hover: `0 8px 24px rgba(2,89,89,.12)`.
- Mockups de dispositivo: `0 24px 64px rgba(0,0,0,.34)`.

---

## 9. Componentes firma

### Botón primario
- Píldora, fondo `#025959`, texto blanco semibold 16–18 px, `px-8 py-4`.
- Sombra teal; hover: sube 2 px, fondo `#037070`, sombra más intensa; tap: `scale .97`.
- Foco: anillo de 2 px teal con offset de 2 px.
- Texto: verbo + objeto, opcionalmente con flecha: **"Ver Proyectos →"**.
- Uno solo por vista.

### Botón secundario
- `rounded-lg`, `px-6 py-3`, ícono de 20 px a la izquierda + texto.
- Teal sólido para acciones de conexión ("Conectar"). Naranja para descargas ("Obtener currículum") — ver advertencia de contraste en la sección 15.
- Hover: `scale 1.05`; tap: `scale .95`.

### Link de acción ("Ver caso ↗")
- 12–14 px, semibold, teal (`#4ECFCF` en oscuro) + `ArrowUpRight`. En hover de la card, el espacio entre el texto y el ícono se agranda.

### Badge de estado (hero)
- Píldora con borde teal al 25 %, fondo teal al 8 %, texto teal 14 px.
- Empieza con `✦`: **"✦ UX/UI Designer · Disponible para proyectos"**.

### Etiqueta de sección (`SectionLabel`)
- Píldora, 14 px, teal sobre teal al 10 % (variante *accent*: naranja sobre naranja al 10 %).
- Numeración de proceso: **"01 · Empatizar"**, "02 · Definir", "03 · Idear", "04 · Prototipar", "05 · Testear".

### Badge de proyecto
- Píldora naranja sólida, 10–11 px semibold, `tracking-wide`, acompañada del rol en gris ("Diseñadora UX/UI").

### Card de proyecto
- `rounded-2xl`, borde gris 100, fondo blanco, `shadow-md`.
- Imagen sobre fondo tintado con el acento del producto; en hover, la imagen escala 1.04 y la card sube 4 px con sombra tintada.
- Estructura fija: badge + rol → título ("Producto — beneficio") → descripción → línea de acento → herramientas + "Ver caso".
- Toda la card es clickeable y navegable con teclado (Enter).

### Callout / insight
- Borde izquierdo de 4 px + fondo tintado + eyebrow en mayúsculas ("POR QUÉ ESTO IMPORTA", "DECISIÓN DE DISEÑO CLAVE") + frase en 16 px medium.

### Hallazgo central
- Caja centrada con fondo teal al 5 %, borde teal al 15 %, eyebrow + frase en `text-lg` semibold.

### Stat box
- Card con el número grande en teal o naranja (alternados) y la etiqueta debajo; al entrar en pantalla, se llena desde abajo con el color al ~8 %.

### Ticker de palabras clave
- Franja teal a ancho completo, texto blanco 18 px medium, palabras separadas por `✦` al 30 %, desplazamiento lineal infinito (28 s).

### Bloque de impacto (STAR / logro)
- Fondo degradado teal → teal profundo, cita grande en blanco bold con el dato clave en naranja, tarjetas de vidrio (`bg-white/10`, `backdrop-blur`, borde blanco al 15 %) con eyebrows en naranja.

### Chips de herramientas
- Tiles de 32 px, `rounded-lg`, borde gris, ícono o abreviatura (Ps, Ai, CC) en el color oficial de cada herramienta. Es el único lugar donde entran colores ajenos a la marca.

---

## 10. Iconografía y glifos

- **Librería**: [Lucide](https://lucide.dev) (trazo lineal, esquinas redondeadas). Logos de terceros: Simple Icons (`react-icons/si`).
- **Tamaños**: 16 px (inline), 20 px (botones), 24 px (navegación, tiles).
- **Color**: gris 600–700 en reposo; teal/naranja cuando es informativo. Íconos dentro de tiles cuadrados `rounded-xl` con fondo del color al ~10 %.
- **Glifos de marca**:
  - `✦` destello: separador y marcador de estado/destacado.
  - `→` flecha: CTA de avance. `↗` (`ArrowUpRight`): ver más / abrir caso.
  - `✓` en teal: listas de validación.
  - `·` punto medio: separador de metadatos ("Figma Make · Claude Code · Lovable").
  - `★`: logro.
  - `♥` naranja: firma del footer.
- **Lápiz y papel** (`PenLine`, `#B45309`): símbolo del proceso manual; siempre aparece entre las herramientas.

---

## 11. Recursos gráficos

Son los elementos que hacen que la marca se reconozca incluso sin logo:

1. **Blobs**: círculos muy difuminados (`blur-3xl`), teal arriba a la izquierda y naranja abajo a la derecha, con flotación lenta (9–12 s).
2. **Gradient mesh** teal/naranja sobre casi blanco.
3. **Ondas**: tres capas SVG en el borde inferior del hero, a velocidades distintas (32 s / 22 s / 14 s); la de adelante con degradado teal → naranja.
4. **Subrayado a mano** naranja.
5. **Comillas gigantes** (`text-8xl`, teal al 20 %) para enmarcar citas.
6. **Banda separadora** degradada de 20 px.
7. **Números fantasma**: numeración grande (`text-3xl font-black`) en teal al 15 % detrás de pasos o áreas.

Usar como máximo **dos** de estos recursos por pantalla. El hero es el único lugar donde se combinan varios.

---

## 12. Imágenes y mockups

- **Foto personal**: recorte circular con borde blanco de 4 px (perfil) o `rounded-2xl` con `shadow-2xl` (contacto), acompañada de un indicador verde de disponibilidad.
- **Pantallas de producto**: siempre dentro de un marco de dispositivo:
  - Teléfonos con marco `#111827` y notch, en pareja rotados −6° / +6° y superpuestos.
  - Navegador con barra estilo macOS (semáforo rojo/amarillo/verde) + teléfono flotante.
- **Fondo de imagen**: tintado con el acento del producto, con `object-contain` y un fundido hacia el color de la card.
- **Ilustración / IA**: se admiten imágenes generadas (DALL·E, Midjourney) cuando son parte del concepto del producto; siempre con un texto `alt` descriptivo.
- **Wireframes**: blanco y negro, low-fi, se muestran como evidencia del proceso.

---

## 13. Motion

El movimiento es **suave, con desaceleración larga y nunca brusco**.

| Parámetro | Valor |
|---|---|
| Curva firma | `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out expo) |
| Entrada de elementos | `opacity 0 → 1` + `y 20–40px → 0` (o `x ±30px` en columnas) |
| Duración de entradas | 0.5 – 0.9 s |
| Escalonado (*stagger*) | 0.07 – 0.1 s entre ítems |
| Disparo | Al entrar en pantalla, **una sola vez** (`viewport once`) |
| Hover de card | sube 3–4 px + sombra tintada |
| Hover de botón | sube 2 px o `scale 1.05` |
| Tap | `scale 0.95 – 0.97` |
| Transición de página | entra desde la derecha (0.38 s, curva firma); sale 8 % a la izquierda con fade (0.18 s) |
| Drawer mobile | spring (damping 25, stiffness 200) |
| Cambios de color / tema | 200 – 300 ms |
| Loops decorativos | lineales o `ease-in-out`, lentos (14 – 32 s) |
| Indicador de scroll | rebote de 8 px cada 2 s |

**Reglas**

- El motion acompaña la lectura, no la interrumpe: nada parpadea ni se mueve bajo el cursor mientras se lee.
- **Recomendación obligatoria para productos nuevos**: respetar `prefers-reduced-motion` (desactivar loops, blobs, ondas y ticker; reducir las entradas a un fade corto). El portfolio todavía no lo hace.

---

## 14. Modo oscuro

- El producto **arranca siempre en modo claro**; el oscuro se activa manualmente (ícono luna / sol en la navbar).
- Equivalencias:

| Claro | Oscuro |
|---|---|
| Fondo `white` | `gray-900` `#111827` |
| Fondo alterno `gray-50` | `gray-800` `#1F2937` |
| Hero `#F8FEFE` | `#0A1515` |
| Texto títulos `gray-800` | `gray-100` |
| Texto cuerpo `gray-600` | `gray-300` |
| Teal `#025959` (texto) | `#4ECFCF` |
| Tintes al 5–10 % | Tintes al 10–25 % |
| Bordes `gray-100` | `gray-700` |

- El naranja `#FF8300` se mantiene igual en oscuro (contraste 7.18:1 sobre `#111827`).
- **Nunca** usar `#025959` como color de texto o de ícono sobre fondo oscuro (2.18:1): usar `#4ECFCF`.

---

## 15. Accesibilidad (no negociable)

La accesibilidad es parte del diferencial de la marca, así que cualquier producto nuevo tiene que cumplir **WCAG 2.2 AA** como mínimo.

### Contrastes verificados

| Combinación | Ratio | Resultado |
|---|---|---|
| Teal `#025959` sobre blanco | 8.15:1 | ✅ AAA |
| Blanco sobre teal `#025959` | 8.15:1 | ✅ AAA |
| Teal claro `#4ECFCF` sobre `#111827` | 9.42:1 | ✅ AAA |
| Naranja `#FF8300` sobre `#111827` | 7.18:1 | ✅ AAA |
| Gris 600 `#4B5563` sobre blanco | 7.56:1 | ✅ AAA |
| Gris 500 `#6B7280` sobre blanco | 4.83:1 | ✅ AA |
| Gris 800 `#1F2937` sobre naranja | 5.94:1 | ✅ AA |
| Hover `#037070` con texto blanco | 5.91:1 | ✅ AA |
| **Naranja `#FF8300` sobre blanco** | **2.47:1** | ❌ Falla incluso en texto grande |
| **Blanco sobre naranja `#FF8300`** | **2.47:1** | ❌ Falla |
| **Teal `#025959` sobre `#111827`** | **2.18:1** | ❌ Falla |
| Gris 400 `#9CA3AF` sobre blanco | 2.54:1 | ❌ Solo decorativo |

### Reglas de uso del naranja

El naranja es el color con más personalidad y también el más delicado:

- ✅ Usarlo en superficies grandes decorativas, íconos acompañados de texto, subrayados, blobs, bordes de callout y en modo oscuro.
- ✅ Si el texto va **sobre** naranja, usar gris 800 `#1F2937` en lugar de blanco.
- ✅ Si hace falta **texto** naranja sobre fondo claro, usar la variante tinta `#A84F00` (5.55:1).
- ❌ No usar texto blanco sobre naranja en botones ni badges de productos nuevos (hoy pasa en el botón de CV y en los badges de proyecto).

### Otras reglas

- Foco visible en todo lo interactivo (anillo teal de 2 px con offset).
- Todo lo que se puede clickear se puede operar con teclado.
- `aria-label` en botones que solo tienen ícono, escritos en español ("Abrir menú", "Cerrar menú", "Ir al inicio").
- `alt` descriptivo en imágenes con contenido; `aria-hidden` en las decorativas (blobs, ondas).
- Áreas táctiles de al menos 44 × 44 px en mobile.
- `lang="es"` en el documento.
- Respetar `prefers-reduced-motion`.

---

## 16. Voz

La voz es **quién es la marca** y no cambia. Suena como una diseñadora que te explica su trabajo con entusiasmo, sin jerga innecesaria y con argumentos.

### Pilares

**1. Cercana**
Habla en primera persona y de "vos". Saluda, invita, agradece.
> "Hola, soy ¡Sofía!" · "Trabajemos juntos" · "Me encantaría conocer más sobre él"

**2. Clara**
Una idea por oración. Frases cortas que resumen mucho.
> "De la investigación al pixel final."
> "Una interfaz realmente buena no necesita explicación."

**3. Con criterio**
No solo dice qué se hizo: dice **por qué** y **cómo se validó**. Datos concretos antes que adjetivos.
> "Validando cada decisión con heurísticas y feedback de diseñadores."
> "3 case studies · Dark mode · Responsive · 2 semanas"

**4. Empática**
Pone a la persona usuaria en el centro, reconoce sus emociones y nunca la culpa.
> "Diseñada para el momento en que alguien vuelve a ocuparse de su plata — sin castigarla por haberse ido."

**5. Curiosa**
Muestra aprendizaje y exploración, se anima a lo nuevo (IA, vibe coding) sin perder el criterio propio.
> "Estoy explorando constantemente nuevas mejores prácticas y flujos de trabajo."
> "Vibe Coding no es 'que la IA diseñe por vos'."

### Somos / no somos

| Somos | No somos |
|---|---|
| Entusiastas | Exagerados ("¡¡increíble!!", "revolucionario") |
| Cercanos | Chabacanos o con chistes internos |
| Precisos | Burocráticos o corporativos |
| Seguros | Arrogantes |
| Didácticos | Condescendientes |

---

## 17. Tono según el contexto

El tono es **cómo** se aplica la voz en cada momento.

| Contexto | Tono | Ejemplo |
|---|---|---|
| Hero / bienvenida | Cálido, con energía, una sola exclamación | "Hola, soy ¡Sofía!" |
| Presentación de proyecto | Beneficio primero, concreto | "Una app que simplifica la inversión: capitales y cripto en un mismo lugar." |
| Proceso / caso de estudio | Didáctico, argumentado, en pasado | "Antes de escribir una línea de código, se definieron los fundamentos visuales." |
| Insight / hallazgo | Contundente, una frase | "El prototipo ES el producto final." |
| Invitación a contactar | Cercano, en plural inclusivo | "Trabajemos juntos." |
| Error (recomendación) | Calmo, sin culpa, con salida | "No pudimos guardar los cambios. Revisá tu conexión y probá de nuevo." |
| Estado vacío (recomendación) | Alentador, con próxima acción | "Todavía no hay nada acá. Creá tu primera meta para empezar." |
| Éxito (recomendación) | Breve, celebra sin exagerar | "¡Listo! Tu meta quedó guardada." |
| Temas sensibles (dinero, salud, datos) | Sereno, sin alarmas, transparente | "Tus datos no salen de este dispositivo." |
| Legal / privacidad | Claro y llano, sin letra chica | "Usamos Google Analytics con la IP anonimizada para saber qué secciones se visitan." |

---

## 18. Reglas de escritura

### Idioma y trato
- **Español rioplatense con voseo**: "hacé", "tenés", "podés", "mirá". Es lo que usa la marca en su contenido ("Hacé clic en cualquier proyecto", "hacés más con menos pasos"). No mezclar con "tú" (ver sección 23).
- Primera persona singular para hablar de Sofía ("Diseñé", "Soy"); primera plural para invitar ("Trabajemos") o para hablar de un producto con equipo.
- Lenguaje inclusivo sin marcas tipográficas: preferir "las personas usuarias", "quien use la app", "cualquier usuario" en vez de "@" o "x".

### Estructura
- **Titulares de proyecto**: `Nombre — beneficio o categoría`. Ej.: "IUPI — Fintech de ahorro e inversiones".
- **Descripciones**: 1 o 2 oraciones: qué es + para quién + qué cambia.
- **Párrafos**: 2 a 4 oraciones. Una idea clave en negrita por párrafo como máximo.
- **Eyebrows**: 1 a 3 palabras, en mayúsculas desde CSS (se escriben normal en el código).
- **Listas de metadatos**: separadas con ` · `.

### Mayúsculas
- **Recomendación**: mayúscula solo al inicio (*sentence case*) en títulos, botones y menús: "Proyectos destacados", "Ver proyectos". Es la norma del español; hoy el sitio mezcla estilos (ver sección 23).
- Nombres propios y de producto, con su grafía oficial: Figma, Claude Code, Mas+ Bank, IUPI.

### Puntuación y formato
- Signos de apertura siempre: `¿…?`, `¡…!`.
- Raya (`—`) para incisos y en titulares de proyecto. Usarla con moderación: no más de una por párrafo.
- Números en cifras: "2 semanas", "100+", "4 proyectos".
- Porcentajes y métricas como protagonistas, no escondidos en el texto.
- Sin punto final en botones, badges, labels ni titulares.
- Emojis: no. Los glifos de marca (`✦ → ✓ ·`) cumplen ese rol.

### Terminología técnica
- Los términos del oficio en inglés se mantienen cuando son estándar de la industria (UX Research, handoff, design system, wireframe, case study, dark mode, vibe coding).
- En interfaces para público general, preferir el término en español ("modo oscuro", "caso de estudio", "prototipo").
- Nunca explicar de más: si hace falta una nota al pie, la interfaz no es clara.

---

## 19. Microcopy de referencia

### Botones y CTAs (verbo en infinitivo o imperativo + objeto, 1 a 3 palabras)

| Acción | Texto |
|---|---|
| Navegar a contenido | Ver proyectos → |
| Abrir detalle | Ver caso ↗ |
| Conectar | Conectar |
| Descargar | Obtener currículum |
| Enviar formulario | Enviar mensaje |
| Guardar | Guardar cambios |
| Confirmar destructivo | Sí, eliminar |
| Cancelar | Cancelar |
| Volver | Volver al inicio |

Evitar los genéricos "Aceptar", "OK", "Click aquí" y "Enviar" sin objeto.

### Plantillas por estado (recomendación, en la voz de la marca)

- **Carga**: "Cargando tus proyectos…"
- **Vacío**: "Todavía no hay [cosa]. [Acción] para empezar."
- **Error de campo**: "Ingresá un email válido, por ejemplo nombre@mail.com."
- **Error de sistema**: "Algo no salió como esperábamos. Probá de nuevo en unos segundos."
- **Sin conexión**: "Parece que no hay conexión. Guardamos lo que hiciste hasta ahora."
- **Éxito**: "¡Listo! [Resultado concreto]."
- **Confirmación destructiva**: "¿Eliminar [cosa]? No vas a poder recuperarla."
- **Disponibilidad**: "✦ Disponible para proyectos"
- **Firma de footer**: "© [año] Sofía Álvarez. Hecho con ♥ usando [herramienta]"

### Labels de accesibilidad
Siempre en español y describiendo la acción: "Abrir menú", "Cerrar menú", "Cambiar a modo oscuro", "Ir a la sección de proyectos".

---

## 20. Vocabulario

| Preferir | Evitar |
|---|---|
| Experiencias, productos digitales | "Soluciones" vacías |
| Simple, claro, accesible | Fácil, intuitivo (sin evidencia) |
| Validé, testeé, medí | "Creo que funciona" |
| Personas usuarias, quien usa | "El usuario promedio" |
| Diseño centrado en el usuario | "User-friendly" |
| Proceso, criterio, decisión | Magia, inspiración divina |
| Sin fricciones, con confianza | "Revolucionario", "disruptivo" |
| Explorar, iterar | "Perfecto", "definitivo" |

Palabras que ya son parte de la marca: **excepcionales, disfrutar, claridad, criterio, diversidad, accesibilidad, de la investigación al pixel final, lápiz y papel, vibe coding**.

---

## 21. Tokens listos para usar

### CSS

```css
/* Tipografía — cargar en <head> */
/* <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"> */

:root {
  /* Marca */
  --brand-teal: #025959;
  --brand-teal-hover: #037070;
  --brand-teal-deep: #014040;
  --brand-teal-light: #4ecfcf;   /* texto teal en modo oscuro */
  --brand-orange: #ff8300;
  --brand-orange-ink: #a84f00;   /* texto naranja sobre fondo claro */

  /* Superficies */
  --surface: #ffffff;
  --surface-alt: #f9fafb;
  --surface-hero: #f8fefe;
  --border: #f3f4f6;

  /* Texto */
  --text-strong: #1f2937;
  --text-body: #4b5563;
  --text-muted: #6b7280;

  /* Estados */
  --success: #15803d;
  --error: #c23b3b;
  --warning: #a84f00;
  --info: #025959;

  /* Tipografía */
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-size: 16px;

  /* Forma */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-pill: 9999px;

  /* Sombras de marca */
  --shadow-cta: 0 10px 28px rgba(2, 89, 89, 0.30);
  --shadow-cta-hover: 0 14px 32px rgba(2, 89, 89, 0.40);
  --shadow-card-hover: 0 20px 44px rgba(2, 89, 89, 0.14);

  /* Motion */
  --ease-brand: cubic-bezier(0.22, 1, 0.36, 1);
  --duration-fast: 200ms;
  --duration-base: 600ms;
  --duration-page: 380ms;
}

.dark {
  --surface: #111827;
  --surface-alt: #1f2937;
  --surface-hero: #0a1515;
  --border: #374151;
  --text-strong: #f3f4f6;
  --text-body: #d1d5db;
  --text-muted: #9ca3af;
  --brand-teal-text: var(--brand-teal-light);
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Tailwind v4 (`@theme`)

```css
@theme {
  --color-brand-teal: #025959;
  --color-brand-teal-hover: #037070;
  --color-brand-teal-deep: #014040;
  --color-brand-teal-light: #4ecfcf;
  --color-brand-orange: #ff8300;
  --color-brand-orange-ink: #a84f00;
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --ease-brand: cubic-bezier(0.22, 1, 0.36, 1);
}
```

### Motion (Framer Motion / `motion/react`)

```ts
export const EASE_BRAND = [0.22, 1, 0.36, 1] as const;

export const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: EASE_BRAND },
};

export const hoverLift = { y: -4 };
export const tapPress = { scale: 0.97 };
```

---

## 22. Checklist antes de publicar

**Visual**
- [ ] El logo está en su versión correcta para el fondo y mide 32 px o más.
- [ ] El teal domina y el naranja aparece como acento (≈10 %).
- [ ] Inter está cargada; no se usa la fuente del sistema por error.
- [ ] Un solo CTA primario por vista, en píldora teal.
- [ ] Cards `rounded-2xl`, botones y badges en píldora, sin esquinas rectas en lo interactivo.
- [ ] Como máximo dos recursos gráficos por pantalla (blob, onda, subrayado…).
- [ ] Las entradas usan la curva `0.22, 1, 0.36, 1` y se disparan una sola vez.
- [ ] El modo oscuro reemplaza el teal de texto por `#4ECFCF`.

**Accesibilidad**
- [ ] No hay texto blanco sobre `#FF8300` ni texto `#FF8300` sobre blanco.
- [ ] Todos los contrastes de texto son ≥ 4.5:1 (≥ 3:1 en texto grande).
- [ ] Foco visible y navegación completa con teclado.
- [ ] `alt` y `aria-label` en español.
- [ ] Se respeta `prefers-reduced-motion`.

**Voz y tono**
- [ ] Voseo en todo el producto, sin mezclar con "tú".
- [ ] Botones con verbo + objeto, sin punto final.
- [ ] Datos concretos en lugar de adjetivos vacíos.
- [ ] Los errores explican qué pasó y cómo seguir, sin culpar.
- [ ] Una sola exclamación por pantalla, como máximo.
- [ ] Sin emojis; solo glifos de marca.

---

## 23. Inconsistencias detectadas en el portfolio

Para no replicarlas en productos nuevos (y, si querés, corregirlas en el portfolio):

1. **Tuteo mezclado con voseo**: "¿Tienes un proyecto en mente?" (Contacto) convive con "Hacé clic en cualquier proyecto" (Proyectos). → Unificar en voseo: "¿Tenés un proyecto en mente?".
2. **Inter declarada pero no cargada**: el caso de estudio del portfolio dice que la tipografía es Inter, pero `fonts.css` está vacío y el sitio usa la fuente del sistema.
3. **Contraste del naranja**: texto blanco sobre `#FF8300` en el botón "Obtener currículum" y en los badges de proyecto (2.47:1), y "¡Sofía!" / "excepcionales" en naranja sobre fondo claro.
4. **Teal oscuro en modo oscuro**: en *Exploration* ("flujos de trabajo") el texto pasa a `#025959` sobre fondo oscuro (2.18:1).
5. **Mayúsculas mixtas**: "Proyectos Destacados", "Trabajemos Juntos", "Ver Proyectos", "Enlaces Rápidos" en *Title Case*, frente a "Sobre mí" y "Ver caso" en *sentence case*. → Unificar en *sentence case*.
6. **Tildes faltantes** en diagramas del caso Portfolio ("Diseno", "Tipografia", "Instruccion", "Codigo", "Iteracion").
7. **Sin `prefers-reduced-motion`**: blobs, ondas y ticker se mueven siempre.
8. **`alt="Profile"`** en la foto de *Sobre mí*: está en inglés y no es descriptivo. → "Sofía Álvarez".
9. **`aria-label` en inglés**: "Toggle theme", "Toggle menu". → "Cambiar tema", "Abrir menú".
10. **Dark mode no persistente**: el caso de estudio del portfolio dice "ThemeContext con persistencia", pero el código arranca siempre en claro y no guarda la preferencia. Definir cuál es el comportamiento deseado y documentarlo igual en ambos lugares.
