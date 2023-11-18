import { SEARCH_CHANGE, FILTER_CHANGE } from "../constant";

export const searchChange = payload => ({type: SEARCH_CHANGE, payload});
export const filterChange = payload => ({type: FILTER_CHANGE, payload});