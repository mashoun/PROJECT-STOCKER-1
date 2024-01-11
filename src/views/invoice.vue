<template>
    <section class="container">
        <div class="row g-3">
            <div class="col-12">
                <aside class="d-flex flex-column gap-2">
                    <h5>Invoice</h5>
                    <input class="form-control" type="text" placeholder="Client name">
                    <input class="form-control" type="email" placeholder="Client email">
                    <input class="form-control" type="number" placeholder="Client number">
                </aside>
            </div>
            <div class="col-12 py-4">
                <aside class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Description</th>
                                <th scope="col">QTY</th>
                                <th scope="col">Price</th>
                                <th scope="col">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="node in store.invoice" :key="node">
                                <th scope="row" :disabled="spinner" @click="removeItemById(node.itemId)"><i
                                        class="bi bi-trash"></i></th>
                                <td class="fs-small">

                                    {{ getItemById(node.collectionId, node.itemId)[0].name }}
                                    {{ getItemById(node.collectionId, node.itemId)[0].modelType }}
                                    {{ getItemById(node.collectionId, node.itemId)[0].modelBrand }}
                                    {{ getItemById(node.collectionId, node.itemId)[0].modelNumber }}

                                </td>
                                <td style="width: 100px;"><input v-model="node.quantity" type="number" class="form-control">
                                </td>
                                <td>
                                    {{ getItemById(node.collectionId, node.itemId)[0].unitPrice }}
                                    {{ getItemById(node.collectionId, node.itemId)[0].currency }}
                                </td>
                                <td>
                                    {{ parseInt(node.quantity) * parseFloat(getItemById(node.collectionId,
                                        node.itemId)[0].unitPrice) }}
                                    {{ getItemById(node.collectionId, node.itemId)[0].currency }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </aside>
            </div>
            <div class="col-12">
                <button :disabled="spinner" @click="saveInvoice" class="btn btn-primary btn-sm">
                    <span v-if="spinner" class="spinner-grow spinner-grow-sm"></span>
                    <span v-else>Save invoice</span>
                </button>
            </div>
        </div>
    </section>
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
            client: {
                name: '',
                number: '',
                email: ''
            },

        }
    },
    methods: {
        getCollectionById(collectionId) {
            return this.store.stocker.collections.filter(coll => {
                return coll.record.id == collectionId
            })
        },

        getItemById(collectionId, itemId) {
            var items = this.getCollectionById(collectionId)[0].items
            return items.filter(item => {
                return item.id == itemId
            })
        },

        removeItemById(itemId) {
            if (confirm('m2akad ?')) {
                this.store.invoice = this.store.invoice.filter(e => {
                    return e.itemId != itemId
                })
            }
        },

        saveInvoice() {
            if (confirm('M2akad ??')) {
                this.spinner = true
                fetch(this.store.getApi('?createNewInvoice=1'), {
                    method: "POST",
                    headers: {
                        "Content-Type": "text/plain"
                    },
                    body: JSON.stringify({
                        username: this.store.username,
                        password: this.store.password,
                        client: utilities.removeEmptyStringProperties(this.client),
                        items: this.store.invoice
                    })
                }).then(res => res.json()).then(res => {
                    console.log(res);
                    this.spinner = false
                    if (res == true) alert('Meshe l7al')
                }).catch(err => {
                    alert(err)
                })
            }
        }
    },
    mounted() {
        // console.log(this.getItemById(this.getCollectionById("590109738233")[0].items,"533954782800")[0]);
        // console.log(this.getItemById('590109738233', '533954782800')[0]);
    }
}
</script>
  