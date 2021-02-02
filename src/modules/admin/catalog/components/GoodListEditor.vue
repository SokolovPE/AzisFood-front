<template>
    <div class="row" :class="{ 'justify-center': isMobile }">
        <cat-chips />
        <good-grid :goods="goodsInCurretCat" />
        <!-- <good-card :category="currentCatCountless" :forCreate="true" />
        <good-card
            v-for="good in goodsInCurretCat"
            :key="good.id"
            :valGood="good"
        /> -->
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
//import GoodCard from '@/modules/admin/catalog/components/EditableGoodCard.vue';
import GoodGrid from '@/modules/admin/catalog/components/GoodGrid.vue';
import CategoryChips from '@/modules/admin/catalog/components/CategoryChips.vue';
export default {
    computed: {
        ...mapGetters('adminCatalog', {
            goods: 'getGoodsInCurrentCat',
            currentCat: 'getCurrentCategory',
            currentCatCountless: 'getCurrentCategoryWithoutCnt',
            editsInProgress: 'getEditsInProgress'
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
        //'good-card': GoodCard,
        'good-grid': GoodGrid,
        'cat-chips': CategoryChips
    }
};
</script>

<style lang="sass" scoped></style>
