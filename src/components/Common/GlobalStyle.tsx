import React, { FunctionComponent } from 'react';
import { Global, css } from '@emotion/react';

const defaultStyle = css`
  @font-face {
    font-family: 'Lato';
    src: local('Lato');
    src: url('https://fonts.googleapis.com/css2?family=Lato:wght@900&display=block');
    src: url('/fonts/Lato-Black.woff2') format('woff2');
    src: url('/fonts/Lato-Black.woff') format('woff');
    font-weight: normal;
    font-display: 'block';
  }

  @font-face {
    font-family: 'Pretendard';
    src: local('Pretendard');
    src: url('/fonts/Pretendard-Regular.subset.woff2') format('woff2');
    src: url('/fonts/Pretendard-Regular.subset.woff') format('woff');
    font-weight: normal;
    font-display: 'block';
  }

  @font-face {
    font-family: 'Pretendard';
    src: local('Pretendard');
    src: url('/fonts/Pretendard-Bold.subset.woff2') format('woff2');
    src: url('/fonts/Pretendard-Bold.subset.woff') format('woff');
    font-weight: bold;
    font-display: 'block';
  }

  ::selection {
    background-color: rgba(255, 235, 60, 0.3);
  }

  html,
  body,
  span,
  main,
  div,
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
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  body {
    line-height: 1;
    font-family: 'Pretendard', sans-serif;
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
  /* 
  header a[class*='Logo'] {
    font-family: Roboto, arial, sans-serif;
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: -3.95px;
  }

  .lato header a[class*='Logo'] {
    font-family: 'Lato', arial;
    font-size: 2rem;
    letter-spacing: -2px;
  }

  main div[class*='Title'] {
    font-family: sans-serif, arial;
    letter-spacing: -2.5px;
    font-size: 2em;
    font-weight: 900;
  }

  .pretendard main div[class*='Title'] {
    letter-spacing: -0.3px;
    font-weight: bold;
    font-size: 2em;
    font-family: 'Pretendard', sans-serif;
  }

  .pretendard body {
    font-family: 'Pretendard', sans-serif;
  } */
`;

const GlobalStyle: FunctionComponent = function () {
  return <Global styles={defaultStyle} />;
};

export default GlobalStyle;
