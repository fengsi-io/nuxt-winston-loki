import axios from 'axios'

export default ({ req }, inject) => {
  const logGatewayCall = (level, message) => {
    try {
      const host = process.client
        ? window.location.origin
        : process.middlewareHost || new URL(req.headers.referer ||
          (/http/.test(req.headers.host)
            ? req.headers.host
            : `https://${req.headers.host}`)).origin

      axios.post(`${host.replace(/\/$/, '')}/_/log`, { message, level })
    } catch (error) {
      console.error(error)
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
