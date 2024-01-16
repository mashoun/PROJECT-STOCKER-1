<template>
        <section style="width: 100vw; height: 100vh !important;"
        class="position-fixed z-3 top-0 start-0 bg-glass d-flex justify-content-center align-items-center">

        <div class="p-3 d-flex flex-column justify-content-center align-items-center gap-3">
            <h3 class="font-stocker text-stocker-dark-blue fs-3"><slot></slot></h3>
            <span class="spinner-grow spinner-grow-sm"></span>
        </div>
    </section>
</template>
<script>
export default {
    
}
</script>