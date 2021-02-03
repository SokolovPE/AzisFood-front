<template>
    <v-chip-group>
        <v-chip
            v-for="cat in cats"
            :key="cat.id"
            class="mr-2"
            color="blue accent-2 white--text"
            @click="selectCategory(cat)"
        >
            <v-avatar left color="grey lighten-5 primary--text">{{
                cat.goodCnt
            }}</v-avatar>
            {{ cat.title }}</v-chip
        >
    </v-chip-group>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    methods: {
        ...mapActions('adminCatalog', [
            'addCat',
            'selectCat',
            'clearEditsInProgress',
            'removeCatById',
            'fetchCats',
            'fetchGoodsInCurrentCat'
        ]),
        selectCategory(category) {
            if (this.editsInProgress && this.editsInProgress.length > 0) {
                // var vm = this;
                // this.showModal(
                //     'Do you really want to change category? You will loose all unsaved changes!'
                // ).then(answer => {
                //     if (answer) {
                //         vm.clearEditsInProgress();
                //         vm.selectCat(category);
                //     }
                // });
            } else {
                this.selectCat(category);
            }
        }
    },
    computed: {
        ...mapGetters('adminCatalog', {
            cats: 'getCategories',
            currentCat: 'getCurrentCategory'
        }),
        isMobile() {
            return this.$mq === 'mobile' || this.$mq === 'tablet';
        }
    },
    mounted() {
        this.fetchCats().then(() => {
            this.fetchGoodsInCurrentCat();
        });
    }
};
</script>

<style lang="scss" scoped></style>
