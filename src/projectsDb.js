function updateProjects(projects) {
  localStorage.setItem("projects", JSON.stringify([...projects]));
}

function getProjects() {
  try {
    return JSON.parse(localStorage.getItem("projects"));
  } catch (ex) {
    return [];
  }
}

export { getProjects, updateProjects };
