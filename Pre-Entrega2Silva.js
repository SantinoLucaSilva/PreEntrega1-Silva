
const nombreUsuario = prompt("¡Hola! Por favor, ingresa tu nombre:");
alert(`¡Bienvenido, ${nombreUsuario}!`);

const destinos = [
    { nombre: "Colombia", precio: 3500, hospedajes: [
        { nombre: "Hotel Economico", precio: 1600 },
        { nombre: "Hotel Lujo", precio: 2200 },
        { nombre: "Hotel 5 Estrellas", precio: 4500 }
    ]},
    { nombre: "Ecuador", precio: 2400, hospedajes: [
        { nombre: "Hotel Economico", precio: 1450 },
        { nombre: "Hotel Lujo", precio: 3200 },
        { nombre: "Hotel 5 Estrellas", precio: 6200 }
    ]},
    { nombre: "Peru", precio: 1800, hospedajes: [
        { nombre: "Hotel Economico", precio: 1400 },
        { nombre: "Hotel Lujo", precio: 2700 },
        { nombre: "Hotel 5 Estrellas", precio: 5100 }
    ]},
    { nombre: "Chile", precio: 2000, hospedajes: [
        { nombre: "Hotel Economico", precio: 1500 },
        { nombre: "Hotel Lujo", precio: 2700 },
        { nombre: "Hotel 5 Estrellas", precio: 5300 }
    ]},
    { nombre: "Uruguay", precio: 2800, hospedajes: [
        { nombre: "Hotel Economico", precio: 1900 },
        { nombre: "Hotel Lujo", precio: 3400 },
        { nombre: "Hotel 5 Estrellas", precio: 5900 }
    ]},
    { nombre: "Brasil", precio: 3800, hospedajes: [
        { nombre: "Hotel Economico", precio: 2000 },
        { nombre: "Hotel Lujo", precio: 3200 },
        { nombre: "Hotel 5 Estrellas", precio: 6100 }
    ]},
    { nombre: "Paraguay", precio: 1500, hospedajes: [
        { nombre: "Hotel Economico", precio: 1100 },
        { nombre: "Hotel Lujo", precio: 2300 },
        { nombre: "Hotel 5 Estrellas", precio: 3600 }
    ]}
];

let opcion = "";

while (opcion !== "1" && opcion !== "2") {
    opcion = prompt("¿Cómo te gustaría calcular tu viaje? Ingresa '1' para usar un presupuesto o '2' para elegir un destino y hospedaje:");

    if (opcion === "1" || opcion === "2") {
        if (opcion === "1") {
            
            let opcionesViables = [];

            const presupuesto = parseFloat(prompt("Ingresa el monto que deseas gastar: (Sin indicar con el signo $)"));

            destinos.forEach(destino => {
                destino.hospedajes.forEach(hospedaje => {
                    const costoTotal = destino.precio + hospedaje.precio;
                    if (costoTotal <= presupuesto) {
                        opcionesViables.push(`${destino.nombre} con ${hospedaje.nombre}: $${costoTotal}`);
                    }
                });
            });

            if (opcionesViables.length > 0) {
                alert("Opciones disponibles dentro de tu presupuesto:\n" + opcionesViables.join('\n'));
            } else {
                alert("Lo siento, no hay opciones disponibles dentro de tu presupuesto. Considera ingresar un monto más alto.");
            }

        } else if (opcion === "2") {
            const destinoElegido = prompt("Ingresa el nombre del destino que prefieres, las opciones son: Colombia, Ecuador, Peru, Uruguay, Chile, Brasil, Paraguay");
            const destinoEncontrado = destinos.find(destino => destino.nombre.toLowerCase() === destinoElegido.toLowerCase());

            if (destinoEncontrado) {
                let mensajeHospedajes = "Elige tu hospedaje:\n";
                destinoEncontrado.hospedajes.forEach((hospedaje, index) => {
                    mensajeHospedajes += `${index + 1}. ${hospedaje.nombre} - $${hospedaje.precio}\n`;
                });
                const hospedajeElegidoIndex = parseInt(prompt(mensajeHospedajes)) - 1;

                if (hospedajeElegidoIndex >= 0 && hospedajeElegidoIndex < destinoEncontrado.hospedajes.length) {
                    const hospedajeElegido = destinoEncontrado.hospedajes[hospedajeElegidoIndex];
                    const costoTotal = destinoEncontrado.precio + hospedajeElegido.precio;
                    alert(`El costo total de tu viaje a ${destinoEncontrado.nombre} con hospedaje en ${hospedajeElegido.nombre} es de $${costoTotal}`);
                } else {
                    alert("Hospedaje no válido.");
                }
            } else {
                alert("Destino no válido.");
            }
        }
    } else {
        alert("Opción no válida. Por favor, elige '1' o '2'.");
    }
}

