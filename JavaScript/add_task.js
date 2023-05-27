let selectedCategory;
let newCategory;
let newCategoryColor;
let newTaskPrio;
let subTasks = [];
let addedContacts = [];
let tasks = [];

// Task Array for Category Selection on Form
let taskCategories = [
    // { category: 'Sales', color: '#29ABE2' },
    // { category: 'Backoffice', color: '#e27329' },
    // { category: 'Marketing', color: '#e22970' }
  ];
  
  // Hier werden alle emails aus den Contacts und dem "invite Category Form Input" zwischengespeichert
  let allEmails = [];
  


/*********************************************************************/
/* Main Functions */
/*********************************************************************/

// Lade alle Tasks vom Server und speichere in Array "tasks",
async function initAddTask() {
    init() //Load Html Template
    await getTasks(); // Lade die tasks vom server
    getCategoryArray() // erstelle Array "taskCategories" aus array "tasks"
    await getContacts() // Lade die User Kontake vom Server
    getEmailsFromContacts() // speicher alle Emails mit Color in "allEmails"
}

//liest alle emails aus "contacst" und erstell array "taskEmails"
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

// Create task from Form 
function addTask(){
   const title = document.getElementById('title-input').value;
   const description = document.getElementById('description-input').value;
   const taskCategory = setCategoryToAddTask()
   const taskEmails =  addedContacts;
   const dueDate = getDateFromInput();
   const taskPrio = getNewTaskPrio();
   const taskSubTasks = subTasks;
   const status = 'toDo';
   createNewTaskJson(title,description, taskCategory, taskEmails, dueDate, taskPrio, taskSubTasks, status);
   clearAddTaskFormular();
   window.location.href = 'board.html';
}

// wenn im Formular keine
function getNewTaskPrio() {
    if(newTaskPrio == ''){
        newTaskPrio = 'low';
    }
    return newTaskPrio
}

//Datum Input auslesen und in Datenformat speichern
function getDateFromInput() {
    const dateInput = document.getElementById('due-date').value;
    const dateObject = new Date(dateInput);
    isoDate = dateObject.toISOString().split('T')[0]; // Extrahieren Sie das Datumsteil "yyyy-MM-dd"
    return isoDate;
  }



// Create json and add to tasks 
function createNewTaskJson(title,description, taskCategory, taskEmails, dueDate, taskPrio, taskSubTasks, status){
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


   //console.log('new task json=', newTask)
   saveTasksOnServer(); // on --> storage.js
} 

// Save Tasks on Server
async function saveTasksOnServer() {
    let key = "userTasks";
    let value = tasks;
    setItem(key, value);
}




function close(id) {
    document.getElementById(id).innerHTML = '';
}


// Fügt die angeklickte option dem obenliegenden Input hinzu
function selectionToInput(category, id) {
    document.getElementById(id).value = category;
}


// ändert oncklick funktionen
function changeOnClick(id, funct) {
    let contactsInput = document.getElementById(id);
    contactsInput.onclick = funct;
  }


  // Fügt die ausgewählte Kategorie und Farbe add Task hizu
function setCategoryToAddTask() {
    let userValue = document.getElementById('category-input').value;
    let userSelectedCategory = taskCategories.find(category => category.category === userValue);
    return userSelectedCategory
  }


// resetet zwischengespeicherte Variablen // bei Clear Formular, nach addTask
function resetVariables() {
    selectedCategory = '';
    newTaskPrio = '';
    subTasks = [];
    addedContacts = [];
}


/*********************************************************************/
/* Category */
/*********************************************************************/

// öffnet die Category Options
function showCategoryOptions() { 
    //getCategoryArray() // testweise zum initaddTask verschoben
    shwoNewCategoryItem();
    renderCategories();
    changeOnClick('category-input', createCategoryContainerHTML)
}


