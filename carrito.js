let Carrito = JSON.parse(localStorage.getItem("contenido-carrito")) || [];

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

const alertaArticuloAgregado = (titulo, imagen) => {
    Swal.fire({
        toast: true,
        position: "top-end",
        timerProgressBar: true,
        timer: 2000,
        showConfirmButton: false,
        icon: "success",
        color: "#000000",
        background: "rgba(255, 255, 255, 0.8)",
        html: `
            <div class="alerta">
                <img src="${imagen}" alt="Imagen del artículo">
                <div>
                    <strong>Agregaste un artículo:</strong><br>
                    ${titulo}
                </div>
            </div>
        `,
    });
}

const agregarAlCarrito = (titulo, precio, imagen) => {
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
    alertaArticuloAgregado(titulo, imagen)
}

function limpiarCarrito() {
    if(Carrito.length > 0){
        localStorage.clear();
        Carrito = []
        actualizarCarrito()
        Swal.fire({
            title: "GRACIAS POR SU COMPRA!",
            imageUrl: "https://media.tenor.com/N6gCpoDF6KgAAAAM/pikachu-love.gif"
        });
    }else{
        Swal.fire({
            icon: "error",
            title: "Su carrito esta vacio",
            toast: true,
            position: "center",
            timer: 1500,
            showConfirmButton: false
        });
    }
}

const boton = document.getElementById("boton-limpiar");
boton.addEventListener("click", limpiarCarrito);

const alertaArticuloEliminado = (titulo) => {
    Swal.fire({
        toast: true,
        position: "top-end",
        timerProgressBar: true,
        timer: 2000,
        showConfirmButton: false,
        icon: "error",
        color: "#000000",
        background: "rgba(255, 255, 255, 0.8)",
        title: "Eliminaste un articulo:",
        text: titulo
})
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
    alertaArticuloEliminado(titulo)
}

const cargarCarrito = (titulo, precio, cantidad, imagen) => {
    const contenedor = document.createElement("div")
    const tituloDOM = document.createElement("h3")
    const precioDOM = document.createElement("p")
    const cantidadDOM = document.createElement("p")
    const botonaDOM = document.createElement("button")
    const botonDOM = document.createElement("button")

    contenedor.classList.add("contenedor-carrito")
    tituloDOM.classList.add("titulo-carrito")
    precioDOM.classList.add("precio-carrito")
    cantidadDOM.classList.add("cantidad-producto")
    botonaDOM.classList.add("boton-A")
    botonDOM.classList.add("boton-eliminar")

    tituloDOM.innerText = titulo
    precioDOM.innerText = "$" + precio
    cantidadDOM.innerText = "Cantidad: " + cantidad
    botonaDOM.innerText  = "Agregar"
    botonDOM.innerText  = "Eliminar"

    botonaDOM.addEventListener("click", ()=>{
        agregarAlCarrito(titulo, precio, imagen)
    })

    botonDOM.addEventListener("click", ()=>{
        eliminarProducto(titulo)
    })
    
    contenedor.appendChild(tituloDOM)
    contenedor.appendChild(precioDOM)
    contenedor.appendChild(cantidadDOM)
    contenedor.appendChild(botonaDOM)
    contenedor.appendChild(botonDOM)

    return contenedor
}

if(Carrito.length > 0){
    Carrito.forEach(el => {
        const carritoDOM = cargarCarrito(el.titulo, el.precio, el.cantidad, el.imagen)
        carrito.appendChild(carritoDOM)
    })
    calcularTotal(Carrito)
}