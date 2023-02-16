/**
 *
 * Tests for Text
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom'
import { renderProvider } from '@utils/testUtils';
import Text from '../index';

describe('<Text />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<Text />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 Text component', () => {
    const { getAllByTestId } = renderProvider(<Text />);
    expect(getAllByTestId('text').length).toBe(1);
  });

  it('should create a span with display value that is passed as prop', () => {
    const { queryByTestId } = renderProvider(<Text display="block" />);
    expect(queryByTestId('text')).toHaveStyle({ display: 'block' });
  });

  it('should not set a display value when a display prop is not passed', () => {
    const { queryByTestId } = renderProvider(<Text />);
    expect(queryByTestId('text')).not.toHaveStyle({ display: 'block' });
  });
});
