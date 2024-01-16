<template>
    <section v-if="spinner" style="width: 100vw; height: 100vh !important;"
        class="position-fixed z-3 top-0 start-0 bg-glass d-flex justify-content-center align-items-center">

        <div class="p-3 d-flex flex-column justify-content-center align-items-center gap-3">
            <h3 class="font-stocker text-stocker-dark-blue fs-3">Adding new collection</h3>
            <span class="spinner-grow spinner-grow-sm"></span>
        </div>
    </section>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="d-flex flex-column gap-2">

                    <img v-if="createNewCollection.images" @dblclick="createNewCollection.images = ''"
                        :src="createNewCollection.images[0].src64" :alt="createNewCollection.images[0].src64" width="60"
                        height="60" class="rounded object-fit-contain">
                    <div v-else @click="uploadImage"
                        class="form-control rounded w-100 border d-flex justify-content-start align-items-center">
                        <span class="text-secondary">upload image ( dbl click on img to reset )</span>
                    </div>
                    <input v-model="createNewCollection.name" class="form-control" type="text"
                        placeholder="collection name">
                    <!-- <textarea v-model="createNewCollection.description" class="form-control" placeholder="collection description" cols="30" rows="7"></textarea> -->

                </div>
                <button :disabled="!isValidInput" class="btn btn-sm btn-primary my-3" @click="addCollection">add collection</button>
                <router-link to="/"><button class="btn btn-sm btn-outline-secondary ms-1">back</button></router-link>
            </div>

        </div>
    </div>
</template>
  
<script>
import { useStore } from "@/stores/mainStore";
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
            createNewCollection: {
                name: '',
                // images: '',
                // description: ''
            }
        }
    },
    computed: {
        isValidInput() {
            return this.createNewCollection.name != ''
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
                this.createNewCollection.images = files64
            }
        },

        addCollection() {
            if (confirm('M2akad ??') && this.isValidInput) {
                this.spinner = true
                fetch(this.store.getApi('?createNewCollection=1'), {
                    method: "POST",
                    headers: {
                        "Content-Type": "text/plain"
                    },
                    body: JSON.stringify({
                        username: this.store.username,
                        password: this.store.password,
                        createNewCollection: utilities.removeEmptyStringProperties(this.createNewCollection)
                    })
                }).then(res => res.json()).then(res => {
                    console.log(res);
                    this.spinner = false
                    if (res.status == true) {
                        // update statically the new collection
                        this.createNewCollection.id = res.data.collectionId
                        if (this.createNewCollection.hasOwnProperty('images') && this.createNewCollection.images != '') {
                            this.createNewCollection.thumbnail = this.createNewCollection.images[0].src64
                        } else this.createNewCollection.thumbnail = ''
                        this.store.stocker.collections.push({
                            record: this.createNewCollection,
                            items: []
                        })
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
  