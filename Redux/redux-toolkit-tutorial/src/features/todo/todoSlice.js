import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos: [{id: 1, text: "Welcome to 2Do!", completedTask: false}],
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                text: action.payload,
                completedTask: false,
            }
            state.todos.push(todo)
        },

        removeTodo: (state, action) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload)
        },

        completedTask: (state, action) => {
            state.todos = state.todos.map(todo => (
                todo.id === action.payload? {...todo, completedTask: !todo.completedTask}: todo
            ));
        }
    }
})

export const {addTodo, removeTodo, completedTask} = todoSlice.actions
export default todoSlice.reducer