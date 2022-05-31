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
import { CustomCard } from '../styled/repos';
import If from '../If/index';

const RepoList = (props) => {
  const { reposData, loading, repoName } = props;
  const router = useRouter();

  const items = get(reposData, 'items', []);
  const totalCount = get(reposData, 'totalCount', 0);
  const BlockText = (props) => <T display="block" {...props} />;
  return (
    <If condition={items.length !== 0 || loading}>
      <CustomCard data-testid="repo-list">
        <Skeleton loading={loading} active>
          {repoName && <BlockText id="search_query" values={{ repoName }} />}
          {totalCount !== 0 && <BlockText id="matching_repos" values={{ totalCount }} />}
          {items.map((item, index) => (
            <CustomCard key={index} onClick={() => router.push(`/info/${item?.name}?owner=${item?.owner.login}`)}>
              <BlockText id="repository_name" values={{ name: item.name }} />
              <BlockText id="repository_full_name" values={{ fullName: item.fullName }} />
              <BlockText id="repository_stars" values={{ stars: item.stargazersCount }} />
            </CustomCard>
          ))}
        </Skeleton>
      </CustomCard>
    </If>
  );
};

RepoList.propTypes = {
  loading: PropTypes.bool.isRequired,
  reposData: PropTypes.arrayOf(
    PropTypes.shape({
      totalCount: PropTypes.number,
      incompleteResults: PropTypes.bool,
      items: PropTypes.array
    })
  ),
  repoName: PropTypes.string
};

export default RepoList;
