const productos= [ 
    //  CAMPERAS  ///
    {
        id:"campera-1",
        titulo: "campera 1",
        imagen: "./IMG/camperas/campera1.jpg",
        categoria:{
            nombre:"Camperas",
            id:"camperas"
        },
        precio: 1000
    },
    {
        id:"campera-2",
        titulo: "campera 2",
        imagen: "./IMG/camperas/campera2.jpg",
        categoria:{
            nombre:"Campera",
            id:"camperas"
        },
        precio: 1500
    },
    {
        id:"campera-3",
        titulo:"campera 3",
        imagen:"/IMG/camperas/campera3.jpg",
        categoria:{
            nombre:"Camperas",
            id:"camperas"
        },
        precio: 2000
    },
    {
        id:"campera-4",
        titulo:"campera 4",
        imagen:"/IMG/camperas/campera4.jpg",
        categoria:{
            nombre:"Camperas",
            id:"camperas"
        },
        precio: 2500
    },
    // BUZOS  ///
    {
        id:"buzp-1",
        titulo: "buzo 1",
        imagen: "./IMG/buzos/buzo1.jpg",
        categoria:{
            nombre:"Buzos",
            id:"buzos"
        },
        precio: 1000
    },
    {
        id:"buzp-2",
        titulo: "buzo 2",
        imagen: "./IMG/buzos/buzo2.jpg",
        categoria:{
            nombre:"Buzos",
            id:"buzos"
        },
        precio: 1500
    },
    {
        id:"buzo-3",
        titulo:"buzo 3",
        imagen:"/IMG/buzos/buzo3.jpg",
        categoria:{
            nombre:"Buzos",
            id:"buzos"
        },
        precio: 2000
    },
    {
        id:"buzo-4",
        titulo:"buzo 4",
        imagen:"/IMG/buzos/buzo4.jpg",
        categoria:{
            nombre:"Buzos",
            id:"buzos"
        },
        precio: 2500
    },
    // Pantalones ///
    {
        id:"pantalon-1",
        titulo: "pantalon 1",
        imagen: "./IMG/pantalon/pantalon1.jpg",
        categoria:{
            nombre:"Pantalones",
            id:"pantalones"
        },
        precio: 1000
    },
    {
        id:"pantalon-2",
        titulo: "pantalon 2",
        imagen: "./IMG/pantalon/pantalon2.jpg",
        categoria:{
            nombre:"Pantalones",
            id:"pantalones"
        },
        precio: 1500
    },
    {
        id:"pantalon-3",
        titulo:"pantalon 3",
        imagen:"/IMG/pantalon/pantalon3.jpg",
        categoria:{
            nombre:"Pantalones",
            id:"pantalones"
        },
        precio: 2000
    },
    {
        id:"pantalon-4",
        titulo:"pantalon 4",
        imagen:"/IMG/pantalon/pantalon4.jpg",
        categoria:{
            nombre:"Pantalones",
            id:"pantalones"
        },
        precio: 2500
    },
];

const contenedorProductos = document.querySelector("#contenedor_producto");
const botonesCategorias = document.querySelectorAll(".boton_categoria");
const tituloPrincipal = document.querySelector("#titulo_principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");



function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto_img" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;
        contenedorProductos.append(div);
    });
    actualizarBotonesAgregar();
}

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"))
        e.currentTarget.classList.add("active")

        if(e.currentTarget.id != "todos"){
        const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
        tituloPrincipal.innerText = productoCategoria.categoria.nombre;
        
        const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
        cargarProductos(productosBoton)
    }else{
        tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }
    }
    )
}
);
function actualizarBotonesAgregar(){
        botonesAgregar = document.querySelectorAll(".producto-agregar");

        botonesAgregar.forEach(boton =>{
            boton.addEventListener("click", agregrAlCarrito);

            }
            );
}
let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos_en_carrito");

if(productosEnCarritoLS){
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
}else{
    productosEnCarrito = [];
}

function agregrAlCarrito(e){

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(productos => productos.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)){
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    }else{
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
    actualizarNumerito();

    localStorage.setItem("productos_en_carrito", JSON.stringify(productosEnCarrito));

}

function actualizarNumerito(){
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}

