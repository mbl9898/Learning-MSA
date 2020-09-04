import React, { useState, useEffect } from "react";
import Create from "./create";
import ProjectNames from "./projectNames";
import TasksData from "./tasksData";
import { getProjects, updateProjects } from "../projectsDb";
import CreateTask from "./createTask";
import Header from "./header";
import UpdateProject from "./update";

function App() {
  const [curSelectedProj, setSelected] = useState([]);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [searchProject, setSearchProject] = useState("");
  const [searchTask, setSearchTask] = useState("");

  useEffect(() => {
    console.log("Fetching Project From Local Storage");
    const projs = getProjects();
    if (!projs) return;
    setProjects((prevProjects) => {
      return [...projs];
    });
  }, []);

  function addProject(newProject) {
    const arrayCheck = projects.length;
    let lastElementId = arrayCheck !== 0 ? projects[projects.length - 1].id : 0;
    // let lastElementId = 0;
    // if (arrayCheck !== 0) {
    //   lastElementId = projects[projects.length - 1].id;
    // }
    newProject.id = lastElementId + 1;
    newProject.tasks = [];
    setProjects((prevProjects) => {
      return [...prevProjects, newProject];
    });
    updateProjects([...projects, newProject]);
  }

  function addTask(task) {
    task.id = curSelectedProj.tasks.length + 1;
    setProjects((prev) => {
      prev.filter((x) => x.id === curSelectedProj.id)[0].tasks.push(task);
      return [...prev];
    });
    updateProjects([...projects]);
  }

  function displayTask(id) {
    const proj = projects.filter((x) => x.id === id)[0];
    setSelected((prev) => {
      setTasks(proj.tasks);
      return proj;
    });
  }

  function handleProjectSearch(keyword) {
    setSearchProject(() => {
      return keyword.toLowerCase();
    });
  }

  function handleTaskSearch(e) {
    const keyword = e.target.value;
    setSearchTask(() => {
      return keyword.toLowerCase();
    });
  }

  function handleDelete() {
    const updated = [...projects];
    const newUpdated = updated.filter((x) => x.id !== curSelectedProj.id);
    setProjects((prev) => {
      return [...newUpdated];
    });
    updateProjects([...newUpdated]);
    window.location.reload();
  }
  function handleProjectDelete(id) {
    const updated = [...projects];
    const newUpdated = updated.filter((x) => x.id !== id);
    setProjects((prev) => {
      return [...newUpdated];
    });
    updateProjects([...newUpdated]);
    window.location.reload();
  }

  function handleCheck(taskID, checkValue) {
    const updated = [...projects];
    updated
      .filter((x) => x.id === curSelectedProj.id)[0]
      .tasks.filter((x) => x.id === taskID)[0].isCompleted = checkValue;
    setProjects((prev) => {
      return [...updated];
    });
    updateProjects([...projects]);
  }

  function updateProject(update) {
    update.id = curSelectedProj.id;
    const _projects = [...projects];
    const projectId = curSelectedProj.id - 1;
    _projects[projectId] = update;
    setProjects(() => {
      return [..._projects];
    });
    updateProjects([..._projects]);
    window.location.reload();
  }

  return (
    <div className="App">
      <Header />
      <div className="container" style={{ maxWidth: "95vw" }}>
        <div className="row">
          <div className="col project-main">
            <Create onAdd={addProject} onSearch={handleProjectSearch} />

            <UpdateProject
              key={curSelectedProj.id}
              onUpdate={updateProject}
              data={curSelectedProj}
            />

            {projects
              .filter((x) =>
                searchProject.length
                  ? x.title.toLowerCase().includes(searchProject)
                  : true
              )
              .map((projectData, index) => {
                return (
                  <ProjectNames
                    key={index}
                    id={projectData.id}
                    title={projectData.title}
                    onClick={displayTask}
                    onDelete={handleProjectDelete}
                  />
                );
              })}
          </div>
          <div
            className="col breakdown-main"
            style={{ display: curSelectedProj.title ? "initial" : "" }}
          >
            <div className="taskHead">
              {curSelectedProj.title ? (
                <div className="projectHeadTitle">
                  <h2 className="taskHeadElements">Project: </h2>
                  <h3 className="taskHeadElements">{curSelectedProj.title}</h3>
                </div>
              ) : (
                ""
              )}

              {curSelectedProj.title ? (
                <form className="form-inline">
                  <input
                    className="form-control mr-sm-2 taskHeadElements"
                    type="search"
                    placeholder="Search Tasks"
                    aria-label="Search"
                    onChange={handleTaskSearch}
                  ></input>
                </form>
              ) : (
                ""
              )}

              {curSelectedProj.title ? (
                <div class="btn-group">
                  <button
                    class="btn btn-primary btn-sm dropdown-toggle taskHeadElements"
                    type="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Options
                  </button>
                  <div class="dropdown-menu">
                    <buttom
                      class="dropdown-item update-button"
                      id="update"
                      data-toggle="modal"
                      data-target="#exampleModal2"
                      // onClick={handleUpdate}
                    >
                      Update Project
                    </buttom>

                    <buttom
                      class="btn btn-danger dropdown-item "
                      onClick={handleDelete}
                    >
                      Delete Project
                    </buttom>
                  </div>
                </div>
              ) : (
                ""
              )}

              {curSelectedProj.title ? (
                <button
                  type="button"
                  className="btn btn-primary taskHeadElements"
                  data-toggle="modal"
                  data-target="#exampleModal1"
                >
                  Add Task
                </button>
              ) : (
                ""
              )}
            </div>
            <div className="taskBody">
              <h5>
                {curSelectedProj.description
                  ? "Description: " + curSelectedProj.description
                  : ""}
              </h5>
              <CreateTask onAdd={addTask} />
              <h3>Tasks:</h3>
              {tasks
                .filter((x) =>
                  searchTask.length
                    ? x.title.toLowerCase().includes(searchTask)
                    : true
                )
                .map((tasksData, index) => {
                  return (
                    <TasksData
                      key={index}
                      data={tasksData}
                      onChange={handleCheck}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
