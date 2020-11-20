<template>
    <div>
        <div class="row">
            <div class="col col-md-3">
                <h1>Categories</h1>
                <form id="new-cat" @submit.prevent="pushCat">
                    <div class="input-group">
                        <input
                            type="text"
                            class="form-control"
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
                <hr />
                <div id="cats" class="list-group">
                    <button
                        type="button"
                        class="list-group-item list-group-item-action"
                        v-for="cat in cats"
                        :key="cat.id"
                        :class="{ active: cat.id == currentCatId }"
                        @click="selectCat(cat.id)"
                    >
                        {{ cat.title }}
                    </button>
                </div>
            </div>
            <div class="col col-md-9">
                <h1>Goods in this Category</h1>
                <div class="row">
                    <good-card
                        v-for="good in goodsInCurretCat"
                        :key="good.id"
                        :good="good"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import GoodCard from '@/components/UI/goods/GoodCard.vue';
export default {
    data() {
        return {
            newCatTitle: '',
            currentCatId: null
        };
    },
    computed: {
        ...mapGetters('goods', { cats: 'getCategories', goods: 'getGoods' }),
        goodsInCurretCat() {
            return (
                this.goods.filter(
                    good => good.categoryId == this.currentCatId
                ) || []
            );
        }
    },
    methods: {
        ...mapActions('goods', [
            'fetchCats',
            'setCats',
            'addCat',
            'updateCat',
            'removeCat'
        ]),
        pushCat() {
            this.addCat(this.newCatTitle).then(() => {
                this.newCatTitle = '';
            });
        },
        selectCat(id) {
            this.currentCatId = id;
        }
    },
    components: {
        'good-card': GoodCard
    },
    mounted() {
        this.fetchCats().then(() => {
            this.currentCatId = this.cats[0].id || null;
        });
    }
};
</script>

<style lang="scss" scoped></style>
