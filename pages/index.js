import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Meta from '@components/Meta';
import Text from '@components/Text';
import { useInjectSaga } from '@utils/injectSaga';
import saga from '@store/sagas/app';
import { selectLoading, selectError } from '@store/selectors/app';
import { appCreators } from '@store/reducers/app';

const Title = styled(Text)`
  text-align: center;
  font-size: 2rem;
  display: block;
  margin-top: 1rem;
`;

const Home = () => {
  useInjectSaga({ key: 'app', saga });
  return (
    <>
      <Meta title="title" description="description" useTranslation />
      <Title id="title" />
    </>
  );
};

Home.propTypes = {
  dispatchCreateUser: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  error: selectError(),
  loading: selectLoading()
});

const mapDispatchToProps = (dispatch) => {
  const { requestUserProfile } = appCreators;
  return {
    dispatchCreateUser: (data) => dispatch(requestUserProfile(data))
  };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Home);
