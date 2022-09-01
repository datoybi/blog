import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import GlobalStyle from 'components/Common/GlobalStyle';
import Footer from 'components/Common/Footer';
import Introduction from 'components/Main/Introduction';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const IndexPage: FunctionComponent = function () {
  return (
    <Container>
      <GlobalStyle />
      <Introduction />
      <Footer />
    </Container>
  );
};

export default IndexPage;
