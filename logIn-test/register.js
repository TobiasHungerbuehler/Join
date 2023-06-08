let users = [];
let firstCheck;
let result; //forübergehend um assigned Id herauszufinden


async function init() {
    // debugger;
    // await testUsersToServer();
    await getUsers();
    showLoginDialog();
    // showUsers();
    loadFromLocalStorage();

}


//der neue User wird erstellt 

async function register() {
    document.getElementById('registerBtn').disabled = true;
    let name = document.getElementById('userName').value;
    let email = document.getElementById('userEmail').value;
    let passwort = document.getElementById('userPasswort').value;


    //To Do hier fehlt Bedingung, falls der User schon existiert!!

    let findName = users.filter(u => u['name'] == name);
    let findEmail = users.filter(u => u['email'] == email);

    if (findName.length > 0) {
        alert(`It seems that the User with the Name ${name} allready exists, please check your spelling and try again`);
    } else if (findEmail.length > 0) {
        alert(`It seems that the User with the following email ${email} allready exists, please try again or if you are allready a User reset your password`);
    } else {

        users.push({
            "userId": assignId(),
            "name": name,
            "email": email,
            "passwort": passwort
        });
        // userId = result;//forübergehend um assigned Id herauszufinden
        saveUsersOnServer();
        // await setItem('usersData', JSON.stringify(users));
        // newUserIdtoAppData(userId);// neuer User wird in appData gespeichert
        resetFields();
        showLoginDialog();

    }

    resetFields();
    findName = [];
    findEmail = [];

}


function checkUser(name, email) {
    debugger;
    for (let j = 0; j < users.length; j++) {
        let element = users[j];
        returnCheckedUser(element, name, email);


    }
}


function returnCheckedUser(element, name, email) {
    if (element['name'] == name || element['email'] == email) {
        console.log('Match found');
        return firstCheck === true;
    }
    else {
        return false;
    }
}
//////* eine 5-stellige Nummer wird zurückgegeben

function assignId() {
    let number = users.length + 1;
    result = number.toString().padStart(5, '0');
    return result;
}



// die Felderivalues werden gelöscht

function resetFields() {
    document.getElementById('registerBtn').disabled = false;
    document.getElementById('userName').value = '';
    document.getElementById('userEmail').value = '';
    document.getElementById('userPasswort').value = '';
}

// Sign up formular wird angezeigt

function showSignUpDialog() {
    document.getElementById('header').innerHTML = 'Sign up';
    document.getElementById('arrowImg').classList.remove('d-none');
    document.getElementById('infoBoxRight').classList.add('d-none');
    signUpTemplate();


}

// Log in Dialog wird wieder gezeigt

function showLoginDialog() {
    document.getElementById('header').innerHTML = 'Log in';
    document.getElementById('arrowImg').classList.add('d-none');
    document.getElementById('infoBoxRight').classList.remove('d-none');
    logInTemplate();
}

// Dialog Forgot my Passwort wird angezeigt

function showForgotMyPasswort() {
    document.getElementById('header').innerHTML = 'I forgot my passwort';
    document.getElementById('arrowImg').classList.remove('d-none');
    document.getElementById('infoBoxRight').classList.add('d-none');
    forgotMyPasswortTemplate();
}

//Dialog soll nur als Link aus geschickter Email angezeigt??!!

function resetAccount() {
    /////Dieses Teil bezieht sich auf reset Passwort Fenster wenn man Link aus email klickt///
    // document.getElementById('header').innerHTML = 'Reset your passwort';
    // resetPasswortTemplate();

    let checkEmail = document.getElementById('resetEmail').value;
    searchForEmail(checkEmail);

}


function searchForEmail(checkEmail) {
    for (let i = 0; i < users.length; i++) {
        if (checkEmail == users[i]['email']) {
            //to do redirect to page 'E mail mit Link wurde erfolgreich auf {checkEmail} geschick'
            console.log('we have a match', users[i]['userId']);
            templateEmailSucces(i);
            checkEmail.value = '';
        } else {
            console.log('Email not Found, please sign up');
            // alert('It seems that User with the following email has not been found! Please sign up.');
        }

    }

}


function templateEmailSucces(i) {
    document.getElementById('header').innerHTML = 'Email sent!';
    document.getElementById('formContainer').innerHTML = `
    <div class="forgot-passwort-text">An Email with a Link has been successfully sent to ${users[i]['email']}.</div>
    `;

}

// Templates für Login, Sign up, forgot/reset Passwort

function logInTemplate() {
    document.getElementById('formContainer').innerHTML = `
    <form onsubmit="logIn(); return false">
                <div class="input-cont"><input requiered type="email" placeholder="Email" id="email"><img src="/Img/icon_mail.svg" alt=""></div>
                <div class="input-cont"><input required type="passwort" placeholder="Passwort" id="passwort"><img src="/Img/icon_lock.svg" alt=""></div>
                <div class="dialog-links-cont">
                    <input type="checkbox" id="rememberMe"></input><span class="remember-link"><img src="">Remember me</span><span class="forgot-passwort" onclick="showForgotMyPasswort()">Forgot my passwort</span>
                </div>
                <div class="button-cont" id="loginButtons">
                    <button class="blue-btn" id="loginBtn" value="newLogIn">Log in</button>
                    <div onclick="showGuestProfile()" class="white-btn" id="guestLogIn"  value="guestLogIn">Guest Log in</div>
                </div>

            </form>
    `;
}

