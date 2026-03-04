import React, { useEffect } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Form as UIForm, Grid, Button } from 'semantic-ui-react';
import TextWidget from '@plone/volto/components/manage/Widgets/TextWidget';
import CheckboxWidget from '@plone/volto/components/manage/Widgets/CheckboxWidget';
import ObjectBrowserWidget from '@plone/volto/components/manage/Widgets/ObjectBrowserWidget';

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

  useEffect(() => {
    // Get the main Volto HTML form
    const form = document.querySelector('form.ui.form');

    // Handler to block any type of submit
    const preventSubmit = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    // global handler to stop Enter from submitting inputs
    // exception: slate_wysiwyg_box (to add slate text)
    const handleEnter = (e) => {
      if (e.key === 'Enter') {
        const targetForm = e.target.closest('form.ui.form');
        if (targetForm) {
          const inBlocks = e.target.closest('.slate_wysiwyg_box');
          if (inBlocks) {
            // allow enter to add blocks (React/Volto create new blocks)
            return;
          }
          // block enter everywhere else to prevent unwanted submit
          e.preventDefault();
          e.stopPropagation();
        }
      }
    };

    // prevent native submits (click on buttons that have type submit, etc.)
    form?.addEventListener('submit', preventSubmit, true);

    // Block Enter outside blocks
    document.addEventListener('keydown', handleEnter, true);

    return () => {
      // Cleanup all listeners
      form?.removeEventListener('submit', preventSubmit, true);
      document.removeEventListener('keydown', handleEnter, true);
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
        required={false}
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
      {config.settings['volto-editablefooter'].options.socials && (
        <CheckboxWidget
          id={`${id}-showSocial`}
          title={intl.formatMessage(messages.showSocial)}
          description=""
          defaultValue={true}
          value={!!footerColumn.showSocial}
          onChange={(id, value) => onChangeFormData('showSocial', value)}
        />
      )}
      {config.settings['volto-editablefooter'].options.newsletterSubscribe && (
        <CheckboxWidget
          id={`${id}-newsletterSubscribe`}
          title={intl.formatMessage(messages.newsletterSubscribe)}
          description=""
          defaultValue={true}
          value={!!footerColumn.newsletterSubscribe}
          onChange={(id, value) =>
            onChangeFormData('newsletterSubscribe', value)
          }
        />
      )}
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
        value={footerColumn.text}
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
      {/*
      removed because inited from BlocksWidget in FooterConfigurationWidget
      <Portal node={document.getElementById('sidebar')}>
        <Sidebar />
      </Portal> */}
    </>
  );
};

export default React.memo(FooterConfigurationForm);
