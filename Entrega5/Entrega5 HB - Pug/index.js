const express = require('express');
const app = express();
const rutas = require('./rutas/');
const puerto = 8080;
const {engine} = require('express-handlebars')
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/api',rutas);

app.set('views', path.join(__dirname,'./views'))
app.set('view engine','pug')


app.listen(puerto,(error)=>{
    if (!error){
        console.log("Servidor escuchando puerto " + puerto)
    } else{
        console.log("Hubo un error: " + error)    
    }
})




