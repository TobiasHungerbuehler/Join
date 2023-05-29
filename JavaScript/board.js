/**
 * Array to store the matching tasks during the search.
 */
let matchingTasks = [];

/**
 * Stores the currently dragged element.
 */
let currentDraggedElement;

/*********************************************************************/
/* Board start functions */
/*********************************************************************/

/**
 * Initializes the board page.
 * Calls necessary functions to set up the board.
 */
async function initBoard() {
    init() // Start Template
    await getTasks() // load tasks from server and save in "tasks"
    await getContacts() // Load Contacts from Server
    getCategoryArray() // -> addTask.html // erstelle Array "taskCategories" aus array "tasks"
    getEmailsFromContacts() // -> addTask.html // speicher alle Emails mit Color in "allEmails"
    renderTasksToKanban()
}


// Rendert alle Task nach status in die gelichnamigen container im Kanban
function renderTasksToKanban() {
    clearAllStatusContainers(); // alle Render Container leeren
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        const status = task['status'];        
        generateTaskPreviewHTML(task, status, i)
        showTaskProgress(task, i);
        showTaskContactsPreview(task,i);
        showTaskPrioImage(task,i)
    }
}


// Create Taskelement html on Board
function generateTaskPreviewHTML(task, status, i) {
    return document.getElementById(status).innerHTML += /*html*/ `

        <div class="task-container" id="task${i}" draggable="true" ondragstart="startDragging(${i})" onclick="showFullTask(${i})">

            <div class="task-category-container" style="background-color: ${task['category']['color']}">${task['category']['category']}</div>

            <div class="task-title-container">${task['title']}</div>

            <div class="task-description-container">${task['description']}</div>

            <div class="progress-container" id="progress-container${i}"></div>
            
            <div class="preview-bottom-wrapper">
                <div class="preview-task-contacts" id="preview-task-contacts${i}"></div>
                <div class="preview-prio" id="preview-prio${i}">
                </div>
            </div>
        </div>
    
    `;   
}


// errechnet eine progressbar aus den subtask und rendert in "progress-container"
function showTaskProgress(task, i) {
    const subtasks = task.subtasks;
    let totalSubtasks = 0;
    let completedSubtasks = 0; 
    if (subtasks.length > 0) {
        for (let j = 0; j < subtasks.length; j++) {
            const subtask = subtasks[j];
            if (subtask['isCompleted'] === "true") {
                completedSubtasks++;
            }
            totalSubtasks++;
        }
        let progressPercent = Math.round((completedSubtasks / totalSubtasks) * 100);
        createProgressHtml(i, progressPercent, completedSubtasks, totalSubtasks)
    }
}


// Zeige Contact Icons innerhalb des Task Preview
function showTaskContactsPreview(task, i) {
    let taskEmails = task['taskEmails'];
    for (let j = 0; j < taskEmails.length; j++) {
        const email = taskEmails[j];
        let initials = getInitials(email);
        if (initials === null) { // wenn email nicht in Kontakt vorhanden- Icon nicht anzeigen
            continue; 
        }
        let colorClass = getColorClass(email);
        if (j === 2) {
            initials = numberOFContacts(taskEmails);
            createContactPreviewItem(initials, colorClass, i);
            break;
        }
        createContactPreviewItem(initials, colorClass, i);
    }
}



// generiert das Html für die Progressbar und rendert in "progress-Container"
function createProgressHtml(i, percent, completedSubtasks, totalSubtasks) {
    document.getElementById('progress-container'+i).innerHTML = /*html*/ `
        <div class="progress-bar-container">
            <div class="prog-bar" style="width: ${percent}%;" id="prog-bar"></div>
        </div>
        <div class="progress-total">
            <span>${completedSubtasks}/${totalSubtasks} Done</span>
        </div>
    `;
}

