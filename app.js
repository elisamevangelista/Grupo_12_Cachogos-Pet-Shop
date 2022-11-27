const express = require('express');
const mainRoutes = require('./src/routes/main');
const usersRoutes = require('./src/routes/users');
const productRoutes = require('./src/routes/product');
const path = require('path');
const methodOverride =  require('method-override');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));  //se puede prescidir de este termino __dirname//
app.use(methodOverride('_method'))

app.listen(3000, ()=>{
    console.log('Servidor levantado');          
});

app.use('/', mainRoutes);
app.use('/products', productRoutes);
app.use('/users', usersRoutes);

app.set('views', path.join(__dirname, '/src/views'))  ;
    


app.set('view engine', 'ejs');

//const producto = require('./src/routes/producto.js');



app.get('/menu', (req,res)=>{
    res.sendFile(__dirname + '/views/menu.html');
})
