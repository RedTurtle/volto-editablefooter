import loadable from '@loadable/component';

export const FooterConfigurationForm = loadable(() =>
  import(
    /* webpackChunkName: "volto-editablefooter-manage" */ 'volto-editablefooter/widget/FooterConfigurationForm'
  ),
);

export const FooterConfigurationWidget = loadable(() =>
  import(
    /* webpackChunkName: "volto-editablefooter-manage" */ 'volto-editablefooter/widget/FooterConfigurationWidget'
  ),
);
