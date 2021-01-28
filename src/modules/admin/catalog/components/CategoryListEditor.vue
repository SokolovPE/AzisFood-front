<template>
    <div>
        <div class="form-group" v-if="isMobile">
            <h5 for="cat-selector" class="pull-left">Category</h5>
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
                    <button type="submit" class="btn btn-outline-primary">
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
                id="cat-selector"
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
                <div class="li-prepend">
                    <span
                        class="badge badge-primary badge-pill"
                        :class="{
                            'badge-secondary': cat.id == currentCat.id
                        }"
                        >{{ cat.goodCnt }}</span
                    >
                    <span class="category-title">{{ cat.title }}</span>
                </div>
                <b-button pill size="sm" @click="removeCategory(cat)"
                    ><b-icon icon="trash2-fill"></b-icon
                ></b-button>
            </button>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    data() {
        return {
            newCatTitle: ''
        };
    },
    computed: {
        ...mapGetters('adminCatalog', {
            cats: 'getCategories',
            currentCat: 'getCurrentCategory',
            editsInProgress: 'getEditsInProgress'
        }),
        isMobile() {
            return this.$mq === 'mobile' || this.$mq === 'tablet';
        }
    },
    methods: {
        ...mapActions('adminCatalog', [
            'addCat',
            'selectCat',
            'clearEditsInProgress',
            'removeCatById',
            'fetchCats',
            'fetchGoodsInCurrentCat'
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
                    'Before you leave...',
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
        removeCategory(category) {
            var vm = this;
            this.showModal(
                `Delete category ${category.title} and all goods in it?`,
                `Do you really want to delete category ${category.title} and ${category.goodCnt} good(s) in it? This action can not be reverted!`
            ).then(answer => {
                if (answer) {
                    vm.removeCatById(category.id).then(() => {
                        if (vm.cats[0]) {
                            vm.selectCat(vm.cats[0]);
                        }
                    });
                }
            });
        },
        showModal(title, modalText) {
            return this.$bvModal.msgBoxConfirm(modalText, {
                title: title,
                centered: true,
                hideBackdrop: true,
                headerBgVariant: 'warning',
                headerTextVariant: 'light',
                okTitle: 'Yes, I understand',
                cancelTitle: 'Cancel'
            });
        }
    },
    mounted() {
        this.fetchCats().then(() => {
            this.fetchGoodsInCurrentCat();
        });
    }
};
</script>

<style lang="scss" scoped>
.li-prepend {
    span + span {
        padding-left: 0.3rem;
    }
}

.category-title {
    vertical-align: sub;
}
</style>
