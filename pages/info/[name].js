import { getRepo } from '@app/services/info';
import { getReccomendations } from '@services/root';
import Info from '@app/containers/Info/index';

const RepoInfo = ({ details }) => <Info details={details} />;

export default RepoInfo;

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

export async function getStaticPaths() {
  const recommendations = await getReccomendations();
  // * param value should be a string
  const paths = recommendations.map(({ name, owner }) => ({ params: { name, owner } }));
  return {
    paths,
    fallback: true
  };
}
