<template>
    <section v-if="spinner" style="width: 100vw; height: 100vh !important;"
        class="position-fixed z-3 top-0 start-0 bg-glass d-flex justify-content-center align-items-center">

        <div class="p-3 d-flex flex-column justify-content-center align-items-center gap-3">
            <h3 class="font-stocker text-stocker-dark-blue fs-3">Adding new item</h3>
            <span class="spinner-grow spinner-grow-sm"></span>
        </div>
    </section>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="d-flex flex-column gap-2">

                    <div class="d-flex flex-column gap-2">
                        <select v-model="collectionId" class="form-select">
                            <option v-for="node in store.stocker.collections" :key="node.record.id" :value="node.record">{{
                                node.record.name }}</option>
                        </select>
                    </div>
                    <div @click="uploadImage" role="button"
                        class="form-control rounded w-100 border d-flex justify-content-between align-items-center">
                        <span>upload item image</span>
                        <span class="material-symbols-outlined text-secondary fs-4">image</span>
                    </div>
                    <input v-model="createNewItem.name" class="form-control" type="text" placeholder="item name">
                    <input v-model="createNewItem.quantity" class="form-control" type="number" placeholder="item quantity">
                    <input v-model="createNewItem.unitPrice" class="form-control" type="number"
                        placeholder="item unit price">
                    <hr>
                    <div class="d-flex flex-column gap-2" v-for="tag in getSelectTags" :key="tag.id">
                        <strong class="fs-small pop ps-2 text-secondary">{{ tag.name }}</strong>
                        <select v-model="createNewItem[tag.name]" class="form-select">
                            <option v-for="node in tag.value.split(',')" :value="node">{{ node }}</option>
                            <option value="">NONE</option>
                        </select>
                    </div>
                    <hr>
                    <div class="d-flex flex-column gap-2" v-for="tag in getInputTags" :key="tag.id">
                        <input v-model="createNewItem[tag.name]" class="form-control" type="text"
                            :placeholder="'enter ' + tag.name">
                    </div>

                </div>
                <button @click="addItem" class="btn btn-sm btn-primary my-3">add item</button>
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
            createNewItem: {
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
                this.createNewItem.image = files64
            }
        },
        addItem() {
            if (confirm('M2akad ??')) {
                this.spinner = true
                fetch(this.store.getApi('?createNewItem=1'), {
                    method: "POST",
                    headers: {
                        "Content-Type": "text/plain"
                    },
                    body: JSON.stringify({
                        username: this.store.username,
                        password: this.store.password,
                        collectionId: this.collectionId.id,
                        createNewItem: this.createNewItem
                    })
                }).then(res => res.json()).then(res => {
                    console.log(res);
                    this.spinner = false
                    if (res.status == true) {
                        // add statically the new item
                        this.createNewItem.id = res.data.itemId
                        this.store.stocker.collections.forEach(coll => {
                            if (coll.record.id == this.collectionId.id) {
                                coll.items.push(this.createNewItem)
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
  