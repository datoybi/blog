import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';

const PROFILE_IMAGE_LINK =
  'https://avatars.githubusercontent.com/u/41810621?s=400&u=019a1f538e644b808c8b21c059dd3ab9cda46e44&v=4';

const ProfileImageWrapper = styled.img`
  width: 120px;
  height: 120px;
  margin-bottom: 30px;
  border-radius: 50%;
`;

const ProfileImage: FunctionComponent = function () {
  return <ProfileImageWrapper src={PROFILE_IMAGE_LINK} alt="Profile Image" />;
};

export default ProfileImage;
