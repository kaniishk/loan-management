<template>
 <v-layout fluid class="pt-6">
    <v-flex>
      <div class="white elevation-2">
       <v-toolbar fluid dense dark>
         <v-toolbar-title>All Loans History</v-toolbar-title>
       </v-toolbar>
       <div class="pl-4 pr-4 pt-2 pb-2">
         <v-data-table
          :headers="headers"
          :items="loans"
          :items-per-page="5"
          :key="id"
          class="elevation-2"
         ></v-data-table>
       </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import LoanService from '@/services/LoanService'

export default {
  data () {
    return {
      headers: [
        {
          text: 'ID',
          align: 'start',
          value: 'id'
        },
        { text: 'Applied For Customer', value: 'appliedFor', sortable: false },
        { text: 'Applied By', value: 'applicant', sortable: false },
        { text: 'Amount', value: 'amount' },
        { text: 'Interest p.a.(%)', value: 'interest' },
        { text: 'Duration(months)', value: 'duration' },
        { text: 'EMI', value: 'emi' },
        { text: 'Total Interest', value: 'total_int' },
        { text: 'Start Date', value: 'startDate' },
        { text: 'Status', value: 'status' }
      ],
      loans: []
    }
  },
  methods: {},
  async mounted () {
    try {
      if (this.$store.state.isAdmin || this.$store.state.isAgent) {
        var allLoans = await LoanService.viewAllLoans()
        this.loans = allLoans.data
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
