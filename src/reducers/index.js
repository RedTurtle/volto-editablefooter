/**
 * Dropdown menu items reducer.
 * @module reducers/editableFooterReducer
 */

import { GET_FOOTER } from '../actions';

const initialState = {
  error: null,
  hasErrror: false,
  result: [],
  loadingResults: false,
};

export const editableFooterReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case `${GET_FOOTER}_PENDING`:
      return {
        ...state,
        loadingResults: true,
      };
    case `${GET_FOOTER}_SUCCESS`:
      return {
        ...state,
        result: action.result,
        loadingResults: false,
      };
    case `${GET_FOOTER}_FAIL`:
      return {
        ...state,
        error: action.error,
        hasError: true,
        loadingResults: false,
      };
    default:
      return state;
  }
};
