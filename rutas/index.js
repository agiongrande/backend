const {Router} = require('express');
const router = Router();
const { Producto } = require('./container/product');
const { Carrito } = require('./container/cart');
let userAdmin = false;
noAdmin = 'Página solo disponible para administradores'

const archivo = new Producto();
const carrito = new Carrito();

router.post('/carrito', (req,res) => {
    carrito.create();
    res.sendStatus(201);
})

router.delete('/carrito/:id', (req,res) => {
    carrito.deleteById(req.params.id).then((carro)=>{
        if (carro == false){
            res.status(500).send({ error: 'Carrito no encontrado!' });
        } else {
            res.sendStatus(200);
        }
    });
})

router.get('/carrito/:id/productos', (req,res) => {
    carrito.getAllProducts((req.params.id)).then((carrito)=>{
        res.json(carrito);
    });
})

router.post('/carrito/:id/productos', (req,res) => {
    const { idproducto } = req.body;
    let idCarrito = req.params.id
    archivo.getById(idproducto).then((productos)=>{
        if (productos == false){
            res.status(500).send({ error: 'Producto no encontrado!' });
        } else {
            carrito.addToCart(idCarrito,productos)
            res.sendStatus(200);
        }
   });
})

router.delete('/carrito/:id/productos/:id_prod', (req,res) => {
    let idCarrito = req.params.id
    let idProducto = req.params.id_prod
    carrito.deleteProdById(idCarrito,idProducto).then((carrito)=>{    
        if (productos == false){
            res.status(500).send({ error: 'Error al eliminar un producto del carrito' });
        } else {
            res.json(carrito);
        }
    });
})

router.get('/productos', (req,res) => {
    archivo.getAll().then((productos)=>{
        res.json(productos);
    });
})

router.get('/productos/:id', (req,res) => {    
      archivo.getById(req.params.id).then((productos)=>{
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
    archivo.save({nombre, precio, foto, stock, codigo,descripcion});
    res.sendStatus(201);
})

router.put('/productos/:id', (req,res) => {
    if (userAdmin == false){
        return res.status(500).send({ error: noAdmin });
    }
    let id = req.params.id
    archivo.getById(id).then((productos)=>{
        if (productos == false){
            res.status(500).send({ error: 'Producto no encontrado!' });
        } else {
            const { nombre, precio, foto, stock, codigo, descripcion } = req.body;
            archivo.actualizate({nombre, precio, foto, stock, codigo, descripcion, id});
            res.sendStatus(200);
        }
   });
})

router.delete('/productos/:id', (req,res) => {
    if (userAdmin == false){
        return res.status(500).send({ error: noAdmin });
    }
    archivo.deleteById(req.params.id).then((productos)=>{
        if (productos == false){
            res.status(500).send({ error: 'Producto no encontrado!' });
        } else {
            res.sendStatus(200);
        }
    });
})

module.exports = router;