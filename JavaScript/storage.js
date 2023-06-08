
/*********************************************************************/
/* All App Data */
/*********************************************************************/
let contacts = [];
const userId = 00003; // Wird nach dem Login gesetzt
const STORAGE_TOKEN = 'VME58G2KX9RYXPBTN6UKEQ0E5HVP3P7Q5CR6TE8W';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';


// Lade alle appData vom Server
async function getAllAppData() {
  try {
    let dataSetFromServer = await getItem('appData');
    let allAppData = dataSetFromServer['data']['value'];
    let replacedData = allAppData.replace(/'/g, '"'); // Replace ""
    let parsedTasks = await JSON.parse(replacedData);
    return parsedTasks
  } catch (error) {
    console.log('get tasks 2 out=', parsedTasks)
  }
}


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


function newUserIdtoAppData(){
  const newAppData =   {
    "userId": userId,
    "data": {
      "tasks": [],
      "contacts": []
    }
  }
  appData.push(newAppData);
}

// Speichrestruktur

let appData = [
  {
    "userId": 00001,
    "data": {
      "tasks": [],
      "contacts": []
    }
  },
  {
    "userId": 00002,
    "data": {
      "tasks": [],
      "contacts": []
    }
  }
];


/*********************************************************************/
/* Add Task */
/*********************************************************************/


// Ladet alle AppData und speichert die Tasks des users in "rask" array
async function getTasks() {
  try{
    const allAppData = await getAllAppData()
    const userData = allAppData.find(item => item.userId === userId);
    const userTasks = userData.data.tasks;
    tasks = userTasks;
    console.log('get tasks 2=',tasks)
  }
  catch (error) {
    console.log('No Data Found:', error);
  }
}


// Save Tasks in appData and save appData on Server
async function saveTasksOnServer() {
  const userDataSet = appData.find(user => user.userId === userId);
  userDataSet.data.tasks = tasks;
  let key = "appData";
  let value = appData;
  await setItem(key, value);  
  //let key = "userTasks";
  //let value = tasks;
  //await setItem(key, value);
  //await getTasks(); // automatishh wieder runterladen nach upload zu test
}

/*********************************************************************/
/* Contacts */
/*********************************************************************/
//saving Contatcs on Server


async function saveContactsOnServer() {
  const userDataSet = appData.find(user => user.userId === userId);
  userDataSet.data.contacts = contacts;
  let key = "appData";
  let value = appData;
  await setItem(key, value);


  //let key = "savedContacts";
  //let value = contacts;
  //await setItem(key, value);

}

//Loading Contatcs from Server
async function getContacts() {
  try {

    const allAppData = await getAllAppData()
    const userData = allAppData.find(item => item.userId === userId);
    const userContacts = userData.data.contacts;
    contacts = userContacts;
    console.log('get tasks 2=',tasks)



    //let dataFromServer = await getItem('savedContacts');
    //contactsFromServer = dataFromServer['data']['value'];
    //let replacedData = contactsFromServer.replace(/'/g, '"'); // Replace ""
    //let contactsAsJSON = await JSON.parse(replacedData);
    //console.log(contactsAsJSON);
    //contacts = contactsAsJSON;
  }
  catch (error) {
    console.log('No Data Found:', error);
  }
}


/*********************************************************************/
/* Demo Data */
/*********************************************************************/

/// provisorische test task für aktuelle USer wieder auf server speichern 
async function testContactsToServer() {
  const userDataSet = appData.find(user => user.userId === userId);
  userDataSet.data.contacts = testContacts;
  let key = "appData";
  let value = appData;
  await setItem(key, value);
}


/// provisorische test Contacst für aktuelle USer wieder auf server speichern 
async function testTaskToServer() {
  const userDataSet = appData.find(user => user.userId === userId);
  userDataSet.data.tasks = testTasks;
  let key = "appData";
  let value = appData;
  await setItem(key, value);
}




let testTasks = [
  {
    "title": "Phone prospecting for new customers",
    "description": "Make calls to potential customers to identify new sales opportunities.",
    "category": { "category": "Sales", "color": "#29ABE2" },
    "taskEmails": ["jonas@joinmail.com", "susane@joinmail.com", "alex@joinmail.com"],
    "dueDate": "2023-05-01",
    "prio": "urgent",
    "subtasks": [
       {"title": "Create a list of potential customers", "isCompleted": "true"},
       {"title": "Research phone numbers and add them to the list", "isCompleted": "true"},
       {"title": "Perform phone prospecting and record notes in CRM system", "isCompleted": "false"}
    ],
    "status": 'toDo'
  },
  {
    "title": "Launch new marketing campaign",
    "description": "Create and execute a new marketing campaign to drive sales.",
    "category": { "category": "Marketing", "color": "#e22970" },
    "taskEmails": ["gonsalo@joinmail.com", "alex@joinmail.com", "friedrich@joinmail.com", "lynn@joinmail.com", "martin@joinmail.com"  ],
    "dueDate": "2023-06-01",
    "prio": "medium",
    "subtasks": [
      {"title": "Develop campaign strategy and messaging", "isCompleted": "true"},
      {"title": "Create marketing materials (e.g. email copy, landing pages)", "isCompleted": "false"},
      {"title": "Launch campaign and track results", "isCompleted": "false"}
    ],
    "status": 'inProgress'
  },
  {
    "title": "Prepare financial reports",
    "description": "Compile financial data and create reports for management.",
    "category": { "category": "Backoffice", "color": "#e27329" },
    "taskEmails": ["stefan@joinmail.com","friedrich@joinmail.com" ],
    "dueDate": "2023-05-31",
    "prio": "low",
    "subtasks": [
      {"title": "Gather financial data from relevant sources", "isCompleted": "true"},
      {"title": "Organize data and create financial reports", "isCompleted": "true"},
      {"title": "Review and finalize reports with management", "isCompleted": "true"}
    ],
    "status": 'awaitingFeedback'
  },
  {
    "title": "Test 4",
    "description": "Compile financial data and create reports for management.",
    "category": { "category": "Backoffice", "color": "#e27329" },
    "taskEmails": ["stefan@joinmail.com","friedrich@joinmail.com" ],
    "dueDate": "2023-05-31",
    "prio": "low",
    "subtasks": [
      {"title": "Gather financial data from relevant sources", "isCompleted": "true"},
      {"title": "Organize data and create financial reports", "isCompleted": "true"},
      {"title": "Review and finalize reports with management", "isCompleted": "true"}
    ],
    "status": 'awaitingFeedback'
  }

]

const priorityValues = {
  urgent: {
      color: '#FF3D00',
      text: 'Urgent',
      img: './Img/arrow-up-white.png'
  },
  medium: {
      color: '#FFA800',
      text: 'Medium',
      img: './Img/equal-white.png'
  },
  low: {
      color: '#7AE229',
      text: 'Low',
      img: './Img/arrow-down-white.png'
  }
};


let testContacts = [
  {
    'name': 'Jonas Jonasson',
    'email': 'jonas@joinmail.com',
    'phone': '+12345678',
    'avatarColor': 'blue'
  },
  {
    'name': 'Susane Weber',
    'email': 'susane@joinmail.com',
    'phone': '+23456712',
    'avatarColor': 'red'
  },
  {
    'name': 'Stefan Brijs',
    'email': 'stefan@joinmail.com',
    'phone': '+34561234',
    'avatarColor': 'yellow'
  },
  {
    'name': 'Alex Berger',
    'email': 'alex@joinmail.com',
    'phone': '+789567456',
    'avatarColor': 'gold'
  },
  {
    'name': 'Martin Südberg',
    'email': 'martin@joinmail.com',
    'phone': '+98764567',
    'avatarColor': 'hell-blue'
  },
  {
    'name': 'Gonnsalo Martines',
    'email': 'gonsalo@joinmail.com',
    'phone': '+1324364758',
    'avatarColor': 'green'
  },
  {
    'name': 'Friedrich Schultz',
    'email': 'friedrich@joinmail.com',
    'phone': '+888666555',
    'avatarColor': 'purple'
  },
  {
    'name': 'Lynn Yo Pao',
    'email': 'lynn@joinmail.com',
    'phone': '+234345658',
    'avatarColor': 'orange'
  }
];


/*********************************************************************/
/* Users Data */
/*********************************************************************/

async function getUsers() {
    try {
      let usersFromServer = await getItem('usersData');
      let usersArray = usersFromServer['data']['value'];
      let replacedDataUsers = usersArray.replace(/'/g, '"'); // Replace ""
      let parsedUsers = await JSON.parse(replacedDataUsers);
      console.log(parsedUsers);
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