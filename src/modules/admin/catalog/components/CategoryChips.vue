<template>
    <v-container class="py-0 mb-2 fill-height">
        <div>
            <v-chip
                v-for="cat in cats"
                :key="cat.id"
                class="mr-2"
                color="primary"
                @click="selectCategory(cat)"
            >
                <v-avatar left color="grey lighten-5 primary--text">{{
                    cat.goodCnt
                }}</v-avatar>
                {{ cat.title }}</v-chip
            >
        </div>
        <v-spacer></v-spacer>
        <div>
            <v-btn rounded color="primary" dark
                ><v-icon left> mdi-pencil </v-icon>Add category</v-btn
            >
            <v-btn rounded color="primary" dark
                ><v-icon left> mdi-plus </v-icon>Add good</v-btn
            >
        </div>
    </v-container>
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
