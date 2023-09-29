import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  todoList: [],
};

export const { reducer, actions } = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todoList = [...state.todoList, action.payload];
    },
    removeTodo: (state, action) => {
      state.todoList.splice(action.payload, 1);
    },
  },
});

const selectState = (state) => state.todo;

export const selectTodoList = createSelector(
  selectState,
  (state) => state.todoList
);

export const { addTodo, removeTodo } = actions;

export default reducer;
