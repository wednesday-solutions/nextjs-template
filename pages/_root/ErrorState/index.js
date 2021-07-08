/**
 *
 * ErrorState
 *
 */

import React from 'react';
import get from 'lodash/get';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import T from '@components/Text';
import commonPropTypes from '@utils/commonPropTypes';
import types from '../typedef';
import { CustomCard } from '../styled';

const ErrorState = (props) => {
  const { intl, reposError, loading, reposData } = props;
  let repoError;
  if (reposError) {
    repoError = reposError;
  } else if (!get(reposData, 'totalCount', 0)) {
    repoError = 'respo_search_default';
  }
  if (!loading && !repoError) {
    return <></>;
  }
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

const { intl, loading } = commonPropTypes;
const { reposError, reposData } = types;

ErrorState.propTypes = {
  intl,
  loading,
  reposError,
  reposData
};

export default compose(injectIntl)(ErrorState);
