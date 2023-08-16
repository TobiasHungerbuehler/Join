let temporaryContacts = [];
let letters = [];

/**
 * loading all data from server, including contacts, tasks,
 * initializes all neccesery functions in order for page to work 
 * 
 */


async function loadContactPage() {
    init();
    await getAllAppData()// load appData from Server
    await getContacts();
    await getTasks(); // from board
    accessContacts();
    getCategoryArray(); // -> addTask.html  // from board
    getEmailsFromContacts(); // from board
    adjustElements();
}

/**
 * acceses the array named contacts, initializing 
 */


function accessContacts() {
    if (!contacts.includes(temporaryContacts)) {
        for (let i = 0; i < contacts.length; i++) {
            checkFirstLetter(i);
        }
        renderLetters();
    }
}



/**
 * rendering the starting letters from the array named letters 
 */


function renderLetters() {
    let adressBook = document.getElementById('adressBook');
    for (let j = 0; j < letters.length; j++) {
        const element = letters[j];
        adressBook.innerHTML += renderTemplateLetter(j);
    }
}



/**
 * first letter from the lastname of a user out of the array named contacts will be taken, 
 * checkt if the array named letters already contains it, if not, it will be stored int array named letters 
 * and sorted in alphabetical order
 * @param {string} i - stands for the every single object of an array named letters
 */

function checkFirstLetter(i) {
    let letter = contacts[i]['name'];
    let firstLetter = letter.slice(0, 1).toUpperCase();
    if (!letters.includes(firstLetter)) {
        letters.push(firstLetter);
        letters.sort();
    }
}


/**
 * the initials of the user will be created
 * @param {object} k - stands for every single object from an array called contacts
 * @returns - value of initials of the users name
 */

function checkInitial(k) {
    let initialText = "";
    let letter = contacts[k]['name'];
    let initial = letter.split(" ").map((n) => n[0]).join("");
    initialText = `${initial}`;
    return initialText;

}



/**
 * the container of a contact with basic information will be created, by comparing first letter of a name with the elements from array called letters
 * @param {object} j - stands for every single object from array named contacts
 * @returns html element containing basic information of the contact
 */
function renderContacts(j) {
    let someHTML = "";
    for (let k = 0; k < contacts.length; k++) {
        let contact = contacts[k]['name']; // Johan Johansson
        let firstLetter = contact.slice(0, 1); // J
        if (firstLetter.toUpperCase() == letters[j]) { //
            someHTML += renderTemplateContact(k);
        }
    }
    return someHTML;
}



/**
 * more Information about Contact will be shown in a sliding window on the right side
 * @param {object} k - stands for every single object in array called contacts
 */


function showContact(k) {
    eraseBackground();
    document.getElementById(`contactInfoContainer`).classList.add('show-info-dialog');
    document.getElementById(`contactInfo${k}`).classList.add('contact-bg');
    document.getElementById(`contactInfoContainer`).innerHTML = showContactDetails(k);
    setTheRightScreen();
}


/**
 * adjusting the content depending on the width of the screen
 */


function setTheRightScreen(){
if (window.innerWidth > 1048) {
    document.getElementById('mobileEditBtn').classList.add('d-none');// Butttons(edit/delete), die nur bei responsive Contacts erscheint
    document.getElementById('adressBook').classList.remove('d-none'); // das Section mit Namen und Initialen wird wieder voll angezeigt
    document.getElementById('mobileEditBtn').classList.add('d-none');
    document.getElementById('contactSection').style = "display: inline";
}
if (window.innerWidth < 1048) {
    document.getElementById('adressBook').classList.add('d-none');
    document.getElementById('contactSection').style = "display: block";
    document.getElementById('contactSection').classList.remove('d-none');
    document.getElementById('contactBtnResponsiveCont').classList.add('d-none');
    document.getElementById('mobileEditBtn').classList.remove('d-none');
}

if (window.innerWidth < 900) {
    document.getElementById('editContactBtn').classList.add('d-none');
    document.getElementById('adressBook').classList.add('d-none');
}

}


/**
 * depending on a width of a screen, sertain html elements will be shown or hidden 
 */

window.addEventListener('resize', adjustElements);


function adjustElements() {
    if (innerWidth < 600) {
        document.getElementById('newContactResponsiveBtn').innerHTML = "";
    }
    if (innerWidth > 600) {
        document.getElementById('newContactResponsiveBtn').innerHTML = "New Contact";
    }
    if (innerWidth > 900) {
        document.getElementById('contactSection').style = "display: inline";
        document.getElementById('contactSection').classList.remove('d-none');
        document.getElementById('adressBook').classList.remove('d-none');
    }
    if (innerWidth < 900) {
        document.getElementById('contactSection').style = "display: none";
    }
    if (window.innerWidth < 1048) {
        document.getElementById('contactSection').style = "display: none";
    }
}



