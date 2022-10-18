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

<<<<<<< HEAD
app.get('/productDetail', (req,res)=>{
    res.sendFile(__dirname + '/views/productDetail.html');
});

app.get('/register', (req,res)=>{
    res.sendFile(__dirname + '/views/register.html');
});

app.get('/login', (req,res)=>{
    res.sendFile(__dirname + '/views/login.html');
});

app.get('/carrito', (req,res)=>{
    res.sendFile(__dirname + '/views/carrito.html');
})

app.get('/test', (req,res)=>{
    res.sendFile(__dirname + '/views/test.html');
})

app.get('/menu', (req,res)=>{
    res.sendFile(__dirname + '/views/menu.html');
})

app.get('/creacionproducto', (req,res)=>{
    console.log('__dirname ==> ', __dirname);
    res.sendFile(__dirname + '/src/views/creacionproducto.html');

})



//const main = require('./src/routes/main.js');
=======
app.set('view engine', 'ejs');
>>>>>>> 8a9d1155ef6ec8dea1814368358847fb0e33b807

//const producto = require('./src/routes/producto.js');