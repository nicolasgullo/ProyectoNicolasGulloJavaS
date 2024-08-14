const productos = document.getElementById("productos")
const carrito = document.getElementById("carrito")
const Carrito = JSON.parse(localStorage.getItem("contenido-carrito")) || []

const Productos = [
    {
        imagen: "./img/Productos/auriculares.png",
        titulo: "Auriculares GN",
        precio: 30000,
    },
    {
        imagen: "./img/Productos/mousepad.png",
        titulo: "Mousepad GN",
        precio: 5000,
    },
    {
        imagen: "./img/Productos/mouse.png",
        titulo: "Mouse GN",
        precio: 10000,
    } 
]

const actualizarCarrito = () => {
    localStorage.setItem("contenido-carrito", JSON.stringify(Carrito));
}

const agregarAlCarrito = (titulo, precio) => {
    const bandera = Carrito.some(el => {
        return el.titulo === titulo
    })
    if(bandera){
        const producto = Carrito.find(el => {
            return el.titulo === titulo
        })
        producto.cantidad += 1
    }else{
        Carrito.push({
            titulo,
            precio,
            cantidad: 1
        })
    }   
    actualizarCarrito()
}

const cargarProductos = (imagen, titulo, precio) => {
    const contenedor = document.createElement("div")
    const imagenDOM = document.createElement("img")
    const tituloDOM = document.createElement("h3")
    const precioDOM = document.createElement("p")
    const botonDOM = document.createElement("button")

    contenedor.classList.add("contenedor")
    imagenDOM.classList.add("imagen")
    tituloDOM.classList.add("titulo")
    precioDOM.classList.add("precio")
    botonDOM.classList.add("boton-agregar")

    imagenDOM.src = imagen
    tituloDOM.innerText = titulo
    precioDOM.innerText = "$" + precio
    botonDOM.innerText  = "Agregar al carrito"
    
    botonDOM.addEventListener("click", ()=>{
        agregarAlCarrito(titulo, precio)
    })

    contenedor.appendChild(imagenDOM)
    contenedor.appendChild(tituloDOM)
    contenedor.appendChild(precioDOM)
    contenedor.appendChild(botonDOM)

    return contenedor
}

Productos.forEach(el => {
    const productoDOM = cargarProductos(el.imagen, el.titulo, el.precio)

    productos.appendChild(productoDOM)
})