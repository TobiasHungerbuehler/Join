let matchingTasks = [];



/*********************************************************************/
/* Board start functions */
/*********************************************************************/

/**
 * Initializes the board page.
 * Calls necessary functions to set up the board.
 */
async function initBoard() {
    init() // Start Template
    await getAllAppData()// load appData from Server

    await getTasks() // load tasks from server and save in "tasks"
    await getContacts() // Load Contacts from Server
    getCategoryArray() // -> addTask.html 
    getEmailsFromContacts() // -> addTask.html 
    renderTasksToKanban()
}


/**
 * Renders all tasks to their respective status containers in the kanban board.
 */
function renderTasksToKanban() {
    clearAllStatusContainers();
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        const status = task['status'];        
        generateTaskPreviewHTML(task, status, i)
        showTaskProgress(task, i);
        showTaskContactsPreview(task,i);
        showTaskPrioImage(task,i)
    }
}



/**
 * Shows the task progress by calculating a progress bar based on subtasks and renders it in the progress container.
 * 
 * @param {Object} task - The task object.
 * @param {number} i - The index of the task.
 */
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


/**
 * Shows the contact icons within the task preview.
 * 
 * @param {Object} task - The task object.
 * @param {number} i - The index of the task.
 */
function showTaskContactsPreview(task, i) {
    let taskEmails = task['taskEmails'];
    for (let j = 0; j < taskEmails.length; j++) {
        const email = taskEmails[j];
        let initials = getInitials(email);
        if (initials === null) { 
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



/**
 * Shows the corresponding priority icon for the task.
 * 
 * @param {Object} task - The task object.
 * @param {number} i - The index of the task.
 */
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


/**
 * Returns the number of contacts in a task's taskEmails array.
 * 
 * @param {Array} taskEmails - The task's email contacts.
 * @returns {string} - The number of contacts with a '+' prefix.
 */
function numberOFContacts(taskEmails) {
    let length = taskEmails.length;
    let lastIcontext = length -2;
    return '+'+lastIcontext;
}


/**
 * Returns the CSS color class for a contact's avatar.
 * 
 * @param {string} email - The contact's email.
 * @returns {string} - The CSS color class.
 */
function getColorClass(email) {
    let contact = findContactByEmail(email);
    if(contact !== null){
        return contact['avatarColor'];
    }
}


/**
 * Finds a contact by email.
 * 
 * @param {string} email - The contact's email.
 * @returns {Object|null} - The contact object if found, null otherwise.
 */
function findContactByEmail(email) {
    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].email === email) {
            return contacts[i];
        }
    }
    return null; 
}


/**
 * Creates the HTML for a contact preview item and renders it in the task contacts preview container.
 * 
 * @param {string} initials - The initials of the contact.
 * @param {string} colorClass - The CSS color class for the contact's avatar.
 * @param {number} i - The index of the task.
 */
function createContactPreviewItem(initials, colorClass,i){
    document.getElementById('preview-task-contacts'+i).innerHTML += /*html*/ `
            <div class="circle-preview ${colorClass}">
                <span>${initials}</span>
            </div>
    `;
}


/**
 * Creates the initials from a contact's name.
 * 
 * @param {string} email - The contact's email.
 * @returns {string|null} - The initials of the contact's name if found, null otherwise.
 */
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


/**
 * Searches for tasks based on the search term and renders the matching tasks.
 */
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


/**
 * Renders the searched tasks.
 */
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


/**
 * Clears all status containers with task previews.
 */
function clearAllStatusContainers() {
    document.getElementById('toDo').innerHTML = '';
    document.getElementById('inProgress').innerHTML = '';
    document.getElementById('awaitingFeedback').innerHTML = '';
    document.getElementById('done').innerHTML = '';
}


/*********************************************************************/
/* Task Preview Drag and Drop */
/*********************************************************************/

/**
 * Starts dragging the task preview element.
 * 
 * @param {string} id - The ID of the dragged element.
 */
function startDragging(id) {
    currentDraggedElement = id; // Speichert die ID des bewegten Elements
}


/**
 * Changes the status of the task after it is dropped into the corresponding container.
 * 
 * @param {string} newStatus - The new status of the task.
*/
async function moveTo(newStatus) {
    tasks[currentDraggedElement]['status'] = newStatus; // Change Status in task Array
    updatePreview();
}



