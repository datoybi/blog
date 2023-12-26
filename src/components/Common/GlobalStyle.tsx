import React, { FunctionComponent } from 'react';
import { Global, css } from '@emotion/react';

const defaultStyle = css`
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
    font-family: Sandoll Studywithme, 'Pretendard', sans-serif;
    color: var(--text);
    background-color: var(--background-color);
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
    color: var(--text);
  }

  body {
    & {
      --highlight: #f8cd07;
      --text: #231900;
      --background-color: #fff;
      --header-bg: rgba(255, 255, 255, 0.7);
      --box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
      --category-bg: rgba(0, 0, 0, 0.07);
    }

    &.dark {
      --highlight: #837220;
      --text: #fff;
      --background-color: hsl(230, 25%, 18%);
      --header-bg: hsla(230, 20%, 0%, 20%);
      --box-shadow: 0 0 10px rgba(0, 0, 0, 1);
      --category-bg: rgba(255, 255, 255, 0.099);
    }
  }
  .darkmode {
    --size: 2rem;

    appearance: none;
    outline: none;
    cursor: pointer;

    width: var(--size);
    height: var(--size);
    box-shadow: inset calc(var(--size) * 0.33) calc(var(--size) * -0.25) 0;
    border-radius: 999px;
    color: hsl(240, 100%, 95%);

    transition: all 500ms;

    &:checked {
      --ray-size: calc(var(--size) * -0.4);
      --offset-orthogonal: calc(var(--size) * 0.65);
      --offset-diagonal: calc(var(--size) * 0.45);

      transform: scale(0.75);
      color: hsl(40, 100%, 50%);
      box-shadow: inset 0 0 0 var(--size),
        calc(var(--offset-orthogonal) * -1) 0 0 var(--ray-size),
        var(--offset-orthogonal) 0 0 var(--ray-size),
        0 calc(var(--offset-orthogonal) * -1) 0 var(--ray-size),
        0 var(--offset-orthogonal) 0 var(--ray-size),
        calc(var(--offset-diagonal) * -1) calc(var(--offset-diagonal) * -1) 0
          var(--ray-size),
        var(--offset-diagonal) var(--offset-diagonal) 0 var(--ray-size),
        calc(var(--offset-diagonal) * -1) var(--offset-diagonal) 0
          var(--ray-size),
        var(--offset-diagonal) calc(var(--offset-diagonal) * -1) 0
          var(--ray-size);
    }

    @media (max-width: 768px) {
      --size: 1.3rem;

      margin-right: 20px;
    }
  }
`;

const GlobalStyle: FunctionComponent = function () {
  return <Global styles={defaultStyle} />;
};

export default GlobalStyle;
