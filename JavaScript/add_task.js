let selectedCategory;
let newCategory;
let newCategoryColor;
let newTaskPrio;
let subTasks = [];
let addedContacts = [];
let taskCategories = [];
let allEmails = [];
let editSubTasks = [];
  

/*********************************************************************/
/* Init add Task */
/*********************************************************************/

/**
 * Load all tasks from the server and store them in the "tasks" array
 * Load all contacts from the server and store them in the "contacts" array
 */
async function initAddTask() {
    init() //Load Html Template
    await getAllAppData()// load appData from Server
    await getTasks(); 
    getCategoryArray() 
    await getContacts() 
    getEmailsFromContacts() 
}


/**
 * Read the categories including color from "tasks" and store them in taskCategories array
 */
function getCategoryArray() {
    tasks.forEach(task => {
      const category = task.category.category;
      let categoryExists = false;
      taskCategories.forEach(existingCategory => {
        if (existingCategory.category === category) {
          categoryExists = true;
        }
      });
  
      if (!categoryExists) {
        taskCategories.push(task.category);
      }
    });
  }


/**
 * Read all emails from "contacts" and create the "taskEmails" array
 */
function getEmailsFromContacts() {
    allEmails = [];
    for (let i = 0; i < contacts.length; i++) {
      const email = contacts[i]['email'];
      const color = contacts[i]['avatarColor'];
      if (!allEmails.includes(email)) {
        allEmails.push( {"email": email, "color": color});
      }
    }
  }


/**
 * Adds a task based on the form data.
 */
function addTask() {
    console.log('addtask function')
    if (!addTaskValidation()) {
        showSuccessInfo('Please select a valid category or create a new one.')
    } else {
        getTaskDataFromForm()
    }
}


/**
 * Retrieves the task data from the form.
 */
async function getTaskDataFromForm() {
    const title = document.getElementById('title-input').value;
    const description = document.getElementById('description-input').value;
    const taskCategory = await setCategoryToAddTask();
    const taskEmails = addedContacts;
    const dueDate = getDateFromInput();
    const taskPrio = getNewTaskPrio();
    const taskSubTasks = subTasks;
    const status = 'toDo';
    createNewTaskJson(title, description, taskCategory, taskEmails, dueDate, taskPrio, taskSubTasks, status); 
}


/**
 * Validates the task form to ensure a valid category is selected.
 * @returns {boolean} True if the validation is successful, false otherwise.
 */
function addTaskValidation() {
    let userValue = document.getElementById('category-input').value;
    if (!userValue) {
        return false; 
    }
    return true; 
}
  

/**
 * Get the selected priority for the new task
 * If no priority is selected, it returns 'low' by default
 * @returns {string} - The priority of the new task
 */
function getNewTaskPrio() {
    if(newTaskPrio == ''){
        newTaskPrio = 'low';
    }
    return newTaskPrio
}


/**
 * Get the selected date from the input field and return it in date format
 * @returns {string} - The selected date in ISO format (yyyy-MM-dd)
 */
function getDateFromInput() {
    const dateInput = document.getElementById('due-date').value;
    const dateObject = new Date(dateInput);
    isoDate = dateObject.toISOString().split('T')[0]; // Extrahieren Sie das Datumsteil "yyyy-MM-dd"
    return isoDate;
  }


/**
 * Create a JSON object for the new task and add it to the "tasks" array
 * @param {string} title - The title of the task
 * @param {string} description - The description of the task
 * @param {Object} taskCategory - The category of the task (object with 'category' and 'color' properties)
 * @param {Array} taskEmails - The emails of the assigned contacts for the task
 */
async function createNewTaskJson(title,description, taskCategory, taskEmails, dueDate, taskPrio, taskSubTasks, status){
   let newTask = {
       "title": title,
       "description": description,
       "category": taskCategory,
       "taskEmails": taskEmails,
       "dueDate": dueDate,
       "prio": taskPrio,
       "subtasks": taskSubTasks,
       "status": status
   }
   tasks.push(newTask);
   await saveTasksOnServer(); // --> storage.js
   clearAddTaskFormular();
   window.location.href = 'board.html';
} 


/**
 * Close the element with the given id
 * @param {string} id - The id of the element to close
 */
function close(id) {
    document.getElementById(id).innerHTML = '';
}


/**
 * Add the selected option to the input field above
 * @param {string} category - The selected category
 * @param {string} id - The id of the input field
 */
