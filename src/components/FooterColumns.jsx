import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { defineMessages, useIntl } from 'react-intl';
import { Segment, Container, Icon, Grid, Button } from 'semantic-ui-react';
import { map } from 'lodash';
import cx from 'classnames';
import { ConditionalLink } from '@plone/volto/components';
import {
  flattenToAppURL,
  getBlocksFieldname,
  getBlocksLayoutFieldname,
  hasBlocksData,
  getBaseUrl,
} from '@plone/volto/helpers';
import { blocks } from '~/config';

import './footer_columns.css';

const messages = defineMessages({});

const FooterColumns = ({ footer }) => {
  const intl = useIntl();
  const location = useLocation();

  const navItemWidth = footer.navigationRoot?.length > 1 ? 3 : 4;
  const blocksWidth =
    footer.navigationRoot?.length === 1
      ? 8
      : footer.navigationRoot?.length > 2 || footer.navigationRoot?.length === 0
      ? 12
      : 6;

  return (
    <div className="footer-columns">
      <Segment>
        {/* <Grid container>
          {menu.navigationRoot?.map((navRoot) => (
            <Grid.Column width={navItemWidth} key={navRoot['@id']}>
              <h2>
                <ConditionalLink
                  to={flattenToAppURL(navRoot['@id'])}
                  condition={menu.navigationRoot?.length > 1}
                >
                  <span>{navRoot.title}</span>
                </ConditionalLink>
              </h2>
              {navRoot.items?.length > 0 && (
                <ul>
                  {navRoot.items?.map((navItem, idx) => (
                    <li key={navRoot['@id'] + idx}>
                      <NavLink to={flattenToAppURL(navItem['@id'])}>
                        <span>{navItem.title}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </Grid.Column>
          ))}
        </Grid> */}
      </Segment>
    </div>
  );
};

export default FooterColumns;
