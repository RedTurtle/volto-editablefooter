# volto-editablefooter

Volto addon for a customizable footer.
Intended to be used with [RedTurtle.volto_editablefooter](https://github.com/RedTurtle/redturtle.volto_editablefooter)

To be used with mrs-developer, see [Volto docs](https://docs.voltocms.com/customizing/add-ons/) for further usage informations.

Created with [voltocli](https://github.com/nzambello/voltocli).

## Usage

Simply load the addon in your project, then edit the configuration in `/controlpanel/footer-settings`.
Example configuration to be saved in Plone [here](./footerConfigurationExample.json).

To use the default template for the editable footer, add `src/addons/volto-editablefooter/src/customizations` in your `package.json` in `customizationPaths`.

```json
  "customizationPaths": [
    "src/customizations",
    "src/addons/volto-editablefooter/src/customizations"
  ]
```
