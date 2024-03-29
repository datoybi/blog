import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { PostFrontmatterType } from 'types/PostItem.types';

type PostItemProps = PostFrontmatterType & { link: string };

const PostItSection = styled.section`
  margin-bottom: 25px;
  flex-direction: row;
  transition: 0.3s box-shadow;

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

const PostItemWrapper = styled(Link)`
  display: flex;
  cursor: pointer;

  &:hover {
    box-shadow: var(--box-shadow);
  }

  @media (max-width: 768px) {
    margin: 0 10px 20px 10px;
  }
`;

const ThumbnailImage = styled(GatsbyImage)`
  width: 35%;
  height: 200px;

  @media (max-width: 768px) {
    width: 0;
    height: 0;
  }
`;

const PostItemContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  overflow-wrap: break-word;
  padding: 15px;
`;

const Title = styled.div`
  display: -webkit-box;
  overflow: hidden;
  margin-bottom: 0.3em;
  text-overflow: ellipsis;
  while-space: normal;
  overflow-wrap: break-word;
  padding-bottom: 0.1rem;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 2rem;
  font-weight: bold;
  line-height: 1.2em;

  @media (max-width: 768px) {
    font-size: 1.8em;
  }
`;

const Date = styled.div`
  font-size: 1em;
  font-weight: 400;
  opacity: 0.7;
`;

const Summary = styled.div`
  display: -webkit-box;
  overflow: hidden;
  overflow-wrap: break-word;
  text-overflow: ellipsis;
  white-space: normal;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  font-size: 1em;
  opacity: 0.8;
  margin-top: 1em;
  line-height: 1.4em;

  @media (max-width: 768px) {
    margin-top: 0.5em;
  }
`;

const PostItem: FunctionComponent<PostItemProps> = function ({
  title,
  date,
  summary,
  thumbnail: {
    childImageSharp: { gatsbyImageData },
  },
  link,
}) {
  return (
    <PostItSection>
      <PostItemWrapper to={link}>
        <ThumbnailImage image={gatsbyImageData} alt="Post Item Image" />
        <PostItemContent>
          <Title>{title}</Title>
          <Date>{date}</Date>
          <Summary>{summary}</Summary>
        </PostItemContent>
      </PostItemWrapper>
    </PostItSection>
  );
};

export default PostItem;
