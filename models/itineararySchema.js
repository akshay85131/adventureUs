const mongoose =require('mongoose')
const itineararySchema = new mongoose.Schema({
day : { type: Number },
date:{type: String},
location: { type: String },
activity: [{task: { type: String } } ]
})
const itinearary = mongoose.model('itinearary', itineararySchema)
module.exports =  itinearary
