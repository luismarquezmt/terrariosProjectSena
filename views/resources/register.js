//texto del modal
let textSpan = document.getElementById("textoSpan");
// Ventana modal
let modal = document.getElementById("ventanaModal");
// Botón que abre el modal
let boton = document.getElementById("abrirModal");
// Hace referencia al elemento <span> que tiene la X que cierra la ventana
let span = document.getElementsByClassName("close")[0];

// Obtener datos de la base de datos y mostrarlos
// fetch('/clientes')
//     .then(response => response.json())
//     .then(data => {
//         const dataDiv = document.getElementById('data');
//         data.forEach(item => {
//             const div = document.createElement('div');
//             div.textContent = `Campo 1: ${item.id_usuario}, Campo 2: ${item.nick_usuario}, Campo 3: ${item.contrasena}`;
//             dataDiv.appendChild(div);
//         });
//     });

// Enviar datos a la base de datos
document.getElementById('dataForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    if (formData.get('repassword') !== formData.get('contrasena')) {
        textSpan.innerHTML = "Contraseñas no coinciden"
        mostrarModal()
        // Recargar la página para mostrar los nuevos datos
        return setTimeout(() => {
            location.reload()
        }, 2000)
    }
    const data = {
        nick_usuario: formData.get('nick_usuario'),
        contrasena: formData.get('contrasena')
    };
    // console.log(data);

    fetch('/clientes/cliente/create', {
        method: 'POST',
        //El Content-Type de la request debe ser àpplication/json para que bodyParser construya el req.body de otra manera lo deja vacío.
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.text())
        .then(result => {
            // console.log(message);}
            textSpan.innerHTML = result
            if (result === "Usuario registrado previamente") {
                mostrarModal()
                // Recargar la página para mostrar los nuevos datos
                setTimeout(() => {
                    location.reload()
                }, 3000)
            } else {
                mostrarModal()
                // Recargar la página para mostrar los nuevos datos
                setTimeout(() => {
                    location.replace("./acceso0.2.html");
                }, 3000)
            }
        });
});



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