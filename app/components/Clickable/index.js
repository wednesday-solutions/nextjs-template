/**
 *
 * Clickable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import T from '@components/Text';

const StyledClickable = styled.div`
  color: #1890ff;
  &:hover {
    cursor: pointer;
  }
`;

/**
 * A component that can be clicked
 * @param {function} onClick - The function to call when the component is clicked
 * @param {string} textId - The id of the text to display
 */
function Clickable({ onClick, textId }) {
  return (
    <StyledClickable data-testid="clickable" onClick={onClick}>
      {textId && <T id={textId} />}
    </StyledClickable>
  );
}

Clickable.propTypes = {
  onClick: PropTypes.func.isRequired,
  textId: PropTypes.string.isRequired
};

export default Clickable;
