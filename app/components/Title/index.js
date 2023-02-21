/**
 *
 * Title
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import StarIcon from '@mui/icons-material/Star';
import Text from '@app/components/Text/index';
import fonts from '@app/themes/fonts';
import { Box, Skeleton } from '@mui/material';
import If from '../If/index';

function Title(props) {
  const { name, loading, stargazersCount } = props;
  const headingStyle = fonts.style.heading();

  const renderSkeleton = () => {
    return (
      <>
        <Skeleton data-testid="skeleton" animation="wave" variant="text" height={40} />
        <Skeleton data-testid="skeleton" animation="wave" variant="text" height={40} />
        <Skeleton data-testid="skeleton" animation="wave" variant="text" height={40} />
      </>
    );
  };

  return (
    <Box sx={{ justifyContent: 'space-between', alignItems: 'center' }} data-testid="title">
      <If condition={loading} otherwise={renderSkeleton()}>
        <Text styles={headingStyle}>{name}</Text>
        <Text styles={headingStyle}>
          <StarIcon /> ( {stargazersCount} )
        </Text>
      </If>
    </Box>
  );
}

Title.propTypes = {
  loading: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  stargazersCount: PropTypes.number.isRequired
};

export default Title;
