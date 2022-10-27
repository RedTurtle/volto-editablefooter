# volto-editablefooter

Volto addon for a customizable footer.
Intended to be used with [redturtle.voltoplugin.editablefooter](https://github.com/RedTurtle/redturtle.voltoplugin.editablefooter)

To be used with mrs-developer, see [Volto docs](https://docs.voltocms.com/customizing/add-ons/) for further usage informations.

Created with [voltocli](https://github.com/nzambello/voltocli).

## Usage

> If you are using Volto < 16, then use [v4.1.1](https://github.com/collective/volto-editablefooter/tree/v4.1.1)
>
> If you are using Volto < 12, then use [v2.1.0](https://github.com/collective/volto-editablefooter/tree/v2.1.0)

Simply load the addon in your project, then edit the configuration in `/controlpanel/footer-settings`.
Example configuration to be saved in Plone [here](./footerConfigurationExample.json).

To use the default template for the editable footer, add `src/addons/volto-editablefooter/src/customizations` in your `package.json` in `customizationPaths`.

```json
  "customizationPaths": [
    "src/customizations",
    "src/addons/volto-editablefooter/src/customizations"
  ]
```

### Configuration

By default, column configuration doesn't show all available options.
If not needed, you could add options in config:

```json
config.settings["volto-editablefooter"] = {
  "options": { "socials": false, "newsletterSubscribe": false },
};
```

### Upgrades

#### Upgrade to 4.x.x

If you are upgrading your addon to a 4.x.x version, add this addon configuration in your config:

```json
config.settings["volto-editablefooter"] = {
  "options": { "socials": true, "newsletterSubscribe": true },
};
```

## Translations

This product has been translated into:

- Italian
- English

Please, contribute to this project adding translations for your language.
