<template>
  <v-layout fluid >
    <v-flex xs6 offset-xs3>
      <div class="white elevation-4">
       <v-toolbar fluid dense dark class="elevation-4">
         <v-toolbar-title >Apply Loan</v-toolbar-title>
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
              dark
              class="cyan"
              @click="applyLoan"
              >
              Apply
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
      rules: (value) => !!value || 'Required',
      rules_num: (value) => {
        if (value < 0) return 'Invalid Entry'
        return !!value || 'Required'
      }
    }
  },
  async mounted () {
    try {
      if (this.$store.state.isAgent) {
        var customers = await AgentService.viewCustomers()
        customers.data.forEach(x => {
          this.items.push(x.username)
        })
      }
      if (!this.$store.state.isAdmin && !this.$store.state.isAgent) {
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
    async applyLoan () {
      try {
        if (this.amount > 0 && this.interest > 0 && this.duration > 0 && !isNaN(this.emi) && this.customer) {
          await LoanService.applyLoan({
            applicant: this.$store.state.user.username,
            appliedFor: this.customer,
            amount: this.amount,
            interest: this.interest,
            duration: this.duration,
            startDate: this.date,
            emi: this.emi,
            total_int: this.total_int
          })
        } else {
          this.error = 'Enter valid details'
        }
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
  .full-width {
    display: inline-flex;
    width: 100%;
  }
</style>
