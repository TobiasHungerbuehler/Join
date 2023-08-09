let userIdLogIn;
userName = localStorage.getItem('userName');


/**
 * loading data from server, 
 * initializes all neccesery functions in order for page to work 
 */

async function loadSummary() {
    init();
    await getAllAppData()// load appData from Server
    greet();
    await getTasks();
    checkWidth();
    showTimeOfTheDay();
    showNumbers();
}




/**
 * this function redirects to the board page
 */

function getToBoard() {
    window.location.href = "./board.html";
}


/**
 * this function gets the userName from localStorage und shows in both web and mobile Version the name of the current user
 */

function greet() {
    document.getElementById('visitor').innerHTML = `${userName}`;
    document.getElementById('visitorMobile').innerHTML = `${userName}`;
}


/**
 * this function is calculating what time of the day is and greeting the user depending on that time reference 
 */

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

/**
 * list of functions that are supposed to show the numbers of specific tasks 
 */

function showNumbers() {
    showNumberOfTasks()
    showNumberOfTodo();
    showNumberOfDoneTasks();
    showNumberOfAwaitingFeedback();
    showNumberOfTasksInProgress();
    showPriorityDate();
}



/**
 * this function is searcing for all Priority tasks and showing the result in specified format [month, day, year]
 */

function showPriorityDate() {
    let findPrio = tasks.filter(t => t['prio'] == 'urgent');
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



/**
 * this function transforms number of a month to a full name of the month
 * @param {*} monthNumber - month as a number 
 * @returns - the full name of month will be returned
 */

function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString('en-US', {
        month: 'long',
    });
}



/**
 * this function is showing the number of all tasks
 */

function showNumberOfTasks() {
    document.getElementById('numberOfTasks').innerHTML = `${tasks.length}`;
}


/**
 * this function is showing the number of all tasks marked as todo
 */

function showNumberOfTodo() {
    let todo = tasks.filter(t => t['status'] == 'toDo');
    document.getElementById('numberOfTodos').innerHTML = `${todo.length}`;
}


/**
 * this function is showing the number of all tasks marked as awaiting Feedback
 */
function showNumberOfAwaitingFeedback() {
    let feedback = tasks.filter(t => t['status'] == 'awaitingFeedback');
    document.getElementById('awaitingFeedback').innerHTML = `${feedback.length}`;
}


/**
 * this function is showing the number of all tasks marked as tasks in Progress
 */

function showNumberOfTasksInProgress() {
    let progress = tasks.filter(t => t['status'] == 'inProgress');
    document.getElementById('tasksInProgress').innerHTML = `${progress.length}`;
}



/**
 * this function is showing the number of all tasks marked as done tasks
 */
function showNumberOfDoneTasks() {
    let done = tasks.filter(t => t['status'] == 'done');
    document.getElementById('doneTasks').innerHTML = `${done.length}`;
}


/**
 * this function is searcing and showing the Priority task with the keyword Urgent
 */

function searchForPrio() {
    let priority = tasks.filter(t => t['status'] == 'prio');
    document.getElementById('priorityNumber').innerHTML = `${priority.length}`;
}


/////////////****  Animation in mobile Version***/////////////

/**
 * this function is showing or hiding the animation fade-out depending on a current width of screen
 */

function checkWidth() {
    if (innerWidth < 550) {
        fadeOut();
        setTimeout(removeOverlay, 6000);
    } else {
        removeOverlay();
    }
}

/**
 * this function is initialising the animation by adding the css class to sertain element
 */

function fadeOut() {
    document.getElementById('overlayContainer').classList.add('fade-out');
}


/**
 * this function removes the overlay over as a result of not showing the animation 
 */

function removeOverlay() {
    document.getElementById('overlayContainer').classList.add('d-none');
}


