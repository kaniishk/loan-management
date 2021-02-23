<template>
  <v-layout fluid >
    <v-flex xs6 offset-xs3>
      <div class="white elevation-2">
       <v-toolbar fluid dense dark>
         <v-toolbar-title>User Details</v-toolbar-title>
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
            autofill = false
          ></v-text-field>
          <v-radio-group v-model="accType" class="disabled"><strong>Account Type</strong>
            <v-radio label="Customer" value="Customer"></v-radio>
            <v-radio label="Agent" value="Agent"></v-radio>
          </v-radio-group>
          <div class="error" dark v-html="error" />
          <v-btn
              dark
              class="green"
              @click="editUser">
              Edit
          </v-btn>
          <v-btn
              dark
              class="red"
              @click="deleteUser">
              Delete
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
    async editUser () {
      
    }
  },
  async mounted () {
    try {
      const userId = this.$store.state.route.params.id
      var user = await AuthService.getUser(userId)
      if (user) {
        this.username = user.data.username
        this.name = user.data.name
      }
    } catch (err) {
      console.log(err)
      this.error = err.message
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
