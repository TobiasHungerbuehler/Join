
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
    await getContacts();
    init(); 
    accessContacts();
}

// async function saveContactsOnServer() {
//     let key = "savedContacts";
//     let value = contacts;
//     await setItem('savedContacts', contacts);
// }
// Function zeigt Informationen von einzelnen Contacts auf der rechte Seite

function showContact(k) {
    eraseBackground();
    document.getElementById(`contactInfoContainer`).classList.add('show-info-dialog');
    document.getElementById(`contactInfo${k}`).classList.add('contact-bg');
    document.getElementById(`contactInfoContainer`).innerHTML = showContactDetails(k);
}

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
                <span style="font-size: 47px;">${contacts[k]['name']}</span>
                <span class="link-add-task">+ Add Task</span></div>
                </div>
                <div style="margin-top: 24px;"><span style="font-size: 21px;">Contact Information</span>
                <span class="edit-contact-link" onclick="editContact(${k})"><img class="pencil-logo" src="/Img/pencil_icon.svg"> Edit Contact</span></div>
            
            <div class="rest-info">
            <span><b>Email</b></span>
            <span>${contacts[k]['email']}</span>
            <span><b>Phone</b></span>
            <span>${contacts[k]['phone']}</span>
        </div>
        
    `;
}


// Function, die füs Aufmachen des Fensters 'Add contacts Section' zuständig ist

function showContactDialog() {
    clearForm();
    document.getElementById('dialogContainer').classList.remove('d-none');
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

//nachdem neu Kontakt erstellt wurde, info box wird angezeigt
function showSuccessBox() {
    document.getElementById('successInfo').classList.add('show-success-info');
}


//Kontakt Dialog wird geöffnet um Kontakt zuändern

function editContact(k) {

    document.getElementById('addContactHeader').innerHTML = "Edit Contact";
    document.getElementById('addContactText').innerHTML = " ";
    document.getElementById('cancelBtn').innerHTML = "Delete";
    document.getElementById('createContactBtn').innerHTML = "Save";
    document.getElementById('dialogContainer').classList.remove('d-none');

    document.getElementById('contactName').value = `${contacts[k]['name']}`;
    document.getElementById('contactEmail').value = `${contacts[k]['email']}`;
    document.getElementById('contactPhone').value = `${contacts[k]['phone']}`;

    // To Do die Kontakte werden aus dem Array abgerufen um geändert zu werden
    //TO DO dann werden die entweder gespeichert oder gelöscht
    // clearForm(); nachdem die Function ausgeführt wurde

}

function SaveChangedContact(k) { //hier werden wir noch eine Variable brauchen damit wir leichter mit Werte manipulieren können
    contacts[k]['name'] = document.getElementById('contactName').value;
    contacts[k]['email'] = document.getElementById('contactEmail').value;
    contacts[k]['phone'] = document.getElementById('contactPhone').value;

}

function deleteContact(k) {
    let contactName = document.getElementById('contactName').value;
    let contactEmail = document.getElementById('contactEmail').value;
    let contactPhone = document.getElementById('contactPhone').value;

    contacts.splice(k, 1);
}
//reseting the Dialog Box, bzw, umschalten von Edit auf AddContact
function clearForm() {

    document.getElementById('addContactHeader').innerHTML = "Add Contact";
    document.getElementById('addContactText').innerHTML = "Tasks are better with a team! ";
    document.getElementById('cancelBtn').innerHTML = `Cancel <img src="/img/icon_close.svg">`;
    document.getElementById('createContactBtn').innerHTML = `Create Contact <img src="/img/check.svg">`;

    document.getElementById('contactName').value = "";
    document.getElementById('contactEmail').value = "";
    document.getElementById('contactPhone').value = "";
}