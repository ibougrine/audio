// Obtener el modal y el botón para abrirlo
const modal = document.getElementById('modal');
const addSoundBtn = document.getElementById('addSoundBtn');

// Obtener el span que cierra el modal
const closeBtn = document.querySelector('.close');

// Cuando el usuario clickea en el botón, abrir el modal
addSoundBtn.onclick = function() {
  modal.style.display = 'block';
}

// Cuando el usuario clickea en el span (x), cerrar el modal
closeBtn.onclick = function() {
  modal.style.display = 'none';
}

// Cuando el usuario clickea en cualquier lugar fuera del modal, cerrarlo
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}

// Cuando el usuario clickea en el botón "Añadir"
document.getElementById('add-sound').onclick = function() {
  const soundName = document.getElementById('sound-name').value;
  const soundFile = document.getElementById('sound-file').files[0];
  if (soundName && soundFile) {
    const reader = new FileReader();
    reader.onload = () => {
      const soundDataUrl = reader.result;
      const channel = document.createElement('div');
      channel.classList.add('channel');
      const name = document.createElement('div');
      name.classList.add('name');
      name.textContent = soundName;
      const steps = document.createElement('div');
      steps.classList.add('steps');
      for (let i = 0; i < 16; i++) {
        const step = document.createElement('div');
        step.classList.add('step');
        steps.appendChild(step);
      }
      channel.appendChild(name);
      channel.appendChild(steps);
      channel.dataset.sound = soundDataUrl;
      channelsContainer.appendChild(channel);
    };
    reader.readAsDataURL(soundFile);
  }
  modal.style.display = 'none'; // Ocultar el modal después de añadir el sonido
}

// DELETE Modal

// Obtener el modal desplegable y el botón para abrirlo
const deleteModal = document.getElementById('deleteModal');
const deleteSoundBtn = document.getElementById('deleteSoundBtn');

// Obtener el span que cierra el modal desplegable
const closeDeleteModalBtn = document.querySelector('#deleteModal .close');

// Cuando el usuario clickea en el botón, abrir el modal desplegable
deleteSoundBtn.onclick = function() {
  // Limpiar el select antes de añadir las opciones
  const select = document.getElementById('delete-sound-select');
  select.innerHTML = '';
  
  // Obtener todos los nombres de sonido existentes y añadirlos como opciones al select
  const channels = document.querySelectorAll('.channel');
  channels.forEach(channel => {
    const soundName = channel.querySelector('.name').textContent;
    const option = document.createElement('option');
    option.value = soundName;
    option.textContent = soundName;
    select.appendChild(option);
  });

  deleteModal.style.display = 'block';
}

// Cuando el usuario clickea en el span (x), cerrar el modal desplegable
closeDeleteModalBtn.onclick = function() {
  deleteModal.style.display = 'none';
}

// Cuando el usuario clickea en cualquier lugar fuera del modal desplegable, cerrarlo
window.onclick = function(event) {
  if (event.target == deleteModal) {
    deleteModal.style.display = 'none';
  }
}

// Cuando el usuario clickea en el botón "Eliminar" del modal desplegable
document.getElementById('delete-sound').onclick = function() {
  const select = document.getElementById('delete-sound-select');
  const selectedSoundName = select.value;
  const channels = document.querySelectorAll('.channel');
  channels.forEach(channel => {
    const soundName = channel.querySelector('.name').textContent;
    if (soundName === selectedSoundName) {
      channel.remove(); // Eliminar el canal correspondiente al sonido seleccionado
    }
  });
  deleteModal.style.display = 'none'; // Ocultar el modal después de eliminar el sonido
}

// Cuando el usuario clickea en el botón "Añadir"
document.getElementById('add-sound').onclick = function() {
  const soundName = document.getElementById('sound-name').value;
  const soundFile = document.getElementById('sound-file').files[0];
  if (soundName && soundFile) {
    const reader = new FileReader();
    reader.onload = () => {
      const soundDataUrl = reader.result;
      const channel = document.createElement('div');
      channel.classList.add('channel');
      const name = document.createElement('div');
      name.classList.add('name');
      name.textContent = soundName;
      const steps = document.createElement('div');
      steps.classList.add('steps');
      for (let i = 0; i < 16; i++) {
        const step = document.createElement('div');
        step.classList.add('step');
        steps.appendChild(step);
      }
      channel.appendChild(name);
      channel.appendChild(steps);
      channel.dataset.sound = soundDataUrl;
      channelsContainer.appendChild(channel);
      // Eliminar los pasos de todos los canales existentes
      const existingChannels = document.querySelectorAll('.channel');
      existingChannels.forEach(existingChannel => {
        const existingSteps = existingChannel.querySelector('.steps');
        existingSteps.innerHTML = ''; // Eliminar todos los pasos del canal existente
      });
      generateDrumPadButtons(); // Regenerar Drum Pad después de añadir un sonido
      // Detener la reproducción si se está reproduciendo actualmente
      if (isPlaying) {
        stopPlayback();
      }
      assignSoundKeys(); // Llama a la función para asignar teclas a los sonidos añadidos
    };
    reader.readAsDataURL(soundFile);
  }
  modal.style.display = 'none'; // Ocultar el modal después de añadir el sonido
}


// Cuando el usuario clickea en el botón "Eliminar" del modal desplegable
document.getElementById('delete-sound').onclick = function() {
  const select = document.getElementById('delete-sound-select');
  const selectedSoundName = select.value;
  const channels = document.querySelectorAll('.channel');
  channels.forEach(channel => {
    const soundName = channel.querySelector('.name').textContent;
    if (soundName === selectedSoundName) {
      channel.remove(); // Eliminar el canal correspondiente al sonido seleccionado
    }
  });
  deleteModal.style.display = 'none'; // Ocultar el modal después de eliminar el sonido
  generateDrumPadButtons(); // Regenerar Drum Pad después de eliminar un sonido
}

