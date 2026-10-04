# BookList SPA — Editorial Nova

SPA hecha con **Vue 3 + Vue Router 4 + Vue CLI** para gestionar un catálogo de libros (Módulo 6, Alkemy).

Demo versión: https://niino777.github.io/booklist-spa/

## Cómo ejecutarla

```bash
npm install
npm run serve    # desarrollo (http://localhost:8080)
npm run build    # versión de producción en /dist
```

## Estructura

```
public/index.html              # Plantilla HTML base de Vue CLI
src/
├── App.vue                    # Lección 1: usuario (MVVM), sesión, logo y menú
├── main.js                    # Arranque de la app y del router
├── router/index.js            # Lección 5: /, /libros, /libros/:id (props: true)
├── composables/
│   ├── useLibros.js           # Lista de libros compartida + localStorage
│   └── useSesion.js           # Sesión simulada y configuración
├── components/
│   ├── Libro.vue              # Lección 2: v-bind, v-show, eventos eliminar y alternar-leido
│   └── FormularioLibro.vue    # Lecciones 3 y 4: v-model, .prevent, Enter
├── views/
│   ├── InicioView.vue
│   ├── ListaLibros.vue        # v-for, v-if, filtro, .once
│   ├── DetalleLibro.vue       # Ruta dinámica con props
│   ├── PerfilView.vue         # Editar nombre de usuario (requiere sesión)
│   └── ConfiguracionView.vue  # Preferencias (requiere sesión)
└── assets/
    ├── logo.svg               # Logo (reemplazar por el de Editorial Nova)
    └── main.css               # Estilos globales responsivos (mobile-first)
```

## Lecciones → dónde se cumplen

| Lección | Requisito | Archivo |
|---|---|---|
| 1 | App.vue (template/script/style), MVVM y nombre de usuario | `App.vue` |
| 1 | Contador con datos reactivos | `Libro.vue` (botón «Marcar como leído»), `ListaLibros.vue` (contador «Leídos: X de Y») |
| 2 | Libro.vue con v-bind; v-if, v-show, v-for; mensaje sin libros | `Libro.vue`, `ListaLibros.vue` |
| 3 | Formulario con input, select, textarea, v-model y vista previa | `FormularioLibro.vue` |
| 4 | @click, `.prevent`, `.once`, Enter | `FormularioLibro.vue`, `ListaLibros.vue` |
| 5 | Vue Router, 3 vistas, ruta dinámica con props | `router/index.js`, `views/` |

## Decisiones tomadas

- **Vue CLI**: herramienta pedida en el curso; la configuración queda en `vue.config.js` y `babel.config.js`.
- **`<script setup>`**: sintaxis compatible con Vue 3 en Vue CLI 5; `ref` cumple el rol de `data` y las funciones el de `methods`.
- **Composable `useLibros`**: un solo lugar para la lista y sus acciones, compartido por todas las vistas sin librerías extra.
- **Sesión simulada**: el botón "Iniciar sesión" entra como `usuario1` (prototipo sin backend). Solo con sesión se pueden agregar y eliminar libros, y se accede a Editar perfil y Configuración, protegidos con una guardia de navegación (`router.beforeEach`).
- **localStorage**: los libros sobreviven a recargar la página, así el detalle `/libros/:id` sigue funcionando.
- **Diseño "ficha bibliográfica"**: cada libro es una ficha con línea roja y cuerpo rayado, un guiño al trabajo editorial. La paleta vive en variables CSS (`:root`) para adaptarla al logo.
- **HTML semántico y accesible**: `header`, `nav`, `main`, `label` en cada campo, foco visible.
- **Enter**: se usa `@keyup.enter` en título y autor; el `<form>` lleva `@submit.prevent` para que nunca recargue la página.
