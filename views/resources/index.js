let loginSpan = document.getElementById("login-span")
let menuSpanCollapsed = document.getElementById("dropdown-menu-collapsed")


let token = getCookie("token");

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


// se compruba identidad de la base 
fetch('/clientes/verify', {
    headers: {
        'Authorization': `Bearer ${token}`
    }
})
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        let rol = data.rol
        // console.log(rol);

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
      </div>`
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
          <li><a class="dropdown-item " href="/views/acceso0.2.html">Salir</a></li>
      </ul>     
      `
            // ----- ADMIN ------------------
            // ----- ADMIN ------------------
        } else if (rol === "admin") {
            loginSpan.innerHTML = `
      <div class="dropdown">
          <button  id="button-mainmenu-exp" class="btn btn-success dropdown-toggle m-2" type="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              ${data.nick_usuario}
          </button>
          <ul class="dropdown-menu">
              <li><a class="dropdown-item " href="../views/userProfile.html">Perfil</a></li>
              <li><a class="dropdown-item " href="../views/admin.html">Administración</a></li>
              <li><a class="dropdown-item " href="../views/acceso0.2.html">Salir</a></li>
          </ul>
      </div>`
            menuSpanCollapsed.innerHTML = `
      <button id="button-mainmenu" class="btn btn-success dropdown-toggle m-2" type="button" data-bs-toggle="dropdown"
      aria-expanded="false">
      ${data.nick_usuario}
      </button>
      <ul class="dropdown-menu">
          <li><a class="dropdown-item " href="../views/productos0.1.html">Productos</a></li>
          <li><a class="dropdown-item " href="./../index.html">Home</a></li>
          <li><a class="dropdown-item " href="./../views/userProfile.html">Perfil</a></li>
          <li><a class="dropdown-item " href="../views/admin.html">Administración</a></li>
          <li><a class="dropdown-item " href="/views/acceso0.2.html">Salir</a></li>
      </ul>     
       `
        }
        // automaticamente llama la funcion para comprobar si se cambio el color 
        autoChangeColor()
    }
    )





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



