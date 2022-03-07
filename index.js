import { resolve } from 'path'
import { createLogger } from 'winston'
import LokiTransport from 'winston-loki'

module.exports = function (moduleOptions) {
  const options = { host: 'http://localhost:3000', labels: { job: 'winston' } }

  process.middlewareHost = moduleOptions.middlewareHost

  this.addPlugin({
    src: resolve(__dirname, 'plugin.logger.js'),
    fileName: 'plugin.logger.js'
  })

  this.addPlugin({
    src: resolve(__dirname, 'plugin.listen-error.js'),
    fileName: 'listen-error.client.js'
  })

  this.addServerMiddleware({
    path: '/_/log',
    handler (req, res, next) {
      try {
        const logger = createLogger()

        logger.add(new LokiTransport({ ...options, ...moduleOptions }))

        req.on('data', (data) => {
          const { level, message } = JSON.parse(data)
          const value =
            typeof message === 'object' ? JSON.stringify(message) : message

          switch (level) {
            case 'warn':
              return logger.warn(value)
            case 'debug':
              return logger.debug(value)
            case 'info':
              return logger.info(value)
            case 'error':
              return logger.error(value)
          }
        })

        res.end()
      } catch (err) {
        next(err)
      }
    }
  })
}

module.exports.meta = require('./package.json')
