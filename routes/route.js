import express from 'express'
import { postNewTrip } from '../control/helpers'
const router = express.Router()

router.route('/trip')
  .post(postNewTrip)

export default router
