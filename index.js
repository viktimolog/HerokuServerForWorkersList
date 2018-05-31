const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const mongoose = require('mongoose');
const bodyParcer = require('body-parser');

const workers = require('./routes/api/workers');

const app = express();

// Body parcer middleware
app.use(bodyParcer.urlencoded({extended: false}));
app.use(bodyParcer.json());

// DB config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Use Routes
app.use('/api/workers', workers);

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/pages', (req, res) => res.render('pages/index'))
app.get('/', (req, res) => res.send('This server was created for the client application https://github.com/viktimolog/WorkersList'))

app.listen(PORT, () => console.log(`Listening on ${PORT}`))
