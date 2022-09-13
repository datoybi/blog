import React, { FunctionComponent, ReactNode } from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';

export type CategoryListProps = {
  selectedCategory: string;
  categoryList: {
    [key: string]: number;
  };
};

type CategoryItemProps = {
  active: boolean;
};

type GatsbyLinkProps = {
  children: ReactNode;
  className?: string;
  to: string;
} & CategoryItemProps; 

const CategoryItem = styled(({ active, ...props }: GatsbyLinkProps) => (
  <Link {...props} />
))<CategoryItemProps>`
  margin-right: 20px;
  padding: 5px 0;
  font-size: 18px;
  cursor: pointer;
  color: #231900;
  background-image: linear-gradient(
    transparent calc(100% - 1.8px),
    black 1.8px
  );
  background-repeat: no-repeat;
  -webkit-background-size: 0% 100%;
  background-size: 0% 100%;
  font-weight: 500;
  font-size: 1.2rem;
  letter-spacing: -0.04em;
  max-width: 53.75rem;
  transition: background-size 0.5s;
  background-size: ${({ active }) => (active ? '100% 100%' : '0% 100%')};

  &:hover {
    background-size: 100% 100%;
  }

  @media (max-width: 768px) {
    font-size: 15px;
    background-size: '0% 100%';
    margin-right: 10px;
    transition: none;

    &:nth-last-of-type(1) {
      margin-right: 0;
    }
  }
`;

const CategoryListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 768px;
  margin: 60px auto 0;

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 50px;
  }
`;

const CategoryList: FunctionComponent<CategoryListProps> = function ({
  selectedCategory,
  categoryList,
}) {
  return (
    <CategoryListWrapper>
      {Object.entries(categoryList).map(([name, count]) => (
        <CategoryItem
          to={`/?category=${name}`}
          active={name === selectedCategory}
          key={name}
        >
          {name}({count})
        </CategoryItem>
      ))}
    </CategoryListWrapper>
  );
};

export default CategoryList;
