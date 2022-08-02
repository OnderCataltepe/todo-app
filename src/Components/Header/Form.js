import styles from "./Form.module.css";
import {useState } from "react";
import { faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { postAsync } from "../../redux/todoSlice";
import {useDispatch} from "react-redux";
import {nanoid} from "@reduxjs/toolkit";
import Category from "./Category";


const Form = () =>{
    const [inputValue, setInputValue]= useState("");
    const [isEmpty, setIsEmpty] = useState(false);
    const [categoryValue, setCategoryValue]= useState("Select Category");
    const dispatch = useDispatch();

    const addTodoHandler = (e)=>{
        e.preventDefault();
        const newTodo = { id: nanoid() ,title: inputValue, category: categoryValue, completed: false, name: "todos"};
        if(categoryValue !=="Select Category" && inputValue.trim().length>0){
            dispatch(postAsync(newTodo));
            setInputValue("");
            setCategoryValue("Select Category");
            setIsEmpty(false);
        } else{
            setIsEmpty(true);
        }
        };
        
    return(
        <div className={styles.formContainer}>
            <h1>Todo App</h1>
            <div className={styles.warningDiv}>
                { isEmpty && <p>Please fill all fields...</p>}
            </div>         
            <form onSubmit={addTodoHandler}>
                <Category setCategoryValue={setCategoryValue} categoryValue={categoryValue}/>
                <input type="text"
                       value={inputValue}
                       placeholder="Enter new task..." 
                       className={styles.txtInput}
                       onChange={(e)=>setInputValue(e.target.value)}/>
                <button className={styles.formButton}>Add</button>
            </form>
        </div>
    )
}
export default Form;