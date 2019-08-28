const express = require('express');
const cors = require('cors');
const config = require('./config');
const path = require('path');
const mongoose = require('mongoose');
const sanitize = require('mongo-sanitize');
const helmet = require('helmet');

//// test 
const Product = require("./models/product.model");

const prod = {
  name: '3M Perfect-It III Fast Cut ZERO',
  description: 'A one-component aerosol primer-surfacer design for spot priming of sand through and small areas.',
  category: 'painting',
  instore: 6,
  img: 'https://apollo-ireland.akamaized.net/v1/files/eyJmbiI6Ind1dzh3eXEwc3c2eTItT1RPTU9UT1BMIiwidyI6W3siZm4iOiJ3ZzRnbnFwNnkxZi1PVE9NT1RPUEwiLCJzIjoiMTYiLCJwIjoiMTAsLTEwIiwiYSI6IjAifV19.hWPcdS9ZN8f3RgDA5UKvyaT9LBQxFgWSuWh_8iFpcv0/image;s=1080x720;cars_;/927376413_;slot=1;filename=eyJmbiI6Ind1dzh3eXEwc3c2eTItT1RPTU9UT1BMIiwidyI6W3siZm4iOiJ3ZzRnbnFwNnkxZi1PVE9NT1RPUEwiLCJzIjoiMTYiLCJwIjoiMTAsLTEwIiwiYSI6IjAifV19.hWPcdS9ZN8f3RgDA5UKvyaT9LBQxFgWSuWh+8iFpcv0_rev001.jpg',
  price: 134.50,
  labels: [ 'new', 'promotion' ],
  oldprice: 150
};
const product = new Product(prod);
product.save()
//// 

const app = express();

const productRoutes = require('./routes/product.routes');

app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
  req.body = sanitize(req.body);
  next();
});

// Routes
app.use('/api', productRoutes);

// Serve static files from the React app if production env
if(process.env === 'PRODUCTION') {
  app.use(express.static(path.join(__dirname, '/../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../client/build/index.html'));
});


// mongo
mongoose.connect(config.DB, { useNewUrlParser: true });
let db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', (err) => console.log('Error ' + err));
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);

const port = process.env.PORT || config.PORT;

app.listen(port , function () {
  console.log('Server is running on Port:', port);
});



