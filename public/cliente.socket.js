const socket = io();

const txtProducto = document.querySelector('#productoText');
const txtPrecio = document.querySelector('#precioText');
const txtUrl = document.querySelector('#urlText');
const form = document.querySelector('#productoForm');

const chatForm = document.querySelector('#chatForm');
const txtEmail = document.querySelector('#email');
const txtMensaje = document.querySelector('#mensaje');

form.addEventListener('submit', event => {
    event.preventDefault;
    socket.emit('cliente:producto', {nombre: txtProducto.value,precio: txtPrecio.value,url: txtUrl.value})
})

chatForm.addEventListener('submit', event => {
    event.preventDefault();
    socket.emit('cliente:chat', {email: txtEmail.value,mensaje: txtMensaje.value})
})


function renderProduct(productos){
    fetch('/product.hbs').then(response => {
        response.text().then((plantilla) => {
            document.querySelector('#productos').innerHTML = "";
            productos.forEach(producto => {
                const template = Handlebars.compile(plantilla)
                const html = template(producto)
                document.querySelector('#productos').innerHTML += html
            })
        })
    })   
}

function renderChat(mensajes){
    fetch('/mensajes.hbs').then(response => {
        response.text().then((plantilla) => {
            document.querySelector('#mensajesChat').innerHTML = "";
            mensajes.forEach(mensaje => {
                const template = Handlebars.compile(plantilla)
                const html = template(mensaje)
                document.querySelector('#mensajesChat').innerHTML += html
            })
        })
    })   
}

socket.on('server:productos', productos => { 
    console.log(productos)
        renderProduct(productos);
})

socket.on('server:chat', mensajes => { 
    renderChat(mensajes);
})