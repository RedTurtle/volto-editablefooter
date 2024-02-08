/**
 * Editable foooter items actions.
 * @module actions/getEditableFooterData
 */
export const GET_EDITABLE_FOOTER_DATA = 'GET_EDITABLE_FOOTER_DATA';
export const GET_EDITABLE_FOOTER_COLUMNS = GET_EDITABLE_FOOTER_DATA; //backward compatibility, it should be removed

/**
 * Get editable footer data
 * @function getEditableFooterData
 * @returns {Object} Get footer action.
 * Es: http://localhost:8080/Plone/@editable-footer-data
 */
export function getEditableFooterData() {
  return {
    type: GET_EDITABLE_FOOTER_DATA,
    request: {
      op: 'get',
      path: `/@editable-footer-data`,
    },
  };
}

//backward compatibility, it should be removed
export function getEditableFooterColumns=()=>{
  return getEditableFooterData();
}
