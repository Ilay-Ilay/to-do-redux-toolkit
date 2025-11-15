import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { closeModal } from "../slice/modalSlice";
import { addTemp } from "../slice/tasksSlice";
import { addTask } from "../thunk/tasksThunk";

const Modal = () => {
  const { isOpen, modalType, modalProps } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  if (!isOpen) return null;

  const MODALS = {
    addTask: AddTaskModal,
  };

  const SelectedModalComponent = MODALS[modalType];

  if (!SelectedModalComponent) return null;

  return createPortal(
    <div
      className="modal-overlay"
      onClick={(e) => {
        dispatch(closeModal());
      }}
    >
      <SelectedModalComponent {...modalProps} />
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;

const AddTaskModal = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <form
      action="submit"
      className="modal"
      onClick={(e) => e.stopPropagation()}
      onSubmit={(e) => {
        const tempId = Date.now();
        e.preventDefault();
        dispatch(addTemp({ name, tempId }));
        dispatch(addTask({ name, tempId }));
        dispatch(closeModal());
      }}
    >
      <div className="column-md modal-content">
        <div className="column-xs">
          <input
            ref={inputRef}
            className="input-xl"
            placeholder="New task"
            type="text"
            id="add-task-input"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="modal-controls">
          <button
            type="button"
            className="button-secondary"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(closeModal());
            }}
          >
            Cancel
          </button>
          <button type="submit" className="button-primary">
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
