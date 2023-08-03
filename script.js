let users = [];
let firstCheck;
let result; 



async function init() {
    checkWidth();
    await getAllAppData();
    // await testUsersToServer();
    await getUsers();
    showLoginDialog();
    // loadFromLocalStorage();
}



// Log in Dialog wird wieder gezeigt

function showLoginDialog() {
    document.getElementById('header').innerHTML = 'Log in';
    document.getElementById('arrowImg').classList.add('d-none');
    document.getElementById('infoBoxRight').classList.remove('d-none');
    logInTemplate();
    showHidePassword();
    document.getElementById('header').classList.remove('adjusting-header');

}

/*Login Version 2*/


function logIn() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('passwort').value;
    checkRememberMe(email, password);
    searchForMatch(email, password);

}


//email und passwort werden verglichen und bei Match an Summary weitergeleitet

function searchForMatch(email, password) {
    let findEmail = users.filter(u => u['email'] == email);
    if (findEmail.length > 0) {
        checkPassword(findEmail, password);
        //checkbox function
    } else {
        alert('Check your spelling, we could not find User with that email');
    }
}


function checkPassword(findEmail, password) {
    let userName = findEmail[0]['name'];
    if (findEmail[0]['passwort'] == password) {
        let userIdTest = findEmail[0]['userId'];
        window.location = "./summary.html";
        saveIdToLocalStorage(userIdTest, userName);
        
    } else {
        alert('Your Password is incorrect');
    }
}

//id und userName werden auf localStorage gespeichert

function saveIdToLocalStorage(userId, userName) {
    localStorage.setItem('userId', userId);
    localStorage.setItem('userName', userName);
    
}


///// wenn man an Guest Login button druckt, wird Guest Account gestartet

function showGuestProfile() {
    let emailGuest = 'guest@join.de';
    let passwortGuest = 'guest123';
    searchForMatch(emailGuest, passwortGuest);
}



// Sign up formular wird angezeigt

function showSignUpDialog() {
    document.getElementById('header').innerHTML = 'Sign up';
    document.getElementById('arrowImg').classList.remove('d-none');
    document.getElementById('infoBoxRight').classList.add('d-none');
    signUpTemplate();
}


//der neue User wird erstellt 
//

async function register() {
    document.getElementById('registerBtn').disabled = true;
    let name = document.getElementById('userName').value;
    let email = document.getElementById('userEmail').value;
    let passwort = document.getElementById('userPasswort').value;


    //eventuell in andere Function ?? checkNewUser(name, email, passwort);

    let findName = users.filter(u => u['name'] == name);
    let findEmail = users.filter(u => u['email'] == email);

    if (findName.length > 0) {
        alert(`It seems that the User with the Name ${name} allready exists, please check your spelling and try again`);
    } else if (findEmail.length > 0) {
        alert(`It seems that the User with the following email ${email} allready exists, please try again or if you are allready a User reset your password`);
    } else {
        users.push({
            "userId": getRandomNumber(),
            "name": name,
            "email": email,
            "passwort": passwort
        });
        newUserIdtoAppData(result);// neuer User wird in appData gespeichert
        saveUsersOnServer();
        resetFields();
        showLoginDialog();
    }

    // resetFields();// überlege wie und wann soll Formularfelder gelöscht werden = sign up formular
    findName = [];
    findEmail = [];

}


///Function vom Storage.js übernommen, neu registrierter User wird auf Haupt Storage gespeichert 

function newUserIdtoAppData(userId){
    const newAppData =   {
      "userId": userId,
      "data": {
        "tasks": [],
        "contacts": []
      }
    }
    appData.push(newAppData);
    setItem('appData', appData);
  }

  
//// eine 5-stellige random Nummer wird generiert

function getRandomNumber() {
    let min = 10000;
    let max = 99999;
    result = Math.floor(Math.random() * (max - min + 1)) + min;
    return result
    }



////CheckBox wird überprüft, ob es angecheckt ist, und wird user Data on localStorage gespeichert und bei nächstem Mal angezeigt