// Liest die Kategorien inkl. Color aus "tasks", speichert in taskCategories
function getCategoryArray() {  
    for (let i = 0; i < testTasks.length; i++) {
      const category = testTasks[i]['category'];
      const categoryName = category['category'];
      let categoryExists = false;
      for (let j = 0; j < taskCategories.length; j++) {
        if (taskCategories[j]['category'] === categoryName) {
          categoryExists = true;
          break;
        }
      }
      if (!categoryExists) {
        taskCategories.push(category);
      }
    }
  }

/*
function getCategoryArray() {
    for (let i = 0; i < tasks.length; i++) {
      const category = tasks[i]['category'];
      const categoryName = category['category'];
      console.log(categoryName)
      if (!taskCategories.includes(categoryName)) {
        //console.log('set to category=',categoryName)
        taskCategories.push(category);
      }
    }
    console.log('kategorien==', taskCategories)
  }

/*

/*
function getCategoryArray() {  
    for (let i = 0; i < tasks.length; i++) {
      const category = tasks[i].category;
      if (!taskCategories.some((cat) => cat.category === category.category)) {
        taskCategories.push(category);
      }
    }
  }

*/


function shwoNewCategoryItem() {
    document.getElementById('new-category-item'). innerHTML = /*html*/  `
        <p onclick="showNewCategoryInput()">New Category</p>
        <img src="./Img/icon_plus_edge.svg" alt="" onclick="showNewCategoryInput()">
        `;
}


// rendert die Kategorien aus dem Array
function renderCategories() {
    document.getElementById('categories-container'). innerHTML = ''; 
    for (let i = 0; i < taskCategories.length; i++) {
        const taskCategory = taskCategories[i]['category'];
        const taskColor = taskCategories[i]['color'];
        createCategoryElementHtml(taskCategory, taskColor); 
    }
}


// Erstellt Kategorie HTML Element
function createCategoryElementHtml(taskCategory, taskColor) {
    document.getElementById('categories-container'). innerHTML += /* html */ `
        <div class="selection-item" onclick="selectCategory('${taskCategory}', 'category-input', '${taskColor}')">
            <p>${taskCategory}</p>
            <div class="color-point" style="background-color: ${taskColor};"></div>
        </div>
        `;
}


// rendert das New Category Fenster für die Usereingabe nach klick auf New Category
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


// Erstellt wieder die Category Option Ansicht nach erstellen neuer Kategorie
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


// Speichert die neue Kategorie und stell Category Option Ansicht wieder her
function saveNewCategory() {
    selectedCategory = document.getElementById('category-input').value;
    selectedColor = String(document.getElementById('colorpicker').value);
    let taskCategory = {'category' : selectedCategory, 'color' : selectedColor};
    taskCategories.push(taskCategory);
    createCategoryContainerHTML();
    newCategorytoInput(selectedCategory, selectedColor) 

}


//  Fügt die neu erstellte Kategorie und Farbe dem Category Input ein
function newCategorytoInput(newCategory, newCategoryColor)  {
    document.getElementById('category-input').value =  newCategory;
    document.getElementById('selected-color-point').style.backgroundColor =  newCategoryColor;
}


// Fügt die angeklickte Kategorie und Farbe dem Input hinzu
function selectCategory(category, id, color) {
    selectionToInput(category, id);
    document.getElementById('selected-color-point').style.backgroundColor = color;
    close('new-category-item');
    close('categories-container');
}

/*********************************************************************/
/* Assign Contact to Task */
/*********************************************************************/

// öffnet die Contact Options
function showContactOptions() { 
    shwoNewContactItem();
    renderAllEmails();
    activateAddedContacts()
    changeOnClick('contacts-input', createContactContainerHTML)
}


function renderAllEmails() {
    document.getElementById('contacts-container'). innerHTML = ''; 
    for (let i = 0; i < allEmails.length; i++) {
        const email = allEmails[i]['email'];
        const color = allEmails[i]['color'];
        createContactElementHtml(email, color); 
    }
}


// Erstellt Contact HTML Element
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

