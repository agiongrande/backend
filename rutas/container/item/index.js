

class Item {
    constructor(nombre,descripcion,codigo,foto,precio,stock){
        this.nombre = nombre
        this.descripcion = descripcion
        this.codigo = codigo
        this.foto =foto
        this.precio = precio
        this.stock = stock
        const timeStamp = new Date();
        const localTs = timeStamp.toLocaleString("fr-FR");
        this.timestamp = localTs
    }
 }

module.exports = {
    Item: Item,
};