
///////am Start der reset Passwort Seite  soll
// <script onload = "onPageLoad()">
//let email = "";
//let users;

function onPageLoad() {
    email = getEmailUrlParameter();
    //users = getUsers();
}

function getEmailUrlParameter() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const email = urlParams.get('email');
    return email;
}
