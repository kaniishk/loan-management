import Api from '@/services/Api'

export default {
  applyLoan (details) {
    return Api().post('applyLoan', details)
  },
  viewNewLoans () {
    return Api().get('viewNewLoans')
  },
  viewAllLoans () {
    return Api().get('viewAllLoans')
  },
  viewMyLoans (username) {
    return Api().get(`viewMyLoans/${username}`)
  },
  loanDetails (loanId) {
    return Api().get(`loanDetails/${loanId}`)
  },
  editLoan (details) {
    return Api().put('editLoan', details)
  },
  deleteLoan (details) {
    return Api().post('deleteLoan', details)
  },
  approveLoan (loanId) {
    return Api().put(`approveLoan/${loanId}`)
  },
  rejectLoan (loanId) {
    return Api().put(`rejectLoan/${loanId}`)
  }
}
