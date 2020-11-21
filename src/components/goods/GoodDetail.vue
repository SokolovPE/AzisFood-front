<template>
    <div>
        Some good detail info...
        <!-- {{ good.title }} -->
        <!-- {{ good.title }} -->
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { GoodModel } from '@/models/GoodModels';

export default {
    data() {
        return {
            good: GoodModel
        };
    },
    computed: {
        ...mapGetters('goods', ['getGoodById'])
    },
    created() {
        //let yee = this.getGoodById(0);
        //console.log('yee:' + yee);
        //this.good = yee;
        //this.good.title = 'suka';
        //this.good = this.getGoodById(this.$route.params.id);
    }
};
</script>

<style lang="scss" scoped></style>
