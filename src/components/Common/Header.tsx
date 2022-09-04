import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  backdrop-filter: saturate(180%) blur(20px);
  background-color: rgba(255, 255, 255, 0.7);
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 768px;
  height: 60px;
  margin: 0 auto;
  align-items: center;
`;

const Logo = styled(Link)`
  color: #231900;
  font-size: 2rem;
  line-height: 1.5rem;
  font-family: 'Open Sans', sans-serif;
  text-align: center;
  letter-spacing: -2px;
`;

const GithubIcon = styled.a`
  color: #231900;
  font-size: 2rem;
`;

const Header: FunctionComponent = function () {
  return (
    <HeaderWrapper>
      <Wrapper>
        <Logo to="/">Som.Blog</Logo>
        <GithubIcon href="https://github.com/datoybi">
          <FontAwesomeIcon icon={faGithub} />
        </GithubIcon>
      </Wrapper>
    </HeaderWrapper>
  );
};

export default Header;
