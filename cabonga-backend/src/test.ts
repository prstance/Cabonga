import { edenFetch } from '@elysiajs/eden'
import type { App } from './index'

const fetch = edenFetch<App>('http://localhost:8000')
const response = await fetch('/v1/token', {
  method: "POST",
  body: {
    username: "e",
    password: "e"
  }
})

console.log(response)