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
