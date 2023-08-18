const productosEnCarrito = JSON.parse(localStorage.getItem("productos_en_carrito"));

const contenedorCarritoVacio = document.querySelector("#carrito_vacio");
const contenedorCarritoProductos = document.querySelector("#carrito_productos");
const contenedorCarritoAcciones = document.querySelector("#carrito_acciones");
const contenedorCarritoComprado = document.querySelector("#carrito_comprado");

if (productosEnCarrito) {
    contenedorCarritoVacio.classList.add("ocultar");
    contenedorCarritoProductos.classList.remove("ocultar");
    contenedorCarritoAcciones.classList.remove("ocultar");
    contenedorCarritoComprado.classList.remove("ocultar");

    contenedorCarritoAcciones.innerHTML = "";

    productosEnCarrito.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("carrito_producto");
        div.innerHTML = `
            <img class="carrito_producto_img" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="carrito_producto_titulo">
                <small>Titulo</small>
                <h3>${producto.titulo}</h3>
            </div>
            <div class="carrito_producto_cantidad">
                <small>Cantidad</small>
                <p>${producto.cantidad}</p>
            </div>
            <div class="carrito_producto_precio">
                <small>Precio</small>
                <p>$${producto.precio}</p>
            </div>
            <div class="carrito_producto_subtotal">
                <small>SubTotal</small>
                <p>$${producto.precio * producto.cantidad}</p>
            </div>
            <button class="carrito_producto_eliminar" id="${producto.id}"><i class="bi bi-trash"></i></button>`;
        contenedorCarritoProductos.append(div);
    });
} else {
    contenedorCarritoVacio.classList.remove("ocultar");
    contenedorCarritoProductos.classList.add("ocultar");
    contenedorCarritoAcciones.classList.add("ocultar");
    contenedorCarritoComprado.classList.remove("ocultar");
}