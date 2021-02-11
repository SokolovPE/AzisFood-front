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
        </v-data-table>
    </v-card>
</template>

<script>
import CategoryChips from '@/modules/admin/catalog/components/CategoryChips.vue';
export default {
    data() {
        return {
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
                { text: 'Price', value: 'price', filterable: false }
            ]
        };
    },
    props: {
        goods: {
            type: Array,
            default: () => []
        }
    },
    components: {
        'cat-chips': CategoryChips
    }
};
</script>

<style lang="scss" scoped>
.sub-header {
    font-size: larger;
}
</style>
