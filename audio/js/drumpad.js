// Función para generar los botones del drum pad
function generateDrumPadButtons() {
    // Obtener todos los canales
    const channels = document.querySelectorAll('.channel');
    
    // Obtener el contenedor del drum pad
    const drumPadContainer = document.getElementById('drum-pad-container');
    
    // Limpiar cualquier contenido previo en el contenedor
    drumPadContainer.innerHTML = '';
  
    // Iterar sobre cada canal y generar un botón para cada uno
    channels.forEach(channel => {
      // Obtener el sonido del canal
      const sound = channel.dataset.sound;
  
      // Si el canal tiene un sonido asociado, crear un botón para él
      if (sound) {
        // Crear un nuevo botón
        const button = document.createElement('button');
        
        // Asignar el texto del botón como el nombre del sonido
        button.textContent = channel.querySelector('.name').textContent;
        
        // Asignar una clase al botón para identificarlo fácilmente
        button.classList.add('drum-pad-button');
        
        // Asignar el evento de clic al botón para reproducir el sonido asociado
        button.addEventListener('click', () => {
          playSound(sound);
        });
  
        // Agregar el botón al contenedor del drum pad
        drumPadContainer.appendChild(button);
      }
    });
  }
  
  // Llamar a la función para generar los botones del drum pad
  generateDrumPadButtons();  