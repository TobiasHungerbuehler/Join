let userName;
let userIdLogIn;


async function loadSummary() {
    // loadIdFromLocalStorage();
    // appData = await getAllAppData();
    init();
    loadUserNameAndId();
    greet();
    await getTasks();
    checkWidth();
    showTimeOfTheDay();
    showNumbers();
    checkNummberOfTasks();
    

}

function getToBoard() {
    window.location.href = "./board.html";
}



/////////die Parameter aus Login seite werden aus Link übergenommen

function loadUserNameAndId() {
    // debugger;
    if (window.location.toString().includes("?=")) {
        userName = location.href.split('=')[1].replace("%20" , " ");
        userIdLogIn = location.href.split('?')[1];  
        console.log('Ergebniss ist ',userName, userIdLogIn);
    } else {
        console.log('loaded more than once')
    }
    
    
}

function greet() {
    document.getElementById('visitor').innerHTML = `${userName}`;
    document.getElementById('visitorMobile').innerHTML = `${userName}`;

}


//die Zeit wird berechnet und der Guest wird demändsprechend begrüßt

function showTimeOfTheDay() {
    let hour = new Date().getHours();
    let sunrise = 5;
    let noon = 12;
    let afternoon = 18;
    let evening = 21;
    let midnight = 24;


    if (hour < noon && hour > sunrise) {
        console.log('Its Morning');
        document.getElementById('greet').innerHTML = 'Good Morning,';
        document.getElementById('greetMobile').innerHTML = 'Good Morning,';

    } else if (hour >= noon && hour <= afternoon) {
        console.log('Its Afternoon');
        document.getElementById('greet').innerHTML = 'Good Afternoon,';
        document.getElementById('greetMobile').innerHTML = 'Good Afternoon,';

    } else if (hour >= afternoon && hour <= evening) {
        console.log('Its Evening');
        document.getElementById('greet').innerHTML = 'Good Evening,';
        document.getElementById('greetMobile').innerHTML = 'Good Evening,';
    }
    else if (hour >= evening && hour <= sunrise) {
        console.log('Its night');
        document.getElementById('greet').innerHTML = 'Good night,';
        document.getElementById('greetMobile').innerHTML = 'Good night,';
    }

}

function showNumbers() {
    showNumberOfTasks()
    showNumberOfTodo();
    showNumberOfDoneTasks();
    showNumberOfAwaitingFeedback();
    showNumberOfTasksInProgress();
}

// function, die über Tasks Array itteriert

function checkNummberOfTasks() {
    for (let i = 0; i < tasks.length; i++) {
        const element = tasks[i];
        console.log(element);
    }
}


function showNumberOfTasks() {
    document.getElementById('numberOfTasks').innerHTML = `${tasks.length}`;

}
function showNumberOfTodo() {
    let todo = tasks.filter(t => t['status'] == 'toDo');
    document.getElementById('numberOfTodos').innerHTML = `${todo.length}`;
}

function showNumberOfAwaitingFeedback() {
    let feedback = tasks.filter(t => t['status'] == 'awaitingFeedback');
    document.getElementById('awaitingFeedback').innerHTML = `${feedback.length}`;
}

function showNumberOfTasksInProgress() {
    let progress = tasks.filter(t => t['status'] == 'inProgress');
    document.getElementById('tasksInProgress').innerHTML = `${progress.length}`;
}

function showNumberOfDoneTasks() {
    let done = tasks.filter(t => t['status'] == 'done');
    document.getElementById('doneTasks').innerHTML = `${done.length}`;
}

// function findAndAssignCategory(i) {
//     let element = tasks[i]['status'];
//     if (element == 'todo') {
//         document.getElementById('numberOfTodos').innerHTML = `${element.length}`; 
//     } else  if (element == 'awaitingFeedback') {
//         document.getElementById('awaitingFeedback').innerHTML = `${element.length}`; 
//     } else  if (element == 'inProgress') {
//         document.getElementById('tasksInProgress').innerHTML = `${element.length}`; 
//     } else  if (element == 'done') {
//         document.getElementById('doneTasks').innerHTML = `${element.length}`; 
//     }
// }


/////////////////To do nach Urgent suchen und anzeigen lassen//////////////
function searchForPrio() {
    let priority = tasks.filter(t => t['status'] == 'prio');
    console.log(priority);
    document.getElementById('priorityNumber').innerHTML = `${priority.length}`;
}

// tasks['prio']
// tasks['dueDate']


// Animation in mobile Version


function checkWidth() {

    if(innerWidth < 550){
       fadeOut();
       console.log(innerWidth);
       setTimeout(removeOverlay, 6000);
    } else {
        removeOverlay();
    }
   
}

function fadeOut() {
    document.getElementById('overlayContainer').classList.add('fade-out');
}

function removeOverlay() {
    document.getElementById('overlayContainer').classList.add('d-none');
}
