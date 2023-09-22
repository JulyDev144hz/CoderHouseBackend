class ProductDTO{
    constructor(product){
        this.nombre = product.nombre
        this.descripcion = product.descripcion
        this.precio = product.precio
        this.stock = product.stock ? product.stock : 0
        this.status = product.status?  product.status != 'on' && product.status != "off" ? product.status: product.status == "on" ? true : false : false
        this.imagen = product.imagen ? product.imagen : `https://picsum.photos/640/480`
    }
}
module.exports = ProductDTO