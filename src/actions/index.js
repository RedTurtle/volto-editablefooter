/**
 * Dropdown menu items actions.
 * @module actions/getEditableFooterColumns
 */
export const GET_EDITABLE_FOOTER_COLUMNS = 'GET_EDITABLE_FOOTER_COLUMNS';

/**
 * Get dropdown menu items.
 * @function getEditableFooterColumns
 * @returns {Object} Get footer action.
 * Es: http://localhost:8080/Plone/@footer-columns
 */
export function getEditableFooterColumns() {
  return {
    type: GET_EDITABLE_FOOTER_COLUMNS,
    request: {
      op: 'get',
      path: `/@footer-columns`,
    },
  };
}
