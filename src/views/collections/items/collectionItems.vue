<template>
    <section class="container">
        <div class="row g-3">
            <div v-if="selectedCollection.items.length == 0" class="col-12">
                <p class="text-secondary text-center fs-small py-5">This collection is empty!</p>
            </div>
            <div v-else class="col-12 col-md-9 col-lg-6" v-for="node in selectedCollection.items" :key="node.index">
                <router-link :to="{ name: 'itemDetails', params: { itemId: node.id } }">
                    <aside class="w-100 p-3 bg-light shadow-sm rounded d-flex justify-content-between align-items-center gap-2">
                        <span class="material-symbols-outlined text-stocker-secondary fs-1">package_2</span>
                        <p class="w-100 font-arabic text-uppercase text-stocker-dark-blue fw-bold">{{ node.name }}</p>
                        <span class="material-symbols-outlined">navigate_next</span>
                    </aside>
                </router-link>
            </div>
        </div>
    </section>
    <aside class="position-fixed bottom-0 end-0 z-1">
        <router-link :to="{name:'newItem',params:{collectionId:$route.params.collectionId}}"><div class="m-3"><span class="material-symbols-outlined fs-xx-large text-primary">add_circle</span></div></router-link>
    </aside>
</template>
  
<script>
import { useStore } from "@/stores/mainStore";
import item from "@/components/item.vue";
export default {

    setup() {
        const store = useStore();
        return { store };
    },
    components: { item },
    computed: {
        selectedCollection() {
            return this.store.stocker.collections.filter(coll => {
                return coll.record.id == this.$route.params.collectionId
            })[0]
        }
    }
}
</script>
