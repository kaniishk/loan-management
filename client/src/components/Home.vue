<template>
  <v-layout fluid >
    <v-flex xs6 offset-xs3>
      <div class="white elevation-2">
       <v-toolbar fluid dense dark>
         <v-toolbar-title>Welcome To Loan Management System</v-toolbar-title>
       </v-toolbar>
       <div
        v-if="$store.state.isUserLoggedIn"
        class="pl-4 pr-4 pt-2 pb-2 content">
        <div
         v-if="$store.state.isAdmin"
         class='pt-4 pb-4 innerbox'>
        <h3>Approve/Reject Loans</h3>
        <v-spacer />
          <v-btn
              dark
              class="cyan"
              @click="viewLoans">
              View
          </v-btn>
        </div>
        <div
         v-if="$store.state.isAdmin"
         class='pt-4 pb-4 innerbox'>
        <h3>View Agents</h3>
        <v-spacer />
          <v-btn
              dark
              class="cyan"
              @click="viewAgents">
              View
          </v-btn>
        </div>
        <div
         v-if="$store.state.isAdmin"
         class='pt-4 pb-4 innerbox'>
        <h3>Create Agent Account</h3>
        <v-spacer />
          <v-btn
              dark
              class="cyan"
              @click="createAgent">
              Create
          </v-btn>
        </div>
        <div
         v-if="$store.state.isAgent"
         class='pt-4 pb-4 innerbox'>
        <h3>Apply loan for customer</h3>
        <v-spacer />
          <v-btn
              dark
              class="cyan"
              @click="applyLoan">
              Apply
          </v-btn>
        </div>
        <div
         v-if="$store.state.isAgent"
         class='pt-4 pb-4 innerbox'>
        <h3>View Customers</h3>
        <v-spacer />
          <v-btn
              dark
              class="cyan"
              @click="viewCustomers">
              View
          </v-btn>
        </div>
        <div
         v-if="$store.state.isAgent"
         class='pt-4 pb-4 innerbox'>
        <h3>Create Customer Account</h3>
        <v-spacer />
          <v-btn
              dark
              class="cyan"
              @click="createCustomer">
              Create
          </v-btn>
        </div>
        <div
         v-if="!$store.state.isAgent && !$store.state.isAdmin"
         class='pt-4 pb-4 innerbox'>
        <h3>Apply Loan</h3>
        <v-spacer />
          <v-btn
              dark
              class="cyan"
              @click="applyLoan">
              Apply
          </v-btn>
        </div>
         <div
         v-if="!$store.state.isAgent && !$store.state.isAdmin"
         class='pt-4 pb-4 innerbox'>
        <h3>View My Loans Applied</h3>
        <v-spacer />
          <v-btn
              dark
              class="cyan"
              @click="viewLoans">
              View
          </v-btn>
        </div>
      </div>
       <p
        class="pt-4 pb-4"
        v-if="!$store.state.isUserLoggedIn">
        Please Log in to Continue</p>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  methods: {
    approveLoans () {
      this.$router.push({name: 'approveLoans'})
    },
    viewAgents () {
      this.$router.push({name: 'viewUsers'})
    },
    viewCustomers () {
      this.$router.push({name: 'viewUsers'})
    },
    createAgent () {
      this.$router.push({name: 'register'})
    },
    createCustomer () {
      this.$router.push({name: 'register'})
    },
    applyLoan () {
      this.$router.push({name: 'applyLoan'})
    },
    viewLoans () {
      this.$router.push({name: 'viewLoans'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .content {
   display: flexbox;
 }

 .innerbox {
   border: .1rem solid whitesmoke;
   display: inline-flex;
   width: 100%;
   align-items: center;
   padding: 0.4rem;
   margin-top: .4rem;
 }
</style>
