import PropTypes from 'prop-types';
import Repos from '@app/containers/Repos/index';
import { getReccomendations } from '@services/root';

export async function getStaticProps() {
  const recommendations = await getReccomendations();
  return {
    props: {
      recommendations
    }
  };
}

export function ReposPage({ recommendations = [] }) {
  return <Repos recommendations={recommendations} />;
}

ReposPage.propTypes = {
  recommendations: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.number.isRequired, name: PropTypes.string.isRequired })
  )
};

export default ReposPage;
