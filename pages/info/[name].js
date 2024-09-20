import { getRepo } from '@app/services/info';
import { getReccomendations } from '@services/root';
import Info from '@app/containers/Info';
import PropTypes from 'prop-types';

const RepoInfo = ({ details }) => <Info details={details} />;

RepoInfo.propTypes = {
  details: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    stargazersCount: PropTypes.number.isRequired
  })
};

export default RepoInfo;

/**
 * Get the details of the repo
 * @param {object} props The component props
 * @param {object} props.params The route parameters
 * @returns {object} The details of the repo
 * @returns {string} The details.name The name of the repo
 * @returns {string} The details.description The description of the repo
 * @returns {number} The details.stargazersCount The number of stargazers
 */
export async function getStaticProps(props) {
  const {
    params: { name }
  } = props;
  const details = await getRepo(name);
  return {
    props: {
      details
    }
  };
}

/**
 * Get the list of recommendations
 * @returns {object} The list of recommendations
 */
export async function getStaticPaths() {
  const recommendations = await getReccomendations();
  // * param value should be a string
  const paths = recommendations.map(({ name, owner }) => ({ params: { name, owner } }));
  return {
    paths,
    fallback: true
  };
}
