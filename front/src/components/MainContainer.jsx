import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../slice/modalSlice";
import Task from "./Task";

const MainContainer = () => {
  const { filterMode, tasks } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const filtered =
    filterMode === "completed"
      ? tasks.filter((t) => t.status)
      : filterMode === "upcoming"
      ? tasks.filter((t) => !t.status)
      : tasks;

  return (
    <main className="tasks-container">
      <div className="main-header row-between">
        <p>
          <strong>{filtered.length}</strong>{" "}
          {filtered.length === 1 ? " task" : " tasks"}
        </p>
        <button
          onClick={() => {
            dispatch(openModal({ modalType: "addTask", modalProps: {} }));
          }}
          className="button-primary"
        >
          Add task
        </button>
      </div>
      <div className="tasks">
        {filtered.map((task) => (
          <Task key={task.id} {...task} />
        ))}
      </div>
    </main>
  );
};

export default MainContainer;
