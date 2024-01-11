<template>
    <section v-if="spinner" style="width: 100vw; height: 100vh !important;"
        class="position-fixed z-3 top-0 start-0 bg-glass d-flex justify-content-center align-items-center">

        <div class="p-3 d-flex flex-column justify-content-center align-items-center gap-3">
            <h3 class="font-stocker text-stocker-dark-blue fs-3">Removing collection</h3>
            <span class="spinner-grow spinner-grow-sm"></span>
        </div>
    </section>
    <section class="container">
        <div class="row g-3 justify-content-center">
            <div class="col-12 col-md-10 col-lg-6" v-for="node in store.stocker.collections" :key="node.record.id">
                <aside class="p-2 bg-light rounded shadow-sm">
                    <div class="row">
                        <div class="col-2" @click="showCollectionItems(node)">
                            <div class="ratio ratio-1x1">
                                <img v-if="node.record.thumbnail != ''" :src="node.record.thumbnail"
                                    :alt="node.record.name + ' image'" class="object-fit-cover rounded ">
                                <div v-else class="rounded w-100 border d-flex justify-content-center align-items-center">
                                    <span class="material-symbols-outlined text-secondary fs-1">image</span>

                                </div>
                            </div>
                        </div>
                        <div class="col-10 font-arabic p-0">
                            <div class="d-flex align-items-center justify-content-between pe-3">
                                <strong @click="showCollectionItems(node)" class="w-100 text-stocker-dark-blue fs-5"
                                    role="button">{{ node.record.name }}</strong>
                                <i class="bi bi-three-dots text-stocker-dark-blue fs-5" role="button"
                                    title="update collection" data-bs-toggle="dropdown"></i>

                                <ul class="dropdown-menu">
                                    <router-link to="/update-collection">
                                        <li class="dropdown-item">update collection</li>
                                    </router-link>
                                    <li class="dropdown-item" role="button" @click="removeCollection(node.record.id)">delete
                                        this collection</li>
                                </ul>
                            </div>
                            <p @click="showCollectionItems(node)" class="w-100 fs-smaller text-secondary">{{
                                node.record.description }}</p>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    </section>
</template>

<script>
import { useStore } from "../stores/mainStore";
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
    methods: {
        showCollectionItems(collection) {
            this.store.selectedCollection = collection
            this.$router.push('/items')
        },
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
                    this.store.stocker.collections = this.store.stocker.collections.filter(e => {
                        return e.record.id != collectionId
                    })
                    alert('Meshe l7al')

                }).catch(err => {
                    console.log(err);
                    alert('weak network')
                    this.spinner = false
                })
            }
        }
    }
}
</script>