// Zeigt das enteprechende Prio Icon 
function showTaskPrioImage(task,i) {
    let prio = task['prio'];
    let prioImage = '';
    if(prio == 'low') {
        prioImage = './Img/arrow-down-green.png'
    }
    if(prio == 'medium') {
        prioImage = './Img/equal-orange.png'
    }
    if(prio == 'urgent') {
        prioImage = './Img/arrow-up-red.png'
    }
    document.getElementById('preview-prio'+i).innerHTML = `<img src="${prioImage}" alt="">`;
}


// setzt den letzten Contact icon '+2'
function numberOFContacts(taskEmails) {
    let length = taskEmails.length;
    let lastIcontext = length -2;
    return '+'+lastIcontext;
}


// Gibt die Color Class aus contacts zurück
function getColorClass(email) {
    let contact = findContactByEmail(email);
    if(contact !== null){
        return contact['avatarColor'];
    }
}


// Gibt den ganzen Contact anhand der email adresse zurück
function findContactByEmail(email) {
    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].email === email) {
            return contacts[i];
        }
    }
    return null; // Rückgabewert, falls keine Übereinstimmung gefunden wurde
}


// Erstellt Contact Previem Item HTML
function createContactPreviewItem(initials, colorClass,i){
    document.getElementById('preview-task-contacts'+i).innerHTML += /*html*/ `
            <div class="circle-preview ${colorClass}">
                <span>${initials}</span>
            </div>
    `;
}


// Erstellt die initialen aus Name Contact 
function getInitials(email) {
    let contact = findContactByEmail(email);
    if (contact === null) {
        return null; 
    } else {
        let name = contact['name'];
        const nameParts = name.split(' ');
        let initials = '';
        for (let i = 0; i < nameParts.length; i++) {
            const part = nameParts[i].trim();
            if (part.length > 0) {
                initials += part[0].toUpperCase();
            }
        }
        return initials;
    }
}


// Search task 
function searchTasks() {
    const searchInput = document.getElementById('search-task-input');
    const searchTerm = searchInput.value.toLowerCase();
    matchingTasks = [];
    
    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      const title = task.title.toLowerCase();
      const description = task.description.toLowerCase();
      if (title.includes(searchTerm) || description.includes(searchTerm)) {
        matchingTasks.push(task);
      }
    }
    renderSearchedTasks();
  }


// rendert suchergebnisse
function renderSearchedTasks() {
    clearAllStatusContainers(); // alle Render Container leeren
    for (let i = 0; i < matchingTasks.length; i++) {
        const task = matchingTasks[i];
        const status = task['status'];        
        generateTaskPreviewHTML(task, status, i)
        showTaskProgress(task, i);
        showTaskContactsPreview(task,i);
        showTaskPrioImage(task,i)
    }
}

// Alle Container mit Task Previews leeren 
function clearAllStatusContainers() {
    document.getElementById('toDo').innerHTML = '';
    document.getElementById('inProgress').innerHTML = '';
    document.getElementById('awaitingFeedback').innerHTML = '';
    document.getElementById('done').innerHTML = '';
}



/*********************************************************************/
/* Task Preview Drag and Drop */
/*********************************************************************/

// Dragging 
function startDragging(id) {
    currentDraggedElement = id; // Speichert die ID des bewegten Elements
}

// Ändert den Status des Tasks nach dem Ablegen in den entsprechenden Container
async function moveTo(newStatus) {
    tasks[currentDraggedElement]['status'] = newStatus; // Change Status in task Array
    await saveTasksOnServer(); // save Task on Server
    renderTasksToKanban();
    removeAllHighlights(); 
}

// W3-Standardfunktion
function allowDrop(ev) {
    ev.preventDefault();
}

function highlighting(id) {
    document.getElementById(id).classList.add('highlight');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('highlight');
}

function removeAllHighlights() {
    const containers = document.getElementsByClassName('kanban-Container');
    for (let i = 0; i < containers.length; i++) {
        containers[i].classList.remove('highlight');
    }
}

    
/*********************************************************************/
/* Task fullview */
/*********************************************************************/

// Show cklicked Task as Fullview
function showFullTask(i) {
    let task = tasks[i]
    showOverlayBoard();
    renderFullTask(task, i);
    showTaskContactsFull(task,i)
    setPrioOnFullTask(task);  
}

