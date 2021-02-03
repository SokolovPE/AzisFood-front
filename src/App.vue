<template>
    <v-app id="app">
        <nav-bar />
        <nav-drawer />
        <v-main class="ma-8">
            <router-view />
        </v-main>
    </v-app>
</template>

<script>
import Navbar from '@/modules/common/components/Navbar.vue';
import NavDrawer from '@/modules/common/components/NavDrawer.vue';
export default {
    name: 'App',
    components: {
        'nav-bar': Navbar,
        'nav-drawer': NavDrawer
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