// Fügt ausgewählte Emails zu Added Contacts hinzu
function toAddedContacts() {
    document.getElementById('contact-icon-container').innerHTML = '';
    addedContacts = [];
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    checkboxes.forEach((checkbox) => {
        const email = checkbox.getAttribute('data-email');
        if (email !== null) {
            addedContacts.push(email);
            console.log('add=', email);
        }
    });
    renderContactIcons();
}

//aktiviert die checkboxen der bereits hizugefügten Task Contacts
function activateAddedContacts() {
    for (let i = 0; i < addedContacts.length; i++) {
      const email = addedContacts[i]; // Extrahiere die E-Mail-Adresse aus dem Objekt
      activateCheckboxByEmail(email);
    }
  }

function activateCheckboxByEmail(email) {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      const checkboxEmail = checkbox.getAttribute('data-email');
      if (checkboxEmail === email) {
        checkbox.checked = true;
      }
    });
  }


// Render the added Contacts in Icon 
function renderContactIcons() {
    for (let i = 0; i < addedContacts.length; i++) {
        const email = addedContacts[i];
        const initials = getInitials(email) // --> board.js
        const color = getColorClass(email) // --> board.js
        createContactIconHtml(initials, color);
    }
}

function createContactIconHtml(letters, color){
    document.getElementById('contact-icon-container').innerHTML += /*html*/  `
        <div class="contac-icon ${color}">${letters}</div>
    `;
}
 

// erstelle den new Contact Input
function shwoNewContactItem() {
    document.getElementById('new-contact-item'). innerHTML = /*html*/ `
        <p onclick="showNewContactInput()">Invite new contact</p>
        <img src="./Img/new_contact.png" alt="" onclick="showNewContactInput()">
        `;
}


// rendert das New Contact Fenster für die Usereingabe nach klick auf Invite new contact
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


// Erstellt wieder die Contact Option Ansicht nach erstellen neuer Kategorie
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

// Speichere neuen Kontakt
function saveNewContact() {
    let email = document.getElementById('contact-input').value;
    let name = document.getElementById('contact-name-input').value;
    let phone = document.getElementById('contact-phone-input').value;
    let color = randomColor();
    checkNewContact(email, name, phone); // Input validation
    pushNewContact(email, name, phone, color); // Save new Contact on server
    updateContactsInput()
    // Kontakt wurde erstellt
}

//stellt Contact Options wieder her
async function updateContactsInput(){
    createContactContainerHTML() // Erstellt wieder das ausgangs html von "Assign to"
    showContactOptions()
}

// new Contact Input Validatione
function checkNewContact(email, name, phone){
    if (email.trim() === '' || name.trim() === '' || phone.trim() === '') {
        window.alert('Bitte füllen Sie alle Felder aus.');
    }
}

// fügt neuen Kontakt zu "contacts",  updatet server, erstellt "allEmails" Array 
function pushNewContact(email, name, phone, color) {
    let newContact = {
        "name": name,
        "email": email,
        "phone": phone,
        "avatarColor": color
    }
    contacts.push(newContact);
    saveContactsOnServer()// Upload Contacts
    getContacts() //download Contacts
    getEmailsFromContacts() // speicher alle Emails mit Color in "allEmails"// 
    showSuccessInfo()
}

function randomColor() {
    let colors = ["blue", "red", "yellow", "green", "hell-blue", "purple", "orange", "gold", "tomato"];
    let randomElement = colors[Math.floor(Math.random() * colors.length)];
    console.log(randomElement);
    return randomElement;

}

// zeige Success Meldung nach erfolgreichem speicehrn des neuen Kontaktes
function showSuccessInfo() {
    document.getElementById('form').innerHTML = /*html*/ `
        <div class="success-info" id="successInfo">Contact successfully created</div>
    `;
    setTimeout(function() {
        removeSuccessInfo();
    }, 2000);
}

// Remove Success Info 
function removeSuccessInfo() {
    const successInfo = document.getElementById('successInfo');
    if (successInfo) {
      successInfo.remove();
    }
  }

/*********************************************************************/
/* Prio */
/*********************************************************************/

// Setze die newTaskPrio variable auf button wert, ändere button design 
function setPrio(prio, id) {
    newTaskPrio = prio;
    changePrioBtnDesign(prio, id)
}


