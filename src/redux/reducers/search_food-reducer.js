import { SEARCH_CHANGE, FILTER_CHANGE } from "../constant";

const initialState = {
  search: "",
  filter: "",
};

export default function searchFoodReducer(previousState = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SEARCH_CHANGE:
      return { ...previousState, search: payload };
    case FILTER_CHANGE:
      return { ...previousState, filter: payload };
    default:
      return previousState;
  }
}
