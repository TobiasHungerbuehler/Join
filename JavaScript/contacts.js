
// let contacts = [
//     {
//         'name': 'Jonas Jonasson',
//         'email': 'jonas@joinmail.com',
//         'phone': '+12345678',
//         'avatarColor': 'blue'
//     },
//     {
//         'name': 'Susane Weber',
//         'email': 'susane@joinmail.com',
//         'phone': '+23456712',
//         'avatarColor': 'red'
//     },
//     {
//         'name': 'Stefan Brijs',
//         'email': 'stefan@joinmail.com',
//         'phone': '+34561234',
//         'avatarColor': 'yellow'
//     },
//     {
//         'name': 'Alex Berger',
//         'email': 'alex@joinmail.com',
//         'phone': '+789567456',
//         'avatarColor': 'gold'
//     },
//     {
//         'name': 'Martin Südberg',
//         'email': 'martin@joinmail.com',
//         'phone': '+98764567',
//         'avatarColor': 'hell-blue'
//     },
//     {
//         'name': 'Gonnsalo Martines',
//         'email': 'gonsalo@joinmail.com',
//         'phone': '+1324364758',
//         'avatarColor': 'green'
//     },
//     {
//         'name': 'Friedrich Schultz',
//         'email': 'friedrich@joinmail.com',
//         'phone': '+888666555',
//         'avatarColor': 'purple'
//     },
//     {
//         'name': 'Lynn Yo Pao',
//         'email': 'lynn@joinmail.com',
//         'phone': '+234345658',
//         'avatarColor': 'orange'
//     }
// ];

// let contacts = [];
let temporaryContacts = [];
let letters = [];

async function loadContactPage() {
    init();
    await getContacts();
    accessContacts();
    // myFunctionTwo();
}


// Function zeigt Informationen von einzelnen Contacts auf der rechte Seite

