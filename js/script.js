// SELECTORS
const input = document.querySelector('.input');
const addButton = document.querySelector('.addButton');
const todoList = document.querySelector('.todoList');

// EVENT LISTENERS
document.addEventListener('DOMContentLoaded', getTodos);
addButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
// FUNCTIONS
// CHECK THE INPUT FIELD
function validateForm() {
  var x = input.value;
  if (x == "") {
    return false
  }
  return true;
}

// ADD TODO FUNCTION
function addTodo() {
    if(validateForm() === true)
    
    {

    // CREATE A CONTAINER FOR NEW TODO
    const newTodo = document.createElement('div');
    newTodo.classList.add('newTodo');
    // CREATE A LIST NODE
    const list = document.createElement('li');
    list.classList.add('todo-list');
    // GET THE VALUE ENTERED
    const value = input.value;

    // SET THE VALUE 
    list.innerHTML = value;
     saveTodo(input.value);
    // COMPLETED TODO
    const completedTodo = document.createElement('button');
    completedTodo.classList.add('completedTodo');
    completedTodo.classList.add('btn');
    completedTodo.innerHTML = '<i class="fas fa-check"></i>';

    // DELETE TODO
    const deleteTodo = document.createElement('button');
    deleteTodo.classList.add('deleteTodo');
    deleteTodo.classList.add('btn');
    deleteTodo.innerHTML = '<i class="fas fa-trash"></i>';


    // APPEND COMPLETED AND DELETE TODO TO THE LI NODE
   
    // APPEND ALL TODO TO UL 
    newTodo.appendChild(list);
    newTodo.appendChild(completedTodo);
    newTodo.appendChild(deleteTodo);

    todoList.appendChild(newTodo);

    input.value = "";
    }
}


// DELETE TODO FUNCTION
function deleteCheck(event) {
    const target = event.target;
    // IF TARGET MATCHES WITH DELETE BUTTON
    if(target.classList[0] == 'deleteTodo')
    { 
         deleteTodo(target);
        // ADD CLASS TO THE PARENT THAT IS NEWTODO
        target.parentElement.classList.add('deleted');
        // EXECUTE THE CODE ONLY AFTER THE CSS TRANSITION HAS COMPLETED
       
        target.parentElement.addEventListener("transitionend", () => {
            target.parentElement.remove();
        })

        
    }
    // IF TARGET MATCHES WITH COMPLETE  BUTTON
    if(target.classList[0] == 'completedTodo')
    {
        // ADD CLASS TO THE PARENT THAT IS NEWTODO
        target.parentElement.classList.add('completed')
    }
}

// SAVE THE TODOS TO LOCAL STORAGE FUNCTION
function saveTodo(value) {
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    }
    else  {
    todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(value);
    localStorage.setItem("todos", JSON.stringify(todos));
}
function deleteTodo(targets){
    todos = JSON.parse(localStorage.getItem("todos"));
    todos.forEach((todo, index) => {
        console.log(targets.parentElement.firstElementChild.innerHTML)
        if(targets.parentElement.firstElementChild.innerHTML === todo) {
            todos.splice(index, 1);
            localStorage.setItem("todos", JSON.stringify(todos));
            
        }

    })
}
function getTodos() {
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    }
    else  {
    todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach( todo => {
         const newTodo = document.createElement('div');
    newTodo.classList.add('newTodo');
    // CREATE A LIST NODE
    const list = document.createElement('li');
    list.classList.add('todo-list');
    // GET THE VALUE ENTERED

    // SET THE VALUE 
    list.innerHTML = todo;
    // COMPLETED TODO
    const completedTodo = document.createElement('button');
    completedTodo.classList.add('completedTodo');
    completedTodo.classList.add('btn');
    completedTodo.innerHTML = '<i class="fas fa-check"></i>';

    // DELETE TODO
    const deleteTodo = document.createElement('button');
    deleteTodo.classList.add('deleteTodo');
    deleteTodo.classList.add('btn');
    deleteTodo.innerHTML = '<i class="fas fa-trash"></i>';


    // APPEND COMPLETED AND DELETE TODO TO THE LI NODE
   
    // APPEND ALL TODO TO UL 
    newTodo.appendChild(list);
    newTodo.appendChild(completedTodo);
    newTodo.appendChild(deleteTodo);

    todoList.appendChild(newTodo);

    });

}
