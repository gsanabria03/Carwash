import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getFirestore,
collection,
addDoc,
getDocs,
deleteDoc,
doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { firebaseConfig } from "./firebase.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function registrarVehiculo(){

let placa = document.getElementById("placa").value
let lugar = document.getElementById("lugar").value
let runner = document.getElementById("runner").value
let hora = new Date().toLocaleString()

await addDoc(collection(db,"vehiculos"),{
placa,
lugar,
runner,
hora
})

alert("Vehículo registrado")

document.getElementById("placa").value=""

}

window.registrarVehiculo = registrarVehiculo

async function cargarDatos(){

let tabla = document.querySelector("#tabla tbody")

if(!tabla) return

const querySnapshot = await getDocs(collection(db,"vehiculos"))

querySnapshot.forEach((docu)=>{

let data = docu.data()

let fila = document.createElement("tr")

fila.innerHTML=`

<td>${data.placa}</td>
<td>${data.lugar}</td>
<td>${data.runner}</td>
<td>${data.hora}</td>
<td><button onclick="eliminar('${docu.id}')">X</button></td>

`

tabla.appendChild(fila)

})

}

async function eliminar(id){

await deleteDoc(doc(db,"vehiculos",id))

location.reload()

}

window.eliminar = eliminar

cargarDatos()
