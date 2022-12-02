/*
  MVC
  1. MVC allow each section to only do one thing 
  2. Most Javascript framework are built MVC
*/

// Model Section
//Save and Retrieve
//If localStorage has a todos array ,then use it 
//Otherwise use the default array
let todos;

//Retrieve localStorage
const savedTodos=JSON.parse(localStorage.getItem('todos'));   //Convert back to array or to object(JSON.parse)
//Check if it's an array (Array.isArray())
if(Array.isArray(savedTodos)){
  todos=savedTodos;
}else{
  todos=[{
    title:'Get groceries',
    dueDate:'2021-01-06',
    id:'id1'
  },
  {
    title:'Wash car',
    dueDate:'2022-03-02',
    id:'id2'
  },
  {
    title:'Make dinner',
    dueDate:'2022-04-20',
    id:'id3'
  }];
}

render()

//Creates a todo
function createTodo(title,dueDate){
  const id =' ' + new Date().getTime();   //id is number,if want to be string add empty ' '
  todos.push({
    title:title,
    dueDate:dueDate,
    id:id
  });

  saveTodos();
}

//Deletes a todo 
function removeTodo(idToDelete){
  todos=todos.filter(function(todo){
    //If the id of this todo matches idToDelete , the return false
    //For everything else, return true
    if(todo.id===idToDelete){
      return false;
    }else{
      return true;
    }
  });

  saveTodos();
}

function saveTodos(){
  localStorage.setItem('todos',JSON.stringify(todos))
}

//Controller Section
function addTodo(){
  const textbox=document.getElementById('todo-title');
  const title=textbox.value;

  const datepicker=document.getElementById('date-picker');
  const dueDate=datepicker.value;
  createTodo(title,dueDate);
  render();
}
//Controller Section
function deleteTodo(event){
  const deleteButton=event.target;
  const idToDelete=deleteButton.id //idDelete is string
  removeTodo(idToDelete);
  render();
}

//View Section
function render(){
  //reset our list
  document.getElementById('todo-list').innerHTML='';

  todos.forEach(function (todo){
    const element=document.createElement('div');
    element.innerText=todo.title+" "+todo.dueDate;

    const deleteButton=document.createElement('button');
    deleteButton.innerText='Delete';
    deleteButton.style='margin-left:12px;';
    deleteButton.onclick=deleteTodo;
    deleteButton.id=todo.id;
    element.appendChild(deleteButton);

    const todolist=document.getElementById('todo-list');
    todolist.appendChild(element);
  });
}