async function updatePreview() {
    await saveTasksOnServer(); 
    renderTasksToKanban();
    removeAllHighlights(); 
}



/**
 * W3 standard function to allow dropping.
 * 
 * @param {Event} ev - The drag event.
 */
function allowDrop(ev) {
    ev.preventDefault();
}


/**
 * Highlights the specified element.
 * 
 * @param {string} id - The ID of the element to highlight.
 */
function highlighting(id) {
    document.getElementById(id).classList.add('highlight');
}


/**
 * Removes the highlight from the specified element.
 * 
 * @param {string} id - The ID of the element to remove the highlight from.
 */
function removeHighlight(id) {
    document.getElementById(id).classList.remove('highlight');
}


/**
 * Removes the highlight from all elements.
 */
function removeAllHighlights() {
    const containers = document.getElementsByClassName('kanban-Container');
    for (let i = 0; i < containers.length; i++) {
        containers[i].classList.remove('highlight');
    }
}


// Mobile
let clickTimer = null;
let isDoubleClick = false;

function handleClick(i) {
    if (clickTimer === null) {
        clickTimer = setTimeout(function() {
            if (!isDoubleClick) {
                showFullTask(i); // Funktion für den einfachen Klick
            }
            clearTimeout(clickTimer);
            clickTimer = null;
            isDoubleClick = false;
        }, 300); // 300ms Verzögerung
    } else {
        isDoubleClick = true;
        showTaskOptions(i); // Funktion für den Doppelklick
        clearTimeout(clickTimer);
        clickTimer = null;
    }
}


function showTaskOptions(i) {
    // Ihre Logik für den Doppelklick hier
    document.getElementById('task'+i).innerHTML = /*html*/ `
        <div class="task-container-options" onclick="renderTasksToKanban()">
            <div class="arrow-left">
                <img src="./Img/arrow-left-blue.svg" alt="">
            </div>
            <div class="task-option-btn" onclick="changeStautsTo(${i},'done')">Done</div>
            <div class="task-option-btn" onclick="changeStautsTo(${i},'awaitingFeedback')">Awaiting Feedback</div>
            <div class="task-option-btn" onclick="changeStautsTo(${i},'inProgress')">In progress</div>
            <div class="task-option-btn" onclick="changeStautsTo(${i},'toDo')">To Do</div>
        </div>
    `;
}


async function changeStautsTo(i, status){
    tasks[i]['status'] =  status; 
    updatePreview()
}


  
/*********************************************************************/
/* Task fullview */
/*********************************************************************/

// priority display options
const priorityValues = {
    urgent: {
        color: '#FF3D00',
        text: 'Urgent',
        img: './Img/arrow-up-white.png'
    },
    medium: {
        color: '#FFA800',
        text: 'Medium',
        img: './Img/equal-white.png'
    },
    low: {
        color: '#7AE229',
        text: 'Low',
        img: './Img/arrow-down-white.png'
    }
  };


/**
 * Shows the clicked task as a full view.
 * 
 * @param {number} i - The index of the task.
 */
function showFullTask(i) {
    let task = tasks[i]
    showOverlayBoard();
    document.getElementById('body').style.overflow = 'hidden';
    renderFullTask(task, i);
    showTaskContactsFull(task,i)
    setPrioOnFullTask(task);  
}


/**
 * Shows the overlay board.
 */
function showOverlayBoard(){
    document.getElementById('board-overlay').classList.remove('d-none')
}


/**
 * Shows the task contacts on the full view.
 * 
 * @param {Object} task - The task object.
 */
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


/**
 * Loads the priority data and sets the priority display on the full task.
 * 
 * @param {Object} task - The task object.
 */
function setPrioOnFullTask(task) {
    const priority = task['prio'];
    const { color, text, img } = priorityValues[priority];
    createPrioHTML(color, text, img);
}


/**
 * Gets the name associated with the email.
 * 
 * @param {string} email - The email address.
 * @returns {string} The name associated with the email.
 */
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


/**
 * Deletes a task.
 * 
 * @param {number} i - The index of the task to delete.
 */
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

/**
 * Show the Edit Task Window.
 * @param {number} i - The index of the task.
 */
