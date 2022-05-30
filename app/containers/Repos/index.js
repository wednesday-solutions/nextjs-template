/**
 *
 * Repos Container
 *
 */
import Recommended from '@app/components/Recommended';
import { Container } from '@app/components/styled';
import ErrorState from '@components/ErrorState';
import RepoList from '@components/RepoList/index';
import { CustomCard, YouAreAwesome } from '@components/styled/repos';
import T from '@components/Text';
import { fonts } from '@themes';
import { Divider, Input, Row } from 'antd';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectSaga from '@utils/injectSaga';
import { createStructuredSelector } from 'reselect';

import { reposActionCreators } from './reducer';
import saga from './saga';
import { selectReposData, selectReposError, selectReposSearchKey } from './selectors';

export function Repos({
  intl,
  repos,
  error,
  loading,
  searchKey,
  recommendations,
  dispatchGetGithubRepos,
  dispatchClearGithubRepos
}) {
  useEffect(() => {
    if (repos && !repos?.items?.length) {
      dispatchGetGithubRepos(searchKey);
    }
  }, []);

  const handleOnChange = debounce((rName) => {
    if (!isEmpty(rName)) {
      dispatchGetGithubRepos(rName);
    } else {
      dispatchClearGithubRepos();
    }
  }, 200);

  return (
    <Container
      padding={20}
      maxwidth={500}
      style={{
        height: '100vh',
        alignSelf: 'center'
      }}
    >
      <Row>
        <T id="recommended" styles={fonts.style.subheading()} />
      </Row>
      <Row justify="space-between">
        <Recommended recommendations={recommendations} />
        <YouAreAwesome href="https://www.iamawesome.com/">
          <T id="you_are_awesome" />
        </YouAreAwesome>
      </Row>
      <Divider />
      <CustomCard title={intl.formatMessage({ id: 'repo_search' })} maxwidth={500}>
        <T marginBottom={10} id="get_repo_details" />
        <Input.Search
          data-testid="search-bar"
          defaultValue={searchKey}
          type="text"
          onChange={(evt) => handleOnChange(evt.target.value)}
          onSearch={(searchText) => handleOnChange(searchText)}
        />
      </CustomCard>
      <RepoList reposData={repos} loading={loading} repoName={searchKey} />
      <ErrorState reposData={repos} loading={loading} reposError={error} />
    </Container>
  );
}

Repos.propTypes = {
  intl: PropTypes.any,
  searchKey: PropTypes.string,
  repos: PropTypes.shape({
    totalCount: PropTypes.number,
    incompleteResults: PropTypes.bool,
    items: PropTypes.array
  }),
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  recommendations: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.number.isRequired, name: PropTypes.string.isRequired })
  ),
  dispatchGetGithubRepos: PropTypes.func,
  dispatchClearGithubRepos: PropTypes.func
};

Repos.defaultProps = {
  padding: 20,
  maxwidth: 500
};
const mapStateToProps = createStructuredSelector({
  repos: selectReposData(),
  error: selectReposError(),
  searchKey: selectReposSearchKey()
});

function mapDispatchToProps(dispatch) {
  const { requestGetGithubRepos, clearGithubRepos } = reposActionCreators;
  return {
    dispatchClearGithubRepos: () => dispatch(clearGithubRepos()),
    dispatchGetGithubRepos: (repoName) => dispatch(requestGetGithubRepos(repoName))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, injectIntl, injectSaga({ key: 'repos', saga }))(Repos);

export const ReposTest = compose(injectIntl)(Repos);
