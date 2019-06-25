// you have to import model schema here

const postNewTrip = async (req, res) => {
  try {
    const Trip = {
      tripName: req.body.tripName,
      stratdate: req.body.startDate,
      enddate: req.body.endDate
    }
  } catch (error) {
    res.json(error)
  }
}

export { postNewTrip }
