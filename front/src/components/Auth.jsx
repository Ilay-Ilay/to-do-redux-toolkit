import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { authorization } from "../thunk/userThunk";

const Auth = () => {
  const location = useLocation();

  const url = location.pathname;

  const dispatch = useDispatch();

  const [isRegistration, setIsRegisgtration] = useState(
    url === "/auth/register" ? true : false
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="container">
      <form
        action="submit"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(authorization({ email, password, isRegistration }));
        }}
        id="auth-form"
      >
        <h1>{isRegistration ? "Join" : "Welcome back"}</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
        />
        <button className="button-primary" type="submit">
          {isRegistration ? "Register" : "Login"}
        </button>
        <div className="row-gap">
          <p>
            {isRegistration
              ? "Already have an account"
              : "Don't have an account"}
          </p>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsRegisgtration(!isRegistration);
            }}
            className="button-tertiary underline"
          >
            {isRegistration ? "Login" : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Auth;
