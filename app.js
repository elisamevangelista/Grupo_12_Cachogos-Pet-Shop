const express = require('express');
const mainRoutes = require('./src/routes/main');
const productRoutes = require('./src/routes/product');

const path = require('path');

const app = express();

app.use(express.static('public'));  //se puede prescidir de este termino __dirname//


app.listen(3000, ()=>{
    console.log('Servidor levantado');
});

app.use('/', mainRoutes);
app.use('/', productRoutes);

app.set('views', path.join(__dirname, '/src/views'))  ;
// app.set('views', path.join(__dirname, '/src/views/users'));   //PREGUNTARRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR!!!!!);


app.set('view engine', 'ejs');

//const producto = require('./src/routes/producto.js');



app.get('/menu', (req,res)=>{
    res.sendFile(__dirname + '/views/menu.html');
})
