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
// Ventana modal editar datos Boostrap
let modal2 = document.getElementById("exampleModal");
// Ventana modal editar datos Boostrap
let addModal = document.getElementById("addModal");
// Ventana modal editar datos Boostrap
let deseaModal = document.getElementById("deseaModal");
//formulario que va debtro del modal 
let formulario = document.getElementById("dataForm")
//formulario que va debtro del modal con enctype 
let addFormulario = document.getElementById("addDataForm")
//formulario que va debtro del modal con enctype 
let formPhoto = document.getElementById("span-form-foto")



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
            // se trae los datos  de todos los productos 
            fetchAllProductos()
        }

        // ----- CLIENTE ------------------
        // ----- CLIENTE ------------------
        if (rol === "cliente") {
            getOutUser()
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
function getOutUser() {
    textSpan.innerHTML = 'User Restricted'
    mostrarModal()
    setTimeout(() => {
        location.replace('../views/productos0.1.html')
    }, 3000)
}



function fetchAllProductos() {
    fetch(`/productos/get-id`, {
    })
        .then(response => response.json())
        .then(data => {
            // trae los productos id y imagen 
            // console.log(data);
            // fetchAllPersonasData()


            organizeProducts(data)

        })
}



function organizeProducts(data) {
    let segundoSpan = document.getElementById('all-productos-span')
    let titleSpan = document.getElementById('title-span')
    let title = `
    <div class="title-products">
       <h3 class="title-text m-2 font-bold"> Productos </h3>
     </div>
   `
    titleSpan.innerHTML = title
    let buttonSpan = `
        <button 
        id="button-add-products"
        data-bs-toggle="modal"
        data-bs-target="#addModal"
        >Add 1 Product</button>
    `
    titleSpan.innerHTML += buttonSpan
    addFormulario.innerHTML = `
                <div class="row g-3 align-items-center">
                    <div class="col-auto">
                        <label for="nombres">Nombre:</label>
                    </div>
                    <div class="col-auto">
                        <input type="text"  class="form-control"
                            id="nombres" name="nombres" required>
                    </div>
                </div>


                <div class="row g-3 align-items-center">
                    <div class="col-auto">
                        <label class="form-label" for="precio">Precio:</label>
                    </div>
                    <div class="col-auto">
                        <input type="number"  class="form-control" id="precio"
                            name="precio" required>
                    </div>
                </div>


                <div class="row g-3 align-items-center">
                    <div class="col-auto">
                        <label class="form-label" for="inventario">Inventario:</label>
                    </div>
                    <div class="col-auto">
                        <input type="text"  class="form-control" id="inventario"
                            name="inventario" required>
                    </div>
                </div>

                <div class="row g-3 align-items-center">
                    <div class="col-auto">
                        <label class="form-label" for="descripcion">descripcion:</label>
                    </div>
                    <div class="col-auto">
                        <textarea type="text"  class="form-control"
                            id="descripcion" name="descripcion" required>
                        
                        </textarea>
                    </div>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
                    <button id="buton-patch-data-profile" class="btn btn-success">Enviar Cambios</button>
                </div>
              `
    addFormulario.addEventListener('submit', (e) => {
        e.preventDefault()
        let formData = new FormData(e.target)
        let data = {
            nombre_producto: formData.get('nombres'),
            precio: Number(formData.get('precio')),
            inventario: Number(formData.get('inventario')),
            descripcion_producto: formData.get('descripcion'),
        }
        dataCreateOneProduct(data)
        addModal.style.display = 'none'
        // modal2.style.display = "none";
    })
    data.forEach(element => {
        // let formatCartPrice = new Intl.NumberFormat('co-CP', { style: 'currency', currency: 'COP' }).format(
        //     (element.precio))
        // console.log(element);

        let spanProductos = `
          <div class="grid-item">
          <!--  <p class="grid-text"> ${element.id_producto}</p>-->
            <div 
             data-bs-toggle="modal"
             data-bs-target="#exampleModal">
            <img 
            src=${element.imagen_producto} 
            onclick="fetchDataProduct(${element.id_producto})" 
            class="imagenes"
            style="width: 100px; 
            height: 100px;" 
            alt="imagen"> 
            </div>
            <div>
               <button 
                  type="button" 
                  class="button-load-image"
                  data-bs-toggle="modal"
                  data-bs-target="#fotoModal"
                  onclick="putIdInPhotos(${element.id_producto})" 
                  > Cargar Imagen 
               </button>
               <button  
                 type="button" 
                 class="button-delete-product"
                   data-bs-toggle="modal"
                  data-bs-target="#deseaModal"
                  onclick="modalRealmenteDesea(${element.id_producto})"
                  > Eliminar Producto 
               </button>   
            </div>          
          </div>
         `
        segundoSpan.innerHTML += spanProductos

    });
}


function deleteProduct(idProducto) {
    fetch(`/productos/producto/${idProducto}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            textSpan.innerHTML = data.msg
            mostrarModal()
        })
    setTimeout(() => {
        location.reload();
    }, 2500)

}


function modalRealmenteDesea(idProducto) {
    let desea = document.getElementById('deseaDataForm')
    let buttons = `
         <button id="si-deseo" data-bs-dismiss="modal" onclick="deleteProduct(${idProducto})">Borrar </button>
         <button id="no-deseo" data-bs-dismiss="modal" >Atras</button>
    `
    desea.innerHTML = buttons
}

function dataCreateOneProduct(data) {
    fetch('/productos/createoneproducto', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            textSpan.innerHTML = data.msg
            mostrarModal()
        })
    setTimeout(() => {
        location.reload();
    }, 2500)

}


function putIdInPhotos(idProducto) {
    // añade boton y vista de la imagen de usuario Y EL FORM PARA EL ENVIO 
    formPhoto.innerHTML = `
 <div class="modal-body">
     <form id="form-style" enctype="multipart/form-data" action="../productos/createProduct" method="post">
         <h3>Foto de Producto</h3>
         <img id="preview" src="" alt="Image Preview">
         <br>
         <input type="text" value=${idProducto} name="id_product" style="display: none;">
         <input type="file" id="imageUpload" accept="image/*" name="avatar">
         <input type="submit" id="span-button-photo" value="aceptar">
     </form>
 </div>                    
`
    const preview = document.getElementById('preview')
    const fileInput = document.getElementById('imageUpload')
    //e agrega un evento change al campo de entrada de archivos.
    fileInput.addEventListener('change', () => {
        let file = fileInput.files[0];
        if (file) {
            //Cuando se selecciona un archivo, se utiliza FileReader para leer la imagen y se establece la src del elemento <img>
            const reader = new FileReader();

            reader.onload = function (e) {
                preview.src = e.target.result;
                preview.style.display = 'block'; // Mostrar la imagen
            }

            reader.readAsDataURL(file);
        } else {
            preview.style.display = 'none'; // Ocultar si no hay archivo
        }
    }, false)
}



function fetchDataProduct(idProducto) {
    fetch(`/productos/producto/${idProducto}`)
        .then(response => response.json())
        .then(element => {
            console.log(element);

            formulario.innerHTML = `
       
            <div class="row g-3 align-items-center">
                <div class="col-auto">
                    <label for="nombres">Nombre:</label>
                </div>
                <div class="col-auto">
                    <input type="text" value="${element[0].nombre_producto}" class="form-control" id="nombres" name="nombres" required>
                </div>
                <div class="col-auto">
                    <input type="text" value="${element[0].id_producto}" class="form-control" id="id" name="id" style="display: none;" required>
                </div>
            </div>
        
        
            <div class="row g-3 align-items-center">
                  <div class="col-auto">
                      <label class="form-label" for="precio">Precio:</label>
                  </div>
                  <div class="col-auto">
                      <input type="number" value="${element[0].precio}" class="form-control" id="precio" name="precio" required>
                  </div>
            </div>
        
        
            <div class="row g-3 align-items-center">
                <div class="col-auto">
                    <label class="form-label" for="inventario">Inventario:</label>
                </div>
                <div class="col-auto">
                    <input type="text" value="${element[0].inventario}" class="form-control" id="inventario" name="inventario" required>
                </div>
            </div>
        
            <div class="row g-3 align-items-center">
                <div class="col-auto">
                    <label class="form-label" for="descripcion">descripcion:</label>
                </div>
                <div class="col-auto">
                    <textarea type="text" value="${element[0].descripcion_producto}" class="form-control" id="descripcion" name="descripcion" required>
                    ${element[0].descripcion_producto}
                    </textarea>
                    </div>
            </div>
        
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
                <button id="buton-patch-data-profile" class="btn btn-success" >Enviar Cambios</button>
            </div>
        
            `
            // añade manejador de eventos y dispara el fecth al darle enviar 
            formulario.addEventListener('submit', (event) => {
                //previene que se envie el form como action
                event.preventDefault()
                const formData = new FormData(event.target);

                let data = {
                    id_producto: Number(formData.get('id')),
                    nombre_producto: formData.get('nombres'),
                    precio: Number(formData.get('precio')),
                    inventario: Number(formData.get('inventario')),
                    descripcion_producto: formData.get('descripcion'),
                }
                // console.log(data)
                editDataCreate(data.id_producto, data)
                modal2.style.display = "none";
            })
        })

}


function editDataCreate(idProducto, data) {
    // console.log(data);
    // console.log(idProducto);
    fetch(`../productos/producto/${idProducto}`, {
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
        })
    setTimeout(() => {
        location.reload();
    }, 2500)
}

// let asfasf = `  `


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