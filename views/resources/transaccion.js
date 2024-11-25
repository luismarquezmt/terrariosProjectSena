//constantes
// trae el token JWT
let token = getCookie("token");
// trae el espacio para la data 
let spanDataClient = document.getElementById("span-data-client")
//espacio para el form de profile data
let formulario = document.getElementById("dataForm")
// espacio para la data del menu profile
let loginSpan = document.getElementById("login-span")
// espacio para la data del menu profile collapsed
let menuSpanCollapsed = document.getElementById("dropdown-menu-collapsed")
//container para productos del carrito
const shoppingCarItemsContainer = document.querySelector(".shoppingCarItemsContainer")
//total del carro espan
let shoppingCartTotal = document.getElementById("shopping-car-total")
//total del carro espan
let confirmarButton = document.getElementById("confirmar-compra")
//total del carro valor
let totalValorShoppingCart = 0
// Ventana modal editar datos
let modal2 = document.getElementById("exampleModal");






//modal texts
//texto del modal
let textSpan = document.getElementById("textoSpan");
// Ventana modal Bd
let modal = document.getElementById("ventanaModal");
// Botón que abre el modal
let boton = document.getElementById("abrirModal");
// Hace referencia al elemento <span> que tiene la X que cierra la ventana
let span = document.getElementsByClassName("close")[0];



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

