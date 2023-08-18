/*********************************************************************/
/* Demo Data */
/*********************************************************************/

/**
 * Example tasks used in demo.
 *
 * @type {Array<Object>}
 */
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
  }
]


/**
 * Example contacts used in demo.
 *
 * @type {Array<Object>}
 */
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

/**
 * Loads a new set of demo tasks to the server.
 *
 * @async
 * @function demoTaskToServer
 * @returns {Promise<void>} Promise object represents the completion of the task upload.
 */
async function demoTaskToServer() {
    console.log(appData)
    const userDataSet = appData.find(user => user.userId === userId);
    userDataSet.data.tasks = testTasks;
    let key = "appData";
    let value = appData;
    await setItem(key, value);
}


/**
 * Saves provisional test contacts for the current user to the server.
 *
 * @async
 * @function demoContactsToServer
 * @returns {Promise<void>} Promise object represents the completion of the contact upload.
 */
async function demoContactsToServer() {
    const userDataSet = appData.find(user => user.userId === userId);
    userDataSet.data.contacts = testContacts;
    let key = "appData";
    let value = appData;
    await setItem(key, value);
}



/**
 * Sets the AppData structure on the server.
 *
 * @async
 * @function newAppData
 * @returns {Promise<void>} Promise object represents the completion of the data structure update.
 */
async function newAppData() {
    let key = "appData";
    let value = basicAppData;
    await setItem(key, value);
}



/**
 * Basic AppData structure for demo.
 *
 * @type {Array<Object>}
 */
basicAppData = [
  {
    "userId": 11111,
    "data": {
      "tasks": [],
      "contacts": []
    }
  },
  {
    "userId": 22222,
    "data": {
      "tasks": [],
      "contacts": []
    }
  }
];