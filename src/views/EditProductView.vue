<template>
  <div class="bg-product">
    <Header />
    <div class="page-edit mt-2">
      <h1 class="text-center">Editar producto</h1>
      <form v-on:submit.prevent="updateProduct()">
        <input type="text" hidden v-model="product.id" />
        <div class="mb-3">
          <label for="title" class="form-label">Título</label>
          <input
            type="text"
            class="form-control"
            id="title"
            v-model="product.title"
          />
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">Descripción</label>
          <textarea
            class="form-control"
            id="description"
            rows="3"
            v-model="product.description"
          ></textarea>
        </div>
        <div class="mb-3">
          <label for="category" class="form-label">Categoría</label>
          <input
            type="text"
            class="form-control"
            id="category"
            v-model="product.category"
          />
        </div>
        <div class="mb-3">
          <label for="price" class="form-label">Precio</label>
          <input
            type="number"
            class="form-control"
            id="price"
            v-model="product.price"
            step="0.01"
          />
        </div>
        <div class="mb-3">
          <label for="stock" class="form-label">Stock</label>
          <input
            type="number"
            class="form-control"
            id="stock"
            v-model="product.stock"
          />
        </div>
        <div class="mb-3">
          <label for="rating" class="form-label">Rating</label>
          <input
            type="number"
            class="form-control"
            id="rating"
            v-model="product.rating"
            step="0.01"
          />
        </div>
        <div class="d-flex justify-content-start">
          <button type="submit" class="btn btn-primary mx-2">Actualizar</button>
          <button class="btn btn-dark" v-on:click="exitUpdate()">Salir</button>
        </div>
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
              "danger",
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
          .put(
            `https://dummyjson.com/products/${this.product.id}`,
            this.product,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
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
