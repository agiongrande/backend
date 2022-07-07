const fs = require('fs');
const { Item } = require('../item');

class Producto {
    constructor(){
        this.nombreArchivo = "productos.txt"
    }

    save = async (objeto) => {
        const productos = await this.getAll();
        let newId
        if (productos.length == 0){
            newId = 1
        } else{
            newId = productos[productos.length - 1].id +1
        }
        console.log(objeto)
        let item = new Item(objeto.nombre, objeto.descripcion, objeto.codigo, objeto.foto, objeto.precio, objeto.stock);

        item = {...item, id: newId}
        productos.push(item)
        try{
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(productos));
        } catch(error){
            console.log(`Hubo un error ${error}`);
        }    
        return this.productos;
    }

    actualizate = async ({nombre, precio, foto, stock, codigo, descripcion, id}) => {
        const productos = await this.getAll();
        
        for (let index = 0; index < productos.length; index++) {
            
            if (productos[index].id == id){
                
                productos[index].precio = precio;
                productos[index].nombre = nombre;
                productos[index].foto = foto;
                productos[index].descripcion = descripcion;
                productos[index].codigo = codigo;
                productos[index].stock = stock;
            }
        }
        try{
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(productos));
        } catch(error){
            console.log(`Hubo un error ${error}`);
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

    
    getAll = async () => {
        try{
            const productos = await fs.promises.readFile(this.nombreArchivo,'utf-8')
            return JSON.parse(productos)
        } catch(error){
            return []
        }
    }
    
    deleteById = async (id) => {
        try{
           const productos = await this.getAll()

            if (productos) {
                
                for (let index = 0; index < productos.length; index++) {
                    if (productos[index].id == id){
                        productos.splice(index, 1);
                        try{
                            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(productos));
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

}

module.exports = {
    Producto: Producto,
};