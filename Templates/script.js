/**
 * functions are being initialized
 */

async function init() {
    await includeHTML();
    checkUser();
}

/**
 * this function imports the Template to every page
 */

async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}

/**
 * the picture for the avatar will be set depending on the identification number of guest user or new registered user
 */

function checkUser() {
    if (userId == 11111) {
        document.getElementById('avatarHeaderImage').src = "./Img/christina-wocintechchat.png";
    } else {
        document.getElementById('avatarHeaderImage').src = "./Img/avatar_user_header.svg";
    }
}


/**
 * user will be redirected to the start page
 */

function logOut() {
    window.location.href = './index.html';
}

/**
 * sliding menu will be shown on the right side depending on a screen size
 */

function showPopOut() {
    if (innerWidth < 600) {
        document.getElementById('helpBtn').classList.remove('d-none');
        document.getElementById('legalNoticeBtn').classList.remove('d-none');
    } else {
        document.getElementById('helpBtn').classList.add('d-none');
        document.getElementById('legalNoticeBtn').classList.add('d-none');
    }
    document.getElementById('popOut').classList.add('pop-out-web');
    //style = 'transform: translateX(0px)'; ';classList.add('pop-out-web');
}


/**
 * closes the sliding menu on the right side
 */

function closePopOut() {
    document.getElementById('popOut').classList.remove('pop-out-web');
}
