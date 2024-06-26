document.addEventListener('DOMContentLoaded', () => {
      const tableroJuego = document.getElementById('tableroJuego');
      const botonIniciarJuego = document.getElementById('iniciarJuego');
      const botonReiniciarJuego = document.getElementById('reiniciarJuego');
      const inputNumCartas = document.getElementById('numCartas');
      const controles = document.getElementById('controles');

      const imagenes = [
            'https://picsum.photos/id/237/100/100', // Imagen 1
            'https://picsum.photos/id/238/100/100', // Imagen 2
            'https://picsum.photos/id/239/100/100', // Imagen 3
            'https://picsum.photos/id/240/100/100', // Imagen 4
            'https://picsum.photos/id/241/100/100', // Imagen 5
            'https://picsum.photos/id/242/100/100', // Imagen 6
            'https://picsum.photos/id/243/100/100', // Imagen 7
            'https://picsum.photos/id/244/100/100'  // Imagen 8
      ];

      botonIniciarJuego.addEventListener('click', () => {
            const numCartas = parseInt(inputNumCartas.value);
            if (numCartas < 4 || numCartas % 2 !== 0 || numCartas > imagenes.length * 2 ) {
                  alert('Por favor, elija un número par válido de cartas, mínimo 4 / máximo ' + (imagenes.length * 2));
                  return;
            }
            iniciarJuego(numCartas);
            controles.style.display = 'none';
            botonReiniciarJuego.style.display = 'block';
      });

      botonReiniciarJuego.addEventListener('click', () => {
            controles.style.display = 'flex';
            botonReiniciarJuego.style.display = 'none';
            tableroJuego.innerHTML = '';
      });

      function iniciarJuego(numCartas) {
            tableroJuego.innerHTML = '';
            let arrayTarjetas = [];

            for (let i = 0; i < numCartas / 2; i++) {
                  const tarjeta = { nombre: (i + 1).toString(), img: imagenes[i % imagenes.length] };
                  arrayTarjetas.push(tarjeta, { ...tarjeta });
            }

            arrayTarjetas.sort(() => 0.5 - Math.random());
            let primeraTarjeta = null;
            let segundaTarjeta = null;
            let bloquearTablero = false;

            function crearTablero() {
                  tableroJuego.style.gridTemplateColumns = `repeat(${Math.sqrt(numCartas)}, 100px)`;
                  arrayTarjetas.forEach(tarjeta => {
                        const elementoTarjeta = document.createElement('div');
                        elementoTarjeta.classList.add('tarjeta');
                        elementoTarjeta.dataset.nombre = tarjeta.nombre;
                        elementoTarjeta.innerHTML = `<div class="frente"></div>
                        <div class="detras" style="background-image: url(${tarjeta.img});"></div>`;
                        tableroJuego.appendChild(elementoTarjeta);
                        elementoTarjeta.addEventListener('click', voltearTarjeta);
                  });
            }

            function voltearTarjeta() {
                  if (bloquearTablero) return;
                  if (this === primeraTarjeta) return;

                  this.classList.add('volteada');

                  if (!primeraTarjeta) {
                        primeraTarjeta = this;
                        return;
                  }

                  segundaTarjeta = this;
                  bloquearTablero = true;

                  verificarCoincidencia();
            }

            function verificarCoincidencia() {
                  let esCoincidencia = primeraTarjeta.dataset.nombre === segundaTarjeta.dataset.nombre;

                  if (esCoincidencia) {
                        deshabilitarTarjetas();
                  } else {
                        marcarIncorrectas();
                  }
            }

            function deshabilitarTarjetas() {
                  primeraTarjeta.removeEventListener('click', voltearTarjeta);
                  segundaTarjeta.removeEventListener('click', voltearTarjeta);

                  primeraTarjeta.classList.add('emparejada');
                  segundaTarjeta.classList.add('emparejada');

                  reiniciarTablero();
            }

            function marcarIncorrectas() {
                  primeraTarjeta.classList.add('incorrecta');
                  segundaTarjeta.classList.add('incorrecta');

                  setTimeout(() => {
                        primeraTarjeta.classList.remove('incorrecta', 'volteada');
                        segundaTarjeta.classList.remove('incorrecta', 'volteada');
                        reiniciarTablero();
                  }, 1000);
            }

            function reiniciarTablero() {
                  [primeraTarjeta, segundaTarjeta] = [null, null];
                  bloquearTablero = false;
            }

            crearTablero();
            setTimeout(() => {
                  document.querySelectorAll('.tarjeta').forEach(tarjeta => {
                        tarjeta.classList.add('volteada');
                  });
                  setTimeout(() => {
                        document.querySelectorAll('.tarjeta').forEach(tarjeta => {
                              tarjeta.classList.remove('volteada');
                        });
                  }, 2000);
            }, 2000);
      }
});


