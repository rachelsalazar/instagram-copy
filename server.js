const express = require('express');
const mongoose = require('mongoose');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');
const users = require('./routes/api/users');
const bodyParser = require('body-parser');
const passport = require('passport');


const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Db configuration
const db = require('./config/keys').mongoURI;
mongoose.connect(db).then(() => console.log('MongoDb connected')).catch(err => console.log(err));

//Passport middleware
app.use(passport.initialize());

//Passport configuration
require('./config/passport')(passport);

app.get('/', (req, res) => res.send('Hello world'));

app.use('/api/posts', posts);
app.use('/api/profile', profile);
app.use('/api/users', users);

const port = 5005;
app.listen(port, () => console.log(`Server is running on port ${port}`));