function selectionToInput(category, id) {
    document.getElementById(id).value = category;
}


/**
 * Change the onclick function of an element with the given id
 * @param {string} id - The id of the element
 * @param {Function} funct - The new onclick function
 */
function changeOnClick(id, funct) {
    let contactsInput = document.getElementById(id);
    contactsInput.onclick = funct;
  }


/**
 * Set the selected category and color to addTask
 * @returns {Object} - The selected category object
 */
function setCategoryToAddTask() {
    let userValue = document.getElementById('category-input').value;
    let userSelectedCategory = taskCategories.find(category => category.category === userValue);
    return userSelectedCategory
  }


/**
 * Reset the variables after clearing the form, called after addTask
 */
function resetVariables() {
    selectedCategory = '';
    newTaskPrio = '';
    subTasks = [];
    addedContacts = [];
}


/*********************************************************************/
/* Category */
/*********************************************************************/

/**
 * Opens the category options, including the ability to create a new category.
 */
function showCategoryOptions() { 
    shwoNewCategoryItem(); //-> html.js
    renderCategories();
    changeOnClick('category-input', createCategoryContainerHTML)
}


/**
 * Renders the categories from the taskCategories array.
 */
function renderCategories() {
    document.getElementById('categories-container'). innerHTML = ''; 
    for (let i = 0; i < taskCategories.length; i++) {
        const taskCategory = taskCategories[i]['category'];
        const taskColor = taskCategories[i]['color'];
        createCategoryElementHtml(taskCategory, taskColor);  // -> html.js
    }
}


/**
 * Saves the new category and restores the category options view.
 */
function saveNewCategory() {
    selectedCategory = document.getElementById('category-input').value;
    selectedColor = String(document.getElementById('colorpicker').value);
    let taskCategory = {'category' : selectedCategory, 'color' : selectedColor};
    taskCategories.push(taskCategory);
    createCategoryContainerHTML();
    newCategorytoInput(selectedCategory, selectedColor) 
}


/**
 * Adds the newly created category and color to the category input.
 * @param {string} newCategory - The newly created category.
 * @param {string} newCategoryColor - The color associated with the new category.
 */
function newCategorytoInput(newCategory, newCategoryColor)  {
    document.getElementById('category-input').value =  newCategory;
    document.getElementById('selected-color-point').style.backgroundColor =  newCategoryColor;
}


/**
 * Adds the clicked category and color to the input.
 * @param {string} category - The clicked category.
 * @param {string} id - The ID of the input element.
 * @param {string} color - The color associated with the category.
 */
function selectCategory(category, id, color) {
    selectionToInput(category, id);
    document.getElementById('selected-color-point').style.backgroundColor = color;
    close('new-category-item');
    close('categories-container');
}


/*********************************************************************/
/* Assign Contact to Task */
/*********************************************************************/

/**
 * Opens the contact options, including the ability to invite new contacts.
 */
function showContactOptions() { 
    shwoNewContactItem();
    renderAllEmails();
    activateAddedContacts()
    changeOnClick('contacts-input', createContactContainerHTML)
}


/**
 * Renders all emails in the contacts container.
 */
function renderAllEmails() {
    document.getElementById('contacts-container'). innerHTML = ''; 
    for (let i = 0; i < allEmails.length; i++) {
        const email = allEmails[i]['email'];
        const color = allEmails[i]['color'];
        createContactElementHtml(email, color); 
    }
}


/**
 * Adds selected emails to the addedContacts array.
 */
function toAddedContacts() {
    document.getElementById('contact-icon-container').innerHTML = '';
    addedContacts = [];
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    checkboxes.forEach((checkbox) => {
        const email = checkbox.getAttribute('data-email');
        if (email !== null) {
            addedContacts.push(email);
        }
    });
    renderContactIcons();
}


/**
 * Activates the checkboxes of the already added task contacts.
 */
function activateAddedContacts() {
    for (let i = 0; i < addedContacts.length; i++) {
      const email = addedContacts[i]; // Extrahiere die E-Mail-Adresse aus dem Objekt
      activateCheckboxByEmail(email);
    }
  }


/**
 * Activates the checkbox associated with a specific email.
 * @param {string} email - The email address of the contact.
 */  
function activateCheckboxByEmail(email) {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      const checkboxEmail = checkbox.getAttribute('data-email');
      if (checkboxEmail === email) {
        checkbox.checked = true;
      }
    });
  }


/**
 * Renders the added contacts as icons.
 */
