let userName;
let userIdLogIn;


async function loadSummary() {
    // loadIdFromLocalStorage();
    // appData = await getAllAppData();
    await getAllAppData()// load appData from Server
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
        userName = location.href.split('=')[1].replace("%20", " ");
        userIdLogIn = location.href.split('?')[1];
        console.log('Ergebniss ist ', userName, userIdLogIn);
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
    showPriorityDate();
}

// function, die über Tasks Array itteriert

function checkNummberOfTasks() {
    for (let i = 0; i < tasks.length; i++) {
        const element = tasks[i];
        console.log(element);
    }
}

/////////  Priority Task mit Urgent wird gesucht und angezeigt    ///////

function showPriorityDate() {

    let findPrio = tasks.filter(t => t['prio'] == 'urgent');
   ' debugger;'
   document.getElementById('urgentTaskNum').innerHTML = findPrio.length;
    if (findPrio.length > 0) {
        let priority = findPrio[0]['dueDate'].split('-');  //  ['2023', '05', '01']
        let year = priority[0];
        let month = priority[1];
        let day = priority[2];
        document.getElementById('dateUrgent').innerHTML = `${getMonthName(month)} ${day}, ${year}`;
        console.log('The Date is', getMonthName(month), day, year);
    } else {
        document.getElementById('upcomingDeadline').innerHTML = 'No Upcoming Deadline';
    }
}

function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString('en-US', {
        month: 'long',
    });
}

//////////     ********************    //////////////////////




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

    if (innerWidth < 550) {
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