function editTaskWindow(i) {
    document.getElementById('board-overlay').innerHTML = '';
    document.getElementById('board-overlay').innerHTML = shwoTaskForm('editTask', i);
    setFormCloseButton()
    setValuesOnForm(i);
}


/**
 * Set values in the task form for editing.
 * @param {number} i - The index of the task.
 */
function setValuesOnForm(i) {
    document.getElementById('title-input').value = tasks[i]['title']; // titel to Input
    document.getElementById('description-input').value = tasks[i]['description']; // description to input
    selectCategory(tasks[i]['category']['category'], 'category-input', tasks[i]['category']['color'] ) // Category to input
    showAddedTaskContacts(tasks[i]['taskEmails']); // adde Emails
    document.getElementById('due-date').value = tasks[i]['dueDate']; // Date to Date Input
    setTaskPrioButton(i); // setzt die Task Prio anhand des Tasks
    showSubtasksForEdit(i)
}


/**
 * Show subtasks in the form for editing.
 * @param {number} i - The index of the task.
 */
function  showSubtasksForEdit(i){
    subTasks = [];
    let taskSubtasks = tasks[i]['subtasks'];
    for (let j = 0; j < taskSubtasks.length; j++) {
        const taskSubtask = taskSubtasks[j];
        subTasks.push(taskSubtask)
    }
    renderSubtasks() 
}

/**
 * Set the task priority button based on the task.
 * @param {number} i - The index of the task.
 */
function setTaskPrioButton(i) {
    let prio = tasks[i]['prio']
    let buttonId = 'prio-'+prio 
    setPrio(prio, buttonId);
} 


/**
 * Read all inputs and variables to save the edited task.
 * @param {number} i - The index of the task.
 */
function editTask(i){
    checkSubtaskStates()    
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


/**
 * Create a JSON object for the edited task.
 * @param {string} title - The title of the task.
 * @param {string} description - The description of the task.
 * @param {object} taskCategory - The category of the task.
 * @param {array} taskEmails - The emails associated with the task.
 * @param {string} dueDate - The due date of the task.
 * @param {string} taskPrio - The priority of the task.
 * @param {array} taskSubTasks - The subtasks of the task.
 * @param {string} status - The status of the task.
 * @param {number} i - The index of the task.
 */
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


/**
 * Update the tasks and perform necessary actions.
 */
 async function updateTasks() {
    await saveTasksOnServer(); // on --> storage.js
    closeTaskFull() //
    renderTasksToKanban()
 }


/**
 * Show the added task contacts as icons.
 * @param {array} taskEmails - The emails associated with the task.
 */
function showAddedTaskContacts(taskEmails){
    addedContacts = [];
    for (let i = 0; i < taskEmails.length; i++) {
        const email = taskEmails[i];
        addedContacts.push(email);   
    }
    renderContactIcons() // -> add_task
}


/**
 * Close the full task view.
 */
function closeTaskFull() {
    document.getElementById('board-overlay').innerHTML = '';
    document.getElementById('board-overlay').classList.add('d-none')
    document.getElementById('body').style.overflow = 'auto';
}


/**
 * Close the overlay board.
 */
function closeOverlayBoard(){
    document.getElementById('board-overlay').classList.add('d-none')
}


/**
 * 
 */
function showAddTaskForm() {
    resetVariables()
    showOverlayBoard();
    document.getElementById('board-overlay').innerHTML = shwoTaskForm('addTask');
    setAddTaskFormButtons()
    setFormCloseButton(); 
}



/**
 * Set the buttons for the add task form.
 */
function setAddTaskFormButtons() {
    document.getElementById('button-bar').innerHTML = /*html*/ `
        <div class="clear-btn" onclick="clearAddTaskFormular()">Clear X</div>
        <button class="create-task-btn" type="submit">
            <span>Create Task</span> 
            <img src="./Img/icon_check.svg" alt="">
        </button>
    `;
}


/**
 * Set the close button for the form.
 */
function setFormCloseButton(){
    document.getElementById('board-overlay-inlay').innerHTML += /*html*/ `
    <div class="close-button-parent">
        <div class="close-button-addTask" onclick="closeTaskFull()">
            <img src="./Img/arrow-left-blue.svg" alt="">
        </div>
    </div>
    `;

}