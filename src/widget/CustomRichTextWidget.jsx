/**
 * CustomRichTextWidget, a slate widget variant that saves its data as HTML
 */

import React from 'react';

import { makeEditor } from '@plone/volto-slate/utils';
import deserialize from '@plone/volto-slate/editor/deserialize';

import {
  createEmptyParagraph,
  normalizeExternalData,
} from '@plone/volto-slate/utils';

import config from '@plone/volto/registry';

const CustomRichTextWidget = (props) => {
  const {
    id,
    onChange,
    value,
    focus,
    className,
    block,
    placeholder,
    properties,
    intl,
  } = props;
  const editor = React.useMemo(() => makeEditor(), []);

  const fromHtml = React.useCallback(
    (value) => {
      const html = value?.data || '';

      const parsed = new DOMParser().parseFromString(html, 'text/html');
      const body =
        parsed.getElementsByTagName('google-sheets-html-origin').length > 0
          ? parsed.querySelector('google-sheets-html-origin > table')
          : parsed.body;
      let data = deserialize(editor, body, { collapseWhitespace: false });
      data = normalizeExternalData(editor, data);

      // editor.children = data;
      // Editor.normalize(editor);
      // TODO: need to add {text: ""} placeholders between elements
      const res = data.length ? data : [createEmptyParagraph()];
      // console.log('from html', { html: value?.data, res });
      return res;
    },
    [editor],
  );

  const _value = React.useMemo(() => {
    return config.widgets.widget.slate && typeof value === 'string'
      ? fromHtml(value)
      : value;
  }, [value, fromHtml]);
  let RichTextWidget = config.widgets.widget.richtext;
  if (config.widgets.widget.slate) {
    //there's slate in this site. Don't use widget.richtext because is html widget and cannot handle intl provider. So convert value to slate object and use config.widgets.widget.slate
    RichTextWidget = config.widgets.widget.slate;
  }

  const editor = React.useMemo(() => makeEditor(), []);

  return <RichTextWidget />;
};

export default CustomRichTextWidget;
