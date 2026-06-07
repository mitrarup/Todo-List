import "./style.css";
import { renderProjects,renderTodos } from "./modules/renderDisplay.js";
import "./modules/events.js"

 if (process.env.NODE_ENV !== 'production') {
   console.log('Looks like we are in development mode!');
 }


renderProjects();
renderTodos();