///////////// mongodb
const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

//const url = `mongodb+srv://peach:${password}@cluster0.pfg0ttv.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`
const url = process.env.MONGODB_URI
// replace hard codin url
// define when starting the application : MONGODB_URI="your_connection_string_here" npm run dev

mongoose.set('strictQuery',false)



mongoose.connect(url).then(result => {
    console.log('connected to MongoDB') // when the connection is successful
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })


  
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

// const Note = mongoose.model('Note', noteSchema) 

//format obj returned by mongoose; delete _id and __v feild
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// export the module for public interface
module.exports = mongoose.model('Note', noteSchema)
//////////////////////////