<template>
    <div>
        <v-chip-group
            :value="currentCat"
            active-class="primary"
            show-arrows
            mandatory
        >
            <v-chip
                v-for="cat in cats"
                :key="cat.id"
                :value="cat"
                class="mr-2"
                close
                @click="selectCat(cat)"
                @click:close="removeConfigrmation(cat)"
            >
                <v-avatar left color="grey lighten-5 primary--text">{{
                    cat.goodCnt
                }}</v-avatar>
                {{ cat.title }}</v-chip
            >
        </v-chip-group>
        <v-dialog v-model="removeConfirmation.show" max-width="600px">
            <template>
                <v-card>
                    <v-card-title>
                        <span class="headline">Delete confirmation</span>
                    </v-card-title>
                    <v-card-text>
                        <span style="font-size: large"
                            >Do you really want to delete
                            <b>{{ removeConfirmation.category.title }}</b>
                            and all goods in it?</span
                        >
                        <v-spacer />
                        <small class="red--text"
                            >* This action cannot be reverted, you will loose
                            all goods in this category and category
                            itself</small
                        >
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="removeConfirmation.show = false"
                        >
                            No
                        </v-btn>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="removeCategory(removeConfirmation.category)"
                        >
                            Yes, I confirm
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    data() {
        return {
            removeConfirmation: {
                show: false,
                category: {}
            }
        };
    },
    methods: {
        ...mapActions('adminCatalog', [
            'addCat',
            'selectCat',
            'removeCatById',
            'fetchCats',
            'fetchGoodsInCurrentCat'
        ]),
        removeConfigrmation(category) {
            this.removeConfirmation = {
                show: true,
                category: category
            };
        },
        removeCategory(category) {
            this.removeCatById(category.id).then(() => {
                this.removeConfirmation.show = false;
                if (
                    this.cats.length > 0 &&
                    this.currentCat.id === category.id
                ) {
                    this.selectCat(this.cats[0]);
                }
            });
        }
    },
    computed: {
        ...mapGetters('adminCatalog', {
            cats: 'getCategories',
            currentCat: 'getCurrentCategory'
        }),
        isMobile() {
            return this.$mq === 'mobile' || this.$mq === 'tablet';
        }
    },
    mounted() {
        this.fetchCats().then(() => {
            this.fetchGoodsInCurrentCat();
        });
    }
};
</script>

<style lang="scss" scoped></style>
