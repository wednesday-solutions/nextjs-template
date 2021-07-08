import React, { useEffect } from 'react';
import { compose } from 'redux';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { Row, Col, Card, Skeleton } from 'antd';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { createStructuredSelector } from 'reselect';
import fonts from '@app/themes/fonts';
import { getRepo } from '@app/services/info';
import Text from '@app/components/Text/index';
import { Container } from '@components/styled';
import saga from '@store/sagas/info';
import { getReccomendations } from '@services/root';
import { useInjectSaga } from '@app/utils/injectSaga';
import { requestInfo } from '@app/store/reducers/info';
import commonPropTypes from '@app/utils/commonPropTypes';
import { selectInfoData, selectInfoLoading } from '@app/store/selectors/info';
import { types, Title } from './_name';

const RepoDetails = (props) => {
  const { details, params, loading, dispatchRequestInfo, fallBackDetails } = props;
  const router = useRouter();
  const { query } = router;
  const { name, description, stargazersCount } = { ...(details || {}), ...(fallBackDetails || {}) } || {};
  useInjectSaga({ key: 'info', saga });
  useEffect(() => {
    if (isEmpty(details) && !!params?.name && !!query?.owner) {
      dispatchRequestInfo(params.name, query.owner);
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
};

const { name, stargazersCount } = types;
const { loading, dispatch } = commonPropTypes;

RepoDetails.propTypes = {
  details: PropTypes.shape({
    name,
    stargazersCount,
    description: PropTypes.string.isRequired
  }),
  params: {
    name
  },
  loading,
  dispatchRequestInfo: dispatch,
  fallBackDetails: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
  loading: selectInfoLoading(),
  fallBackDetails: selectInfoData()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchRequestInfo: (repo, owner) => dispatch(requestInfo(repo, owner))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(RepoDetails);

export async function getStaticProps(props) {
  const {
    params: { name }
  } = props;
  const details = await getRepo(name);
  return {
    props: {
      ...props,
      details
    }
  };
}

export async function getStaticPaths() {
  const recommendations = await getReccomendations();
  // * param value should be a string
  const paths = recommendations.map(({ name, owner }) => ({ params: { name, owner } }));
  return {
    paths,
    fallback: true
  };
}
