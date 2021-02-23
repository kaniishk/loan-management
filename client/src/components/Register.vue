<template>
  <v-layout fluid >
    <v-flex xs6 offset-xs3>
      <div class="white elevation-2">
       <v-toolbar fluid dense dark>
         <v-toolbar-title>Register</v-toolbar-title>
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
            label="Name"
            v-model="name"
          ></v-text-field>
          <v-text-field
            dense
            label="Password"
            type="password"
            v-model="password"
          ></v-text-field>
          <v-radio-group v-model="accType" class="disabled"><strong>Account Type</strong>
            <v-radio label="Customer" value="Customer"></v-radio>
            <v-radio label="Agent" value="Agent"></v-radio>
          </v-radio-group>
          <div class="error" dark v-html="error" />
          <v-btn
              dark
              class="cyan"
              @click="register">
              Register
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
      name: '',
      accType: this.$store.state.isAdmin ? 'Agent' : 'Customer',
      password: '',
      error: null
    }
  },
  methods: {
    async register () {
      try {
        await AuthService.register({
          username: this.username,
          name: this.name,
          accType: this.accType,
          password: this.password
        })
        this.$router.push({name: 'login'})
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

 .disabled {
      pointer-events:none;
      cursor: not-allowed;
      background-image: none;
      border-color: #d1dbe5;
    }
</style>
