import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { Segment, Grid } from 'semantic-ui-react';

import { flattenHTMLToAppURL, flattenToAppURL } from '@plone/volto/helpers';
import { ConditionalLink } from '@plone/volto/components';

import { getEditableFooterColumns } from '../actions';
import { getItemsByPath } from '../utils';
import Socials from './Socials';
import NewsletterSubscribe from './NewsletterSubscribe';

const FooterColumns = ({ footer }) => {
  const N_COLUMNS = 4;
  const location = useLocation();
  const dispatch = useDispatch();

  const footerConfiguration = useSelector(
    (state) => state.editableFooterColumns?.result,
  );

  useEffect(() => {
    dispatch(getEditableFooterColumns());
  }, [dispatch, location]);

  //filter rootpaths
  const footerColumns = getItemsByPath(
    footerConfiguration,
    location?.pathname?.length ? location.pathname : '/',
  );

  const ncolumns =
    footerColumns.length < N_COLUMNS ? footerColumns.length : N_COLUMNS;
  return (
    <div className="footer-columns">
      <Segment>
        <Grid container>
          {footerColumns
            .filter((c) => c.visible)
            .map((column) => (
              <Grid.Column width={12 / ncolumns} key={column.id}>
                <h4>
                  {column?.title && (
                    <ConditionalLink
                      condition={column.titleLink?.length > 0}
                      item={column.titleLink?.[0]}
                      to={
                        flattenToAppURL(column.titleLink?.[0]?.['@id'])
                          ? null
                          : ''
                      }
                      title={column.title}
                    >
                      {column.title}
                    </ConditionalLink>
                  )}
                </h4>
                {column.showSocial && <Socials />}
                {column.newsletterSubscribe && <NewsletterSubscribe />}
                <div
                  dangerouslySetInnerHTML={{
                    __html: flattenHTMLToAppURL(column.text.data),
                  }}
                />
              </Grid.Column>
            ))}
        </Grid>
      </Segment>
    </div>
  );
};

export default FooterColumns;
