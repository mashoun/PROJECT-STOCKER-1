<template>
    <section style="width: 100vw; height: 100vh !important;"
        class="position-fixed z-3 top-0 start-0 bg-light d-flex justify-content-center align-items-center">
        <section class="container">
            <div class="row justify-content-center">
                <div class="col-12 col-lg-6">
                    <aside class="p-3 rounded shadow-sm d-flex flex-column gap-2 text-center">
                        <h3 class="font-stocker text-stocker-dark-blue fs-3">stocker</h3>
                        <p class="text-small pop text-secondary">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Dolorem, vero.</p>
                        <input v-model="store.username" type="text" placeholder="username" class="form-control mt-3">
                        <input v-model="store.password" type="password" placeholder="password" class="form-control">
                        <button v-if="spinner" class="btn btn-sm btn-primary">
                            <div class="spinner-grow spinner-grow-sm"></div>
                        </button>
                        <button v-else class="btn btn-sm btn-primary" @click="login">login</button>
                        <span class="fs-x-small text-secondary my-3 font-monospace">developed by libancode - version {{ store.version }}</span>
                    </aside>
                </div>
            </div>
        </section>
    </section>
</template>
<script>

import { useStore } from "../stores/mainStore";
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
    methods: {
        login() {
            this.spinner = true
            fetch(this.store.getApi('?getStore=1'), {
                method: "POST",
                headers: {
                    "Content-Type": "text/plain"
                },
                body: JSON.stringify({
                    username: this.store.username,
                    password: this.store.password
                })
            }).then(res => res.json()).then(res => {
                console.log(res);
                this.spinner = false
                if (res.status == true) {
                    this.store.stocker = res.data
                    this.store.isLogedIn = true
                } else alert(res.data)

            }).catch(err => {
                console.log(err);
                alert('weak network')
                this.spinner = false
            })
        }
    }
}

</script>