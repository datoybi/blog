import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import ThemeButton from './ThemeButton';

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  backdrop-filter: saturate(180%) blur(20px);
  background-color: var(--header-bg);
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 768px;
  height: 60px;
  margin: 0 auto;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 60px;
    margin: 0 auto;
    align-items: center;
  }
`;

const Logo = styled(Link)`
  font-family: 'Lato', Roboto;
  /* color: #231900; */
  color: var(--text);
  letter-spacing: -2px;
  font-size: 2rem;

  @media (max-width: 768px) {
    margin-left: 20px;
    font-size: 1.5rem;
  }
`;
const IconWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const GithubIcon = styled.a`
  color: var(--text);
  font-size: 2rem;
  width: 2rem;
  margin-right: 20px;
  display: block;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    width: 1rem;
  }
`;

const Header: FunctionComponent = function () {
  return (
    <HeaderWrapper>
      <Wrapper>
        <Logo to="/">Steady-Dev</Logo>
        <IconWrapper>
          <GithubIcon title="github" href="https://github.com/datoybi">
            <FontAwesomeIcon icon={faGithub} />
          </GithubIcon>
          <ThemeButton />
        </IconWrapper>
      </Wrapper>
    </HeaderWrapper>
  );
};

export default Header;
