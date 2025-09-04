function buscarID() {
    const id = document.getElementById("playerID").value;
    alert("Buscando ID: " + id);
  }
  
  function darRecompensa() {
    alert("¡Recompensa enviada!");
  }
  const jugadores = {
    "123456789": "SakuraOldMvp",
    "987654321": "DarkPhoenix",
    "555555555": "SniperQueen"
  }
  function buscarID() {
    const id = document.getElementById("playerID").value;
    const nombre = jugadores[id];
  
    if (nombre) {
      document.getElementById("nombreUsuario").innerText = nombre;
    } else {
      document.getElementById("nombreUsuario").innerText = "ID no válido";
    }
  }
  function seleccionarPersonaje(elemento) {
    const todos = document.querySelectorAll('.personaje');
    todos.forEach(p => p.classList.remove('seleccionado'));
    elemento.classList.add('seleccionado');
  }