/*********************************************************************/
/* Html render functions */
/*********************************************************************/

/**
 * Displays the "New Category" item in the category options.
 */
function shwoNewCategoryItem() {
    document.getElementById('new-category-item'). innerHTML = /*html*/  `
        <p onclick="showNewCategoryInput()">New Category</p>
        <img src="./Img/icon_plus_edge.svg" alt="" onclick="showNewCategoryInput()">
        `;
}

/**
 * Creates an HTML element for a category.
 * @param {string} taskCategory - The name of the category.
 * @param {string} taskColor - The color associated with the category.
 */
function createCategoryElementHtml(taskCategory, taskColor) {
    document.getElementById('categories-container'). innerHTML += /* html */ `
        <div class="selection-item" onclick="selectCategory('${taskCategory}', 'category-input', '${taskColor}')">
            <p>${taskCategory}</p>
            <div class="color-point" style="background-color: ${taskColor};"></div>
        </div>
        `;
}


/**
 * Renders the "New Category" window for user input after clicking on "New Category".
 */
function showNewCategoryInput() {
    document.getElementById('category-container').innerHTML = /*html*/ `
    <div class="new-category-wrapper">
            <input class="category-input" id="category-input" type="text" placeholder="New category name" required>
        <input type="color" class="color-point-selector" id="colorpicker">
        <img class="new-category-close-img" src="./Img/icon_close.svg" alt="" onclick="createCategoryContainerHTML()">
        <img class="new-category-check-img" src="./Img/check.svg" alt="" onclick="saveNewCategory()">
    </div>
    `;
}


/**
 * Restores the category options view after creating a new category.
 */
function createCategoryContainerHTML() {
    document.getElementById('category-container').innerHTML = /*html*/ `
        <div class="category-input-wrapper">
            <input class="category-input" id="category-input" type="text" placeholder="Select your Category"  readonly onclick="showCategoryOptions()" required>
            <div class="color-point" id="selected-color-point"></div>
            <img src="./Img/triangle.png" alt="" onclick="showCategoryOptions()">
        </div>
        <div class="selection-item" id="new-category-item"></div>
        <div class="categories-container" id="categories-container"></div>
    `;
}


/**
 * Creates an HTML element for a contact.
 * @param {string} email - The email address of the contact.
 * @param {string} color - The color associated with the contact.
 */
function createContactElementHtml(email, color) {
    document.getElementById('contacts-container').innerHTML += /* html */ `
        <div class="selection-item contact-item">
            <p>${email}</p>
            <div class="checkbox-container">
                <input class="email-checkbox" type="checkbox" data-email="${email}" data-color="${color}" onclick="toAddedContacts()">
            </div>
        </div>
    `;
}


/**
 * Renders the "New Contact" window for user input after clicking on "Invite new contact".
 */
function showNewContactInput() {
    document.getElementById('assigned-to-container').innerHTML = /*html*/ `
    <form  onsubmit="saveNewContact(); return false">
        <div class="new-category-wrapper">
                <input class="category-input" type="email" id="contact-input" type="text" placeholder="Contact email">
                <img class="new-category-close-img" src="./Img/icon_close.svg" alt="" onclick="submit()">
                <img class="new-category-check-img" src="./Img/check.svg" alt="" onclick="saveNewContact()">
        </div>
        <input class="category-input" type="email" id="contact-name-input" type="text" placeholder="Contact name" required>
        <input class="category-input" type="email" id="contact-phone-input" type="number" placeholder="Contact phone" required>
    </form>
    `;
}


/**
 * Restores the contact options view after creating a new contact.
 */
function createContactContainerHTML() {
    document.getElementById('assigned-to-container').innerHTML = /*html*/ `
        <div class="category-input-wrapper">
            <input class="contacts-input" id="contacts-input" type="text" placeholder="Select contacts to assign" readonly onclick="showContactOptions()">
            <img src="./Img/triangle.png" alt="" onclick="showCategoryOptions()">
        </div>
        <div class="selection-item" id="new-contact-item"></div>
        <div class="categories-container" id="contacts-container"></div>
    `;
}


/**
 * Displays the input field for adding a new subtask.
 */
function showSubtaskInput() {
    document.getElementById('sub-task').innerHTML = /*html*/ `
        <div class="new-category-wrapper">
            <input class="category-input" id="subtask-input" type="text" placeholder="Add new subtask" autofocus>
            <img class="new-category-close-img" src="./Img/icon_close.svg" alt="" onclick="closeSubtaskInput()">
            <img class="new-category-check-img" src="./Img/check.svg" alt="" onclick="addSubtask()">
        </div>
    `;
}


/**
 * Resets the subtask input field to its initial state.
 */
function resetSubtaskInput() {
    document.getElementById('sub-task').innerHTML = `
        <div class="category-input-wrapper">
            <input class="category-input" id="subtask-input" type="text" placeholder="Add new subtask" onclick="showSubtaskInput()">
            <img src="./Img/triangle.png" alt="" onclick="showSubtaskInput()">
        </div>
    `;
}


/**
 * Generates the HTML for a task preview and renders it in the corresponding status container.
 * 
 * @param {Object} task - The task object.
 * @param {string} status - The status of the task.
 * @param {number} i - The index of the task.
 */
function generateTaskPreviewHTML(task, status, i) {
    return document.getElementById(status).innerHTML += /*html*/ `
        <div class="task-container" id="task${i}" draggable="true"              
            ondragstart="startDragging(${i})" 
            onclick="handleClick(${i})">
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


/**
 * Generates the HTML for the progress bar and renders it in the progress container.
 * 
 * @param {number} i - The index of the task.
 * @param {number} percent - The percentage of completed subtasks.
 * @param {number} completedSubtasks - The number of completed subtasks.
 * @param {number} totalSubtasks - The total number of subtasks.
 */
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


/**
 * Renders the task as a full view on the overlay.
 * 
 * @param {Object} task - The task object.
 * @param {number} i - The index of the task.
 */
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
                <img src="./Img/arrow-left-blue.svg" alt="">
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


/**
 * Creates the HTML for a contact on the full view.
 * 
 * @param {string} initials - The initials of the contact.
 * @param {string} colorClass - The color class for the contact circle.
 * @param {string} name - The name of the contact.
 */
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


/**
 * Show the task form and specify the submit function.
 * @param {string} submitfunction - The submit function for the form.
 * @param {number} i - The index of the task.
 */
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