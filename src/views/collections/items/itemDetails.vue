<template>
    <spinner v-if="spinner">Removing Item</spinner>
    <section v-if="selectedCollection.record.id != '' && selectedItem.id != ''"  class="container">
        <div class="row g-4">
            <div class="col-12">
                <pagination :collection="getCollectionById($route.params.collectionId).record" :item="selectedItem"></pagination>
            </div>
            <div class="col-12 col-md-2"  v-if="selectedItem.image != ''">
                <div class="ratio ratio-1x1">
                    <img :src="typeof(selectedItem.image) == 'string' ? selectedItem.image : selectedItem.image[0].src64  " :alt="selectedItem.name" class="object-fit-cover rounded shadow-sm skeleton">
                </div>
            </div>
            <div class="col-12">
                <aside class="table-responsive">
                    <table class="table table-hover">
                        <tbody>
                            <tr v-for="(value, key) in selectedItem">
                                <td class="text-uppercase fw-bold" :class="[{ 'fw-bold text-primary': key == 'unitPrice' },{ 'fw-bold text-primary': key == 'quantity' }, { 'fw-bold text-danger': key == 'quantity' && value <= 1 },{ 'fw-bold text-primary': key == 'name' }]"
                                    v-if="value != '' && value != 'NULL' && (key != 'id' && key != 'index' && key != 'image' && key != 'timestamp')">
                                    {{ key }}
                                </td>
                                <td class="font-arabic" :class="[{ 'fw-bold text-primary': key == 'unitPrice' },{ 'fw-bold text-primary': key == 'quantity' },{ 'fw-bold': key == 'quantity' }, { 'fw-bold text-danger': key == 'quantity' && value <= 1 },{ 'fw-bold text-primary': key == 'name' }]"
                                    v-if="value != '' && value != 'NULL' && (key != 'id' && key != 'index' && key != 'image') && key != 'timestamp'">
                                    <span v-if="key == 'unitCost'">{{ hideCost ? '***' : value }}</span>
                                    <span v-else >{{ value }}</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </aside>
            </div>
        </div>
        <div class="row g-2 my-2">
            <div class="col-12 col-md-3">
                <aside class="d-flex justify-content-between align-items-center rounded gap-2 bg-primary text-light pop py-2 px-3 dropup">
                    <span class="pop ls-1 fs-6 w-100" @dblclick="addToInvoice">+ Zeda 3al fetora</span>
                    <span role="button" class="material-symbols-outlined fw-bolder fs-4" data-bs-toggle="dropdown" >more_horiz</span>
                    <ul class="dropdown-menu fs-small">
                        <li><router-link class="dropdown-item text-success" :to="{name:'updateItem',params:{collectionId:$route.params.collectionId,itemId:$route.params.itemId}}">Update this item</router-link></li>
                        <li><span @click="hideCost = !hideCost" class="dropdown-item" role="button">Toggle Cost</span></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><span class="dropdown-item text-danger opacity-75" @click="removeItem" role="button">Remove this item</span></li>
                    </ul>
                </aside>
            </div>
        </div>
        
        <aside class="position-fixed bottom-0 end-0 z-1">
            <router-link :to="{ name: 'collectionItems', params: { collectionId: $route.params.collectionId } }">
                <div class="m-4 p-1 bg-secondary d-flex align-items-center rounded"><span class="material-symbols-outlined fs-1 text-light m-0">arrow_back</span></div>
            </router-link>
        </aside>
    </section>
    <section v-else class="p-5">
        <h1 class="text-secondary text-center pop">404 Item Not Found</h1>
    </section>
</template>
<script>
import { useStore } from "@/stores/mainStore";
import spinner from "@/components/spinner.vue";
import pagination from "@/components/pagination.vue";
export default {
    setup() {
        const store = useStore();
        return { store };
    },
    data() {
        return {
            spinner: false,
            hideCost:true
        }
    },
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
        
        selectedItem() {
            var icoll = this.getCollectionById(this.$route.params.collectionId).items.filter(item => {
                return item.id == this.$route.params.itemId
            })
            if (icoll.length == 0) return {
                id: '',
            }
            return icoll[0]
        },
    },
    components: { spinner, pagination },
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
            console.log(parseInt(this.selectedItem.quantity));
            if (parseInt(this.selectedItem.quantity) > 0) {

                this.store.invoices.push({

                    collectionId: this.$route.params.collectionId,
                    itemId: this.$route.params.itemId,
                    quantity: '1'
                })

                alert('Meshe l7al')
            } else alert('Not enough quantity')
        }
    }
}
</script>