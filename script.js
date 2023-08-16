let users = [];
let firstCheck;
let result;

/**
 * loading data from server, including users, 
 * initializes all neccesery functions in order for page to work 
 */

async function init() {
    checkWidth();
    await getAllAppData();
    await getUsers();
    showLoginDialog();
    // loadFromLocalStorage();
    checkLogoResponsiveHeightDelay();
}


/**
 * this function is supposed to show the Log In Dialog
 */

function showLoginDialog() {
    reAdjustDialogHeight();
    document.getElementById('header').innerHTML = 'Log in';
    document.getElementById('arrowImg').classList.add('d-none');
    document.getElementById('infoBoxRight').classList.remove('d-none');
    logInTemplate();
    showHidePassword();
    document.getElementById('header').classList.remove('adjusting-header');

}

/**
 * this function is taking the value from input Fields and initialising another two function, which are in charge of searching for the match 
 */


function logIn() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('passwort').value;
    checkRememberMe(email, password);
    searchForMatch(email, password);

}

/**
 * this function is searching for a match of given inputs in array named users, 
 * a variable named findEmail will, if found, contain the data of user in form of array
 * @param {string} email -  email of the user to compare
 * @param {string} password - password from the user to compare
 */

function searchForMatch(email, password) {
    let findEmail = users.filter(u => u['email'] == email);
    if (findEmail.length > 0) {
        checkPassword(findEmail, password);
        //checkbox function
    } else {
        alert('Check your spelling, we could not find User with that email');
    }
}

/**
 * this function is trying to find a match in a array of findEmail by checking the value of password,
 * if so, user Id Number will be saved in localStorage, and start page will be showed
 * @param {*} findEmail - contains the data of user in form of array
 * @param {*} password - password from the user to compare
 */

async function checkPassword(findEmail, password) {
    let userName = findEmail[0]['name'];
    if (findEmail[0]['passwort'] == password) {
        let userIdTest = findEmail[0]['userId'];
        await demoTaskToServer()
        await demoContactsToServer()
        window.location = "./summary.html";
        saveIdToLocalStorage(userIdTest, userName);

    } else {
        alert('Your Password is incorrect');
    }
}


/**
 * this function is saving two strings to the localStorage
 * @param {string} userId - the value of Identification number of user
 * @param {string} userName - the value of name of user
 */

function saveIdToLocalStorage(userId, userName) {
    localStorage.setItem('userId', userId);
    localStorage.setItem('userName', userName);

}



/**
 * this function is initialising the Demo Version with Guest Data
 */

function showGuestProfile() {
    let emailGuest = 'guest@join.de';
    let passwortGuest = 'guest123';
    searchForMatch(emailGuest, passwortGuest);
}


/**
 * this function is showing Sign up Dialog
 */

function showSignUpDialog() {
    adjustDialogHeight();
    document.getElementById('header').innerHTML = 'Sign up';
    document.getElementById('arrowImg').classList.remove('d-none');
    document.getElementById('infoBoxRight').classList.add('d-none');
    signUpTemplate();
}


/**
 * adjusting the size of sign up dialog depending on a width and height
 */

function adjustDialogHeight() {
    if(innerWidth < 550 && innerHeight < 650) {
        document.getElementById('dialog').classList.add('adj-dialog-signUp');
    }
}



/**
 * readjusting the size of  sign up dialog depending on a width and height
 */

function reAdjustDialogHeight() {
    document.getElementById('dialog').classList.remove('adj-dialog-signUp');
}



/**
 * this function is creating, when the conditions are right, new account for user
 */

function register() {
    document.getElementById('registerBtn').disabled = true;
    let name = document.getElementById('userName').value;
    let email = document.getElementById('userEmail').value;
    let passwort = document.getElementById('userPasswort').value;
    let confirmedPasswort = document.getElementById('userPasswortConfirm').value;
    checkNewUser(name, email, passwort, confirmedPasswort);
}


/**
 * this function is checking if the current user already exists in array named users, using the values of variables taken 
 * from input fileds. 
 *  
 * @param {string} name - the value of name of user
 * @param {string} email - the value of email of user
 * @param {string} passwort - the value of password of user
 * @param {string} confirmedPasswort - the value of the confirmed password of user
 */


function checkNewUser(name, email, passwort, confirmedPasswort) {
    let findName = users.filter(u => u['name'] == name);
    let findEmail = users.filter(u => u['email'] == email);

    if (findName.length > 0) {
        alert(`It seems that the User with the Name ${name} allready exists, please check your spelling and try again`);
        showSignUpDialog();
    } else if (findEmail.length > 0) {
        alert(`It seems that the User with the following email ${email} allready exists, please try again or if you are allready a User reset your password`);
        showSignUpDialog();
    } else if (passwort !== confirmedPasswort) {
        alert('The Fields password and confirm password have to be the same, try again');
        showSignUpDialog();
    } else if (policyCheck() == false) {
        alert('You have to agree to our Privacy policy in order to register');
        showSignUpDialog();
    }
    else {
        createNewUser(name, email, passwort);
    }
    findName = [];
    findEmail = [];
}


