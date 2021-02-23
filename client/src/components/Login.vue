<template>
  <v-layout fluid >
    <v-flex xs6 offset-xs3>
      <div class="white elevation-2">
       <v-toolbar fluid dense dark>
         <v-toolbar-title>Login</v-toolbar-title>
       </v-toolbar>
       <div class="pl-4 pr-4 pt-2 pb-2">
         <br>
         <v-text-field
            dense
            label="Username"
            v-model="username"
          ></v-text-field>
          <v-text-field
            dense
            label="Password"
            type="password"
            v-model="password"
          ></v-text-field>
          <div class="error" dark v-html="error" />
          <v-btn
              dark
              class="cyan"
              @click="login">
              Login
          </v-btn>
       </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthService from '@/services/AuthService'

export default {
  data () {
    return {
      username: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        const res = await AuthService.login({
          username: this.username,
          password: this.password
        })
        this.$store.dispatch('setToken', res.data.token)
        this.$store.dispatch('setUser', res.data.user)
        this.$router.push({name: 'root'})
      } catch (error) {
        this.error = error.response.data.error
        console.log(error)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .error{
   color: white;
 }
</style>
