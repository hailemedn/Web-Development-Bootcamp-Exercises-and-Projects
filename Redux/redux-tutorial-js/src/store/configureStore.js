// import { legacy_createStore as createStore } from "redux";
import reducer from "./task";
// import { devToolsEnhancer } from "@redux-devtools/extension";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({reducer});

export default store;
