/**
 *
 * Title
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Row, Skeleton } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import Text from '@app/components/Text';
import fonts from '@app/themes/fonts';

/**
 * The title of the info container
 * @param {object} props The component props
 * @param {string} props.name The name of the repo
 * @param {boolean} props.loading Whether the data is loading
 * @param {number} props.stargazersCount The number of stargazers
 * @returns {JSX.Element} The title of the info container
 */
function Title(props) {
  const { name, loading, stargazersCount } = props;
  const headingStyle = fonts.style.heading();
  return (
    <Row align="middle" justify="space-between" data-testid="title">
      <Skeleton loading={loading} active>
        <Text styles={headingStyle}>{name}</Text>
        <Text styles={headingStyle}>
          <StarOutlined /> ( {stargazersCount} )
        </Text>
      </Skeleton>
    </Row>
  );
}

Title.propTypes = {
  loading: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  stargazersCount: PropTypes.number.isRequired
};

export default Title;
