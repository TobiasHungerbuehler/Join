async function loadSummary() {
    init();
    await getTasks();
    showTimeOfTheDay();
    checkNummberOfTasks(); 
}

//die Zeit wird berechnet und der Guest wird demändsprechend begrüßt

function showTimeOfTheDay() {
    let hour = new Date().getHours();
    let sunrise = 5;
    let noon = 12;
    let afternoon = 18;
    let evening = 21;
    let midnight = 24;
    

    if (hour <= noon && hour >= sunrise) {   
        console.log('Its Morning');
        document.getElementById('greet').innerHTML = 'Good Morning,';
    
    } else if(hour >= noon && hour <= afternoon) { 
        console.log('Its Afternoon');
        document.getElementById('greet').innerHTML = 'Good Afternoon,';

    } else if(hour >= afternoon && hour <= evening) { 
        console.log('Its Evening');
        document.getElementById('greet').innerHTML = 'Good Evening,';
    }
    else if(hour >= evening && hour <= sunrise) { 
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