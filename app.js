const express = require('express');
const mainRoutes = require('./src/routes/main');
const app = express();

const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));  //se puede prescidir de este termino __dirname//


app.listen(3000, ()=>{
    console.log('Servidor levantado');
});

app.use('/', mainRoutes);

app.set('views', path.join(__dirname, '/src/views'));

app.set('view engine', 'ejs');

//const producto = require('./src/routes/producto.js');