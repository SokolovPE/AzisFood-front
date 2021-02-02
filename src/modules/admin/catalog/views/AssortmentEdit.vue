<template>
    <div>
        <!-- Remove this when component will really be used!!! -->
        <div>
            <good-editor />
        </div>
        <!-- <div class="row" id="assort-edit-wrapper">
            <div class="col col-12 col-md-12 col-sm-12 col-lg-2">
                <category-editor />
            </div>
            <div class="col col-12 col-md-12 col-sm-12 col-lg-10">
                <good-editor />
            </div>
        </div> -->
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
//import CategoryListEditor from '@/modules/admin/catalog/components/CategoryListEditor.vue';
import GoodListEditor from '@/modules/admin/catalog/components/GoodListEditor.vue';
export default {
    computed: {
        ...mapGetters('adminCatalog', {
            editsInProgress: 'getEditsInProgress'
        }),
        goodsInCurretCat() {
            return (
                this.goods.filter(
                    good => good.category.id == this.currentCat.id
                ) || []
            );
        },
        isMobile() {
            return this.$mq === 'mobile' || this.$mq === 'tablet';
        }
    },
    methods: {
        ...mapActions('adminCatalog', ['clearEditsInProgress']),
        showModal(modalText) {
            return this.$bvModal.msgBoxConfirm(modalText, {
                title: 'Before you leave...',
                centered: true,
                hideBackdrop: true,
                headerBgVariant: 'warning',
                headerTextVariant: 'light',
                okTitle: 'Yes, I understand',
                cancelTitle: 'Cancel'
            });
        }
    },
    beforeRouteLeave(to, from, next) {
        if (this.editsInProgress && this.editsInProgress.length > 0) {
            this.showModal(
                'Do you really want to leave this page? You will loose all unsaved changes!'
            ).then(answer => {
                if (answer) {
                    this.clearEditsInProgress();
                    next();
                } else {
                    next(false);
                }
            });
        } else {
            next();
        }
    },
    components: {
        //'category-editor': CategoryListEditor,
        'good-editor': GoodListEditor
    }
};
</script>

<style lang="scss" scoped>
// #assort-edit-wrapper {
//     margin-right: 0;
//     margin-left: 0;
// }
// #new-cat {
//     margin-bottom: 0.8rem;
// }
.fake-splitter {
    height: 2rem;
}
</style>
