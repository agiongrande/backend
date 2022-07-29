import admin from "firebase-admin";
import databaseConfig from "../dbConfig.js";

admin.initializeApp({
    credential: admin.credential.cert(databaseConfig.firebase),
});

const db = admin.firestore();

class ContenedorFB {
    constructor(collectionName) {
        this.collection = db.collection(collectionName)
    }


    save = async (objeto) => {
        
        try{
            await this.collection.add(objeto)
        } catch(error){
            console.log(`Hubo un error ${error}`);
        }    
    }

    /* actualiza producto en contenedor productos */
    async actualizateById(id, objeto) {
        try {
            await this.collection.doc(id).update(objeto)
        } catch (err) {
            if (err.code === 5) {
                return { error: `producto de id ${id} no encontrado` }
            }
        }
    }

    getById = async (id) => {
        try{
            const productos = await this.getAll()
 
             if (productos) {
                const object = await this.collection.doc(id).get()
                }
         
         } catch(error){
             return(`Hubo un error ${error}`);
         }
    }


deleteById = async (id) => {
    try{
       const carrito = await this.getAll()

        if (carrito) {
            
            await this.collection.doc(id).delete({ exists: true })
           }
    
    } catch(error){
        return(`Hubo un error ${error}`);
    }
}

getAll = async () => {
    try {
        const objetos = await this.collection.get()

        return objetos;
    } catch (err) {
        return { error: "Error",err };
    }
}


deleteAll = async () => {
    try{
        const productos = await this.getAll()
            productos.forEach(async producto=>{
                await this.collection.doc(producto._id).delete()
            })
    } catch(error){
        return []
    }
}

}


module.exports = {
    ContenedorFB: ContenedorFB,
};