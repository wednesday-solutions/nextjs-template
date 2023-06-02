/**
 *
 * Recommended
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { ClickableTags } from '../styled/repos';
import { Box } from '@mui/material';

const Recommended = (props) => {
  const { recommendations } = props;
  const router = useRouter();
  return (
    <Box sx={{ display: 'flex', gap: '10px' }} data-testid="recommended">
      {recommendations.map(({ id, name }) => (
        <div key={id} onClick={() => router.push(`/info/${name}`)}>
          <ClickableTags label={name} size="small" clickable />
        </div>
      ))}
    </Box>
  );
};

Recommended.propTypes = {
  recommendations: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.number.isRequired, name: PropTypes.string.isRequired })
  )
};

export default Recommended;
