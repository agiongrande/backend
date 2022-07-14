const express = require('express');
const app = express();
const puerto = 8080;
const { Server: IOServer } = require('socket.io');
const path = require('path')
const { Contenedor, Mensajes } = require('./products/contenedor');
const {createProductTable, createMessageTable} = require('../create_product_table')

app.use(express.static(path.join(__dirname, '../public')));



const expressServer = app.listen(puerto,(error)=>{
    if (!error){
        console.log("Servidor escuchando puerto " + puerto)
    } else{
        console.log("Hubo un error: " + error)    
    }
})

//createProductTable();
//createMessageTable();

const productosDB = require('../database').mySQLConnection;
const archivo = new Contenedor(productosDB, 'products');
const messagesDB = require('../database').sqliteConnection;
const chat = new Mensajes(messagesDB, 'messages');

const io = new IOServer(expressServer);

io.on('connection', async socket => {
    console.log('Nueva conexión: ', socket.id);

    let productos = await archivo.getAll();
    let messages = await chat.getAll();

    io.emit('server:productos', productos);
    
    socket.on('cliente:producto', async productInfo => {
        await archivo.save(productInfo);
        productos = await archivo.getAll();

        io.emit('server:productos', productos);
    })

    io.emit('server:chat', messages);
    
    socket.on('cliente:chat', async messageInfo => {
        await chat.save(messageInfo);
        messages = await chat.getAll();

        io.emit('server:chat', messages);
    })
})




