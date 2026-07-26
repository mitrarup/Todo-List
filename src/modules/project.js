import { state } from "./state.js";

class Project{
  constructor(name , uid = null){
    this.id = uid ?? crypto.randomUUID();
    this.name = name;
    this.todos = [];
  }
}
export const projectManager = ( ()=> {
  function createProject(name, uid = null){
    const project = new Project(name,uid);
    state.projects.push(project);

    state.selectedProjectId =  project.id;
  }
  function createLocalProject(name, uid = null){
    const project = new Project(name,uid);
    return project;
  }
  function deleteProject(uid = state.selectedProjectId){
    const index = state.projects.findIndex(project => project.id == uid);
    if(index !== -1){
        state.projects.splice(index,1);
    }
  }
  return { createProject,createLocalProject,deleteProject };
})()

