<template>
    <div id="app">
        <nav-bar />
        <router-view></router-view>
    </div>
</template>

<script>
import Navbar from '@/components/UI/Navbar.vue';

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
