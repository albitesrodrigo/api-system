<template lang="pug">
  .bg-product
    Header
    .page-create.mt-2
      h1.text-center Crear producto
      form(@submit.prevent="createProduct")
        .mb-3
          label(for="title" class="form-label") Título
          input#title.form-control(type="text" v-model="product.title" required)
        .mb-3
          label(for="description" class="form-label") Descripción
          textarea#description.form-control(rows="3" v-model="product.description" required)
        .mb-3
          label(for="category" class="form-label") Categoría
          input#category.form-control(type="text" v-model="product.category" required)
        .mb-3
          label(for="price" class="form-label") Precio
          input#price.form-control(type="number" v-model.number="product.price" step="0.01" required)
        .mb-3
          label(for="stock" class="form-label") Stock
          input#stock.form-control(type="number" v-model.number="product.stock" required)
        .mb-3
          label(for="rating" class="form-label") Rating
          input#rating.form-control(type="number" v-model.number="product.rating" step="0.01" required)
        button.btn.btn-primary(type="submit") Crear producto
    Footer
  </template>
<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import axios from "axios";
import toastMixin from "@/assets/js/toastMixin";

export default {
  name: "CreateProductView",
  mixins: [toastMixin],
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      product: {
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
    let token = localStorage.getItem("token");
    if (!token) {
      this.$router.push("/");
    }
  },
  methods: {
    createProduct() {
      let token = localStorage.getItem("token");
      if (!token) {
        this.$router.push("/");
      } else {
        axios
          .post("https://dummyjson.com/products/add", this.product, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            if (response.status === 201) {
              this.makeToast(
                "Producto creado",
                "El producto fue creado con éxito",
                "success"
              );
              setTimeout(() => {
                this.$router.push("/home");
              }, 1500);
            }
          })
          .catch((error) => {
            this.errorMessage = error.response.data.message;
            this.makeToast(
              "Error",
              this.errorMessage ?? "Error al crear el producto",
              "danger"
            );
          });
      }
    },
  },
};
</script>
<style scope>
.bg-product {
  background-color: #e7f1fb;
}

.page-create {
  margin: auto;
  width: 80%;
  height: 90vh;
  padding: 20px;
}
</style>
