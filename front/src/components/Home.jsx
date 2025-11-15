import { useSelector } from "react-redux";
import Side from "./Side";
import MainContainer from "./MainContainer";

const Home = () => {
  const isAuth = useSelector((state) => state.user.isAuth);

  return (
    <div className="main-container">
      {isAuth && (
        <>
          <Side />
          <MainContainer />
        </>
      )}
      {!isAuth && (
        <>
          <h1>Unauthorized home</h1>
        </>
      )}
    </div>
  );
};

export default Home;
