<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png" />
        <edit-cats></edit-cats>
    </div>
</template>

<script>
import CategoriesEdit from '@/components/admin/categories/CategoriesEdit.vue';

export default {
    name: 'App',
    components: {
        'edit-cats': CategoriesEdit
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
    margin-top: 60px;
}
</style>
