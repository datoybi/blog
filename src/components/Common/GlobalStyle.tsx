import React, { FunctionComponent } from 'react';
import { Global, css } from '@emotion/react';

const defaultStyle = css`

  @font-face {
    font-family: Lato;
    src: local('Lato');
    src: url('/fonts/Lato-Black.woff2') format('woff2');
    src: url('/fonts/Lato-Black.woff') format('woff');
  }

  @font-face {
    font-family: Pretendard;
    src: local('Pretendard');
    src: url('/fonts/Pretendard-Regular.subset.woff2') format('woff2');
    src: url('/fonts/Pretendard-Regular.subset.woff') format('woff');
  }

  @font-face {
    font-family: Pretendard;
    src: local('Pretendard');
    src: url('/fonts/Pretendard-Bold.subset.woff2') format('woff2');
    src: url('/fonts/Pretendard-Bold.subset.woff') format('woff');
    font-weight: bold;
  }

  ::selection {
    background-color: rgba(255, 235, 60, 0.3);
  }

  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  body {
    line-height: 1;
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui,
      Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo',
      'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji',
      'Segoe UI Symbol', sans-serif;
    color: #231900;
    font-size: 16px;
    word-break: keep-all;
    letter-spacing: -0.3px;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  div,
  a {
    text-decoration: none;
  }
`;

const GlobalStyle: FunctionComponent = function () {
  return <Global styles={defaultStyle} />;
};

export default GlobalStyle;
