
class Marcador {
  #elementId;
  #jugadores = [
    {
      name: 'X',
      puntos: 0,
    },

    {
      name: 'O',
      puntos: 0,
    }
  ]
  #numPartidas;

  constructor(elementId='marcador', numPartidas=1) {
    this.#elementId = elementId;
    this.#numPartidas = numPartidas;
    this.imprimir();
  }

  addPuntos(name) {
    let jugador = this.#jugadores.find(j => j.name === name);
    jugador.puntos++;
    if (this.#numPartidas > 0) {
      this.#numPartidas--;
    }
    this.imprimir();
  }

  imprimir() {
    let marcadorFrontend = document.getElementById(this.#elementId);
    let ul = document.createElement('ul');
    let linumPartidas = document.createElement('li');
    this.#jugadores.forEach(jugador => {
      let li = document.createElement('li');
      li.textContent = `Jugador ${jugador.name} tiene ${jugador.puntos} puntos`;
      ul.append(li);
    });
    linumPartidas.textContent = `Partidas restantes: ${this.#numPartidas}`;
    ul.append(linumPartidas);
    marcadorFrontend.innerHTML = '';
    marcadorFrontend.append(ul);
  }

  getJugadores() {
    return this.#jugadores;
  }

  getNumPartidas() {
    return this.#numPartidas;
  }

  
}

export default Marcador;
