// let total = []
const shoppingCarItemsContainer = document.querySelector(".shoppingCarItemsContainer")
let shoppingCartTotal = document.getElementById("shopping-car-total")
let botonComprarCarrito = document.getElementById("comprar-span")
let totalValorShoppingCart = 0
let guardadosParaShoppingCart = []
let loginSpan = document.getElementById("login-span")
let menuSpanCollapsed = document.getElementById("dropdown-menu-collapsed")

// POO Clase de producto
// class Producto {
//   constructor(id, nombre, descripcion, precio, href, alt) {
//     this.id = id
//     this.nombre = nombre
//     this.descripcion = descripcion
//     this.precio = precio
//     this.href = href
//     this.alt = alt
//   }
// }

let token = getCookie("token");

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


// se verifica rol por medio de token y traen productos de la base apenas se ingresa a la pagina
fetch('/productos', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
  .then(response => response.json())
  .then(data => {
    let id = data.id_usuario
    let rol = data.rol
    //valida si no esta registrado y si esta inactivo
    if (typeof id === 'string' || rol === 'inactivo') {
      id = 0
    }
    // ----- si es cliente muestra el menu CLIENTE ------------------
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
          <li><a class="dropdown-item " href="acceso0.2.html">Salir</a></li>
      </ul>     
      `
      // ----- si es admin muestra el menu  ADMIN ------------------
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
          <li><a class="dropdown-item " href="../views/admin.html">Administración</a></li>
          <li><a class="dropdown-item " href="acceso0.2.html">Salir</a></li>
      </ul>     
       `
    }
    // console.log(loginSpan);
    //muestra datos de los productos en en cards 
    data.rows.forEach(producto => {
      // console.log(producto);
      //convertir number a cop para mostrar en card
      let numberOtro = new Intl.NumberFormat('co-CP', { style: 'currency', currency: 'COP' }).format(
        producto.precio)
      document.getElementById("spanCardsProducts").innerHTML += `
            <div class="card" style="width: 18rem;">
                <img src="${producto.imagen_producto}" class="card-img-top" alt="${producto.nombre_producto}">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre_producto}</h5>
                    <p class="card-text">${producto.descripcion_producto}</p>
                    <p class="card-text">${numberOtro}</p>
                    <p class="card-text">Stock: <span class="span">${producto.inventario}</span> <span id="unidad">Unidades </span> </p>
                    <a class="btn btn-secondary" id="add-button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" onclick=sum(${producto.id_producto},${id}) )>Adicionar a carrito</a>
                </div>
            </div>`

      if (producto.inventario === 1) {
        let unidadesOUni = document.getElementById('unidad')
        unidadesOUni.innerHTML = "Unidad"
      }
    });
    //Valída si es usuario y sí lo es genera un fetch de la información se encuentra un carrito en el usuario

    if (typeof (id) !== "string") {
      fetchSiHayCarrito(id)
    }
    // automaticamente llama la funcion para comprobar si se cambio el color 
    autoChangeColor()
  }
  )

//comprueba si hay un carrito previo del usuario si la hay invoca los productos 
function fetchSiHayCarrito(idCliente) {
  fetch(`/carrito/comprobate/${idCliente}`, {
  })
    .then(response => response.json())
    .then(data => {
      //Sí encuentra carrito trae los productos que hayan en el mismo y cambia la imagen de El carrito
      // console.log(data.length);
      // console.log(data);

      if (data.length > 0) {
        let idCarrito = data[0].id_carrito
        fetchCarritoProducts(idCarrito, idCliente)
        carritoCambioimgLleno()
      } else {
        // si no encuentra productos vacia el carrito 
        carritoCambioimgVacio()
        shoppingCartTotal.innerHTML=0
        botonComprarCarrito.innerHTML=""
      }
    })
}



