<script setup>
import { useSesion } from '../composables/useSesion'

const { sesion } = useSesion()
</script>

<template>
  <h1>Configuración</h1>

  <section class="panel panel--simple">
    <label class="check">
      <input v-model="sesion.resenasAbiertas" type="checkbox" />
      Mostrar las reseñas abiertas por defecto
    </label>
    <p class="nota">Se aplica a las fichas del catálogo.</p>
  </section>
</template>
