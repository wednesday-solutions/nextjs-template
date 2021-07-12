/**
 *
 * RepoList
 *
 */

import React from 'react';
import get from 'lodash/get';
import { Skeleton } from 'antd';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import T from '@components/Text';
import commonPropTypes from '@utils/commonPropTypes';
import { CustomCard } from '../styled/root';

const RepoList = (props) => {
  const { reposData, loading, repoName } = props;
  const router = useRouter();

  const items = get(reposData, 'items', []);
  const totalCount = get(reposData, 'totalCount', 0);
  return (
    (items.length !== 0 || loading) && (
      <CustomCard data-testid="repo-list">
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
            <CustomCard key={index} onClick={() => router.push(`/info/${item?.name}?owner=${item?.owner.login}`)}>
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

const types = {
  reposData: PropTypes.arrayOf(
    PropTypes.shape({
      totalCount: PropTypes.number,
      incompleteResults: PropTypes.bool,
      items: PropTypes.array
    })
  ),
  repoName: PropTypes.string
};

const { loading } = commonPropTypes;
const { repoName, reposData } = types;

RepoList.propTypes = {
  loading,
  repoName,
  reposData
};

export default RepoList;
