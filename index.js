const { debug } = require('console');
const fs = require('fs');
const express = require('express');

const app = express();
const puerto = 8080;

app.get('/',(req,res) => {
    res.send('Hola')
})

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


const prod1 = {
    producto:'Vodka', 
    precio:900, 
    url:"http://imagen1.png"
}

const prod2 = {
    producto:'Gancia', 
    precio:500, 
    url:"http://imagen2.png"
}

const prod3 = {
    producto:'Vodka saborizado', 
    precio:900, 
    url:"http://imagen3.png"
}

const prod4 = {
    producto:'Fernet menta', 
    precio:1000, 
    url:"http://imagen4.png"
}
const archivo = new Contenedor("./productos.txt");

app.get('/productos',(req,res) => {
    res.send(archivo.getAll());
})


