<template>
    <v-card style="width: 100%">
        <v-card-title>
            <v-btn-toggle dense rounded>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            color="primary accent-2 white--text"
                            v-bind="attrs"
                            v-on="on"
                            @click="showCategoryCreate = !showCategoryCreate"
                        >
                            <v-icon color="white">mdi-folder-plus</v-icon>
                        </v-btn>
                    </template>
                    <span>Add Category</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            color="primary accent-2 white--text"
                            v-bind="attrs"
                            v-on="on"
                            @click="addGood()"
                        >
                            <v-icon color="white">mdi-plus-circle</v-icon>
                        </v-btn>
                    </template>
                    <span>Add Good</span>
                </v-tooltip>
                <v-tooltip bottom v-if="selectedGoods.length > 0">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="red white--text" v-bind="attrs" v-on="on">
                            <v-icon color="white">mdi-delete</v-icon>
                        </v-btn>
                    </template>
                    <span>Delete Selected</span>
                </v-tooltip>
            </v-btn-toggle>
            <v-spacer></v-spacer>
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search by title"
                hide-details
            ></v-text-field>
        </v-card-title>
        <v-data-table
            :headers="headers"
            :items="goods"
            :search="search"
            :items-per-page="5"
            :single-select="false"
            show-select
            v-model="selectedGoods"
            class="elevation-1"
            multi-sort
        >
            <template v-slot:top>
                <div class="v-subheader theme--light sub-header">
                    Categories:
                </div>
                <cat-chips class="ml-3" />
            </template>
            <template v-slot:item.image="{ item }">
                <div class="p-2">
                    <v-img
                        :src="item.imgUrl"
                        :alt="item.title"
                        height="30px"
                        width="30px"
                    ></v-img>
                </div>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="setGoodOnEdit(item)">
                    mdi-pencil
                </v-icon>
                <v-icon small>
                    mdi-delete
                </v-icon>
            </template>
        </v-data-table>
        <v-dialog v-model="showCategoryCreate" max-width="600px">
            <template>
                <v-card>
                    <v-card-title>
                        <span class="headline">Create new category</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-text-field
                                label="Category title"
                                v-model="newCategoryTitle"
                                required
                            ></v-text-field>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="
                                showCategoryCreate = false;
                                newCategoryTitle = '';
                            "
                        >
                            Close
                        </v-btn>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="addCategory()"
                        >
                            Save
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>
        <v-snackbar
            v-model="snackbar.state"
            :timeout="snackbar.timeout"
            :color="snackbar.color"
            rounded="pill"
        >
            {{ snackbar.text }}
        </v-snackbar>
        <good-editor />
    </v-card>
</template>

<script>
import { mapActions } from 'vuex';
import CategoryChips from '@/modules/admin/catalog/components/CategoryChips.vue';
import GoodEditor from '@/modules/admin/catalog/components/GoodEditor.vue';
import { GoodModel } from '@/modules/common/models/GoodModel';
export default {
    data() {
        return {
            showCategoryCreate: false,
            snackbar: {
                state: false,
                text: '',
                color: '',
                timeout: 100
            },
            newCategoryTitle: '',
            search: '',
            selectedGoods: [],
            headers: [
                {
                    text: 'Image',
                    value: 'image',
                    sortable: false,
                    filterable: false,
                    width: '30px'
                },
                {
                    text: 'Title',
                    align: 'start',
                    sortable: true,
                    value: 'title'
                },
                {
                    text: 'Category',
                    value: 'category.title',
                    filterable: false
                },
                { text: 'Price', value: 'price', filterable: false },
                { text: 'Actions', value: 'actions', sortable: false }
            ]
        };
    },
    props: {
        goods: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        ...mapActions('adminCatalog', ['addCat', 'selectCat', 'setGoodOnEdit']),
        addCategory() {
            this.addCat(this.newCategoryTitle)
                .then(createdCategory => {
                    this.selectCat(createdCategory);
                    this.showSnackbar(
                        `Category ${this.newCategoryTitle} was successfully created`,
                        3500,
                        false
                    );
                })
                .catch(() => {
                    this.showSnackbar(
                        `Category ${this.newCategoryTitle} was not created`,
                        3500,
                        true
                    );
                })
                .then(() => {
                    this.newCategoryTitle = '';
                    this.showCategoryCreate = false;
                });
        },
        showSnackbar(text, timeout, isError) {
            this.snackbar = {
                state: true,
                text: text,
                color: isError ? 'error' : 'success',
                timeout: timeout
            };
        },
        addGood() {
            this.setGoodOnEdit(GoodModel);
        }
    },
    components: {
        'cat-chips': CategoryChips,
        'good-editor': GoodEditor
    }
};
</script>

<style lang="scss" scoped>
.sub-header {
    font-size: larger;
}
</style>
