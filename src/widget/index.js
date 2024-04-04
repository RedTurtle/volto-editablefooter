import loadable from '@loadable/component';

export const FooterConfigurationForm = loadable(() =>
  import(
    /* webpackChunkName: "volto-editablefooter-manage" */ './widget/FooterConfigurationForm'
  ),
);

export const FooterConfigurationWidget = loadable(() =>
  import(
    /* webpackChunkName: "volto-editablefooter-manage" */ './widget/FooterConfigurationWidget'
  ),
);
