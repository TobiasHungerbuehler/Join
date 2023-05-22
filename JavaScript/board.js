
let currentDraggedElement;




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
        let colorClass = getColorClas(email);
        if(j == 2){
            initials = numberOFContacts(taskEmails);
            createContactPreviewItem(initials, colorClass,i)
            break
        }
        createContactPreviewItem(initials, colorClass,i)
    }
}

function getColorClas(email) {
    let contact = findContactByEmail(email);
    return contact['avatarColor'];
}


// Erstellt Contact Previem Item HTML
function createContactPreviewItem(initials, colorClass,i){
    document.getElementById('preview-task-contacts'+i).innerHTML += /*html*/ `
            <div class="circle-preview ${colorClass}">
                <span>${initials}</span>
            </div>
    `;
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


function numberOFContacts(taskEmails) {
    let length = taskEmails.length;
    let lastIcontext = length -2;
    return '+'+lastIcontext;
}


function showFullTask(i) {
    console.log(i, tasks[i]);
}







// Alle Container leeren 
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



/*
    let inProgres = tasks.filter(t => t['status'] == 'inProgress');
    let awaitingFeedback = tasks.filter(t => t['status'] == 'awaitingFeedback');
    let done = tasks.filter(t => t['status'] == 'done');

    */