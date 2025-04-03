<template lang="pug">
  .bg-product
    Header
    .page-create
      h1.text-center.mb-0 Crear producto
      form(@submit.prevent="createProduct")
        .mb-1
          label(for="title" class="form-label") Título
          input#title.form-control(
            type="text"
            v-model="product.title"
            :class="{ 'is-invalid': v$.product.title.$error }"
          )
          div.text-danger(v-if="v$.product.title.$error") El título es obligatorio
        .mb-1
          label(for="description" class="form-label") Descripción
          textarea#description.form-control(
            rows="3"
            v-model="product.description"
            :class="{ 'is-invalid': v$.product.description.$error }"
          )
          div.text-danger(v-if="v$.product.description.$error") La descripción es obligatoria
        .row
          .col-md-6.mb-1
            label(for="category" class="form-label") Categoría
            input#category.form-control(
              type="text"
              v-model="product.category"
              :class="{ 'is-invalid': v$.product.category.$error }"
            )
            div.text-danger(v-if="v$.product.category.$error") La categoría es obligatoria
          .col-md-6.mb-1
            label(for="price" class="form-label") Precio
            input#price.form-control(
              type="number"
              v-model.number="product.price"
              step="0.01"
              :class="{ 'is-invalid': v$.product.price.$error }"
            )
            div.text-danger(v-if="v$.product.price.$error") El precio debe ser un número válido
        .row
          .col-md-6.mb-1
            label(for="stock" class="form-label") Stock
            input#stock.form-control(
              type="number"
              v-model.number="product.stock"
              :class="{ 'is-invalid': v$.product.stock.$error }"
            )
            div.text-danger(v-if="v$.product.stock.$error") El stock debe ser un número válido
          .col-md-6.mb-2
            label(for="rating" class="form-label") Rating
            input#rating.form-control(
              type="number"
              v-model.number="product.rating"
              step="0.01"
              :class="{ 'is-invalid': v$.product.rating.$error }"
            )
            div.text-danger(v-if="v$.product.rating.$error") El rating debe ser un número válido
        button.btn.btn-primary(type="submit") Crear producto
    Footer
  </template>
<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import axios from "axios";
import toastMixin from "@/assets/js/toastMixin";
import { useVuelidate } from "@vuelidate/core";
import { minValue, numeric, required } from "@vuelidate/validators";

export default {
  name: "CreateProductView",
  mixins: [toastMixin],
  components: {
    Header,
    Footer,
  },
  setup() {
    return { v$: useVuelidate() };
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
  validations() {
    return {
      product: {
        title: { required },
        description: { required },
        category: { required },
        price: { required, numeric, minValueValue: minValue(0.01) },
        stock: { required, numeric, minValueValue: minValue(1) },
        rating: { required, numeric, minValueValue: minValue(1) },
      },
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
      // Marca los campos como "tocados" para activar las validaciones
      this.v$.product.$touch();

      // Verifica si hay errores de validación
      if (this.v$.product.$invalid) {
        this.makeToast(
          "Error",
          "Por favor, corrige los errores en el formulario.",
          "danger"
        );
        return; // Detiene el envío si hay errores
      }
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
