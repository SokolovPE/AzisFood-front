<template>
    <div class="card" v-if="editMode">
        <a href="#" class="card-edit-btn pull-right" @click.prevent="saveGood"
            ><i class="fas fa-check-square fa-3x"></i
        ></a>
        <!-- <div class="img-wrapper">
            <img class="card-img-top" :src="imgUrl" :alt="good.title" />
        </div> -->
        <div class="card-body">
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
                <label for="goodDescEdit" class="pull-left">Description</label>
                <textarea
                    id="goodDescEdit"
                    class="form-control form-control-alternative"
                    rows="3"
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
    </div>
    <div class="card" v-else>
        <a
            href="#"
            class="card-edit-btn pull-right"
            @click.prevent="editMode = true"
            ><i class="fas fa-pen-square fa-3x"></i
        ></a>
        <div class="img-wrapper">
            <img class="card-img-top" :src="imgUrl" :alt="good.title" />
        </div>
        <div class="card-body">
            <h5 class="card-title">{{ good.title }}</h5>
            <!-- <p class="card-text">{{ good.description }}</p> -->
        </div>
        <div class="card-footer">{{ totalVal }}$</div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    props: {
        good: {
            type: Object
        }
    },
    computed: {
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
        },
        imgUrl() {
            return this.good.imgUrl || require('@/assets/goods/default.png');
        }
    },
    methods: {
        ...mapActions('goods', ['updateGood']),
        saveGood() {
            this.updateGood(this.good).then(() => {
                this.editMode = false;
            });
        }
    },
    data() {
        return {
            editMode: false
        };
    }
};
</script>

<style lang="scss" scoped>
.card {
    overflow: hidden;
    width: 18rem;
    max-height: 442px;
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
    + .card {
        margin-right: 0.8rem;
    }
}
</style>
