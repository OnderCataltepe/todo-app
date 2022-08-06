/* eslint-disable react/prop-types */
import styles from "./Category.module.css";
import {
  faAngleDown,
  faAngleUp,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryAsync, todoActions } from "../../redux/todoSlice";

const Category = ({ setCategoryValue, categoryValue }) => {
  const [selectToggle, setSelectToggle] = useState(false);
  const categories = useSelector((state) => state.todos.category);
  const dispatch = useDispatch();

  const selectToggleHangler = () => {
    setSelectToggle((prev) => !prev);
  };

  const selectCategoryHandler = (e) => {
    setSelectToggle((prev) => !prev);
    setCategoryValue(e.target.innerText);
  };

  useEffect(() => {
    dispatch(getCategoryAsync("http://localhost:3004/category"));
  }, [dispatch]);

  return (
    <div
      className={styles.categoryDiv}
      tabIndex="0"
      onBlur={() => setSelectToggle(false)}
    >
      <div className={styles.inputDiv}>
        <input value={categoryValue} disabled />
        <FontAwesomeIcon
          icon={!selectToggle ? faAngleDown : faAngleUp}
          className={styles.dropDown}
          onClick={selectToggleHangler}
        />
      </div>
      {selectToggle && (
        <ul>
          <li onClick={selectCategoryHandler}>Select Category</li>
          {categories &&
            categories.map((item) => {
              return (
                <li onClick={selectCategoryHandler} key={item.id}>
                  {item.title}
                </li>
              );
            })}
          <li
            className={styles.addLi}
            onClick={() => dispatch(todoActions.categoryPortalToggle())}
          >
            Add Category{" "}
            <FontAwesomeIcon icon={faPlus} className={styles.addIcon} />
          </li>
        </ul>
      )}
    </div>
  );
};

export default Category;
