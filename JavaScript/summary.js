async function loadSummary() {
    init();
    await getTasks();
    showTimeOfTheDay();
    checkNummberOfTasks();
    showNumberOfTasks()
    showNumberOfTodo();
    showNumberOfDoneTasks();
    showNumberOfAwaitingFeedback();
    showNumberOfTasksInProgress();
}

function getToBoard() {
    window.location.href = "./board.html";
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

    } else if (hour >= noon && hour <= afternoon) {
        console.log('Its Afternoon');
        document.getElementById('greet').innerHTML = 'Good Afternoon,';

    } else if (hour >= afternoon && hour <= evening) {
        console.log('Its Evening');
        document.getElementById('greet').innerHTML = 'Good Evening,';
    }
    else if (hour >= evening && hour <= sunrise) {
        console.log('Its night');
        document.getElementById('greet').innerHTML = 'Good night,';
    }

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

function searchForPrio() {
    let priority = tasks.filter(t => t['status'] == 'prio');
    document.getElementById('priorityNumber').innerHTML = `${priority.length}`;
}
tasks['prio']
tasks['dueDate']

