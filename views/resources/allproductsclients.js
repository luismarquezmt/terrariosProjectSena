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
let spanDataMisProductos = document.getElementById("all-productos-span")
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

//función que verifica el ingreso y determina el rol del usuario muestra un menú u otro según el rol
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
            <p></p>
            <p></p>
            <p>"No tienes cuenta <a href="./registro.html">Registrate</a>"</p>
            `
        } else {
            // se trae los datos  de todos los pedidos 
            fetchAllProductos()
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



function fetchAllProductos() {
    fetch(`/carrito/clientes/all/productos`, {
    })
        .then(response => response.json())
        .then(data => {
            // trae los productos del cliente
            // console.log(data);
            fetchAllPersonasData()
            organizeProducts(data)

        })
}

function fetchAllPersonasData() {
    fetch(`/clientes/perfil/clientes/all`, {
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let row = ""
            let idTextosClientes = document.querySelectorAll('.item-textos-largos-id')
            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                row = `
                <div class="grid-item-container">
                  <div class="item-container">
                    <p class="item-title">
                      Identificacion
                    </p>
                  </div>
                  <div class="item-container">
                    <p class="item-title">
                     ${element.identificacion}
                    </p>
                  </div>
                </div>

                <div class="grid-item-container">
                  <div class="item-container">
                    <p class="item-title">
                      Nombre
                    </p>
                  </div>
                  <div class="item-container">
                    <p class="item-title">
                     ${element.nombres}
                    </p>
                  </div>
                </div>

                <div class="grid-item-container">
                  <div class="item-container">
                    <p class="item-title">
                      Telefono
                    </p>
                  </div>
                  <div class="item-container">
                    <p class="item-title">
                     ${element.telefono}
                    </p>
                  </div>
                </div>

                   <div class="grid-item-container">
                  <div class="item-container">
                    <p class="item-title">
                      Direccion
                    </p>
                  </div>
                  <div class="item-container">
                    <p class="item-title">
                     ${element.direccion}
                    </p>
                  </div>
                </div>

                   <div class="grid-item-container">
                  <div class="item-container">
                    <p class="item-title">
                      Correo
                    </p>
                  </div>
                  <div class="item-container">
                    <p class="item-title">
                     ${element.correo}
                    </p>
                  </div>
                </div>
            `
                idTextosClientes[index].nextElementSibling.innerHTML = row;
            }
        });
}


function sendStatuscChange(idMisProductos) {
    let status = document.getElementById(`select-${idMisProductos}`)
    let data = {
        estado: status.value
    }
    // console.log(idMisProductos);

    fetch(`/carrito/update-estado/${idMisProductos}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(result => {
            console.log(result)
            textSpan.innerHTML = result.msg
            mostrarModal()
        });

    return setTimeout(() => {
        location.reload();
    }, 3000)

}


function organizeProducts(data) {
    let segundoSpan = document.getElementById('all-productos-span-segundo')
    data.forEach(element => {
        // let formatCartPrice = new Intl.NumberFormat('co-CP', { style: 'currency', currency: 'COP' }).format(
        //     (element.precio))
        // console.log(element);
        let spanProductos = `
            <div class="item-container">
               
                <div class="popup"> 
                <p class="item-textos-largos-id" id="id_${element.id_usuario}">
                ${element.id_usuario}
                </p>
                <span class="popuptext">forma mas facil</span>
                </div>
            </div>
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
                ${element.precio}
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
                   <select name="selector" id="select-${element.id_mis_productos}" class="select-container">
                      <option class="value-select" value=${element.estado}>${element.estado}</option>
                      <option class="value-select" value="pendiente">pendiente</option>
                      <option class="value-select" value="Preparacion">Preparacion</option>
                      <option class="value-select" value="Entregado">Entregado</option>
                   </select>

                    <button type="button" onclick="sendStatuscChange(${element.id_mis_productos})" class="button-send-status"> Confirmar</button>
            </div>
            
    `
        segundoSpan.innerHTML += spanProductos
        // para el span flotante de los datos 
        let idTextosClientes = document.querySelectorAll('.item-textos-largos-id')
        idTextosClientes.forEach(element => {
            element.addEventListener('click', (e) => {
                e.target.nextElementSibling.classList.toggle('show');
            });
        });
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