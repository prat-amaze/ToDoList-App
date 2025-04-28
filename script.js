let add= document.getElementById("addTask")
let form= document.querySelector(".form")
let what= document.getElementById("what")
let when= document.getElementById("when")
let time= document.getElementById("time")
let submit= document.querySelector(".submit")
let checkboxes;
// let taskKeys= {}
// let taskObj= {}

function displayTasks() {
    let tasks = document.getElementById("tasks");
    tasks.innerHTML = "";

    let tasksArray = [];

    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i); 
        let value = JSON.parse(localStorage.getItem(key));
        let date = new Date(key);

        if (date instanceof Date && !isNaN(date)) {
            tasksArray.push({ key: key, value: value });
        }
    }

    tasksArray.sort((a, b) => {
        let dateA = new Date(a.value.when);
        let dateB = new Date(b.value.when);
        return dateA - dateB;
    });

    for (let task of tasksArray) {
        let ele = document.createElement("div");
        ele.className = 'task';

        let taskContent = `${task.value.what}: ${task.value.when}`;

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "checkbox";
        checkbox.setAttribute('data-key', task.key);

        ele.innerHTML = taskContent + " ";
        ele.appendChild(checkbox);

        tasks.appendChild(ele);
    }

    let checkboxes = document.querySelectorAll('.checkbox');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("click", () => {
            let key = checkbox.getAttribute('data-key');
            localStorage.removeItem(key);
            checkbox.parentElement.remove();
        });
    });
}

displayTasks()


add.addEventListener("click", ()=>{
    form.style.display= "flex"
})

submit.addEventListener("click", () => {
    if (what.value == '' || when.value == '' || time.value == '') {
        alert("Enter all the values");
    } 
    else if (isNaN(new Date(when.value))) { // ✅ Correct validation
        alert("Enter day in proper order. Example: 18 March 2025");
    } 
    else {
        let obj = {
            "what": what.value,
            "when": when.value,
            "time": time.value
        };
        let objString = JSON.stringify(obj);
        let d = new Date();
        
        localStorage.setItem(d, objString);
        console.log(`${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}`, objString);
        form.style.display = "none";
    }

    displayTasks();
});

document.addEventListener("click", (event) => {
    if (form.style.display === "flex" && !form.contains(event.target) && event.target !== add) {
        form.style.display = "none";
    }
});





