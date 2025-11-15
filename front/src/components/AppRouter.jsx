import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Home from "./Home";
import Auth from "./Auth";

const AppRouter = () => {
  const isAuth = useSelector((state) => state.user.isAuth);

  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/auth/login"
        element={isAuth ? <Navigate to="/" replace /> : <Auth />}
      />
      <Route
        path="/auth/register"
        element={isAuth ? <Navigate to="/" replace /> : <Auth />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;
