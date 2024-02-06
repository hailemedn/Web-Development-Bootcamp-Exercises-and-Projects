import store from './store/configureStore';
import './App.css';
// import { addTask, completedTask, removeTask } from './store/task';

// const unsubscribe = store.subscribe(() => {
//   console.log("Updated", store.getState());
// })

// console.log(addTask());

// // store.dispatch(addTask("Task 1"));
// // store.dispatch(addTask("Task 2"));

// store.dispatch(addTask({task: "Task 1"}));
// store.dispatch(addTask({task: "Task 2"}));

// console.log(store.getState());

// unsubscribe();



// // store.dispatch(completedTask(1));
// store.dispatch(completedTask({id: 1}));
// console.log(store.getState());

// // store.dispatch(removeTask(1));
// store.dispatch(removeTask({id: 1}));
// console.log(store.getState());

function App() {

  return (
    <div className="App">
      Redux tutorial JS
    </div>
  );
}

export default App;
