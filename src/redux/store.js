import { configureStore, combineReducers } from "@reduxjs/toolkit";
import searchFoodReducer from "./reducers/search_food-reducer";
import thunk from "redux-thunk";

const reducers = combineReducers({
  searchFoodReducer,
});

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), thunk],
});

export default store;
