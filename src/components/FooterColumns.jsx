import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { Grid } from 'semantic-ui-react';

import {
  flattenHTMLToAppURL,
  flattenToAppURL,
} from '@plone/volto/helpers/Url/Url';
import ConditionalLink from '@plone/volto/components/manage/ConditionalLink/ConditionalLink';

import { getEditableFooterColumns } from '../actions';
import { getItemsByPath } from '../utils';
import Socials from './Socials';
import NewsletterSubscribe from './NewsletterSubscribe';

import config from '@plone/volto/registry';

const FooterColumns = ({ footer }) => {
  const N_COLUMNS =
    config.settings['volto-editablefooter'].options.N_COLUMNS ?? 4;
  const location = useLocation();
  const dispatch = useDispatch();

  const [footerColumns, setFooterColumns] = useState([]);
  const [ncolumns, setNColumns] = useState(N_COLUMNS);

  const confLoading = useSelector(
    (state) => state.editableFooterColumns.loadingResults,
  );

  const footerConfiguration = useSelector(
    (state) => state.editableFooterColumns?.result,
  );

  useEffect(() => {
    if (!footerConfiguration && !confLoading) {
      dispatch(getEditableFooterColumns());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    //filter rootpaths
    const fc = getItemsByPath(
      footerConfiguration,
      location?.pathname?.length ? location.pathname : '/',
    );
    const nc = fc.length < N_COLUMNS ? fc.length : N_COLUMNS;
    setFooterColumns(fc);
    setNColumns(nc);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [footerConfiguration, location]);

  return (
    <div className="footer-columns">
      <Grid>
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

              {column.text && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: flattenHTMLToAppURL(column.text.data),
                  }}
                />
              )}
            </Grid.Column>
          ))}
      </Grid>
    </div>
  );
};

export default FooterColumns;
