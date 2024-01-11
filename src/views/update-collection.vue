<template>
    <section v-if="spinner" style="width: 100vw; height: 100vh !important;"
        class="position-fixed z-3 top-0 start-0 bg-glass d-flex justify-content-center align-items-center">

        <div class="p-3 d-flex flex-column justify-content-center align-items-center gap-3">
            <h3 class="font-stocker text-stocker-dark-blue fs-3">Updating collection</h3>
            <span class="spinner-grow spinner-grow-sm"></span>
        </div>
    </section>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <span class="fs-small ps-1">select a collection*</span>
                <div class="d-flex flex-column gap-2">
                    <select v-model="collectionId" class="form-select">
                        <option v-for="node in store.stocker.collections" :key="node.record.id" :value="node.record">{{
                            node.record.name }}</option>
                    </select>
                </div>
                <hr>
                <div class="d-flex flex-column gap-2">

                    <img v-if="updateCollection.images" @dblclick="updateCollection.images = ''"
                        :src="updateCollection.images[0].src64" :alt="updateCollection.images[0].src64" width="60"
                        height="60" class="rounded object-fit-contain">
                    <div v-else @click="uploadImage"
                        class="form-control rounded w-100 border d-flex justify-content-start align-items-center">
                        <span class="text-secondary">upload image ( dbl click on img to reset )</span>
                    </div>

                    <input v-model="updateCollection.name" class="form-control" type="text" placeholder="collection name">
                    <!-- <textarea v-model="updateCollection.description" class="form-control"
                        placeholder="collection description" cols="30" rows="7"></textarea> -->

                </div>
                <button v-if="spinner" class="btn btn-sm btn-primary my-3" style="width: 124.53px;">
                    <div class="spinner-grow spinner-grow-sm"></div>
                </button>
                <button v-else class="btn btn-sm btn-primary my-3" @click="addCollection">update collection</button>
                <router-link to="/"><button class="btn btn-sm btn-outline-secondary ms-1">back</button></router-link>
            </div>

        </div>
    </div>
</template>
  
<script>
import { useStore } from "../stores/mainStore";
import utilities from "@/utilities.js";
export default {

    setup() {
        const store = useStore();
        return { store };
    },
    data() {
        return {
            utilities,
            spinner: false,
            collectionId: '',
            updateCollection: {
            }
        }
    },
    methods: {

        async uploadImage() {
            var files = await utilities.openFiles()
            if (files) {
                // some image was selected
                var files64 = [];// turn to b64
                for (let i = 0; i < files.length; i++) {
                    files64.push({
                        alt: `stocker-${utilities.getCurrentDate()}`,
                        // src64: await utilities.file64(files[i])
                        src64: await utilities.optimizeImageQuality(await utilities.file64(files[i]), 0.7)
                    })
                }

                // console.log(files64);
                this.updateCollection.images = files64
            }
        },

        addCollection() {
            if (confirm('M2akad ??')) {
                this.spinner = true
                fetch(this.store.getApi('?updateCollection=1'), {
                    method: "POST",
                    headers: {
                        "Content-Type": "text/plain"
                    },
                    body: JSON.stringify({
                        username: this.store.username,
                        password: this.store.password,
                        collectionId: this.collectionId.id,
                        updateCollection: utilities.removeEmptyStringProperties(this.updateCollection)
                    })
                }).then(res => res.json()).then(res => {
                    console.log(res);
                    this.spinner = false
                    if (res.status == true) {
                        // update statically the new collection

                        alert('Meshe l7al ya 5aye')
                    } else alert(res.data)
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
  