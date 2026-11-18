/***
 * Codigo para mostrar el inventario del usuario en su perfil 
*/

// Obtenemos los datos del usuario
const usuario = JSON.parse(localStorage.getItem('usuarioActual'));

async function cargarInventario(){
    if(!usuario){
        throw new Error('No hay un usuario activo');
    }

    const respuesta = await fetch(`/api/inventario/usuario/${usuario.id}`);

    if(!respuesta.ok){
        throw new Error('No se pudo obtener el inventario');
    }

    return respuesta.json();
}

var guanteSeleccionado, zapatoSeleccionado;

function Rueda(elemento, targetDeg, lado, objetos, capacidad) {
    this.elemento = elemento;
    this.target = targetDeg;
    this.lado = lado;

    var objetosAMostrar = objetos.slice();
    while (objetosAMostrar.length < capacidad) {
        objetosAMostrar.push({
            vacio: true,
            nombre: 'Espacio disponible'
        });
    }

    this.objetos = objetosAMostrar;
    this.total = objetosAMostrar.length;
    this.pos = 0;
    this.posSeleccionado = 0;
    this.srcs = [];
    this.items = [];

    var self = this;

    objetosAMostrar.forEach(function (objeto, i) {
        var boton = document.createElement('button');
        boton.setAttribute('aria-label', objeto.nombre);

        if (objeto.vacio) {
            boton.className = 'inventario-item inventario-espacio-vacio';
            boton.innerHTML = '<span aria-hidden="true">+</span>';
        } else {
            var src = objeto.imagen;
            this.srcs.push(src);

            boton.className = 'inventario-item';
            var im = document.createElement('img');
            im.src = src;
            im.alt = objeto.nombre;
            boton.appendChild(im);
        }

        (function (indice) {
            boton.addEventListener('click', function () {
                var d = ((indice - self.pos) % self.total + self.total * 1.5) %
                    self.total - self.total / 2;
                self.posSeleccionado = Math.round(self.pos + d);
            });
        })(i);

        elemento.appendChild(boton);
        this.items.push(boton);
    }, this);

    elemento.parentNode.addEventListener('wheel', function (e) {
        var st = elemento.parentNode.getBoundingClientRect();
        var inSide = lado === 'l'
            ? e.clientX < st.left + st.width / 2
            : e.clientX >= st.left + st.width / 2;

        if (inSide) {
            e.preventDefault();
            self.posSeleccionado += e.deltaY > 0 ? 1 : -1;
        }
    }, { passive: false });
}

Rueda.prototype.layout = function (W, H) {
    var cx = this.lado === 'l' ? W * 0.08 : W * 0.92;
    var cy = H / 2;
    var R = Math.min(W * 0.20, H * 0.60);

    this.elemento.style.transform = 'translate(' + cx + 'px,' + cy + 'px)';

    var base = Math.max(34, Math.min(60, R * 0.3));

    for (var i = 0; i < this.items.length; i++) {
        var d = ((i - this.pos) % this.total + this.total * 1.5) %
            this.total - this.total / 2;
        var step = 360 / this.total;
        var a = (this.target + d * step) * Math.PI / 180;
        var near = Math.max(0, 1 - Math.abs(d) / 1.6);
        var size = base * (1 + 0.7 * near);
        var item = this.items[i];
        var visible = this.lado === 'l'? Math.cos(a) >= 0 : Math.cos(a) <= 0;

        item.style.width = size + 'px';
        item.style.height = size + 'px';
        item.style.left = (R * Math.cos(a) - size / 2) + 'px';
        item.style.top = (R * Math.sin(a) - size / 2) + 'px';
        item.style.zIndex = Math.round(near * 10);
        item.style.opacity = visible
            ? 0.45 + 0.55 * Math.max(near, 1 - Math.abs(d) / (this.total / 2))
            : 0;
        item.style.pointerEvents = visible ? 'auto' : 'none';
        item.style.outline = near > 0.9 ? '2px solid #fff' : 'none';
    }
};

