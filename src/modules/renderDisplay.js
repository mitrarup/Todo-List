import { state } from "./state.js"
import calenderImage from "../assets/todoItem/calendar.svg";
import deleteImage from "../assets/todoItem/delete.svg";
import editImage from "../assets/todoItem/edit.svg";
import seeMoreImage from "../assets/todoItem/seeMore.svg";

const projectContainer = document.querySelector(".projectContainer");
const container = document.querySelector(".container");

export function renderTodos( uid = state.selectedProjectId ){
    const project = state.projects.find( project => project.id == uid);
    if( project != null){
        // clean the page
        container.innerHTML= "";
    }
    project.todos.forEach(element => {
        const priority = element.priority;
        const todo = document.createElement("div");
        todo.classList.add("todo");
        todo.id = element.id ;
        todo.classList.add( priority );

        let div = document.createElement("div");
        let myinput = document.createElement("input");
        myinput.type= "checkbox";
        myinput.classList.add("task_check");
        // CHECK IF CHECKBOX CHECKED OR NOT
        // if( element.checklist == true){
        // }
        div.appendChild( myinput );
        let temp = document.createElement("h3");
        temp.innerHTML = element.title ;
        div.appendChild(temp);
        todo.appendChild( div );
        
        div = document.createElement("div");

        temp = document.createElement("h4");
        temp.classList.add( priority + "_btn");
        temp.innerText= priority.toUpperCase();
        div.appendChild(temp);

        let div1 = document.createElement("div");
        div1.classList.add("deadline");
        temp = document.createElement("img");
        temp.src = calenderImage;
        temp.alt="calendar icon";
        div1.appendChild( temp );
        temp = document.createElement("span");
        temp.innerText= element.duedate ;
        div1.appendChild( temp );
        div.appendChild( div1 );
        
        div1 = document.createElement("div");
        div1.classList.add("todo_icons");
        temp = document.createElement("img");
        temp.src = seeMoreImage;
        temp.classList.add("details_btn");
        temp.alt="See more icon";
        div1.appendChild( temp );
        temp = document.createElement("img");
        temp.src = editImage;
        temp.classList.add("edit_btn");
        temp.alt="Edit icon";
        div1.appendChild( temp );
        temp = document.createElement("img");
        temp.src = deleteImage;
        temp.classList.add("delete_btn");
        temp.alt="Delete icon";
        div1.appendChild( temp );
        div.appendChild( div1 );
        
        todo.appendChild( div );

        div = document.createElement("div");
        div.classList.add("show");
        div.classList.add("hidden");
        temp = document.createElement("h4");
        temp.innerText = "Description :";
        div.appendChild( temp );
        temp = document.createElement("h5");
        temp.innerText = element.description;
        div.appendChild( temp );
        
        todo.appendChild( div );
        
        container.appendChild( todo );
    });
}
export function renderProjects(){
    projectContainer.innerHTML = "";
    state.projects.forEach( (project)=>{
        let div = document.createElement("div");
        div.id = project.id ;
        div.classList.add("project");
        
        let temp = document.createElement("div");
        div.appendChild( temp );
        temp = document.createElement("h4");
        temp.innerText = project.name;
        div.appendChild( temp );

        projectContainer.appendChild( div );
    })
}