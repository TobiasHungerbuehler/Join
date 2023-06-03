let users = [];


function init() {
    loadUsers();
    showLoginDialog();
}

// die Daten werden vom server heruntergeladen und zum Users hinzugefügt

async function loadUsers() {
    try {
        users = JSON.parse(await getItem('users'));
        console.log('This is loaded', users);
    } catch(e){
        console.error('Loading error:', e);
    }

}


//die neue User wird erstellt 


async function register() {
registerBtn.disabled = true;
let name = document.getElementById('userName').value;
let email = document.getElementById('userEmail').value;
let passwort = document.getElementById('userPasswort').value;

users.push({
    name : name,
    email : email,
    passwort : passwort
});


await setItem('users', JSON.stringify(users));
resetFields();
showLoginDialog();

}


// die Flederinhalt werden gelöscht
function resetFields(){
    registerBtn.disabled = false;
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

function showForgotMyPasswort(){
    document.getElementById('header').innerHTML = 'I forgot my passwort'; 
    document.getElementById('arrowImg').classList.remove('d-none');
    document.getElementById('infoBoxRight').classList.add('d-none');
    forgotMyPasswortTemplate();
}

//Dialog soll nur als Link aus geschickter Email angezeigt??!!

function resetPasswort() {
    document.getElementById('header').innerHTML = 'Reset your passwort';
    resetPasswortTemplate();
}

// Templates Login, Sign up, forgot/reset Passwort

function logInTemplate() {
    document.getElementById('formContainer').innerHTML = `
    <form onsubmit="logIn(); return false">
                <div class="input-cont"><input requiered type="email" placeholder="Email" id="email"><img src="/Img/icon_mail.svg" alt=""></div>
                <div class="input-cont"><input required type="passwort" placeholder="Passwort" id="passwort"><img src="/Img/icon_lock.svg" alt=""></div>
                <div class="dialog-links-cont">
                    <span class="remember-link"><img src="">Remember me</span><span class="forgot-passwort" onclick="showForgotMyPasswort()">Forgot my passwort</span>
                </div>
                <div class="button-cont">
                    <button class="blue-btn" id="loginBtn">Log in</button>
                    <button class="white-btn" id="guestLogIn">Guest Log in</button>
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


function forgotMyPasswortTemplate(){
    document.getElementById('formContainer').innerHTML = `
    <div class="forgot-passwort-text">Don't worry! We will send you an email with the instructions to reset your passwort.</div>
    <div class="input-cont"><input requiered type="email" placeholder="Email" id="resetEmail"><img src="/Img/icon_mail.svg"></div>
    <div class="button-cont"><button class="blue-btn passwort-btn" id="resetEmailBtn" onclick="resetPasswort()">Send me the email</button></div> 
    `; 
}


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

function logIn(){
    debugger;
    let email = document.getElementById('email').value;
    let passwort = document.getElementById('passwort').value;
    console.log(email, passwort);
    searchForMatch(email, passwort);
    resetSignInFields();

}


//To Do - User der in Log In Felder Daten eingegeben hat sollen mit Inhalt aus Array Users vergliechen werden

function searchForMatch(email, passwort) {
    for (let i = 0; i < users.length; i++) {
        const element = users[i];
        searchEmail = users.filter(u => u.email == 'email');
        console.log(searchEmail);
    }

   
}

// Inhalt von Log in Felder wird gelöscht

function resetSignInFields() {
    document.getElementById('email').value = '';
    document.getElementById('passwort').value = '';
}