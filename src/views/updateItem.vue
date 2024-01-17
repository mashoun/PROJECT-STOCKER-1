<template>
    <spinner v-if="spinner">Updating Item</spinner>

    <section class="container">
        <div class="row g-4">
            <div class="col-12">
                <pagination :collection="getCollectionById($route.params.collectionId).record" :item="selectedItem"></pagination>
            </div>
            <div class="col-12">
                <aside class="d-flex flex-column gap-2">

                    <div v-for="node in tagStack" :key="node">
                        <div v-if="updateItem[node.name] != ''" @dblclick="updateItem[node.name] = ''"
                            class="p-2 d-flex align-items-center gap-2 border border-2 rounded bg-light text-secondary">
                            <span class="material-symbols-outlined text-secondary">label</span>
                            <span class="fw-bold text-uppercase">{{ node.name }}</span>
                            <span>{{ updateItem[node.name] }}</span>
                        </div>
                    </div>

                    <div class="input-group">
                        <select v-model="nextTag" class="form-select">
                            <option v-for="node in allTags" :key="node" :value="node">{{ node.name }}</option>
                            <option :value="{name:'name',value:''}">name</option>
                            <option :value="{name:'quantity',value:''}">quantity</option>
                            <option :value="{name:'unitPrice',value:''}">unitPrice</option>
                        </select>
                        <select v-show="nextTag.value != ''" v-model="updateItem[nextTag.name]" @change="insertNewTag"
                            class="form-select">
                            <option v-for="node in nextTag.value.split(',')" :value="node">{{ node }}</option>
                            <option value="">NONE</option>
                            <option value="NULL">REMOVE</option>
                        </select>
                        <input v-show="nextTag.value == ''" v-model="updateItem[nextTag.name]" @keydown="insertNewTag"
                            type="text" class="form-control" placeholder="add new tag">
                    </div>
                </aside>
            </div>
            
            <div class="col-12 col-lg-4">
                <button @click="saveUpdatedItem" :disabled="tagStack.length == 0" class="btn btn-sm btn-success my-3">Save & Update</button>
                <router-link to="/"><button class="btn btn-sm btn-outline-secondary ms-1">back</button></router-link>
            </div>
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
import pagination from "@/components/pagination.vue";
export default {

    setup() {
        const store = useStore();
        return { store };
    },
    data() {
        return {
            utilities,
            spinner: false,
            collectionId: this.$route.params.collectionId,
            itemId: this.$route.params.itemId,
            updateItem: {
                name: '',
                unitPrice: '',
                quantity: '',
                image: '',
            },
            nextTag: {
                name: '',
                id: '',
                value: '',
                newValue: ''
            },
            tagStack: []
        }
    },
    components: { spinner, pagination },
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
        },
        
        selectedCollection() {
            return this.store.stocker.collections.filter(coll => {
                return coll.record.id == this.$route.params.collectionId
            })[0]
        },
        
        allTags() {
            return this.store.stocker.tags.filter(e => {
                return e.name != 'image'
            })
        }
    },
    methods: {

        insertNewTag() {
            var tagExist = false

            this.tagStack.forEach(tag => {
                if (tag.name == this.nextTag.name) {
                    // update
                    tag = this.nextTag
                    tagExist = true
                }
            })

            if (!tagExist) this.tagStack.push(this.nextTag)

        },
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
                        collectionId: this.$route.params.collectionId,
                        itemId: this.$route.params.itemId,
                        updateItem: utilities.removeEmptyStringProperties(this.updateItem)
                    })
                }).then(res => res.json()).then(res => {
                    console.log(res);
                    this.spinner = false
                    if (res.status == true) {
                        // update statically
                        this.store.stocker.collections.forEach(coll => {
                            if (coll.record.id == this.$route.params.collectionId) {

                                coll.items.forEach(item => {
                                    if (item.id == this.$route.params.itemId) {
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
  