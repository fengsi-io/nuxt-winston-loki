# nuxt-winston-loki

## Setup

1. Add `@fengsi-io/nuxt-winston-loki` dependency to your project

```bash
yarn add @fengsi-io/nuxt-winston-loki # or npm install @fengsi-io/nuxt-winston-loki
```

2. Add `@fengsi-io/nuxt-winston-loki` to the `modules` section of `nuxt.config.js`

```js
export default {

  modules: [
    ['@fengsi-io/nuxt-winston-loki', {
      /* module options */
      host: process.env.LOKI_HOST,
      basicAuth: process.env.LOKI_BASIC_AUTH,
      labels: { job: "winston" },
    }]
  ]
}
```