/**
 * this function is creating new User by pushing its values first to the array named users, than saving the data on server
 * 
 * @param {string} name - the value of name of user
 * @param {string} email - the value of email of user
 * @param {string} passwort - the value of password of user
 */

function createNewUser(name, email, passwort) {
    users.push({
        "userId": getRandomNumber(),
        "name": name,
        "email": email,
        "passwort": passwort
    });
    newUserIdtoAppData(result);// new User will be saved in appData 
    saveUsersOnServer();
    resetFields();
    showLoginDialog();
    showSuccessBox();
}



/**
 * this function, as taken from storage.js, is in charge of saving user data on main storage/server
 * @param {string} userId - value of identification number unique to the user that have been created 
 */


function newUserIdtoAppData(userId) {
    const newAppData = {
        "userId": userId,
        "data": {
            "tasks": [],
            "contacts": []
        }
    }
    appData.push(newAppData);
    setItem('appData', appData);
}


/**
 * this function creates a five digit random but unique number, 
 * which is going to be assigned first to a globaly defined variable called result
 *  
 * @returns random unique number that has been assigned to new user
 */

function getRandomNumber() {
    let min = 10000;
    let max = 99999;
    result = Math.floor(Math.random() * (max - min + 1)) + min;
    return result
}



/**
 * after the user has been created, info box will be shown
 */

function showSuccessBox() {
    document.getElementById('successInfo').classList.add('show-success-info');
}



/**
 * this function is trying to find out whaether the check box has been checked or not
 * 
 * @returns - value of true or false
 */


function policyCheck() {
    if (document.getElementById('acceptPrivacyPolicy').checked) {
        return true;
    } else {
        return false;
    }
}



/**
 * this function is trying to find out whaether the check box on the Sign Dialog has been checked or not, 
 * if so, the values of variables are going to be saved in localStorage 
 * 
 * @param {string} email - the value of email of user
 * @param {string} password - the value of password of user
 */

function checkRememberMe(email, password) { //eventuell noch in login function
    if (document.getElementById('rememberMe').checked) {
        saveToLocalStorage(email, password);
    } else {
        resetSignInFields();
    }
}



/**
 * this function saves the values of variables of the user to the local storage
 * @param {string} email - the value of email of user 
 * @param {string} password - the value of password of user
 */

function saveToLocalStorage(email, password) {
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
}



/**
 * this function is getting the data from user out of the localStorage the next time he tryes to log in
 */

function loadFromLocalStorage() {
    if (!localStorage.getItem('email') && localStorage.getItem('password') == null) {
        document.getElementById('email').value = '';
        document.getElementById('passwort').value = '';
    } else {
        let inputEmail = localStorage.getItem('email');
        let inputPassword = localStorage.getItem('password');
        document.getElementById('email').value = `${inputEmail}`;
        document.getElementById('passwort').value = `${inputPassword}`;
    }
}


/**
 * this function deletes the value of the Login Fields
 */

function resetSignInFields() {
    document.getElementById('email').value = '';
    document.getElementById('passwort').value = '';
}


/**
 * this function deletes the value of the Sign in Fields
 */

function resetFields() {
    document.getElementById('registerBtn').disabled = false;
    document.getElementById('userName').value = '';
    document.getElementById('userEmail').value = '';
    document.getElementById('userPasswort').value = '';
}


/**
 * function is showing the forgotMyPasswort Dialog
 */

function showForgotMyPasswort() {
    document.getElementById('header').innerHTML = 'I forgot my passwort';
    document.getElementById('arrowImg').classList.remove('d-none');
    document.getElementById('infoBoxRight').classList.add('d-none');
    forgotMyPasswortTemplate();
    adjustingHeader();
}


/**
 * this function is adjusting the html element depending on a width of the page
 */

function adjustingHeader() {
    if (innerWidth < 450) {
        document.getElementById('header').classList.add('adjusting-header');
    }else {
        document.getElementById('header').classList.remove('adjusting-header');
    }
}




/**
 * this function is in charge of masking/showing the password that has been typed
 */

function showHidePassword() {
    let x = document.getElementById('passwort');
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}



/**
 * function is adjusting Animation depending on mobile/Web layout
 */

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


/**
 * function is adjusting an html element (Logo) according to the size of the screen(mobile or Web)
 */


window.addEventListener('resize', checkLogo);

function checkLogo() {
    if (innerWidth < 880) {
        document.getElementById('webLogo').classList.add('adj-mobile-logo');
        document.getElementById('mobileLogo').classList.remove('adj-web-logo');
    } else {

        document.getElementById('mobileLogo').classList.add('adj-web-logo');
        document.getElementById('webLogo').classList.remove('adj-mobile-logo');
    }
}


/**
 * adjusting the size of a logo depending on a height value
 */

window.addEventListener('resize', checkLogoResponsiveHeight);

