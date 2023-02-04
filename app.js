const express = require('express');
const mainRoutes = require('./src/routes/main');
const usersRoutes = require('./src/routes/users');
const productRoutes = require('./src/routes/product');

const productsAPIRouter = require('./src/routes/api/products')
const usersAPIRouter = require('./src/routes/api/users')

const path = require('path');
const methodOverride =  require('method-override');

const session = require("express-session");
const cookieParser = require('cookie-parser')

const cookieAuth = require('./src/middleware/cookieAuth')

const app = express();

app.use(session({
    secret: "Secreto",
    resave: false,
    saveUninitialized: false})) //resave y saveUninitialized es para configuración de la sesion y elimina un error en la terminal
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));  //se puede prescidir de este termino __dirname//
app.use(methodOverride('_method'))


app.listen(3000, ()=>{
    console.log('Servidor levantado');          
});

app.use('/', mainRoutes);
app.use('/products', productRoutes);
app.use('/users', usersRoutes);

app.use('/api/products',productsAPIRouter);
app.use('/api/users',usersAPIRouter);

app.use(cookieParser())
app.use(cookieAuth)

app.set('views', path.join(__dirname, '/src/views'))  ;
    
app.set('view engine', 'ejs');

app.get('/menu', (req,res)=>{
    res.sendFile(__dirname + '/views/menu.html');
})

