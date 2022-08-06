import styles from "./Radios.module.css";
import { todoActions } from "../../redux/todoSlice";
import { useDispatch } from "react-redux";
const Radios = () => {
  const dispatch = useDispatch();

  const radioFilter = (e) => {
    switch (e.target.value) {
      case "All":
        dispatch(todoActions.showAll());
        break;
      case "Active":
        dispatch(todoActions.showActive());
        break;
      case "Completed":
        dispatch(todoActions.showCompleted());
        break;
      default:
        return null;
    }
  };

  return (
    <div className={styles.radioDiv} onChange={radioFilter}>
      <div>
        <input type="radio" name="todo_radio" value="All" defaultChecked />
        <label htmlFor="html">All</label>
      </div>
      <div>
        <input type="radio" name="todo_radio" value="Active" />
        <label htmlFor="html">Active</label>
      </div>
      <div>
        <input type="radio" name="todo_radio" value="Completed" />
        <label htmlFor="html">Completed</label>
      </div>
    </div>
  );
};

export default Radios;
