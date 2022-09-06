import React, { createRef, FunctionComponent, useEffect } from 'react';
import styled from '@emotion/styled';

const src = 'https://utteranc.es/client.js';
const repo = 'datoybi/blog';

const UtterancesWrapper = styled.div`
  margin: 50px 0 100px 0;

  @media (max-width: 768px) {
    padding: 0 20px;
    margin: 0;
  }
`;

type UtterancesAttributesType = {
  src: string;
  repo: string;
  'issue-term': string;
  label: string;
  theme: string;
  crossorigin: string;
  async: string;
};

const CommentWidget: FunctionComponent = function () {
  const element = createRef<HTMLDivElement>();

  useEffect(() => {
    if (element.current === null) return;
    const utterances: HTMLScriptElement = document.createElement('script');
    const attributes: UtterancesAttributesType = {
      src,
      repo,
      'issue-term': 'pathname',
      label: 'Comment',
      theme: 'github-light',
      crossorigin: 'anonymous',
      async: 'true',
    };

    Object.entries(attributes).forEach(([key, value]) => {
      utterances.setAttribute(key, value);
    });

    element.current.appendChild(utterances);
  }, []);
  return <UtterancesWrapper ref={element} />;
};

export default CommentWidget;
