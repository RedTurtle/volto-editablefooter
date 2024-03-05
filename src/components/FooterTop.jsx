import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { getEditableFooterColumns } from '../actions';
import { getConfigByPath } from '../utils';

import { RichTextRender } from 'volto-blocks-widget';

const FooterTop = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const footerConfiguration = useSelector(
    (state) => state.editableFooterColumns?.result,
  );

  useEffect(() => {
    dispatch(getEditableFooterColumns());
  }, [dispatch, location]);

  //filter rootpaths
  const FooterConfig = getConfigByPath(
    footerConfiguration,
    location?.pathname?.length ? location.pathname : '/',
  );

  const footer_top_data = FooterConfig.footerTop;

  let content_to_display = footer_top_data
    ? RichTextRender({
        data: footer_top_data,
        add_class: 'footerTop',
      })
    : null;

  return content_to_display ? <>{content_to_display}</> : null;
};

export default FooterTop;
