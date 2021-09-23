const express = require('express');
const expressHandlebars = require('express-handlebars')
const connectDB = require('./config/db');
// Import router
const posts = require('./routes/posts');
// Method override
const methodOverride = require('method-override')
// Start app
const app = express();

// Start express middleware
app.use(express.json());
// Start body parser middleware
app.use(express.urlencoded({ extended: true }))

// Start Handlebars middleware
app.engine('handlebars', expressHandlebars());
app.set('view engine', 'handlebars');

// Start methodOverride
app.use(methodOverride('_method'));

// Connect to database
connectDB();

// Some router we can move into routes folder
app.get('/', (req, res) => res.render('index'));
app.get('/about', (req, res) => res.render('about'));
// Get routers to use
app.use('/posts', posts)

const PORT = 5000;
app.listen(PORT, () => console.log(`Server start at port ${PORT}`));