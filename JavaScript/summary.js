let userIdLogIn;
userName = localStorage.getItem('userName');


async function loadSummary() {
    init();
    await getAllAppData()// load appData from Server
    // loadUserNameAndId();
    greet();
    await getTasks();
    checkWidth();
    showTimeOfTheDay();
    showNumbers();
    checkNummberOfTasks();
}



//es wird auf Board Seite weitergeleitet

function getToBoard() {
    window.location.href = "./board.html";
}


//userName aus Lokalstorage wird abgelesen und angezeigt

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
        document.getElementById('greet').innerHTML = 'Good Morning,';
        document.getElementById('greetMobile').innerHTML = 'Good Morning,';

    } else if (hour >= noon && hour <= afternoon) {
        document.getElementById('greet').innerHTML = 'Good Afternoon,';
        document.getElementById('greetMobile').innerHTML = 'Good Afternoon,';

    } else if (hour >= afternoon && hour <= evening) {  
        document.getElementById('greet').innerHTML = 'Good Evening,';
        document.getElementById('greetMobile').innerHTML = 'Good Evening,';
    }
    else if (hour >= evening && hour <= sunrise) {
        document.getElementById('greet').innerHTML = 'Good night,';
        document.getElementById('greetMobile').innerHTML = 'Good night,';
    }

}


// die Nummern werden aufgelistet

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


/////////////////To do nach Urgent suchen und anzeigen lassen//////////////

function searchForPrio() {
    let priority = tasks.filter(t => t['status'] == 'prio');
    document.getElementById('priorityNumber').innerHTML = `${priority.length}`;
}


// Animation in mobile Version


function checkWidth() {

    if (innerWidth < 550) {
        fadeOut();
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


/// in case Back Button has been clicked

