const {Router} = require('express');
const router = Router();
const { Producto } = require('./container/product');
const { Carrito } = require('./container/cart');

import { DaoProducto, DaoCarrito } from "../daos/index";

let userAdmin = true;
noAdmin = 'Página solo disponible para administradores'

const archivo = new Producto();
const carrito = new Carrito();

router.post('/carrito', (req,res) => {
    DaoCarrito.create();
    res.sendStatus(201);
})

router.delete('/carrito/:id', (req,res) => {
    DaoCarrito.deleteById(req.params.id).then((carro)=>{
        if (carro == false){
            res.status(500).send({ error: 'Carrito no encontrado!' });
        } else {
            res.sendStatus(200);
        }
    });
})



router.get('/productos', (req,res) => {
    DaoProducto.getAll().then((productos)=>{
        res.json(productos);
    });
})

router.get('/productos/:id', (req,res) => {    
    DaoProducto.getById(req.params.id).then((productos)=>{
            if (productos == false){
                res.status(500).send({ error: 'Producto no encontrado!' });
            } else {
                res.json(productos);
            }
       });
})

router.post('/productos', (req,res) => {
    if (userAdmin == false){
        return res.status(500).send({ error: noAdmin });
    }
    const { nombre, precio, foto, stock, codigo, descripcion } = req.body;
    DaoProducto.save({nombre, precio, foto, stock, codigo,descripcion});
    res.sendStatus(201);
})

router.put('/productos/:id', (req,res) => {
    if (userAdmin == false){
        return res.status(500).send({ error: noAdmin });
    }
    let id = req.params.id
    DaoProducto.getById(id).then((productos)=>{
        if (productos == false){
            res.status(500).send({ error: 'Producto no encontrado!' });
        } else {
            const { nombre, precio, foto, stock, codigo, descripcion } = req.body;
            DaoProducto.actualizate({nombre, precio, foto, stock, codigo, descripcion, id});
            res.sendStatus(200);
        }
   });
})

router.delete('/productos/:id', (req,res) => {
    if (userAdmin == false){
        return res.status(500).send({ error: noAdmin });
    }
    DaoProducto.deleteById(req.params.id).then((productos)=>{
        if (productos == false){
            res.status(500).send({ error: 'Producto no encontrado!' });
        } else {
            res.sendStatus(200);
        }
    });
})

module.exports = router;