import React, { useState } from "react";

function Update(props) {
  const [alert, setAlert] = useState(false);
  const [updateProject, setUpdateProject] = useState({
    id: 0,
    title: props.data.title,
    description: props.data.description,
    tasks: props.data.tasks,
  });

  function handleChange(event) {
    const { name, value } = event.target;
    console.log("name", name, "value", value);
    name === "title" && value === "" ? setAlert(true) : setAlert(false);

    setUpdateProject((prevProject) => {
      return {
        ...prevProject,
        [name]: value,
      };
    });
  }
  console.log(updateProject);

  function submitProject(event) {
    if (updateProject.title === "") {
      updateProject.title = props.data.title;
    }

    props.onUpdate(updateProject);
    setUpdateProject({
      title: "",
      description: "",
      tasks: props.data.tasks,
    });
    event.preventDefault();
  }

  return (
    <div>
      <div
        className="modal fade"
        id="exampleModal2"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <form>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Update Project
                </h5>

                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div className="modal-body">
                <div className="mb-3">
                  <div className="input-group-prepend">
                    <span
                      className="input-group-text"
                      id="inputGroup-sizing-default"
                    >
                      Project Title
                    </span>
                  </div>
                  <div className="titleInput">
                    <input
                      name="title"
                      defaultValue={props.data.title}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-default"
                    ></input>
                    {alert ? <p>Title can't be empty</p> : ""}
                  </div>
                </div>

                <div className="input-group-prepend">
                  <span className="input-group-text">Project Description</span>
                </div>
                <textarea
                  name="description"
                  defaultValue={props.data.description}
                  onChange={handleChange}
                  rows="5"
                  className="form-control"
                  aria-label="With textarea"
                ></textarea>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  id="updateButton"
                  onClick={submitProject}
                  type="button"
                  className="btn btn-primary"
                  data-dismiss="modal"
                >
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Update;
