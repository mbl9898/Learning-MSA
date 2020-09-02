import React, { useState } from "react";

function Create(props) {
  const [project, setProject] = useState({
    id: 0,
    title: "",
    description: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setProject((prevProject) => {
      return {
        ...prevProject,
        [name]: value,
      };
    });
  }
  // console.log(project);

  function submitProject(event) {
    props.onAdd(project);
    setProject({
      title: "",
      description: "",
    });
    event.preventDefault();
  }

  function handleSearch(e) {
    const search = e.target.value;
    props.onSearch(search);
  }

  return (
    <div>
      <div className="projectHead">
        <h1 className="projectHeadElements">Projects</h1>

        <form className="form-inline">
          <input
            className="form-control mr-sm-2 projectHeadElements"
            type="search"
            placeholder="Search Projects"
            aria-label="Search"
            onChange={handleSearch}
          ></input>
        </form>

        <button
          type="button"
          className="btn btn-primary projectHeadElements"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          Add
        </button>

        <div
          className="modal fade"
          id="exampleModal"
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
                    Create Project
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
                        Title
                      </span>
                    </div>
                    <input
                      name="title"
                      value={project.title}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-default"
                    ></input>
                  </div>

                  <div className="input-group-prepend">
                    <span className="input-group-text">Description</span>
                  </div>
                  <textarea
                    name="description"
                    value={project.description}
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
                    onClick={submitProject}
                    type="submit"
                    className="btn btn-primary"
                    data-dismiss="modal"
                  >
                    Create
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Create;
