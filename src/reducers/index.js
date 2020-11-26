/**
 * Dropdown menu items reducer.
 * @module reducers/editableFooterColumnsReducer
 */

import { GET_EDITABLE_FOOTER_COLUMNS } from '../actions';

const initialState = {
  error: null,
  hasErrror: false,
  result: [],
  loadingResults: false,
};

export const editableFooterColumnsReducer = (
  state = initialState,
  action = {},
) => {
  switch (action.type) {
    case `${GET_EDITABLE_FOOTER_COLUMNS}_PENDING`:
      return {
        ...state,
        loadingResults: true,
      };
    case `${GET_EDITABLE_FOOTER_COLUMNS}_SUCCESS`:
      return {
        ...state,
        result:
          typeof action.result === 'string'
            ? JSON.parse(action.result)
            : action.result,
        loadingResults: false,
      };
    case `${GET_EDITABLE_FOOTER_COLUMNS}_FAIL`:
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
