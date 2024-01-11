<template>
    <section class="container">
        <div class="row g-3">
            <div v-if="store.selectedCollection.items.length > 0" class="col-12 col-md-9 col-lg-6" v-for="node in store.selectedCollection.items" :key="node.id">
                <item :data="node"></item>
            </div>
        </div>
    </section>
</template>
  
<script>
import { useStore } from "../stores/mainStore";
import item from "@/components/item.vue";
export default {

    setup() {
        const store = useStore();
        return { store };
    },
    components: { item }
}
</script>
  