const express = require('express');
const cors = require('cors');
const config = require('./config');
const path = require('path');
const mongoose = require('mongoose');
const sanitize = require('mongo-sanitize');
const helmet = require('helmet');

const app = express();

const productRoutes = require('./routes/product.routes');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');

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
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Serve static files from the React app if production env
if(process.env === 'PRODUCTION') {
  app.use(express.static(path.join(__dirname, '/../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../client/build/index.html'));
});


// mongo
mongoose.connect(config.DB, { useNewUrlParser: true, useCreateIndex: true });
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



