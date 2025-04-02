<template>
  <div class="bg-product">
    <Header />
    <div class="page-create mt-2">
      <h1 class="text-center">Crear producto</h1>
      <form v-on:submit.prevent="createProduct()">
        <div class="mb-3">
          <label for="title" class="form-label">Título</label>
          <input
            type="text"
            class="form-control"
            id="title"
            v-model="product.title"
            required
          />
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">Descripción</label>
          <textarea
            class="form-control"
            id="description"
            rows="3"
            v-model="product.description"
            required
          ></textarea>
        </div>
        <div class="mb-3">
          <label for="category" class="form-label">Categoría</label>
          <input
            type="text"
            class="form-control"
            id="category"
            v-model="product.category"
            required
          />
        </div>
        <div class="mb-3">
          <label for="price" class="form-label">Precio</label>
          <input
            type="number"
            class="form-control"
            id="price"
            v-model.number="product.price"
            step="0.01"
            required
          />
        </div>
        <div class="mb-3">
          <label for="stock" class="form-label">Stock</label>
          <input
            type="number"
            class="form-control"
            id="stock"
            v-model.number="product.stock"
            required
          />
        </div>
        <div class="mb-3">
          <label for="rating" class="form-label">Rating</label>
          <input
            type="number"
            class="form-control"
            id="rating"
            v-model.number="product.rating"
            required
            step="0.01"
          />
        </div>
        <button type="submit" class="btn btn-primary">Crear producto</button>
      </form>
    </div>
    <Footer />
  </div>
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
