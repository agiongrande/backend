const fs = require('fs');
const express = require('express');

const app = express();
const puerto = 8080;


app.listen(puerto,(error)=>{
    if (!error){
        console.log("Servidor escuchando puerto " + puerto)
    } else{
        console.log("Hubo un error: " + error)    
    }
})

class Contenedor {
    constructor(nombreArchivo){
        this.nombreArchivo = nombreArchivo;
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
            
            return newId;
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
                 return "ID no encontrado"
                }
         
         } catch(error){
             console.log(`Hubo un error ${error}`);
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
                        await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(productos));
                        return this.getAll();
                    }
                }
                return "ID no encontrado"
               }
        
        } catch(error){
            console.log(`Hubo un error ${error}`);
        }
    }

    deleteAll = async () => {
        try{
            const productos = []
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(productos));
            return "Todos los registros fueron eliminados"
            } catch(error){
            console.log(`Hubo un error ${error}`);
        }
    }

}


const archivo = new Contenedor("./productos.txt");



app.get('/productos',(req,res) => {
    archivo.getAll().then((productos)=>{
        res.send(productos);
    });
})

app.get('/productoRandom', (req,res)=>{
    archivo.getAll().then((productos)=>{
        let cantidad = productos.length;
        const random =  Math.floor(Math.random() * (cantidad));
        res.send(productos[random]);
    });
})


