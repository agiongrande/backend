const fs = require('fs');
const express = require('express');
const app = express();
const rutas = require('./rutas/');
const puerto = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/api',rutas);

app.listen(puerto,(error)=>{
    if (!error){
        console.log("Servidor escuchando puerto " + puerto)
    } else{
        console.log("Hubo un error: " + error)    
    }
})




