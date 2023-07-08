// Obtén referencias a los elementos del DOM
const form = document.getElementById('activity-form');
const input = document.getElementById('activity-input');
const list = document.getElementById('activity-list');

// Carga actividades al inicio
document.addEventListener('DOMContentLoaded', () => {
    const activities = getActivities();
    activities.forEach(activity => addActivityToList(activity));
});

// Maneja el evento de envío del formulario
form.addEventListener('submit', e => {
    e.preventDefault();

    const activity = input.value.trim();
    if (activity !== '') {
        addActivityToList(activity);
        saveActivity(activity);
        input.value = '';
    }
});

// Función para agregar actividades a la lista del DOM
function addActivityToList(activity) {
    const li = document.createElement('li');
    li.textContent = activity;
    li.appendChild(createDeleteButton());
    list.appendChild(li);
}

// Función para guardar actividades en localStorage
function saveActivity(activity) {
    const activities = getActivities();
    activities.push(activity);
    localStorage.setItem('activities', JSON.stringify(activities));
}

// Función para obtener actividades desde localStorage
function getActivities() {
    const activities = localStorage.getItem('activities');
    return activities ? JSON.parse(activities) : [];
}

// Función para crear un botón de eliminar
function createDeleteButton() {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.addEventListener('click', (e) => {
        e.stopPropagation();

        const li = e.target.parentElement;
        const activity = li.textContent.slice(0, -"Eliminar".length);
        deleteActivity(activity);

        list.removeChild(li);
    });
    return deleteButton;
}

// Función para eliminar actividades desde localStorage
function deleteActivity(activityToDelete) {
    let activities = getActivities();
    activities = activities.filter(activity => activity !== activityToDelete);
    localStorage.setItem('activities', JSON.stringify(activities));
}
