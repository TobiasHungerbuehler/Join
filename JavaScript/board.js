
let currentDraggedElement;

/*********************************************************************/
/* Board main functions */
/*********************************************************************/

async function initBoard() {
    init() // Start Template
    await getTasks() // load tasks from server and save in "tasks"
    await getContacts() // Load Contacts from Server
    getCategoryArray() // erstelle Array "taskCategories" aus array "tasks"

    //await getContacts() // Lade die User Kontake vom Server
    getEmailsFromContacts() // speicher alle Emails mit Color in "allEmails"

    
    console.log('downloaded Contacts',contacts)
    renderTasksToKanban()
}


// Rendert alle Task nach status in die gelichnamigen container im Kanban
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


// Create Task on Board
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


function showTaskContactsPreview(task,i) {
    let taskEmails = task['taskEmails'];
    for (let j = 0; j < taskEmails.length; j++) {
        const email = taskEmails[j];
        let initials =  getInitials(email);
        let colorClass = getColorClass(email);
        if(j == 2){
            initials = numberOFContacts(taskEmails);
            createContactPreviewItem(initials, colorClass,i)
            break
        }
        createContactPreviewItem(initials, colorClass,i)
    }
}


function getColorClass(email) {
    let contact = findContactByEmail(email);
    return contact['avatarColor'];
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
    let name = contact['name'];
    const nameParts = name.split(' ');
    let initials = '';
    for (let i = 0; i < nameParts.length; i++) {
        const part = nameParts[i].trim();
        if (part.length > 0) {
            initials += part[0].toUpperCase();
        }
    }
    return initials
}

// setzt den letzten Contact icon '+2'
function numberOFContacts(taskEmails) {
    let length = taskEmails.length;
    let lastIcontext = length -2;
    return '+'+lastIcontext;
}


// Alle Container mit Task Previews leeren 
function clearAllStatusContainers() {
    document.getElementById('toDo').innerHTML = '';
    document.getElementById('inProgress').innerHTML = '';
    document.getElementById('awaitingFeedback').innerHTML = '';
    document.getElementById('done').innerHTML = '';
}



// Draggin 
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


// from w3 standard
function allowDrop(ev) {
    ev.preventDefault();
}


/*********************************************************************/
/* Task fullview */
/*********************************************************************/


function showFullTask(i) {

    let task = tasks[i]
    showOverlayBoard();

    renderFullTask(task, i);
    setPrioOnFullTask(task);
    showTaskContactsFull(task,i)

    
}

// show task in a Fullview on Overlay
function renderFullTask(task,i) {

    document.getElementById('board-overlay').innerHTML = /*html*/ `
    
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
                <div class="delete-task-button">
                    <img src="./Img/icon_trash.svg" alt="">
                </div>
    
                <div class="edit-task-button" onclick="editTask(${i})">
                    <img src="./Img/icon_pencil.svg" alt="">
                </div>
            </div>

        </div>
    
    `;

}


// render Contacts on full
function showTaskContactsFull(task) {
    let taskEmails = task['taskEmails'];
    for (let j = 0; j < taskEmails.length; j++) {
        const email = taskEmails[j];
        let initials =  getInitials(email);
        let colorClass = getColorClass(email);
        let name = getNameFromEmail(email)
        createContactFullHtml(initials, colorClass, name);
        console.log('kontakt', j, initials, colorClass, name)
    }

}

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



function getNameFromEmail(email) {
    let name = findContactByEmail(email);
    return name['name'];
}


// ruft die Daten für die Prio Anzeige ab --> storage.js "priorityValues"
function setPrioOnFullTask(task) {
    const priority = task['prio'];
    console.log('prio=',priority)
    const { color, text, img } = priorityValues[priority];
    createPrioHTML(color, text, img);
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



//Edit Task
function editTask(i) {
    document.getElementById('board-overlay').innerHTML = '';
    document.getElementById('board-overlay').innerHTML = shwoTaskForm();
    setValuesOnForm(i);
}


// Setzte Task Werte in das Task Formular zur bearbeitung 
function setValuesOnForm(i) {
    document.getElementById('title-input').value = tasks[i]['title'];
    document.getElementById('description-input').value = tasks[i]['description'];
    selectCategory(tasks[i]['category']['category'], 'category-input', tasks[i]['category']['color'] )
    showAddedTaskContacts(tasks[i]['taskEmails']);

    console.log(tasks[i]['dueDate'])
    document.getElementById('due-date').value = tasks[i]['dueDate'];
    
    //setDateInInput(i)

}


// 
function setDateInInput(i) {
    const dateObject = new Date(tasks[i]['dueDate']);
    const day = dateObject.getDate().toString().padStart(2, '0');
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObject.getFullYear().toString();
  
    const formattedDate = `${day}.${month}.${year}`;
  
    document.getElementById('due-date').value = formattedDate;
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






function showOverlayBoard(){
    document.getElementById('board-overlay').classList.remove('d-none')
}


function closeOverlayBoard(){
    document.getElementById('board-overlay').classList.add('d-none')
}


function shwoTaskForm() {
    return /*html*/ `
                    <form onsubmit="addTask(); return false">
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
                    <div class="parting-line"></div>
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
                
                <div class="button-bar">
                    <div class="clear-btn" onclick="clearAddTaskFormular()">Clear X</div>
                    <button class="create-task-btn" type="submit">
                        <span>Create Task</span> 
                        <img src="./Img/icon_check.svg" alt="">
                    </button>
                </div>

            </form>
    
    `;

}