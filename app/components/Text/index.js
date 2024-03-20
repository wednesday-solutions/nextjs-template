/**
 *
 * Text
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { FormattedMessage as T } from 'react-intl';

const StyledText = styled.span`
  white-space: pre-line;
  ${({ display }) => display && `display: ${display}`};
  ${(props) => props.color && `color: ${props.color}`};
  ${(props) => props.fontsize};
  ${(props) => props.fontweight};
  ${(props) => props.styles};
`;

/**
 * A component for displaying text
 * @param {string} id - The id of the text to display
 * @param {string} text - The text to display
 * @param {object} values - The values to pass to the text
 * @param {string} color - The color of the text
 * @param {string} fontWeight - The font weight of the text
 * @param {string} fontSize - The font size of the text
 * @param {string} display - The display type of the text
 */
function Text({ id = 'default', text, values = {}, children, color, fontWeight, fontSize, ...props }) {
  return (
    <StyledText data-testid="text" color={color} fontweight={fontWeight} fontsize={fontSize} {...props}>
      {text || children || <T id={id} values={values} />}
    </StyledText>
  );
}

Text.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string,
  children: PropTypes.string,
  values: PropTypes.object,
  color: PropTypes.string,
  fontWeight: PropTypes.array,
  fontSize: PropTypes.array,
  display: PropTypes.oneOf(['block', 'in-line'])
};

export default memo(Text);