/**
 * closes the window AdressBook when in mobile version
 */

function closeContactInfoMobile() {
    document.getElementById('contactSection').classList.add('d-none');
    document.getElementById('adressBook').classList.remove('d-none');
    document.getElementById('contactBtnResponsiveCont').classList.remove('d-none');

}



/**
 * background of non selected contact Button will be erased
 */


function eraseBackground() {
    let elements = document.getElementsByClassName('contact-bg');
    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove('contact-bg');
    }

}



/**
 * opens the dialog Add new Contact
 */


function showContactDialog() {
    document.getElementById('dialogContainer').classList.remove('d-none');
    document.getElementById('formContainer').innerHTML = dialogTemplate();
    clearForm();
}



/**
 * closes the dialog Add new Contact
 */

function closeContactDIalog() {
    document.getElementById('dialogContainer').classList.add('d-none');
    // clearForm();
}



/**
 * new contact will be created
 */


function registerContact() {
    registerContactCheck();
    saveContactsOnServer();
    resetFields();
    closeContactDIalog();
    adressBook.innerHTML = '';
    accessContacts();
    showSuccessBox();
}


/**
 * saves the contact under the condition that it doesent already exists
 */

function registerContactCheck() {
    let contactName = document.getElementById('contactName');
    let contactEmail = document.getElementById('contactEmail');
    let contactPhone = document.getElementById('contactPhone');
    let color = pickAcolor();
    
    if (!contacts.includes(contactName && contactEmail && contactPhone)) {
        contacts.push({
            name: contactName.value,
            email: contactEmail.value,
            phone: contactPhone.value,
            avatarColor: color
        });
    }
}


/**
 * the color of avatar will be chosen by random choice
 * @returns - variable which has a value of a string that has the same name as defined css class 
 */

function pickAcolor() {
    let colors = ["blue", "red", "yellow", "green", "hell-blue", "purple", "orange", "gold", "tomato"];
    let randomElement = colors[Math.floor(Math.random() * colors.length)];
    return randomElement;

}



/**
 * the fields will be cleared
 */

function resetFields() {
    contactName.value = '';
    contactEmail.value = '';
    contactPhone.value = '';
}


/**
 * after the contact has been created, info box will be shown
 */

function showSuccessBox() {
    document.getElementById('successInfo').classList.add('show-success-info');
}



/**
 * after the contact has been deleted, info box will be shown
 */

function showContactDeletedInfo() {
    document.getElementById('successInfo').innerHTML = 'Contact successfully deleted';
    document.getElementById('successInfo').classList.add('show-success-info');
}



/**
 * after the contact has been edited, info box will be shown
 */

function showContactEditedInfo() {
    document.getElementById('successInfo').innerHTML = 'Contact successfully edited';
    document.getElementById('successInfo').classList.add('show-success-info');

}



/**
 * opens the dialog in order to edit the contact
 * @param {object} k - stands for every single object in array called contacts
 */

function editContact(k) {
    document.getElementById('formContainer').innerHTML = renderEditTemplate(k);
    document.getElementById('addContactHeader').innerHTML = "Edit Contact";

    document.getElementById('addContactText').innerHTML = " ";
    document.getElementById('dialogContainer').classList.remove('d-none');

    document.getElementById('contactName').value = `${contacts[k]['name']}`;
    document.getElementById('contactEmail').value = `${contacts[k]['email']}`;
    document.getElementById('contactPhone').value = `${contacts[k]['phone']}`;
}


/**
 * edited changes on contact will be saved on the server
 * @param {object} k - stands for every single object in array called contacts
 */

function saveChangedContact(k) { 
    contacts[k]['name'] = document.getElementById('contactName').value;
    contacts[k]['email'] = document.getElementById('contactEmail').value;
    contacts[k]['phone'] = document.getElementById('contactPhone').value;
    saveContactsOnServer();
    closeContactDIalog();
    adressBook.innerHTML = '';
    accessContacts();
    showContact(k);
    showContactEditedInfo();
    document.getElementById('formContainer').innerhtml = dialogTemplate();
}


/**
 * change of deleting the contact will be saved on the server
 * @param {object} k - stands for every single object in array called contacts
 */


function deleteContact(k) {
    contacts.splice(k, 1);
    saveContactsOnServer();
    closeContactDIalog();
    adressBook.innerHTML = '';
    accessContacts();
    document.getElementById(`contactInfoContainer`).classList.remove('show-info-dialog');
    document.getElementById('formContainer').innerhtml = dialogTemplate();
    showContactDeletedInfo();
}



/**
 * switching between the Add Contact and Edit Contact dialog 
 */

