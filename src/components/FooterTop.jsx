import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { getEditableFooterColumns } from '../actions';
import { getConfigByPath } from '../utils';

import { RichTextRender } from 'volto-blocks-widget';

const FooterTop = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const [footerTopData, setFooterTopData] = useState([]);

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
    const FooterConfig = getConfigByPath(
      footerConfiguration,
      location?.pathname?.length ? location.pathname : '/',
    );

    setFooterTopData(FooterConfig.footerTop);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [footerConfiguration, location]);

  return footerTopData
    ? RichTextRender({
        data: footerTopData,
        add_class: 'footerTop',
      })
    : null;
};

export default FooterTop;
