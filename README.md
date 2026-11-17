# Tennis (Jeu de Paume) 🎾

Juego web que recrea los orígenes del tenis en el siglo XII en Francia, cuando se jugaba golpeando la pelota con guantes en los patios de los monasterios.

## Descripción

Este proyecto universitario propone una experiencia inmersiva combinando historia y tecnología. A través de la cámara web del dispositivo, el juego detecta los movimientos físicos del jugador, permitiéndole golpear la pelota y desplazarse en tiempo real. 

## Tecnologías

- **HTML5**: Estructura del juego y de la interfaz.
- **CSS3**: Estilos, animaciones y diseño de la ambientación medieval.
- **JavaScript**: Desarrollo del frontend y del servidor.
- **Node.js**: Entorno de ejecución del backend.
- **Express**: Servidor web y creación de las rutas HTTP.
- **express-validator**: Validación de los datos recibidos en el backend.
- **p5.js**, **p5.collide2d** y **ml5.js**: Recursos utilizados en la experimentación con cámara y detección de manos.

## Desarrollo del backend

El backend fue desarrollado con Node.js y Express. El servidor se inicializa en `server.js`, sirve los archivos estáticos de la carpeta `public` y expone los datos almacenados en `data`.

Las principales funciones implementadas son:

- Registro e inicio de sesión de usuarios.
- Validación de los campos de registro con `express-validator`.
- Consulta del perfil y del inventario del usuario.
- Consulta paginada de las partidas de un usuario.
- Consulta del detalle de una partida.
- Modificación del nombre de una partida.
- Lectura y actualización de la información almacenada en archivos JSON dentro de `data`.

Las rutas principales son:

- `POST /api/usuarios/registro`: registra un usuario.
- `POST /api/usuarios/login`: verifica las credenciales.
- `GET /api/partidas/usuario/:idUsuario`: obtiene las partidas de un usuario con paginación.
- `GET /api/partidas/detallePartida/:idPartida`: obtiene el detalle de una partida.
- `PUT /api/partidas/modificarNombre/:idPartida`: modifica el nombre de una partida.

## Desarrollo del frontend

El frontend fue desarrollado con HTML, CSS y JavaScript. Contiene las vistas de inicio de sesión, registro, perfil, selección y listado de partidas y detalle de partida.

Las principales funciones implementadas son:

- Navegación entre las diferentes páginas de la aplicación.
- Envío de formularios de registro e inicio de sesión al backend mediante `fetch`.
- Manejo de la sesión activa con `localStorage`.
- Consulta y visualización de partidas almacenadas en el servidor.
- Paginación de partidas al desplazarse en el listado.
- Consulta y modificación del nombre de una partida.
- Visualización del perfil, estadísticas e inventario del usuario.
- Efectos visuales, carrusel, música y sonidos mediante JavaScript y CSS.
- Prototipo de juego con cámara web y detección de manos utilizando p5.js y ml5.js.

## Ejecutar el proyecto

Instalar las dependencias:

```bash
npm install
```

Iniciar el servidor:

```bash
npm start
```

Abrir en el navegador:

```text
http://localhost:3001
```

## Autoras
- [Maia Maripil](https://github.com/MaiaMaripil)
- [Tiara Fernandez Totolo](https://github.com/TiaraFernandez)
