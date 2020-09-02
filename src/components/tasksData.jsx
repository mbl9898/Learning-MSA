import React from "react";

function TasksData(props) {
  function handleCheck(e) {
    const checkValue = e.target.checked;

    props.onChange(props.data.id, checkValue);
  }
  return (
    <div className="projectNames">
      <div className="taskItem">
        <div className="taskItemInternal">
          <div className="taskHeading">
            <h4
              style={{
                textDecoration: props.data.isCompleted ? "line-through" : "",
              }}
            >
              {props.data.title}
            </h4>

            <div class="form-check form-check-inline">
              <input
                checked={props.data.isCompleted}
                onChange={handleCheck}
                class="form-check-input"
                type="checkbox"
                id="inlineCheckbox1"
                value="option1"
              ></input>
              <label class="form-check-label" for="inlineCheckbox1">
                Completed
              </label>
            </div>
          </div>
          <p
            style={{
              textDecoration: props.data.isCompleted ? "line-through" : "",
              marginBottom: 0,
            }}
          >
            {props.data.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TasksData;
