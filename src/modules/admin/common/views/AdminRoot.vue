<template>
    <div>
        <v-navigation-drawer v-model="drawer" app>
            <v-sheet color="grey lighten-4" class="pt-4 pl-4 pr-4">
                <v-avatar class="mb-4" color="grey darken-1" size="64"
                    >SP</v-avatar
                >
                <div>{{ user.email }}</div>
            </v-sheet>
            <v-divider></v-divider
            ><v-list>
                <v-list-item link>
                    <v-list-item-icon>
                        <v-icon>mdi-home</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>Home</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <router-view />
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    data: () => ({
        drawer: null,
        profilePic: require('@/assets/defaultProfile.png')
    }),
    computed: {
        ...mapGetters('auth', ['user'])
    }
};
</script>

<style lang="scss" scoped></style>
