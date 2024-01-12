<template>
    <header
        class="w-100 position-fixed top-0 left-0 z-2 py-2 px-3 bg-light shadow-sm border d-flex justify-content-between align-items-center">
        <section class="d-flex align-items-center gap-2">
            <router-link to="/">
                <h5 class="mb-0">
                    <span v-show="$route.name != 'items'"  class="font-stocker text-stocker-dark-blue fs-3">STOCKER</span>
                </h5>
            </router-link>
            <div class="d-flex font-arabic">
                <router-link to="/"><span v-show="$route.name == 'items'"  class="material-symbols-outlined">grid_view</span></router-link>
                <span v-show="$route.name == 'items'" class="material-symbols-outlined">chevron_right</span>
                <span v-if="$route.name == 'items'">{{ store.selectedCollection.record.name }}</span>
            </div>
        </section>
        <section class="d-flex align-items-center gap-3">
            <!-- <i class="bi bi-person-circle fs-4 text-secondary" role="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasMenu" aria-controls="offcanvasMenu"></i> -->
            <span class="material-symbols-outlined fs-4 text-dark" role="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasMenu" aria-controls="offcanvasMenu">grid_view</span>
        </section>
        <aside class="offcanvas offcanvas-end" style="width: 300px;" tabindex="-1" id="offcanvasMenu"
            aria-labelledby="offcanvasMenuLabel">
            <div class="offcanvas-header">
                <h5 class="font-stocker ls-1" id="offcanvasMenuLabel">jabakhanji</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body d-flex flex-column gap-2">
                <!-- <router-link to="/invoice"><button class="w-100 btn btn-sm btn-outline-secondary" data-bs-dismiss="offcanvas">my invoice</button></router-link>
                <hr> -->
                <router-link to="/"><button class="w-100 btn btn-sm btn-outline-secondary" data-bs-dismiss="offcanvas">my collections</button></router-link>
                <router-link to="/new-collection"><button class="w-100 btn btn-sm btn-outline-secondary" data-bs-dismiss="offcanvas">add new collection</button></router-link>
                <router-link to="/new-item"><button class="w-100 btn btn-sm btn-primary" data-bs-dismiss="offcanvas">add new item</button></router-link>
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