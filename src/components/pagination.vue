<template>
    <aside
        class="p-2 bg-grad text-stocker-dark-blue border rounded d-flex align-items-center gap-1 font-arabic text-uppercase">
        <router-link to="/">HOME</router-link>
        <span class="material-symbols-outlined">double_arrow</span>
        <router-link v-if="collection.id != ''" :to="{ name: 'collectionItems', params: { collectionId: collection.id } }">
            {{ collection.name }}
        </router-link>
        <span v-if="item && item.id != ''" class="material-symbols-outlined">double_arrow</span>
        <span v-if="item && item.id != ''" class="text-fade">{{ item.name }}</span>
    </aside>
</template>
<script>
import { useStore } from "@/stores/mainStore";
export default {

    setup() {
        const store = useStore();
        return { store };
    },
    props: ['collection', 'item']
    // computed:{
    //     collectionName(){
    //         this.store.stocker.collections.forEach(coll => {
    //             if (coll.record.id == this.$route.params.collectionId) {
    //                 console.log(coll.record.name);
    //                 return coll.record.name
    //             }
    //         })
    //         return ''
    //     }
    // }
}
</script>