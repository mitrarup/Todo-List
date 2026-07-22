import { state } from "./state.js";
import { projectManager } from "./project.js";
import { todoManager } from "./todo.js";
import { renderProjects,renderTodos } from "./renderDisplay.js";

const sidebar = document.querySelector(".sidebar");
const projectBtn = document.querySelector(".project_btn")
const projectInputContainer = document.querySelector(".projectInputContainer");
const projectInput = document.querySelector(".projectInput");
const container = document.querySelector(".container");

sidebar.addEventListener("click", (e)=>{
    // if any project
    if( e.target.classList.contains("project")){
        state.selectedProjectId = e.target.id ;
        renderTodos();
    }
})
// if add project button is clicked
projectBtn.addEventListener("click", (e)=>{
    
    projectInputContainer.classList.remove("hidden");
    projectInput.focus();
})
projectInputContainer.addEventListener("keydown", (e) => {

  if (e.key === "Enter" &&
      projectInput.value.trim() !== "") {

    projectManager.createProject( projectInput.value );

    renderProjects();
    renderTodos();
    projectInput.value = "";

    projectInputContainer.classList.add("hidden");
  }
});



//Taking dialog and form elements
const addTodoBtn = document.querySelector(".todo_btn");
const cancel = document.getElementById("cancel");
const dialog = document.getElementById("my_dialog");
const myForm = document.getElementById("myform");
let todoid ;

addTodoBtn.addEventListener("click", () => {
    dialog.showModal();
})
cancel.addEventListener("click", () => {
    dialog.close();
})

myForm.addEventListener("submit", function (event) {
    event.preventDefault();
    //mapping the form input values
    const title = myForm.querySelector('[name="title"]').value;
    const description = myForm.querySelector('[name="description"]').value;
    const priority = myForm.querySelector('[name="priority"]').value;
    const duedate = myForm.querySelector('[name="duedate"]').value;

    todoManager.createTodo( title,description,duedate,priority);
    dialog.close();
    myForm.reset();
    renderTodos();
});
const edit_cancel = document.getElementById("edit_cancel");
const edit_dialog = document.getElementById("my_edit_dialog");
const edit_myForm = document.getElementById("myedit_form");
edit_cancel.addEventListener("click", () => {
    edit_dialog.close();
})

edit_myForm.addEventListener("submit", function (event) {
    event.preventDefault();
    //mapping the form input values
    const title = edit_myForm.querySelector('[name="edit_title"]').value;
    const description = edit_myForm.querySelector('[name="edit_description"]').value;
    const priority = edit_myForm.querySelector('[name="edit_priority"]').value;
    const duedate = edit_myForm.querySelector('[name="edit_duedate"]').value;

    
    todoManager.editTodo( todoid,title,description,duedate,priority);
    edit_dialog.close();
    edit_myForm.reset();
    renderTodos();
});


container.addEventListener("click", (e)=>{
    if( e.target.classList.contains("details_btn")){
        // find the todo from dom
        let parent = e.target.closest(".todo");
        // find that todo object  
        let current_project = state.projects.find(project => project.id == state.selectedProjectId);
        let current_todo = current_project.todos.find(todo => todo.id == parent.id);
        //change hidden status
        current_todo.togglehidden();
        renderTodos();

    }
    //edit button
    if( e.target.classList.contains("edit_btn")){

        // find the todo from dom
        let parent = e.target.closest(".todo");
        todoid = parent.id;
        // find that todo object  
        let current_project = state.projects.find(project => project.id == state.selectedProjectId);
        let current_todo = current_project.todos.find(todo => todo.id == parent.id);
        // now assign the values in form elements
        edit_myForm.querySelector('[name="edit_title"]').value = current_todo.title;
        edit_myForm.querySelector('[name="edit_description"]').value = current_todo.description;
        edit_myForm.querySelector('[name="edit_priority"]').value = current_todo.priority;
        edit_myForm.querySelector('[name="edit_duedate"]').value = current_todo.duedate;
        edit_dialog.showModal();
    }
    // delete todo
    if( e.target.classList.contains("delete_btn")){
        // get the todo
        let parent = e.target.closest(".todo");
        // delete the todo
        todoManager.deleteTodo( parent.id );
        // update UI
        renderTodos();
    }
})