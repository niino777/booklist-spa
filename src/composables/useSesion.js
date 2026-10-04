import { reactive, watch } from 'vue'

// Sesión simulada (prototipo sin backend). Se guarda en localStorage
// y se comparte entre componentes igual que la lista de libros.
const sesion = reactive({
  activa: false,
  nombre: 'usuario1',
  resenasAbiertas: false,
  ...JSON.parse(localStorage.getItem('sesion') ?? '{}'),
})

watch(sesion, (valor) => localStorage.setItem('sesion', JSON.stringify(valor)))

export function useSesion() {
  function iniciarSesion() {
    sesion.activa = true
  }

  function cerrarSesion() {
    sesion.activa = false
  }

  return { sesion, iniciarSesion, cerrarSesion }
}
