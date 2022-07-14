class Contenedor {
    constructor(database,table){
        this.database = database
        this.table = table
    }

    async save(objeto) {
        
        try{
            await this.database(this.table).insert(objeto)
            return objeto;
        } catch(err){
            console.log(err);
        }
    }

    getById = async (id) => {
        try{
            const product = await this.database(this.table).select('*').where('id', '=', id);
            return product ? product : null;
         
         } catch(error){
             return(`Hubo un error ${error}`);
         }
    }

    
    getAll = async () => {
        const products = await this.database.from(this.table).select('*');
        return products;
    }
    
    deleteById = async (id) => {
        try{
           await this.database.from(this.table).where('id', '=', id).del();
        
        } catch(error){
            return(`Hubo un error ${error}`);
        }
    }

}

class Mensajes {
    constructor(database,table){
        this.database = database
        this.table = table
    }

    async save(objeto) {
        
        try{
            const timeStamp = new Date();
            const localTs = timeStamp.toLocaleString("fr-FR");
            const newMsg = {...objeto, fechayhora: localTs}
            await this.database(this.table).insert(newMsg)
            return newMsg;
        } catch(err){
            console.log(err);
        }
    }

    getAll = async () => {
        const products = await this.database.from(this.table).select('*');
        return products;
    }

 }

module.exports = {
    Contenedor: Contenedor,
    Mensajes: Mensajes,
};