function signUpTemplate() {
    document.getElementById('formContainer').innerHTML = `
    <form onsubmit="register(); return false">
    <div class="input-cont"><input required class="input-field-name" type="name" placeholder="Name" id="userName"> <img src="/Img/icon_user.svg"></div>
    <div class="input-cont"><input requiered type="email" placeholder="Email" id="userEmail"><img src="/Img/icon_mail.svg" alt=""></div>
    <div class="input-cont"><input required type="passwort" placeholder="Passwort" id="userPasswort"><img src="/Img/icon_lock.svg" alt=""></div>
    <div class="button-cont"><button class="blue-btn" id = "registerBtn">Sign up</button></div> 
    </form>`;
}


function forgotMyPasswortTemplate() {
    document.getElementById('formContainer').innerHTML = `
    <div class="forgot-passwort-text">Don't worry! We will send you an email with the instructions to reset your passwort.</div>
    <form action="https://www.aleksandar-miler.developerakademie.net/send_mail.php" method="post" id="formPasswort">
    <div class="input-cont"><input requiered type="email" placeholder="Email" id="resetEmail"><img src="/Img/icon_mail.svg"></div>
    <div class="button-cont"><button class="blue-btn passwort-btn" id="resetEmailBtn" onclick="resetAccount(); return false" type="submit">Send me the email</button></div>
    </form> 
    `;
}


//////?=${idOfUser}//////////////
function resetPasswortTemplate() {
    document.getElementById('formContainer').innerHTML = `
    <div class="forgot-passwort-text">Change your account passwort</div>
    <div class="input-cont"><input required type="passwort" placeholder="New passwort" id="newPasswort"><img src="/Img/icon_lock.svg" alt=""></div>
    <div class="input-cont"><input required type="passwort" placeholder="Confirm passwort" id="confirmPasswort"><img src="/Img/icon_lock.svg" alt=""></div>
    <div class="button-cont"><button class="blue-btn passwort-btn" id="resetPasswortBtn" onclick="resetPasswort()">Continue</button></div> 
`;
}
//  <button>Forgot Passwort?</button>

// To Do  nachdem registrierte User Log in button druckt


function logIn() {
    let email = document.getElementById('email').value;
    let passwort = document.getElementById('passwort').value;
    console.log(email, passwort);
    // debugger;
    checkRememberMe(email, passwort);
    searchForMatch(email, passwort);

}


////CheckBox wird überprüft, wenn es angecheckt ist wird user Data on localStorage gespeichert und bei nächstem Mal angezeigt

function checkRememberMe(email, passwort) {
    if (document.getElementById('rememberMe').checked) {
        console.log('Checkbox has been chechked');
        saveToLocalStorage(email, passwort);
    } else {
        console.log('Checkbox has not been chechked');
        resetSignInFields();
    }
}

function saveToLocalStorage(email, passwort) {
    localStorage.setItem('email', email);
    localStorage.setItem('passwort', passwort);
}

function loadFromLocalStorage() {
    if (!localStorage.getItem('email') && localStorage.getItem('passwort') == null) {
        console.log('You have not saved anything yet');
    } else {
        // debugger;
        let inputEmail = localStorage.getItem('email');
        let inputPasswort = localStorage.getItem('passwort');
        document.getElementById('email').value = `${inputEmail}`;
        document.getElementById('passwort').value = `${inputPasswort}`;

    }

}


///////wenn man an Guest Login button druckt, wird Guest Account gestartet

function showGuestProfile() {
    // debugger;
    let emailGuest = 'guest@join.de';
    let passwortGuest = 'guest123';
    searchForMatch(emailGuest, passwortGuest);
}

//User der in LogIn Felder Daten eingegeben hat, sollen mit Inhalt aus Array Users vergliechen werden

function searchForMatch(email, passwort) {
    for (let i = 0; i < users.length; i++) {

        if (users[i]['email'] == email && users[i]['passwort'] == passwort) {
            let userIdLogIn = users[i]['userId'];
            let userName = users[i]['name'];
            const url = "/summary.html?" + userIdLogIn + '?=' + userName;
            console.log('gefunden');
            window.location.href = url;
        } else {
            // To Do was passiert wenn email oder passwort nicht überreinstimmen
            console.log('Fehler');
        }

    }
}

// Inhalt von Login Felder wird gelöscht

function resetSignInFields() {
    document.getElementById('email').value = '';
    document.getElementById('passwort').value = '';
}


/***********************/
/***********************/
/*Login Version 2*/

// function logIn() {
//     debugger;
//     let email = document.getElementById('email').value;
//     let password = document.getElementById('password').value;
//     let findEmail = testUsers.filter(t => t['email'] == email);

//     if (findEmail.length > 0) {
//         checkPasswort(findEmail, password);
//     } else {
//         console.log('Check your spelling, we could not find User with that email');
//     }
// }

// function checkPasswort(findEmail, password) {
//     if (findEmail[0]['passwort'] == password) {
//         userId = findEmail[0]['userId'];
//         window.location = "/summary.html"

//     } else {
//         console.log('Your Passwort is incorrect');
//     }
// }

/***********************/
/***********************/