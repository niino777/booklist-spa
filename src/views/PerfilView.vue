<script setup>
import { useSesion } from '../composables/useSesion'

const { sesion } = useSesion()
</script>

<template>
  <h1>Editar perfil</h1>

  <section class="panel panel--simple">
    <label>
      Nombre de usuario
      <input v-model.trim="sesion.nombre" type="text" maxlength="30" />
    </label>
    <p class="nota">El cambio se guarda solo y se ve de inmediato en la barra superior.</p>
  </section>
</template>
