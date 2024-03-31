// JavaScript para hacer los canales draggable
const channels = document.querySelectorAll('.channel');

let draggedChannel = null;

channels.forEach(channel => {
  channel.addEventListener('dragstart', dragStart);
  channel.addEventListener('dragend', dragEnd);
});

function dragStart() {
  draggedChannel = this;
  setTimeout(() => (this.style.display = 'none'), 0);
}

function dragEnd() {
  draggedChannel.style.display = 'flex';
  draggedChannel = null;
}

const draggable = document.querySelector('.draggable');

draggable.addEventListener('dragover', dragOver);
draggable.addEventListener('dragenter', dragEnter);
draggable.addEventListener('dragleave', dragLeave);
draggable.addEventListener('drop', dragDrop);

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
  this.style.backgroundColor = '#555';
}

function dragLeave() {
  this.style.backgroundColor = 'transparent';
}

function dragDrop() {
  this.appendChild(draggedChannel);
  this.style.backgroundColor = 'transparent';
}