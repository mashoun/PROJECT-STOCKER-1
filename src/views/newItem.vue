<template>
    <spinner v-if="spinner">Adding new item</spinner>
   
    <section v-if="selectedCollection.record.id != ''" class="container">
        <div class="row g-4">
            <div class="col-12">
                <pagination :collection="selectedCollection.record"></pagination>
            </div>
            <div class="col-12">
                <aside class="d-flex flex-column gap-2">
                    <img v-if="createNewItem.image" @dblclick="createNewItem.image = ''"
                        :src="createNewItem.image[0].src64" :alt="createNewItem.image[0].src64" width="60"
                        height="60" class="rounded object-fit-contain">
                    <div v-else @click="uploadImage"
                        class="form-control rounded w-100 border d-flex justify-content-start align-items-center gap-2">
                        <span class="material-symbols-outlined text-secondary">photo_camera</span>
                        <span class="text-secondary">upload image ( dbl click on img to reset )</span>
                    </div>
                    <input v-model="createNewItem.name" class="form-control" type="text" placeholder="item name*">
                    <input v-model="createNewItem.quantity" class="form-control" type="number" placeholder="item quantity*">
                    <input v-model="createNewItem.unitPrice" class="form-control" type="number"
                        placeholder="item unit price*">

                    <div v-for="node in tagStack" :key="node">
                        <div v-if="createNewItem[node.name] != ''" @dblclick="createNewItem[node.name] = ''"
                            class="p-2 d-flex align-items-center gap-2 border border-2 rounded bg-light text-secondary">
                            <span class="material-symbols-outlined text-secondary">label</span>
                            <span class="fw-bold text-uppercase">{{ node.name }}</span>
                            <span>{{ createNewItem[node.name] }}</span>
                        </div>
                    </div>

                    <div class="input-group" v-show="isValidInput">
                        <select v-model="nextTag" class="form-select">
                            <option v-for="node in allTags" :key="node.id" :value="node">{{ node.name }}</option>
                        </select>
                        <select v-show="nextTag.value != ''" v-model="createNewItem[nextTag.name]" @change="insertNewTag"
                            class="form-select">
                            <option v-for="node in nextTag.value.split(',')" :value="node">{{ node }}</option>
                            <option value="">NONE</option>
                        </select>
                        <input v-show="nextTag.value == ''" v-model="createNewItem[nextTag.name]" @keydown="insertNewTag"
                            type="text" class="form-control" placeholder="add new tag">
                    </div>
                </aside>
            </div>

            <div class="col-12 col-lg-4">
                <button @click="addItem" :disabled="!isValidInput" class="btn btn-sm btn-primary my-3">add item</button>
                <router-link to="/"><button class="btn btn-sm btn-outline-secondary ms-1">back</button></router-link>
            </div>
            
        </div>
    </section>
    <section v-else class="p-5"><h1 class="text-secondary text-center pop">404 Collection Not Found</h1></section>
    
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
    components: { spinner, pagination },
    data() {
        return {
            utilities,
            spinner: false,
            collectionId: this.$route.params.collectionId,
            createNewItem: {
                name: '',
                unitPrice: '',
                quantity: '',
                image: '',
            },
            advancedTags: false,
            nextTag: {
                name: '',
                id: '',
                value: '',
                newValue: ''
            },
            tagStack: []
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
        isValidInput() {
            return this.createNewItem.name.trim() != '' && this.createNewItem.unitPrice != '' && this.createNewItem.quantity != '' && this.collectionId != ''
        },
        allTags() {
            return this.store.stocker.tags.filter(e => {
                return e.name != 'image'
            })
        },
        
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
            if (confirm('M2akad ??') && this.isValidInput) {
                this.spinner = true
                fetch(this.store.getApi('?createNewItem=1'), {
                    method: "POST",
                    headers: {
                        "Content-Type": "text/plain"
                    },
                    body: JSON.stringify({
                        username: this.store.username,
                        password: this.store.password,
                        collectionId: this.collectionId,
                        createNewItem: utilities.removeEmptyStringProperties(this.createNewItem)
                    })
                }).then(res => res.json()).then(res => {
                    console.log(res);
                    this.spinner = false
                    if (res.status == true) {
                        // add statically the new item
                        this.createNewItem.id = res.data.itemId
                        this.store.stocker.collections.forEach(coll => {
                            if (coll.record.id == this.collectionId) {
                                coll.items.push({...this.createNewItem})
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
        },
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

        }
    }
}
</script>
  