function clearForm() {
    document.getElementById('addContactHeader').innerHTML = "Add Contact";
    document.getElementById('addContactText').innerHTML = "Tasks are better with a team! ";
    document.getElementById('contactName').value = "";
    document.getElementById('contactEmail').value = "";
    document.getElementById('contactPhone').value = "";
}


//////////////////////// Templates ////////////////////////////




/**
 * container that represents initial of the adress book will be shown
 * @param {object} j - represents the object in array called letters
 * @returns html element
 */

function renderTemplateLetter(j) {
    return /*HTML*/ `
    <div  id="letter${j}"><span class="letter">${letters[j]}</span><div id="contact${j}">${renderContacts(j)}</div>
    </div>
    `;
}


/**
 * every information of an contact will be shown in sliding window on the right side (web), as a separate window (mobile)
 * @param {object} k -represents the object in array called contacts
 * @returns html element
 */

function showContactDetails(k) {
    return /*HTML*/ `
                <div class="contact-name-cont">
                <div class="big-initial ${contacts[k]['avatarColor']}">${checkInitial(k)}</div>
                <div class="contact-name">
                <span>${contacts[k]['name']}</span>
                <div class="link-add-task" onclick="showAddTaskForm()">+ Add Task</div></div>
                </div>
                <div style="margin-top: 24px;"><span style="font-size: 21px;">Contact Information</span>
                <span class="edit-contact-link" onclick="editContact(${k})" id="editContactBtn"><img class="pencil-logo" src="./Img/pencil_icon.svg"> Edit Contact</span></div>
            
            <div class="rest-info">
            <span><b>Email</b></span>
            <span>${contacts[k]['email']}</span>
            <span><b>Phone</b></span>
            <span>${contacts[k]['phone']}</span>
        </div>
        <div class="mobile-edit-btn d-none" id="mobileEditBtn">
            <div class="mobile-edit-btn-link trash-btn" onclick="deleteContact(${k})"><img src="./Img/icon_trash.svg"></div>
            <div class="mobile-edit-btn-link pencil-btn" onclick="editContact(${k})"><img src="./Img/icon_pencil.svg"></div></div>
        </div>
        
        
    `;
}


/**
 * the form add new contact will be shown
 * @returns html element
 */

function dialogTemplate() {
    return /*HTML*/ `
    <form onsubmit="registerContact(); return false">
        <div class="input-cont"><input required class="input-field-name" type="text" placeholder="Name" id="contactName"> <img src="./Img/icon_user.svg"></div>
        <div class="input-cont"><input requiered type="email" placeholder="Email" id="contactEmail"><img src="./Img/icon_mail.svg" alt=""></div>
        <div class="input-cont"><input required type="tel" placeholder="Phone" id="contactPhone"><img src="./Img/icon_phone.svg" alt=""></div>
        <div class="btn-container"><button class="cancel-btn" onclick="closeContactDIalog()" id="cancelBtn">Cancel<img src="./Img/icon_close.svg"></button><button class="create-contact-btn" id="createContactBtn">Create Contact<img src="./Img/check.svg"></button></div>
    </form>
    `;
}


/**
 * digested information about contact will be shown as a part of adressbook
 * @param {object} k -represents the object in array called contacts
 * @returns html element
 */


function renderTemplateContact(k) {

    return /*HTML*/ `
    <div class="contact-info" onclick="showContact(${k})" id="contactInfo${k}">
        <div class="initial ${contacts[k]['avatarColor']}" id="initials${k}">${checkInitial(k)}</div>
        <div class="contact-element"><span>${contacts[k]['name']}</span><span ><a class="contact-email" href ="mailto:${contacts[k]['email']}">${contacts[k]['email']}</a></span></div>             
    </div> 
            `;
}


/**
 * form edit contact will be shown
 * @param {object} k - represents the object in array called contacts
 * @returns html element
 */

function renderEditTemplate(k) {
    return /*HTML*/ `
    <div class="form-container">
        <div class="input-cont"><input required class="input-field-name" type="text" placeholder="Name" id="contactName"> <img src="./Img/icon_user.svg"></div>
        <div class="input-cont"><input requiered type="email" placeholder="Email" id="contactEmail"><img src="./Img/icon_mail.svg" alt=""></div>
        <div class="input-cont"><input required type="tel" placeholder="Phone" id="contactPhone"><img src="./Img/icon_phone.svg" alt=""></div>
        <div class="btn-container"><button class="cancel-btn" onclick="deleteContact(${k})" id="cancelBtn">Delete<img src="./Img/icon_close.svg"></button><button class="create-contact-btn" id="createContactBtn" onclick="saveChangedContact(${k})">Save<img src="./Img/check.svg"></button></div>
    </div>`;
}
