/**
 *
 * Recommended
 *
 */

import React from 'react';
import { useRouter } from 'next/router';
import { Row, Col } from 'antd';
import types from '../typedef';
import { ClickableTags } from '../styled';

const Recommended = (props) => {
  const { recommendations } = props;
  const router = useRouter();
  return (
    <Row data-testid="recommended">
      {recommendations.map(({ id, name }) => (
        <Col key={id} onClick={() => router.push(`/info/${name}`)}>
          <ClickableTags>{name}</ClickableTags>
        </Col>
      ))}
    </Row>
  );
};

const { recommendations } = types;

Recommended.propTypes = {
  recommendations
};

export default Recommended;
