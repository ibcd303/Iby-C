// 1. Llamamos al ayudante "Express" que instalamos antes
const express = require('express');

// 2. Creamos nuestra aplicación (es como encender el restaurante)
const app = express();

// 3. Elegimos el número de puerta por donde entrarán los visitantes
const puerto = 3000;

// --- AQUÍ EMPIEZAN LAS 3 RUTAS (LOS CAMINOS) ---

// RUTA 1: La página principal (cuando entras a la puerta principal)
app.get('/', (req, res) => {
  res.send('<h1>¡Hola! Bienvenido a mi página principal 🏠</h1>');
});

// RUTA 2: La página de "Acerca de mí"
app.get('/sobre-mi', (req, res) => {
  res.send('<h1>Sobre mí 🦸‍♂️</h1><p>Me gusta programar y los videojuegos.</p>');
});

// RUTA 3: La página de "Contacto"
app.get('/contacto', (req, res) => {
  res.send('<h1>Contacto 📞</h1><p>Escríbeme a: hola@miweb.com</p>');
});

// --- ENCENDEMOS EL SERVIDOR ---

// 4. Le decimos a la aplicación que se quede escuchando en la puerta 3000
app.listen(puerto, () => {
  console.log(`¡Listo! Tu página funciona en: http://localhost:${puerto}`);
});
