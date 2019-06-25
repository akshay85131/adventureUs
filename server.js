import express from 'express'
import bodyParser from 'body-parser'
import tripRoutes from './routes/route'
const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.json('hello')
})
app.use('/trip/createNewTrip', tripRoutes)

app.listen(PORT, () => {
  console.log(`Magic Happening on ${PORT}`)
})
