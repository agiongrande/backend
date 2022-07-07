const fs = require('fs');

class Carrito {
    constructor(){
        this.nombreArchivo = "carrito.txt"
        }

    create = async () => {
        const carritos = await this.getAll();
        let newId
        if (carritos.length == 0){
            newId = 1
        } else{
            newId = carritos[carritos.length - 1].id +1
        }
        let productos = []
        const timeStamp = new Date();
        const localTs = timeStamp.toLocaleString("fr-FR");
        this.timestamp = localTs
        const carrito = {timestamp: localTs, id: newId, productos: productos}
        carritos.push(carrito)
        try{
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(carritos));
        } catch(error){
            console.log(`Hubo un error ${error}`);
        }    
        return this.productos;
    
    }

    deleteById = async (id) => {
        try{
           const carrito = await this.getAll()

            if (carrito) {
                
                for (let index = 0; index < carrito.length; index++) {
                    if (carrito[index].id == id){
                        carrito.splice(index, 1);
                        try{
                            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(carrito));
                        } catch(error){
                            console.log(`Hubo un error ${error}`);
                        }  
                        return this.getAll();
                    }
                }
                return false
               }
        
        } catch(error){
            return(`Hubo un error ${error}`);
        }
    }

    getAll = async () => {
        try{
            const carritos = await fs.promises.readFile(this.nombreArchivo,'utf-8')
            return JSON.parse(carritos)
        } catch(error){
            return []
        }
    }

    getAllProducts = async (id) => {
        try{
            const carrito = await this.getAll()
 
             if (carrito) {
                 for (let index = 0; index < carrito.length; index++) {
                    if (carrito[index].id == id) {
                        return carrito[index].productos;
                     }
                 }
                 return false;
                }
         
         } catch(error){
             return(`Hubo un error ${error}`);
         }
    }


    save = async (objeto) => {
        const productos = await this.getAll();
        let newId
        if (productos.length == 0){
            newId = 1
        } else{
            newId = productos[productos.length - 1].id +1
        }
        const newObj = {...objeto, id: newId}
        productos.push(newObj)
        try{
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(productos));
        } catch(error){
            console.log(`Hubo un error ${error}`);
        }    
        return this.productos;
    }

    deleteProdById = async (idCarrito,idProducto) => {
        try{
            const carrito = await this.getAll()
             if (carrito) {
                 for (let index = 0; index < carrito.length; index++) {
                    if (carrito[index].id == idCarrito) {
                        for (let indexProd = 0; indexProd < carrito[index].productos.length; indexProd++) {
                            if (carrito[index].productos[indexProd].id == idProducto) {
                                carrito[index].productos.splice(indexProd, 1);
                                try{
                                    await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(carrito));
                                    return carrito;
                                } catch(error){
                                    console.log(`Hubo un error ${error}`);
                                }  
                            }
                         }       
                    }
                 }
                 return false;
                }
         
         } catch(error){
             return(`Hubo un error ${error}`);
         }
    }


    addToCart = async (idCarrito,producto) => {
        try{
            const carrito = await this.getAll()
             if (carrito) {
                 for (let index = 0; index < carrito.length; index++) {
                    if (carrito[index].id == idCarrito) {
                        console.log("encontro")
                        carrito[index].productos.push(producto);
                        try{
                            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(carrito));
                        } catch(error){
                            console.log(`Hubo un error ${error}`);
                        }    
                     }
                 }
                 return false;
                }
         
         } catch(error){
             return(`Hubo un error ${error}`);
         }
    }

    getById = async (id) => {
        try{
            const productos = await this.getAll()
 
             if (productos) {
                 for (let index = 0; index < productos.length; index++) {
                    if (productos[index].id == id) {
                        
                        return productos[index];
                     }
                 }
                 return false;
                }
         
         } catch(error){
             return(`Hubo un error ${error}`);
         }
    }

    
    

}

module.exports = {
    Carrito: Carrito,
};