//show overlay
function showOverlayBoard(){
    document.getElementById('board-overlay').classList.remove('d-none')
}


// show task in a Fullview on Overlay
function renderFullTask(task,i) {
    document.getElementById('board-overlay').innerHTML = /*html*/ `
    <div class="board-overlay-inlay" id="board-overlay-inlay">
        <div class="full-task-container">
            <div class="task-category-container-full" style="background-color: ${task['category']['color']}">${task['category']['category']}</div>
            <div class="task-title-container-full">${task['title']}</div>
            <div class="task-description-container-full">${task['description']}</div>
            <div class="task-due-date-container">
                <span class="smal-title">Due date:</span>
                <span class="due-date-full">${task['dueDate']}</span>
            </div>
            <div class="prio-container-full" id="prio-container-full"></div>
            <div class="task-contact-full" id="task-contact-full">
                <span class="smal-title">Assigned To:</span> 
                <div class="contact-render-container-full" id="contact-render-container-full"></div>                   
            </div>   
            <div class="close-button-full" onclick="closeTaskFull()">
                <img src="./Img/icon_close.svg" alt="">
            </div>
            <div class="options-full" >
                <div class="delete-task-button" onclick="deleteTask(${i})">
                    <img src="./Img/icon_trash.svg" alt="">
                </div>
                <div class="edit-task-button" onclick="editTaskWindow(${i})">
                    <img src="./Img/icon_pencil.svg" alt="">
                </div>
            </div>
        </div>
    </div>
    `;

}


// render Contacts on fullview
function showTaskContactsFull(task) {
    let taskEmails = task['taskEmails'];
    for (let j = 0; j < taskEmails.length; j++) {
        const email = taskEmails[j];
        let initials =  getInitials(email);
        if (initials === null) { // Iteration überspringen und mit dem nächsten Schleifendurchlauf fortfahren
            continue; 
        } else {
            let colorClass = getColorClass(email);
            let name = getNameFromEmail(email)
            createContactFullHtml(initials, colorClass, name);
        }
    }
}

// ladet die Daten für die Prio Anzeige ab --> storage.js "priorityValues"
function setPrioOnFullTask(task) {
    const priority = task['prio'];
    const { color, text, img } = priorityValues[priority];
    createPrioHTML(color, text, img);
}


// Contact Icon on Fullview
function createContactFullHtml(initials, colorClass, name) {
    document.getElementById('contact-render-container-full').innerHTML += /*html*/ `
        <div class="task-contact-container-full">
            <div class="contact-circle ${colorClass}">
                <span>${initials}</span>
            </div>
            <span class="name-full">${name}</span>
        </div>
    `;
}


// Hole den namen anhand der email
function getNameFromEmail(email) {
    let name = findContactByEmail(email);
    if(name !== null) {
        return name['name'];
    }
}


// Setzt Prio Anzeige auf Full Task  "prio-container-full"
function createPrioHTML(color, text, img) {
    document.getElementById('prio-container-full').innerHTML = /*html*/ `
    <span class="smal-title">Priority:</span>
    <div class="prio-icon-full" style="background-color: ${color}" >
        <span  id="prio-text">${text}</span>
        <img src="${img}" alt="">
    </div>
`;
}


// Delete Task
async function deleteTask(i){
    tasks.splice(i, 1)
    await saveTasksOnServer()
    getCategoryArray()
    closeOverlayBoard()
    renderTasksToKanban()
}


/*********************************************************************/
/* Edit Task */
/*********************************************************************/

//Show Edit Task Window
function editTaskWindow(i) {
    document.getElementById('board-overlay').innerHTML = '';
    document.getElementById('board-overlay').innerHTML = shwoTaskForm('editTask', i);
    setValuesOnForm(i);
}