function renderContactIcons() {
    for (let i = 0; i < addedContacts.length; i++) {
        const email = addedContacts[i];
        const initials = getInitials(email) // --> board.js
        const color = getColorClass(email) // --> board.js
        if(initials){
            console.log(email, initials, color)
            createContactIconHtml(initials, color);
        }
    }
}


/**
 * Creates an HTML element for a contact icon.
 * @param {string} letters - The initials of the contact.
 * @param {string} color - The color associated with the contact.
 */
function createContactIconHtml(letters, color){
    document.getElementById('contact-icon-container').innerHTML += /*html*/  `
        <div class="contac-icon ${color}">${letters}</div>
    `;
}
 

/**
 * Displays the "Invite new contact" item in the contact options.
 */
function shwoNewContactItem() {
    document.getElementById('new-contact-item'). innerHTML = /*html*/ `
        <p onclick="showNewContactInput()">Invite new contact</p>
        <img src="./Img/new_contact.png" alt="" onclick="showNewContactInput()">
        `;
}


/**
 * Saves the new contact and restores the contact options view.
 */
function saveNewContact() {
    let email = document.getElementById('contact-input').value;
    let name = document.getElementById('contact-name-input').value;
    let phone = document.getElementById('contact-phone-input').value;
    let color = randomColor();
    checkNewContact(email, name, phone); // Input validation
    pushNewContact(email, name, phone, color); // Save new Contact on server
    updateContactsInput()
    showSuccessInfo('Contact successfully created')
}


/**
 * Restores the contact options view.
 * Updates the contact container HTML to its initial state.
 * Calls the function to show the contact options.
 */
async function updateContactsInput() {
    createContactContainerHTML(); // Restores the initial HTML of the contact container
    showContactOptions(); // Calls the function to show the contact options
  }
  


/**
 * Validates the input for the new contact.
 * @param {string} email - The email address of the contact.
 * @param {string} name - The name of the contact.
 * @param {string} phone - The phone number of the contact.
 */
function checkNewContact(email, name, phone){
    if (email.trim() === '' || name.trim() === '' || phone.trim() === '') {
        window.alert('Bitte füllen Sie alle Felder aus.');
    }
}


/**
 * Adds a new contact to the "contacts" array, updates the server, and creates the "allEmails" array.
 * @param {string} email - The email address of the contact.
 * @param {string} name - The name of the contact.
 * @param {string} phone - The phone number of the contact.
 * @param {string} color - The color associated with the contact.
 */
function pushNewContact(email, name, phone, color) {
    let newContact = {
        "name": name,
        "email": email,
        "phone": phone,
        "avatarColor": color
    }
    contacts.push(newContact);
    saveContactsOnServer()
    getEmailsFromContacts() 
}


/**
 * Generates a random color from a predefined array.
 * @returns {string} - The randomly selected color.
 */
function randomColor() {
    let colors = ["blue", "red", "yellow", "green", "hell-blue", "purple", "orange", "gold", "tomato"];
    let randomElement = colors[Math.floor(Math.random() * colors.length)];
    return randomElement;
}


/**
 * Displays a success / error message 
 * @param {string} text - error Message Text
 */
function showSuccessInfo(text) {
    document.getElementById('form').innerHTML += /*html*/ `
        <div class="success-info" id="successInfo">${text}</div>
    `;
    setTimeout(function() {
        removeSuccessInfo();
    }, 2000);
}


/**
 * Removes the success message.
 */
function removeSuccessInfo() {
    const successInfo = document.getElementById('successInfo');
    if (successInfo) {
      successInfo.remove();
    }
  }

/*********************************************************************/
/* Prio */
/*********************************************************************/

/**
 * Sets the value of the newTaskPrio variable to the selected priority.
 * Changes the design of the priority button.
 *
 * @param {string} prio - The selected priority value.
 * @param {string} id - The ID of the priority button.
 */
function setPrio(prio, id) {
    newTaskPrio = prio;
    changePrioBtnDesign(prio, id)
}


/**
 * Changes the appearance of the priority buttons.
 * Resets the previous state of the buttons and updates the styling of the selected button.
 *
 * @param {string} prio - The selected priority value.
 * @param {string} id - The ID of the priority button.
 */
function changePrioBtnDesign(prio, id){
    resetPrioBtn();
    resetPrioIcon();
    setPrioBtnColor(prio, id);
    changeBtnIcon(prio);
}


