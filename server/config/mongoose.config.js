const mongoose = require('mongoose');

const quotes_db = "quotesdb";

mongoose.connect(`mongodb://localhost/${quotes_db}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then( ()=> console.log(`Established connection to mongo db instance (${quotes_db})`) )
.catch( e => console.log(`Error connecting to ${quotes_db}: ${e}`) );

