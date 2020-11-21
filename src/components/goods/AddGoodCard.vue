<template>
    <div class="card" v-if="editMode">
        <a href="#" class="card-edit-btn pull-right" @click.prevent="saveGood"
            ><i class="fas fa-check-square fa-3x"></i
        ></a>
        <!-- <div class="img-wrapper">
            <img class="card-img-top" :src="good.imgUrl" :alt="good.title" />
        </div> -->
        <div class="card-body">
            <div class="form-group">
                <label for="goodTitleEdit" class="pull-left">Title</label>
                <input
                    type="text"
                    id="goodTitleEdit"
                    class="form-control form-control-alternative"
                    v-model="good.title"
                    required
                />
            </div>
            <div class="form-group">
                <label for="goodCategoryEdit" class="pull-left">Category</label>
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
                <label for="goodDescEdit" class="pull-left">Description</label>
                <textarea
                    id="goodDescEdit"
                    class="form-control form-control-alternative"
                    rows="3"
                    placeholder="Write description text here ..."
                    v-model="good.description"
                    required
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
                        required
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
                        required
                    />
                </div>
            </div>
        </div>
    </div>
    <div class="card" v-else>
        <a
            href="#"
            class="card-edit-btn pull-right"
            @click.prevent="editMode = true"
            ><i class="fas fa-pen-square fa-3x"></i
        ></a>
        <div class="img-wrapper">
            <img
                class="card-img-top"
                :src="require('@/assets/goods/plus.png')"
                alt="Add new"
            />
        </div>
        <div class="card-body">
            <h5 class="card-title">Add a new good</h5>
            <!-- <p class="card-text">{{ good.description }}</p> -->
        </div>
        <!-- <div class="card-footer">{{ good.price }}$</div> -->
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { GoodModel } from '@/models/GoodModels';

export default {
    props: {
        category: {
            type: Object
        }
    },
    data() {
        return {
            editMode: false,
            good: { ...GoodModel },
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
    watch: {
        selectedCategory(newValue) {
            this.good.categoryId = newValue.id;
            this.good.category = newValue.title;
        },
        category(newValue) {
            this.selectedCategory = newValue;
        }
    },
    methods: {
        ...mapActions('goods', ['addGood']),
        saveGood() {
            if (this.good.title != '' && this.good.price > 0) {
                this.addGood(this.good);
            }
            this.good = { ...GoodModel };
            this.good.categoryId = this.selectedCategory.id;
            this.good.category = this.selectedCategory.title;
            this.editMode = false;
        }
    }
};
</script>

<style lang="scss" scoped>
.card {
    max-height: 442px;
    overflow: hidden;
    width: 18rem;
    margin-right: 0.8rem;
    margin-bottom: 0.8rem;
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
            max-height: 165px;
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
        padding: 0.65rem;
        .btn-save {
            width: 100%;
        }
    }
}
</style>
