import { Store } from 'flux/utils'
import AppDispatcher from './Dispatcher'
import ActionTypes from './Constants'
import API from '../API.js'

class MyStore extends Store {

  constructor (props) {
    super(props)
    this.state = {
      messageArrived: [],
      connecting: false
    }
  }

  __onDispatch (action) {
    if (action.type === ActionTypes.CONNECTING) {
      API.MQTT(
        action.data.host,
        action.data.port,
        action.data.clientId
      )
      this.state.connecting = true
      this.__emitChange()
    }

    if (action.type === ActionTypes.MQTT_MESSAGE_ARRIVED) {
      this.state.messageArrived = [...this.state.messageArrived, action.data]
      this.__emitChange()
    }
  }

}

export default new MyStore(AppDispatcher)