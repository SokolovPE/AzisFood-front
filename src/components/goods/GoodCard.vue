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
            <div class="mainFields">
                <div class="form-group">
                    <label for="goodTitleEdit" class="pull-left">Title</label>
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
                    <select
                        class="form-control"
                        id="goodCategoryEdit"
                        v-model="selectedCategory"
                        required
                    >
                        <option
                            v-for="cat in getCategories"
                            :key="cat.id"
                            :value="cat"
                            >{{ cat.title }}</option
                        >
                    </select>
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
                    <label for="goodDescEdit" class="pull-left"
                        >Description</label
                    >
                    <textarea
                        id="goodDescEdit"
                        class="form-control form-control-alternative"
                        rows="2"
                        placeholder="Write description text here ..."
                        v-model="good.description"
                    ></textarea>
                </div>
                <div class="form-group">
                    <label for="goodPriceEdit" class="pull-left">Price</label>
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
            </div>
        </template>
    </editable-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import EditableCard from '@/components/UI/EditableCard.vue';
import { GoodModel } from '@/models/GoodModels';

export default {
    props: {
        good: {
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
            selectedCategory: null
        };
    },
    computed: {
        ...mapGetters('goods', ['getCategories']),
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
        ...mapActions('goods', ['updateGood']),
        saveGood() {
            if (this.good.title == '' || this.good.price <= 0) {
                return;
            }

            if (this.forCreate) {
                this.addGood(this.good);
                this.good = { ...GoodModel };
                this.good.category = this.selectedCategory;
            } else {
                this.good.category = this.selectedCategory;
                this.updateGood(this.good);
            }
        }
    },
    components: {
        'editable-card': EditableCard
    },
    watch: {
        category(newValue) {
            this.selectedCategory = newValue;
        }
    },
    created() {
        this.selectedCategory = this.good.category;
    }
};
</script>

<style lang="scss" scoped>
.card {
    overflow: hidden;
    width: 18rem;
    max-height: 490px;
    margin-bottom: 0.8rem;
    margin-right: 0.8rem;
    border-color: rgba(0, 0, 0, 0.15);
    .card-edit-btn {
        position: absolute;
        right: 0;
    }
    .img-wrapper {
        height: 250px;
        display: flex;
        align-items: center;
        img {
            max-height: 250px;
            object-fit: contain;
        }
    }
    .card-body {
        //height: 200px;
        .form-group {
            label {
                font-weight: bold;
            }
        }
        .card-text {
            overflow: hidden;
            text-overflow: ellipsis;
            //white-space: nowrap;
        }
    }
    .card-footer {
        font-weight: bold;
    }
}
</style>