// // se genera varias instancias de Clase Producto
// const Producto1 = new Producto(1, "Terrario Cubico", "3 suculentas / cactus , Alto: 15CM Diametro: 15CM", 69000, "./../public/product1.png", "producto1")
// const Producto2 = new Producto(2, "Dodecaedro Estrella", "3 suculentas / cactus , Alto: 16CM Diametro: 19CM", 85000, "./../public/product2.png", "producto2")
// const Producto3 = new Producto(3, "Dodecaedro Piramidal", "5 suculentas / cactus , Alto: 30CM Diametro: 26CM", 124000, "./../public/product3.png", "producto2")
// const Producto4 = new Producto(4, "Mesa Hexagonal", "3 suculentas / cactus , Alto: 7CM Diametro: 16CM", 75000, "./../public/product4.png", "producto2")
// const Producto5 = new Producto(5, "Cubico 3D", "7/8 suculentas / cactus , Alto: 18CM Diametro: 18CM", 150000, "./../public/product5.png", "producto2")


// se ingresa productos a la base 
// total.push(Producto1, Producto2, Producto3, Producto4, Producto5)

//funcion principal cuando se le da al boton de carrito
function sum(idProduct, idCliente) {
  // se compruba identidad de la base de datos
  if (!idCliente) {
    let notUser = `
      <p>"No tienes cuenta <a href="./registro.html">Registrate</a>"</p>
      `
    botonComprarCarrito.innerHTML = notUser
    borrarProductos()
  } else {
    let data = {
      idProduct: idProduct,
      idUser: idCliente,
    }
    fetch('/carrito/create', {
      //El Content-Type de la request debe ser àpplication/json para que bodyParser construya el req.body de otra manera lo deja vacío.
      headers: {
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        // borra la data previa y genera unevo fetch con los datos 
        borrarFetch()
        return fetchSiHayCarrito(idCliente)
      })
  }

  // previamente se hizo solo en javascrippt sin memooria
  // let name = document.getElementsByClassName("btn btn-primary")[idProduct - 1].offsetParent.children[1].children[0].innerText;
  // let priceValue = document.getElementsByClassName("btn btn-primary")[idProduct - 1].offsetParent.children[1].children[2].innerText;
  // let inventarioValue = document.getElementsByClassName("btn btn-primary")[idProduct - 1].offsetParent.children[1].children[3].children[0].innerText;
  // let imageSrc = document.getElementsByClassName("btn btn-primary")[idProduct - 1].offsetParent.children[0].currentSrc;
  // let priceNum = priceValue.replace("COP", "")
  // let priceNuma = priceNum.replace(",00", "")
  // let price = Number(priceNuma.replace(".", ""))
  // addToTotal(price)
  // addToShoppingCart(name, imageSrc, priceValue)
}

// borra los productos del carrito presentado en el front al usuario y el total de los mismos 
function borrarFetch() {
  shoppingCarItemsContainer.innerHTML = ""
  totalValorShoppingCart = 0
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
        let notformatPrice = element.precio * valueCantidad
        let formatCartPrice = new Intl.NumberFormat('co-CP', { style: 'currency', currency: 'COP' }).format(
          (element.precio * valueCantidad))
        const shoppingCarContent = ` 
     <div class="container">
        <div class="shopping-car-items shoppingCarItemContainer">
            <div class="row shoppingCarItem">

                <div class="col-3" class="shopping-car-item d-flex align-items-center h-100 order-bottom pb-2 pt-3 -pl-2">
                    <img src=${element.imagen_producto} class="shopping-car-image" style="width: 50px; height: 50px;">
                    <h6 class="shopping-car-item-title shoppingItemCarItemTitle ">${element.nombre_producto}</h6>
                </div>

                <div class="col-4" class="shopping-car-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                    <p class="item-price mb-0 shoppingCarItemPrice">${(formatCartPrice)}</p>
                </div>

                <div  class="col-2" >
                    <p class="item-price mb-0 shoppingCarItemQuantity">${(valueCantidad)}</p>
                </div>

                <div class="col-2">
                   <button type="button" class="btn btn-danger deleteButton" onclick=deleteOneProductCarrito(${element.id_producto},${idCliente},${idCarrito})>X
                   </button>
                </div>

            </div>
        </div>
     </div>
  `
        shoppingCarRow.innerHTML = shoppingCarContent
        shoppingCarItemsContainer.append(shoppingCarRow)
        //actualiza el precio total
        addToTotal(notformatPrice)
        // crea y actualiza sustantivo del boton segun si es uno o muchos  
        addButtonToBuy(sustantivo)

      })
    })
}


