<template>
    <v-app-bar color="indigo" app>
        <v-app-bar-nav-icon
            color="white"
            @click="toggleDrawer"
        ></v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        <span class="pr-2 white--text">Search</span>
        <v-responsive :max-width="$vuetify.breakpoint.xs ? 150 : 260">
            <v-text-field
                dense
                flat
                hide-details
                rounded
                solo-inverted
            ></v-text-field>
        </v-responsive>
        <v-badge
            bordered
            bottom
            color="success"
            dot
            offset-x="10"
            offset-y="10"
            class="pl-2"
        >
            <v-avatar color="primary" size="40"
                ><img
                    v-if="true"
                    alt="Avatar"
                    src="@/assets/defaultProfile.png"/><v-icon
                    v-else
                    color="secondary"
                    v-text="`ZZ`"
                ></v-icon
            ></v-avatar>
        </v-badge>
    </v-app-bar>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    methods: {
        ...mapActions('ui', ['toggleDrawer']),
        goToAssortment() {
            this.$router.push({ name: 'assortmentEdit' });
        }
    }
};
</script>

<style lang="scss" scoped>
.nav-brand img {
    height: 30px;
}
</style>
