//constantes
// trae el token JWT
let token = getCookie("token");

//modal texts
//texto del modal
let textSpan = document.getElementById("textoSpan");
// Ventana modal Bd
let modal = document.getElementById("ventanaModal");
// Botón que abre el modal
let boton = document.getElementById("abrirModal");
// Hace referencia al elemento <span> que tiene la X que cierra la ventana
let span = document.getElementsByClassName("close")[0];


// trae el espacio para la data 
let spanDataMisProductos = document.getElementById("mis-productos-span")
// espacio para la data del menu profile
let loginSpan = document.getElementById("login-span")
// espacio para la data del menu profile collapsed
let menuSpanCollapsed = document.getElementById("dropdown-menu-collapsed")


//traer cookie
function getCookie(cname) {
    let name = cname + "=";
    // se llama la cookie
    let decodedCookie = decodeURIComponent(document.cookie);
    // se guarda en un array
    let ca = decodedCookie.split(';');
    // / se itera sobre el array
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        //character at 
        while (c.charAt(0) == ' ') {
            // eliminar espacios en blano
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            //elimina la parte inicial hasta el 
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

fetch('/clientes/verify', {
    headers: {
        'Authorization': `Bearer ${token}`
    }
})
    .then(response => response.json())
    .then(data => {
        let rol = data.rol
        let id_usuario = data.row[0].id_usuario
        let nickUser = data.nick_usuario
        // console.log(data);
        // si  devuleve id como numero se encuentra en BD 
        if (typeof (id_usuario) === "string") {
            spanDataMisProductos.innerHTML = `
            <p>"No tienes cuenta <a href="./registro.html">Registrate</a>"</p>
            `
        } else {
            // se trae los datos  del pedido 
            fetchMisProductos(id_usuario)
        }

        // ----- CLIENTE ------------------
        // ----- CLIENTE ------------------
        if (rol === "cliente") {
            loginSpan.innerHTML = `
      <div class="dropdown">
          <button id="button-mainmenu-exp" class="btn btn-success dropdown-toggle m-2" type="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              ${data.nick_usuario}
          </button>
          <ul class="dropdown-menu">
               <li><a class="dropdown-item " href="../views/userProfile.html">Perfil</a></li>
               <li><a class="dropdown-item " href="../views/myproducts.html">Mis Productos</a></li>
               <li><a class="dropdown-item " href="../views/acceso0.2.html">Salir</a></li>
          </ul>
      </div>
            `
            menuSpanCollapsed.innerHTML = `
      <button id="button-mainmenu" class="btn btn-success dropdown-toggle m-2" type="button" data-bs-toggle="dropdown"
      aria-expanded="false">
      ${data.nick_usuario}
      </button>
      <ul class="dropdown-menu">
              <li><a class="dropdown-item " href="../views/productos0.1.html">Productos</a></li>
              <li><a class="dropdown-item " href="./../index.html">Home</a></li>
              <li><a class="dropdown-item " href="../views/userProfile.html">Perfil</a></li>
              <li><a class="dropdown-item " href="../views/myproducts.html">Mis Productos</a></li>
              <li><a class="dropdown-item " href="acceso0.2.html">Salir</a></li>
      </ul>     
            `
            // ----- ADMIN ------------------
            // ----- ADMIN ------------------
        } else if (rol === "admin") {
            loginSpan.innerHTML = `
      <div class="dropdown">
          <button id="button-mainmenu-exp" class="btn btn-success dropdown-toggle m-2" type="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              ${data.nick_usuario}
          </button>
          <ul class="dropdown-menu">
              <li><a class="dropdown-item " href="../views/userProfile.html">Perfil</a></li>
              <li><a class="dropdown-item " href="../views/admin.html">Administración</a></li>
              <li><a class="dropdown-item " href="../views/acceso0.2.html">Salir</a></li>
          </ul>
      </div>
            `
            menuSpanCollapsed.innerHTML = `
      <button id="button-mainmenu" class="btn btn-success dropdown-toggle m-2" type="button" data-bs-toggle="dropdown"
      aria-expanded="false">
      ${data.nick_usuario}
      </button>
      <ul class="dropdown-menu">
          <li><a class="dropdown-item " href="../views/productos0.1.html">Productos</a></li>
          <li><a class="dropdown-item " href="./../index.html">Home</a></li>
          <li><a class="dropdown-item " href="../views/userProfile.html">Perfil</a></li>
          <li><a class="dropdown-item " href="../views/admin.html">Administración</a></li>
          <li><a class="dropdown-item " href="/views/acceso0.2.html">Salir</a></li>
      </ul>     
            `
        }
        // automaticamente llama la funcion para comprobar si se cambio el color 
        autoChangeColor()
    }
    )


// funcion que abre la ventana modal css
function mostrarModal() {
    modal.style.display = "block";
}



function fetchMisProductos(idCliente) {
    fetch(`/carrito/mis-productos/${idCliente}`, {
    })
        .then(response => response.json())
        .then(data => {
            //Sí encuentra carrito trae los productos que hayan en el mismo y cambia la imagen de El carrito
            // console.log(data.length);
            // console.log(data);
            organizeProducts(data)
            // if (data.length > 0) {
            //     let idCarrito = data[0].id_carrito
            //     fetchCarritoProducts(idCarrito, idCliente)
            //     carritoCambioimgLleno()
            // } else {
            //     // si no encuentra productos vacia el carrito 
            //     carritoCambioimgVacio()
            // }
        })
}


function organizeProducts(data) {
    let spanProductos = `
     <div class="item-container">
                <p class="item-textos">
                    Producto
                </p>
            </div>
            <div class="item-container">
                <p class="item-textos">
                    Nombre
                </p>
            </div>
            <div class="item-container">
                <p class="item-textos">
                    Descripción
                </p>
            </div>
            <div class="item-container">
                <p class="item-textos">
                    Precio
                </p>
            </div>
            <div class="item-container">
                <p class="item-textos">
                    Cantidad
                </p>
            </div>
            <div class="item-container">
                <p class="item-textos">
                    Fecha
                </p>
            </div>
            <div class="item-container">
                <p class="item-textos">
                    Estado
                </p>
            </div>
    `

    let segundoSpan = document.getElementById('mis-productos-span-segundo')
    data.forEach(element => {
        let formatCartPrice = new Intl.NumberFormat('co-CP', { style: 'currency', currency: 'COP' }).format(
            (element.precio * element.cantidad))
        // console.log(element);
        let spanProductos = `
            <div class="item-container">
                <img src= ${element.imagen_producto} style="width: 50px; height: 50px;" alt="imagen">            
            </div>
            <div class="item-container">
                <p class="item-textos">
                    ${element.nombre_producto}
                </p>
            </div>
            <div class="item-container">
                <p class="item-textos-largos">
                ${element.descripcion_producto}
                </p>
            </div>
            <div class="item-container">
                <p class="item-textos-largos">
                ${(formatCartPrice)}
                </p>
            </div>
            <div class="item-container">
                <p class="item-textos">
                ${element.cantidad}
                </p>
            </div>
            <div class="item-container">
                <p class="item-textos-largos">
                ${transformDateFull(element.fecha_compra)}
                </p>
            </div>
            <div class="item-container">
                <p class="item-textos">
                ${element.estado}
                </p>
            </div>
    `
        segundoSpan.innerHTML += spanProductos
    });
}



function transformDateFull(dates) {

    const date = new Date(dates);
    // Formatear la fecha como YYYY-MM-D
    let day = date.getDate();
    let month = date.getMonth() + 1; // Los meses empiezan desde 0
    const year = date.getFullYear();

    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }
    let hour = date.getHours()
    let minute = date.getMinutes()
    let seconds = date.getSeconds()

    return `${year}-${month}-${day} ${hour}:${minute}:${seconds}`;
}


//llama al local storage y setea el check
function autoChangeColor() {

    let verde = 'rgb(155, 238, 0)'
    let cafe = 'rgb(72, 74, 38)'
    let localMemory = localStorage.getItem("colorEstado")

    if (localMemory == "true") {
        document.getElementsByClassName('switch')[0].firstElementChild.checked = true
        nuevoClaro(verde, cafe)
    } else {
        document.getElementsByClassName('switch')[0].firstElementChild.checked = false
        normalObscuro(verde, cafe)
    }
}

// funcion que alterna los colores principales     
function changeColor() {
    let activator = document.getElementsByClassName('switch')[0].firstElementChild.checked
    //claros
    if (activator) {
        localStorage.setItem("colorEstado", "true");
        autoChangeColor()    //normal oscuros 
    } else {
        localStorage.setItem("colorEstado", "false");
        autoChangeColor()
    }
}

function nuevoClaro(verde, cafe) {
    document.getElementById('navegacion-fin').style.backgroundColor = verde
    document.getElementById('navegacion-inicio').style.backgroundColor = verde
    document.getElementById('textnav').style.color = cafe
    if (document.getElementById('button-mainmenu')) {
        document.getElementById('button-mainmenu').style.backgroundColor = cafe
    } if (document.getElementById('button-mainmenu-exp')) {
        document.getElementById('button-mainmenu-exp').style.backgroundColor = cafe
    }
}


function normalObscuro(verde, cafe) {
    document.getElementById('navegacion-fin').style.backgroundColor = cafe
    document.getElementById('navegacion-inicio').style.backgroundColor = cafe
    document.getElementById('textnav').style.color = verde
    if (document.getElementById('button-mainmenu')) {
        document.getElementById('button-mainmenu').style.backgroundColor = verde
    } if (document.getElementById('button-mainmenu-exp')) {
        document.getElementById('button-mainmenu-exp').style.backgroundColor = verde
    }
}