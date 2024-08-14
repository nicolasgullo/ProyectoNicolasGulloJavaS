const Carrito = JSON.parse(localStorage.getItem("contenido-carrito")) || [];

function calcularTotal(carrito) {
    let carro = Array.from(carrito);
    const total = carro.reduce((acumulador, producto) => acumulador + (producto.precio * producto.cantidad), 0);
    document.querySelector("#total").innerText = "$" + total
}

const actualizarCarrito = () => {
    localStorage.setItem("contenido-carrito", JSON.stringify(Carrito));
    carrito.innerHTML = ""
    Carrito.forEach(el => {
        carrito.appendChild(cargarCarrito(el.titulo, el.precio, el.cantidad))
    })
    calcularTotal(Carrito)
}

const eliminarProducto = (titulo) => {
    const producto = Carrito.find(el => {
        return el.titulo === titulo
    })
    if(producto.cantidad <= 1){
        let arrayDeTitulos = Carrito.map(el => {
            return el.titulo
        })
        let index = arrayDeTitulos.indexOf(titulo)
        Carrito.splice(index, 1)
    }else{
        producto.cantidad -= 1
    }

    actualizarCarrito()
}

const cargarCarrito = (titulo, precio, cantidad) => {
    const contenedor = document.createElement("div")
    const tituloDOM = document.createElement("h3")
    const precioDOM = document.createElement("p")
    const cantidadDOM = document.createElement("p")
    const botonDOM = document.createElement("button")

    contenedor.classList.add("contenedor-carrito")
    tituloDOM.classList.add("titulo-carrito")
    precioDOM.classList.add("precio-carrito")
    cantidadDOM.classList.add("cantidad-producto")
    botonDOM.classList.add("boton-eliminar")

    tituloDOM.innerText = titulo
    precioDOM.innerText = "$" + precio
    cantidadDOM.innerText = "Cantidad: " + cantidad
    botonDOM.innerText  = "Eliminar"

    botonDOM.addEventListener("click", ()=>{
        eliminarProducto(titulo)
    })
    
    contenedor.appendChild(tituloDOM)
    contenedor.appendChild(precioDOM)
    contenedor.appendChild(cantidadDOM)
    contenedor.appendChild(botonDOM)

    return contenedor
}

if(Carrito.length > 0){
    Carrito.forEach(el => {
        const carritoDOM = cargarCarrito(el.titulo, el.precio, el.cantidad)
        carrito.appendChild(carritoDOM)
    })
    calcularTotal(Carrito)
}