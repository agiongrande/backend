import mongoose from "mongoose";
import databaseConfig from "../dbConfig.js";

await mongoose.connect(databaseConfig.mongodb.connectionString);
console.log("Conexión establecida con Mongo")

class ContenedorMongo {
    constructor(collectionName, schema) {
        this.collection = mongoose.model(collectionName, new mongoose.Schema(schema));
    }

    save = async (objeto) => {
        
        const objetoNuevo = new this.collection(objeto)
        try{
            await objetoNuevo.save()
        } catch(error){
            console.log(`Hubo un error ${error}`);
        }    
    }

    /* actualiza producto en contenedor productos */
    async actualizateById(id, objeto) {
        objeto._id = id;
        objeto.timestamp = Date.now();
        const objetoAct = new this.collection(objeto)
        objetoAct.isNew = false;

        try {
            await objetoAct.save();
        } catch (err) {
            if (err.code === 5) {
                return { error: `producto de id ${id} no encontrado` }
            }
        }
    }

    getById = async (id) => {
        try{
            const encontrado = mongoose.isValidObjectId(id);
            if (encontrado) {
                const object = await this.collection.findOne({ _id: id }, { __v: 0 });
                return object
            }
            return false;
             
         } catch(error){
             return(`Hubo un error ${error}`);
         }
    }


deleteById = async (id) => {
    try{
        const encontrado = mongoose.isValidObjectId(id);
            if (encontrado) {
                const borrado = await this.collection.deleteOne({ _id: id })
                if (borrado.deletedCount > 0){
                    return `producto eliminado` 
                } else {`id no encontrado` }
            }        
    
    } catch(error){
        return(`Hubo un error ${error}`);
    }
}

getAll = async () => {
    try {
        const objetos = await this.collection.find({}, { __v: 0 })
        return objetos;
    } catch (err) {
        return { error: "Error",err };
    }
}


deleteAll = async () => {
    try{
        await this.collection.deleteMany({})
        return "Productos eliminados"
    } catch(error){
        return []
    }
}

}


module.exports = {
    ContenedorMongo: ContenedorMongo,
};