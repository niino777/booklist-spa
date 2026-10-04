import { createRouter, createWebHistory } from 'vue-router'
import { useSesion } from '../composables/useSesion'
import InicioView from '../views/InicioView.vue'
import ListaLibros from '../views/ListaLibros.vue'
import DetalleLibro from '../views/DetalleLibro.vue'
import PerfilView from '../views/PerfilView.vue'
import ConfiguracionView from '../views/ConfiguracionView.vue'

const routes = [
  { path: '/', name: 'inicio', component: InicioView },
  { path: '/libros', name: 'libros', component: ListaLibros },
  // Ruta dinámica: :id llega al componente como prop
  { path: '/libros/:id', name: 'detalle', component: DetalleLibro, props: true },
  // Rutas que solo puede ver un usuario con sesión iniciada
  { path: '/perfil', name: 'perfil', component: PerfilView, meta: { requiereSesion: true } },
  { path: '/configuracion', name: 'configuracion', component: ConfiguracionView, meta: { requiereSesion: true } },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

// Guardia de navegación: sin sesión, vuelve al inicio
router.beforeEach((to) => {
  const { sesion } = useSesion()
  if (to.meta.requiereSesion && !sesion.activa) return { name: 'inicio' }
})

export default router
