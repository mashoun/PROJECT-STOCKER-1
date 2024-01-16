<template>
    <spinner v-if="spinner">Removing Item</spinner>
    <section class="container">
        <div class="row g-4">
            <div class="col-12">
                <h5 class="pop text-secondary">Item Details</h5>
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
        </div>
        <div class="row g-2 my-2">
            
            <div class="col-12 col-md-4 col-lg-2">
                <router-link :to="{name:'updateItem',params:{collectionId:$route.params.collectionId,itemId:$route.params.itemId}}"><button class="w-100 btn btn-sm btn-success">Update Item</button></router-link>
            </div>
            <div class="col-12 col-md-4 col-lg-2">
                <button class="w-100 btn btn-sm btn-outline-danger" @click="removeItem">Remove Item</button>
            </div>
        </div>
    </section>
</template>
<script>
import { useStore } from "@/stores/mainStore";
import spinner from "@/components/spinner.vue";
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
    computed: {
        selectedItem() {
            return this.getCollectionById(this.$route.params.collectionId).items.filter(item => {
                return item.id == this.$route.params.itemId
            })[0]
        }
    },
    components: { spinner },
    methods: {

        getCollectionById(collectionId) {
            return this.store.stocker.collections.filter(coll => {
                return coll.record.id == collectionId
            })[0]
        },
        isValidRecord(key, value) {
            if (value != '') {

            }
        },
        updateItem() {
            // this.store.selectedItem = this.data
            this.$router.push('/updateItem')
        },
        removeItem() {
            if (confirm('m2akad ?')) {
                this.spinner = true
                fetch(this.store.getApi('?removeItem=1'), {
                    method: "POST",
                    headers: {
                        "Content-Type": "text/plain"
                    },
                    body: JSON.stringify({
                        username: this.store.username,
                        password: this.store.password,
                        collectionId: this.$route.params.collectionId,
                        itemId: this.$route.params.itemId

                    })
                }).then(res => res.json()).then(res => {
                    console.log(res);
                    this.spinner = false
                    if (res.status == true) {

                        // this.getCollectionById(this.$route.params.collectionId).items = this.getCollectionById(this.$route.params.collectionId).items.filter(item => {
                        //     return item.id != this.data.id
                        // })

                        this.store.stocker.collections.forEach(coll => {
                            if (coll.record.id == this.$route.params.collectionId) {

                                coll.items = coll.items.filter(item => {
                                    return item.id != this.$route.params.itemId
                                })

                            }
                        })

                        alert('Meshe l7al')
                        this.$router.replace('/collections/'+this.$route.params.collectionId)

                    } else alert(res.data)

                }).catch(err => {
                    console.log(err);
                    alert('weak network')
                    this.spinner = false
                })
            }
        },
        addToInvoice() {
            if (parseInt(this.data.quantity) > 0) {

                this.store.invoice.push({

                    collectionId: this.$route.params.collectionId,
                    itemId: this.data.id,
                    quantity: '1'
                })

                alert('Meshe l7al')
            } else alert('Not enough quantity')
        }
    }
}
</script>