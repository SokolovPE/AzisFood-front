<template>
    <div>
        <!-- Remove this when component will really be used!!! -->
        <div class="fake-splitter"></div>
        <div class="row" id="assort-edit-wrapper">
            <div class="col col-12 col-md-12 col-sm-12 col-lg-2">
                <div class="form-group" v-if="isMobile">
                    <h5 for="catSelector" class="pull-left">Category</h5>
                </div>
                <form id="new-cat" @submit.prevent="pushCat">
                    <div class="input-group">
                        <input
                            type="text"
                            class="form-control bc-primary"
                            aria-label="Title of new category."
                            placeholder="Some title"
                            v-model="newCatTitle"
                        />
                        <div class="input-group-append">
                            <button
                                type="submit"
                                class="btn btn-outline-primary"
                            >
                                Add New
                            </button>
                        </div>
                    </div>
                </form>
                <div class="form-group" v-if="isMobile">
                    <b-form-select
                        v-model="currentCat"
                        class="bc-primary"
                        id="catSelector"
                    >
                        <b-form-select-option
                            v-for="cat in cats"
                            :key="cat.id"
                            :value="cat"
                            >{{ cat.title }}</b-form-select-option
                        >
                    </b-form-select>
                </div>
                <div id="cats" class="list-group" v-else>
                    <button
                        type="button"
                        class="list-group-item d-flex justify-content-between align-items-center list-group-item-action"
                        v-for="cat in cats"
                        :key="cat.id"
                        :class="{ active: cat.id == currentCat.id }"
                        @click="selectCat(cat)"
                    >
                        {{ cat.title }}
                        <span
                            class="badge badge-primary badge-pill"
                            :class="{
                                'badge-secondary': cat.id == currentCat.id
                            }"
                            >{{ goodCntInCat(cat.id) }}</span
                        >
                    </button>
                </div>
            </div>
            <div class="col col-12 col-md-12 col-sm-12 col-lg-10">
                <div class="row" :class="{ 'justify-center': isMobile }">
                    <add-good-card :category="currentCat" />
                    <good-card
                        v-for="good in goodsInCurretCat"
                        :key="good.id"
                        :good="good"
                        :category="null"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import GoodCard from '@/components/goods/GoodCard.vue';
import AddGoodCard from '@/components/goods/AddGoodCard.vue';

export default {
    data() {
        return {
            newCatTitle: '',
            currentCat: {
                id: 0,
                title: ''
            }
        };
    },
    computed: {
        ...mapGetters('goods', {
            cats: 'getCategories',
            goods: 'getGoods',
            goodCntInCat: 'getGoodCntInCategory'
        }),
        goodsInCurretCat() {
            return (
                this.goods.filter(
                    good => good.categoryId == this.currentCat.id
                ) || []
            );
        },
        isMobile() {
            return this.$mq === 'mobile' || this.$mq === 'tablet';
        }
    },
    methods: {
        ...mapActions('goods', [
            'fetchCats',
            'setCats',
            'addCat',
            'updateCat',
            'removeCat',
            'fetchGoods',
            'setGoods'
        ]),
        pushCat() {
            this.addCat(this.newCatTitle).then(() => {
                this.newCatTitle = '';
            });
        },
        selectCat(cat) {
            this.currentCat = cat;
        }
    },
    components: {
        'good-card': GoodCard,
        'add-good-card': AddGoodCard
    },
    mounted() {
        this.fetchCats().then(() => {
            this.fetchGoods().then(() => {
                this.currentCat = this.cats[0] || null;
            });
        });
    }
};
</script>

<style lang="scss" scoped>
#assort-edit-wrapper {
    margin-right: 0;
    margin-left: 0;
}
#new-cat {
    margin-bottom: 0.8rem;
}

.fake-splitter {
    height: 2rem;
}
</style>
