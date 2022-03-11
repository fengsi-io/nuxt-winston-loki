import axios from 'axios'

export default ({ req }, inject) => {
  const logGatewayCall = (level, message) => {
    try {
      axios.post(`${window.location.origin}/_/log`, { message, level })
    } catch (error) {
      console.log(error)
    }
  }

  const logger = {
    warn: message => logGatewayCall('warn', message),
    debug: message => logGatewayCall('debug', message),
    info: message => logGatewayCall('info', message),
    error: message => logGatewayCall('error', message)
  }

  inject('log', logger)
}