// Setzte Task Werte in das Task Formular zur bearbeitung 
function setValuesOnForm(i) {
    document.getElementById('title-input').value = tasks[i]['title']; // titel to Input
    document.getElementById('description-input').value = tasks[i]['description']; // description to input
    selectCategory(tasks[i]['category']['category'], 'category-input', tasks[i]['category']['color'] ) // Category to input
    showAddedTaskContacts(tasks[i]['taskEmails']); // adde Emails
    document.getElementById('due-date').value = tasks[i]['dueDate']; // Date to Date Input
    setTaskPrioButton(i); // setzt die Task Prio anhand des Tasks
    showSubtasksForEdit(i)
}


// Zeige subtask in Formular an
function  showSubtasksForEdit(i){
    subTasks = [];
    let taskSubtasks = tasks[i]['subtasks'];
    for (let j = 0; j < taskSubtasks.length; j++) {
        const taskSubtask = taskSubtasks[j];
        subTasks.push(taskSubtask)
    }
    renderSubtasks() 
}

// setzte die gespeicherte prio anhand des Buttons
function setTaskPrioButton(i) {
    let prio = tasks[i]['prio']
    let buttonId = 'prio-'+prio 
    setPrio(prio, buttonId);
} 


// Read all Inputs and Variables to Save Edited Task
function editTask(i){
    checkSubtaskStates()
    //console.log('edited Task =',subTasks2)
    
    const title = document.getElementById('title-input').value;
    const description = document.getElementById('description-input').value;
    const taskCategory = setCategoryToAddTask()
    const taskEmails =  addedContacts;
    const dueDate = getDateFromInput();
    const taskPrio = newTaskPrio;
    const taskSubTasks = editSubTasks;
    const status = tasks[i]['status'];
    
    createEditedTaskJson(title,description, taskCategory, taskEmails, dueDate, taskPrio, taskSubTasks,status, i);
 }


// Überscgreibe task mit neuen werten
 function createEditedTaskJson(title,description, taskCategory, taskEmails, dueDate, taskPrio, taskSubTasks, status, i){
    let editedTask = {
        "title": title,
        "description": description,
        "category": taskCategory,
        "taskEmails": taskEmails,
        "dueDate": dueDate,
        "prio": taskPrio,
        "subtasks": taskSubTasks,
        "status": status
    }
    
    tasks[i] = editedTask;  
    updateTasks();
 }



 async function updateTasks() {
    await saveTasksOnServer(); // on --> storage.js
    closeTaskFull() //

    /*
    getCategoryArray() // -> addTask.html // erstelle Array "taskCategories" aus array "tasks"
    getEmailsFromContacts() // -> addTask.html // speicher alle Emails mit Color in "allEmails"
    renderTasksToKanban(tasks)
    */
    renderTasksToKanban()
    //initBoard()

 }





// Zeigt die hinzugefügten Kontakte als icons an
function showAddedTaskContacts(taskEmails){
    addedContacts = [];
    for (let i = 0; i < taskEmails.length; i++) {
        const email = taskEmails[i];
        addedContacts.push(email);   
    }
    renderContactIcons() // -> add_task
}


// Close Full Taskview
function closeTaskFull() {
    document.getElementById('board-overlay').innerHTML = '';
    document.getElementById('board-overlay').classList.add('d-none')
}





function closeOverlayBoard(){
    document.getElementById('board-overlay').classList.add('d-none')
}


// show Add Task Formular on Board
function showAddTaskForm() {
    showOverlayBoard();
    document.getElementById('board-overlay').innerHTML = shwoTaskForm('addTask');
    setAddTaskFormButtons()
    setFormCloseButton(); 
}

