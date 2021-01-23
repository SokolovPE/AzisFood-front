<template>
    <div>
        Some good detail info...
        <!-- {{ good.title }} -->
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { GoodModel } from '@/modules/common/models/GoodModel';

export default {
    data() {
        return {
            good: GoodModel
        };
    },
    computed: {
        ...mapGetters('goods', ['getGoodById'])
    }
};
</script>

<style lang="scss" scoped></style>
