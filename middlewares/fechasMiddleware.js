// fechasMiddleware.js

// Middleware para convertir fechas
function convertirFechas(req, res, next) {
    // Función para convertir la fecha en formato dd/mm/yyyy
    function formatDate(isoString) {
        const date = new Date(isoString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript son base 0
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    // Recorre el cuerpo de la solicitud y convierte las fechas
    convertirFechasRecursivo(req.body);
    next();
}

// Función para convertir las fechas en un objeto de forma recursiva
function convertirFechasRecursivo(obj) {
    for (const key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            // Si es un objeto, recursivamente convierte las fechas dentro del objeto
            convertirFechasRecursivo(obj[key]);
        } else if (typeof obj[key] === 'string' && obj[key].match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)) {
            // Si es una cadena con formato ISO 8601, convierte la fecha
            obj[key] = formatDate(obj[key]);
        }
    }
}

module.exports = convertirFechas;