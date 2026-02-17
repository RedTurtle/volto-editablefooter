import React, { useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import {
  Icon,
  Grid,
  Menu,
  Form,
  Button,
  Segment,
  Header,
} from 'semantic-ui-react';
import TextWidget from '@plone/volto/components/manage/Widgets/TextWidget';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';

import { FooterConfigurationForm } from './';
import './footer_configuration.css';
import BlocksWidget from 'volto-blocks-widget/widget/BlocksWidget';

const messages = defineMessages({
  footerItemsHeader: {
    id: 'editablefooter-items-header',
    defaultMessage: 'Footer columns',
  },
  addFooterPath: {
    id: 'editablefooter-add-rootpath',
    defaultMessage: 'Add footer path',
  },
  deleteFooterPath: {
    id: 'editablefooter-delete-footerpath',
    defaultMessage: 'Delete footer path',
  },
  deleteButton: {
    id: 'editablefooter-delete-button',
    defaultMessage: 'Delete',
  },
  root_path: {
    id: 'editablefooter-rootpath',
    defaultMessage: 'Root path',
  },
  addFooterColumn: {
    id: 'editablefooter-addfootercolumn',
    defaultMessage: 'Add footer column',
  },
  moveMenuItemUp: {
    id: 'editablefooter-move-column-up',
    defaultMessage: 'Move column up',
  },
  moveMenuItemDown: {
    id: 'editablefooter-move-column-down',
    defaultMessage: 'Move column down',
  },
  emptyActiveFooterPath: {
    id: 'editablefooter-emptyActiveFooterPath',
    defaultMessage: 'Select or add a footer path',
  },
  emptyActiveFooterColumn: {
    id: 'editablefooter-emptyActiveFooterColumn',
    defaultMessage: 'Select or add a footer column',
  },

  column: {
    id: 'editablefooter-column',
    defaultMessage: 'Column',
  },
  no_title: {
    id: 'editablefooter-no-title',
    defaultMessage: 'without title',
  },
  column_selection: {
    id: 'editablefooter-column-selection',
    defaultMessage: 'Column selection',
  },
  column_content: {
    id: 'editablefooter-column-content',
    defaultMessage: 'Edit column content',
  },
  footer_top: {
    id: 'editablefooter-footer-top',
    defaultMessage: 'Intestazione del footer',
  },
});

const defaultMenuItem = (title) => ({
  id: new Date().getTime(),
  title,
  visible: true,
  showSocial: false,
  newsletterSubscribe: false,
  titleLink: [],
  text: null,
});

const defaultRootMenu = (title) => ({
  rootPath: '/',
  items: [defaultMenuItem(title)],
});

const defaultMenuConfiguration = [defaultRootMenu('Title')];

const FooterConfigurationWidget = ({
  value,
  id,
  onChange,
  required,
  title,
  description,
}) => {
  const intl = useIntl();
  const [footerConfiguration, setFooterConfiguration] = useState(
    value || defaultMenuConfiguration,
  );

  const [activeFooter, setActiveFooter] = useState(0);
  const [activeFooterColumn, setActiveFooterColumn] = useState(0);

  const handleChangeConfiguration = (value) => {
    setFooterConfiguration(value);
    onChange(id, value);
  };

  const addFooterPath = (e) => {
    e.preventDefault();
    const menuItemsNumber = footerConfiguration.length;
    const menuItem = `/tab${menuItemsNumber}`;
    let newMenuConfiguration = [
      ...footerConfiguration,
      {
        ...defaultRootMenu(`Tab ${menuItemsNumber}`),
        rootPath: menuItem,
      },
    ];

    handleChangeConfiguration(newMenuConfiguration);
    setActiveFooter(newMenuConfiguration.length - 1);
  };

  const deleteFooterPath = (e, index) => {
    e.preventDefault();
    let newMenuConfiguration = [...footerConfiguration];
    newMenuConfiguration.splice(index, 1);

    if (activeFooter === index) {
      setTimeout(() => setActiveFooter(index > 0 ? index - 1 : 0), 0);
    }

    handleChangeConfiguration(newMenuConfiguration);
  };

  const deleteFooterColumn = (e, pathIndex, index) => {
    e.preventDefault();
    let newMenuConfiguration = [...footerConfiguration];
    newMenuConfiguration[pathIndex].items.splice(index, 1);

    if (activeFooterColumn === index) {
      setTimeout(() => setActiveFooterColumn(index > 0 ? index - 1 : 0), 0);
    }

    handleChangeConfiguration(newMenuConfiguration);
  };

  const addFooterColumn = (e, pathIndex) => {
    e.preventDefault();
    let newMenuConfiguration = [...footerConfiguration];
    newMenuConfiguration[pathIndex].items = [
      ...newMenuConfiguration[pathIndex].items,
      defaultMenuItem(`New ${newMenuConfiguration[pathIndex].items.length}`),
    ];

    setActiveFooterColumn(newMenuConfiguration[pathIndex].items.length - 1);
    handleChangeConfiguration(newMenuConfiguration);
  };

  const onChangeFooterPath = (index, menu) => {
    let newMenuConfiguration = [...footerConfiguration];
    newMenuConfiguration[index] = menu;

    handleChangeConfiguration(newMenuConfiguration);
  };

  const onChangeFooterColumn = (pathIndex, columnIndex, column) => {
    let newFooterConfiguration = [...footerConfiguration];
    newFooterConfiguration[pathIndex].items[columnIndex] = column;

    handleChangeConfiguration(newFooterConfiguration);
  };

  const moveMenuItem = (e, pathIndex, menuItemIndex, direction) => {
    e.preventDefault();
    const up = direction === 'up';
    let newMenuConfiguration = [...footerConfiguration];

    let menuItem = newMenuConfiguration[pathIndex].items[menuItemIndex];
    newMenuConfiguration[pathIndex].items.splice(menuItemIndex, 1);
    newMenuConfiguration[pathIndex].items.splice(
      menuItemIndex + (up ? -1 : 1),
      0,
      menuItem,
    );

    handleChangeConfiguration(newMenuConfiguration);
  };

  return (
    <div className="footer-configuration-widget">
      <Form.Field inline id={id}>
        <Grid>
          {/* <Grid.Row><Grid.Column width="12">
              <div className="wrapper">
                <label htmlFor="footer-configuration">{title}</label>
              </div>
            </Grid.Column></Grid.Row> */}
          {description && (
            <Grid.Row>
              <Grid.Column stretched width="12">
                <p className="help">{description}</p>
              </Grid.Column>
            </Grid.Row>
          )}
          <Grid.Row>
            <Grid.Column width="12" className="footer-configuration-widget">
              <div id="footer-configuration">
                <Menu pointing secondary className="footer-path">
                  {footerConfiguration.map((footer, idx) => (
                    <Menu.Item
                      key={`footer-path-${idx}`}
                      name={footer.rootPath}
                      active={activeFooter === idx}
                      onClick={() => {
                        setActiveFooter(idx);
                        setActiveFooterColumn(0);
                      }}
                    >
                      <span>{flattenToAppURL(footer.rootPath)}</span>
                    </Menu.Item>
                  ))}
                  <Menu.Item
                    active={false}
                    name={intl.formatMessage(messages.addFooterPath)}
                    onClick={addFooterPath}
                    aria-label={intl.formatMessage(messages.addFooterPath)}
                  >
                    <Icon name="plus" />
                  </Menu.Item>
                </Menu>

                <Segment>
                  {activeFooter > -1 &&
                  activeFooter < footerConfiguration.length ? (
                    <Grid>
                      <Grid.Column
                        width={12}
                        className="footer-rootpath-segment"
                      >
                        <TextWidget
                          id="rootPath"
                          title={intl.formatMessage(messages.root_path)}
                          description=""
                          required={true}
                          value={flattenToAppURL(
                            footerConfiguration[activeFooter].rootPath,
                          )}
                          onChange={(id, value) => {
                            onChangeFooterPath(activeFooter, {
                              ...footerConfiguration[activeFooter],
                              rootPath: value?.length ? value : '/',
                            });
                          }}
                        />
                        <Form.Field
                          inline
                          className="delete wide"
                          id="footerpath-delete"
                        >
                          <Grid>
                            <Grid.Row stretched>
                              <Grid.Column width={12} className="text-center">
                                <Button
                                  icon="trash"
                                  negative
                                  onClick={(e) =>
                                    deleteFooterPath(e, activeFooter)
                                  }
                                  id="delete-footerpath"
                                  content={intl.formatMessage(
                                    messages.deleteButton,
                                  )}
                                />
                              </Grid.Column>
                            </Grid.Row>
                          </Grid>
                        </Form.Field>
                      </Grid.Column>
                      <Grid.Column
                        width={12}
                        className="footer-top-segment footer-top"
                      >
                        <BlocksWidget
                          id="footerTop"
                          title={intl.formatMessage(messages.footer_top)}
                          description=""
                          value={footerConfiguration[activeFooter].footerTop}
                          onChange={(id, value) => {
                            onChangeFooterPath(activeFooter, {
                              ...footerConfiguration[activeFooter],
                              footerTop: value,
                            });
                          }}
                          onBlur={() => {}}
                          key={'footer_top_' + activeFooter}
                          allowedBlocks={['text', 'image', 'gridBlock']}
                        />
                      </Grid.Column>
                      <Grid.Column width={4}>
                        <Header as="h2" className="editablefooter-items-header">
                          {intl.formatMessage(messages.footerItemsHeader)}
                        </Header>
                        <Menu
                          fluid
                          vertical
                          tabular
                          className="footer-items-menu"
                          role="region"
                          aria-label={intl.formatMessage(
                            messages.column_selection,
                          )}
                        >
                          {footerConfiguration[activeFooter].items?.map(
                            (footerColumn, idx) => (
                              <Menu.Item
                                key={`footer-item-${idx}`}
                                name={footerColumn.title}
                                active={activeFooterColumn === idx}
                                onClick={() => setActiveFooterColumn(idx)}
                                aria-controls={'footerConfigContent'}
                                as="button"
                                aria-expanded={activeFooterColumn === idx}
                                aria-label={
                                  intl.formatMessage(messages.column) +
                                  ' ' +
                                  (idx + 1) +
                                  ' ' +
                                  (footerColumn.title ??
                                    intl.formatMessage(messages.no_title))
                                }
                              >
                                <Button.Group
                                  vertical
                                  className="move-buttons"
                                  key={`footer-item-${idx}`}
                                  id={`footer-item-${idx}`}
                                  name={footerColumn.title}
                                  active={activeFooterColumn === idx}
                                  onClick={() => setActiveFooterColumn(idx)}
                                  aria-label={
                                    intl.formatMessage(messages.column) +
                                    ' ' +
                                    (idx + 1) +
                                    ' ' +
                                    (footerColumn.title ??
                                      intl.formatMessage(messages.no_title))
                                  }
                                >
                                  <Button
                                    disabled={idx === 0}
                                    size="tiny"
                                    icon={<Icon name="arrow left" />}
                                    title={intl.formatMessage(
                                      messages.moveMenuItemUp,
                                    )}
                                    onClick={(e) =>
                                      moveMenuItem(e, activeFooter, idx, 'up')
                                    }
                                  />
                                  <Button
                                    disabled={
                                      idx ===
                                      footerConfiguration[activeFooter].items
                                        .length -
                                        1
                                    }
                                    size="tiny"
                                    icon={<Icon name="arrow right" />}
                                    title={intl.formatMessage(
                                      messages.moveMenuItemDown,
                                    )}
                                    onClick={(e) =>
                                      moveMenuItem(e, activeFooter, idx, 'down')
                                    }
                                  />
                                </Button.Group>
                                <span>{footerColumn.title}</span>
                              </Menu.Item>
                            ),
                          )}
                          <Menu.Item
                            as={'button'}
                            name={intl.formatMessage(messages.addFooterColumn)}
                            aria-label={intl.formatMessage(
                              messages.addFooterColumn,
                            )}
                            onClick={(e) => addFooterColumn(e, activeFooter)}
                          >
                            <Icon name="plus" />
                          </Menu.Item>
                        </Menu>
                      </Grid.Column>
                      <Grid.Column stretched width={8}>
                        {activeFooterColumn > -1 &&
                        activeFooterColumn <
                          footerConfiguration[activeFooter].items?.length ? (
                          <div
                            id="footerConfigContent"
                            role="region"
                            aria-label={intl.formatMessage(
                              messages.column_content,
                            )}
                          >
                            <FooterConfigurationForm
                              arial-label="text"
                              id={
                                footerConfiguration[activeFooter].items[
                                  activeFooterColumn
                                ].id
                              }
                              footerColumn={
                                footerConfiguration[activeFooter].items[
                                  activeFooterColumn
                                ]
                              }
                              onChange={(column) =>
                                onChangeFooterColumn(
                                  activeFooter,
                                  activeFooterColumn,
                                  column,
                                )
                              }
                              deleteFooterColumn={(e) =>
                                deleteFooterColumn(
                                  e,
                                  activeFooter,
                                  activeFooterColumn,
                                )
                              }
                            />
                          </div>
                        ) : (
                          <span>
                            {intl.formatMessage(
                              messages.emptyActiveFooterColumn,
                            )}
                          </span>
                        )}
                      </Grid.Column>
                    </Grid>
                  ) : (
                    <span>
                      {intl.formatMessage(messages.emptyActiveFooterPath)}
                    </span>
                  )}
                </Segment>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form.Field>
    </div>
  );
};

export default FooterConfigurationWidget;
