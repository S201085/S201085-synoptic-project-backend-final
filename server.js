const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();
// =================================================================================================
//                                       Web Server Configuration
// =================================================================================================
const app = express();
app.use(cors({
  credentials: false,
  origin: 'https://jordanshaddick.uosweb.co.uk',
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  exposedHeaders: 'Origin,Accept,X-Requested-With,Content-Type,content-type,visibility,number-required,x-access-token,get-by,delete-by',
  allowedHeaders: 'Origin,Accept,X-Requested-With,Content-Type,content-type,visibility,number-required,x-access-token,get-by,delete-by',

})); // Use this after the variable declaration
app.use(express.json());
app.use(express.urlencoded());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://jordanshaddick.uosweb.co.uk');
  //   res.setHeader('Access-Control-Allow-Credentials', 'true');
  //   res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  // eslint-disable-next-line max-len
  //   res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, content-type, visibility, Access-Control-Request-Method, Access-Control-Request-Headers');
  next();
});
// =================================================================================================
//                                            API Routes
// =================================================================================================
app.use('/api/species', require('./routes/species.route'));
app.use('/api/user', require('./routes/user.route'));
app.use('/api/sighting', require('./routes/sighting.route'));
app.use('/api/survey', require('./routes/survey.route'));
app.use('/api/admin', require('./routes/admin.route'));
app.use('/api/register', require('./routes/signup.route'));
app.use('/api/login', require('./routes/signin.route'));
// =================================================================================================
//                                           MongoAtlas Config
// =================================================================================================
mongoose.connect(process.env.MONGOURL);
const { connection } = mongoose;
connection.once('open', () => {
  // eslint-disable-next-line no-console
  console.log('MongoDB Atlas database connection established successfully');
});
// =================================================================================================
//                                           Web Server Init
// =================================================================================================
app.listen(process.env.PORT, (err) => {
  if (err) throw err;
  // eslint-disable-next-line no-console
  console.info(`> Ready on http://localhost:${process.env.PORT}`);
});
