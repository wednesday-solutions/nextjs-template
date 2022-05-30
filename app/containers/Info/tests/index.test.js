/**
 *
 * Tests for Info container
 *
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom';
import { renderProvider } from '@utils/testUtils';
import { InfoTest as Info } from '../index';

describe('<Info /> container tests', () => {
  // let submitSpy

  beforeEach(() => {
    // submitSpy = jest.fn();
  });

  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<Info />);
    expect(baseElement).toMatchSnapshot();
  });
});
