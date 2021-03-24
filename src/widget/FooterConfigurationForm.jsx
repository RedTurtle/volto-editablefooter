import React, { useEffect } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Form as UIForm, Grid, Button } from 'semantic-ui-react';
import {
  TextWidget,
  CheckboxWidget,
  Sidebar,
  ObjectBrowserWidget,
} from '@plone/volto/components';
import { Portal } from 'react-portal';
import config from '@plone/volto/registry';


const messages = defineMessages({
  title: {
    id: 'editablefooter-title',
    defaultMessage: 'Title',
  },
  titleLink: {
    id: 'editablefooter-titleLink',
    defaultMessage: 'Title link',
  },
  visible: {
    id: 'editablefooter-visible',
    defaultMessage: 'Visible',
  },
  showSocial: {
    id: 'editablefooter-showSocial',
    defaultMessage: 'Show social links',
  },
  newsletterSubscribe: {
    id: 'editablefooter-newsletterSubscribe',
    defaultMessage: 'Show newsletter subscribe form',
  },
  text: {
    id: 'editablefooter-text',
    defaultMessage: 'Text',
  },
  deleteFooterColumn: {
    id: 'editablefooter-deletefootercolumn',
    defaultMessage: 'Delete footer column',
  },
  deleteButton: {
    id: 'editablefooter-deletefootercolumn-button',
    defaultMessage: 'Delete footer column',
  },
});

const FooterConfigurationForm = ({
  id,
  footerColumn,
  onChange,
  deleteFooterColumn,
}) => {
  const intl = useIntl();
  const RichTextWidget = config.widgets.widget.richtext;

  const preventClick = (e) => {
    e.preventDefault();
  };

  const preventEnter = (e) => {
    if (e.code === 'Enter') {
      preventClick(e);
    }
  };

  useEffect(() => {
    document
      .querySelector('form.ui.form')
      .addEventListener('click', preventClick);

    document.querySelectorAll('form.ui.form input').forEach((item) => {
      item.addEventListener('keypress', preventEnter);
    });

    return () => {
      document
        .querySelector('form.ui.form')
        .removeEventListener('click', preventClick);
      document.querySelectorAll('form.ui.form input').forEach((item) => {
        item.removeEventListener('keypress', preventEnter);
      });
    };
  }, []);

  const onChangeFormData = (id, value) => {
    onChange({ ...footerColumn, [id]: value });
  };

  return (
    <>
      <TextWidget
        id={`${id}-title`}
        title={intl.formatMessage(messages.title)}
        description=""
        required={true}
        value={footerColumn.title}
        onChange={(id, value) => onChangeFormData('title', value)}
      />
      <CheckboxWidget
        id={`${id}-visible`}
        title={intl.formatMessage(messages.visible)}
        description=""
        defaultValue={true}
        value={!!footerColumn.visible}
        onChange={(id, value) => onChangeFormData('visible', value)}
      />
      <CheckboxWidget
        id={`${id}-showSocial`}
        title={intl.formatMessage(messages.showSocial)}
        description=""
        defaultValue={true}
        value={!!footerColumn.showSocial}
        onChange={(id, value) => onChangeFormData('showSocial', value)}
      />
      <CheckboxWidget
        id={`${id}-newsletterSubscribe`}
        title={intl.formatMessage(messages.newsletterSubscribe)}
        description=""
        defaultValue={true}
        value={!!footerColumn.newsletterSubscribe}
        onChange={(id, value) => onChangeFormData('newsletterSubscribe', value)}
      />
      <ObjectBrowserWidget
        id={`${id}-titleLink`}
        title={intl.formatMessage(messages.titleLink)}
        description=""
        mode="link"
        value={footerColumn.titleLink ?? []}
        onChange={(id, value) => onChangeFormData('titleLink', value)}
      />
      <RichTextWidget
        id={`${id}-text`}
        title={intl.formatMessage(messages.text)}
        description=""
        value={footerColumn.text || { data: null }}
        onChange={(id, value) => {
          onChangeFormData('text', value);
        }}
        key={`${id}-text`}
      />
      <UIForm.Field inline className="delete wide" id="column-delete">
        <Grid>
          <Grid.Row stretched>
            <Grid.Column width={4}>
              <div className="wrapper"></div>
            </Grid.Column>
            <Grid.Column width={8}>
              <Button
                icon="trash"
                onClick={deleteFooterColumn}
                id="delete-footercolumn"
                negative
                content={intl.formatMessage(messages.deleteButton)}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </UIForm.Field>
      <Portal node={document.getElementById('sidebar')}>
        <Sidebar />
      </Portal>
    </>
  );
};

export default React.memo(FooterConfigurationForm);
