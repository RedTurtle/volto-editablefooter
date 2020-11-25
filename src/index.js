import { editableFooterReducer } from './reducers';
import FooterConfigurationWidget from './widget/FooterConfigurationWidget';
import { getEditableFooter } from './actions';

export { FooterConfigurationWidget, getEditableFooter };

export default (config) => {
  config.widgets.id = {
    ...config.widgets.id,
    footer_columns: FooterConfigurationWidget,
  };

  config.addonReducers = {
    ...config.addonReducers,
    editableFooter: editableFooterReducer,
  };

  return config;
};
