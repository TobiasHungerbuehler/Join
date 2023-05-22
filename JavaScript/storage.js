
/*********************************************************************/
/* Storage Main */
/*********************************************************************/

let testToken = 'VME58G2KX9RYXPBTN6UKEQ0E5HVP3P7Q5CR6TE8W';
const STORAGE_TOKEN = testToken; // hier das Token von Login übergeben
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


/*********************************************************************/
/* Add Task Remote Storage */
/*********************************************************************/

// Lade die Tasks von Server und speichere in "let task"
async function getTasks() {
  try {
    let dataSetFromServer = await getItem('userTasks');
    let tasksFromServer = dataSetFromServer['data']['value'];
    let replacedData = tasksFromServer.replace(/'/g, '"'); // Replace ""
    let parsedTasks = await JSON.parse(replacedData);
    console.log(parsedTasks)
    tasks = parsedTasks;
  } catch (error) {
    console.log('No Data Found:', error);
  }
}


// Save Tasks on Server
async function saveTasksOnServer() {
  let key = "userTasks";
  let value = tasks;
  await setItem(key, value);
  //await getTasks(); // automatishh wieder runterladen nach upload zu test
}

/// provisorische test task wieder auf server speichern 
async function testTaskToServer() {
  let key = "userTasks";
  let value = testTasks;
  await setItem(key, value);
}


// Test Tasks 
// TestTask auf Server speichern 
async function testTasksToServer() {
  let key = "userTasks";
  let value = testTasks;
  await setItem(key, value);
  //await getTasks(); // automatishh wieder runterladen nach upload zu test
}



let testTasks = [
  {
    "title": "Phone prospecting for new customers",
    "description": "Make calls to potential customers to identify new sales opportunities.",
    "category": { "category": "Sales", "color": "#29ABE2" },
    "taskEmails": ["jonas@joinmail.com", "susane@joinmail.com", "alex@joinmail.com"],
    "dueDate": "2023-05-18",
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
  }

]





/*********************************************************************/
/* Contacts */
/*********************************************************************/
//saving Contatcs on Server


async function saveContactsOnServer() {
  let key = "savedContacts";
  let value = contacts;
  await setItem(key, value);
  //await getContacts(); // automatisch wieder runterladen nach upload zu test
}

//Loading Contatcs from Server


async function getContacts() {
  try {
    let dataFromServer = await getItem('savedContacts');
    contactsFromServer = dataFromServer['data']['value'];
    let replacedData = contactsFromServer.replace(/'/g, '"'); // Replace ""
    let contactsAsJSON = await JSON.parse(replacedData);
    console.log(contactsAsJSON);
    contacts = contactsAsJSON;
  }
  catch (error) {
    console.log('No Data Found:', error);
  }
}

 let contacts = [];

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
