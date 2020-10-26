import React, { useEffect, memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import get from 'lodash/get';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import { Card, Skeleton, Input } from 'antd';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import T from '@components/Text';
import { useInjectSaga } from '@utils/injectSaga';
import { selectApp, selectReposData, selectReposError, selectRepoName } from '@store/selectors/app';
import { appCreators } from '@store/reducers/app';
import saga from '@store/sagas/app';

const { Search } = Input;

const CustomCard = styled(Card)`
  && {
    margin: 20px 0;
    max-width: ${(props) => props.maxwidth};
    color: ${(props) => props.color};
    ${(props) => props.color && `color: ${props.color}`};
  }
`;
const Container = styled.div`
  && {
    display: flex;
    flex-direction: column;
    max-width: ${(props) => props.maxwidth}px;
    width: 100%;
    margin: 0 auto;
    padding: ${(props) => props.padding}px;
  }
`;

const YouAreAwesome = styled.a`
  display: block;
  text-align: right;

  && {
    span {
      background-image: repeating-linear-gradient(45deg, violet, indigo, blue, green, orange, red, violet);
      text-align: center;
      background-size: 800% 800%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: rainbow 8s ease infinite;
    }
  }

  @keyframes rainbow {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 25%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

export function App({
  dispatchGithubRepos,
  dispatchClearGithubRepos,
  intl,
  reposData = {},
  reposError = null,
  repoName,
  maxwidth,
  padding
}) {
  useInjectSaga({ key: 'app', saga });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loaded = get(reposData, 'items', null) || reposError;
    if (loading && loaded) {
      setLoading(false);
    }
  }, [reposData]);

  useEffect(() => {
    if (repoName && !reposData?.items?.length) {
      dispatchGithubRepos(repoName);
      setLoading(true);
    }
  }, []);

  const handleOnChange = (rName) => {
    if (!isEmpty(rName)) {
      dispatchGithubRepos(rName);
      setLoading(true);
    } else {
      dispatchClearGithubRepos();
    }
  };
  const debouncedHandleOnChange = debounce(handleOnChange, 200);

  const renderRepoList = () => {
    const items = get(reposData, 'items', []);
    const totalCount = get(reposData, 'totalCount', 0);
    return (
      (items.length !== 0 || loading) && (
        <CustomCard>
          <Skeleton loading={loading} active>
            {repoName && (
              <div>
                <T id="search_query" values={{ repoName }} />
              </div>
            )}
            {totalCount !== 0 && (
              <div>
                <T id="matching_repos" values={{ totalCount }} />
              </div>
            )}
            {items.map((item, index) => (
              <CustomCard key={index}>
                <T id="repository_name" values={{ name: item.name }} />
                <T id="repository_full_name" values={{ fullName: item.fullName }} />
                <T id="repository_stars" values={{ stars: item.stargazersCount }} />
              </CustomCard>
            ))}
          </Skeleton>
        </CustomCard>
      )
    );
  };
  const renderErrorState = () => {
    let repoError;
    if (reposError) {
      repoError = reposError;
    } else if (!get(reposData, 'totalCount', 0)) {
      repoError = 'respo_search_default';
    }
    return (
      !loading &&
      repoError && (
        <CustomCard color={reposError ? 'red' : 'grey'} title={intl.formatMessage({ id: 'repo_list' })}>
          <T id={repoError} />
        </CustomCard>
      )
    );
  };

  return (
    <Container maxwidth={maxwidth} padding={padding}>
      <YouAreAwesome href="https://www.iamawesome.com/">
        <T id="you_are_awesome" />
      </YouAreAwesome>
      <CustomCard title={intl.formatMessage({ id: 'repo_search' })} maxwidth={maxwidth}>
        <T marginBottom={10} id="get_repo_details" />
        <Search
          data-testid="search-bar"
          defaultValue={repoName}
          type="text"
          onChange={(evt) => debouncedHandleOnChange(evt.target.value)}
          onSearch={(searchText) => debouncedHandleOnChange(searchText)}
        />
      </CustomCard>
      {renderRepoList()}
      {renderErrorState()}
    </Container>
  );
}

App.propTypes = {
  dispatchGithubRepos: PropTypes.func,
  dispatchClearGithubRepos: PropTypes.func,
  intl: PropTypes.object,
  reposData: PropTypes.shape({
    totalCount: PropTypes.number,
    incompleteResults: PropTypes.bool,
    items: PropTypes.array
  }),
  reposError: PropTypes.object,
  repoName: PropTypes.string,
  maxwidth: PropTypes.number,
  padding: PropTypes.number
};

App.defaultProps = {
  maxwidth: 500,
  padding: 20
};

const mapStateToProps = createStructuredSelector({
  app: selectApp(),
  reposData: selectReposData(),
  reposError: selectReposError(),
  repoName: selectRepoName()
});

function mapDispatchToProps(dispatch) {
  const { requestGetGithubRepos, clearGithubRepos } = appCreators;
  return {
    dispatchGithubRepos: (repoName) => dispatch(requestGetGithubRepos(repoName)),
    dispatchClearGithubRepos: () => dispatch(clearGithubRepos())
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(injectIntl, withConnect, memo)(App);