// ändert die Eigenschten der Prio Buttons
function changePrioBtnDesign(prio, id){
    resetPrioBtn();
    resetPrioIcon();
    setPrioBtnColor(prio, id);
    changeBtnIcon(prio);
}


// setzt die Prio Button Color
function setPrioBtnColor(prio, id){
    document.getElementById(id).classList.add('btn-'+prio);
}


// Entfern alle Farb Klassen der Prio buttons
function resetPrioBtn(){
    document.getElementById('prio-urgent').classList.remove('btn-urgent');
    document.getElementById('prio-medium').classList.remove('btn-medium');
    document.getElementById('prio-low').classList.remove('btn-low');
}


// Remove Cover Image
function changeBtnIcon(prio) {
    document.getElementById('icon-'+prio).classList.add('d-none');
}


// Reset Prio Butons icons
function resetPrioIcon() {
    document.getElementById('icon-urgent').classList.remove('d-none');
    document.getElementById('icon-medium').classList.remove('d-none');
    document.getElementById('icon-low').classList.remove('d-none');
}


/*********************************************************************/
/* Subtasks */
/*********************************************************************/

// create subtask input html
function showSubtaskInput() {
    document.getElementById('sub-task').innerHTML = /*html*/ `
        <div class="new-category-wrapper">
            <input class="category-input" id="subtask-input" type="text" placeholder="Add new subtask" autofocus>
            <img class="new-category-close-img" src="./Img/icon_close.svg" alt="" onclick="closeSubtaskInput()">
            <img class="new-category-check-img" src="./Img/check.svg" alt="" onclick="addSubtask()">
        </div>
    `;
}


// Liest usereingabe Subtask aus und speichert in Array subTasks
function addSubtask() {
    let newSubtaskTitle = document.getElementById('subtask-input').value;
    let newSubtask = {"title": newSubtaskTitle, "isCompleted": "false"}
    subTasks.push(newSubtask);
    document.getElementById('subtask-input').value = '';
    renderSubtasks();
}


// Reset Subtask Input
function closeSubtaskInput() {
    document.getElementById('subtask-input').value = '';
    resetSubtaskInput();
}


// Rendert SubtaskInput neu
function resetSubtaskInput() {
    document.getElementById('sub-task').innerHTML = `
        <div class="category-input-wrapper">
            <input class="category-input" id="subtask-input" type="text" placeholder="Add new subtask" onclick="showSubtaskInput()">
            <img src="./Img/triangle.png" alt="" onclick="showSubtaskInput()">
        </div>
    `;
}


// Subtasks anzeigen
function renderSubtasks() {
    let subtasksContainer = document.getElementById('subtasks-container');
    subtasksContainer.innerHTML = '';
    for (let i = 0; i < subTasks.length; i++) {
        let subtask = subTasks[i];
        let isCompleted = subtaskStatus(subtask);
        createSubtask(subtask, isCompleted);
    }
}

// liest den isComplete wert aus
function subtaskStatus(subtask) {
    let status = subtask['isCompleted'];
    if(status == 'true'){
        return 'checked';
    } else {
        return '';
    }
}


// Erzeugt das HTML für einen Subtask
function createSubtask(subtask, isCompleted) {
    document.getElementById('subtasks-container').innerHTML +=  /*html*/ `
        <div class="subtask-item">
            <input type="checkbox" class="checkbox" onclick="checkSubtaskStates()" ${isCompleted}>
            <span>${subtask['title']}</span>
        </div>
    `;
}

let editSubTasks = [];
// Prüft die checkboxen der Subtasks und speichert in "subTasks"
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
    //console.log(subTasks)
    editSubTasks = subTasks;
    //console.log('2==',subTasks2)
  }


/*********************************************************************/
/* Clear Formular */
/*********************************************************************/

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


function resetForm(id) {
    document.getElementById(id).value = '';
  }

function resetContainer(id) {
    document.getElementById(id).innerHTML = '';
  }























