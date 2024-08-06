// Mostrar mensaje de bienvenida y pedir nombre al usuario
let nombre = prompt("Por favor, ingresa tu nombre:");
document.write("<h2>Hola " + nombre + ", gracias por visitarnos!</h2>");

// Definición de los destinos y hospedajes
const destinos = [
    {nombre: "Colombia", precio: 500, hospedajes: [{nombre: "Hotel Economico", precio: 1000}, {nombre: "Hotel Resort", precio: 2000}, {nombre: "Hotel Lujoso", precio: 3000}]},
    {nombre: "Ecuador", precio: 600, hospedajes: [{nombre: "Hotel Economico", precio: 1500}, {nombre: "Hotel Resort", precio: 2500}, {nombre: "Hotel Lujoso", precio: 3500}]},
    {nombre: "Peru", precio: 700, hospedajes: [{nombre: "Hotel Economico", precio: 1200}, {nombre: "Hotel Resort", precio: 2200}, {nombre: "Hotel Lujoso", precio: 3200}]},
    {nombre: "Chile", precio: 800, hospedajes: [{nombre: "Hotel Economico", precio: 1300}, {nombre: "Hotel Resort", precio: 2300}, {nombre: "Hotel Lujoso", precio: 3300}]},
    {nombre: "Uruguay", precio: 900, hospedajes: [{nombre: "Hotel Economico", precio: 1400}, {nombre: "Hotel Resort", precio: 2400}, {nombre: "Hotel Lujoso", precio: 3400}]},
    {nombre: "Brasil", precio: 1000, hospedajes: [{nombre: "Hotel Economico", precio: 1600}, {nombre: "Hotel Resort", precio: 2600}, {nombre: "Hotel Lujoso", precio: 3600}]},
    {nombre: "Paraguay", precio: 1100, hospedajes: [{nombre: "Hotel Economico", precio: 1700}, {nombre: "Hotel Resort", precio: 2700}, {nombre: "Hotel Lujoso", precio: 3700}]}
];

// Mostrar lista de destinos y hospedajes
document.write("<h3>Destinos y precios:</h3>");
destinos.forEach(destino => {
    document.write(`<p>Destino: ${destino.nombre} - Precio: $${destino.precio}</p><ul>`);
    destino.hospedajes.forEach(hospedaje => {
        document.write(`<li>Hospedaje: ${hospedaje.nombre} - Precio: $${hospedaje.precio}</li>`);
    });
    document.write("</ul>");
});

// Función para mostrar las opciones viables de viaje según presupuesto
function opcionesViables(presupuesto) {
    document.write(`<h3>Opciones viables para tu presupuesto de $${presupuesto}:</h3>`);
    destinos.forEach(destino => {
        destino.hospedajes.forEach(hospedaje => {
            const costoTotal = destino.precio + hospedaje.precio;
            if (costoTotal <= presupuesto) {
                document.write(`<p>Destino: ${destino.nombre} - Hospedaje: ${hospedaje.nombre} - Costo total: $${costoTotal}</p>`);
            }
        });
    });
}

// Función para calcular el valor total del viaje según destino y hospedaje
function calcularValorTotal(destino, hospedaje) {
    const destinoEncontrado = destinos.find(d => d.nombre.toLowerCase() === destino.toLowerCase());
    if (destinoEncontrado) {
        const hospedajeEncontrado = destinoEncontrado.hospedajes.find(h => h.nombre.toLowerCase() === hospedaje.toLowerCase());
        if (hospedajeEncontrado) {
            const costoTotal = destinoEncontrado.precio + hospedajeEncontrado.precio;
            document.write(`<h3>El costo total de tu viaje a ${destino} hospedándote en ${hospedaje} es: $${costoTotal}</h3>`);
        } else {
            document.write(`<p>Hospedaje no encontrado en ${destino}</p>`);
        }
    } else {
        document.write(`<p>Destino no encontrado</p>`);
    }
}

// Pedir al usuario que elija una opción
const opcion = prompt("Elige una opción:\n1. Ingresar un monto determinado para gastar\n2. Ingresa destino y hospedaje");

if (opcion === "1") {
    const presupuesto = prompt("Ingresa el monto que deseas gastar:");
    opcionesViables(presupuesto);
} else if (opcion === "2") {
    const destinoElegido = prompt("Ingresa el destino que deseas (Colombia, Ecuador, Peru, Chile, Uruguay, Brasil, Paraguay):");
    const hospedajeElegido = prompt("Ingresa el hospedaje que deseas:");
    calcularValorTotal(destinoElegido, hospedajeElegido);
} else {
    document.write("<p>Opción no válida</p>");
}