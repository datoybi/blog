import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import GlobalStyle from 'components/Common/GlobalStyle';

const NotFoundPageWrapper = styled.div`
  background: #f8cd07;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const NotFoundText = styled.div`
  color: #ffffff;
  font-size: 12em;
  font-family: Helvetica;
  font-weight: bolder;
  text-shadow: 0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9,
    0 5px 0 #aaa, 0 6px 1px rgba(0, 0, 0, 0.1), 0 0 5px rgba(0, 0, 0, 0.1),
    0 1px 3px rgba(0, 0, 0, 0.3), 0 3px 5px rgba(0, 0, 0, 0.2),
    0 5px 10px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.2),
    0 20px 20px rgba(0, 0, 0, 0.15);
  margin-bottom: 30px;

  @media (max-width: 768px) {
    font-size: 100px;
  }
`;

const NotFoundDescription = styled.div`
  font-size: 25px;
  text-align: center;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const GoToMainButton = styled(Link)`
  margin-top: 30px;
  font-size: 20px;
  background: linear-gradient(145deg, #ffdb07, #dfb906);
  box-shadow: 5px 5px 20px #635203, -5px -5px 20px #ffff0b;
  padding: 1.5em 5em;
  border: none;
  border-radius: 0.5rem;
  color: #222;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.2rem;
  text-align: center;
  cursor: pointer;
  transition: 0.5s ease-in-out;

  &:active {
    box-shadow: inset -2px -2px 6px rgba(255, 255, 255, 0.7),
      inset -2px -2px 4px rgba(255, 255, 255, 0.5),
      inset 2px 2px 2px rgba(255, 255, 255, 0.075),
      inset 2px 2px 4px rgba(0, 0, 0, 0.15);
  }
`;
const NotFoundPage: FunctionComponent = function () {
  return (
    <NotFoundPageWrapper>
      <GlobalStyle />
      <NotFoundText>404</NotFoundText>
      <NotFoundDescription>페이지를 찾을 수 없습니다.</NotFoundDescription>
      <GoToMainButton to="/">메인으로</GoToMainButton>
    </NotFoundPageWrapper>
  );
};

export default NotFoundPage;
