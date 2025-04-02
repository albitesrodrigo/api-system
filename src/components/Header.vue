<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand :to="{ path: '/home' }">Inicio</b-navbar-brand>
      <!-- Agregamos el boton para el cierre de sesion -->
      <b-button variant="outline-light" class="ml-auto" v-on:click="logout()">
        Cerrar Sesion
      </b-button>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "AppHeader",
  data() {
    return {
      // Define any data properties you need here
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/");
    },
  },
};
</script>
