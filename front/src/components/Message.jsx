import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { closeMessage } from "../slice/messageSlice";

const Message = () => {
  const { messageType, messageText, isOpen } = useSelector(
    (state) => state.message
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      dispatch(closeMessage());
    }, 3000);

    return () => clearTimeout(timer);
  }, [isOpen, dispatch]);

  if (!isOpen) return null;

  return createPortal(
    <div className={`message ${messageType === "error" ? "error" : "success"}`}>
      {messageText}
    </div>,
    document.getElementById("message-root")
  );
};

export default Message;
