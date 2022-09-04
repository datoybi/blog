import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { PostFrontmatterType } from 'types/PostItem.types';

type PostItemProps = PostFrontmatterType & { link: string };

const PostItemWrapper = styled(Link)`
  display: flex;
  margin-bottom: 20px;
  flex-direction: row;
  transition: 0.3s box-shadow;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }
`;

const ThumbnailImage = styled(GatsbyImage)`
  width: 35%;
  height: 200px;
`;

const PostItemContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 15px;
  color: #231900;
`;

const Title = styled.div`
  display: -webkit-box;
  overflow: hidden;
  margin-bottom: 0.5em;
  text-overflow: ellipsis;
  while-space: normal;
  overflow-wrap: break-word;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 1.5em;
  font-weight: 700;
`;

const Date = styled.div`
  font-size: 1em;
  font-weight: 400;
  opacity: 0.7;
`;

const Category = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
`;

const CategoryItem = styled.div`
  margin-right: 5px;
  padding: 3px 5px;
  border-radius: 3px;
  background: black;
  font-size: 14px;
  font-weight: 700;
  color: white;
`;

const Summary = styled.div`
  display: -webkit-box;
  overflow: hidden;
  // margin-top: auto;
  text-overflow: ellipsis;
  white-space: normal;
  overflow-wrap: break-word;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  font-size: 1em;
  opacity: 0.8;
  margin-top: 1.5em;
  line-height: 1.4em;
`;

const PostItem: FunctionComponent<PostItemProps> = function ({
  title,
  date,
  categories,
  summary,
  thumbnail: {
    childImageSharp: { gatsbyImageData },
  },
  link,
}) {
  return (
    <PostItemWrapper to={link}>
      <ThumbnailImage image={gatsbyImageData} alt="Post Item Image" />
      <PostItemContent>
        <Title>{title}</Title>
        <Date>{date}</Date>
        {/* <Category>
          {categories.map(category => (
            <CategoryItem key={category}>{category}</CategoryItem>
          ))}
        </Category> */}
        <Summary>{summary}</Summary>
      </PostItemContent>
    </PostItemWrapper>
  );
};

export default PostItem;
