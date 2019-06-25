// you have to import model schema here
import Redis from 'ioredis'
const redis = new Redis()
const JSONCache = require('redis-json')
const jsonCache = new JSONCache(redis, { prefix: 'cache:' })

const postNewTrip = async (req, res) => {
  try {
    const Trip = {
      tripName: req.body.tripName,
      stratdate: req.body.startDate,
      enddate: req.body.endDate
    }
    await jsonCache.set('tripName', Trip)
  } catch (error) {
    res.json(error)
  }
}

export { postNewTrip }
