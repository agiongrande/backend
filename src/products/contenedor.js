const fs = require('fs');

class Contenedor {
    constructor(){
        this.productos = [{producto: "Vodka", precio: "$1000", url: "https://http2.mlstatic.com/D_NQ_NP_2X_906032-MLA42929183777_072020-F.webp", id: 1 },
        {producto: "Fernet", precio: "$1200", url: "https://http2.mlstatic.com/D_NQ_NP_2X_838459-MLA46584631180_072021-F.webp", id: 2 },
        {producto: "Gancia", precio: "$450", url: "https://http2.mlstatic.com/D_NQ_NP_2X_943547-MLA41898836746_052020-F.webp", id: 3 }]
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
        return this.productos;
    }

    actualizate = async ({producto, precio, url, id}) => {
        const productos = await this.getAll();
        
        for (let index = 0; index < productos.length; index++) {
            
            if (productos[index].id == id){
                
                productos[index].precio = precio;
                productos[index].producto = producto;
                productos[index].url = url;
            }
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
        return this.productos;
    }
    
    deleteById = async (id) => {
        try{
           const productos = await this.getAll()

            if (productos) {
                
                for (let index = 0; index < productos.length; index++) {
                    if (productos[index].id == id){
                        productos.splice(index, 1);
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

class Mensajes {
    constructor(){
        this.nombreArchivo = "mensajes.txt"
    }

    save = async (objeto) => {
        try{
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(objeto));
        } catch(error){
            console.log(`Hubo un error ${error}`);
        }    
    }

    getAll = async () => {
        try{
            const mensajes = await fs.promises.readFile(this.nombreArchivo,'utf-8')
            return JSON.parse(mensajes)
        } catch(error){
            return []
        }
    }

 }

module.exports = {
    Contenedor: Contenedor,
    Mensajes: Mensajes,
};