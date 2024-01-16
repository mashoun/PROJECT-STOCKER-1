<template>
    <spinner v-if="spinner"></spinner>

    <section class="container">
        <div class="row g-4">
            <div class="col-12">
                <h5 class="pop text-secondary">Update Item Details</h5>
            </div>
            <div class="col-12">
                <aside class="table-responsive">
                    <table class="table table-hover">
                        <tbody>
                            <tr v-for="(value, key) in selectedItem">
                                <td class="text-uppercase fw-bold" :class="[{ 'fw-bold text-primary': key == 'unitPrice' }, { 'fw-bold text-danger': key == 'quantity' && value <= 0 },{ 'fw-bold text-primary': key == 'name' }]"
                                    v-if="value != '' && (key != 'id' && key != 'index' && key != 'image' && key != 'timestamp')">
                                    {{ key }}</td>
                                <td class="font-arabic" :class="[{ 'fw-bold text-primary': key == 'unitPrice' }, { 'fw-bold text-danger': key == 'quantity' && value <= 0 },{ 'fw-bold text-primary': key == 'name' }]"
                                    v-if="value != '' && (key != 'id' && key != 'index' && key != 'image') && key != 'timestamp'">
                                    {{ value }}</td>
                            </tr>
                        </tbody>
                    </table>
                </aside>
            </div>
            <!-- <div class="col-12 col-md-4 col-lg-2">
                <router-link :to="{name:'updateItem',params:{collectionId:$route.params.collectionId,itemId:$route.params.itemId}}"><button class="w-100 btn btn-sm btn-outline-primary">Update Item</button></router-link>
            </div>
            <div class="col-12 col-md-4 col-lg-2">
                <button class="w-100 btn btn-sm btn-outline-danger">Remove Item</button>
            </div> -->
        </div>
    </section>


    <!-- <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="d-flex flex-column gap-2">
                    <h5>Updating in {{ store.selectedCollection.record.name }} > {{ store.selectedItem.name }}</h5>
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

                <button :disabled="spinner" @click="saveUpdatedItem" class="btn btn-primary btn-sm my-3">
                    <span v-if="spinner" class="spinner-grow spinner-grow-sm"></span>
                    <span v-else>update item</span>
                </button>
                <router-link to="/"><button class="btn btn-sm btn-outline-secondary ms-1">back</button></router-link>
            </div>
        </div>
    </div> -->
</template>
  
<script>
import { useStore } from "@/stores/mainStore";
import utilities from "@/utilities.js";
import spinner from "@/components/spinner.vue";
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
    components: { spinner },
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
        selectedItem() {
            return this.getCollectionById(this.$route.params.collectionId).items.filter(item => {
                return item.id == this.$route.params.itemId
            })[0]
        }
    },
    methods: {

        getCollectionById(collectionId) {
            return this.store.stocker.collections.filter(coll => {
                return coll.record.id == collectionId
            })[0]
        },
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
                    if (res.status == true) {
                        // update statically
                        this.store.stocker.collections.forEach(coll => {
                            if (coll.record.id == this.store.selectedCollection.record.id) {

                                coll.items.forEach(item => {
                                    if (item.id == this.store.selectedItem.id) {
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
  