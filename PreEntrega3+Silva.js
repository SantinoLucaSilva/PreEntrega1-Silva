const destinos = [
    { nombre: "Colombia", precio: 350, hospedajes: [
        { nombre: "Hotel Económico", precio: 560 },
        { nombre: "Hotel Lujo", precio: 720 },
        { nombre: "Hotel 5 Estrellas", precio: 1050 }
    ]},
    { nombre: "Ecuador", precio: 240, hospedajes: [
        { nombre: "Hotel Económico", precio: 145 },
        { nombre: "Hotel Lujo", precio: 320 },
        { nombre: "Hotel 5 Estrellas", precio: 620 }
    ]},
    { nombre: "Peru", precio: 180, hospedajes: [
        { nombre: "Hotel Economico", precio: 140 },
        { nombre: "Hotel Lujo", precio: 270 },
        { nombre: "Hotel 5 Estrellas", precio: 510 }
    ]},
    { nombre: "Chile", precio: 200, hospedajes: [
        { nombre: "Hotel Economico", precio: 310 },
        { nombre: "Hotel Lujo", precio: 570 },
        { nombre: "Hotel 5 Estrellas", precio: 830 }
    ]},
    { nombre: "Uruguay", precio: 280, hospedajes: [
        { nombre: "Hotel Economico", precio: 390 },
        { nombre: "Hotel Lujo", precio: 490 },
        { nombre: "Hotel 5 Estrellas", precio: 790 }
    ]},
    { nombre: "Brasil", precio: 380, hospedajes: [
        { nombre: "Hotel Economico", precio: 400 },
        { nombre: "Hotel Lujo", precio: 620 },
        { nombre: "Hotel 5 Estrellas", precio: 1110 }
    ]},
    { nombre: "Paraguay", precio: 150, hospedajes: [
        { nombre: "Hotel Economico", precio: 110 },
        { nombre: "Hotel Lujo", precio: 230 },
        { nombre: "Hotel 5 Estrellas", precio: 360 }
    ]}
];

function mostrarOpciones() {
    const presupuesto = parseFloat(document.getElementById("presupuesto").value);
    const personas = parseInt(document.getElementById("personas").value);

    const opcionesViables = destinos.flatMap(destino =>
        destino.hospedajes.map(hospedaje => {
            const costoHospedajeTotal = hospedaje.precio * 7 * personas; 
            const costoTotal = destino.precio + costoHospedajeTotal; 
            return (costoTotal <= presupuesto)
                ? `${destino.nombre} con ${hospedaje.nombre} - $${costoTotal} (por ${personas} persona(s) durante 7 días)`
                : null;
        }).filter(Boolean)
    );

    const resultado = opcionesViables.length > 0
        ? opcionesViables.join('<br>')
        : "Lo siento, no hay opciones disponibles dentro de tu presupuesto.";
    document.getElementById("resultadoOpciones").innerHTML = resultado;
}

function calcularViaje() {
    const destinoElegido = document.getElementById("destinoSelect").value;
    const hospedajeIndex = document.getElementById("hospedajeSelect").value;
    const personas = parseInt(document.getElementById("personasViaje").value);
    const destino = destinos.find(d => d.nombre === destinoElegido);
    const hospedaje = destino.hospedajes[hospedajeIndex];

    const costoHospedajeTotal = hospedaje.precio * 7 * personas; 
    const costoTotal = destino.precio + costoHospedajeTotal;

    document.getElementById("resultadoViaje").innerHTML =
        `El costo total de tu viaje a ${destino.nombre} con ${hospedaje.nombre} para ${personas} persona(s) durante 7 días es de $${costoTotal}`;

    const viajeInfo = { destino: destino.nombre, hospedaje: hospedaje.nombre, precio: costoTotal };
    localStorage.setItem("viajeSeleccionado", JSON.stringify(viajeInfo));
}

function cargarDestinos() {
    const destinoSelect = document.getElementById("destinoSelect");
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

window.onload = cargarDestinos;