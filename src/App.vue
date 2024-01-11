<template>
  <!-- <section style="width: 100vw; height: 100vh !important;" class="position-fixed z-3 top-0 start-0 bg-glass d-flex justify-content-center align-items-center">

    <div class="p-3 d-flex flex-column justify-content-center align-items-center gap-3">
      <h3 class="font-stocker text-stocker-dark-blue fs-3">LOADING STORE</h3>
      <span class="spinner-grow spinner-grow-sm"></span>
    </div>

  </section> -->
  <login v-if="!store.isLogedIn"></login>
  <navbar-section v-if="store.isLogedIn"></navbar-section>
  <main v-if="store.isLogedIn" style="margin-top: 50px;" class="py-3">
    <router-view></router-view>
  </main>
</template>
<script>

import { useStore } from "./stores/mainStore";
import navbarSection from './components/navbar-section.vue'
import login from "./components/login.vue";
export default {

  setup() {
    const store = useStore();
    return { store };
  },
  components:{navbarSection,login}
}

</script>