Rueda.prototype.obtenerSeleccionado = function () {
    var indice = Math.round(this.posSeleccionado);
    indice = ((indice % this.total) + this.total) % this.total;
    return this.objetos[indice];
};

function actualizarDetalleInventario(rueda) {
    var objeto = rueda.obtenerSeleccionado();

    if (rueda.lado === 'l') {
        document.getElementById('nombre-zapato-seleccionado').textContent =
            objeto.vacio ? 'Espacio disponible' : objeto.nombre;
        document.getElementById('agilidad-zapato-seleccionado').textContent =
            objeto.vacio ? 'Agilidad: -' : `Agilidad: ${objeto.agilidad ?? '-'}`;
    } else {
        document.getElementById('nombre-guante-seleccionado').textContent =
            objeto.vacio ? 'Espacio disponible' : objeto.nombre;
        document.getElementById('golpe-guante-seleccionado').textContent =
            objeto.vacio ? 'Golpe: -' : `Golpe: ${objeto.golpe ?? '-'}`;
    }
}

async function iniciarCarrusel() {
    var inventario = document.getElementById('inventario');
    var ruedaIzquierda = document.getElementById('rueda-izq');
    var ruedaDerecha = document.getElementById('rueda-der');

    if (!inventario || !ruedaIzquierda || !ruedaDerecha) {
        return;
    }

    try {
        const inventarioUsuario = await cargarInventario();
        const zapatos = inventarioUsuario.zapatos;
        const guantes = inventarioUsuario.guantes;

        var izquierda = new Rueda(ruedaIzquierda, 0, 'l', zapatos, 10);
        var derecha = new Rueda(ruedaDerecha, 180, 'r', guantes, 10);

        document.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowLeft') izquierda.posSeleccionado--;
            if (e.key === 'ArrowRight') derecha.posSeleccionado++;
            if (e.key === 'ArrowUp') derecha.posSeleccionado--;
            if (e.key === 'ArrowDown') izquierda.posSeleccionado++;
        });

        function frame() {
            var W = inventario.clientWidth;
            var H = inventario.clientHeight;
            var ruedas = [izquierda, derecha];

            ruedas.forEach(function (rueda) {
                rueda.pos += (rueda.posSeleccionado - rueda.pos) * 0.14;
                if (Math.abs(rueda.posSeleccionado - rueda.pos) < 0.001) {
                    rueda.pos = rueda.posSeleccionado;
                }
                rueda.layout(W, H);
                actualizarDetalleInventario(rueda);
                
                const zapato = izquierda.obtenerSeleccionado();
                const guante = derecha.obtenerSeleccionado();
                
                zapatoSeleccionado = zapato.vacio ? null : zapato.id;
                guanteSeleccionado = guante.vacio ? null : guante.id;
            });

            requestAnimationFrame(frame);
        }

        frame();
    } catch (error) {
        console.error('No se pudo iniciar el inventario:', error);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciarCarrusel);
} else {
    iniciarCarrusel();
}

// EQUIPAR ITEMS SELECCIONADOS
async function equiparItems() {
    const msj = document.getElementById('mensaje-equipar').textContent;
    if (zapatoSeleccionado == null || guanteSeleccionado == null) {
        msj = 'Selecciona un zapato y un guante antes de equipar.';
        return;
    }

    try {
        const respuesta = await fetch(`/api/inventario/usuario/${usuario.id}/equipar`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                zapato: zapatoSeleccionado,
                guante: guanteSeleccionado
            })
        });

        const resultado = await respuesta.json();

        if (!respuesta.ok) {
            throw new Error(resultado.error);
        }

        usuario.inventario = usuario.inventario || {};
        usuario.inventario.equipados = resultado.equipados;
        
        //localStorage.setItem('usuarioActual', JSON.stringify(usuario));
        msj = 'Items equipados correctamente.';
    } catch (error) {
        console.error('No se pudieron equipar los items:', error);
        msj = error.message;
    }
}
