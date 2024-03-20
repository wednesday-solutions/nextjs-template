import PropTypes from 'prop-types';
import Repos from '@app/containers/Repos';
import { getReccomendations } from '@services/root';

/**
 * Get the list of recommendations
 * @returns {object} The list of recommendations
 */
export async function getStaticProps() {
  const recommendations = await getReccomendations();
  return {
    props: {
      recommendations
    }
  };
}

/**
 * The ReposPage component
 * @param {object} props The component props
 * @param {object} props.recommendations The list of recommendations
 */
export function ReposPage({ recommendations = [] }) {
  return <Repos recommendations={recommendations} />;
}

ReposPage.propTypes = {
  recommendations: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.number.isRequired, name: PropTypes.string.isRequired })
  )
};

export default ReposPage;
