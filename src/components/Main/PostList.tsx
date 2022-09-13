import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import PostItem from 'components/Main/PostItem';
import { IGatsbyImageData } from 'gatsby-plugin-image';
import { PostListItemType } from 'types/PostItem.types';
import useInfiniteScroll, {
  useInfiniteScrollType,
} from 'hooks/useInfiniteScroll';

export type PostType = {
  node: {
    id: string;
    frontmatter: {
      title: string;
      summary: string;
      date: string;
      categories: string[];
      thumbnail: {
        childImageSharp: {
          gatsbyImageData: IGatsbyImageData;
        };
      };
    };
  };
};

type PostListProps = {
  selectedCategory: string;
  posts: PostListItemType[];
};

const PostListWrapper = styled.article`
  display: flex;
  width: 768px;
  margin: 0 auto;
  padding: 100px 0 100px;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 100%;
    padding: 50px 0 100px;
  }
`;

const PostList: FunctionComponent<PostListProps> = function ({
  selectedCategory,
  posts,
}) {
  const { containerRef, postList }: useInfiniteScrollType = useInfiniteScroll(
    selectedCategory,
    posts,
  );

  return (
    <PostListWrapper ref={containerRef}>
      {postList.map(
        ({
          node: {
            id,
            fields: { slug },
            frontmatter,
          },
        }: PostListItemType) => (
          <PostItem {...frontmatter} link={slug} key={id} />
        ),
      )}
    </PostListWrapper>
  );
};

export default PostList;
