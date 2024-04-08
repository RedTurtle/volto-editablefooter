import loadable from '@loadable/component';

export const FooterConfigurationForm = loadable(() =>
  import(
    /* webpackChunkName: "volto-editablefooter-manage" */ './FooterConfigurationForm'
  ),
);

export const FooterConfigurationWidget = loadable(() =>
  import(
    /* webpackChunkName: "volto-editablefooter-manage" */ './FooterConfigurationWidget'
  ),
);
