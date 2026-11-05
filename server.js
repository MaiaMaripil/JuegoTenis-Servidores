const express = require('express');
const app = express(); //inicializar

app.use(express.json());
app.use(express.static('public'));

const usuariosRoutes = require('./routes/rutaUsuarios');
app.use('/api/usuarios', usuariosRoutes);


const PORT = 3001;

app.listen(PORT, () => {
    console.log('Servidor corriendo en http://localhost:'+PORT);
});

//en terminal --> node server.js