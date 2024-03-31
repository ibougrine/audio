let isPlaying = false;
let intervalId;
let currentStep = 0;

// Obtener los elementos del DOM
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const addStepsButton = document.getElementById('add-steps');
const channelsContainer = document.getElementById('channels');

// Obtener el elemento del control de volumen
const volumeSlider = document.getElementById('volume-slider');

// Función para manejar cambios en el control de volumen
volumeSlider.addEventListener('input', function() {
  const volumeValue = parseFloat(this.value); // Obtener el valor actual del control de volumen
  // Actualizar el volumen de todos los elementos de audio en la página
  const audioElements = document.querySelectorAll('audio');
  audioElements.forEach(audio => {
    audio.volume = volumeValue;
  });
});


// Función para reproducir el sonido con el volumen ajustado
function playSound(sound) {
  const volume = parseFloat(volumeSlider.value); // Obtener el valor actual del control de volumen
  const audio = new Audio(sound);
  audio.volume = volume; // Establecer el volumen del audio
  audio.play();
}


// Obtener el elemento del control de BPM
const bpmSlider = document.getElementById('bpm-slider');
/*
// Función para manejar cambios en el control de BPM
bpmSlider.addEventListener('input', function() {
  const bpmValue = parseInt(this.value); // Obtener el valor actual del control de BPM
  const intervalTime = 60000 / bpmValue; // Calcular el intervalo de tiempo en milisegundos según el BPM
  clearInterval(intervalId); // Limpiar el intervalo existente
  intervalId = setInterval(startPlayback, intervalTime); // Iniciar un nuevo intervalo con el nuevo BPM
  if (isPlaying) {
    stopPlayback(); // Si está reproduciendo, reanudar la reproducción con el nuevo BPM
  }
});*/

// Función para manejar cambios en el control de BPM
bpmSlider.addEventListener('input', function() {
  const bpmValue = parseInt(this.value); // Obtener el valor actual del control de BPM
  const intervalTime = 60000 / bpmValue; // Calcular el intervalo de tiempo en milisegundos según el BPM
  clearInterval(intervalId); // Limpiar el intervalo existente
  intervalId = setInterval(stopPlayback, intervalTime); // Iniciar un nuevo intervalo con el nuevo BPM
  //if (isPlaying) {
  //  stopPlayback(); // Si está reproduciendo, reanudar la reproducción con el nuevo BPM
  //}
});


// Función para iniciar la reproducción
// Función para iniciar la reproducción
function startPlayback() {
  if (!isPlaying) {
    const bpmValue = parseInt(bpmSlider.value); // Obtener el valor actual del control de BPM
    const intervalTime = 60000 / bpmValue; // Calcular el intervalo de tiempo en milisegundos según el BPM
    
    // Obtener todos los sonidos
    const channels = document.querySelectorAll('.channel[data-sound]');
    
    const totalChannels = channels.length;
    let maxSteps = 0; // Variable para almacenar el máximo número de pasos entre todos los canales

    // Encontrar el máximo número de pasos entre todos los canales
    channels.forEach(channel => {
      const steps = channel.querySelectorAll('.step');
      maxSteps = Math.max(maxSteps, steps.length);
    });
    
    let currentStep = 0;
    
    intervalId = setInterval(() => {
      // Iterar sobre todos los sonidos
      for (let i = 0; i < totalChannels; i++) {
        const channel = channels[i];
        const sound = channel.dataset.sound;
        const steps = channel.querySelectorAll('.step');
        const activeStep = steps[currentStep % steps.length]; // Asegurarse de que el índice esté dentro del rango de pasos disponibles
        
        // Reproducir el sonido si el paso está activo
        if (sound && activeStep.classList.contains('active')) {
          playSound(sound);
        }
        
        // Resaltar el paso actual
        steps.forEach((step, index) => {
          if (index === currentStep % steps.length) {
            // Si el paso está activo, mantener el color activo, de lo contrario, cambiarlo a azul claro
            if (step.classList.contains('active')) {
              step.style.backgroundColor = '#00f'; // Azul brillante
            } else {
              step.style.backgroundColor = '#00f'; // Azul más apagado
            }
          } else {
            step.style.backgroundColor = '#444'; // Color original del paso
          }
        });
      }
      
      // Incrementar el paso actual
      currentStep++;
    }, intervalTime); // El intervalo es igual al tiempo de un paso
    isPlaying = true;
    startButton.disabled = true;
    stopButton.disabled = false;
  } else { // Si ya está reproduciendo, simplemente actualizar el estado de los pasos activos
    const channels = document.querySelectorAll('.channel[data-sound]');
    channels.forEach(channel => {
      const steps = channel.querySelectorAll('.step');
      steps.forEach(step => {
        if (step.classList.contains('active')) {
          step.style.backgroundColor = '#00f'; // Mantener el color azul brillante para los pasos activos
        }
      });
    });
  }
}
/*
function startPlayback() {
  if (!isPlaying) {
    const bpmValue = parseInt(bpmSlider.value);
    const intervalTime = 60000 / bpmValue;
    const channels = document.querySelectorAll('.channel[data-sound]');
    const totalChannels = channels.length;
    let maxSteps = 0;
    channels.forEach(channel => {
      const steps = channel.querySelectorAll('.step');
      maxSteps = Math.max(maxSteps, steps.length);
    });
    
    currentStep = 0; // Reiniciar el paso actual
    
    intervalId = setInterval(() => {
      for (let i = 0; i < totalChannels; i++) {
        const channel = channels[i];
        const sound = channel.dataset.sound;
        const steps = channel.querySelectorAll('.step');
        const activeStep = steps[currentStep % steps.length];
        
        // Mantener el color azul brillante para los pasos activos y el color original para los demás pasos
        steps.forEach(step => {
          if (step === activeStep && step.classList.contains('active')) {
            step.style.backgroundColor = '#00f'; // Mantener el color azul brillante para los pasos activos
          } else {
            step.style.backgroundColor = step.classList.contains('active') ? '#00f' : '#444'; // Cambiar a color azul brillante si está activo, de lo contrario, a color original
          }
        });
        
        if (sound && activeStep.classList.contains('active')) {
          playSound(sound);
        }
      }
      currentStep++;
    }, intervalTime);
    isPlaying = true;
    startButton.disabled = true;
    stopButton.disabled = false;
  } else {
    const channels = document.querySelectorAll('.channel[data-sound]');
    channels.forEach(channel => {
      const steps = channel.querySelectorAll('.step');
      steps.forEach(step => {
        if (step.classList.contains('active')) {
          step.style.backgroundColor = '#00f'; // Mantener el color azul brillante para los pasos activos
        }
      });
    });
  }
}
*/

