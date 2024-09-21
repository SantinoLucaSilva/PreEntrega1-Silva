const destinos = [];


function cargarDestinosDesdeJSON() {
   fetch('./destinos.json')
       .then(response => response.json())
       .then(data => {
           destinos.length = 0;
           destinos.push(...data);
           cargarDestinos();
       })
       .catch(error => {
           console.error('Error al cargar los destinos:', error);
       });
}


function cargarDestinos() {
   const destinoSelect = document.getElementById("destinoSelect");
   destinoSelect.innerHTML = "";


   destinos.forEach((destino, index) => {
       const option = document.createElement("option");
       option.value = destino.nombre;
       option.text = destino.nombre;
       destinoSelect.appendChild(option);
   });
}


function cargarHospedajes() {
   const destinoElegido = document.getElementById("destinoSelect").value;
   const hospedajeSelect = document.getElementById("hospedajeSelect");
   hospedajeSelect.innerHTML = "";


   const destino = destinos.find(d => d.nombre === destinoElegido);
   destino.hospedajes.forEach((hospedaje, index) => {
       const option = document.createElement("option");
       option.value = index;
       option.text = `${hospedaje.nombre} - $${hospedaje.precio}`;
       hospedajeSelect.appendChild(option);
   });
}


function mostrarOpciones() {
   const presupuesto = parseFloat(document.getElementById("presupuesto").value);
   const personas = parseInt(document.getElementById("personas").value);


   const opcionesViables = destinos.flatMap(destino =>
       destino.hospedajes.map(hospedaje => {
           const costoHospedajeTotal = hospedaje.precio * 7 * personas;
           const costoTotal = destino.precio + costoHospedajeTotal;
           return (costoTotal <= presupuesto)
               ? `<div class="opcionViaje">${destino.nombre} con ${hospedaje.nombre} - $${costoTotal} (por ${personas} persona(s) durante 7 días)
                   <br><button class="abonarViaje" onclick="abonarViaje(${destinos.indexOf(destino)}, ${destino.hospedajes.indexOf(hospedaje)}, ${personas})">Abonar viaje</button>
               </div>`
               : null;
       }).filter(Boolean)
   );


   const resultado = opcionesViables.length > 0
       ? opcionesViables.join('')
       : "Lo siento, no hay opciones disponibles dentro de tu presupuesto.";
      
   document.getElementById("resultadoOpciones").innerHTML = resultado;
}


function calcularViaje() {
   const destinoElegido = document.getElementById("destinoSelect").value;
   const hospedajeIndex = document.getElementById("hospedajeSelect").value;
   const personas = parseInt(document.getElementById("personasViaje").value);
  
   if (!destinoElegido || hospedajeIndex === "") {
       document.getElementById("resultadoViaje").innerHTML = "Por favor selecciona un destino, hospedaje y cantidad de personas.";
       return;
   }


   const destino = destinos.find(d => d.nombre === destinoElegido);
   const hospedaje = destino.hospedajes[hospedajeIndex];
   const costoHospedajeTotal = hospedaje.precio * 7 * personas;
   const costoTotal = destino.precio + costoHospedajeTotal;


   document.getElementById("resultadoViaje").innerHTML = `
       El costo total de tu viaje a ${destino.nombre} con ${hospedaje.nombre} para ${personas} persona(s) durante 7 días es de $${costoTotal}.
       <br>
       <button class="abonarViaje" onclick="abonarViaje(${destinos.indexOf(destino)}, ${hospedajeIndex}, ${personas})">Abonar viaje</button>
   `;


   const viajeInfo = { destino: destino.nombre, hospedaje: hospedaje.nombre, precio: costoTotal };
   localStorage.setItem("viajeSeleccionado", JSON.stringify(viajeInfo));
}
function abonarViaje(indexDestino, indexHospedaje, personas) {
   const destino = destinos[indexDestino];
   const hospedaje = destino.hospedajes[indexHospedaje];
   const costoHospedajeTotal = hospedaje.precio * 7 * personas;
   const costoTotal = destino.precio + costoHospedajeTotal;


  
   procesarPago(destino, hospedaje, personas, costoTotal);
}


function procesarPago(destino, hospedaje, personas, costoTotal) {
   const numeroTarjeta = prompt("Ingresa el número de tu tarjeta de crédito:");
   const nombreTitular = prompt("Ingresa el nombre del titular de la tarjeta:");
   const fechaExpiracion = prompt("Ingresa la fecha de expiración (MM/AA):");
   const codigoSeguridad = prompt("Ingresa el código de seguridad (CVV):");


   if (numeroTarjeta && nombreTitular && fechaExpiracion && codigoSeguridad) {
       alert(`Pago procesado exitosamente!\n
       Detalles del viaje:\n
       Destino: ${destino.nombre}\n
       Hospedaje: ${hospedaje.nombre}\n
       Cantidad de personas: ${personas}\n
       Costo total: $${costoTotal}`);
   } else {
       alert("Pago fallido. Por favor, completa todos los campos de la tarjeta.");
   }
}


window.onload = function() {
   cargarDestinosDesdeJSON();
};
