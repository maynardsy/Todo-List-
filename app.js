const addBtn = document.getElementById('addBtn'); 
const clearBtn = document.getElementById('clearBtn'); 
const ul = document.getElementById('collection'); 
const todoInput = document.getElementById('myInput');
 
// Add List Items
addBtn.addEventListener('click', addTodo); 

function addTodo(){
  if(todoInput.value === ""){
    alert("Please add a Todo"); 
  }else{
    const li = document.createElement("li"); 
    li.className = "collection-item"; 
    const liText = document.createTextNode(todoInput.value); 
    li.appendChild(liText); 
    const link = document.createElement('a'); 
    link.className = "delete-item"; 
    link.innerHTML = '<i class="fas fa-trash-alt trash"></i>'; 
    li.appendChild(link); 
    ul.appendChild(li);

    // Store Local Storage
    storeTodoInLocalStorage(todoInput.value); 

    // Clear Input 
    todoInput.value = "";
  }
}

// Add Todos with Enter Key 

todoInput.addEventListener('keypress', function(e){
  if(e.keyCode === 13){
    addTodo();  
  }
})


// Get Todos from Local Storage

document.addEventListener('DOMContentLoaded', getTodos); 

function getTodos(){
  let todos; 
  if(localStorage.getItem('todos') === null){
      todos = []; 
  }else{
    todos = JSON.parse(localStorage.getItem('todos')); 
  }

  todos.forEach(function(todo){
    const li = document.createElement("li"); 
    li.className = "collection-item"; 
    const liText = document.createTextNode(todo); 
    li.appendChild(liText); 
    const link = document.createElement('a'); 
    link.className = "delete-item"; 
    link.innerHTML = '<i class="fas fa-trash-alt"></i>'; 
    li.appendChild(link); 
    ul.appendChild(li);
  }); 

}



function storeTodoInLocalStorage(todo){
  let todos; 
  if(localStorage.getItem('todos') === null){
      todos = []; 
  }else{
    todos = JSON.parse(localStorage.getItem('todos')); 
  }

    todos.push(todo); 

    localStorage.setItem('todos', JSON.stringify(todos)); 
}




// Delete List Items
ul.addEventListener('click', removeTodo); 
function removeTodo(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    e.target.parentElement.parentElement.remove(); 

    // Remove from Local Storage 
    removeTodoFromLocalStorage(e.target.parentElement.parentElement); 
  }
}

// Remove from Local Storage 
function removeTodoFromLocalStorage(todoItem){
  let todos; 
  if(localStorage.getItem('todos') === null){
      todos = []; 
  }else{
    todos = JSON.parse(localStorage.getItem('todos')); 
  }
  todos.forEach(function(todo, index){
    if(todoItem.textContent === todo){
      todos.splice(index, 1); 
    }
  }); 
  localStorage.setItem('todos', JSON.stringify(todos)); 
}

// Clear List Items 
clearBtn.addEventListener('click', function(){
    ul.innerHTML = ''; 

    // Clear Local Storage 
  clearTodosFromLocalStorage(); 

  function clearTodosFromLocalStorage(){
    localStorage.clear(); 
  }

})


