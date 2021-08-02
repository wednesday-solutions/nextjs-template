/**
 *
 * Tests for Title
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom'
import { renderProvider } from '@utils/testUtils';
import Title from '../index';

describe('<Title />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<Title />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 Title component', () => {
    const { getAllByTestId } = renderProvider(<Title />);
    expect(getAllByTestId('title').length).toBe(1);
  });
});
