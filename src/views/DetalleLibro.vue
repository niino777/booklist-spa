<script setup>
import { computed } from 'vue'
import { useLibros } from '../composables/useLibros'

// La ruta /libros/:id entrega el id como prop (props: true en el router)
const props = defineProps({ id: { type: String, required: true } })

const { buscarLibro } = useLibros()
const libro = computed(() => buscarLibro(props.id))
</script>

<template>
  <article v-if="libro" class="ficha ficha--grande" :data-categoria="libro.categoria">
    <header class="ficha__cab">
      <h1>{{ libro.titulo }}</h1>
      <span class="chip">{{ libro.categoria }}</span>
    </header>
    <div class="ficha__cuerpo">
      <p>{{ libro.autor }}</p>
      <p>{{ libro.descripcion || 'Este libro aún no tiene reseña.' }}</p>
    </div>
  </article>

  <p v-else class="vacio">No encontramos este libro.</p>

  <RouterLink to="/libros" class="btn btn--sec volver">Volver al catálogo</RouterLink>
</template>
