<template>
    <v-dialog v-model="showDialog" max-width="600px">
        <template>
            <v-card>
                <v-card-title>
                    <span class="headline" v-if="title">{{ title }}</span>
                </v-card-title>
                <v-card-text>
                    <span
                        style="font-size: large"
                        v-if="text"
                        v-html="text"
                    ></span>
                    <v-spacer />
                    <small class="red--text" v-if="smallText"
                        >* {{ smallText }}</small
                    >
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="showDialog = false"
                    >
                        No
                    </v-btn>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="
                            $emit('yes');
                            showDialog = false;
                        "
                    >
                        Yes, I confirm
                    </v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>

<script>
export default {
    name: 'confirmDialog',
    props: {
        show: {
            type: Boolean,
            default: false
        },
        title: {
            type: String
        },
        text: {
            type: String
        },
        smallText: {
            type: String
        }
    },
    data() {
        return {
            showDialog: false
        };
    },
    watch: {
        show(newValue) {
            this.showDialog = newValue;
        },
        showDialog(newValue) {
            if (!newValue) {
                this.$emit('close');
            }
        }
    },
    mounted() {
        this.showDialog = this.show;
    }
};
</script>

<style lang="scss" scoped></style>
