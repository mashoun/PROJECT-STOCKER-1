<template>
    <spinner v-if="spinner">Removing Collection</spinner>
    <section v-if="selectedCollection.record.id != ''" class="container">
        <div class="row g-3">
            <div class="col-12">
                <pagination :collection="selectedCollection.record"></pagination>
            </div>
            <div class="col-12">
                <div class="input-group mb-3">
                    <input v-model="searchInput" type="text" class="form-control"
                        placeholder="Search by name, model type/brand/number">
                    <span class="input-group-text"><span class="material-symbols-outlined">search</span></span>
                    <span class="input-group-text rounded-end" type="button" data-bs-toggle="dropdown"><span
                            class="material-symbols-outlined text-dark fw-bold">more_horiz</span></span>
                    <ul class="dropdown-menu fs-small">
                        <li>
                            <router-link class="dropdown-item"
                                :to="{ name: 'newItem', params: { collectionId: $route.params.collectionId } }">
                                <span>Add new item</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link class="dropdown-item"
                                :to="{ name: 'updateCollection', params: { collectionId: $route.params.collectionId } }">
                                <span>Update this collection</span>
                            </router-link>
                        </li>
                        <li><span class="dropdown-item text-danger" role="button" @click="removeCollection">Remove this
                                collection</span></li>
                    </ul>
                </div>
            </div>
            <!-- <div v-if="selectedCollection.items.length != 0" class="col-12"><p class="text-secondary fs-small pop ls-1 fw-bold">Items:</p></div> -->
            <div v-if="selectedCollection.items.length == 0" class="col-12">
                <p class="text-secondary text-center fs-small py-5">This collection is empty!</p>
            </div>
            <div v-else class="col-12 col-lg-6" v-for="node in filteredItems" :key="node.index">
                <router-link :to="{ name: 'itemDetails', params: { itemId: node.id } }">
                    <aside
                        class="w-100 p-3 bg-light shadow-sm rounded d-flex justify-content-between align-items-center gap-2">
                        <span class="material-symbols-outlined text-stocker-secondary fs-1">package_2</span>
                        <p class="w-100 font-arabic text-uppercase text-stocker-dark-blue fw-bold"  :class="{'text-danger': parseFloat(node.quantity) <= 1}">{{ node.name }}</p>
                        <span class="fs-smaller m-0 text-secondary" :class="{'text-danger': parseFloat(node.quantity) <= 1}">{{ node.quantity }}</span>
                        <span class="material-symbols-outlined">navigate_next</span>
                    </aside>
                </router-link>
            </div>
        </div>
    </section>
    <section v-else class="p-5"><h1 class="text-secondary text-center pop">404 Collection Not Found</h1></section>
    <aside v-if="selectedCollection.record.id != ''" class="position-fixed bottom-0 end-0 z-1">
        <router-link :to="{ name: 'newItem', params: { collectionId: $route.params.collectionId } }">
            <div class="m-3"><span class="material-symbols-outlined fs-xx-large text-primary">add_circle</span></div>
        </router-link>
    </aside>
</template>
  
<script>
import { useStore } from "@/stores/mainStore";
import item from "@/components/item.vue";
import pagination from "@/components/pagination.vue";
import spinner from "@/components/spinner.vue";
export default {

    setup() {
        const store = useStore();
        return { store };
    },
    data() {
        return {
            searchInput: '',
            spinner: false
        }
    },
    components: { item, pagination, spinner },
    computed: {
        selectedCollection() {
            var scoll = this.store.stocker.collections.filter(coll => {
                return coll.record.id == this.$route.params.collectionId
            })
            if (scoll.length == 0) return {
                record: { id: '', name: '' },
                items: []
            }

            return scoll[0]
        },

        filteredItems() {
            if (this.searchInput == '') return this.selectedCollection.items

            return this.selectedCollection.items.filter(item => {
                return item.name.toUpperCase().includes(this.searchInput.toUpperCase()) || item.modelType.includes(this.searchInput) || item.modelNumber.includes(this.searchInput) || item.modelBrand.includes(this.searchInput)
            });
        }

    },
    methods: {

        removeCollection() {

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
                        collectionId: this.$route.params.collectionId
                    })
                }).then(res => res.json()).then(res => {

                    console.log(res);
                    this.spinner = false
                    if (res.status == true) {
                        console.log('removing statically from collections');
                        this.store.stocker.collections = this.store.stocker.collections.filter(e => {
                            return e.record.id != this.$route.params.collectionId
                        })

                        console.log(this.store.stocker.collections);

                        alert('Meshe l7al')

                        this.$router.replace({name:'home'})

                    } else alert(res.data)

                }).catch(err => {
                    console.log(err);
                    alert('weak network')
                    this.spinner = false
                })
            }
        },
    }
}
</script>
