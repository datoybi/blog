import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';

const HeaderWrapper = styled.header`
  border: 1px solid tomato;
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
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 768px;
  height: 60px;
  margin: 0 auto;
`;

const Logo = styled(Link)`
  font-size: 2em;
  font-weight: 500;
  color: white;
  margin: 1vh 0 2vh 0;
  // border: 1px solid tomato;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  backface-visibility: hidden;
  text-shadow: -1px -1px 0 rgba(255, 255, 255, 0.7),
    1px -1px 0 rgba(255, 255, 255, 0.7), -1px 1px 0 rgba(255, 255, 255, 0.7),
    1px 1px 0 rgba(255, 255, 255, 0.7), -1px 2px 1px #a0a0a0,
    -2px 4px 2px #a0a0a0, -3px 6px 3px rgba(160, 160, 160, 0.6),
    -4px 8px 4px rgba(160, 160, 160, 0.5),
    -5px 10px 5px rgba(160, 160, 160, 0.4),
    -6px 12px 6px rgba(160, 160, 160, 0.3),
    -7px 13px 7px rgba(160, 160, 160, 0.2),
    -8px 15px 8px rgba(160, 160, 160, 0.2),
    -9px 17px 9px rgba(160, 160, 160, 0.2),
    -10px 19px 10px rgba(160, 160, 160, 0.2),
    -11px 20px 11px rgba(160, 160, 160, 0.1),
    -12px 22px 12px rgba(160, 160, 160, 0.1),
    -13px 24px 13px rgba(160, 160, 160, 0.1),
    -14px 26px 14px rgba(160, 160, 160, 0.1),
    -15px 28px 15px rgba(160, 160, 160, 0.1),
    -16px 30px 16px rgba(160, 160, 160, 0.1),
    -17px 32px 17px rgba(160, 160, 160, 0.1),
    -18px 34px 18px rgba(160, 160, 160, 0.1),
    -19px 36px 19px rgba(160, 160, 160, 0.1),
    -20px 38px 20px rgba(160, 160, 160, 0.1),
    -21px 39px 21px rgba(160, 160, 160, 0.1);
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
`;

const Header: FunctionComponent = function () {
  return (
    <HeaderWrapper>
      <Wrapper>
        <Logo to="/">Som.Blog</Logo>
      </Wrapper>
    </HeaderWrapper>
  );
};

export default Header;
