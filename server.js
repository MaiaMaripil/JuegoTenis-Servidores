const express = require('express');
const app = express(); //inicializar

app.use(express.json());
app.use(express.static('public'));

const usuariosRoutes = require('./routes/rutaUsuarios');
const partidasRoutes=require('./routes/rutaPartidas')
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/partidas', partidasRoutes);


const PORT = 3001;

app.listen(PORT, () => {
    console.log('Servidor corriendo en http://localhost:'+PORT);
});

//en terminal --> node server.js