function checkRememberMe(email, password) { //eventuell noch in login function
    if (document.getElementById('rememberMe').checked) {
        saveToLocalStorage(email, password);
    } else {
        resetSignInFields();
    }
}


function saveToLocalStorage(email, password) {
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
}


function loadFromLocalStorage() {
    if (!localStorage.getItem('email') && localStorage.getItem('password') == null) {
        // console.log('You have not saved anything yet');
    } else {
       
        let inputEmail = localStorage.getItem('email');
        let inputPassword = localStorage.getItem('password');
        document.getElementById('email').value = `${inputEmail}`;
        document.getElementById('passwort').value = `${inputPassword}`;

    }

}


// Inhalt von Login Felder wird gelöscht

function resetSignInFields() {
    document.getElementById('email').value = '';
    document.getElementById('passwort').value = '';
}


// die Values aus Feldern werden gelöscht

function resetFields() {
    document.getElementById('registerBtn').disabled = false;
    document.getElementById('userName').value = '';
    document.getElementById('userEmail').value = '';
    document.getElementById('userPasswort').value = '';
}


// Dialog Forgot my Passwort wird angezeigt

function showForgotMyPasswort() {
    document.getElementById('header').innerHTML = 'I forgot my passwort';
    document.getElementById('arrowImg').classList.remove('d-none');
    document.getElementById('infoBoxRight').classList.add('d-none');
    forgotMyPasswortTemplate();
    adjustingHeader();
}

