<template>
    <v-dialog
        v-model="show"
        :fullscreen="false"
        :hide-overlay="false"
        transition="dialog-bottom-transition"
        max-width="1200px"
    >
        <v-form v-model="valid" ref="form">
            <v-card>
                <v-toolbar dark color="primary">
                    <v-btn icon dark @click="show = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title
                        >{{ forCreate ? 'Create' : 'Edit' }}:
                        {{ good.title }}</v-toolbar-title
                    >
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark text @click="saveGood">
                            Save
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-list>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>Main Info</v-list-item-title>
                            <v-row no-gutters align="center" justify="center">
                                <v-col cols="12" sm="1">
                                    <v-img
                                        :src="good.imgUrl"
                                        :lazy-src="good.imgUrl"
                                        max-width="150"
                                        max-height="150"
                                    >
                                        <template v-slot:placeholder>
                                            <v-row
                                                class="fill-height ma-0"
                                                align="center"
                                                justify="center"
                                            >
                                                <v-progress-circular
                                                    indeterminate
                                                    color="grey"
                                                ></v-progress-circular>
                                            </v-row>
                                        </template>
                                    </v-img>
                                </v-col>
                                <v-col cols="12" sm="11">
                                    <v-container>
                                        <v-text-field
                                            label="Title"
                                            v-model="good.title"
                                            :rules="[
                                                rules.required,
                                                rules.titleCounter
                                            ]"
                                            counter="25"
                                        ></v-text-field>
                                        <v-select
                                            :items="categories"
                                            v-model="good.category"
                                            item-text="title"
                                            return-object
                                            label="Category"
                                        ></v-select></v-container
                                ></v-col>
                            </v-row>
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>Price</v-list-item-title>
                            <div class="d-flex">
                                <v-text-field
                                    v-model="coinVal"
                                    class="pr-2"
                                    type="number"
                                    style="max-width: 100px"
                                    prefix="$"
                                >
                                </v-text-field>
                                <v-text-field
                                    v-model="changeVal"
                                    type="number"
                                    style="max-width: 60px"
                                    prefix="¢"
                                    :rules="[rules.greaterZero]"
                                >
                                </v-text-field>
                            </div>
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>Description</v-list-item-title>
                            <v-textarea
                                solo
                                v-model="good.description"
                            ></v-textarea>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-card>
        </v-form>
    </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { GoodModel } from '@/modules/common/models/GoodModel';
export default {
    data() {
        return {
            valid: false,
            good: { ...GoodModel },
            forCreate: false,
            titleMaxLen: 25,
            rules: {
                required: value => !!value || 'Required.',
                titleCounter: value =>
                    value.length <= this.titleMaxLen ||
                    `Title cannot be longer than ${this.titleMaxLen} symbols`,
                greaterZero: value => value > 0 || `Must be greater than zero`
            }
        };
    },
    computed: {
        ...mapGetters('adminCatalog', {
            categories: 'getCategoriesWithoutCnt',
            getEditorState: 'getEditorState',
            getGoodOnEdit: 'getGoodOnEdit'
        }),
        show: {
            get() {
                return this.getEditorState;
            },
            set(newVal) {
                this.setEditorState(newVal);
            }
        },
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
            'setGoodCntInCat',
            'setEditorState'
        ]),
        saveGood() {
            if (!this.valid) {
                this.$refs.form.validate();
                return;
            }
            // //* Store old category to update count in category.
            let oldCat = this.getGoodOnEdit.category;
            //* Update category in good.
            if (this.forCreate) {
                this.addGood(this.good).then(() => {
                    this.good = { ...GoodModel };
                    this.updateOldNewCat(oldCat.id, this.good.category.id);
                });
            } else {
                var vm = this;
                this.updateGood(vm.good).then(() => {
                    this.updateOldNewCat(oldCat.id, vm.good.category.id);
                });
            }
            this.show = false;
        },
        updateOldNewCat(oldCatId, newCatId) {
            this.setGoodCntInCat(oldCatId);
            if (oldCatId != newCatId) {
                this.setGoodCntInCat(newCatId);
            }
        }
    },
    watch: {
        getGoodOnEdit(newValue) {
            this.forCreate = newValue.id == '';
            this.good = { ...newValue };

            if (this.forCreate) {
                this.good.category = this.categories[0];
            }
        }
    },
    beforeRouteLeave(to, from, next) {
        this.setEditorState(false);
        next();
    }
};
</script>

<style lang="scss" scoped></style>
