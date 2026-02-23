import React from 'react';
import PropTypes from 'prop-types';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { BackBtn } from '@components/styled/backButton';

const BackButton = ({ onClick }) => (
  <BackBtn onClick={onClick} data-testid="back-button" aria-label="Go back">
    <ArrowLeftOutlined />
  </BackBtn>
);

BackButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default BackButton;
