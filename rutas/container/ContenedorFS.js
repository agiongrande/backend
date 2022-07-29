const fs = require('fs');

class ContenedorFS {

    constructor(file){
        this.nombreArchivo = file
        }

        save = async (objeto) => {
            const productos = await this.getAll();
            let newId
            if (productos.length == 0){
                newId = 1
            } else{
                newId = productos[productos.length - 1].id +1
            }
            
            const timeStamp = new Date();
            const localTs = timeStamp.toLocaleString("fr-FR");
    
            objeto = {...objeto, timestamp: localTs, id: newId}
            productos.push(objeto)
            try{
                await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(productos));
            } catch(error){
                console.log(`Hubo un error ${error}`);
            }    
            return this.productos;
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


    deleteAll = async () => {
        try{
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(""));
        } catch(error){
            return []
        }
    }

}

module.exports = {
    ContenedorFS: ContenedorFS,
};