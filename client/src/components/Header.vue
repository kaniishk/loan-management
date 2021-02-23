<template>
  <v-toolbar fixed class="cyan" dark>
    <v-toolbar-title class="mr-4">
        <span
         class="home"
         @click="navigateTo({name:'root'})">
         LOAN
        </span>
    </v-toolbar-title>
    <v-toolbar-items>
       <v-btn
         v-if="$store.state.isUserLoggedIn"
         class="cyan"
         dark
         @click="viewHistory">
         History
        </v-btn>
    </v-toolbar-items>
    <v-spacer />
    <v-toolbar-items>
        <v-btn
         v-if="$store.state.isUserLoggedIn"
         class="cyan"
         dark>
         Hi, {{$store.state.user.name}}
        </v-btn>
        <v-btn
         v-if="!$store.state.isUserLoggedIn"
         class="cyan"
         dark
         @click="navigateTo({name:'login'})">
         Login
        </v-btn>
        <v-btn
         v-if="$store.state.isUserLoggedIn"
         class="cyan"
         dark
         @click="logout">
         Log Out
        </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({name: 'root'})
    },
    viewHistory () {
      if (this.$store.state.isAdmin || this.$store.state.isAgent) {
        this.$router.push({name: 'viewAllLoans'})
      } else {
        this.$router.push({name: 'viewLoans'})
      }
    }
  }
}
</script>

<style scoped>
.home {
 cursor: pointer;
}
.dispName {
 text-align: center;
 align-items: center;
 font-size: 1.3rem;
 padding: 1rem;
}
</style>
