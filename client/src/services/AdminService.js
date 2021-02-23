import Api from '@/services/Api'

export default {
  viewAgents () {
    return Api().get('viewAgents')
  }
}
