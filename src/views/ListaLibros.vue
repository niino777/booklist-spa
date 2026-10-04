<script setup>
import { ref, computed } from 'vue'
import { useLibros } from '../composables/useLibros'
import { useSesion } from '../composables/useSesion'
import Libro from '../components/Libro.vue'
import FormularioLibro from '../components/FormularioLibro.vue'

const { libros, eliminarLibro, alternarLeido, cargarEjemplos } = useLibros()
const { sesion, iniciarSesion } = useSesion()
const filtro = ref('')

// Contador reactivo: se actualiza solo al marcar o desmarcar libros
const leidos = computed(() => libros.value.filter((l) => l.leido).length)

// computed: se recalcula solo cuando cambian libros o filtro
const filtrados = computed(() => {
  const texto = filtro.value.toLowerCase()
  return libros.value.filter((l) =>
    [l.titulo, l.autor, l.categoria].some((campo) => campo.toLowerCase().includes(texto)),
  )
})
</script>

<template>
  <h1>Catálogo</h1>

  <FormularioLibro v-if="sesion.activa" />
  <div v-else class="aviso">
    <span>Inicia sesión para agregar o eliminar libros.</span>
    <button type="button" class="btn btn--sec" @click="iniciarSesion">Iniciar sesión</button>
  </div>

  <section aria-labelledby="titulo-lista">
    <div class="lista-cab">
      <div>
        <h2 id="titulo-lista">Libros registrados ({{ libros.length }})</h2>
        <p class="contador" aria-live="polite">Leídos: {{ leidos }} de {{ libros.length }}</p>
      </div>
      <label class="filtro">
        Filtrar por título, autor o categoría
        <input v-model="filtro" type="search" />
      </label>
    </div>

    <p v-if="!libros.length" class="vacio">
      No hay libros disponibles.
      <!-- .once: el botón solo funciona una vez -->
      <button v-if="sesion.activa" type="button" class="btn btn--sec" @click.once="cargarEjemplos">
        Cargar libros de ejemplo
      </button>
    </p>
    <p v-else-if="!filtrados.length" class="vacio">Ningún libro coincide con el filtro.</p>
    
    <div v-else class="grilla">
      <Libro
        v-for="libro in filtrados"
        :key="libro.id"
        :libro="libro"
        @eliminar="eliminarLibro"
        @alternar-leido="alternarLeido"
      />
    </div>
  </section>
</template>
