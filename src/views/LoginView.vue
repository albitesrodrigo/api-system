<template>
  <div class="container">
    <div class="d-flex justify-content-center h-100">
      <div class="card">
        <div class="card-header">
          <h3>Iniciar sesión</h3>
          <div class="d-flex justify-content-end social_icon">
            <span><i class="fab fa-facebook-square"></i></span>
            <span><i class="fab fa-google-plus-square"></i></span>
            <span><i class="fab fa-twitter-square"></i></span>
          </div>
        </div>
        <div class="card-body">
          <form v-on:submit.prevent="login">
            <div class="input-group form-group">
              <div class="input-group-prepend">
                <span class="input-group-text"
                  ><i class="fas fa-user"></i
                ></span>
              </div>
              <input
                type="text"
                class="form-control"
                placeholder="Usuario"
                v-model="user"
              />
            </div>
            <div class="input-group form-group">
              <div class="input-group-prepend">
                <span class="input-group-text"><i class="fas fa-key"></i></span>
              </div>
              <input
                type="password"
                class="form-control"
                placeholder="Password"
                v-model="password"
              />
            </div>
            <div class="form-group">
              <input
                type="submit"
                value="Login"
                class="float-right login_btn"
              />
            </div>
          </form>
        </div>
        <div class="card-footer">
          <div class="d-flex justify-content-center links">
            ¿No tienes una cuenta?<a href="#">Registrate</a>
          </div>
          <div class="d-flex justify-content-center">
            <a href="#">¿Olvidaste tu contraseña?</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import toastMixin from "@/assets/js/toastMixin";

export default {
  name: "LoginView",
  mixins: [toastMixin],
  comments: {},
  data: function () {
    return {
      user: "",
      password: "",
      nameUser: "",
      errorMessage: "",
    };
  },
  methods: {
    login() {
      let data = {
        username: this.user.trim(),
        password: this.password.trim(),
      };
      axios
        .post("https://dummyjson.com/auth/login", data)
        .then((response) => {
          if (response.status === 200) {
            this.nameUser = `${response.data.firstName} ${response.data.lastName}`;
            localStorage.setItem("token", response.data.accessToken);
            this.makeToast(
              "Bienvenido",
              `Hola ${this.nameUser}, has iniciado sesión correctamente.`,
              "success"
            );
            setTimeout(() => {
              this.$router.push("/home");
            }, 2000);
          }
        })
        .catch((error) => {
          this.errorMessage = error.response.data.message;
          this.makeToast(
            "Error",
            this.errorMessage ?? "Error al iniciar sesión",
            "danger"
          );
        });
    },
  },
  mounted() {},
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Numans");

html,
body {
  background-image: url("http://getwallpapers.com/wallpaper/full/a/5/d/544750.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  height: 100%;
  font-family: "Numans", sans-serif;
}

.container {
  height: 100vh;
  align-content: center;
}

.card {
  height: 370px;
  margin-top: auto;
  margin-bottom: auto;
  width: 400px;
  background-color: rgba(0, 0, 0, 0.5) !important;
}

.social_icon span {
  font-size: 60px;
  margin-left: 10px;
  color: #ffc312;
}

.social_icon span:hover {
  color: white;
  cursor: pointer;
}

.card-header h3 {
  color: white;
}

.social_icon {
  position: absolute;
  right: 20px;
  top: -45px;
}

.input-group-prepend span {
  width: 50px;
  background-color: #ffc312;
  color: black;
  border: 0 !important;
}

input:focus {
  outline: 0 0 0 0 !important;
  box-shadow: 0 0 0 0 !important;
}

.remember {
  color: white;
}

.remember input {
  width: 20px;
  height: 20px;
  margin-left: 15px;
  margin-right: 5px;
}

.login_btn {
  color: black;
  background-color: #ffc312;
  width: 100px;
  border-radius: 5px;
  padding: 2px;
}

.login_btn:hover {
  color: black;
  background-color: white;
}

.links {
  color: white;
}

.links a {
  margin-left: 4px;
}
</style>
