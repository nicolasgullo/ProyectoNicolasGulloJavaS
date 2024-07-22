let productos = ["Mouse", "Teclado", "Auriculares"]
let carrito = []
let total_compra = 0
let cargo_adicional = 0
let total_con_adicional = 0

alert("BIENVENIDO A COMPRA-TECNO")

function seleccionCompra(producto){
    if (producto == "MOUSE"){
        cantidad = parseInt(prompt("Cuantos " + producto + " desea comprar?"))
        carrito.push(producto + " | Cantidad =  " + cantidad)
        total_compra += cantidad * 5000
    } else if (producto == "TECLADO"){
        cantidad = parseInt(prompt("Cuantos " + producto + " desea comprar?"))
        carrito.push(producto + " | Cantidad =  " + cantidad)
        total_compra += cantidad * 10000
    } else if (producto == "AURICULARES"){
        cantidad = parseInt(prompt("Cuantos " + producto + " desea comprar?"))
        carrito.push(producto + " | Cantidad =  " + cantidad)
        total_compra += cantidad * 15000
    }else{
        alert("Disculpe, no tenemos ese producto")
    }
}

function seleccionPago(metodo){
    switch(metodo){
        case "efectivo":
            alert("Monto total de la compra: \n\n" + "- $" + total_compra)
            break
        case "tarjeta":
            sumaAdicional(15)
            alert("Monto total de la compra: \n\n" + "- $" + total_compra + " + " + cargo_adicional + "\n- Total= $" + total_con_adicional)
            break
        case "mercado pago":
            total_compra = total_compra * 1.10
            sumaAdicional(10)
            alert("Monto total de la compra: \n\n" + "- $" + total_compra + " + " + cargo_adicional + "\n- Total= $" + total_con_adicional)
            break
        default:
            alert("Por favor, ingrese un metodo de pago valido.")
    }
}

function sumaAdicional(porcentaje){
    cargo_adicional = total_compra * porcentaje/100
    total_con_adicional = total_compra + cargo_adicional
}

let bandera = true

while (bandera){
    const compra = prompt("Que desea comprar? \n\n" + " - " + productos.join("\n - ")).toUpperCase()
    
    seleccionCompra(compra)

    bandera = confirm("Desea realizar otra compra?\n\n Total de su compra: $ " + total_compra)
}

alert("Carrito:\n\n" + " - " +carrito.join("\n - "))

let forma_pagos = ["Efectivo (S/cargo adicional)", "Tarjeta (15% cargo adicional)", "Mercado Pago (10% cargo adicional)"]

bandera = true

while (bandera){
    
    let metodo_pago = prompt("Elija el motodo de pago: \n\n" + " - " + forma_pagos.join("\n - ")).toLowerCase()
    
    seleccionPago(metodo_pago)

    bandera = !confirm("Esta seguro?")
}