function adjustingHeader() {
    if (innerWidth < 450) {
        document.getElementById('header').classList.add('adjusting-header');
    }
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

//Show Hide password

function showHidePassword() {
    let x = document.getElementById('passwort');
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}



//wofür habe ich das gebraucht?

  function checkUser(name, email) {
    for (let j = 0; j < users.length; j++) {
        let element = users[j];
        returnCheckedUser(element, name, email);


    }
}


function returnCheckedUser(element, name, email) {
    if (element['name'] == name || element['email'] == email) {
        return firstCheck === true;
    }
    else {
        return false;
    }
}




/***********************/

// Login Version 1


// function logIn() {
//     let email = document.getElementById('email').value;
//     let password = document.getElementById('passwort').value;
//     console.log(email, password);
//     // debugger;
//     checkRememberMe(email, password);
//     searchForMatch(email, password);

// }

//User der in LogIn Felder Daten eingegeben hat, sollen mit Inhalt aus Array Users vergliechen werden

// function searchForMatch(email, passwort) {
//     for (let i = 0; i < users.length; i++) {

//         if (users[i]['email'] == email && users[i]['passwort'] == passwort) {
//             let userIdLogIn = users[i]['userId'];
//             let userName = users[i]['name'];
//             const url = "/summary.html?" + userIdLogIn + '?=' + userName;
//             console.log('gefunden');
//             window.location.href = url;
//         } else {
//             // To Do was passiert wenn email oder passwort nicht überreinstimmen
//             console.log('Fehler');
//         }

//     }
// }

/***********************/




//Animation, die für Web/Mobile Version angepasst wird

function checkWidth() {
    if (innerWidth < 450) {
        document.getElementById('mobileOverlay').classList.remove('d-none');
        document.getElementById('webOverlay').classList.add('d-none');
        document.getElementById('webLogo').classList.add('adj-web-logo');
    } else {
        document.getElementById('webOverlay').classList.remove('d-none');
        document.getElementById('mobileOverlay').classList.add('d-none'); 
        document.getElementById('mobileLogo').classList.add('adj-mobile-logo');

    }
}

/* Logo adjustment web to mobile and mobile to web */

window.addEventListener('resize', checkLogo);

function checkLogo() {
    if (innerWidth < 450) {
        document.getElementById('webLogo').classList.add('adj-mobile-logo');
        document.getElementById('mobileLogo').classList.remove('adj-web-logo');
    } else {

        document.getElementById('mobileLogo').classList.add('adj-web-logo');
        document.getElementById('webLogo').classList.remove('adj-mobile-logo');

    }
}

///////////////////RESET PASSWORT/////////////////////////// momentan immmer noch inactive

// async function onSubmit(event) {
//     event.preventDefault(); // Prevent Deafault Form Action
//     let formData = new FormData(event.target); // create a FormData based on our Form element in HTML
//     let response = await action(formData);
//     if (response.ok) {
//         alert('Email was sent');
//     } else {
//         alert('Email was not sent');
//     }
// }

// function action(formData) {
//     const input = 'https://gruppe-558.developerakademie.net/send_mail.php';
//     const requestInit = {
//         method: 'post',
//         body : formData
//     };

//     return fetch(
//         input,
//         requestInit
//     );
// }


//////////////////  Templates //////////////////////////


// Template für Login

function logInTemplate() {
    document.getElementById('formContainer').innerHTML = `
    <form onsubmit="logIn(); return false">
                <div class="input-cont"><input requiered type="email" placeholder="Email" id="email"><img src="./Img/icon_mail.svg" alt=""></div>
                <div class="input-cont"><input required type="passwort" placeholder="Passwort" id="passwort"><img src="./Img/icon_lock.svg" alt="" onclick="showHidePassword()"></div>
                <div class="dialog-links-cont">
                    <div><input type="checkbox" id="rememberMe"></input><span class="remember-link">Remember me</span></div>
                    <span class="forgot-passwort" onclick="showForgotMyPasswort()">Forgot my passwort</span>
                </div>
                <div class="button-cont" id="loginButtons">
                    <button class="blue-btn" id="loginBtn" value="newLogIn">Log in</button>
                    <div onclick="showGuestProfile()" class="white-btn" id="guestLogIn"  value="guestLogIn">Guest Log in</div>
                </div>

            </form>
    `;
}

// Template für Sign In

function signUpTemplate() {
    document.getElementById('formContainer').innerHTML = `
    <form onsubmit="register(); return false">
    <div class="input-cont"><input required class="input-field-name" type="name" placeholder="Name" id="userName"> <img src="./Img/icon_user.svg"></div>
    <div class="input-cont"><input requiered type="email" placeholder="Email" id="userEmail"><img src="./Img/icon_mail.svg" alt=""></div>
    <div class="input-cont"><input required type="passwort" placeholder="Passwort" id="userPasswort"><img src="./Img/icon_lock.svg" alt=""></div>
    <div class="button-cont"><button class="blue-btn" id = "registerBtn">Sign up</button></div> 
    </form>`;
}


// Template für forgot my password

function forgotMyPasswortTemplate() {
    document.getElementById('formContainer').innerHTML = `
    <div class="forgot-passwort-text">Don't worry! We will send you an email with the instructions to reset your passwort.</div>
    <form onsubmit="onSubmit(event)" method="post" id="formPasswort">
    <div class="input-cont"><input requiered type="email" placeholder="Email" id="resetEmail" name="email"><img src="./Img/icon_mail.svg"></div>
    <div class="button-cont"><button class="blue-btn passwort-btn emailBtn" id="resetEmailBtn" onclick="resetAccount(); return false" type="submit">Send me the email</button></div>
    </form> 
    `;
}



//// reset password

function resetPasswortTemplate() {
    document.getElementById('formContainer').innerHTML = `
    <div class="forgot-passwort-text">Change your account passwort</div>
    <div class="input-cont"><input required type="passwort" placeholder="New passwort" id="newPasswort"><img src="./Img/icon_lock.svg" alt=""></div>
    <div class="input-cont"><input required type="passwort" placeholder="Confirm passwort" id="confirmPasswort"><img src="./Img/icon_lock.svg" alt=""></div>
    <div class="button-cont"><button class="blue-btn passwort-btn" id="resetPasswortBtn" onclick="resetPasswort()">Continue</button></div> 
`;
}

//// Email succesfully sent

function templateEmailSucces(i) {
    document.getElementById('header').innerHTML = 'Email sent!';
    document.getElementById('formContainer').innerHTML = `
    <div class="forgot-passwort-text">An Email with a Link has been successfully sent to ${users[i]['email']}.</div>
    `;

}

