const express = require('express');
const app = express();
const rutas = require('./rutas/');
const puerto = 8080;
const {engine} = require('express-handlebars')
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/api',rutas);
app.use('/html',express.static('public'));
app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: path.join(__dirname, './views/layout/main.hbs'),
    layoutsDir: path.join(__dirname, './views/layout'),
    partialsDir: path.join(__dirname, './views/partials')
}))

app.set('views', path.join(__dirname,'./views'))
app.set('view engine','hbs')


app.listen(puerto,(error)=>{
    if (!error){
        console.log("Servidor escuchando puerto " + puerto)
    } else{
        console.log("Hubo un error: " + error)    
    }
})




