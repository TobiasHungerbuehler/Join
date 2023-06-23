async function init() {
    await includeHTML();
    // document.getElementById('headline').innerHTML = 'Herzlich willkommen!';
    checkUser();
}

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

function checkUser() {
    if (userId == 11111) {
        document.getElementById('avatarHeaderImage').src = "/Img/christina-wocintechchat.png";
    } else {
        document.getElementById('avatarHeaderImage').src = "/Img/avatar_user_header.svg";
    }
}