<script setup>
import { reactive, computed } from 'vue'
import { useLibros } from '../composables/useLibros'

const categorias = ['Novela', 'Ensayo', 'Poesía', 'Ciencia', 'Infantil']
const { agregarLibro } = useLibros()

const nuevo = reactive({ titulo: '', autor: '', categoria: '', descripcion: '' })

const esValido = computed(() => nuevo.titulo.trim() && nuevo.autor.trim() && nuevo.categoria)

function agregar() {
  if (!esValido.value) return
  agregarLibro({ ...nuevo, titulo: nuevo.titulo.trim(), autor: nuevo.autor.trim() })
  Object.assign(nuevo, { titulo: '', autor: '', categoria: '', descripcion: '' })
}
</script>

<template>
  <section class="panel" aria-labelledby="titulo-form">
    <div>
      <h2 id="titulo-form">Nueva ficha</h2>

      <!-- .prevent evita que el navegador recargue la página al enviar -->
      <form @submit.prevent>
        <label>
          Título
          <input v-model="nuevo.titulo" type="text" placeholder="Ej: Ficciones" @keyup.enter="agregar" />
        </label>

        <label>
          Autor
          <input v-model="nuevo.autor" type="text" placeholder="Ej: Jorge Luis Borges" @keyup.enter="agregar" />
        </label>

        <label>
          Categoría
          <select v-model="nuevo.categoria">
            <option value="" disabled>Elige una categoría</option>
            <option v-for="c in categorias" :key="c" :value="c">{{ c }}</option>
          </select>
        </label>

        <label>
          Reseña (opcional)
          <textarea v-model="nuevo.descripcion" rows="3"></textarea>
        </label>

        <button type="button" class="btn" :disabled="!esValido" @click="agregar">Agregar libro</button>
      </form>
    </div>

    <!-- Vista previa en tiempo real del modelo -->
    <aside aria-live="polite">
      <h3 class="previa__titulo">Vista previa</h3>
      <article class="ficha" :data-categoria="nuevo.categoria">
        <header class="ficha__cab">
          <h3>{{ nuevo.titulo || 'Título del libro' }}</h3>
          <span class="chip">{{ nuevo.categoria || 'Categoría' }}</span>
        </header>
        <div class="ficha__cuerpo">
          <p>{{ nuevo.autor || 'Autor' }}</p>
          <p v-if="nuevo.descripcion">{{ nuevo.descripcion }}</p>
        </div>
      </article>
    </aside>
  </section>
</template>
