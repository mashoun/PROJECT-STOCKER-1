<template>
    <header
        class="w-100 position-fixed top-0 left-0 z-2 py-2 px-3 bg-light shadow-sm border d-flex justify-content-between align-items-center">
        <section class="d-flex align-items-center gap-2">
            <router-link to="/">
                <h5 class="mb-0">
                    <span class="font-stocker text-stocker-dark-blue fs-3">STOCKER</span>
                </h5>
            </router-link>
        </section>
        <section class="d-flex align-items-center gap-3">
            <!-- <i class="bi bi-person-circle fs-4 text-secondary" role="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasMenu" aria-controls="offcanvasMenu"></i> -->
            <span class="material-symbols-outlined fs-3 text-secondary" role="button" data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasMenu" aria-controls="offcanvasMenu">account_circle</span>
        </section>
        <aside class="offcanvas offcanvas-end" style="width: 300px;" tabindex="-1" id="offcanvasMenu"
            aria-labelledby="offcanvasMenuLabel">
            <div class="border d-flex p-2 justify-content-between align-items-center">

                <!-- <div class="d-flex gap-2 align-items-center">
                    <img src="https://lh3.googleusercontent.com/d/1JqawYUJRvuimXmSMSf8pX9fTnHufDQ9N" alt="wallpaper" class="object-fit-cover rounded-circle" width="40" height="40">
                    <h5 class="font-stocker text-primary m-0">JABAKHANJI STORE</h5>
                </div> -->
                <span class="font-stocker fs-5">Stocker</span>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="p-2 d-flex flex-column gap-2">
                <div class="ratio ratio-16x9"><img src="https://lh3.googleusercontent.com/d/1JqawYUJRvuimXmSMSf8pX9fTnHufDQ9N" alt="wallpaper" class="object-fit-cover rounded"></div>
                
                <span class="mt-2 px-2 bg-info text-light fs-x-small rounded text-uppercase ls-1 fw-bold" style="width: fit-content;">
                    <span>Premium v-{{ store.version }}</span>
                </span>
                <h5 class="pop d-flex align-items-center gap-1 mb-3"><span>Jabakhanji Stock</span> <span class="material-symbols-outlined text-info">verified</span></h5>
                
                <router-link :to="{name:'home'}" data-bs-dismiss="offcanvas" aria-label="Close" class="p-2 border rounded text-uppercase fw-bold pop ls-1"><span>Collections</span></router-link>
                <router-link :to="{name:'invoice'}" class="p-2 border rounded text-uppercase fw-bold pop ls-1"><span>Invoice</span></router-link>
                <!-- <span class="p-2 border rounded text-uppercase fw-bold pop ls-1"><span>Analytics</span></span> -->
            </div>
        </aside>
    </header>
</template>

<script>
import { useStore } from "../stores/mainStore";
export default {

    setup() {
        const store = useStore();
        return { store };
    },
}
</script>