// Función para detener la reproducción
function stopPlayback() {
  clearInterval(intervalId); // Limpiar el intervalo
  isPlaying = false;
  startButton.disabled = false;
  stopButton.disabled = true;
  //location.reload(); // Recargar la página
}

// Añadir event listener a los pasos
channelsContainer.addEventListener('click', event => {
  const target = event.target;
  if (target.classList.contains('step')) {
    target.classList.toggle('active');
  }
});

// Manejador de eventos para clics en los botones de inicio, parada y añadir pasos
document.addEventListener('click', (event) => {
  const target = event.target;
  if (target.id === 'start') {
    startPlayback();
  } else if (target.id === 'stop') {
    stopPlayback();
  } else if (target.id === 'add-steps') {
    const channels = document.querySelectorAll('.channel');
    channels.forEach(channel => {
      const stepsContainer = channel.querySelector('.steps');
      for (let i = 0; i < 4; i++) {
        const step = document.createElement('div');
        step.classList.add('step');
        stepsContainer.appendChild(step);
      }
    });
  }
});

// JavaScript existente
const removeStepsButton = document.getElementById('remove-steps');

// Agregar event listeners para los botones de eliminar sonido y eliminar -4 pasos
removeStepsButton.addEventListener('click', removeLastSteps);


// Función para eliminar los últimos 4 pasos de cada canal
function removeLastSteps() {
  const channels = document.querySelectorAll('.channel');
  channels.forEach(channel => {
    const stepsContainer = channel.querySelector('.steps');
    const steps = stepsContainer.querySelectorAll('.step');
    for (let i = 0; i < 4; i++) {
      const lastStep = stepsContainer.lastElementChild;
      if (lastStep) {
        stepsContainer.removeChild(lastStep);
      }
    }
  });
}

// Objeto para mapear sonidos con teclas del teclado
let soundKeyMap = {};

// Función para encontrar la primera tecla disponible en el abecedario
function findAvailableKey(alphabet, startIndex) {
  for (let i = startIndex; i < alphabet.length; i++) {
    const key = alphabet[i];
    if (!Object.values(soundKeyMap).includes(key)) {
      return key;
    }
  }
  // Si no se encontró una tecla disponible desde el inicio, busca desde el principio del abecedario
  for (let i = 0; i < startIndex; i++) {
    const key = alphabet[i];
    if (!Object.values(soundKeyMap).includes(key)) {
      return key;
    }
  }
  // Si todas las teclas están asignadas, devuelve la primera del abecedario
  return alphabet[0];
}

// Función para asignar teclas a los sonidos añadidos
function assignSoundKeys() {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // String con todas las letras del abecedario
  const channels = document.querySelectorAll('.channel');
  let nextAvailableIndex = 0; // Índice de la próxima letra disponible
  
  // Eliminar contenido de los spans dentro de los canales
  channels.forEach(channel => {
    const span = channel.querySelector('span');
    if (span) {
      span.remove(); // Eliminar el span si existe
    }
  });

  // Asignar letras a los sonidos, incluido el nuevo sonido
  channels.forEach(channel => {
    const soundName = channel.querySelector('.name').textContent.toLowerCase();
    let key = alphabet[nextAvailableIndex]; // Asignar la siguiente letra disponible
    soundKeyMap[soundName] = key;
    nextAvailableIndex = (nextAvailableIndex + 1) % alphabet.length; // Avanzar al siguiente índice del abecedario
    channel.dataset.key = key; // Asignar la tecla al elemento del canal
    const nameElement = channel.querySelector('.name');
    nameElement.innerHTML = `${soundName.toUpperCase()} <span>${key.toUpperCase()}</span>`; // Añadir la letra al nombre del sonido
      // Llamar a la función para generar los botones del drum pad
  generateDrumPadButtons(); 
  });
}

// Llama a la función para asignar teclas cuando se carga la página
window.addEventListener('DOMContentLoaded', assignSoundKeys);

// Agrega un event listener para detectar cuando se presionan las teclas asignadas
document.addEventListener('keydown', event => {
  const key = event.key.toUpperCase();
  const channel = document.querySelector(`.channel[data-key="${key}"]`);
  if (channel) {
    const sound = channel.dataset.sound;
    playSound(sound);
  }
});

// Modifica la función playSound para que acepte la ruta del sonido como parámetro
function playSound(sound) {
  const volume = parseFloat(volumeSlider.value);
  const audio = new Audio(sound);
  audio.volume = volume;
  audio.play();
}