<script setup>
import { ref } from 'vue'
import { useSesion } from '../composables/useSesion'

defineProps({
  libro: { type: Object, required: true },
})
defineEmits(['eliminar', 'alternar-leido'])

const { sesion } = useSesion()
// Valor inicial tomado de Configuración
const abierto = ref(sesion.resenasAbiertas)
</script>

<template>
  <article class="ficha" :data-categoria="libro.categoria">
    <header class="ficha__cab">
      <h3>
        <RouterLink :to="{ name: 'detalle', params: { id: libro.id } }" :title="`Ver detalle de ${libro.titulo}`">
          {{ libro.titulo }}
        </RouterLink>
      </h3>
      <span class="chip">{{ libro.categoria }}</span>
    </header>

    <div class="ficha__cuerpo">
      <p>{{ libro.autor }}</p>
      <!-- v-show: el elemento siempre existe, solo cambia su visibilidad -->
      <p v-show="abierto">{{ libro.descripcion || 'Sin reseña.' }}</p>
    </div>

    <footer class="acciones">
      <button type="button" class="btn btn--sec" :aria-expanded="abierto" @click="abierto = !abierto">
        {{ abierto ? 'Ocultar reseña' : 'Ver reseña' }}
      </button>
      <button
        type="button"
        class="btn btn--sec"
        :aria-pressed="!!libro.leido"
        @click="$emit('alternar-leido', libro.id)"
      >
        {{ libro.leido ? '✓ Leído' : 'Marcar como leído' }}
      </button>
      <!-- Solo el usuario con sesión puede eliminar -->
      <button v-if="sesion.activa" type="button" class="btn btn--peligro" @click="$emit('eliminar', libro.id)">
        Eliminar
      </button>
    </footer>
  </article>
</template>
