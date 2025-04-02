export default {
    methods: {
      makeToast(titulo, texto, tipo) {
        this.$bvToast.toast(texto, {
          title: titulo,
          autoHideDelay: 5000,
          variant: tipo,
        });
      },
    },
  };