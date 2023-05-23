
let currentDraggedElement;

/*********************************************************************/
/* Board main functions */
/*********************************************************************/

async function initBoard() {
    init() // Start Template
    await getTasks() // load tasks from server and save in "tasks"
    await getContacts() // Load Contacts from Server
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
    console.log(i, tasks[i]);
    let task = tasks[i]
    showOverlayBoard();

    renderFullTask(task);
    setPrioOnFullTask(task);
    showTaskContactsFull(task,i)

    
}

// show task in a Fullview on Overlay
function renderFullTask(task) {

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














function showOverlayBoard(){
    document.getElementById('board-overlay').classList.remove('d-none')
}


function closeOverlayBoard(){
    document.getElementById('board-overlay').classList.add('d-none')
}


