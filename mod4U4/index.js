const express = require('express');
const session = require('express-session');
const app = express();

// 1. Le decimos que usaremos EJS para los dibujos/pantallas (templates)
app.set('view engine', 'ejs');

// 2. Esto sirve para poder leer lo que el usuario escribe en el formulario
app.use(express.urlencoded({ extended: true }));

// 3. Preparamos la "libreta mágica" (express-session)
app.use(session({
    secret: 'mi-clave-secreta-123', // Una contraseña secreta para cerrar la libreta
    resave: false,
    saveUninitialized: true
}));

// --- RUTAS Y CONTROLADORES ---

// RUTA 1: Muestra el formulario al entrar a la página
app.get('/', (req, res) => {
    res.render('formulario');
});

// RUTA 2: Captura el dato enviado y lo guarda en la sesión
app.post('/guardar', (req, res) => {
    // Capturamos el nombre que escribió el usuario
    const nombreCapturado = req.body.nombreUsuario; 
    
    // ¡Lo anotamos en la libreta mágica (sesión)!
    req.session.usuario = nombreCapturado; 
    
    // Lo mandamos a la otra pantalla para demostrar que lo recordamos
    res.redirect('/perfil');
});

// RUTA 3: Lee el dato desde la sesión y lo muestra en un template
app.get('/perfil', (req, res) => {
    // Sacamos el nombre de la libreta mágica (si no hay nada, dice 'Invitado')
    const nombreGuardado = req.session.usuario || 'Invitado';
    
    // Enviamos ese dato a la pantalla 'saludo.ejs'
    res.render('saludo', { nombre: nombreGuardado });
});

// Encendemos el servidor
app.listen(3000, () => {
    console.log('¡Listo! Abre tu navegador en http://localhost:3000');
});
