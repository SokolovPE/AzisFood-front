<template>
    <v-app id="app">
        <nav-bar />
        <v-main class="ma-8">
            <router-view />
        </v-main>
    </v-app>
</template>

<script>
import Navbar from '@/modules/common/components/Navbar.vue';
export default {
    name: 'App',
    components: {
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
    .bc-primary {
        border-color: var(--primary);
    }
    .justify-center {
        justify-content: center;
    }
}
</style>