//borra un producto del carro y comprueba si queda vacio para eliminar el carrito
function deleteOneProductCarrito(idProducto, idCliente, idCarrito) {
  fetch(`/carrito/delete/${idProducto}/${idCarrito}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(result => {
      console.log(result);
      borrarFetch()
      // se deja un tiempo para que haga el fetch de los productos 
      fetchSiHayCarrito(idCliente)
    })
}

// Funcion que adiciona el boton de comprar al dar en agregar a carrito en un producto
function addButtonToBuy(sustantivo) {
  let comprar = `
  <div class="col-6">
     <a href="./transaccion.html">
      <button id="ultimo-enlace" class="btn btn-success" class="btn-close" aria-label="Close">Confirmar ${sustantivo}
      </button>
     </a>
  <div>

  `
  botonComprarCarrito.innerHTML = comprar
}

function carritoCambioimgLleno() {
  document.getElementById("carrito").src = "../public/carritolleno100x100.png"
}
function carritoCambioimgVacio() {
  document.getElementById("carrito").src = "../public/carrito100x100.png"
}

// borra los productos para que solo quede la lista del carrito 
function borrarProductos() {
  document.getElementById("spanCardsProducts").innerHTML = `
  <p>"No tienes cuenta <a href="./registro.html">Registrate</a>"</p>
  `
}

//Suma el valor total del carro 
function addToTotal(value) {
  totalValorShoppingCart = totalValorShoppingCart + value
  let numberFormatiadoColombia = new Intl.NumberFormat('co-CP', { style: 'currency', currency: 'COP' }).format(
    totalValorShoppingCart)
  shoppingCartTotal.innerHTML = numberFormatiadoColombia
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








// -----Funciones usadas en version anterior -------------------------------------------------- 
// -----Funciones usadas en version anterior -------------------------------------------------- 
// -----Funciones usadas en version anterior -------------------------------------------------- 
// -----Funciones usadas en version anterior -------------------------------------------------- 


//Funcion que adiciona los datos en un div presentable
// function addToShoppingCart(name, image, price) {
//   const shoppingCarRow = document.createElement('div');
//   const shoppingCarContent = `  <div class="container">
//     <div class="shopping-car-items shoppingCarItemContainer">
//       <div class="row shoppingCarItem">

//         <div class="col-4" class="shopping-car-item d-flex align-items-center h-100 order-bottom pb-2 pt-3 -pl-2">
//           <img src=${image} class="shopping-car-image" style="width: 50px; height: 50px;">
//           <h6 class="shopping-car-item-title shoppingItemCarItemTitle ">${name}</h6>
//         </div>

//         <div class="col-5" class="shopping-car-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
//           <p class="item-price mb-0 shoppingCarItemPrice">${price}</p>
//         </div>
         
//         <div class="col-1">
//           <p class="shoppingCarItemQuantity">0</p>
//         </div>

//         <div class="col-1">
//           <button type="button" 
//                   class="btn btn-danger deleteButton ">X
//           </button>  
//         </div>
        
//       </div>

//     </div>
//   </div>
//   `
//   shoppingCarRow.innerHTML = shoppingCarContent
//   shoppingCarItemsContainer.append(shoppingCarRow)
//   guardadosParaShoppingCart.push(shoppingCarContent);
//   spanShoppingCart(guardadosParaShoppingCart)
// }


// function spanShoppingCart(Items) {
//   let spanShoppingCart = document.getElementById("CartShoppingSpace")
//   spanShoppingCart.innerHTML = `
//   <div class="shoppingRows">
//     <div class="row shoppingRows">
//         <div class="col">Produaacto</div>
//         <div class="col ">Preciaao</div>
//         <div class="col">Cantidaaad</div>
//     </div>
//     ${Items}
//     <div class="row">
//         <div class="col">
//             <p>Total $ </p>
//         </div>
//         <div class="col">
//             <p type="number" id="shopping-car-total">${totalValorShoppingCart}</p>
//             <button class="btn btn-success" onclick=>Comprar</button>
//         </div>
//     </div>
// </div>
//   `
// }

// -----Funciones usadas en version anterior -------------------------------------------------- 
// -----Funciones usadas en version anterior -------------------------------------------------- 
// -----Funciones usadas en version anterior -------------------------------------------------- 
// -----Funciones usadas en version anterior -------------------------------------------------- 