// se compruba identidad de la base de datos
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
            spanDataClient.innerHTML = `
            <p>"No tienes cuenta <a href="./registro.html">Registrate</a>"</p>
            `
        } else {
            //con el id se trae la info del usu
            fetchClientesData(id_usuario, nickUser)
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



// llama los datos de clientes si los hay,  si no hay datos devuelve un form para llenar
function fetchClientesData(id, nickUser) {

    fetch(`../clientes/perfil/${id}`, {
    })
        .then(response => response.json())
        .then(data => {
            // si tiene info crea un perfil con la info 
            if (data.length > 0) {
                spanDataClient.innerHTML = `
             <div class="row">
                 <div class="col-auto">
                     <p class="boltext" for="identificacion">Hola <span id="nick">${nickUser}</span> estamos alistando tu pedido.
                     </p>
                 </div>
             </div>

             <div class="row">
                 <div class="col-auto">
                     <p class="boltext" for="nombre">Nos comunicaremos al numero telefonico registrado: <span id="telefono">${data[0].telefono}</span> para
                         concretar los detalles de la entrega en la direccion registrada: <span id="direccion">${data[0].direccion}</span> </p>
                 </div>
             </div>




             <div class="row">
                 <div class="col-auto">
                     <p class="boltext" for="edad">Recuerda que nunca solicitamos dinero antes de la entrega, unicamente Pago
                         contra entrega</p>
                 </div>

             </div>



             <button type="button" id="boton-datos-cambio" class="btn btn-dark" data-bs-toggle="modal"
                 data-bs-target="#exampleModal">
                 Editar Datos
             </button>
           
                `
                // crea el form para los datos del edit
                formulario.innerHTML = `                 
                     <div class="row g-3 align-items-center">
                         <div class="col-auto">
                             <label class="form-label" for="telefono">Teléfono:</label>
                         </div>
                         <div class="col-auto">
                             <input type="tel" value="${data[0].telefono}" class="form-control" id="telefono" name="telefono" required>
                         </div>
                     </div>
     
                     <div class="row g-3 align-items-center">
                         <div class="col-auto">
                             <label class="form-label" for="direccion">Dirección:</label>
                         </div>
                         <div class="col-auto">
                             <input type="text" value="${data[0].direccion}" class="form-control" id="direccion" name="direccion" required>
                         </div>
                     </div>
                   
                        
                     <div class="modal-footer">
                         <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
                         <button id="buton-patch-data-profile" class="btn btn-success" >Enviar Cambios</button>
                     </div>

                     `
                //añade manejador de eventos y dispara el fecth al darle enviar 
                formulario.addEventListener('submit', (event) => {
                    //previene que se envie el form como action
                    event.preventDefault()
                    const formData = new FormData(event.target);

                    data = {
                        telefono: formData.get('telefono'),
                        direccion: formData.get('direccion'),
                    }
                    // console.log(data)
                    editDataCreate(id, data)
                    modal2.style.display = "none";

                })

                // se trae el id del carrito  luegoo los productos con el id crea el pedido y por ultimo borra los productos del carrito
                fetchSiHayCarrito(id)
            } else {
                //Indica que no hay datos de entrega y muestra un buton para crearlos
                spanDataClient.innerHTML = `
                 <div class="row">
                     <div class="col-auto">
                         <p class="boltext" for="identificacion">Hola <span id="nick">${nickUser}</span> para completar tu pedido,
                             requerimos nos brindes un numero de contacto y la direccion de entrega.
                         </p>
                     </div>
                 </div>

                 <div class="row">
                     <div class="col-auto">
                         <p class="boltext" for="nombre">Quedamos atentos a los datos requeridos para continuar con tu pedido.
                         </p>
                     </div>
                 </div>




                 <div class="row">
                     <div class="col-auto">
                         <p class="boltext" for="edad">Recuerda que nunca solicitamos dinero antes de la entrega, unicamente Pago
                             contra entrega</p>
                     </div>

                 </div>


                 <div class="row">
                     <div class="col-auto">
                         <p class="boltext" for="edad">En este ↓↓↓ boton podras actualizar los datos faltantes </p>
                     </div>

                 </div>


                 <button type="button" id="boton-datos-cambio" class="btn btn-dark" data-bs-toggle="modal"
                     data-bs-target="#exampleModal">
                     Editar Datos
                 </button>
                
                `
                // crea el form para los datos 
                formulario.innerHTML = `                 
                     <div class="row g-3 align-items-center">
                         <div class="col-auto">
                             <label class="form-label" for="telefono">Teléfono:</label>
                         </div>
                         <div class="col-auto">
                             <input type="" class="form-control" id="telefono" name="telefono" required>
                         </div>
                     </div>
     
                     <div class="row g-3 align-items-center">
                         <div class="col-auto">
                             <label class="form-label" for="direccion">Dirección:</label>
                         </div>
                         <div class="col-auto">
                             <input type="text" class="form-control" id="direccion" name="direccion" required>
                         </div>
                     </div>
                   
                        
                     <div class="modal-footer">
                         <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
                         <button id="buton-patch-data-profile" class="btn btn-success" >Enviar Cambios</button>
                     </div>

                     `

                //añade manejador de eventos y dispara el fecth al darle enviar 
                formulario.addEventListener('submit', (event) => {
                    //previene que se envie el form como action
                    event.preventDefault()
                    const formData = new FormData(event.target);

                    data = {
                        id_usuario: id,
                        telefono: formData.get('telefono'),
                        direccion: formData.get('direccion'),
                    }
                    // console.log(data)
                    sendDataProfile(data)
                    modal2.style.display = "none";
                })
            }
        });
}


// ------------------CREATE / CREAR -----------------
// ------------------CREATE / CREAR -----------------


function sendDataProfile(data) {
    fetch(`../clientes/perfil/create`, {
        //El Content-Type de la request debe ser àpplication/json para que bodyParser construya el req.body de otra manera lo deja vacío.
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(result => {
            console.log(result);
            textSpan.innerHTML = result.msg
            mostrarModal()
            return setTimeout(() => {
                location.reload();
            }, 1500)
        })
}


// ------------------EDIT / EDITAR -----------------
// ------------------EDIT / EDITAR -----------------

function editDataCreate(id, data) {
    // console.log(data);
    fetch(`../clientes/perfil/${id}`, {
        //El Content-Type de la request debe ser àpplication/json para que bodyParser construya el req.body de otra manera lo deja vacío.
        headers: {
            'Content-Type': 'application/json'
        },
        method: "PATCH",
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(result => {
            console.log(result);
            textSpan.innerHTML = result.msg
            mostrarModal()
            return setTimeout(() => {
                location.reload();
            }, 1500)
        })
}




//comprueba si hay un carrito previo del usuario si la hay invoca los productos 
function fetchSiHayCarrito(idCliente) {
    fetch(`/carrito/comprobate/${idCliente}`, {
    })
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                //trae los productos del carro
                let idCarrito = data[0].id_carrito
                fetchCarritoProducts(idCarrito, idCliente)
            } else {
                fetchClienteYaRealizoPedido()
            }
        })
}

function fetchClienteYaRealizoPedido() {
    spanDataClient.innerHTML = ''
}

//trae los productos del usuario relacionados en el carrito joiniando la tabla de productos  
function fetchCarritoProducts(idCarrito, idCliente) {
    fetch(`/carrito/${idCarrito}`, {
    })
        .then(response => response.json())
        .then(data => {
            // console.log(data.length);
            let sustantivo = ""
            if (data.length > 1) {
                sustantivo = "Productos"
            } else {
                sustantivo = "Producto"
            }
            data.forEach((element) => {
                // console.log(element);

                const shoppingCarRow = document.createElement('div');
                let valueCantidad = 0

                if (element.conteo > element.inventario) {
                    valueCantidad = element.inventario
                } else {
                    valueCantidad = element.conteo
                }
                //valor en bruto sin formato
                let notformatPrice = element.precio * valueCantidad
                let formatCartPrice = new Intl.NumberFormat('co-CP', { style: 'currency', currency: 'COP' }).format(
                    (element.precio * valueCantidad))
                const shoppingCarContent = ` 
       <div class="container">
          <div class="shopping-car-items shoppingCarItemContainer">
              <div class="row justify-content-evenly shoppingCarItem">
  
                  <div class="col" >
                      <img src=${element.imagen_producto} class="shopping-car-image" style="width: 60px; height: 60px;">
                     
                  </div>

                   <div class="col" id="col-name" >
                       <h6 class="shopping-car-item-title shoppingItemCarItemTitle ">${element.nombre_producto}</h6>
                  </div>
  
                   <div class="col" >
                      <p class="item-price mb-0 shoppingCarItemPrice">${(formatCartPrice)}</p>
                  </div>
  
                   <div class="col" >
                      <p class="item-price mb-0 shoppingCarItemQuantity">${(valueCantidad)}</p>
                  </div>
   
              </div>
          </div>
       </div>
    `
                shoppingCarRow.innerHTML = shoppingCarContent
                shoppingCarItemsContainer.append(shoppingCarRow)
                //actualiza el precio total
                addToTotal(notformatPrice)
                createPedido(idCliente, element.id_producto, valueCantidad)
                // confirmarButton.innerHTML = `
                // <button type="button" id="confirmar-buton" onclick="createPedido(${idCliente},${element.id_producto},${valueCantidad},${idCarrito})" class="btn btn-success"> Confirmar Pedido</button>
                // `
            })
            deleteCarritoCliente(idCarrito)
        })
}
//Suma el valor total del carro 
function addToTotal(value) {
    totalValorShoppingCart = totalValorShoppingCart + value
    let numberFormatiadoColombia = new Intl.NumberFormat('co-CP', { style: 'currency', currency: 'COP' }).format(
        totalValorShoppingCart)
    shoppingCartTotal.innerHTML = numberFormatiadoColombia
}


function deleteCarritoCliente(idCarrito) {
    fetch(`/carrito/delete-cart/${idCarrito}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(result => {
            console.log(result);
            return setTimeout(() => {
                location.replace("./myproducts.html");
            }, 20000)
        })
}

function createPedido(idCliente, idProducto, cantidad) {
    let data = {
        id_usuario: idCliente,
        id_producto: idProducto,
        cantidad: cantidad
    }
    fetch(`/carrito/create-pedido`, {
        //El Content-Type de la request debe ser àpplication/json para que bodyParser construya el req.body de otra manera lo deja vacío.
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            return console.log(data);
        })
}





// funcion que abre la ventana modal css
function mostrarModal() {
    modal.style.display = "block";
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