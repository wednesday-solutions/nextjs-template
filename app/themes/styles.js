import { css } from '@emotion/react';

/**
 * A function for configuring css box-shadow.
 * @param hOffset
 * @param vOffset
 * @param blurRadius
 * @param color
 * @returns {[]|null|string|*}
 */
const boxShadow = (hOffset = '2px', vOffset = '2px', blurRadius = '2px', color) => css`
  box-shadow: ${hOffset} ${vOffset} ${blurRadius} ${color};
`;

/**
 * A function for configuring css text-shadow.
 *
 * @param hOffset
 * @param vOffset
 * @param blurRadius
 * @param color
 * @returns {[]|null|string|*}
 */
const textShadow = (hOffset = '2px', vOffset = '2px', blurRadius = '2px', color) => css`
  text-shadow: ${hOffset} ${vOffset} ${blurRadius} ${color};
`;

/**
 * A function that takes colors and assumes the top-bottom scenario.
 *
 * @param color1
 * @param color2
 * @returns {[]|null|string|*}
 */
const defaultLinearGradient = (color1, color2) => `linear-gradient(${color1}, ${color2})`;

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  boxShadow,
  defaultLinearGradient,
  textShadow
};
