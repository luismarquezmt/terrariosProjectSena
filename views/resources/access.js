//variables 
//texto del modal
let textSpan = document.getElementById("textoSpan");
// Ventana modal
let modal = document.getElementById("ventanaModal");
// Botón que abre el modal
let boton = document.getElementById("abrirModal");
// Hace referencia al elemento <span> que tiene la X que cierra la ventana
let span = document.getElementsByClassName("close")[0];


// Enviar datos a la base de datos
document.getElementById('dataForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
        nick_usuario: formData.get('nick_usuario'),
        contrasena: formData.get('contrasena')
    };
    // console.log(data);
    fetch('/clientes/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(result => {
            // console.log(result.token);
            textSpan.innerHTML = result.msg
            mostrarModal()
            if (result.msg === "Usuario no existente") {
                return setTimeout(() => {
                    location.reload();
                }, 2000)
            }
            else if (result.msg === "Revisa tus credenciales") {
                return setTimeout(() => {
                    location.reload();
                }, 3000)
            } else if (result.msg.includes("Admin")) {
                return setTimeout(() => {
                    location.replace("./admin.html");
                }, 3000)

            } else if (result.msg.includes("inactivo")) {
                return setTimeout(() => {
                    location.reload()
                }, 3000)
            } else {
                return setTimeout(() => {
                    location.replace("./productos0.1.html");
                }, 3000)

            }
            // Recargar la página para mostrar los nuevos datos
            // location.reload();
        });
});

// let buton = document.getElementById('pru')
// buton.addEventListener("click", mostrarModal)

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
