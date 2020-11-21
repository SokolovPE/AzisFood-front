<template>
    <div class="errorBody">
        <img :src="imgUrl" class="img-fluid" />
        <h1>Whoops, nothing here, buddy!</h1>
    </div>
</template>

<script>
export default {
    data() {
        return {
            imgUrl: require('@/assets/errors/404.png')
        };
    }
};
</script>

<style lang="scss" scoped>
.errorBody {
    .errorInner {
        margin: auto;
    }
}
.break {
    flex-basis: 100%;
    height: 0;
}
</style>