/**
 * Sets the color of the priority button based on the selected priority.
 *
 * @param {string} prio - The selected priority value.
 * @param {string} id - The ID of the priority button.
 */
function setPrioBtnColor(prio, id){
    document.getElementById(id).classList.add('btn-'+prio);
}


/**
 * Removes the color classes from all priority buttons.
 */
function resetPrioBtn(){
    document.getElementById('prio-urgent').classList.remove('btn-urgent');
    document.getElementById('prio-medium').classList.remove('btn-medium');
    document.getElementById('prio-low').classList.remove('btn-low');
}


/**
 * Hides the cover icon of the selected priority button.
 *
 * @param {string} prio - The selected priority value.
 */
function changeBtnIcon(prio) {
    document.getElementById('icon-'+prio).classList.add('d-none');
}


/**
 * Resets the cover icons of all priority buttons.
 */
function resetPrioIcon() {
    document.getElementById('icon-urgent').classList.remove('d-none');
    document.getElementById('icon-medium').classList.remove('d-none');
    document.getElementById('icon-low').classList.remove('d-none');
}


/*********************************************************************/
/* Subtasks */
/*********************************************************************/


/**
 * Reads the user input for a new subtask and saves it in the subTasks array.
 */
function addSubtask() {
    let newSubtaskTitle = document.getElementById('subtask-input').value;
    if(newSubtaskTitle){
        let newSubtask = {"title": newSubtaskTitle, "isCompleted": "false"}
        subTasks.push(newSubtask);
        document.getElementById('subtask-input').value = '';
        renderSubtasks();
    }
}


/**
 * Resets the subtask input field.
 */
function closeSubtaskInput() {
    document.getElementById('subtask-input').value = '';
    resetSubtaskInput();
}


/**
 * Renders the subtasks on the screen.
 */
function renderSubtasks() {
    let subtasksContainer = document.getElementById('subtasks-container');
    subtasksContainer.innerHTML = '';
    for (let i = 0; i < subTasks.length; i++) {
        let subtask = subTasks[i];
        let isCompleted = subtaskStatus(subtask);
        createSubtask(subtask, isCompleted);
    }
}


/**
 * Checks the status of a subtask (completed or not).
 *
 * @param {Object} subtask - The subtask object.
 * @returns {string} - The CSS class for the checkbox (checked or empty string).
 */
function subtaskStatus(subtask) {
    let status = subtask['isCompleted'];
    if(status == 'true'){
        return 'checked';
    } else {
        return '';
    }
}


/**
 * Creates the HTML for a subtask.
 *
 * @param {Object} subtask - The subtask object.
 * @param {string} isCompleted - The CSS class for the checkbox (checked or empty string).
 */
function createSubtask(subtask, isCompleted) {
    document.getElementById('subtasks-container').innerHTML +=  /*html*/ `
        <div class="subtask-item">
            <input type="checkbox" class="checkbox" onclick="checkSubtaskStates()" ${isCompleted}>
            <span>${subtask['title']}</span>
        </div>
    `;
}


/**
 * Checks the states of the subtask checkboxes and updates the subTasks array.
 */
function checkSubtaskStates() {
    const subtaskItems = document.getElementsByClassName('subtask-item');
    const subTasks = [];
    for (let i = 0; i < subtaskItems.length; i++) {
      const checkbox = subtaskItems[i].querySelector('.checkbox');
      const isChecked = checkbox.checked;
      const subtaskTitle = subtaskItems[i].querySelector('span').textContent;
      const subtask = {
        title: subtaskTitle,
        isCompleted: isChecked.toString()
      };
      subTasks.push(subtask);
    }
    editSubTasks = subTasks;
  }


/*********************************************************************/
/* Clear Formular */
/*********************************************************************/

/**
 * Clears the add task form by resetting the values of input fields and containers.
 */
function clearAddTaskFormular() {
    resetForm('title-input');
    resetForm('description-input');
    createCategoryContainerHTML()
    createContactContainerHTML()
    resetContainer('contact-icon-container');
    resetForm('due-date');
    resetPrioBtn()
    resetSubtaskInput()
    resetContainer('subtasks-container');
    resetVariables();
}


/**
 * Resets the value of an input field.
 *
 * @param {string} id - The ID of the input field.
 */
function resetForm(id) {
    document.getElementById(id).value = '';
  }


  /**
 * Resets the content of a container element.
 *
 * @param {string} id - The ID of the container element.
 */
function resetContainer(id) {
    document.getElementById(id).innerHTML = '';
  }























