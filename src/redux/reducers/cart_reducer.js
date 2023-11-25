import { ADD_FOOD, UPDATE_FOOD, DELETE_FOOD } from "../constants";

const initialState = [];

export default function searchFoodReducer(previousState = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_FOOD:
      return [...previousState, payload];

    case UPDATE_FOOD:
      return previousState.map((entry) => (entry.id === payload.id ? payload : entry));

    case DELETE_FOOD:
      return previousState.filter((entry) => entry.id !== payload);

    default:
      return previousState;
  }
}
