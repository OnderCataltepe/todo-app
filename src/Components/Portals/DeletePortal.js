import ReactDOM from "react-dom";
import styles from "./DeletePortal.module.css";
import { useSelector, useDispatch } from "react-redux";
import { deleteAsync, deleteCompletedAsync, todoActions } from "../../redux/todoSlice";

const DeletePortal = ()=>{
    const item = useSelector(state=>state.todos.deletedItem);
    const isOpenPortal = useSelector(state=>state.todos.isOpenPortal);
    const dispatch = useDispatch();

    const cancelDeleteHandler = ()=>{
        dispatch(todoActions.portalToggle());
    };

    const confirmDeleteHandler = ()=>{
        if(Array.isArray(item)){
            dispatch(deleteCompletedAsync(item));
        }else{
            dispatch(deleteAsync(item));
        };
        dispatch(todoActions.portalToggle());
    };
    
      
    if(!isOpenPortal){return null}

    return ReactDOM.createPortal(
        <div className={styles.bgContainer}>
            <div className={styles.cardContainer}>
                <h3>Delete Confirmation</h3>
                <p>Are you sure you want to delete <span>{Array.isArray(item)? "All Completed" :item.title}</span> task?</p>
                <div className={styles.buttonDiv}>
                    <button onClick={cancelDeleteHandler}>Cancel</button>
                    <button onClick={confirmDeleteHandler}>Yes</button>
                </div>
            </div>
        </div>
        , document.body
    )

}

export default DeletePortal;