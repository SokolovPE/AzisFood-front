<template>
    <div class="container">
        <header class="jumbotron" v-if="error">
            <h3>{{ error }}</h3>
        </header>
        <div v-else>
            <ul id="categories">
                <li v-for="cat in categories" :key="cat.id">{{ cat.title }}</li>
            </ul>
            <hr />
            <ul id="goods">
                <li v-for="good in goods" :key="good.id">{{ good.title }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import CatalogService from '../services/catalog.service';
export default {
    name: 'Catalog',
    data() {
        return {
            categories: '',
            goods: '',
            error: ''
        };
    },
    mounted() {
        CatalogService.getCategories().then(
            response => {
                this.categories = response.data;
            },
            error => {
                this.error =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();
            }
        );

        CatalogService.getGoods().then(
            response => {
                this.goods = response.data;
            },
            error => {
                this.error =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();
            }
        );
    }
};
</script>

<style lang="scss" scoped></style>