// onsubmit = editTask(i)
function shwoTaskForm(submitfunction,i) {
    return /*html*/ `
         <div class="board-overlay-inlay" id="board-overlay-inlay">
                    <form onsubmit="${submitfunction}(${i}); return false" id="form">
                <div class="form-input-section">
                    <div class="form-left">

                        <label>Title</label>
                        <div class="form-box">
                            <input  type="text" id="title-input" placeholder="Enter a title" required>
                        </div>
                        <label>Description</label>
                        <div class="form-box">
                            <textarea class="description-input" id="description-input" placeholder="Enter a description"></textarea>
                        </div>
                        <label>Category</label>
                        <div class="form-box" id="category-container">
                            <div class="category-input-wrapper">
                                <input class="category-input" id="category-input" type="text" placeholder="Select your Category" readonly onclick="showCategoryOptions()" required>
                                <div class="color-point" id="selected-color-point"></div>
                                <img src="./Img/triangle.png" alt="" onclick="showCategoryOptions()">
                            </div>
                            <div class="selection-item" id="new-category-item"></div>
                            <div class="categories-container" id="categories-container" ></div>
                        </div>
                        <label>Assigned to</label>
                        <div class="form-box" id="assigned-to-container">
                            <div class="category-input-wrapper">
                                <input class="contacts-input" id="contacts-input" type="text" placeholder="Select contacts to assign" readonly onclick="showContactOptions()">
                                <img src="./Img/triangle.png" alt="" onclick="showCategoryOptions()">
                            </div>                           
                            <div class="selection-item" id="new-contact-item"></div>
                            <div class="categories-container" id="contacts-container"></div>
                        </div>
                        <div class="contact-icon-container" id="contact-icon-container"></div>                       
                    </div>
                    <div class="parting-line" id="parting-line"></div>
                    <div class="form-right">
                        <label>Due date</label>
                        <div class="form-box">
                            <input class="due-date" type="date" id="due-date" placeholder="dd/mm/yyyy" required>
                        </div>
                        <label for="prio">Prio</label>
                        <div class="prio-options">
                            <div class="prio-buttons" id="prio-urgent" onclick="setPrio('urgent', 'prio-urgent')">
                                <span>Urgent</span>
                                <div class="arrow-icon-box">
                                    <img src="./Img/arrow-up-white.png" alt="" class="layer1">
                                    <img src="./Img/arrow-up-red.png" alt="" class="layer2" id="icon-urgent">
                                </div>
                            </div>
                            <div class="prio-buttons" id="prio-medium" onclick="setPrio('medium', 'prio-medium')">
                                <span>Medium</span>
                                <div class="arrow-icon-box">
                                    <img src="./Img/equal-white.png" alt="" class="layer1">
                                    <img src="./Img/equal-orange.png" alt="" class="layer2" id="icon-medium">
                                </div>
                            </div>
                            <div class="prio-buttons" id="prio-low" onclick="setPrio('low', 'prio-low')">
                                <span>Low</span>
                                <div class="arrow-icon-box">
                                    <img src="./Img/arrow-down-white.png" alt="" class="layer1">
                                    <img src="./Img/arrow-down-green.png" alt="" class="layer2" id="icon-low">
                                </div>
                            </div>
                        </div>
                        <label>Subtasks</label>
                        <div class="form-box" id="sub-task">
                            <div class="category-input-wrapper">
                                <input class="category-input" id="subtask-input" type="text" placeholder="Add new subtask" onclick="showSubtaskInput()">
                                <img src="./Img/triangle.png" alt="" onclick="showSubtaskInput()">
                            </div>
                        </div>
                        <div class="subtasks-container" id="subtasks-container"></div>
                    </div>
                </div>
                
                <div class="button-bar" id="button-bar">

                    <button class="create-task-btn" type="submit">
                        <span>OK</span> 
                        <img src="./Img/icon_check.svg" alt="">
                    </button>
                </div>

            </form>
        </div>
    `;

}

// Setzt die Add Task und Clear Button auf Add Task form
function setAddTaskFormButtons() {
    document.getElementById('button-bar').innerHTML = /*html*/ `
        <div class="clear-btn" onclick="clearAddTaskFormular()">Clear X</div>
        <button class="create-task-btn" type="submit">
            <span>Create Task</span> 
            <img src="./Img/icon_check.svg" alt="">
        </button>
    `;
}

function setFormCloseButton(){
    document.getElementById('board-overlay-inlay').innerHTML += /*html*/ `
    <div class="close-button-parent">
        <div class="close-button-addTask" onclick="closeTaskFull()">
            <img src="./Img/icon_close.svg" alt="">
        </div>
    </div>
    `;

}