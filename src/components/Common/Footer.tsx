import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';

const FooterWrapper = styled.footer`
  display: grid;
  display: inline-block;
  place-items: center;
  margin-top: auto;
  padding: 50px 0;
  font-size: 15px;
  text-align: center;
  line-height: 2;
  background-color: var(--highlight);
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const Link = styled.a`
  color: var(--text);
  text-decoration: underline;
  font-weight: 500;
`;

const Footer: FunctionComponent = function () {
  return (
    <FooterWrapper>
      © 2023 datoybi.com
      <br />
      Powered By <Link href="https://www.gatsbyjs.com/">Gatsby</Link>. Hosted
      By&nbsp;<Link href="https://www.netlify.com/">Netlify</Link>.
    </FooterWrapper>
  );
};

export default Footer;
