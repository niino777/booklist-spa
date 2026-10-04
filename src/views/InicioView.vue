<script setup>
import { ref, computed } from 'vue'
import { useLibros } from '../composables/useLibros'
import { useSesion } from '../composables/useSesion'
import Libro from '../components/Libro.vue'
import FormularioLibro from '../components/FormularioLibro.vue'

const { libros, eliminarLibro, alternarLeido } = useLibros()
const { sesion } = useSesion()
const mostrarFormulario = ref(false)

// Los 3 libros más recientes, del último al primero
const recientes = computed(() => libros.value.slice(-3).reverse())
</script>

<template>
  <section class="hero">
    <h1>Cada libro, en su ficha.</h1>
    <p>Registra títulos, filtra por autor o categoría y consulta el detalle de cada uno.</p>
    <RouterLink to="/libros" class="btn">Abrir el catálogo</RouterLink>
    <button
    v-if="sesion.activa"
    type="button"
    class="btn btn--sec"
    :aria-expanded="mostrarFormulario"
    @click="mostrarFormulario = !mostrarFormulario"
  >
    {{ mostrarFormulario ? 'Cerrar formulario' : 'Agregar libro' }}
  </button>   
    <FormularioLibro v-if="mostrarFormulario" @agregado="mostrarFormulario = false" />  

  </section>

  <section>
    <h2>Últimos agregados</h2>
    <p v-if="!recientes.length" class="vacio">
      Aún no hay libros. <RouterLink to="/libros">Agrega el primero</RouterLink>.
    </p>
    <div v-else class="grilla">
      <Libro
        v-for="libro in recientes"
        :key="libro.id"
        :libro="libro"
        @eliminar="eliminarLibro"
        @alternar-leido="alternarLeido"
      />
    </div>
  </section>
</template>
