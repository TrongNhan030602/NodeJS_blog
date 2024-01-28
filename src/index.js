const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');

const app = express();
const port = 3000;
const route = require('./routes'); //Nap phia ngoai
const db = require('./config/db');

// Connect to DB
db.connect();

app.use(express.static(path.join(__dirname, 'public'))); //static file--> public
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

// Override
app.use(methodOverride('_method'));

// HTTP logger
app.use(morgan('combined'));

// Template engine
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Routes innit
route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
