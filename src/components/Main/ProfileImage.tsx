import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';

type ProfileImageProps = {
  profileImage: IGatsbyImageData;
};

const PROFILE_IMAGE_LINK =
  'https://avatars.githubusercontent.com/u/41810621?s=400&u=019a1f538e644b808c8b21c059dd3ab9cda46e44&v=4';

const ProfileImageWrapper = styled(GatsbyImage)`
  width: 120px;
  height: 120px;
  margin-bottom: 30px;
  border-radius: 50%;

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;

const ProfileImage: FunctionComponent<ProfileImageProps> = function ({
  profileImage,
}) {
  return <ProfileImageWrapper image={profileImage} alt="Profile Image" />;
};

export default ProfileImage;
