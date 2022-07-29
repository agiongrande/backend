import ContenedorMongo from "../../container/ContenedorMongo";

class ProductoDaoMongo extends ContenedorMongo {
  constructor() {
    super("productos", {
      nombre: { type: String, required: true },
      precio: { type: Number, required: true },
      foto: { type: String, required: true },
      timestamp: { type: Number, required: true }
    });
  }
}

export default ProductoDaoMongo;