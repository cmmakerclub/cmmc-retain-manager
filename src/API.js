import Paho from './libs/mqttws31'
import Dispatcher from './flux/Dispatcher'
import TypeActions from './flux/Constants'
let moment = require('moment-timezone')
moment.locale('th')

const API = {
  MQTT: (host, port, clientId) => {
    const mqtt = {
      hostname: host,
      port: parseInt(port),
      path: '/mqttws',
      clientId: clientId
    }

    const options = {
      useSSL: false,
      onSuccess: onConnect,
    }

    const client = new Paho.MQTT.Client(mqtt.hostname, mqtt.port, mqtt.path, mqtt.clientId)

    client.onConnectionLost = onConnectionLost
    client.onMessageArrived = onMessageArrived
    //client.connect({onSuccess: onConnect})
    client.connect(options)

    function onConnect () {
      client.subscribe('#')
    }

    function onConnectionLost (responseObject) {
      if (responseObject.errorCode !== 0) {
        console.log('onConnectionLost:' + responseObject.errorMessage)
        console.log('reconnecting mqtt.')
        client.connect(options)
      }
    }

    function onMessageArrived (message) {
      let data = {
        destinationName: message.destinationName,
        payloadString: message.payloadString,
        qos: message.qos,
        timestamp: moment().format('DD/MM/YYYY HH:mm:ss'),
        unix: moment.now()
      }

      Dispatcher.dispatch({
        type: TypeActions.MQTT_MESSAGE_ARRIVED,
        data: data
      })
    }
  },
}

export default API