// Cargar las tareas guardadas

let tasks = JSON.parse(localStorage.getItem('tareas') || '[]');

// Guardar y redibujar

function save() {
  localStorage.setItem('tareas', JSON.stringify(tasks));
  render();
}

// Agregar Tarea

function addTask() {
  const input = document.getElementById('task-input');
  const text = input.value.trim();
  if (!text) return;

  tasks.push({
    id: Date.now(),
    text: text,
    done: false,
    editing: false
  });

  input.value = '';
  input.focus();
  save();
}

// Funcion para marcar como completada

function toggleDone(id) {
  const tarea = tasks.find(t => t.id === id);
  if (tarea) tarea.done = !tarea.done;
  save();
}

// Funcion para editar la tarea

function startEdit(id) {
  tasks.forEach(t => t.editing = false);
  const tarea = tasks.find(t => t.id === id);
  if (tarea) tarea.editing = true;
  save();
  setTimeout(() => document.getElementById('edit-' + id)?.focus(), 50);
}

function saveEdit(id) {
  const input = document.getElementById('edit-' + id);
  const tarea = tasks.find(t => t.id === id);
  if (tarea && input) {
    const val = input.value.trim();
    if (val) tarea.text = val;
    tarea.editing = false;
  }
  save();
}

// Funcion para eliminar la tarea

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  save();
}

// Funcion para borrar solamente las completadas

function clearCompleted() {
  tasks = tasks.filter(t => !t.done);
  save();
}

function render() {
  const list = document.getElementById('task-list');
  const counter = document.getElementById('counter');

  const pending = tasks.filter(t => !t.done).length;
  counter.textContent = tasks.length === 0
    ? ''
    : `${pending} pendiente${pending !== 1 ? 's' : ''} · ${tasks.length} total`;

  if (tasks.length === 0) {
    list.innerHTML = '<p class="empty">No hay tareas todavía.</p>';
    return;
  }

  list.innerHTML = tasks.map(t => `
    <div class="task-item ${t.done ? 'done' : ''}">
      <input
        type="checkbox"
        ${t.done ? 'checked' : ''}
        onchange="toggleDone(${t.id})"
      />
      ${t.editing
        ? `<input
             class="edit-input"
             id="edit-${t.id}"
             value="${t.text.replace(/"/g, '&quot;')}"
             onkeydown="if(event.key==='Enter') saveEdit(${t.id})"
           />`
        : `<span class="task-text">${t.text}</span>`
      }
      <div>
        ${t.editing
          ? `<button class="icon-btn" onclick="saveEdit(${t.id})">💾</button>`
          : `<button class="icon-btn" onclick="startEdit(${t.id})">✏️</button>`
        }
        <button class="icon-btn" onclick="deleteTask(${t.id})">🗑️</button>
      </div>
    </div>
  `).join('');
}

// Enter para agregar

document.getElementById('task-input').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') addTask();
});

render();