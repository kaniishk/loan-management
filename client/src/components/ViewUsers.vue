<template>
 <v-layout fluid class="pt-6">
    <v-flex>
      <div class="white elevation-2">
       <v-toolbar fluid dense dark>
         <v-toolbar-title>All Users</v-toolbar-title>
       </v-toolbar>
       <div class="pl-4 pr-4 pt-2 pb-2">
         <v-data-table
          :headers="headers"
          :items="users"
          :items-per-page="5"
          class="elevation-2"
          @click:row="viewUserDetails"
         ></v-data-table>
       </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import AdminService from '../services/AdminService'
import AgentService from '../services/AgentService'

export default {
  data () {
    return {
      headers: [
        {
          text: 'ID',
          align: 'start',
          value: 'id'
        },
        { text: 'Username', value: 'username', sortable: false },
        { text: 'Name', value: 'name', sortable: false },
        { text: 'Account Type', value: 'accType', sortable: false }
      ],
      users: []
    }
  },
  methods: {
    viewUserDetails (item) {
      this.$router.push({name: 'userDetails', params: {id: item.id}})
    }
  },
  async mounted () {
    try {
      if (this.$store.state.isAgent) {
        var customers = await AgentService.viewCustomers()
        this.users = customers.data
      }
      if (this.$store.state.isAdmin) {
        var agents = await AdminService.viewAgents()
        this.users = agents.data
      }
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
