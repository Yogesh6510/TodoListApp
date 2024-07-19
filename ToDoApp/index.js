console.log("welcome to my todo app");

let todos=[];

const todoDataList=document.getElementById("todo-data-list");
const saveButton=document.getElementById("save-todo");
const todoInputBar=document.getElementById("todo-input-bar");
const getPendingTodosButton=document.getElementById("get-todos");

getPendingTodosButton.addEventListener("click", ()=>{
  todos=todos.filter((todo)=> todo.status != "Finished");
  reRenderTodos();
})

todoInputBar.addEventListener("keyup", function toggleSaveButton() {
  let todotext=todoInputBar.value;
  console.log(todotext);
  if(todotext.length===0){
    if(saveButton.classList.contains("disabled")) return;
    saveButton.classList.add("disabled");
  }
  else if(saveButton.classList.contains("disabled")){
   saveButton.classList.remove("disabled");
  } 
});

saveButton.addEventListener("click", function getTextAndAddTodo() {
let todotext=todoInputBar.value;
if(todotext.length===0) return;
let todo={text: todotext, status: 'In progress', finishButtontext:'Finished'};
todos.push(todo);
addTodo(todo,todos.length);
todoInputBar.value='';

});
function reRenderTodos(){
  todoDataList.innerHTML='';
  todos.forEach((element, idx)=>{
   addTodo(element, idx+1);
  })
}
function removeTodo(event){
  // console.log("clicked", event.target.parentElement.parentElement.parentElement);
  // event.target.parentElement.parentElement.parentElement.remove();
  let deleteButtonPressed=event.target;
  let indexTobeRemoved=Number(deleteButtonPressed.getAttribute("todo-idx"));
  todos.splice(indexTobeRemoved, 1);
  todoDataList.innerHTML='';
  todos.forEach((element, idx)=>{
    addTodo(element,idx+1);
  })
 
}

function finishTodo(event){
  let finishButtonPressed=event.target;
  let indexToBeFinished=Number(finishButtonPressed.getAttribute("todo-idx"));
  if(todos[indexToBeFinished].status=="Finished"){
    todos[indexToBeFinished].status="In progress";
    todos[indexToBeFinished].finishButtontext="Finished";
  }
  else{
    todos[indexToBeFinished].status="Finished";
    todos[indexToBeFinished].finishButtontext="Undo";
  }
  // todos[indexToBeFinished].status="Finished";
  // finishButtonPressed.textContent="Undo";
  todos.sort((a,b)=>{
    if(a.status=='Finished'){
      return 1;
    }
    return -1;
  });
  reRenderTodos();

}
function editTodo(event){
  let editButtonPressed=event.target;
  let indexToEdit=Number(editButtonPressed.getAttribute("todo-idx"));
  let detailDiv=document.querySelector(`div[todo-idx="${indexToEdit}"]`);
  let input=document.querySelector(`input[todo-idx="${indexToEdit}"]`);
  detailDiv.style.display="none";
  input.type="text";
  input.value=detailDiv.textContent;
}
function saveEdittedTodo(event){
  let input=event.target;
  let indexToEdit=Number(input.getAttribute("todo-idx"));
  let detailDiv=document.querySelector(`div[todo-idx="${indexToEdit}"]`);
  if(event.keyCode==13){
    detailDiv.textContent=input.value;
    detailDiv.style.display="block";
    input.value= '';
    input.type="hidden";
  }
}

function addTodo(todo,todoCount){
  const rowDiv=document.createElement('div');
  const todoItem=document.createElement('div');
  const todoNo=document.createElement('div');
  const todoDetail=document.createElement('div');
  const todoStatus=document.createElement('div');
  const todoAction=document.createElement('div');
  const deleteButton=document.createElement('button');
  const finishedButton=document.createElement('button');
  const editButton=document.createElement('button');
  const hiddenInput=document.createElement("input");
  const hr=document.createElement('hr');


  // deleteButton.addEventListener('click',function(e){
  //   removeTodo(event);
  // })

  //eding attributes
  finishedButton.setAttribute("todo-idx", todoCount-1);
  deleteButton.setAttribute("todo-idx",todoCount-1);
  editButton.setAttribute("todo-idx",todoCount-1);
  todoDetail.setAttribute("todo-idx",todoCount-1);
  hiddenInput.setAttribute("todo-idx",todoCount-1);
  hiddenInput.addEventListener("keypress", saveEdittedTodo);

  //adding listeners
  deleteButton.onclick=removeTodo;
  finishedButton.onclick=finishTodo;
  editButton.onclick=editTodo;
  hiddenInput.type="hidden"

  // adding classes 
  rowDiv.classList.add("row");
  todoItem.classList.add("todo-item","d-flex","flex-row", "justify-content-between", "align-items-center");
  todoNo.classList.add("todo-no");
  todoDetail.classList.add("todo-detail");
  todoStatus.classList.add("todo-status");
  todoAction.classList.add("todo-action","d-flex", "justify-content-start", "gap-2");
  deleteButton.classList.add("btn", "btn-danger","delete-todo");
  finishedButton.classList.add("btn", "btn-success","finish-todo");
  editButton.classList.add("btn", "btn-warning","edit-todo");
  hiddenInput.classList.add("form-control","todo-detail");


  // todoNo.textContent='1';
  // // let todoCount=1;
  todoNo.textContent=`${todoCount}.`;
  // // todoCount++;
  todoDetail.textContent=todo.text;
  todoStatus.textContent=todo.status;
  deleteButton.textContent='Delete';
  finishedButton.textContent=todo.finishButtontext;
  editButton.textContent="Edit";

  // creating the div on Dom  
  todoAction.appendChild(deleteButton);
  todoAction.appendChild(finishedButton);
  todoAction.appendChild(editButton);

  todoItem.appendChild(todoNo);
  todoItem.appendChild(todoDetail);
  todoItem.appendChild(hiddenInput);
  todoItem.appendChild(todoStatus);
  todoItem.appendChild(todoAction);

  rowDiv.appendChild(todoItem);
  rowDiv.appendChild(hr);

  todoDataList.appendChild(rowDiv);

}

// const gettodoButton=document.querySelector('.get-todo');

// gettodoButton.addEventListener('click',function(e){
//     console.log('clicked');
// });
