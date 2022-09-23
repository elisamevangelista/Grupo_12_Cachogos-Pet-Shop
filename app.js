const express = require('express');
const app = express();


const path = require('path')

app.use(express.static(path.join(__dirname, 'public')))  //se puede prescidir de este termino __dirname//



app.listen(3000, ()=>{
    console.log('Servidor levantado');
});


app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/views/index.html');
})

app.get('/productDetail', (req,res)=>{
    res.sendFile(__dirname + '/views/productDetail.html');
});