<template>
    
    <section v-if="spinner" style="width: 100vw; height: 100vh !important;"
        class="position-fixed z-3 top-0 start-0 bg-glass d-flex justify-content-center align-items-center">

        <div class="p-3 d-flex flex-column justify-content-center align-items-center gap-3">
            <h3 class="font-stocker text-stocker-dark-blue fs-3">removing item</h3>
            <span class="spinner-grow spinner-grow-sm"></span>
        </div>
    </section>
    <aside class="w-100 p-3 bg-light shadow-sm rounded d-flex flex-column">
        <section class="d-flex justify-content-between align-items-center" type="button" data-bs-toggle="modal"
            :data-bs-target="'#itemTagsModal-' + data.id">
            <div class="d-flex align-items-center gap-2">
                <strong class="text-primary">{{ data.name }}</strong>
            </div>
            <span class="material-symbols-outlined">unfold_more</span>
        </section>
        <!-- Modal -->
        <section class="modal modal-lg fade" :id="'itemTagsModal-' + data.id">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5">{{ data.name }}</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <aside class="table-responsive">
                            <table class="table table-hover">
                                <tbody>
                                    <tr v-for="(value, key) in data">
                                        <td :class="[{ 'fw-bold text-primary': key == 'unitPrice' }, { 'fw-bold text-danger': key == 'quantity' && value <= 0 }]"
                                            v-if="value != '' && (key != 'id' && key != 'index' && key != 'image' && key != 'timestamp')">
                                            {{ key }}</td>
                                        <td :class="[{ 'fw-bold text-primary': key == 'unitPrice' }, { 'fw-bold text-danger': key == 'quantity' && value <= 0 }]"
                                            v-if="value != '' && (key != 'id' && key != 'index' && key != 'image') && key != 'timestamp'">
                                            {{ value }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </aside>
                    </div>
                    <div class="modal-footer">
                        <!-- <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button> -->
                        <button type="button" data-bs-dismiss="modal" :disabled="spinner" class="btn btn-sm btn-outline-danger" @click="removeItem">
                            <span v-if="spinner" class="spinner-grow spinner-grow-sm"></span>
                            <span v-else>Remove</span>
                        </button>
                        <!-- <button class="btn btn-success" @click="addToInvoice">Add to invoice</button> -->
                        <button type="button" :disabled="spinner" class="btn btn-sm btn-primary" data-bs-dismiss="modal"
                            @click="updateItem">Update
                            item</button>
                    </div>
                </div>
            </div>
        </section>

    </aside>
</template>
<script>
import { useStore } from "../stores/mainStore";
export default {
    setup() {
        const store = useStore();
        return { store };
    },
    props: ['data'],
    data() {
        return {
            spinner: false
        }
    },
    methods: {

        getCollectionById(collectionId) {
            return this.store.stocker.collections.filter(coll => {
                return coll.record.id == collectionId
            })
        },
        isValidRecord(key, value) {
            if (value != '') {

            }
        },
        updateItem() {
            this.store.selectedItem = this.data
            this.$router.push('/update-item')
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
                        collectionId: this.store.selectedCollection.record.id,
                        itemId: this.data.id

                    })
                }).then(res => res.json()).then(res => {
                    console.log(res);
                    this.spinner = false
                    if (res.status == true) {

                        // this.getCollectionById(this.store.selectedCollection.record.id).items = this.getCollectionById(this.store.selectedCollection.record.id).items.filter(item => {
                        //     return item.id != this.data.id
                        // })

                        this.store.stocker.collections.forEach(coll => {
                            if (coll.record.id == this.store.selectedCollection.record.id) {

                                coll.items = coll.items.filter(item => {
                                    return item.id != this.data.id
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
        },
        addToInvoice() {
            if (parseInt(this.data.quantity) > 0) {

                this.store.invoice.push({

                    collectionId: this.store.selectedCollection.record.id,
                    itemId: this.data.id,
                    quantity: '1'
                })

                alert('Meshe l7al')
            } else alert('Not enough quantity')
        }
    }
}
</script>