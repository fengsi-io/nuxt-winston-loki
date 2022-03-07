import Vue from 'vue'

export default ({ app }) => {
  Vue.config.errorHandler = (error, vm, info) => {
    setTimeout(function () {
      app.$log.error({ error, vm, info, href: window.location.href })
    }, 500)
  }

  window.addEventListener('unhandledrejection', (e) => {
    setTimeout(function () {
      app.$log.error({ error: e.reason.message, href: window.location.href })
    }, 500)
  })
}
