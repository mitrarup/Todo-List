import { state } from "./state.js";
import "./project.js"

class Todo {
  constructor(title,description,duedate,priority){
      this.id = crypto.randomUUID();
      this.title = title;
      this.description = description;
      this.duedate = duedate;
      this.priority = priority;
      this.checklist = false;
      this.hidden = true;
    }
    togglehidden(){
        this.hidden= !this.hidden;
    }
    toggleStatus() {
        this.checklist = !this.checklist;
    }
 }
 export const todoManager = (  ()=> {
    
     function createTodo(title,description,duedate,priority){
        //get the current project through state.selectedProjectId from state.js
        const current_project = state.projects.find(project => project.id == state.selectedProjectId);
        const newtodo = new Todo(title,description,duedate,priority);
        console.log(current_project);
        current_project.todos.push(newtodo);
    }
    
    function editTodo( todoid,title,description,duedate,priority){
        let current_project = state.projects.find(project => project.id == state.selectedProjectId);
        let current_todo = current_project.todos.find(todo => todo.id == todoid );
        current_todo.title = title;
        current_todo.description = description;
        current_todo.duedate = duedate;
        current_todo.priority = priority;
    }
    function deleteTodo(uid){
        const current_project = state.projects.find(project => project.id == state.selectedProjectId);
        current_project.todos =  current_project.todos.filter(todo => todo.id != uid);
    }

    return { createTodo,editTodo,deleteTodo };
})()
// creating some todos
todoManager.createTodo("Stay Consistent","Have to stay consisted","2026-05-22","high");
todoManager.createTodo("DSA Lecture & Practice","Have to remain consistent","2026-06-08","medium");
todoManager.createTodo("Attend College Lectures","Need to increase the Attendence","2026-07-22","low");

