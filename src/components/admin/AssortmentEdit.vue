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
                        :value="currentCat"
                        @change="selectCategory($event)"
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
                        @click="selectCategory(cat)"
                    >
                        {{ cat.title }}
                        <span
                            class="badge badge-primary badge-pill"
                            :class="{
                                'badge-secondary': cat.id == currentCat.id
                            }"
                            >{{ cat.goodCnt }}</span
                        >
                    </button>
                </div>
            </div>
            <div class="col col-12 col-md-12 col-sm-12 col-lg-10">
                <div class="row" :class="{ 'justify-center': isMobile }">
                    <good-card
                        :category="currentCatCountless"
                        :forCreate="true"
                    />
                    <good-card
                        v-for="good in goodsInCurretCat"
                        :key="good.id"
                        :valGood="good"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import GoodCard from '@/components/goods/GoodCard.vue';
export default {
    data() {
        return {
            newCatTitle: ''
        };
    },
    computed: {
        ...mapGetters('adminCatalog', {
            cats: 'getCategories',
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
    methods: {
        ...mapActions('adminCatalog', [
            'fetchCats',
            'addCat',
            'fetchGoodsInCurrentCat',
            'selectCat',
            'clearEditsInProgress'
        ]),
        pushCat() {
            this.addCat(this.newCatTitle).then(() => {
                this.newCatTitle = '';
            });
        },
        selectCategory(category) {
            if (this.editsInProgress && this.editsInProgress.length > 0) {
                var vm = this;
                this.showModal(
                    'Do you really want to change category? You will loose all unsaved changes!'
                ).then(answer => {
                    if (answer) {
                        vm.clearEditsInProgress();
                        vm.selectCat(category);
                    }
                });
            } else {
                this.selectCat(category);
            }
        },
        showModal(modalText) {
            return this.$bvModal.msgBoxConfirm(modalText, {
                title: 'Before you leave...',
                centered: true,
                hideBackdrop: true,
                headerBgVariant: 'warning',
                headerTextVariant: 'info',
                okTitle: 'Yes, I understand',
                cancelTitle: 'Cancel'
            });
        }
    },
    components: {
        'good-card': GoodCard
    },
    mounted() {
        this.fetchCats().then(() => {
            this.fetchGoodsInCurrentCat();
        });
    },
    beforeRouteLeave(to, from, next) {
        if (this.editsInProgress && this.editsInProgress.length > 0) {
            this.showModal(
                'Do you really want to leave this page? You will loose all unsaved changes!'
            ).then(answer => {
                if (answer) {
                    this.clearEditsInProgress();
                    next();
                } else {
                    next(false);
                }
            });
        } else {
            next();
        }
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
