<template>
    <div class="card">
        <a
            href="#"
            class="card-edit-btn pull-right"
            v-if="editMode"
            @click.prevent="editMode = false"
            ><i class="fas fa-check-square fa-3x"></i
        ></a>
        <a
            href="#"
            class="card-edit-btn pull-right"
            v-else
            @click.prevent="editMode = true"
            ><i class="fas fa-pen-square fa-3x"></i
        ></a>
        <img class="card-img-top" :src="good.imgUrl" :alt="good.title" />
        <div class="card-body" v-if="editMode">
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
        <div class="card-body" v-else>
            <h5 class="card-title">{{ good.title }}</h5>
            <p class="card-text">{{ good.description }}</p>
        </div>
        <div class="card-footer" v-if="!editMode">{{ good.price }}$</div>
    </div>
</template>

<script>
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
    .card-edit-btn {
        position: absolute;
        right: 0;
    }
    img {
        max-height: 250px;
        object-fit: contain;
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
        margin-left: 0.8rem;
    }
}
</style>
