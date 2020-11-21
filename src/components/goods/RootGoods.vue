<template>
    <div>
        <router-view />
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    methods: {
        ...mapActions('goods', ['fetchGoods'])
    },
    created() {
        this.fetchGoods();
    }
};
</script>

<style lang="scss" scoped></style>
