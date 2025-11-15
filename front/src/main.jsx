import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import Message from "./components/Message.jsx";
import Modal from "./components/Modal.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Modal />
    <Message />
    <App />
  </Provider>
);
