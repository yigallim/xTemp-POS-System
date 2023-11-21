import { ADD_FOOD, UPDATE_FOOD, DELETE_FOOD} from "../constant";

export const addFood = payload => ({type: ADD_FOOD, payload});
export const updateFood = payload => ({type: UPDATE_FOOD, payload});
export const deleteFood = payload => ({type: DELETE_FOOD, payload});