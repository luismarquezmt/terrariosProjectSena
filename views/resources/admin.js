//texto del modal
let textSpan = document.getElementById("textoSpan");
// Ventana modal
let modal = document.getElementById("ventanaModal");
// Botón que abre el modal
let boton = document.getElementById("abrirModal");
// Hace referencia al elemento <span> que tiene la X que cierra la ventana
let span = document.getElementsByClassName("close")[0];
// console.log(document.cookie); obtener cookie creada en el login
let token = getCookie("token");

//prueba de token 
// fetch('../clientes/admin', {
//     headers: {
//         'Authorization': `Bearer ${token}`
//     },

// })
//     .then(response => response.text())
//     .then(result => {
//         console.log(result);
//     })

// let buton = document.getElementById('pru')
// buton.addEventListener("click", mostrarModal)


// Obtener datos de la base de datos y mostrarlos
fetch('/clientes', {
    headers:
    {
        'Authorization': `Bearer ${token}`
    }
})
    .then(response => response.json())
    .then(data => {
        // console.log(data.msg);
        textSpan.innerHTML = data.msg
        // console.log(data);
        mostrarModal()
        let menuAdmin = `
        <div class="dropdown">
          <button class="btn btn-success dropdown-toggle m-2" type="button" data-bs-toggle="dropdown"
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
        if (data.msg === "Access forbidden") {
            return setTimeout(() => {
                location.replace("./productos0.1.html");
            }, 2000)
        } else if (data.msg === "Failed to authenticate token") {
            return setTimeout(() => {
                location.replace("./acceso0.2.html");
            }, 2000)
        }
        else if (data.msg === "No token provided") {
            return setTimeout(() => {
                location.replace("./acceso0.2.html");
            }, 2000)
        }
        // traer la información de la base de datos y pintarla en una tabla
        let dataMain = data.rows
        const dataDiv = document.getElementById('data');
        let nameBar = document.getElementById("name-bar")
        nameBar.innerHTML = menuAdmin

        dataMain.forEach(item => {
            const div = document.createElement('tr');
            // div.textContent = `id: ${item.id_usuario}, username: ${item.nick_usuario}, pwd: ${item.contrasena}, rol: ${item.rol}`;
            div.innerHTML = `  
            <th scope="row" class="id_number"><input type="text" class="id_number" name="id_cliente" id="user_${item.id_usuario}" value="${item.id_usuario}" disabled></td>
            <td class="id_number"><input class="id_name" type="text" id="${item.nick_usuario}" name="nick_user" value="${item.nick_usuario}" disabled></td>
            <td class="rol_selection">       
                    <select name="roles" id="rol_${item.id_usuario}" disabled>
                       <option value="${item.rol}">  ${item.rol}</option>
                       <option value="admin">admin</option>           
                       <option value="cliente">cliente</option>           
                    </select>        
               </div>
            </td>

            <td class="id_number">
               <div class="dropdown">
                  <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                       <img src="../public/config.png" alt="ico.config" id="ico-config">
                 </button>
                    <ul class="dropdown-menu">
                       <li><button  class="dropdown-item button-edit"  onclick="editParams(${item.id_usuario},'${item.nick_usuario}'  )" >Editar</button></li>
                      <li><button type="button" class="dropdown-item" onclick="deleteUser(${item.id_usuario})">Borrar</button></li>
                      <li><button type="button" class="dropdown-item" onclick="resetPwdUser(${item.id_usuario})">Reset Password</button></li>
                   </ul>
               </div>
            </td>
                    `;
            dataDiv.appendChild(div);


        });
    }).catch(err => {
        return mostrarModal()
    });


// ------------------EDITAR/PATCH----------------- 
// ------------------EDITAR/PATCH----------------- 

// function that sends the form data to the clientes route then database and the Patch
function sendDataPatch(id) {
    //trae form y datos del mismo
    let formulario = document.getElementById('dataForm')
    console.log(formulario);
    const formData = new FormData(formulario);
    const data = {
        // id_usuario: id,
        nick_usuario: formData.get('nick_user'),
        rol: formData.get('roles')
    };
    fetch(`../clientes/cliente/${id}`, {
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

//button that cancels the action when editing
function cancelAction(id, nick) {
    document.getElementById(nick).setAttribute("disabled", true);
    document.getElementById(`rol_${id}`).setAttribute("disabled", true);
    let nodeList = document.querySelectorAll(".button-edit")

    for (let i = 0; i < nodeList.length; i++) {
        nodeList[i].style.backgroundColor = "white";
        nodeList[i].removeAttribute("disabled");
    }
    let sendButton = document.getElementById("button-edit")
    sendButton.innerHTML = ""

}


//button that creates two other buttons with the function of sending data or canceling the action
function editParams(id, nick) {
    console.log(id);
    let rol = document.getElementById(`rol_${id}`)
    // document.getElementById(`user_${id}`).removeAttribute("disabled");
    document.getElementById(nick).removeAttribute("disabled");
    rol.removeAttribute("disabled");
    console.log(nick);
    let nodeList = document.querySelectorAll(".button-edit")

    for (let i = 0; i < nodeList.length; i++) {
        nodeList[i].style.backgroundColor = "red";
        nodeList[i].setAttribute("disabled", true);
    }
    let sendButton = document.getElementById("button-edit")
    sendButton.innerHTML = `
    <div id="buttons-edits">
       <button type="button" class="btn btn-danger m-2 p-4" onclick="cancelAction(${id},'${nick}')">Cancelar</button>
       <button type="button" class="btn btn-success m-2 p-4" onclick="sendDataPatch(${id})" >Enviar Cambios</button>
    </div>
    `
}


// ------------------BORRAR / DELETE -----------------
// ------------------BORRAR / DELETE -----------------


function deleteUser(id) {
    fetch(`../clientes/cliente/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
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


// ------------------BORRAR / DELETE -----------------
// ------------------BORRAR / DELETE -----------------

function resetPwdUser(id) {
    const data = {
        contrasena: "1234"
    };
    fetch(`../clientes/cliente/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(result => {
            // console.log(result)
            textSpan.innerHTML = result.msg
            mostrarModal()
        });
    // return setTimeout(() => {
    //     location.reload();
    // }, 3000)
}

// ---------------UTILS "funciones que ayudan a las principales"---------

//traer cookie
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


// funcion que abre la ventana modal
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


//funcion que crea un elemento le da un atributo tomando un elemento del html  
function createElement(whatElement, attribute, whatAttribute, appendWhere) {
    let createdElement = document.createElement(whatElement)
    createdElement.setAttribute(attribute, whatAttribute)
    document.getElementById(appendWhere).appendChild(createdElement)
}
