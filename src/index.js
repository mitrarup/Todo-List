import "./style.css";
import {initializeStroage} from "./modules/stroage.js"
import { projectManager } from "./modules/project.js";
import { renderProjects,renderTodos } from "./modules/renderDisplay.js";
import "./modules/events.js"

 if (process.env.NODE_ENV !== 'production') {
   console.log('Looks like we are in development mode!');
 }
if( initializeStroage()){
  renderProjects();
  renderTodos();
}else{
  projectManager.createProject("Default");
  renderProjects();
}