function checkLogoResponsiveHeight() {
    if (innerWidth < 1400 && innerHeight < 650) {
        document.getElementById('webLogo').classList.add('adj-mobile-logo');
    }
}


/**
 * adjusting the size of the logo with a delay
 */

function checkLogoResponsiveHeightDelay() {
    setTimeout(checkLogoResponsiveHeight, 3000);
}


/**
 * function is adjusting an html element (h1) according to the size of the screen
 */

window.addEventListener('resize', checkResetPasswortH1);

function checkResetPasswortH1() {
    if (innerWidth < 450) {
        document.getElementById('header').classList.add('adjusting-header');
    } else {
        document.getElementById('header').classList.remove('adjusting-header');
    }
}



///////////////////RESET PASSWORT/////////////////////////// 


/**
 * checking if the given mail already exists in a array named users 
 * @returns value of true or false
 */
function compareEmails() {
    let checkEmail = document.getElementById('resetEmail').value;
    let findEmail = users.filter(u => u['email'] == checkEmail); 
    if(findEmail.length > 0){ 
        return true
    } else {
        return false
    }
}


/**
 * if the values of emails match, sending data on a server and initialising start of php file execution 
 * @param {*} event Prevent Deafault Form Action
 */


async function onSubmit(event) {
  if (compareEmails() === true) {
    event.preventDefault(); // Prevent Deafault Form Action
    let formData = new FormData(event.target); // create a FormData based on our Form element in HTML
    let response = await action(formData);
    if (response.ok) {
        alert('Email was sent');
        templateEmailSucces();
    } else {
        alert('Email was not sent');
    }
   
} 
else {
    alert('It seems that User with the following email has not been found! Please sign up.');
}


/**
 * 
 * @param {*} formData based on our Form element in HTML
 * @returns fetching data from server
 */

function action(formData) {
    const input = 'https://gruppe-558.developerakademie.net/Join/send_mail.php';
    const requestInit = {
        method: 'post',
        body : formData
    };

    return fetch(
        input,
        requestInit
    );

} 
}





//////////////////  Templates //////////////////////////



/**
 * function is showing the html template of Login
 */

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


/**
 * function is showing the html template of sign in
 */

function signUpTemplate() {
    document.getElementById('formContainer').innerHTML = `
    <form onsubmit="register(); return false">
    <div class="input-cont"><input required class="input-field-name" type="name" placeholder="Name" id="userName"> <img src="./Img/icon_user.svg"></div>
    <div class="input-cont"><input requiered type="email" placeholder="Email" id="userEmail"><img src="./Img/icon_mail.svg" alt=""></div>
    <div class="input-cont"><input required type="passwort" placeholder="Passwort" id="userPasswort"><img src="./Img/icon_lock.svg" alt=""></div>
    <div class="input-cont"><input required type="passwort" placeholder="Confirm Passwort" id="userPasswortConfirm"><img src="./Img/icon_lock.svg" alt=""></div>
    <div class="privacy-policy-cont"><input type="checkbox" id="acceptPrivacyPolicy"></input><span class="remember-link">I accept the <a href="./privacyPolicy.html">Privacy policy</a></span></div>
    <div class="button-cont"><button class="blue-btn" id = "registerBtn">Sign up</button></div> 
    </form>`;
}


/**
 * function is showing the html template of forgotMyPassword
 */

function forgotMyPasswortTemplate() {
    document.getElementById('formContainer').innerHTML = `
    <div class="forgot-passwort-text">Don't worry! We will send you an email with the instructions to reset your passwort.</div>
    <form onsubmit="onSubmit(event)" method="post" id="formPasswort">
    <div class="input-cont"><input requiered type="email" placeholder="Email" id="resetEmail" name="email"><img src="./Img/icon_mail.svg"></div>
    <div class="button-cont"><button class="blue-btn passwort-btn emailBtn" id="resetEmailBtn" return false" type="submit">Send me the email</button></div>
    </form> 
    `;
}



/**
 * function is showing the html template of resetPassword
 */

function resetPasswortTemplate() {
    document.getElementById('formContainer').innerHTML = `
    <div class="forgot-passwort-text">Change your account passwort</div>
    <div class="input-cont"><input required type="passwort" placeholder="New passwort" id="newPasswort"><img src="./Img/icon_lock.svg" alt=""></div>
    <div class="input-cont"><input required type="passwort" placeholder="Confirm passwort" id="confirmPasswort"><img src="./Img/icon_lock.svg" alt=""></div>
    <div class="button-cont"><button class="blue-btn passwort-btn" id="resetPasswortBtn" onclick="resetPasswort()">Continue</button></div> 
`;
}


/**
 * function is showing the html template of email succesfully sent
 */

function templateEmailSucces() {
    document.getElementById('header').innerHTML = 'Email sent!';
    document.getElementById('formContainer').innerHTML = `
    <div class="forgot-passwort-text">An Email with a Link has been successfully sent to you.</div>
    `;

}

