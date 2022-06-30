const express = require('express');
const app = express();
const puerto = 8080;
const { Server: IOServer } = require('socket.io');
const path = require('path')
const { Contenedor, Mensajes } = require('./products/contenedor');

app.use(express.static(path.join(__dirname, '../public')));


const expressServer = app.listen(puerto,(error)=>{
    if (!error){
        console.log("Servidor escuchando puerto " + puerto)
    } else{
        console.log("Hubo un error: " + error)    
    }
})






archivo = new Contenedor;
chat = new Mensajes;

productos = archivo.productos;


const io = new IOServer(expressServer);

io.on('connection', async socket => {
    mensajes = await chat.getAll();
    console.log("se conecto");
    socket.emit('server:productos', productos)
    socket.emit('server:chat', mensajes)
    socket.on('cliente:producto',producto => {
        archivo.save(producto).then((productos)=>{
            io.emit('server:productos', productos)
        }
    )})
    socket.on('cliente:chat',mensaje => {
        const timeStamp = new Date();
        const localTs = timeStamp.toLocaleString("fr-FR");
        const newMsg = {...mensaje, fechayhora: localTs}
        mensajes.push(newMsg);
        chat.save(mensajes);
        io.emit('server:chat', mensajes)
    })
})



