const express = require('express');
const hbs = require('express-handlebars');
const { home } = require('./controllers/home');
const { about } = require('./controllers/about');
const create = require('./controllers/create');
const { details } = require('./controllers/details');
const { notFound } = require('./controllers/notFound');
const  edit = require('./controllers/edit');
const deleteProduct = require('./controllers/delete');

const carService  = require('./services/car');
const app = express();

app.engine('.hbs', hbs.create({
    extname: '.hbs'
}).engine);
app.set('view engine', '.hbs');
app.use(express.urlencoded({extended: true}));
app.use('/static', express.static('static'));

app.use(carService());
app.get('/', home);
app.get('/about', about);
app.route('/create')
    .get(create.get)
    .post(create.post);
app.get('/details/:id', details)
app.route('/edit/:id')
.get(edit.get)
.post(edit.post);
app.route('/delete/:id')
.get(deleteProduct.get)
.post(deleteProduct.post);

app.all('*', notFound)


app.listen(3000, () => console.log('Server started on port 3000'));