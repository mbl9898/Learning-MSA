import React, { useState } from "react";

function CreateTask(props) {
  const [task, setTask] = useState({
    id: 0,
    title: "",
    description: "",
    isCompleted: false,
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setTask((prevTask) => {
      return {
        ...prevTask,
        [name]: value,
      };
    });
  }

  function submitTask(event) {
    props.onAdd(task);
    setTask({
      title: "",
      description: "",
    });
    event.preventDefault();
  }

  return (
    <div
      className="modal fade"
      id="exampleModal1"
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
                Create Tasks
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
                    Task Title
                  </span>
                </div>
                <input
                  name="title"
                  value={task.title}
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                ></input>
              </div>

              <div className="input-group-prepend">
                <span className="input-group-text">Task Description</span>
              </div>
              <textarea
                name="description"
                value={task.description}
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
                onClick={submitTask}
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
  );
}

export default CreateTask;
