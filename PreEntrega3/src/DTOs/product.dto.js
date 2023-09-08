class ProductDTO{
    constructor(product){
        this.nombre = product.nombre
        this.descripcion = product.descripcion
        this.precio = product.precio
        this.stock = product.stock ? product.stock : 0
        this.edad = product.edad
        this.status = product.status
        this.imagen = product.imagen ? product.imagen : `https://picsum.photos/640/480`
    }
}
module.exports = ProductDTO