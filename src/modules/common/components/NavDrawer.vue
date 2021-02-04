<template>
    <v-navigation-drawer class="nav-drawer" v-model="drawerState" dark app>
        <div class="nav-brand pt-6 pb-3">
            <router-link
                :to="{ name: 'home' }"
                tag="a"
                active-class="active"
                aria-label="AzisFood"
                exact
                style="display: flex"
            >
                <v-img src="@/assets/brand/logo.png" height="60" contain />
            </router-link>
        </div>
        <v-divider />
        <v-list>
            <!-- <v-subheader class="mb-0">Navigation</v-subheader> -->
            <v-list-item-group>
                <v-list-item :to="{ name: 'home' }" exact link>
                    <v-list-item-icon>
                        <v-icon>mdi-home</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>Home</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item to="/admin" exact link>
                    <v-list-item-icon>
                        <v-icon>mdi-shield-check</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>Admin</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item :to="{ name: 'assortmentEdit' }" exact link>
                    <v-list-item-icon>
                        <v-icon>mdi-cart-variant</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>Assortment</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
            <v-list-group :value="true" prepend-icon="mdi-account-tie">
                <template v-slot:activator>
                    <v-list-item-title>Management</v-list-item-title>
                </template>
                <v-list-item link>
                    <v-list-item-icon>
                        <v-icon>mdi-account-circle</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Users</v-list-item-title>
                </v-list-item>
                <v-list-item to="/profile" exact link>
                    <v-list-item-icon>
                        <v-icon>mdi-card-account-details</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Profile</v-list-item-title>
                </v-list-item>
            </v-list-group>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    computed: {
        ...mapGetters('ui', ['getDrawerState']),
        drawerState: {
            get: function() {
                return this.getDrawerState;
            },
            set: function(newValue) {
                this.setDrawerState(newValue);
            }
        }
    },
    methods: {
        ...mapActions('ui', ['setDrawerState'])
    }
};
</script>

<style lang="scss" scoped>
.nav-drawer {
    text-align: start;
}
.nav-drawer-user-info {
    color: #ffffff;
    font-weight: 600;
}
</style>
