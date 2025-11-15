import { useDispatch, useSelector } from "react-redux";
import { setFilterMode } from "../slice/tasksSlice";

const Side = () => {
  const filterMode = useSelector((state) => state.tasks.filterMode);

  const dispatch = useDispatch();

  const TABS = [
    { mode: "all", label: "All" },
    { mode: "completed", label: "Completed" },
    { mode: "upcoming", label: "Upcoming" },
  ];
  return (
    <div className="sidebar">
      {TABS.map((tab) => (
        <button
          className={`tab-button ${
            tab.mode === filterMode ? "selected" : "teritrary"
          }`}
          onClick={() => {
            dispatch(setFilterMode({ filterMode: tab.mode }));
          }}
          key={tab.mode}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Side;
