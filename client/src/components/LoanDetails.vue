<template>
  <v-layout fluid >
    <v-flex xs6 offset-xs3>
      <div class="white elevation-2">
       <v-toolbar fluid dense dark>
         <v-toolbar-title>Loan Details</v-toolbar-title>
       </v-toolbar>
       <div class="pl-4 pr-4 pt-2 pb-2">
         <br>
         <v-text-field
            dense
            label="Amount"
            type="number"
            min="1000"
            v-model="amount"
            @keypress="calculate"
            @change="calculate"
            required
            :rules='[rules_num]'
          ></v-text-field>
       <div class="full-width">
          <v-text-field
            dense
            label="Interest per annum(%)"
            type="number"
            min="2"
            v-model="interest"
            @keypress="calculate"
            @change="calculate"
            required
            :rules='[rules_num]'
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-text-field
            dense
            label="Duration (months)"
            type="number"
            min="3"
            v-model="duration"
            @keypress="calculate"
            @change="calculate"
            required
            :rules='[rules_num]'
          ></v-text-field>
       </div>
       <div class="full-width">
          <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="date"
                  label="Start date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  required
                  :rules='[rules]'
                ></v-text-field>
              </template>
              <v-date-picker
                ref="picker"
                v-model="date"
                no-title
                elevation="18"
                :min="new Date().toISOString().substr(0, 10)"
                @change="save"
              ><v-spacer></v-spacer>
                <v-btn
                  text
                  color="primary"
                  @click="menu = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.menu.save(date)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
            <v-spacer> </v-spacer>
          <v-select
          :items="items"
          label="Applying for customer"
          v-model="customer"
          required
          :rules='[rules]'
        ></v-select>
       </div>
       <div class="full-width disabled">
          <v-text-field
            dense
            label="Calculated EMI"
            v-model="emi"
            :readonly="true"
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-text-field
            dense
            label="Total Interest Calculated"
            v-model="total_int"
            :readonly="true"
          ></v-text-field>
       </div>
          <div class="error" dark v-html="error" />
          <v-btn
              v-if="$store.state.isAgent"
              dark
              class="green"
              @click="editLoan"
              >
              Edit
          </v-btn>
          <v-btn
              v-if="$store.state.isAgent"
              dark
              class="red"
              @click="deleteLoan"
              >
              Delete
          </v-btn>
          <v-btn
              v-if="$store.state.isAdmin"
              dark
              class="green"
              @click="approveLoan"
              >
              Approve
          </v-btn>
          <v-btn
              v-if="$store.state.isAdmin"
              dark
              class="red"
              @click="rejectLoan"
              >
              Reject
          </v-btn>
       </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import AgentService from '../services/AgentService'
import LoanService from '../services/LoanService'

export default {
  data () {
    return {
      date: '',
      menu: false,
      error: null,
      items: [],
      customer: '',
      amount: '',
      interest: '',
      duration: '',
      emi: '',
      total_int: '',
      loan: [],
      rules: (value) => !!value || 'Required',
      rules_num: (value) => {
        if (value < 0) return 'Invalid Entry'
        return !!value || 'Required'
      }
    }
  },
  async mounted () {
    try {
      const loanId = this.$store.state.route.params.id
      var details = await LoanService.loanDetails(loanId)
      this.loan = details.data
      if (this.loan) {
        this.amount = this.loan.amount
        this.interest = this.loan.interest
        this.duration = this.loan.duration
        this.emi = this.loan.emi
        this.total_int = this.loan.total_int
        this.date = this.loan.startDate
        this.customer = this.loan.appliedFor
      }

      if (this.$store.state.isAgent) {
        var customers = await AgentService.viewCustomers()
        customers.data.forEach(x => {
          this.items.push(x.username)
        })
      } else {
        this.items = [this.$store.state.user.username]
      }
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    calculate () {
      var p = this.amount
      var r = this.interest / (12 * 100)
      var n = this.duration

      this.emi = Math.floor((p * r * Math.pow((1 + r), n)) / (Math.pow((1 + r), n) - 1))
      this.total_int = (this.emi * n) - p
    },
    async editLoan () {
      if (this.amount === this.loan.amount &&
        this.interest === this.loan.interest &&
        this.duration === this.loan.duration &&
        this.emi === this.loan.emi &&
        this.total_int === this.loan.total_int &&
        this.date === this.loan.startDate &&
        this.customer === this.loan.appliedFor) {
        this.error = 'No changes found'
      } else {
        try {
          var updatedLoan = await LoanService.editLoan({
            applicant: this.$store.state.user.username,
            id: this.$store.state.route.params.id,
            appliedFor: this.customer,
            amount: this.amount,
            interest: this.interest,
            duration: this.duration,
            startDate: this.date,
            emi: this.emi,
            total_int: this.total_int,
            status: 'New'
          })
          this.loan = updatedLoan.data.loan
          this.error = 'Loan Updated'
        } catch (error) {
          console.log(error)
          this.error = error.response
        }
      }
    },
    async deleteLoan () {
      try {
        await LoanService.deleteLoan({
          applicant: this.$store.state.user.username,
          id: this.$store.state.route.params.id,
          status: 'New'
        })
        this.error = 'Loan Deleted Successfully'
        this.$router.push({name: 'viewLoans'})
      } catch (error) {
        console.log(error)
        this.error = error.response.data.error
      }
    },
    async approveLoan () {
      try {
        await LoanService.approveLoan(this.$store.state.route.params.id)
        this.error = 'Loan approved Successfully'
        this.$router.push({name: 'viewLoans'})
      } catch (error) {
        console.log(error)
        this.error = error.response.data.error
      }
    },
    async rejectLoan () {
      try {
        await LoanService.rejectLoan(this.$store.state.route.params.id)
        this.error = 'Loan Rejected'
        this.$router.push({name: 'viewLoans'})
      } catch (error) {
        console.log(error)
        this.error = error.response.data.error
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
  .full-width {
    display: inline-flex;
    width: 100%;
  }
</style>
