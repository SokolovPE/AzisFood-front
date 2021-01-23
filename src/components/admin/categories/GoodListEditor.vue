<template>
    <div class="row" :class="{ 'justify-center': isMobile }">
        <good-card :category="currentCatCountless" :forCreate="true" />
        <good-card
            v-for="good in goodsInCurretCat"
            :key="good.id"
            :valGood="good"
        />
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import GoodCard from '@/components/goods/GoodCard.vue';
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
        'good-card': GoodCard
    }
};
</script>

<style lang="sass" scoped></style>
