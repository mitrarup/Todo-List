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
    
    
    function deleteTodo(uid){
        const current_project = state.projects.find(project => project.id == state.selectedProjectId);
        current_project.todos =  current_project.todos.filter(todo => todo.id != uid);
    }

    return { createTodo,deleteTodo };
})()
// creating some todos
todoManager.createTodo("Stay Consistent","Have to stay consisted","22 MAY 2026","high");
todoManager.createTodo("DSA Lecture & Practice","Have to remain consistent","1st JUN 2026","medium");
todoManager.createTodo("Attend College Lectures","Need to increase the Attendence","17 JULY 2026","low");

