/**
 *
 * Info Container
 *
 */
import Text from '@app/components/Text';
import fonts from '@app/themes/fonts';
import injectSaga from '@app/utils/injectSaga';
import { Container } from '@components/styled';
import Title from '@components/Title';
import { Skeleton, Box, CardHeader, Card } from '@mui/material';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import If from '@components/If';
import { infoCreators } from './reducer';
import saga from './saga';
import { selectInfoData, selectInfoLoading } from './selectors';

export function Info({ details, params, loading, dispatchRequestInfo, fallBackDetails }) {
  const router = useRouter();
  const { query } = router;
  const { name, description, stargazersCount } = { ...(details || {}), ...(fallBackDetails || {}) } || {};
  useEffect(() => {
    if (isEmpty(details) && !!params?.name && !!query?.owner) {
      dispatchRequestInfo(params.name, query.owner);
    }
  }, [params]);

  const shouldLoad = loading || isEmpty({ ...fallBackDetails, ...details });

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
    <Box sx={{ justifyContent: 'center', alignItems: 'center', height: '100vh' }} data-testid="title">
      <Container style={{ minWidth: '30rem' }} padding={20}>
        <Card>
          <CardHeader
            title={React.createElement(Title, {
              name,
              loading: shouldLoad,
              stargazersCount
            })}
          />
          <If condition={shouldLoad} otherwise={renderSkeleton()}>
            <Text styles={fonts.style.subheading()}>{description}</Text>
          </If>
        </Card>
      </Container>
    </Box>
  );
}

Info.propTypes = {
  details: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    stargazersCount: PropTypes.number.isRequired
  }),
  params: PropTypes.shape({
    name: PropTypes.string.isRequired
  }),
  loading: PropTypes.bool.isRequired,
  dispatchRequestInfo: PropTypes.func.isRequired,
  fallBackDetails: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
  loading: selectInfoLoading(),
  fallBackDetails: selectInfoData()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchRequestInfo: (repo, owner) => dispatch(infoCreators.requestInfo(repo, owner))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export const InfoTest = compose(injectIntl)(Info);

export default compose(withConnect, injectSaga({ key: 'info', saga }))(Info);
