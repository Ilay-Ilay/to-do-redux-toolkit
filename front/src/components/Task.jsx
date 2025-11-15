import { useDispatch } from "react-redux";
import { deleteTemp, editTemp } from "../slice/tasksSlice";
import { deleteTask, editTask } from "../thunk/tasksThunk";
import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { IoCheckbox, IoSquareOutline } from "react-icons/io5";

const Task = (props) => {
  const { name, status, id } = props;
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState(name);
  return (
    <div className="task row-between">
      <div className="task-data row-no-gap" onClick={() => {}}>
        <label
          className="checkbox-wrapper"
          onClick={() => {
            dispatch(editTemp({ name, id, status: !status }));
            dispatch(editTask({ name, id, status: !status }));
          }}
        >
          {status ? (
            <IoCheckbox className="icon" />
          ) : (
            <IoSquareOutline className="icon" />
          )}
        </label>

        <input
          type="text"
          className="task-input"
          value={taskName}
          onChange={(e) => {
            setTaskName(e.target.value);
            dispatch(editTemp({ name: taskName, id, status }));
            dispatch(editTask({ name: taskName, id, status }));
          }}
        />
      </div>
      <div className="task-controls row-gap-xs">
        <button
          className="button-secondary"
          onClick={() => {
            dispatch(deleteTemp({ id }));
            dispatch(deleteTask(props));
          }}
        >
          <FiTrash2 className="icon" />
        </button>
      </div>
    </div>
  );
};

export default Task;
