// let LOGIN_TOKEN  =  '8UPQOCJMCAP96ATK964I1LUZ079Q30TFOXVG50G3';
// let LOGIN_TOKEN = '77LWTBN88B7QWW9FMFCY7VQP4HJRV8B7ZS5ETSUN';
// let LOGIN_STORAGE_URL = 'https://remote-storage.developerakademie.org/item';


// async function setItem(key, value) {
//     const payloadLogin = { key, value, token: LOGIN_TOKEN };
//     return fetch(LOGIN_STORAGE_URL, { method: 'POST', body: JSON.stringify(payloadLogin) })
//         .then(res => res.json());
// }

// async function getItem(key) {
//     const loginUrl = `${LOGIN_STORAGE_URL}?key=${key}&token=${LOGIN_TOKEN}`;
//     return fetch(loginUrl).then(res => res.json()).then(res => {
//         // Verbesserter code
//         if (res.data) { 
//             return res.data.value;
//         } throw `Could not find data with key "${key}".`;
//     });
// }

///////////////////////////////////////////////////////////////
async function saveUsersOnServer() {
    let key = "usersData";
    let value = users;
    await setItem(key, value);
}

////////////////////////nur zum Testen////////////////

async function testUsersToServer() {
    let key = "usersData";
    let value = testUsers;
    await setItem(key, value);
}


let testUsers = [
    {
        "userId" : 00001,
        "name" : "guest",
        "email" : "guest@join.de",
        "passwort" :"guest123"
    },
    {
        "userId" : 00002,
        "name" : "test1",
        "email" : "test1@join.de",
        "passwort" :"test123"
    },
    {
        "userId" : 00003,
        "name" : "Max Mustermann",
        "email" : "max@join.de",
        "passwort" :"max123"
    }

];