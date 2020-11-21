<template>
    <div class="card" v-if="editMode">
        <a href="#" class="card-edit-btn pull-right" @click.prevent="save"
            ><i class="fas fa-check-square fa-3x"></i
        ></a>
        <div class="card-body">
            <slot name="cardBodyEdit">Card body in edit mode here...</slot>
        </div>
    </div>
    <div class="card" v-else>
        <a
            href="#"
            class="card-edit-btn pull-right"
            @click.prevent="editMode = true"
            ><i class="fas fa-pen-square fa-3x"></i
        ></a>
        <div class="img-wrapper" :class="{ 'img-wrapper-add': createMode }">
            <img class="card-img-top" :src="imageUrl" :alt="imgAlt" />
        </div>
        <div class="card-body" :class="{ 'card-body-edit': editMode }">
            <slot name="cardBody">Card body in view mode here...</slot>
        </div>
        <div class="card-footer" v-if="showFooter">
            <slot name="cardFooter">Card footer in view mode here...</slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        imgUrl: {
            type: String
        },
        imgAlt: {
            type: String,
            default: 'Alt for image...'
        },
        imgDefault: {
            type: String
        },
        createMode: {
            type: Boolean,
            default: false
        },
        showFooter: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            editMode: false
        };
    },
    computed: {
        imageUrl() {
            return (
                this.imgUrl ||
                this.imgDefault ||
                require('@/assets/default.png')
            );
        }
    },
    methods: {
        save() {
            this.$emit('save');
            this.editMode = false;
        }
    }
};
</script>

<style lang="scss" scoped>
.card {
    overflow: hidden;
    width: 18rem;
    max-height: 415px;
    margin-bottom: 0.8rem;
    margin-right: 0.8rem;
    border-color: rgba(0, 0, 0, 0.15);
    .card-edit-btn {
        position: absolute;
        right: 0;
    }
    .img-wrapper {
        height: 250px;
        display: flex;
        align-items: center;
        img {
            max-height: 250px;
            object-fit: contain;
        }
    }
    .img-wrapper-add {
        img {
            max-height: 165px;
        }
    }
    .card-body {
        .form-group {
            label {
                font-weight: bold;
            }
        }
        .card-text {
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
    .card-body-edit {
        padding-top: 0;
    }
    .card-footer {
        font-weight: bold;
    }
}
</style>
