<template>
  <footer class="text-center bg-body-tertiary">
    <!-- Grid container -->
    <div>
      <!-- Section: Social media -->
      <section>
        <!-- Facebook -->
        <a
          data-mdb-ripple-init
          class="btn btn-link btn-floating btn-lg text-body m-1"
          href="#!"
          role="button"
          data-mdb-ripple-color="dark"
          ><i class="fab fa-facebook-f"></i
        ></a>

        <!-- Twitter -->
        <a
          data-mdb-ripple-init
          class="btn btn-link btn-floating btn-lg text-body m-1"
          href="#!"
          role="button"
          data-mdb-ripple-color="dark"
          ><i class="fab fa-twitter"></i
        ></a>

        <!-- Google -->
        <a
          data-mdb-ripple-init
          class="btn btn-link btn-floating btn-lg text-body m-1"
          href="#!"
          role="button"
          data-mdb-ripple-color="dark"
          ><i class="fab fa-google"></i
        ></a>

        <!-- Instagram -->
        <a
          data-mdb-ripple-init
          class="btn btn-link btn-floating btn-lg text-body m-1"
          href="#!"
          role="button"
          data-mdb-ripple-color="dark"
          ><i class="fab fa-instagram"></i
        ></a>

        <!-- Linkedin -->
        <a
          data-mdb-ripple-init
          class="btn btn-link btn-floating btn-lg text-body m-1"
          href="#!"
          role="button"
          data-mdb-ripple-color="dark"
          ><i class="fab fa-linkedin"></i
        ></a>
        <!-- Github -->
        <a
          data-mdb-ripple-init
          class="btn btn-link btn-floating btn-lg text-body m-1"
          href="#!"
          role="button"
          data-mdb-ripple-color="dark"
          ><i class="fab fa-github"></i
        ></a>
      </section>
      <!-- Section: Social media -->
    </div>
    <!-- Grid container -->

    <!-- Copyright -->
    <div class="text-center p-2" style="background-color: rgba(0, 0, 0, 0.05)">
      © 2020 Copyright:
      <a class="text-body" href="https://mdbootstrap.com/">MDBootstrap.com</a>
    </div>
    <!-- Copyright -->
  </footer>
</template>
<script>
export default {
  name: "AppFooter",
  data() {
    return {
      // Define any data properties you need here
    };
  },
  methods: {
    // Define any methods you need here
  },
};
</script>
<style scoped>
footer {
  position: fixed;
  height: 120px;
  bottom: 0;
  width: 100%;
  background-color: #f8f9fa;
  padding: 1rem 0;
}
</style>