<template>
    <div class="container">
        <header class="jumbotron">
            <h3>
                <strong>{{ user.email }}</strong> Profile
            </h3>
        </header>
        <p>
            <strong>Token:</strong>
            {{ user.accessToken.substring(0, 20) }} ...
            {{ user.accessToken.substr(user.accessToken.length - 20) }}
        </p>
        <p>
            <strong>Id:</strong>
            {{ user.id }}
        </p>
        <p>
            <strong>Email:</strong>
            {{ user.email }}
        </p>
        <strong>Authorities:</strong>
        <ul>
            <li v-for="(role, index) in user.roles" :key="index">
                {{ role }}
            </li>
        </ul>
        <button class="btn btn-primary" @click.prevent="performLogout">
            Logout
        </button>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    name: 'Profile',
    computed: {
        ...mapGetters('auth', ['user'])
    },
    mounted() {
        if (!this.user) {
            this.$router.push('/login');
        }
    },
    methods: {
        ...mapActions('auth', ['logout']),
        performLogout() {
            this.logout();
            this.$router.push('/login');
        }
    }
};
</script>
