const express = require('express');
const app = express();
const config = require('config');
const mongoose = require('mongoose');
const cors = require('cors');
const errorHandler = require('./middleware/error');
const path = require('path');

// Middleware
app.use(express.json());
app.use(cors());

//db connect
const db = config.get('mongoURI');

mongoose
    .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => console.log('mongoDB connected....'))
    .catch(err => console.log(err));

//Use routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/private', require('./routes/api/private'));

//Error handler
app.use(errorHandler);

//serve static assets if in production
if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
}

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

