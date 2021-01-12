<template>
    <editable-card
        :imgUrl="good.imgUrl"
        :imgAlt="good.title"
        :imgDefault="
            forCreate
                ? require('@/assets/goods/plus.png')
                : require('@/assets/goods/default.png')
        "
        :createMode="forCreate"
        :showFooter="!forCreate"
        @save="saveGood"
    >
        <template v-slot:cardBody>
            <h5 class="card-title" v-if="forCreate">Add a new good</h5>
            <h5 class="card-title" v-else>{{ good.title }}</h5>
            <!-- <p class="card-text">{{ good.description }}</p> -->
        </template>
        <template v-slot:cardFooter>{{ totalVal }}$</template>
        <!-- Body of edit mode -->
        <template v-slot:cardBodyEdit>
            <b-tabs content-class="mt-3">
                <b-tab title="Main" active>
                    <div class="form-group">
                        <label for="goodTitleEdit" class="pull-left"
                            >Title</label
                        >
                        <input
                            type="text"
                            id="goodTitleEdit"
                            class="form-control form-control-alternative"
                            v-model="good.title"
                        />
                    </div>
                    <div class="form-group">
                        <label for="goodCategoryEdit" class="pull-left"
                            >Category</label
                        >
                        <b-form-select
                            v-model="selectedCategory"
                            id="goodCategoryEdit"
                            required
                        >
                            <b-form-select-option
                                v-for="cat in getCategories"
                                :key="cat.id"
                                :value="cat"
                                >{{ cat.title }}</b-form-select-option
                            >
                        </b-form-select>
                    </div>
                    <div class="form-group">
                        <label for="goodImgSrcEdit" class="pull-left"
                            >Image Source</label
                        >
                        <input
                            type="text"
                            id="goodImgSrcEdit"
                            class="form-control form-control-alternative"
                            v-model="good.imgUrl"
                        />
                    </div>
                    <div class="form-group">
                        <label for="goodPriceEdit" class="pull-left"
                            >Price</label
                        >
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text">$</span>
                            </div>
                            <input
                                type="number"
                                min="0"
                                max="9999"
                                id="goodPriceCoinEdit"
                                class="form-control"
                                v-model="coinVal"
                            />
                            <div class="input-group-prepend">
                                <span class="input-group-text">¢</span>
                            </div>
                            <input
                                type="number"
                                min="0"
                                id="goodPriceChangeEdit"
                                class="form-control"
                                v-model="changeVal"
                            />
                        </div>
                    </div>
                </b-tab>
                <b-tab title="Additional"
                    ><div class="form-group">
                        <label for="goodDescEdit" class="pull-left"
                            >Description</label
                        >
                        <textarea
                            id="goodDescEdit"
                            class="form-control form-control-alternative"
                            :rows="forCreate ? 12 : 10"
                            placeholder="Write description text here ..."
                            v-model="good.description"
                        ></textarea>
                    </div>
                    <button
                        class="btn btn-danger"
                        style="width: 100%"
                        @click.prevent="removeGoodById(good.id)"
                        v-if="!forCreate"
                    >
                        Delete
                    </button>
                </b-tab>
            </b-tabs>
        </template>
    </editable-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import EditableCard from '@/components/UI/EditableCard.vue';
import { GoodModel } from '@/models/GoodModels';

export default {
    props: {
        valGood: {
            type: Object,
            default: () => {
                return { ...GoodModel };
            }
        },
        category: {
            type: Object
        },
        forCreate: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            good: { ...GoodModel },
            selectedCategory: null
        };
    },
    computed: {
        ...mapGetters('adminCatalog', {
            getCategories: 'getCategoriesWithoutCnt'
        }),
        coinVal: {
            get() {
                return Math.floor(this.good.price);
            },
            set(newVal) {
                this.good.price = (this.good.price % 1) + Number(newVal);
            }
        },
        changeVal: {
            get() {
                return ((this.good.price % 1) * 100).toFixed(0);
            },
            set(newVal) {
                this.good.price = Math.floor(this.good.price) + newVal / 100;
            }
        },
        totalVal() {
            return this.good.price.toFixed(2);
        }
    },
    methods: {
        ...mapActions('adminCatalog', [
            'addGood',
            'updateGood',
            'removeGoodById',
            'setGoodCntInCat'
        ]),
        saveGood() {
            if (this.good.title == '' || this.good.price <= 0) {
                return;
            }
            //* Store old category to update count in category.
            let oldCat = this.good.category;
            //* Update category in good.
            this.good.category = this.selectedCategory;
            if (this.forCreate) {
                this.addGood(this.good).then(() => {
                    this.good = { ...GoodModel };
                    this.updateOldNewCat(oldCat.id, this.selectedCategory.id);
                });
            } else {
                this.updateGood(this.good).then(() => {
                    this.updateOldNewCat(oldCat.id, this.selectedCategory.id);
                });
            }
        },
        updateOldNewCat(oldCatId, newCatId) {
            this.setGoodCntInCat(oldCatId);
            if (oldCatId != newCatId) {
                this.setGoodCntInCat(newCatId);
            }
        }
    },
    components: {
        'editable-card': EditableCard
    },
    watch: {
        category(newValue) {
            this.selectedCategory = newValue;
            this.good.category = newValue;
        }
    },
    created() {
        this.good = this.valGood;
        this.selectedCategory = {
            id: this.good.category.id,
            title: this.good.category.title
        };
    }
};
</script>

<style lang="scss" scoped></style>
