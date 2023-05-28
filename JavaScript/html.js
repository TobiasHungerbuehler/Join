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
            <input class="category-input" id="category-input" type="text" placeholder="New category name">
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
            <input class="category-input" id="category-input" type="text" placeholder="Select your Category"  readonly onclick="showCategoryOptions()">
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