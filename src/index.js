import { editableFooterColumnsReducer } from './reducers';
import FooterConfigurationWidget from './widget/FooterConfigurationWidget';
import { getEditableFooterColumns } from './actions';
import FooterColumns from './components/FooterColumns';

export { FooterConfigurationWidget, getEditableFooterColumns, FooterColumns };

export default (config) => {
  config.widgets.id = {
    ...config.widgets.id,
    footer_columns: FooterConfigurationWidget,
  };

  config.addonReducers = {
    ...config.addonReducers,
    editableFooterColumns: editableFooterColumnsReducer,
  };

  return config;
};
