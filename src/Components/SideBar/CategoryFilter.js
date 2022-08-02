import styles from "./CategoryFilter.module.css";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { todoActions } from "../../redux/todoSlice";

const CategoryFilter = ()=>{
    const [selectToggle, setSelectToggle] = useState(false);
    const categories = useSelector(state=>state.todos.category);
    const selectedCategory = useSelector(state=>state.todos.selectedCategory);
    const dispatch = useDispatch();
    
    const selectToggleHangler = ()=>{
        setSelectToggle((prev)=> !prev)
    };

    const selectCategoryHandler = (item)=>{
        setSelectToggle((prev)=> !prev);
        dispatch(todoActions.filterCategory(item));
    };

    return(
        <div className={styles.categoryDiv} tabIndex="0" onBlur={()=>setSelectToggle(false)}>
            <div className={styles.inputDiv}>
                <input value={selectedCategory.title}  disabled/>
                <FontAwesomeIcon icon={!selectToggle? faAngleDown: faAngleUp} className={styles.dropDown} onClick={selectToggleHangler}/>
            </div>  
            {selectToggle &&   
                <ul>
                    <li onClick={()=>selectCategoryHandler({"name": "category", "title": "All","id": 0})}>All</li>
                    {categories.map((item)=>{
                    return <li onClick={()=>selectCategoryHandler(item)} key={item.id}>{item.title}</li>
                    })}
                </ul>}
        </div>
    )
};

export default CategoryFilter;