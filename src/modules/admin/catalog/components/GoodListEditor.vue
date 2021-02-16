<template>
    <v-container>
        <v-row>
            <!-- <v-col cols="12" sm="4">
                <good-grid :goods="goodsInCurretCat" />
            </v-col>
            <v-col  cols="12" sm="8">
                <good-grid :goods="goodsInCurretCat" />
            </v-col> -->
            <good-grid :goods="goodsInCurretCat" />
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import GoodGrid from '@/modules/admin/catalog/components/GoodGrid.vue';
export default {
    computed: {
        ...mapGetters('adminCatalog', {
            goods: 'getGoodsInCurrentCat',
            currentCat: 'getCurrentCategory',
            currentCatCountless: 'getCurrentCategoryWithoutCnt'
        }),
        goodsInCurretCat() {
            return (
                this.goods.filter(
                    good => good.category.id == this.currentCat.id
                ) || []
            );
        },
        isMobile() {
            return this.$mq === 'mobile' || this.$mq === 'tablet';
        }
    },
    components: {
        'good-grid': GoodGrid
    }
};
</script>

<style lang="sass" scoped></style>
