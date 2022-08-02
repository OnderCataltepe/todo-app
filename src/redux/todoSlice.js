import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteCompletedFetch, deleteFetch, getFetch, patchFetch, patchTitleFetch, postFetch } from "./httpRequests";

export const getAsync = createAsyncThunk("todos/getTodos", getFetch);
export const postAsync = createAsyncThunk("todos/postTodos", postFetch);
export const deleteAsync = createAsyncThunk("todos/deleteTodos", deleteFetch);
export const deleteCompletedAsync = createAsyncThunk("todos/deleteCompletedTodos", deleteCompletedFetch)
export const patchAsync = createAsyncThunk("todos/patchTodos", patchFetch);
export const patchTitleAsync = createAsyncThunk("todods/patchTitle", patchTitleFetch)

export const getCategoryAsync = createAsyncThunk("todos/getCategory", getFetch);
export const postCategoryAsync = createAsyncThunk("todos/postCategory", postFetch);
export const deleteCategoryAsync = createAsyncThunk("todos/deleteCategory", deleteFetch);


export const todoSlice = createSlice({
    name: "todos",
    initialState: {
        list: [],
        category: [],
        all: true,
        active: false,
        completed: false,
        isLoading: false,
        error: null,
        isCategoryPortal: false,
        isOpenPortal: false,
        deletedItem: null,
        selectedCategory: {
            "name": "category",
            "title": "All",
            "id": 0
          },
    },
    reducers: {
        showAll: (state)=>{
            state.all = true;
            state.active = false;
            state.completed = false;
        },
        showActive: (state)=>{
            state.all = false;
            state.active = true;
            state.completed = false;
        },
        showCompleted: (state)=>{
            state.all = false;
            state.active = false;
            state.completed = true;
        },
        
        addCategory: (state,action)=>{
            state.category.push(action.payload)
        },
        filterCategory: (state, action) =>{
            state.selectedCategory = action.payload;
        },


        portalToggle: (state)=>{
            state.isOpenPortal = !state.isOpenPortal
        },
        categoryPortalToggle: (state)=>{
            state.isCategoryPortal = !state.isCategoryPortal
        },
    
        deletedItemHandler:(state,action)=>{
            state.deletedItem = action.payload
        }

    },

    extraReducers: {
        //GET
        [getAsync.fulfilled]: (state, action)=>{
            state.list = action.payload;
            state.isLoading =false
        },
        [getAsync.rejected]: (state, action)=>{
            state.isLoading =false
            state.error = action.error.message;
        },
        [getAsync.pending]: (state)=>{
            state.isLoading = true
        },

        //Post
        [postAsync.fulfilled]: (state, action)=>{
            state.list.push(action.payload)
            state.isLoading= false
        },
        [postAsync.rejected]: (state, action)=>{
            state.isLoading= false;
            state.error=action.error.message;
        },
        [postAsync.pending]: (state)=>{
            state.isLoading= true
        },
        //Delete
        [deleteAsync.fulfilled]: (state, action)=>{
            const newSet = state.list.filter((item)=> item.id !== action.payload);
            state.list = newSet;
            state.isLoading= false;
        },
        [deleteAsync.rejected]: (state, action)=>{
            state.isLoading= false;
            state.error=action.error.message;
        },
        [deleteAsync.pending]: (state)=>{
            state.isLoading= true
        },

        [deleteCompletedAsync.fulfilled]: (state)=>{
            const activeSet = state.list.filter((item)=> item.completed ===false)
            state.list= activeSet;
        },

        //Patch Completed
        [patchAsync.fulfilled]: (state, action)=>{
            const index = state.list.findIndex((item)=> item.id ===action.payload.id);
            state.list[index].completed = action.payload.completed;
            state.isLoading = false;
        },
        [patchAsync.rejected]: (state, action)=>{
            state.isLoading= false;
            state.error=action.error.message;
        },
        [patchAsync.pending]: (state)=>{
            state.isLoading= true
        },
        [patchTitleAsync.fulfilled]: (state, action)=>{
            const index = state.list.findIndex((item)=> item.id ===action.payload.id);
            state.list[index].title = action.payload.title;
            state.isLoading = false;
        },

        //Patch Title
        [patchTitleAsync.rejected]: (state, action)=>{
            state.isLoading= false;
            state.error=action.error.message;
        },
        [patchTitleAsync.pending]: (state)=>{
            state.isLoading= true
        },


        //Category
        [getCategoryAsync.fulfilled]: (state, action)=>{
            state.category = action.payload;
            state.isLoading =false
        },

        [postCategoryAsync.fulfilled]: (state, action)=>{
            state.category.push(action.payload)
            state.isLoading= false
        },
        [deleteCategoryAsync.fulfilled]: (state,action)=>{
            const newSet = state.category.filter((item)=> item.id !== action.payload);
            state.category = newSet;
            state.isLoading= false;
            state.selectedCategory = {
                "name": "category",
                "title": "All",
                "id": 0
              }
        }
    }
})

export default todoSlice.reducer;
export const todoActions = todoSlice.actions;



