import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import GlobalStyle from 'components/Common/GlobalStyle';
import Footer from 'components/Common/Footer';
import Introduction from 'components/Main/Introduction';
import CategoryList from 'components/Main/CategoryList';
import PostList from 'components/Main/PostList';
import { graphql } from 'gatsby';
import { IGatsbyImageData } from 'gatsby-plugin-image';
import { PostListItemType } from 'types/PostItem.types';

type IndexPageProps = {
  data: {
    allMarkdownRemark: {
      edges: PostListItemType[];
    };
    file: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData;
      };
    };
  };
};

const CATEGORY_LIST = {
  All: 5,
  Web: 3,
  Mobile: 2,
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const IndexPage: FunctionComponent<IndexPageProps> = function ({
  data: {
    allMarkdownRemark: { edges },
    file: {
      childImageSharp: { gatsbyImageData },
    },
  },
}) {
  return (
    <Container>
      <GlobalStyle />
      <Introduction profileImage={gatsbyImageData} />
      <CategoryList selectedCategory="web" categoryList={CATEGORY_LIST} />
      <PostList posts={edges} />
      <Footer />
    </Container>
  );
};

export default IndexPage;

export const getPostList = graphql`
  query getPostList {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date, frontmatter___title] }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            summary
            date(formatString: "YYYY.MM.DD.")
            categories
            thumbnail {
              childImageSharp {
                gatsbyImageData(
                  quality: 100
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                  transformOptions: { fit: INSIDE }
                  layout: CONSTRAINED
                  width: 768
                  height: 200
                )
              }
            }
          }
        }
      }
    }
    file(name: { eq: "profile-image" }) {
      childImageSharp {
        gatsbyImageData(width: 120, height: 120)
      }
    }
  }
`;
