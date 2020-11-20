<template>
    <div id="app">
        <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
        <nav-bar />
        <edit-cats />
    </div>
</template>

<script>
import CategoriesEdit from '@/components/admin/categories/CategoriesEdit.vue';
import Navbar from '@/components/UI/Navbar.vue';

export default {
    name: 'App',
    components: {
        'edit-cats': CategoriesEdit,
        'nav-bar': Navbar
    }
};
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
