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





// se traen productos de la base 
fetch('/productos', {
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
          <button class="btn btn-success dropdown-toggle m-2" type="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              ${data.nick_usuario}
          </button>
          <ul class="dropdown-menu">
              <li><a class="dropdown-item " href="../views/userProfile.html">Perfil</a></li>
              <li><a class="dropdown-item " href="../views/productos0.1.html">Mis Productos</a></li>
              <li><a class="dropdown-item " href="../views/acceso0.2.html">Salir</a></li>
          </ul>
      </div>`
      menuSpanCollapsed.innerHTML = `
      <button class="btn btn-success dropdown-toggle m-2" type="button" data-bs-toggle="dropdown"
      aria-expanded="false">
      ${data.nick_usuario}
      </button>
      <ul class="dropdown-menu">
          <li><a class="dropdown-item " href="../views/productos0.1.html">Productos</a></li>
          <li><a class="dropdown-item " href="./../index.html">Home</a></li>
          <li><a class="dropdown-item " href="../views/userProfile.html">Perfil</a></li>
          <li><a class="dropdown-item " href="../views/productos0.1.html">Mis Productos</a></li>
          <li><a class="dropdown-item " href="acceso0.2.html">Salir</a></li>
      </ul>     
      `
      // ----- ADMIN ------------------
      // ----- ADMIN ------------------
    } else if (rol === "admin") {
      loginSpan.innerHTML = `
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
      </div>`
      menuSpanCollapsed.innerHTML = `
      <button class="btn btn-success dropdown-toggle m-2" type="button" data-bs-toggle="dropdown"
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
    //muestra datos en cards
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
                    <a class="btn btn-primary"  onclick=sum(${producto.id_producto}) )>Adicionar a carrito</a>
                </div>
            </div>`

      if (producto.inventario === 1) {
        let unidadesOUni = document.getElementById('unidad')
        unidadesOUni.innerHTML = "Unidad"
      }
    });
  }
  )
// // se genera varias instancias de Clase Producto
// const Producto1 = new Producto(1, "Terrario Cubico", "3 suculentas / cactus , Alto: 15CM Diametro: 15CM", 69000, "./../public/product1.png", "producto1")
// const Producto2 = new Producto(2, "Dodecaedro Estrella", "3 suculentas / cactus , Alto: 16CM Diametro: 19CM", 85000, "./../public/product2.png", "producto2")
// const Producto3 = new Producto(3, "Dodecaedro Piramidal", "5 suculentas / cactus , Alto: 30CM Diametro: 26CM", 124000, "./../public/product3.png", "producto2")
// const Producto4 = new Producto(4, "Mesa Hexagonal", "3 suculentas / cactus , Alto: 7CM Diametro: 16CM", 75000, "./../public/product4.png", "producto2")
// const Producto5 = new Producto(5, "Cubico 3D", "7/8 suculentas / cactus , Alto: 18CM Diametro: 18CM", 150000, "./../public/product5.png", "producto2")


// se ingresa productos a la base 
// total.push(Producto1, Producto2, Producto3, Producto4, Producto5)

//funcion principal cuando se le da al boton de carrito
function sum(number) {
  let name = document.getElementsByClassName("btn btn-primary")[number - 1].offsetParent.children[1].children[0].innerText;
  let priceValue = document.getElementsByClassName("btn btn-primary")[number - 1].offsetParent.children[1].children[2].innerText;
  let inventarioValue = document.getElementsByClassName("btn btn-primary")[number - 1].offsetParent.children[1].children[3].children[0].innerText;
  let imageSrc = document.getElementsByClassName("btn btn-primary")[number - 1].offsetParent.children[0].currentSrc;
  let priceNum = priceValue.replace("COP", "")
  let priceNuma = priceNum.replace(",00", "")
  let price = Number(priceNuma.replace(".", ""))
  addToTotal(price)
  addToShoppingCart(name, imageSrc, priceValue)
  // funcionDemora()
  carritoCambioimg()
  addButtonToBuy()
}

async function funcionDemora() {
  fetch()
  setTimeout(() => {
    console.log("mora en este proceso ");
    setTimeout(() => {
      location.reload()
    }, 2500)
  }, 1500)
}

//Suma el valor total del carro 
function addToTotal(value) {
  totalValorShoppingCart = totalValorShoppingCart + value
  let numberFormatiadoColombia = new Intl.NumberFormat('co-CP', { style: 'currency', currency: 'COP' }).format(
    totalValorShoppingCart)
  shoppingCartTotal.innerHTML = numberFormatiadoColombia
}


//Funcion que adiciona los datos en un div presentable
function addToShoppingCart(name, image, price) {
  const shoppingCarRow = document.createElement('div');
  const shoppingCarContent = `  <div class="container">
    <div class="shopping-car-items shoppingCarItemContainer">
      <div class="row shoppingCarItem">

        <div class="col-4" class="shopping-car-item d-flex align-items-center h-100 order-bottom pb-2 pt-3 -pl-2">
          <img src=${image} class="shopping-car-image" style="width: 50px; height: 50px;">
          <h6 class="shopping-car-item-title shoppingItemCarItemTitle ">${name}</h6>
        </div>

        <div class="col-5" class="shopping-car-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
          <p class="item-price mb-0 shoppingCarItemPrice">${price}</p>
        </div>
         
        <div class="col-1">
          <p class="shoppingCarItemQuantity">0</p>
        </div>

        <div class="col-1">
          <button type="button" 
                  class="btn btn-danger deleteButton ">X
          </button>  
        </div>
        
      </div>

    </div>
  </div>
  `
  shoppingCarRow.innerHTML = shoppingCarContent
  shoppingCarItemsContainer.append(shoppingCarRow)
  guardadosParaShoppingCart.push(shoppingCarContent);
  spanShoppingCart(guardadosParaShoppingCart)
}


// Funcion wur adiciona el boton de comprar al dar en agregar a carrito en un producto

function addButtonToBuy() {
  let comprar = `<button class="btn btn-success" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" onclick=borrarProductos()>Siguiente</button>`
  botonComprarCarrito.innerHTML = comprar
}


// borra los productos para que solo quede la lista del carrito 
function borrarProductos() {
  document.getElementById("spanCardsProducts").innerHTML = ""
}






function carritoCambioimg() {
  document.getElementById("carrito").src = "../public/carritolleno100x100.png"
}

function spanShoppingCart(Items) {
  let spanShoppingCart = document.getElementById("CartShoppingSpace")
  spanShoppingCart.innerHTML = `
  <div class="shoppingRows">
    <div class="row shoppingRows">
        <div class="col">Producto</div>
        <div class="col ">Precio</div>
        <div class="col">Cantidad</div>
    </div>
    ${Items}
    <div class="row">
        <div class="col">
            <p>Total $ </p>
        </div>
        <div class="col">
            <p type="number" id="shopping-car-total">${totalValorShoppingCart}</p>
            <button class="btn btn-success" onclick=>Comprar</button>
        </div>
    </div>
</div>
  `
}
