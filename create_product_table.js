const databaseMySQL = require('./database').mySQLConnection
const databaseSQLite = require('./database').sqliteConnection

const createProductTable = async () => {
    try {
        await databaseMySQL.schema.dropTableIfExists('products')

        await databaseMySQL.schema.createTable('products', productCreate =>{
            productCreate.increments('id').primary()
            productCreate.string('nombre', 30).notNullable();
            productCreate.integer('precio').notNullable();
            productCreate.string('url', 50).notNullable();
        })
        console.log("Tabla productos creada")
        databaseMySQL.destroy();
    } catch(err){
        console.log(err)
        databaseMySQL.destroy();
    }
}

const createMessageTable = async () => {
    try {
        await databaseSQLite.schema.dropTableIfExists('messages')

        await databaseSQLite.schema.createTable('messages', productCreate =>{
            productCreate.increments('id').primary()
            productCreate.string('email', 30).notNullable();
            productCreate.string('mensaje',200).notNullable();
            productCreate.string('fechayhora', 50).notNullable();
        })
        console.log("Tabla mensajes creada")
        databaseSQLite.destroy();
    } catch(err){
        console.log(err)
        databaseSQLite.destroy();
    }
}

module.exports = {createProductTable, createMessageTable}