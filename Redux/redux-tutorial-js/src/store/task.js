import { createAction, createReducer } from "@reduxjs/toolkit";

// Action types
// const ADD_TASK = "ADD_TASK";
// const REMOVE_TASK = "REMOVE_TASK";
// const COMPLETED_TASK = "COMPLETED TASK";



// actions
// export const addTask = (task) => {
//     return {type: ADD_TASK, payload: {task: task}};
// }

// export const removeTask = (id) => {
//     return {type: REMOVE_TASK, payload: {id: id}};
// }

// export const completedTask = (id) => {
//     return {type: COMPLETED_TASK, payload: {id: id}}
// }

export const addTask = createAction("ADD_TASK");
export const removeTask = createAction("REMOVE_TASK");
export const completedTask = createAction("COMPLETED_TASK");

// reducer
let id = 0;

export default createReducer([], {
  [addTask.type]: (state, action) => {
    state.push(
      {
        id: ++id,
        task: action.payload.task,
        completed: false,
      }
    );
  },

  [removeTask.type]: (state, action) => {
    const index = state.findIndex(task => task.id === action.payload.id);
    state.splice(index, 1);
  },

  [completedTask.type]: (state, action) => {
    const index = state.findIndex(task => task.id === action.payload.id);
    state[index].completed = true;
  }
});

// const reducer = (state = [], action) => {
//   switch (action.type) {
//     case addTask.type:
//       return [
//         ...state,
//         {
//           id: ++id,
//           task: action.payload.task,
//           completed: false,
//         },
//       ];

//     case removeTask.type:
//       return state.filter((task) => task.id !== action.payload.id);

//     case completedTask.type:
//       return state.map((task) =>
//         task.id === action.payload.id ? { ...task, completed: true } : task
//       );
//     default:
//       return state;
//   }
// };

// export default reducer;