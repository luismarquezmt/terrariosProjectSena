let loginSpan = document.getElementById("login-span")
let menuSpanCollapsed = document.getElementById("dropdown-menu-collapsed")
let spanDataClient = document.getElementById("span-data-client")
let spanDataClientPwd = document.getElementById("span-data-pwd")
let buttonChangePwd = document.getElementById("span-button-changepwd")
let formulario = document.getElementById("dataForm")
let token = getCookie("token");
//photo BUTTONS SEND 
let buttonImage = document.getElementById("span-button-photo")
let formPhoto = document.getElementById("span-form-foto")

//modal texts
//texto del modal
let textSpan = document.getElementById("textoSpan");
// Ventana modal Bd
let modal = document.getElementById("ventanaModal");
// Ventana modal editar datos
let modal2 = document.getElementById("exampleModal");
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
        // console.log(data);
        // si  devuleve id como numero se encuentra en BD 
        if (typeof (id_usuario) === "string") {
            spanDataClient.innerHTML = `
            <p>"No tienes cuenta <a href="./registro.html">Registrate</a>"</p>
            `
        } else {
            //con el id se trae la info del usu
            fetchClientesData(id_usuario)
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
function fetchClientesData(id) {

    fetch(`../clientes/perfil/${id}`, {
    })
        .then(response => response.json())
        .then(data => {
            // si tiene info crea un perfil con la info 
            if (data.length > 0) {
                spanDataClient.innerHTML = `
            <div class="row">
                <div class="col-auto">
                    <p class="boltext" for="identificacion">Identificación:</p>
                </div>
                <div class="col-auto">
                    <p type="number" id="identificacion" name="identificacion"> ${data[0].identificacion}</p>
                </div>
            </div>
    
            <div class="row">
                <div class="col-auto">
                    <p class="boltext" for="nombre">Nombres:</p>
                </div>
                <div class="col-auto">
                    <p type="text" id="nombre" name="nombre"> ${data[0].nombres} </p>
                </div>
            </div>
    
            <div class="row">
                <div class="col-auto">
                    <p class="boltext" for="apellidos">Apellidos:</p>
                </div>
                <div class="col-auto">
                    <p type="number" id="apellidos" name="apellidos"> ${data[0].apellidos}</p>
                </div>
            </div>

            <div class="row">
                  <div       class="col-auto">
                      <p  class="boltext" for="edad">Edad:</p>
                  </div>
                  <div class="col-auto">
                      <p type="text" id="edad" name="edad"> ${data[0].edad}</p>
                  </div>
            </div>
        
            <div class="row">
                <div class="col-auto">
                    <p  class="boltext" for="correo">Correo Electrónico::</p>
                </div>
                <div class="col-auto">
                    <p type="text" id="correo" name="correo"> ${data[0].correo}</p>
                </div>
            </div>
    
            <div class="row">
                <div class="col-auto">
                    <p class="boltext" for="nombre">Teléfono:</p>
                </div>
                <div class="col-auto">
                    <p type="text" id="nombre" name="nombre"> ${data[0].telefono} </p>
                </div>
            </div>
    
            <div class="row">
                <div  class="col-auto">
                    <p  class="boltext" for="nombre">Dirección:</p>
                </div>
                <div class="col-auto">
                    <p type="text" id="nombre" name="nombre"> ${data[0].direccion} </p>
                </div>
            </div>
        </div>

        <button type="button" id="boton-datos-cambio" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Editar Datos </button>

                `
                // crea el form para los datos del edit
                formulario.innerHTML = `
                     <div class="row g-3 align-items-center">
                         <div class="col-auto">
                             <label class="form-label" for="identificacion">Identificación:</label>
                         </div>
                         <div class="col-auto">
                             <input type="number" value="${data[0].identificacion}" class="form-control" name="identificacion" id="identificacion"
                                 required>
                         </div>
                         <div class="col-auto">
                             <span id="passwordHelpInline" class="form-text">
                                 Numero 
                             </span>
                         </div>
                     </div>
     
                     <div class="row g-3 align-items-center">
                         <div class="col-auto">
                             <label for="nombres">Nombre:</label>
                         </div>
                         <div class="col-auto">
                             <input type="text" value="${data[0].nombres}" class="form-control" id="nombres" name="nombres" required>
                         </div>
                     </div>
     
                     <div class="row g-3 align-items-center">
                         <div class="col-auto">
                             <label class="form-label" for="apellidos">Apellidos:</label>
                         </div>
                         <div class="col-auto">
                             <input type="text" value="${data[0].apellidos}" class="form-control" id="apellidos" name="apellidos" required>
                         </div>
                     </div>
     
                     <div class="row g-3 align-items-center">
                           <div class="col-auto">
                               <label class="form-label" for="edad">Edad:</label>
                           </div>
                           <div class="col-auto">
                               <input type="number" value="${data[0].edad}" class="form-control" id="edad" name="edad" required>
                           </div>
                     </div>
     
     
                     <div class="row g-3 align-items-center">
                         <div class="col-auto">
                             <label class="form-label" for="correo">Correo Electrónico:</label>
                         </div>
                         <div class="col-auto">
                             <input type="email" value="${data[0].correo}" class="form-control" id="correo" name="correo" required>
                         </div>
                     </div>
     
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
                     <!-- 
                     <div class="row g-3 align-items-center">
                         <div class="col-auto">
                             <label class="form-label" for="imagen">Imagen:</label>
                         </div>
                         <div class="col-auto">
                             <input type="file" class="form-control" id="imagen" name="imagen" accept="image/*"
                                 required>
                         </div>
                     </div> -->
                     <!-- <label for="exampleColorInput" class="form-label">Color picker</label>
                     <input type="color" class="form-control form-control-color" id="exampleColorInput" value="#563d7c"
                         title="Choose your color"> -->
     
     
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
                        identificacion: formData.get('identificacion'),
                        nombres: formData.get('nombres'),
                        apellidos: formData.get('apellidos'),
                        correo: formData.get('correo'),
                        telefono: formData.get('telefono'),
                        direccion: formData.get('direccion'),
                        edad: formData.get('edad'),
                    }
                    // console.log(data)

                    editDataCreate(id, data)
                    modal2.style.display = "none";

                })

                // añade boton y vista de la imagen de usuario Y EL FORM PARA EL ENVIO 
                formPhoto.innerHTML = `
                 <img id="previewFoto" src=${data[0].imagen} alt="Image Profile">
                    <br>
                 <button type="button" id="boton-foto-cambio" class="btn btn-dark mb-2" data-bs-toggle="modal" data-bs-target="#fotoModal"> Cambiar Foto </button>

                <div class="modal fade" id="fotoModal" tabindex="-1" aria-labelledby="ModalLabelpwd" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5>Cambiar Foto</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

            
                            <div class="modal-body">
                                <form id="form-style" enctype="multipart/form-data" action="../clientes/perfil/foto" method="post">
                                    <h3>Foto de Perfil</h3>
                                    <img id="preview" src="" alt="Image Preview">
                                    <br>
                                    <input type="text" value=${id} name="id" style="display: none;">
                                    <input type="file" id="imageUpload" accept="image/*" name="avatar">
                                    <input type="submit" id="span-button-photo" value="aceptar">
                                </form>
                            </div>
                        </div>
                    </div>
                </div>                       
               `
                //https://developer.mozilla.org/es/docs/Web/API/File_API/Using_files_from_web_applications#selecci%C3%B3n_de_ficheros_utilizando_html
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



            } else {
                //Indica que no hay datos de perfil y muestra un buton para crearlos
                spanDataClient.innerHTML = `
                <!-- Button trigger modal -->
                <p> No tienes información en tu perfil </p>
                <button id="boton-datos-cambio" type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Mis Datos </button>
                <div id="span-button-changepwd">
                </div>
                
                `
                // crea el form para los datos 
                formulario.innerHTML = `
               
                <div class="row g-3 align-items-center">
                    <div class="col-auto">
                        <label class="form-label" for="identificacion">Identificación:</label>
                    </div>
                    <div class="col-auto">
                        <input type="number" class="form-control" name="identificacion" id="identificacion"
                            required>
                    </div>
                    <div class="col-auto">
                        <span id="passwordHelpInline" class="form-text">
                            Numero 
                        </span>
                    </div>
                </div>

                <div class="row g-3 align-items-center">
                    <div class="col-auto">
                        <label for="nombres">Nombre:</label>
                    </div>
                    <div class="col-auto">
                        <input type="text" class="form-control" id="nombres" name="nombres" required>
                    </div>
                </div>

                <div class="row g-3 align-items-center">
                    <div class="col-auto">
                        <label class="form-label" for="apellidos">Apellidos:</label>
                    </div>
                    <div class="col-auto">
                        <input type="text" class="form-control" id="apellidos" name="apellidos" required>
                    </div>
                </div>

                <div class="row g-3 align-items-center">
                      <div class="col-auto">
                          <label class="form-label" for="edad">Edad:</label>
                      </div>
                      <div class="col-auto">
                          <input type="number" class="form-control" id="edad" name="edad" required>
                      </div>
                </div>


                <div class="row g-3 align-items-center">
                    <div class="col-auto">
                        <label class="form-label" for="correo">Correo Electrónico:</label>
                    </div>
                    <div class="col-auto">
                        <input type="email" class="form-control" id="correo" name="correo" required>
                    </div>
                </div>

                <div class="row g-3 align-items-center">
                    <div class="col-auto">
                        <label class="form-label" for="telefono">Teléfono:</label>
                    </div>
                    <div class="col-auto">
                        <input type="tel" class="form-control" id="telefono" name="telefono" required>
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
                <!-- 
                <div class="row g-3 align-items-center">
                    <div class="col-auto">
                        <label class="form-label" for="imagen">Imagen:</label>
                    </div>
                    <div class="col-auto">
                        <input type="file" class="form-control" id="imagen" name="imagen" accept="image/*"
                            required>
                    </div>
                </div> -->
                <!-- <label for="exampleColorInput" class="form-label">Color picker</label>
                <input type="color" class="form-control form-control-color" id="exampleColorInput" value="#563d7c"
                    title="Choose your color"> -->


                <div class="modal-footer">
                <!-- Button trigger modal -->
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
                    <button id="buton-patch-data-profile" class="btn btn-success" >Enviar</button>
                </div>
                `

                //añade manejador de eventos y dispara el fecth al darle enviar 
                formulario.addEventListener('submit', (event) => {
                    //previene que se envie el form como action
                    event.preventDefault()
                    const formData = new FormData(event.target);

                    data = {
                        id_usuario: id,
                        identificacion: formData.get('identificacion'),
                        nombres: formData.get('nombres'),
                        apellidos: formData.get('apellidos'),
                        correo: formData.get('correo'),
                        telefono: formData.get('telefono'),
                        direccion: formData.get('direccion'),
                        edad: formData.get('edad'),
                    }
                    // console.log(data)
                    sendDataProfile(data)
                    modal2.style.display = "none";

                })
            }

            //crea boton cambio de contraseñna 
            buttonChangePwd.innerHTML = `
            <button type="button" id="boton-contrasena-cambio" class="btn btn-dark mb-2" data-bs-toggle="modal" data-bs-target="#pwdModal">
            Cambiar Contraseña </button>
            `
            //crea modal cambio de contraseñna
            spanDataClientPwd.innerHTML = `
            <div class="modal fade" id="pwdModal" tabindex="-1" aria-labelledby="ModalLabelpwd" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 >Cambiar contraseña</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>


                    <div class="modal-body">
                        <form class="formregistro" id="dataFormChangePwd" action="/clientes/cliente/create" method="post">
                            
                            <div class="mb-2">
                                <label for="old-password" class="form-label">Contraseña Anterior:</label>
                                <input type="text" id="old-password" class="form-control" name="old-password"
                                    autocomplete="password" required>
                            </div>
                            <!-- <div class="mb-2">
                                <label for="email" class="form-label">Correo Electrónico:</label>
                                <input type="email" id="email" class="form-control" name="email" required>
                            </div> -->
                            <div class="mb-2">
                                <label for="new-password">Nueva Contraseña:</label>
                                <input type="text" id="new-password" class="form-control" name="contrasena"
                                    autocomplete="current-password" required>
                            </div>
                            <div class="mb-2">
                                <label for="repassword">Reescribir Contraseña:</label>
                                <input type="text" id="repassword" class="form-control" name="repassword"
                                    autocomplete="current-password" required>
                            </div>
                            <button class="btn btn-success mt-2">Enviar </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
             `
            // Ventana modal editar pwd
            let modal1 = document.getElementById("pwdModal");

            document.getElementById("dataFormChangePwd").addEventListener('submit', (event) => {
                event.preventDefault()
                const formData = new FormData(event.target)
                if (formData.get('repassword') !== formData.get('contrasena')) {
                    modal1.style.display = "none"
                    textSpan.innerHTML = "Contraseñas no coinciden"
                    mostrarModal()
                    // Recargar la página para mostrar los nuevos datos
                    return setTimeout(() => {
                        location.reload()
                    }, 2000)
                }
                let datos = {
                    oldpass: formData.get('old-password'),
                    contrasena: formData.get('contrasena')
                }
                console.log(datos);
                resetPwdUser(id, datos)
                modal1.style.display = "none"
            })
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
    // console.log("asdsa");
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



function resetPwdUser(id, datos) {
    fetch(`../clientes/cliente/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
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



// let buton = document.getElementById('pru')
// buton.addEventListener("click", mostrarModal)

// funcion que abre la ventana modal css
function mostrarModal() {
    modal.style.display = "block";
}

// Si el usuario hace click en la x, la ventana se cierra
span.addEventListener("click", function () {
    modal.style.display = "none";
});

// Si el usuario hace click fuera de la ventana, se cierra.
window.addEventListener("click", function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});




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

