<template lang="pug">
  .bg-product
    Header
    .page-edit.mt-2
      h1.text-center Editar producto
      form(@submit.prevent="updateProduct")
        input(type="text" hidden v-model="product.id")
        .mb-3
          label(for="title" class="form-label") Título
          input#title.form-control(type="text" v-model="product.title")
        .mb-3
          label(for="description" class="form-label") Descripción
          textarea#description.form-control(rows="3" v-model="product.description")
        .mb-3
          label(for="category" class="form-label") Categoría
          input#category.form-control(type="text" v-model="product.category")
        .mb-3
          label(for="price" class="form-label") Precio
          input#price.form-control(type="number" v-model="product.price" step="0.01")
        .mb-3
          label(for="stock" class="form-label") Stock
          input#stock.form-control(type="number" v-model="product.stock")
        .mb-3
          label(for="rating" class="form-label") Rating
          input#rating.form-control(type="number" v-model="product.rating" step="0.01")
        .d-flex.justify-content-start
          button.btn.btn-primary.mx-2(type="submit") Actualizar
          button.btn.btn-dark(@click="exitUpdate") Salir
    Footer
  </template>
<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import axios from "axios";
import toastMixin from "@/assets/js/toastMixin";

export default {
  name: "EditProductView",
  mixins: [toastMixin],
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      product: {
        id: 0,
        title: "",
        description: "",
        category: "",
        price: 0,
        stock: 0,
        rating: 0,
      },
      errorMessage: "",
    };
  },
  mounted() {
    this.product.id = this.$route.params.id;
    let token = localStorage.getItem("token");
    if (!token) {
      this.$router.push("/");
    } else {
      axios
        .get(`https://dummyjson.com/products/${this.product.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          this.product = response.data;
        })
        .catch((error) => {
          this.errorMessage =
            error.response.data.message ?? "Error al cargar el producto";
          this.makeToast(
            "Error",
            this.errorMessage ?? "Error al cargar el producto",
            "danger"
          );
        });
    }
  },
  methods: {
    updateProduct() {
      let token = localStorage.getItem("token");
      if (!token) {
        this.$router.push("/");
      } else {
        axios
          .put(`https://dummyjson.com/products/${this.product.id}`, this.product, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            if (response.status === 200) {
              this.makeToast(
                "Producto actualizado",
                "El producto fue actualizado con éxito",
                "success"
              );
              setTimeout(() => {
                this.$router.push("/home");
              }, 1500);
            }
          })
          .catch((error) => {
            this.errorMessage =
              error.response.data.message ?? "Error al actualizar el producto";
            this.makeToast(
              "Error",
              this.errorMessage ?? "Error al actualizar el producto",
              "danger"
            );
          });
      }
    },
    exitUpdate() {
      this.$router.push("/home");
    },
  },
};
</script>
<style scope>
.bg-product {
  background-color: #e7f1fb;
}

.page-edit {
  margin: auto;
  width: 80%;
  height: 90vh;
  padding: 20px;
}
</style>
