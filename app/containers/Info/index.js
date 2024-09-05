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
import { Card, Col, Row, Skeleton } from 'antd';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { infoCreators } from './reducer';
import saga from './saga';
import { selectInfoData, selectInfoLoading } from './selectors';

/**
 * The Info container
 * @param {object} props The component props
 * @param {object} props.details The details of the repo
 * @param {object} props.params The params from the route
 * @param {boolean} props.loading Whether the data is loading
 * @param {function} props.dispatchRequestInfo The function to request the info
 * @param {object} props.fallBackDetails The details to fall back on
 * @returns {JSX.Element} The Info container
 */
export function Info({ details, params, loading, dispatchRequestInfo, fallBackDetails }) {
  const router = useRouter();
  const { query } = router;
  const { name, description, stargazersCount } = { ...(details || {}), ...(fallBackDetails || {}) };

  const shouldRequestInfo = () => isEmpty(details) && !!params?.name && !!query?.owner;
  useEffect(() => {
    const shouldReqInfo = shouldRequestInfo();
    if (shouldReqInfo) {
      dispatchRequestInfo(params?.name, query?.owner);
    }
  }, [params]);

  const shouldLoad = loading || isEmpty({ ...fallBackDetails, ...details });

  return (
    <Row justify="center" align="middle" style={{ height: '100vh' }} flex="1 1 90%">
      <Col>
        <Container style={{ minWidth: '30rem' }} padding={20}>
          <Card
            title={React.createElement(Title, {
              name,
              loading: shouldLoad,
              stargazersCount
            })}
          >
            <Skeleton loading={shouldLoad} active>
              <Text styles={fonts.style.subheading()}>{description}</Text>
            </Skeleton>
          </Card>
        </Container>
      </Col>
    </Row>
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

/**
 * The mapDispatchToProps
 * @param {function} dispatch The dispatch function
 * @returns {object} The props
 */
function mapDispatchToProps(dispatch) {
  return {
    dispatchRequestInfo: (repo, owner) => dispatch(infoCreators.requestInfo(repo, owner))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export const InfoTest = compose(injectIntl)(Info);

export default compose(withConnect, injectSaga({ key: 'info', saga }))(Info);
