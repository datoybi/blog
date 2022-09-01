import { IGatsbyImageData } from 'gatsby-plugin-image';

export type PostFrontmatterType = {
  title: string;
  date: string;
  categories: string[];
  summary: string;
  thumbnail: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    };
  };
};

export type PostListItemType = {
  node: {
    id: string;
    frontmatter: PostFrontmatterType;
  };
};
