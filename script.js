import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getDatabase,
ref,
push,
onValue,
remove
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

import { firebaseConfig } from "./firebase.js";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// REGISTRAR VEHICULO
function registrarVehiculo(){

let placa = document.getElementById("placa").value
let lugar = document.getElementById("lugar").value
let runner = document.getElementById("runner").value
let hora = new Date().toLocaleString()

if(!placa){
alert("Ingrese una placa")
return
}

push(ref(db,"vehiculos"),{
placa,
lugar,
runner,
hora
})

alert("Vehículo registrado")

document.getElementById("placa").value=""

}

window.registrarVehiculo = registrarVehiculo


// CARGAR DATOS EN LA TABLA
const tabla = document.querySelector("#tabla tbody")

if(tabla){

const vehiculosRef = ref(db,"vehiculos")

onValue(vehiculosRef,(snapshot)=>{

tabla.innerHTML=""

snapshot.forEach((child)=>{

let data = child.val()
let id = child.key

let fila = document.createElement("tr")

fila.innerHTML=`

<td>${data.placa}</td>
<td>${data.lugar}</td>
<td>${data.runner}</td>
<td>${data.hora}</td>
<td><button onclick="eliminar('${id}')">X</button></td>

`

tabla.appendChild(fila)

})

})

}


// ELIMINAR
function eliminar(id){

remove(ref(db,"vehiculos/"+id))

}

window.eliminar = eliminar
