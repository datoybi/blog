import { Script } from 'gatsby';
import React, { FunctionComponent, useMemo } from 'react';
import CategoryList, { CategoryListProps } from 'components/Main/CategoryList';
import PostList, { PostType } from 'components/Main/PostList';
import { graphql } from 'gatsby';
import { PostListItemType } from 'types/PostItem.types';
import queryString, { ParsedQuery } from 'query-string';
import Template from 'components/Common/Template';

type IndexPageProps = {
  location: {
    search: string;
  };
  data: {
    site: {
      siteMetadata: {
        title: string;
        description: string;
        siteUrl: string;
      };
    };
    allMarkdownRemark: {
      edges: PostListItemType[];
    };
    file: {
      publicURL: string;
    };
  };
};

const IndexPage: FunctionComponent<IndexPageProps> = function ({
  location: { search },
  data: {
    site: {
      siteMetadata: { title, description, siteUrl },
    },
    allMarkdownRemark: { edges },
    file: { publicURL },
  },
}) {
  const parsed: ParsedQuery<string> = queryString.parse(search);
  const selectedCategory: string =
    typeof parsed.category !== 'string' || !parsed.category
      ? 'All'
      : parsed.category;

  const categoryList = useMemo(
    () =>
      edges.reduce(
        (
          list: CategoryListProps['categoryList'],
          {
            node: {
              frontmatter: { categories },
            },
          }: PostType,
        ) => {
          categories.forEach(category => {
            if (list[category] === undefined) list[category] = 1;
            else list[category]++;
          });

          list['All']++;

          return list;
        },
        { All: 0 },
      ),
    [],
  );

  return (
    <>
      <Script
        type="module"
        src="https://8fl3k30sy0.execute-api.ap-northeast-2.amazonaws.com/v1/api/fontstream/djs/?sid=gAAAAABliAOADeWV0PrGqaBoiWGC1L2msW0z8spmoTPgXhMAxBAYWEutwN165ckzw2i-el1Twzl999Dr-wynWbihZFhFCNTMo74FoYB69NAlebRhYhPxEx_CpVCvyJSMTRrkh_4a3_AgWyO6PP47XmBSCK1baRFa_rkbWxk4qK3gBCbAOUD35AIR5dFTkTIstTYegegAFoj9t_0LNa9PUt2fw7vn4KNW3czLHG7vUKAVdbfUiPBemM-ES41FQUtN30hRC5OXdpgg"
      />
      <Template
        title={title}
        description={description}
        url={siteUrl}
        image={publicURL}
      >
        <CategoryList
          selectedCategory={selectedCategory}
          categoryList={categoryList}
        />
        <PostList selectedCategory={selectedCategory} posts={edges} />
      </Template>
    </>
  );
};

export default IndexPage;

export const getPostList = graphql`
  query getPostList {
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date, frontmatter___title] }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            summary
            date(formatString: "YYYY.MM.DD.")
            categories
            thumbnail {
              childImageSharp {
                gatsbyImageData(width: 768, height: 400)
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
      publicURL
    }
  }
`;
