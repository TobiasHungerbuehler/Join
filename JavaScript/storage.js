let appData = [];
let tasks = [];
let contacts = [];

/**
 * The current user ID retrieved from local storage.
 * @type {number}
 */
let userId = +localStorage.getItem('userId'); 


/**
 * The token used for authentication when accessing the storage server.
 * @type {string}
 * @const
 */
const STORAGE_TOKEN = 'VME58G2KX9RYXPBTN6UKEQ0E5HVP3P7Q5CR6TE8W';


/**
 * The URL of the storage server.
 * @type {string}
 * @const
 */
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';



/**
 * Fetches a value from the server.
 * @async
 * @function getItem
 * @param {string} key - The key associated with the value.
 * @returns {Promise<Object>} Promise object represents the fetched value.
 */
async function getItem(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  return fetch(url).then(res => res.json());
}


/**
 * Posts a value to the server.
 * @async
 * @function setItem
 * @param {string} key - The key to associate with the value.
 * @param {*} value - The value to post.
 * @returns {Promise<Object>} Promise object represents the response.
 */
async function setItem(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) })
    .then(res => res.json());
}


/**
 * Retrieves and processes the appData from the server.
 * @async
 * @function getAllAppData
 */
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

/**
 * Retrieves the user's tasks from appData and stores them in the tasks variable.
 * @async
 * @function getTasks
 */
async function getTasks() {
  const userData = appData.find(item => item.userId === userId);
  const userTasks = userData.data.tasks;
  tasks = userTasks;
}


/**
 * Saves tasks in appData and posts appData to the server.
 * @async
 * @function saveTasksOnServer
 * @returns {Promise<void>} Promise object represents the completion of the task save.
 */
async function saveTasksOnServer() {
  const userDataSet = appData.find(user => user.userId === userId);
  userDataSet.data.tasks = tasks;
  await setItem("appData", appData);  
}

/*********************************************************************/
/* Contacts */
/*********************************************************************/

/**
 * Retrieves the user's contacts from appData and stores them in the contacts variable.
 * @async
 * @function getContacts
 */
async function getContacts() {
  const userData = appData.find(item => item.userId === userId);
  const userContacts = userData.data.contacts;
  contacts = userContacts;
}


/**
 * Saves contacts in appData and posts appData to the server.
 * @async
 * @function saveContactsOnServer
 * @returns {Promise<void>} Promise object represents the completion of the contact save.
 */
async function saveContactsOnServer() {
  const userDataSet = appData.find(user => user.userId === userId);
  userDataSet.data.contacts = contacts;
  await setItem("appData", appData);
}


/*********************************************************************/
/* Users Data */
/*********************************************************************/

/**
 * Retrieves and processes the users data from the server.
 * @async
 * @function getUsers
 */
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


/**
 * Saves users data to the server.
 * @async
 * @function saveUsersOnServer
 * @returns {Promise<void>} Promise object represents the completion of the user save.
 */
async function saveUsersOnServer() {
  let key = "usersData";
  let value = users;
  await setItem(key, value);
}


/**
 * Saves test users data to the server.
 * @async
 * @function testUsersToServer
 * @returns {Promise<void>} Promise object represents the completion of the test user save.
 */
async function testUsersToServer() {
  let key = "usersData";
  let value = testUsers;
  await setItem(key, value);
}


/**
 * An array containing the test users data.
 * @type {Array<Object>}
 */
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


