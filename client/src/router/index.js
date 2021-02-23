import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Register from '@/components/Register'
import Login from '@/components/Login'
import ViewUsers from '@/components/ViewUsers'
import ApplyLoan from '@/components/ApplyLoan'
import ViewLoans from '@/components/ViewLoans'
import LoanDetails from '@/components/LoanDetails'
import ViewAllLoans from '@/components/ViewAllLoans'
import UserDetails from '@/components/UserDetails'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: Home
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/viewUsers',
      name: 'viewUsers',
      component: ViewUsers
    },
    {
      path: '/viewUsers/:id',
      name: 'userDetails',
      component: UserDetails
    },
    {
      path: '/applyLoan',
      name: 'applyLoan',
      component: ApplyLoan
    },
    {
      path: '/viewLoans',
      name: 'viewLoans',
      component: ViewLoans
    },
    {
      path: '/viewLoans/:id',
      name: 'loanDetails',
      component: LoanDetails
    },
    {
      path: '/viewAllLoans',
      name: 'viewAllLoans',
      component: ViewAllLoans
    }
  ]
})
