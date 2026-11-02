function ph(i,hue){
  var s='<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="hsl('+hue+',55%,'+(35+(i%4)*8)+'%)"/><text x="100" y="118" font-size="64" text-anchor="middle" fill="rgba(255,255,255,.85)" font-family="Helvetica">'+(i+1)+'</text></svg>';
  return 'data:image/svg+xml;utf8,'+encodeURIComponent(s);
}

var N = 24;
var STEP = 360 / N;

function Rueda(elemento, hue, targetDeg, lado) {
    this.elemento = elemento;
    this.target = targetDeg;
    this.lado = lado;
    this.pos = 0;
    this.posSeleccionado = 0;
    this.srcs = [];
    this.items = [];

    var self = this;

    for (var i = 0; i < N; i++) {
        var src = '../../img/marco_jugador.svg';
        this.srcs.push(src);

        var boton = document.createElement('button');
        boton.className = 'inventario-item';
        boton.setAttribute('aria-label', 'Item ' + (i + 1));

        var im = document.createElement('img');
        im.src = src;
        im.alt = 'Imagen de guante';
        boton.appendChild(im);

        (function (indice) {
            boton.addEventListener('click', function () {
                var d = ((indice - self.pos) % N + N * 1.5) % N - N / 2;
                self.posSeleccionado = Math.round(self.pos + d);
            });
        })(i);

        elemento.appendChild(boton);
        this.items.push(boton);
    }

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

        for (var i = 0; i < N; i++) {
            var d = ((i - this.pos) % N + N * 1.5) % N - N / 2;
            var a = (this.target + d * STEP) * Math.PI / 180;
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
                ? 0.45 + 0.55 * Math.max(near, 1 - Math.abs(d) / (N / 2))
                : 0;
            item.style.pointerEvents = visible ? 'auto' : 'none';
            item.style.outline = near > 0.9 ? '2px solid #fff' : 'none';
        }
};

function iniciarCarrusel() {
        var inventario = document.getElementById('inventario');
        var ruedaIzquierda = document.getElementById('rueda-izq');
        var ruedaDerecha = document.getElementById('rueda-der');

        if (!inventario || !ruedaIzquierda || !ruedaDerecha) {
            return;
        }

        var izquierda = new Rueda(ruedaIzquierda, 20, 0, 'l');
        var derecha = new Rueda(ruedaDerecha, 200, 180, 'r');

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
            });

            requestAnimationFrame(frame);
        }

        frame();
}

if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', iniciarCarrusel);
} else {
        iniciarCarrusel();
}
