const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

app.use(express.json()); // use json
app.use(express.urlencoded({ extended:true })); // use url-encoding for encoding and decoding strings

require('./server/config/mongoose.config');
require('./server/routes/quotes.routes')(app); // routes takes the app as arg

const port = 8000;

app.listen(port, () => {
    console.log(port, `Started server on port: ${port}`);
});