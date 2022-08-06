import styles from "./List.module.css";
import ListElement from "./ListElement";
import Error from "./Error";
import { useEffect } from "react";
import { getAsync, deleteCategoryAsync } from "../../redux/todoSlice";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./Loading";
const List = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.todos.isLoading);
  const error = useSelector((state) => state.todos.error);
  const isAll = useSelector((state) => state.todos.all);
  const isActive = useSelector((state) => state.todos.active);
  const isCompleted = useSelector((state) => state.todos.completed);
  const selCategory = useSelector((state) => state.todos.selectedCategory);

  const completedFilter = (list) => {
    if (isAll) {
      return list;
    }
    if (isActive) {
      return list.filter((item) => item.completed === false);
    }
    if (isCompleted) {
      return list.filter((item) => item.completed === true);
    }
  };

  const categoryFilter = (list) => {
    if (selCategory.title === "All") {
      return list;
    } else {
      return list.filter((item) => item.category === selCategory.title);
    }
  };

  const combineFilter = (state) => {
    let filteredElement = state.todos.list;
    filteredElement = completedFilter(filteredElement);
    filteredElement = categoryFilter(filteredElement);
    return filteredElement;
  };
  const todoList = useSelector(combineFilter);

  const removeCategoryHandler = () => {
    dispatch(deleteCategoryAsync(selCategory));
  };

  useEffect(() => {
    dispatch(getAsync("http://localhost:3004/todos"));
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className={styles.loadErrorContainer}>
        <Loading />
      </div>
    );
  }
  if (error) {
    return (
      <div className={styles.loadErrorContainer}>
        <Error errorMessage={error} />
      </div>
    );
  }

  return (
    <div className={styles.listContainer}>
      <h2>{selCategory.title} Tasks</h2>
      {todoList.length === 0 && (
        <div>
          <h3>There is no Task!</h3>
          {selCategory.title !== "All" && isAll && (
            <button
              className={styles.removeCategory}
              onClick={removeCategoryHandler}
            >
              Remove Category
            </button>
          )}
        </div>
      )}
      <ul>
        {todoList.length > 0 &&
          todoList.map((item) => {
            return <ListElement key={item.id} item={item} />;
          })}
      </ul>
    </div>
  );
};
export default List;
