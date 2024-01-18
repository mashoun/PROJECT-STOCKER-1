<template>
    <spinner v-if="spinner">Removing Collection</spinner>

    <section class="container">
        <div class="row g-3 justify-content-start">
            <div v-if="store.stocker.collections.length != 0" class="col-12"><p class="text-secondary fs-small pop ls-1 fw-bold">All {{store.stocker.collections.length}} collections</p></div>
            <div v-else class="col-12"><p class="text-secondary fs-small pop ls-1 text-center py-3">Start by creating new collection</p></div>
            <div role="button" class="col-12 col-md-10 col-lg-6" v-for="node in store.stocker.collections"
                :key="node">
                <router-link :to="{ name: 'collectionItems', params: { collectionId: node.record.id } }">
                    <aside class="p-3 d-flex justify-content-between align-items-center shadow-sm bg-light gap-2">
                        <span class="material-symbols-outlined text-stocker-secondary fs-1">folder</span>
                        <strong class="w-100 text-stocker-dark-blue font-arabic text-uppercase text-fade" role="button">{{ node.record.name }}</strong>
                        <span class="fs-smaller text-secondary m-0">{{ node.items.length }}</span>
                        <span class="material-symbols-outlined">double_arrow</span>
                    </aside>
                </router-link>
            </div>
        </div>
    </section>
    
    <aside class="position-fixed bottom-0 end-0 z-1">
        <router-link :to="{ name: 'newCollection' }">
            <div class="m-3"><span class="material-symbols-outlined fs-xx-large text-primary">add_box</span></div>
        </router-link>
    </aside>
</template>

<script>
import { useStore } from '@/stores/mainStore';
import spinner from '@/components/spinner.vue';
import pagination from '@/components/pagination.vue';
export default {

    setup() {
        const store = useStore();
        return { store };
    },
    data() {
        return {
            spinner: false
        }
    },
    components: { spinner, pagination },
    methods: {
        // showCollectionItems(collection) {
        //     this.store.selectedCollection = collection
        //     // this.$router.push(`/collections/${collection.record.id}`)
        // },
        removeCollection(collectionId) {

            if (confirm('m2akad ?')) {
                this.spinner = true
                fetch(this.store.getApi('?removeCollection=1'), {
                    method: "POST",
                    headers: {
                        "Content-Type": "text/plain"
                    },
                    body: JSON.stringify({
                        username: this.store.username,
                        password: this.store.password,
                        collectionId
                    })
                }).then(res => res.json()).then(res => {
                    console.log(res);
                    this.spinner = false
                    if (res.status == true) {

                        this.store.stocker.collections = this.store.stocker.collections.filter(e => {
                            return e.record.id != collectionId
                        })
                        alert('Meshe l7al')

                    } else alert(res.data)

                }).catch(err => {
                    console.log(err);
                    alert('weak network')
                    this.spinner = false
                })
            }
        },
        updateCollection(collectionId) {
            this.store.updatedCollectionId = collectionId
            this.$router.push('/updateCollection')
        }
    }
}
</script>