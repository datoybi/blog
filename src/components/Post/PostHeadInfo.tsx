import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export type PostHeadInfoProps = {
  title: string;
  date: string;
  categories: string[];
};

const PostHeadInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 768px;
  height: 100%;
  margin: 0 auto;
  color: #000000;
  margin-top: 150px;
  align-items: flex-start;

  @media (max-width: 768px) {
    width: 100%;
    padding: 40px 20px;
  }
`;

const PrevPageIcon = styled.div`
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #ffffff;
  color: #000000;
  font-size: 22px;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
    font-size: 18px;
  }
`;

const Title = styled.div`
  display: -webkit-box;
  overflow: hidden;
  overflow-wrap: break-word;
  margin-top: auto;
  text-overflow: ellipsis;
  white-space: normal;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 45px;
  font-weight: 800;

  background-image: linear-gradient(transparent 60%, #f8cd07 40%);
  background-repeat: no-repeat;
  background-size: 100% 100%;

  @media (max-width: 768px) {
    font-size: 30px;
  }
`;

const DateWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 1em;
  color: rgba(0, 0, 0, 0.7);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    font-size: 15px;
    font-weight: 400;
  }
`;
const PostHeadInfo: FunctionComponent<PostHeadInfoProps> = function ({
  title,
  date,
  categories,
}) {
  const goBackPage = () => window.history.back();

  return (
    <PostHeadInfoWrapper>
      {/* <PrevPageIcon onClick={goBackPage}> */}
      {/* <FontAwesomeIcon icon={faArrowLeft} /> */}
      {/* </PrevPageIcon> */}
      <DateWrapper>
        {/* <div>{categories.join(' / ')}</div> */}
        {date}
      </DateWrapper>
      <Title>{title}</Title>
    </PostHeadInfoWrapper>
  );
};

export default PostHeadInfo;
