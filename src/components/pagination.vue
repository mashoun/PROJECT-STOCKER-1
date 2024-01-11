<template>
    <section class="w-100 p-2 d-flex align-items-center pop fs-small">
        <a href="/"><span class="material-symbols-outlined">grid_view</span></a>
        <span class="material-symbols-outlined">chevron_right</span>
        <a v-if="folder" :href="'/' + folder">{{ folder }}</a>
        <span v-if="folder" class="material-symbols-outlined">chevron_right</span>
        <span>{{ page }}</span>
    </section>
</template>
<script>
export default {
    props: ['folder', 'page']
}
</script>