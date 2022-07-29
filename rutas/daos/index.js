import carritoDaosFirebase from './carritos/CarritoDaoFirebase'
import carritoDaosMongo from './carritos/CarritoDaoMongo'
import productoDaosFirebase from './carritos/ProductoDaoFirebase'
import productoDaosMongo from './carritos/ProductoDaoMongo'

const mongo = false;

let exportacion

if (mongo ==true){
    exportacion = {productoDaosMongo,carritoDaosMongo}
} else {
    exportacion = {productoDaosFirebase,carritoDaosFirebase}
}

export default exportacion