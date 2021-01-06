<template>
    <div class="container">
        <header class="jumbotron" v-if="error">
            <h3>{{ error }}</h3>
        </header>
        <div v-else>
            <ul id="categories">
                <li v-for="cat in categories" :key="cat.id">{{ cat.title }}</li>
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
    }
};
</script>

<style lang="scss" scoped></style>
