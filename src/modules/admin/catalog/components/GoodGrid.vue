<template>
    <v-card style="width: 100%">
        <v-card-title>
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
            class="elevation-1"
            multi-sort
        >
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
export default {
    data() {
        return {
            search: '',
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
    }
};
</script>

<style lang="scss" scoped></style>
