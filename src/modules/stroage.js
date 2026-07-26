import { state } from "./state.js";
import { projectManager } from "./project.js";
import { todoManager } from "./todo.js";


export function savestate(){

  localStorage.setItem("localStore",JSON.stringify(state));
}
function loadstate(){
  return JSON.parse(localStorage.getItem("localStore"));
}

function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

export function initializeStroage(){
  if (storageAvailable("localStorage")) {
    // Yippee! We can use localStorage awesomeness
    const savedstate = loadstate();
    if(savedstate){

      state.projects = savedstate.projects.map(savedproject=>{
    
        const project = projectManager.createLocalProject( savedproject.name,savedproject.id);
        project.todos = savedproject.todos.map( savedTodo => todoManager.createLocalTodo(savedTodo) );

        return project;
      });
      state.selectedProjectId = savedstate.selectedProjectId ;
      return true;
    }
    return false;
  } else {
    // Too bad, no localStorage for us
    alert("Sorry but this browser does not have any localStroage...");
    return false;
  }
}
