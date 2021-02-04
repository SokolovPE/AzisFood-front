<template>
    <div class="col-md-12">
        <div class="card card-container">
            <img
                id="profile-img"
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                class="profile-img-card"
            />
            <form name="form" @submit.prevent="handleLogin">
                <div class="form-group">
                    <v-text-field
                        type="text"
                        :label="
                            user.email == null && user.login == null
                                ? 'Login/Email'
                                : user.email == null
                                ? 'Login'
                                : 'Email'
                        "
                        v-model="currentLogin"
                        :rules="[rules.required]"
                        class="form-control"
                        name="email"
                    />
                </div>
                <div class="form-group">
                    <v-text-field
                        type="password"
                        v-model="user.password"
                        v-validate="'required'"
                        class="form-control"
                        :rules="[rules.required]"
                        name="password"
                        label="Password"
                    />
                </div>
                <div class="form-group">
                    <v-btn
                        block
                        color="primary"
                        :disabled="loading"
                        type="submit"
                    >
                        <span
                            v-show="loading"
                            class="spinner-border spinner-border-sm"
                        ></span>
                        <span>Login</span>
                    </v-btn>
                </div>
                <div class="form-group pt-4">
                    <v-alert v-if="message" type="warning" role="alert">
                        {{ message }}
                    </v-alert>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import User from '../models/UserModel';
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'Login',
    data() {
        return {
            user: new User(null, null),
            loading: false,
            message: '',
            rules: {
                required: value => !!value || 'Required.',
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return pattern.test(value) || 'Invalid e-mail.';
                }
            }
        };
    },
    computed: {
        ...mapGetters('auth', ['isLoggedIn']),
        currentLogin: {
            get: function() {
                return this.user.login ?? this.user.email;
            },
            set: function(newValue) {
                if (newValue.indexOf('@') > 0) {
                    //* if @ is found - it's email.
                    this.user.login = null;
                    this.user.email = newValue;
                } else {
                    this.user.email = null;
                    this.user.login = newValue;
                }
            }
        }
    },
    created() {
        if (this.isLoggedIn) {
            this.$router.push('/profile');
        }
    },
    methods: {
        ...mapActions('auth', ['logout', 'login']),
        handleLogin() {
            console.log('uee');
            this.loading = true;
            this.$validator.validateAll().then(isValid => {
                if (!isValid) {
                    this.loading = false;
                    return;
                }

                if (
                    (this.user.login || this.user.email) &&
                    this.user.password
                ) {
                    this.login(this.user).then(
                        () => {
                            this.$router.push('/profile');
                        },
                        error => {
                            this.loading = false;
                            this.message =
                                (error.response && error.response.data) ||
                                error.message ||
                                error.toString();
                        }
                    );
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
label {
    display: block;
    margin-top: 10px;
}

.card-container.card {
    max-width: 350px !important;
    padding: 40px 40px;
}

.card {
    background-color: #f7f7f7;
    padding: 20px 25px 30px;
    margin: 0 auto 25px;
    margin-top: 50px;
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    border-radius: 2px;
    -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
    width: 96px;
    height: 96px;
    margin: 0 auto 10px;
    display: block;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
}
</style>
