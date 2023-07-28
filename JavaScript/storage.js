let appData = [];
let tasks = [];
let contacts = [];
// let userId = 11111; // nur für test
let userId = +localStorage.getItem('userId'); 
const STORAGE_TOKEN = 'VME58G2KX9RYXPBTN6UKEQ0E5HVP3P7Q5CR6TE8W';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';


// Load From Server
async function getItem(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  return fetch(url).then(res => res.json());
}


// Post to Server
async function setItem(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) })
    .then(res => res.json());
}


// Lade appData vom Server
async function getAllAppData() {
  try {
    let dataSetFromServer = await getItem('appData');
    let fullAppData = dataSetFromServer['data']['value'];
    let replacedData = fullAppData.replace(/'/g, '"'); // Replace ""
    let parsedData = await JSON.parse(replacedData);
    appData = parsedData;
  } catch (error) {
    console.log(error)
  }
}


/*********************************************************************/
/* Add Task */
/*********************************************************************/

// liest die tasks des users aus appdata und speicher in tasks
async function getTasks() {
  const userData = appData.find(item => item.userId === userId);
  const userTasks = userData.data.tasks;
  tasks = userTasks;
}


// Save Tasks in appData and save appData on Server
async function saveTasksOnServer() {
  const userDataSet = appData.find(user => user.userId === userId);
  userDataSet.data.tasks = tasks;
  await setItem("appData", appData);  
}

/*********************************************************************/
/* Contacts */
/*********************************************************************/

//Loading Contatcs from app data
async function getContacts() {
  const userData = appData.find(item => item.userId === userId);
  const userContacts = userData.data.contacts;
  contacts = userContacts;
}

//saving Contatcs on Server
async function saveContactsOnServer() {
  const userDataSet = appData.find(user => user.userId === userId);
  userDataSet.data.contacts = contacts;
  await setItem("appData", appData);
}




/*********************************************************************/
/* Users Data */
/*********************************************************************/

async function getUsers() {
    try {
      let usersFromServer = await getItem('usersData');
      let usersArray = usersFromServer['data']['value'];
      let replacedDataUsers = usersArray.replace(/'/g, '"'); // Replace ""
      let parsedUsers = await JSON.parse(replacedDataUsers);
      // console.log(parsedUsers);
      users =  parsedUsers;

    } catch (error) {
      console.log('No Data Found:', error);
    }
  }



async function saveUsersOnServer() {
  let key = "usersData";
  let value = users;
  await setItem(key, value);
}




async function testUsersToServer() {
  let key = "usersData";
  let value = testUsers;
  await setItem(key, value);
}


let testUsers = [
  {
      "userId" : 11111,
      "name" : "guest",
      "email" : "guest@join.de",
      "passwort" :"guest123"
  },
  {
      "userId" : 22222,
      "name" : "test1",
      "email" : "test1@join.de",
      "passwort" :"test123"
  },
  {
      "userId" : 33333,
      "name" : "Max Mustermann",
      "email" : "max@join.de",
      "passwort" :"max123"
  }

];


