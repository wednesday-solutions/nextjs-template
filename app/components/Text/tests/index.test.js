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
});
