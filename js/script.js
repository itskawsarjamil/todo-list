console.log("connected");


const deleteTask = (id) => {

    const todos = JSON.parse(localStorage.getItem("todos"));
    const remaining = todos.filter(task =>task.id!=id);

    // console.log(remaining);
    localStorage.setItem("todos", JSON.stringify(remaining));

    render();
}

const doneTask=(id)=>{
    const todos = JSON.parse(localStorage.getItem("todos"));
    
    todos.forEach(task => {
        if(task.id==id)
        {
            task.complete=true;
            
        }
    });

    localStorage.setItem("todos", JSON.stringify(todos));

    render();
}

const render = () => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    console.log(todos);
    const ul = document.getElementById("todo-list");
    ul.textContent = "";
    if (todos && todos.length) {
        for (const task of todos) {
            const li = document.createElement("li");
            li.classList.add("border-b-1", "border-black", "p-2", "text-2xl", "flex", "justify-between");

            li.innerHTML = `
        <p>${task.text}</p>
        <div>
            <button onclick="deleteTask('${task.id}')" class="rounded-full bg-slate-500 p-2">X</button>
            <button onclick="doneTask('${task.id}')" class="rounded-full bg-orange-300 p-2 btn-sm">Done</button>
            
        </div>
        `;
            if (task.complete) {
                li.children[0].classList.add("line-through", "decoration-red-400", "decoration-solid", "decoration-3");

            }
            ul.appendChild(li);
        }
    }
    else {
        const li = document.createElement("li");
        li.classList.add("border-b-1", "border-black", "p-2", "text-2xl", "flex", "justify-between");
        li.innerHTML = `
            <p>No data Found</p>`;
        ul.appendChild(li);
    }
}


document.getElementById("add-todo").addEventListener("click", () => {
    const todoText = document.getElementById("todo-text").value;

    if (todoText.length) {
        document.getElementById("todo-text").value = "";
        const id = Math.random().toString(36).slice(2);

        let todos = JSON.parse(localStorage.getItem("todos"));


        if (!todos) {
            todos = [
                {
                    id,
                    text: todoText,
                    complete: false,
                }
            ];
            localStorage.setItem("todos", JSON.stringify(todos));

        }
        else {
            const finaltodos = [
                ...todos,
                {

                    id,
                    text: todoText,
                    complete: false,

                }
            ]
            localStorage.setItem("todos", JSON.stringify(finaltodos));
        }
        render();
    }
    else {
        alert("write task name");
    }
})

document.getElementById("clear-all").addEventListener("click", () => {
    localStorage.removeItem("todos");
    render();
})

render();