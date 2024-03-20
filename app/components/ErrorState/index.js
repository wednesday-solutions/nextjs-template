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

const ErrorState = (props) => {
  const { intl, reposError, loading, reposData } = props;
  const getRepoError = () => {
    if (reposError) {
      return reposError;
    } else if (!get(reposData, 'totalCount', 0)) {
      return 'respo_search_default';
    }
    return null;
  };

  const renderErrorCard = (repoError) => {
    return (
      !loading &&
      repoError && (
        <CustomCard
          color={reposError ? 'red' : 'grey'}
          title={intl.formatMessage({ id: 'repo_list' })}
          data-testid="error-state"
        >
          <T id={repoError} />
        </CustomCard>
      )
    );
  };

  const repoError = getRepoError();
  return renderErrorCard(repoError);
};

ErrorState.propTypes = {
  intl: PropTypes.any,
  loading: PropTypes.bool.isRequired,
  reposData: PropTypes.arrayOf(
    PropTypes.shape({
      totalCount: PropTypes.number,
      incompleteResults: PropTypes.bool,
      items: PropTypes.array
    })
  ),
  reposError: PropTypes.object,
  repoName: PropTypes.string,
  recommendations: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.number.isRequired, name: PropTypes.string.isRequired })
  )
};

export default compose(injectIntl)(ErrorState);
