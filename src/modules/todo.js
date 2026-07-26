import { state } from "./state.js";

class Todo {
  constructor( data ){
      this.id = data.id ?? crypto.randomUUID();
      this.title = data.title;
      this.description = data.description;
      this.duedate = data.duedate;
      this.priority = data.priority;
      this.checklist =data.checklist ?? false;
      this.hidden = data.hidden ??  true;
    }
    togglehidden(){
        this.hidden= !this.hidden;
    }
    toggleStatus() {
        this.checklist = !this.checklist;
    }
 }
 export const todoManager = (  ()=> {
    
     function createTodo(data){
        //get the current project through state.selectedProjectId from state.js
        const current_project = state.projects.find(project => project.id == state.selectedProjectId);
        const newtodo = new Todo(data);

        current_project.todos.push(newtodo);
    }
    function createLocalTodo(data){
        const newtodo = new Todo(data);

        return newtodo;
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

    return { createTodo,createLocalTodo,editTodo,deleteTodo };
})()
