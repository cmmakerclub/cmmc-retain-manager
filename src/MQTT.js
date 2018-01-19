import Paho from './libs/mqttws31'
import Dispatcher from './flux/Dispatcher'
import TypeActions from './flux/Constants'

let moment = require('moment-timezone')
moment.locale('th')

export default (init) => {

  console.log(init)

  const mqtt = {
    hostname: init.host,
    port: parseInt(init.port),
    path: '/mqttws',
    clientId: init.clientId
  }

  let options = {
    useSSL: false,
    cleanSession: true,
    onSuccess: onConnect
  }

  const client = new Paho.MQTT.Client(mqtt.hostname, mqtt.port, mqtt.path, mqtt.clientId)

  client.onConnectionLost = onConnectionLost
  client.onMessageArrived = onMessageArrived
  //client.connect({onSuccess: onConnect})

  if (init.username || init.password) {
    options.userName = init.username
    options.password = init.password
  }

  client.connect(options)

  function onConnect () {
    Dispatcher.dispatch({
      type: TypeActions.MQTT_CONNECTION_SUCCESS,
      data: true
    })
    client.subscribe(init.topic)
  }

  function onConnectionLost (responseObject) {
    if (responseObject.errorCode !== 0) {
      setTimeout(() => {
        console.log('onConnectionLost:' + responseObject.errorMessage)
        console.log('reconnecting mqtt.')
        client.connect(options)
      }, 3000)
    }
  }

  function onMessageArrived (message) {

    console.log(message.payloadString)

    let data = {
      destinationName: message.destinationName,
      payloadString: message.payloadString,
      qos: message.qos,
      timestamp: moment().format('DD/MM/YYYY HH:mm:ss'),
      unix: moment.now(),
      retained: message.retained
    }

    Dispatcher.dispatch({
      type: TypeActions.MQTT_MESSAGE_ARRIVED,
      data: data
    })
  }
}