import styles from "./ListElement.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import {useDispatch} from "react-redux";
import { patchAsync, todoActions } from "../../redux/todoSlice";
import UpdatePortal from "../Portals/UpdatePortal";
import { useState } from "react";

const ListElement = ({item})=>{
    const [isUpdateOpen, setIsUpdateOpen]= useState(false);

    const dispatch = useDispatch();
    

    const completedToggle = ()=>{
        dispatch(patchAsync(item));
    };

    const deleteTask = ()=>{
        dispatch(todoActions.portalToggle());
        dispatch(todoActions.deletedItemHandler(item));
    };

    const updateTask = ()=>{
       setIsUpdateOpen(prev=>!prev);
    }

    return(
        <li className={styles.list}>
            <div className={styles.checkDiv} onClick={completedToggle}>
                {item.completed && <FontAwesomeIcon className={styles.checkIcon} icon={faCheck} />}
            </div>
            <p className={item.completed? styles.completedP : null}>{item.title}</p>
            <div className={styles.iconDiv}>
                <FontAwesomeIcon className={styles.editIcon} 
                                 icon={faPenToSquare} 
                                 onClick={updateTask}/>
                <FontAwesomeIcon onClick={deleteTask} className={styles.closeIcon} icon={faTrashCan}/>
            </div>
          {isUpdateOpen && <UpdatePortal item={item} setIsUpdateOpen={setIsUpdateOpen} isUpdateOpen={isUpdateOpen}/>}
        </li>
    )
}
export default ListElement;