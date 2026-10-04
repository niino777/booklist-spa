<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSesion } from './composables/useSesion'

const { sesion, iniciarSesion, cerrarSesion } = useSesion()
const route = useRoute()
const router = useRouter()

// Estado reactivo (equivale a data() en la Options API)
const menuAbierto = ref(false)

// Métodos (equivalen a methods en la Options API)
function salir() {
  cerrarSesion()
  if (route.meta.requiereSesion) router.push({ name: 'inicio' })
}

// Cierra el menú cuando el foco sale de él (clic fuera o Tab)
function alSalirFoco(evento) {
  if (!evento.currentTarget.contains(evento.relatedTarget)) menuAbierto.value = false
}
</script>

<template>
  <div class="barra">
    <div v-if="sesion.activa" class="usuario" @focusout="alSalirFoco" @keyup.esc="menuAbierto = false">
      <button
        type="button"
        class="barra__btn"
        aria-haspopup="true"
        :aria-expanded="menuAbierto"
        @click="menuAbierto = !menuAbierto"
      >
        Hola, {{ sesion.nombre || 'usuario1' }} ▾
      </button>

      <ul v-if="menuAbierto" class="usuario__menu" @click="menuAbierto = false">
        <li><RouterLink to="/perfil">Editar perfil</RouterLink></li>
        <li><RouterLink to="/configuracion">Configuración</RouterLink></li>
        <li><button type="button" @click="salir">Cerrar sesión</button></li>
      </ul>
    </div>
    <button v-else type="button" class="barra__btn" @click="iniciarSesion">Iniciar sesión</button>
  </div>

  <header class="cabecera">
    <RouterLink to="/" class="marca" aria-label="BookList, ir al inicio">
      <img src="@/assets/logo.svg" alt="" class="marca__logo" />
      <span>BookList</span>
    </RouterLink>

    <nav class="menu" aria-label="Principal">
      <RouterLink to="/">Inicio</RouterLink>
      <RouterLink to="/libros">Libros</RouterLink>
    </nav>
  </header>

  <main class="contenedor">
    <RouterView />
  </main>

  <footer class="pie">Editorial Nova · Prototipo BookList</footer>
</template>

<style scoped>
.barra {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem 1rem;
  padding: 0.4rem 1rem;
  background: var(--tinta);
  color: #fff;
  font-size: 0.9rem;
}
.barra__btn {
  padding: 0.2rem 0.9rem;
  font: inherit;
  color: #fff;
  background: transparent;
  border: 1px solid #8e9bbd;
  border-radius: 999px;
  cursor: pointer;
}
.barra__btn:hover {
  background: rgb(255 255 255 / 0.12);
}

.usuario {
  position: relative;
}
.usuario__menu {
  position: absolute;
  top: calc(100% + 0.4rem);
  left: 0;
  z-index: 10;
  min-width: 12rem;
  margin: 0;
  padding: 0.35rem;
  list-style: none;
  background: #fff;
  border: 1px solid var(--borde);
  border-radius: 8px;
  box-shadow: 0 8px 24px rgb(27 42 74 / 0.18);
}
.usuario__menu a,
.usuario__menu button {
  display: block;
  width: 100%;
  padding: 0.5rem 0.75rem;
  font: inherit;
  text-align: left;
  text-decoration: none;
  color: var(--tinta);
  background: none;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
}
.usuario__menu a:hover,
.usuario__menu button:hover {
  background: var(--fondo);
}

.cabecera {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem 1.5rem;
  padding: 0.75rem 1rem;
  background: #fff;
  border-bottom: 3px solid var(--margen);
}
.marca {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--fuente-titulo);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--tinta);
  text-decoration: none;
}
.marca__logo {
  height: 2.5rem;
  width: auto;
}
.menu {
  display: flex;
  gap: 1.25rem;
}
.menu a {
  padding: 0.25rem 0;
  color: var(--tinta);
  text-decoration: none;
  border-bottom: 2px solid transparent;
}
.menu a:hover,
.menu a.router-link-active:not([href='/']),
.menu a.router-link-exact-active {
  border-bottom-color: var(--acento);
}

.pie {
  padding: 2rem 1rem;
  text-align: center;
  color: var(--suave);
  font-size: 0.875rem;
}
</style>
