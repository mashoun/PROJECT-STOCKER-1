<template>
  <collection-list></collection-list>
</template>

<script>
import { useStore } from "../stores/mainStore";
import collectionList from "@/components/collection-list.vue";
export default {

  setup() {
    const store = useStore();
    return { store };
  },
  components: { collectionList }
}
</script>
