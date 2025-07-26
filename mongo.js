// const mongoose = require('mongoose')

// if (process.argv.length < 3) {
//   console.log('give password as argument')
//   process.exit(1)
// }

// const password = process.argv[2]

// const url = `mongodb+srv://peach:${password}@cluster0.pfg0ttv.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`
// // note that 'peach' is the username, 'noteApp' is the database name


// mongoose.set('strictQuery',false)

// mongoose.connect(url) // connect to the database online


// // Mongoose- define the schema of a note to store in noteSchema variable
// const noteSchema = new mongoose.Schema({
//   content: String,
//   important: Boolean,
// })

// const Note = mongoose.model('Note', noteSchema) 
// // obj name = Note, model aka construtor = noteSchema

// // Note => singular name of the model
// // notes => name of the collections

// const note = new Note({
//     content: "GET :> and POST are the most important methods of HTTP protocol",
//     important: true
// })



// //find method to retrieve the doc from the collection
// // Note.find({important: true}).then(result => {
// //   result.forEach(note => {
// //     console.log(note)
// //   })
// //   mongoose.connection.close()
// // })



// // save method with the event handler 'then'
// note.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close() // close the database connection
// })



