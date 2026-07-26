import { state } from "./state.js";

class Project{
  constructor(name , uid = null){
    this.id = uid ?? crypto.randomUUID();
    this.name = name;
    this.todos = [];
  }
}
export const projectManager = ( ()=> {
  function createProject(name){
    const project = new Project(name);
    state.projects.push(project);

    state.selectedProjectId =  project.id;
  }
  function deleteProject(uid){
    const index = state.projects.findIndex(project => project.id == uid);
    if(index !== -1){
        state.projects.splice(index,1);
    }
  }
  return { createProject,deleteProject };
})()

// Default project
projectManager.createProject("Default");
