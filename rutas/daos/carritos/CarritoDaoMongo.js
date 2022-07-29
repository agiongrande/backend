import ContenedorMongo from "../../container/ContenedorMongo";

class CarritoDaoMongo extends ContenedorMongo {
    constructor() {
      super("carrito", {
        timestamp: { type: String, required: true },
        productos: { type: Array, required: true },
      });
    }
  }
  
  export default CarritoDaoMongo;