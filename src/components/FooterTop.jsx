import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { getEditableFooterColumns } from '../actions';
import { getConfigByPath } from '../utils';

import { RichTextRender } from 'volto-blocks-widget';

/**
 * True if footerTop has something to show; an empty slate paragraph counts as empty.
 */
const hasFooterTopContent = (data) => {
  if (data?.blocks_layout) {
    return (data.blocks_layout.items ?? []).some((blockId) => {
      const block = data.blocks?.[blockId];
      if (!block?.['@type']) return false;
      if (block['@type'] === 'slate') return !!block.plaintext?.trim();
      if (block['@type'] === 'text') return !!block.text;
      return true;
    });
  }
  return !!data?.data?.replace(/(<([^>]+)>)/g, '').trim();
};

const FooterTop = () => {
  const location = useLocation();
  const dispatch = useDispatch();

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

  const footerTopData = getConfigByPath(
    footerConfiguration,
    location?.pathname?.length ? location.pathname : '/',
  )?.footerTop;

  return hasFooterTopContent(footerTopData) ? (
    <RichTextRender data={footerTopData} add_class="footerTop" />
  ) : null;
};

export default FooterTop;
