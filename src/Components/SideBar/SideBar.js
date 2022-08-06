import styles from "./SideBar.module.css";
//REDUX
import { useSelector, useDispatch } from "react-redux";
import { todoActions } from "../../redux/todoSlice";
//COMPONENTS
import Radios from "./Radios";
import CategoryFilter from "./CategoryFilter";

const SideBar = () => {
  const completedList = useSelector((state) =>
    state.todos.list.filter((item) => item.completed === true)
  );
  const dispatch = useDispatch();

  const clearCompletedHandler = () => {
    dispatch(todoActions.deletedItemHandler(completedList));
    dispatch(todoActions.portalToggle());
  };

  return (
    <div className={styles.sideContainer}>
      <Radios />
      <CategoryFilter />
      <button
        className={styles.clearCompletedButton}
        onClick={clearCompletedHandler}
      >
        Clear Completed
      </button>
    </div>
  );
};

export default SideBar;
