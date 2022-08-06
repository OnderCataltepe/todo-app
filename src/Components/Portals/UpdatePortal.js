/* eslint-disable react/prop-types */
import ReactDOM from "react-dom";
import styles from "./UpdatePortal.module.css";
import { useDispatch } from "react-redux";
import { patchTitleAsync } from "../../redux/todoSlice";
import React, { useState } from "react";
const UpdatePortal = ({ item, setIsUpdateOpen, isUpdateOpen }) => {
  const [emptyWarning, setEmptyWarning] = useState(false);
  const [inputValue, setInputValue] = useState(item.title);
  const dispatch = useDispatch();
  const cancelHandler = () => {
    setEmptyWarning(false);
    setIsUpdateOpen(false);
  };
  const submitHandler = () => {
    if (inputValue.trim().length > 0) {
      dispatch(patchTitleAsync({ id: item.id, title: inputValue }));
      setEmptyWarning(false);
      setIsUpdateOpen(false);
    }
    if (inputValue.trim().length === 0) {
      setEmptyWarning(true);
    }
  };

  if (!isUpdateOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className={styles.bgContainer}>
      <div className={styles.cardContainer}>
        <form onSubmit={submitHandler}>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div className={styles.buttonDiv}>
            <button type="button" onClick={cancelHandler}>
              Cancel
            </button>
            <button type="submit">Update</button>
          </div>
        </form>
        {emptyWarning && <p>Please fill out this field.</p>}
      </div>
    </div>,
    document.body
  );
};

export default UpdatePortal;
