<template>
    <v-app-bar color="primary" app>
        <v-app-bar-nav-icon color="white"></v-app-bar-nav-icon>
        <v-toolbar-title>
            <router-link
                :to="{ name: 'home' }"
                tag="a"
                class="nav-brand"
                active-class="active"
                aria-label="AzisFood"
                exact
                ><img src="@/assets/brand/logo.png" style="40px"
            /></router-link>
        </v-toolbar-title>
        <v-container class="py-0 ml-0 fill-height">
            <router-link to="/admin" tag="a" active-class="active" exact
                ><v-btn text color="white">Admin</v-btn></router-link
            >
            <router-link
                :to="{ name: 'assortmentEdit' }"
                tag="a"
                active-class="active"
                exact
                ><v-btn text color="white">Assortment</v-btn></router-link
            >
            <router-link to="/catalog" tag="a" active-class="active" exact
                ><v-btn text color="white">Catalog</v-btn></router-link
            >
            <router-link
                to="/profile"
                tag="a"
                class="nav-item"
                active-class="active"
                exact
                ><v-btn text color="white">Profile</v-btn></router-link
            >
            <v-spacer></v-spacer>
            <v-responsive max-width="260">
                <v-text-field
                    dense
                    flat
                    hide-details
                    rounded
                    solo-inverted
                ></v-text-field>
            </v-responsive>
        </v-container>
    </v-app-bar>
</template>

<script>
export default {
    methods: {
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