function showContact(k) {


    eraseBackground();
    document.getElementById(`contactInfoContainer`).classList.add('show-info-dialog');
    document.getElementById(`contactInfo${k}`).classList.add('contact-bg');
    document.getElementById(`contactInfoContainer`).innerHTML = showContactDetails(k);

    let showContactBtn = document.getElementById('showContactDialogBtn');
    let mobileEditBtn = document.getElementById('mobileEditBtn');

    // console.log('Function beeing triggert', showContactBtn);
    // if (window.innerWidth < 1048) {

    //     document.getElementById('mobileEditBtn').classList.remove('d-none');
    //     document.getElementById('editContactBtn').classList.add('d-none');
    //     document.getElementById('adressBook').classList.add('d-none');
    //     // document.getElementById('contactSection').style = 'display: unset;'
    //     showContactBtn.style = 'display: none';
    // } else {
    //     showContactBtn.style = 'display: unset';
    //     mobileEditBtn.style = 'display: none';
    //     document.getElementById('adressBook').classList.remove('d-none');
    //     // document.getElementById('contactSection').classList.remove('d-none');
    //     // document.getElementById('contactSection').style = 'display: none;'
    // }   

    // if (window.innerWidth > 1048) {
    //     document.getElementById('contactSection').style = 'display: unset;' 
    //     document.getElementById('mobileEditBtn').classList.add('d-none');
    //     document.getElementById('editContactBtn').classList.remove('d-none');
    //     document.getElementById('adressBook').classList.remove('d-none');
    //     showContactBtn.style = 'display: unset';
    // }

    if (window.innerWidth > 1048) {
        // document.getElementById('contactSection').style = 'display: unset;' //das ganze Section mit angezeigte Contacts wird wieder sichtbar
        document.getElementById('mobileEditBtn').classList.add('d-none');// Butttons(edit/delete), die nur bei responsive Contacts erscheint
        // showContactBtn.style = 'display: unset'; //new Contact Button, der in responsive nach oben verschoben wird, bzw. verschwunden beim Mobile
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

    // if(window.innerWidth < 500) {
    //     document.getElementById('adressBook').classList.remove('d-none');
    // }

}

// ovaj deo sam dodao

// function myFunctionTwo() {
//     let width = screen.availWidth;
//     if(width < 900){
//         myFunction();
//     }
// }

window.addEventListener('resize', myFunction);


function myFunction() {

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

//     if(innerWidth < 900){
//         document.getElementById('closeNewContactBtnRight').classList.add('d-none');
//         document.getElementById('closeNewContactBtnLeft').classList.remove('d-none');
//         document.getElementById('underlineContactDiv').classList.remove('d-none');
//         document.getElementById('kanbanText').classList.remove('d-none');
//         // document.getElementById('editContactBtn').classList.add('d-none');



//     }
//     if(innerWidth > 900){
//         document.getElementById('closeNewContactBtnRight').classList.remove('d-none');
//         document.getElementById('closeNewContactBtnLeft').classList.add('d-none');
//         document.getElementById('underlineContactDiv').classList.add('d-none');
//         document.getElementById('kanbanText').classList.add('d-none');
//         document.getElementById('contactBtnResponsiveCont').classList.add('d-none'); 
//     }


//     if (window.innerWidth < 1048) {

//         document.getElementById('adressBook').classList.add('d-none');
//         document.getElementById('showContactDialogBtn').classList.add('d-none');
//         document.getElementById('closeInfoMobile').classList.remove('d-none');
//         document.getElementById('editContactBtn').classList.add('d-none');
//         document.getElementById('mobileEditBtn').classList.remove('d-none');



//     }
//     if (window.innerWidth > 1048) {
//         document.getElementById('adressBook').classList.remove('d-none'); 
//         document.getElementById('contactSection').classList.remove('d-none');
//         document.getElementById('showContactDialogBtn').classList.remove('d-none');
//         document.getElementById('closeInfoMobile').classList.add('d-none'); 
//         document.getElementById('editContactBtn').classList.remove('d-none');
//         document.getElementById('mobileEditBtn').classList.add('d-none');

//     }

//     if(window.innerWidth < 500) {
//         document.getElementById('adressBook').classList.add('d-none');
//     }

//   }

function closeContactInfoMobile() {
    document.getElementById('contactSection').classList.add('d-none');
    document.getElementById('adressBook').classList.remove('d-none');
    document.getElementById('contactBtnResponsiveCont').classList.remove('d-none');

}
// function checkWidthSize() {


//     window.addEventListener("resize", checkWidthSize);
// }


//Background vom früherangeclikten Elementen werden gelöscht

function eraseBackground() {
    let elements = document.getElementsByClassName('contact-bg');
    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove('contact-bg');
    }

}


function showContactDetails(k) {
    return /*HTML*/ `
                <div class="contact-name-cont">
                <div class="big-initial ${contacts[k]['avatarColor']}">${checkInitial(k)}</div>
                <div class="contact-name">
                <span>${contacts[k]['name']}</span>
                <div class="link-add-task" onclick="showAddTaskForm()">+ Add Task</div></div>
                </div>
                <div style="margin-top: 24px;"><span style="font-size: 21px;">Contact Information</span>
                <span class="edit-contact-link" onclick="editContact(${k})" id="editContactBtn"><img class="pencil-logo" src="/Img/pencil_icon.svg"> Edit Contact</span></div>
            
            <div class="rest-info">
            <span><b>Email</b></span>
            <span>${contacts[k]['email']}</span>
            <span><b>Phone</b></span>
            <span>${contacts[k]['phone']}</span>
        </div>
        <div class="mobile-edit-btn d-none" id="mobileEditBtn">
            <div class="mobile-edit-btn-link trash-btn" onclick="deleteContact(${k})"><img src="/Img/icon_trash.svg"></div>
            <div class="mobile-edit-btn-link pencil-btn" onclick="editContact(${k})"><img src="/Img/icon_pencil.svg"></div></div>
        </div>
        
        
    `;
}


// Function, die füs Aufmachen des Fensters 'Add contacts Section' zuständig ist

function showContactDialog() {

    document.getElementById('dialogContainer').classList.remove('d-none');
    document.getElementById('formContainer').innerHTML = dialogTemplate();
    clearForm();

}

//Formular Add new Contacts wird angezeigt

function dialogTemplate() {
    return /*HTML*/ `
    <form onsubmit="registerContact(); return false">
        <div class="input-cont"><input required class="input-field-name" type="text" placeholder="Name" id="contactName"> <img src="/Img/icon_user.svg"></div>
        <div class="input-cont"><input requiered type="email" placeholder="Email" id="contactEmail"><img src="/Img/icon_mail.svg" alt=""></div>
        <div class="input-cont"><input required type="tel" placeholder="Phone" id="contactPhone"><img src="/Img/icon_phone.svg" alt=""></div>
        <div class="btn-container"><button class="cancel-btn" onclick="closeContactDIalog()" id="cancelBtn">Cancel<img src="/img/icon_close.svg"></button><button class="create-contact-btn" id="createContactBtn">Create Contact<img src="/img/check.svg"></button></div>
    </form>
    `;
}

function closeContactDIalog() {
    document.getElementById('dialogContainer').classList.add('d-none');
    // clearForm();
}


//fügt neueingetragene Kontakte in Contacts Array hinzu

function registerContact() {
    // letters = [];
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

    saveContactsOnServer();
    // debugger;
    console.log(contacts);
    resetFields();
    closeContactDIalog();
    adressBook.innerHTML = '';
    accessContacts();
    showSuccessBox();
}


// die Farbe wird beim Zufall ausgewählt

function pickAcolor() {
    let colors = ["blue", "red", "yellow", "green", "hell-blue", "purple", "orange", "gold", "tomato"];
    let randomElement = colors[Math.floor(Math.random() * colors.length)];
    console.log(randomElement);
    return randomElement;

}


// die Felder werden geleert

function resetFields() {
    contactName.value = '';
    contactEmail.value = '';
    contactPhone.value = '';
}



//Function, mit der wir erstens durch Array iterrieren
function accessContacts() {
    // debugger;
    if (!contacts.includes(temporaryContacts)) {

        for (let i = 0; i < contacts.length; i++) {
            checkFirstLetter(i);
        }
        renderLetters();
    }
}


//Function, die Elemente/Buchstaben aus Letter Array rendert
function renderLetters() {
    let adressBook = document.getElementById('adressBook');
    for (let j = 0; j < letters.length; j++) {
        const element = letters[j];
        // console.log(letters);
        adressBook.innerHTML += renderTemplateLetter(j);

    }

}


//Function, die erste Buchstabe aus dem Nachnemen ausschneidet, pusht in array und sorrtiert nach alfabet

function checkFirstLetter(i) {
    let letter = contacts[i]['name'];
    let firstLetter = letter.slice(0, 1);
    console.log(firstLetter);
    if (!letters.includes(firstLetter)) {
        letters.push(firstLetter);
        letters.sort();
    }
}


//Function, die nimmt Initials aus dem Namen

function checkInitial(k) {
    let initialText = "";
    let letter = contacts[k]['name'];
    let initial = letter.split(" ").map((n) => n[0]).join("");
    initialText = `${initial}`;
    return initialText;

}



// Templates für Contact-container

function renderTemplateContact(k) {

    return /*HTML*/ `
    <div class="contact-info" onclick="showContact(${k})" id="contactInfo${k}">
        <div class="initial ${contacts[k]['avatarColor']}" id="initials${k}">${checkInitial(k)}</div>
        <div class="contact-element"><span>${contacts[k]['name']}</span><span ><a class="contact-email" href ="mailto:${contacts[k]['email']}">${contacts[k]['email']}</a></span></div>             
    </div> 
            `;
}


//Templates für Buchstabe-Container

function renderTemplateLetter(j) {
    return /*HTML*/ `
    <div  id="letter${j}"><span class="letter">${letters[j]}</span><div id="contact${j}">${renderContacts(j)}</div>
    </div>
    `;
}


///Function, die nochmal durch contacts iterriert, überprüft ob der Name von Contacts mit Buchstabe übereinstimmt und gibt den Wert zurück

function renderContacts(j) {
    let someHTML = "";
    for (let k = 0; k < contacts.length; k++) {
        let contact = contacts[k]['name']; // Johan Johansson
        let firstLetter = contact.slice(0, 1); // J
        if (firstLetter == letters[j]) { //
            someHTML += renderTemplateContact(k);
        }
    }
    return someHTML;
}

//nachdem neu Kontakt erstellt, ergänzt oder gelöscht wurde, info box wird angezeigt

function showSuccessBox() {
    document.getElementById('successInfo').classList.add('show-success-info');
}

function showContactDeletedInfo() {
    document.getElementById('successInfo').innerHTML = 'Contact successfully deleted';
    document.getElementById('successInfo').classList.add('show-success-info');
}

function showContactEditedInfo() {
    document.getElementById('successInfo').innerHTML = 'Contact successfully edited';
    document.getElementById('successInfo').classList.add('show-success-info');

}


//Kontakt Dialog wird geöffnet um Kontakt zuändern

function editContact(k) {

    document.getElementById('formContainer').innerHTML = renderEditTemplate(k);
    document.getElementById('addContactHeader').innerHTML = "Edit Contact";
    document.getElementById('addContactText').innerHTML = " ";
    // document.getElementById('cancelBtn').innerHTML = "Delete";
    // document.getElementById('createContactBtn').innerHTML = "Save";
    document.getElementById('dialogContainer').classList.remove('d-none');

    document.getElementById('contactName').value = `${contacts[k]['name']}`;
    document.getElementById('contactEmail').value = `${contacts[k]['email']}`;
    document.getElementById('contactPhone').value = `${contacts[k]['phone']}`;

    //TO DO dann werden die entweder gespeichert oder gelöscht
    // clearForm(); nachdem die Function ausgeführt wurde

}

function saveChangedContact(k) { //hier werden wir noch eine Variable brauchen damit wir leichter mit Werte manipulieren können
    contacts[k]['name'] = document.getElementById('contactName').value;
    contacts[k]['email'] = document.getElementById('contactEmail').value;
    contacts[k]['phone'] = document.getElementById('contactPhone').value;
    saveContactsOnServer();
    closeContactDIalog();
    adressBook.innerHTML = '';
    accessContacts();
    showContact(k);
    showContactEditedInfo();
    console.log(contacts);
    document.getElementById('formContainer').innerhtml = dialogTemplate();
}

function deleteContact(k) {
    contacts.splice(k, 1);
    saveContactsOnServer();
    closeContactDIalog();
    adressBook.innerHTML = '';
    accessContacts();
    console.log(contacts);
    document.getElementById(`contactInfoContainer`).classList.remove('show-info-dialog');
    document.getElementById('formContainer').innerhtml = dialogTemplate();
    showContactDeletedInfo();
}

//reseting the Dialog Box, bzw, umschalten von Edit auf AddContact

function clearForm() {

    document.getElementById('addContactHeader').innerHTML = "Add Contact";
    document.getElementById('addContactText').innerHTML = "Tasks are better with a team! ";

    document.getElementById('contactName').value = "";
    document.getElementById('contactEmail').value = "";
    document.getElementById('contactPhone').value = "";
}

//Formular Edit Contact wird angezeigt

function renderEditTemplate(k) {
    return /*HTML*/ `
    <div class="form-container">
        <div class="input-cont"><input required class="input-field-name" type="text" placeholder="Name" id="contactName"> <img src="/Img/icon_user.svg"></div>
        <div class="input-cont"><input requiered type="email" placeholder="Email" id="contactEmail"><img src="/Img/icon_mail.svg" alt=""></div>
        <div class="input-cont"><input required type="tel" placeholder="Phone" id="contactPhone"><img src="/Img/icon_phone.svg" alt=""></div>
        <div class="btn-container"><button class="cancel-btn" onclick="deleteContact(${k})" id="cancelBtn">Delete<img src="/img/icon_close.svg"></button><button class="create-contact-btn" id="createContactBtn" onclick="saveChangedContact(${k})">Save<img src="/img/check.svg"></button></div>
    </div>`;
}

// checkWidthSize();