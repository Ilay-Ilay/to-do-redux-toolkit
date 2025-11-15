import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { me } from "./thunk/userThunk";
import { getTasks } from "./thunk/tasksThunk";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
    dispatch(getTasks());
  }, []);

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
