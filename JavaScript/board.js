
let currentDraggedElement;




async function initBoard() {
    init() // Start Template
    await getTasks() // load tasks from server and save in "tasks"
    renderTasksToKanban()
}

// Alle Container leeren 
function clearAllStatusContainers() {
    document.getElementById('toDo').innerHTML = '';
    document.getElementById('inProgress').innerHTML = '';
    document.getElementById('awaitingFeedback').innerHTML = '';
    document.getElementById('done').innerHTML = '';
}

// Rendert alle Task nach status in die gelichnamigen container
function renderTasksToKanban() {
    clearAllStatusContainers();
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        const status = task['status'];        
        generateTaskHTML(task, status, i)
    }
}


function startDragging(id) {
    currentDraggedElement = id;  // speichert die bewegende div id 
    console.log(currentDraggedElement)
}

// Ändert den statusus des task nach ablege bewegung auf entspechenden container 
async function moveTo(newStatus) {
    tasks[currentDraggedElement]['status'] = newStatus; 
    await saveTasksOnServer()
    await getTasks()
    renderTasksToKanban()
}

    // from w3
    function allowDrop(ev) {
        ev.preventDefault();
    }


// Create Task on Board
function generateTaskHTML(task, id, i) {
    return document.getElementById(id).innerHTML += /*html*/ `

        <div class="task-container" id="task${i}" draggable="true" ondragstart="startDragging(${i})">

            <div class="task-category-container" style="background-color: ${task['category']['color']}">${task['category']['category']}</div>

            <div class="task-title-container">${task['title']}</div>
            <div class="task-description-container">${task['description']}</div>





        </div>
    
    `;
    

}

/*
    let inProgres = tasks.filter(t => t['status'] == 'inProgress');
    let awaitingFeedback = tasks.filter(t => t['status'] == 'awaitingFeedback');
    let done = tasks.filter(t => t['status'] == 'done');

    */