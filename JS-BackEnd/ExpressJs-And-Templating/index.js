const express = require('express');
const app = express();
const hbs = require('express-handlebars');
const home = require('./src/home');
const catalogRouter = require('./src/catalog');

const handlebars = hbs.create({
    extname: '.hbs'
})
//app.engine('.hbs' , hbs.create({extname: '.hbs'}).engine)
app.use(express.urlencoded({ extended: true}));
app.use('/content', express.static('static'));
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs' );
app.get('/', home);
app.use('/catalog', catalogRouter);

app.listen(3000, () => console.log(`Express running on port: 3000`));