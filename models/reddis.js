
import { createClient } from 'redis'
import { redis as _redis } from './config'

const client = createClient(_redis)

export default client
