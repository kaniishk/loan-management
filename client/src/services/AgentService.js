import Api from '@/services/Api'

export default {
  viewCustomers () {
    return Api().get('viewCustomers')
  }
}
