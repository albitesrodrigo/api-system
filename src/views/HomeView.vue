<template>
  <div class="table-list">
    <Header />
    <div class="p-3">
      <button class="btn btn-primary mb-3" v-on:click="createProduct()">
        Crear producto
      </button>
      <table class="table table-hover table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Título</th>
            <th scope="col">Descripción</th>
            <th scope="col">Categoría</th>
            <th scope="col">Precio</th>
            <th scope="col">Stock</th>
            <th scope="col">Calificación</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in listProducts" :key="index">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ product.title }}</td>
            <td>{{ product.description }}</td>
            <td>{{ product.category }}</td>
            <td>S/ {{ product.price }}</td>
            <td>{{ product.stock }}</td>
            <td>{{ product.rating }}</td>
            <td>
              <div class="d-flex justify-content-center">
                <button
                  type="button"
                  class="mx-2 btn btn-primary btn-sm"
                  @click.stop="editProduct(product.id)"
                >
                  Editar
                </button>
                <button
                  type="button"
                  class="btn btn-danger btn-sm"
                  @click.stop="deleteProduct(product.id)"
                >
                  Eliminar
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
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
  name: "HomeView",
  mixins: [toastMixin],
  data() {
    return {
      listProducts: [],
      errorMessage: "",
    };
  },
  components: {
    Header,
    Footer,
  },
  mounted: function () {
    let token = localStorage.getItem("token");
    if (!token) {
      this.$router.push("/");
    } else {
      axios
        .get("https://dummyjson.com/products", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          this.listProducts = response.data.products;
        })
        .catch((error) => {
          this.errorMessage = error.response.data.message;
          this.$router.push("/");
          this.makeToast(
            "Error",
            this.errorMessage ?? "Error al cargar los productos",
            "danger"
          );
        });
    }
  },
  methods: {
    editProduct(id) {
      this.$router.push("/edit-product/" + id);
    },
    deleteProduct(id) {
      let token = localStorage.getItem("token");
      if (!token) {
        this.$router.push("/");
      } else {
        axios
          .delete(`https://dummyjson.com/products/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            if (response.status === 200) {
              this.listProducts = this.listProducts.filter(
                (product) => product.id !== id
              );
              this.makeToast(
                "Producto eliminado",
                "El producto fue eliminado con éxito",
                "success"
              );
            }
          })
          .catch((error) => {
            this.errorMessage = error.response.data.message;
            this.makeToast(
              "Error",
              this.errorMessage ?? "Error al eliminar el producto",
              "danger"
            );
          });
      }
    },
    createProduct() {
      this.$router.push("/create-product");
    },
  },
};
</script>
<style scoped>
.table-list {
  background-color: #ebeced;
  padding-bottom: 100px;
}
</style>
