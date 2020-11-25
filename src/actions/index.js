/**
 * Dropdown menu items actions.
 * @module actions/getEditableFooter
 */
export const GET_FOOTER = 'GET_FOOTER';

/**
 * Get dropdown menu items.
 * @function getEditableFooter
 * @returns {Object} Get footer action.
 * Es: http://localhost:8080/Plone/@footer-columns
 */
export function getEditableFooter() {
  return {
    type: GET_FOOTER,
    request: {
      op: 'get',
      path: `/@footer-columns`,
    },
  };
}
