/**
 *
 * ErrorState
 *
 */

import React from 'react';
import get from 'lodash/get';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import T from '@components/Text';
import { CustomCard } from '../styled/repos';
import { CardHeader } from '@mui/material';

const ErrorState = (props) => {
  const { intl, reposError, loading, reposData } = props;
  let repoError;
  if (reposError) {
    repoError = reposError;
  } else if (!get(reposData, 'totalCount', 0)) {
    repoError = 'respo_search_default';
  }
  if (!loading && !repoError) {
    return null;
  }
  return (
    !loading &&
    repoError && (
      <CustomCard color={reposError ? 'red' : 'grey'} data-testid="error-state">
        <CardHeader
          title={intl.formatMessage({ id: 'repo_list' })}
          titleTypographyProps={{ fontSize: '1.25rem' }}
          sx={{ padding: '1.25rem' }}
        />
        <T id={repoError} />
      </CustomCard>
    )
  );
};

ErrorState.propTypes = {
  intl: PropTypes.any,
  loading: PropTypes.bool.isRequired,
  reposData: PropTypes.shape({
    totalCount: PropTypes.number,
    incompleteResults: PropTypes.bool,
    items: PropTypes.array
  }),
  reposError: PropTypes.object,
  repoName: PropTypes.string,
  recommendations: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.number.isRequired, name: PropTypes.string.isRequired })
  )
};

export default compose(injectIntl)(ErrorState);
