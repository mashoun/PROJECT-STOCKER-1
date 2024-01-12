<template>
    <section v-if="spinner" style="width: 100vw; height: 100vh !important;"
        class="position-fixed z-3 top-0 start-0 bg-glass d-flex justify-content-center align-items-center">

        <div class="p-3 d-flex flex-column justify-content-center align-items-center gap-3">
            <h3 class="font-stocker text-stocker-dark-blue fs-3">updating item</h3>
            <span class="spinner-grow spinner-grow-sm"></span>
        </div>
    </section>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="d-flex flex-column gap-2">
                    <h5>Updating {{ store.selectedCollection.record.name }} > {{ store.selectedItem.name }}</h5>
                    <div @click="uploadImage" role="button"
                        class="form-control rounded w-100 border d-flex justify-content-between align-items-center">
                        <span>upload item image</span>
                        <span class="material-symbols-outlined text-secondary fs-4">image</span>
                    </div>
                    <input v-model="updateItem.name" class="form-control" type="text" placeholder="item name">
                    <input v-model="updateItem.quantity" class="form-control" type="number" placeholder="item quantity">
                    <input v-model="updateItem.unitPrice" class="form-control" type="number" placeholder="item unit price">
                    <hr>
                    <div class="d-flex flex-column gap-2" v-for="tag in getSelectTags" :key="tag.id">
                        <strong class="fs-small pop ps-2 text-secondary">{{ tag.name }}</strong>
                        <select v-model="updateItem[tag.name]" class="form-select">
                            <option v-for="node in tag.value.split(',')" :value="node">{{ node }}</option>
                            <option value="">NONE</option>
                        </select>
                    </div>
                    <hr>
                    <div class="d-flex flex-column gap-2" v-for="tag in getInputTags" :key="tag.id">
                        <input v-model="updateItem[tag.name]" class="form-control" type="text"
                            :placeholder="'enter ' + tag.name">
                    </div>

                </div>
                <!-- <button @click="updateItem" class="btn btn-sm btn-primary my-3">update item</button> -->

                <button :disabled="spinner" @click="saveUpdatedItem" class="btn btn-primary btn-sm my-3">
                    <span v-if="spinner" class="spinner-grow spinner-grow-sm"></span>
                    <span v-else>update item</span>
                </button>
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
            itemId: '',
            updateItem: {
                name: '',
                unitPrice: '',
                quantity: '',
                image: '',
            }
        }
    },
    computed: {
        getInputTags() {
            return this.store.stocker.tags.filter(e => {
                return e.name != 'image' && e.value == ''
            })
        },
        getSelectTags() {
            return this.store.stocker.tags.filter(e => {
                return e.name != 'image' && e.value != '' && e.value.includes(',')
            })
        },
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
                this.updateItem.image = files64
            }
        },
        saveUpdatedItem() {
            if (confirm('M2akad ??')) {
                this.spinner = true
                fetch(this.store.getApi('?updateItem=1'), {
                    method: "POST",
                    headers: {
                        "Content-Type": "text/plain"
                    },
                    body: JSON.stringify({
                        username: this.store.username,
                        password: this.store.password,
                        collectionId: this.store.selectedCollection.record.id,
                        itemId: this.store.selectedItem.id,
                        updateItem: utilities.removeEmptyStringProperties(this.updateItem)
                    })
                }).then(res => res.json()).then(res => {
                    console.log(res);
                    this.spinner = false
                    if(res.status == true){
                        // update statically
                        this.store.stocker.collections.forEach(coll => {
                            if (coll.record.id == this.store.selectedCollection.record.id) {

                                coll.items.forEach(item => {
                                    if(item.id == this.store.selectedItem.id ){
                                        var object = utilities.removeEmptyStringProperties(this.updateItem)
                                        for (const key in object) {
                                            item[key] = object[key]
                                        }
                                    }
                                })

                            }
                        })
                        alert('Meshe l7al')
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
  