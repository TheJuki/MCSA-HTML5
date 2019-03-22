<template>
<v-app>
  <v-container fluid="fluid" fill-height="fill-height" v-if="!alreadyLoggedIn">
      <v-layout align-center="align-center" justify-center="justify-center">
          <v-flex xs12="xs12" sm8="sm8" md6="md6">
              <v-card class="elevation-1">
                  <v-toolbar class="elevation-1" dark="dark" color="primary">
                      <v-toolbar-title>{{ $t('website.title') }}</v-toolbar-title>
                      <v-spacer></v-spacer>
                  </v-toolbar>
                  <v-toolbar class="elevation-1" color="white">
                      <v-toolbar-title>{{ $t('login.login') }}</v-toolbar-title>
                      <v-spacer></v-spacer>
                  </v-toolbar>
                  <v-card-text>
                      <v-form v-model="valid" ref="form" lazy-validation="lazy-validation" @submit.prevent="submit">
                          <v-alert outline="outline" transition="fade-transition" color="error" :value="showAlert">{{ formErrors.form }}</v-alert>
                          <v-text-field prepend-icon="person" v-model="model.userId" :label="$t('login.username')" type="text" :rules="usernameRules"></v-text-field>
                          <v-text-field prepend-icon="lock" v-model="model.password" :label="$t('login.password')" type="password" :rules="passwordRules"></v-text-field>
                          <v-card-actions></v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="primary" type="submit" :disabled="!valid || loggingIn" :loading="loggingIn" style="width: 100%;">{{ $t('login.login') }}</v-btn>
                      </v-form>
                  </v-card-text>
              </v-card>
          </v-flex>
      </v-layout>
  </v-container>
</v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import axios, {
  AxiosResponse,
  AxiosError
} from 'axios'

export default Vue.extend({
  name: 'LoginView',
  data: () => ({
    alreadyLoggedIn: true,
    valid: false,
    showAlert: false,
    formErrors: {},
    loggingIn: false,
    model: {
      userId: '',
      password: ''
    },
    usernameRules: [(v: any) => !!v || 'Username is required'],
    passwordRules: [(v: any) => !!v || 'Password is required']
  }),

  mounted () {
    if (localStorage.getItem('token')) {
      if (this.$store.state.route.query.redirect) {
        this.$router.push(this.$store.state.route.query.redirect)
      } else {
        this.$router.push('/')
      }
    } else {
      this.$nextTick(function () {
        this.alreadyLoggedIn = false
        if (this.$store.state.route.query.redirect) {
          this.showAlert = true
          this.formErrors = { form: this.$t('login.continue') }
        } else if (this.$store.state.route.query.logout === 'true') {
          this.showAlert = true
          this.formErrors = { form: this.$t('login.logout_successful') }
        }
      })
    }
  },

  methods: {
    submit () {
      if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
        this.showAlert = false
        this.loggingIn = true

        this.$api
          .post(
            '/login',
            this.model
          )
          .then((response: AxiosResponse) => {
            if (response.data.Success === 'false') {
              this.loggingIn = false
              this.showAlert = true
              this.formErrors = { form: this.$t('login.error') }
            } else {
              localStorage.setItem('id', response.data.id)
              localStorage.setItem('token', response.data.token)
              localStorage.setItem('username', response.data.username)
              localStorage.setItem('fullName', response.data.fullName)
              localStorage.setItem('roles', response.data.roles)

              this.$api.defaults.headers.common['Authorization'] =
                response.data.token

              this.$store
                .dispatch('LOGIN', {
                  id: response.data.id,
                  username: response.data.username,
                  fullName: response.data.fullName,
                  roles: response.data.roles
                })
                .then(res => {
                  if (this.$store.state.route.query.redirect) {
                    this.$router.push(this.$store.state.route.query.redirect)
                  } else {
                    this.$router.push('/')
                  }
                })
            }
          })
          .catch((error: AxiosError) => {
            console.log(error)
            this.loggingIn = false

            this.showAlert = true
            this.formErrors = { form: this.$t('website.error') }

            // TODO: Remove after testing
            localStorage.setItem('id', '')
            localStorage.setItem('token', 'ok')
            localStorage.setItem('username', 'jkirk')
            localStorage.setItem('fullName', 'Justin Kirk')
            localStorage.setItem('roles', JSON.stringify(['test_view']))

            this.$store.dispatch('LOGIN', {
              id: '',
              username: 'jkirk',
              fullName: 'Justin Kirk',
              roles: ['test_view']
            })
              .then(res => {
                if (this.$store.state.route.query.redirect) {
                  this.$router.push(this.$store.state.route.query.redirect)
                } else {
                  this.$router.push('/')
                }
              })
          })
      }
    }
  }
})
</script>
