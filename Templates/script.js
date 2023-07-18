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


//id vom User wird überprüft um begrüßt zu werden
function checkUser() {
    if (userId == 11111) {
        document.getElementById('avatarHeaderImage').src = "./Img/christina-wocintechchat.png";
    } else {
        document.getElementById('avatarHeaderImage').src = "./Img/avatar_user_header.svg";
    }
}


//User wird zur Startseite weitergeleitet
function logOut() {
    window.location.href = './index.html';
    //to do Müssen die Id und userName aus localStorage gelöscht??
}

//PopOut button erscheint auf der rechte Seite
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



function closePopOut() {
    // debugger;
    document.getElementById('popOut').classList.remove('pop-out-web');
}

// window.addEventListener('click', function(e){   
//     if (document.getElementById('popOut').contains(e.target && "style=translateX(0)")){
//       return;
//     } else{
//         closePopOut();
//     }
//   });