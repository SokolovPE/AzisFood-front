// TODO: Rename this to catalog!
<template>
    <good-editor />
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
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
            // TODO: REMOVE bvModal, it's from bootstrap!!!
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
        'good-editor': GoodListEditor
    }
};
</script>

<style lang="scss" scoped></style>
