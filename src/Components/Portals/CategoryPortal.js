import ReactDOM from "react-dom";
import styles from "./CategoryPortal.module.css";
import { useSelector, useDispatch } from "react-redux";
import { postCategoryAsync, todoActions } from "../../redux/todoSlice";
import React, { useState } from "react";
const CategoryPortal = () => {
  const [inputValue, setInputValue] = useState("");
  const [emptyWarning, setEmptyWarning] = useState(false);
  const isCategoryOpen = useSelector((state) => state.todos.isCategoryPortal);
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (inputValue.trim().length > 0) {
      dispatch(todoActions.categoryPortalToggle());
      dispatch(postCategoryAsync({ name: "category", title: inputValue }));
      setEmptyWarning(false);
      setInputValue("");
    }
    if (inputValue.trim().length === 0) {
      setEmptyWarning(true);
    }
  };

  const cancelHandler = () => {
    setInputValue("");
    dispatch(todoActions.categoryPortalToggle());
    setEmptyWarning(false);
  };

  if (!isCategoryOpen) {
    return null;
  }
  return ReactDOM.createPortal(
    <div className={styles.bgContainer}>
      <div className={styles.cardContainer}>
        <form onSubmit={submitHandler}>
          <input
            placeholder="Add new category..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div className={styles.buttonDiv}>
            <button type="button" onClick={cancelHandler}>
              Cancel
            </button>
            <button type="submit">Add</button>
          </div>
        </form>
        {emptyWarning && <p>Please fill out this field.</p>}
      </div>
    </div>,
    document.body
  );
};

export default CategoryPortal;
