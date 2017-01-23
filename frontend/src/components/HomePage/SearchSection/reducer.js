import { SEARCH_SECTION_SHOW_DETAIL_PRODUCT } from "./actions.js";

const initialState = {
  product: null,
  showDetail: false
}

const searchSectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_SECTION_SHOW_DETAIL_PRODUCT:
      console.log('--- reducer SEARCH_SECTION_SHOW_DETAIL_PRODUCT fired', action);
      return {
        ...state,
        product: action.product,
        showDetail: action.showDetail
      };
    default:
      console.log('--- searchSectionReducer switch default');
      return state;
  }
}

export default searchSectionReducer
