<template>
  <login v-if="!store.isLogedIn"></login>
  <navbar-section v-if="store.isLogedIn"></navbar-section>
  <main v-if="store.isLogedIn" style="margin-top: 50px;" class="py-4">
    <router-view></router-view>
  </main>
</template>
<script>

import { useStore } from "@/stores/mainStore";
import navbarSection from '@/components/navbarSection.vue'
import login from "./components/login.vue";
export default {

  setup() {
    const store = useStore();
    return { store };
  },
  components:{navbarSection,login}
}

</script>