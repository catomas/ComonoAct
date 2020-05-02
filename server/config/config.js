// ==========================
// Puerto
// ==========================


process.env.PORT = process.env.PORT || 3000;

// ==========================
// Entorno
// ==========================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// ==========================
// SEED de autenticación
// ==========================




// ==========================
// Base de datos 
// ==========================
let urlDB;



    urlDB = 'mongodb+srv://catomas:trucha1998@cluster0-ximi4.mongodb.net/test?retryWrites=true&w=majority'


process.env.URLDB = urlDB;